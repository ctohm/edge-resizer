
import { EnvWithBindings, RequestWithParams } from '.';

import { Context } from './index';

async function computeCachedResponse(imageRequest: Request, ctx: Context, env?: EnvWithBindings,) {
    let debug = env && env.DEBUG ? console.log.bind('computeCachedResponse:') : () => { return null }
    let cacheEntry = imageRequest.headers.get('X-cacheEntry'),
        filename = imageRequest.headers.get('filename')
    const cache = caches.default;

    let resizedUrlStr = imageRequest.url
    let maxAge = 31536000
    if (imageRequest.headers.has('max-age')) {
        maxAge = Number(imageRequest.headers.get('max-age'))
    }
    let cf = {
        cacheTtl: maxAge,

        //image: { format: 'avif' },
    };
    let response = await fetch(resizedUrlStr, { cf });

    const contentType = response.headers.get('Content-Type') || '';
    // debug({ cacheMiss: response, event, contentType });
    if (!response.ok || !contentType.startsWith('image')) {
        return response
    }

    response = new Response(response.body, response);
    let sourceUrl = imageRequest.headers.get('X-sourceUrl')
    //Set cache control headers to cache on browser for 1 year
    response.headers.set('Accept-CH', 'Viewport-Width');
    response.headers.append('Accept-CH', 'Width');
    response.headers.set('Vary', 'Viewport-Width, Width, Accept');
    response.headers.set('Requested-CF', JSON.stringify(cf));
    response.headers.delete('cf-cache-status');
    response.headers.set('Cache-Control', 'public, max-age=31536000');
    response.headers.set('X-Cached-On', String(Date.now()));
    response.headers.set('last-modified', new Date(Date.now() - 180000).toUTCString());
    if (sourceUrl) response.headers.set('X-sourceUrl', sourceUrl);
    response.headers.set('X-resizedUrl', resizedUrlStr);

    if (filename) {
        response.headers.set('Content-Disposition', `inline; filename=${filename}`);
    }
    let cacheRequest = cacheEntry ? new Request(cacheEntry) : imageRequest
    response.headers.set('link', `<${cacheRequest.url}>; rel="canonical"`)
    ctx.waitUntil(cache.put(cacheRequest, response.clone()));
    return response;

}
function getFileName(url: URL): { fileName: string; extension: string } {
    const { pathname } = url,
        fileName = ((pathname || '').split('/').pop() || '').split('.'),
        extension = (fileName.pop() || '').toLowerCase();
    return { fileName: fileName.join('.'), extension };
}

export const thirdParty = async (
    request: RequestWithParams,

    ctx: Context,
    env?: EnvWithBindings
): Promise<Response> => {
    const { transforms, protocol = 'https', domain, pathname, origin } = request.params
    let debug = env && env.DEBUG ? console.log.bind('thirdParty:') : () => { return null }
    let url = new URL(request.url)

    url.pathname = pathname
    url.hostname = domain
    let accepts: string = request.headers.get('accept') || '',

        defaultSearchParams = {
            fit: 'contain',
            //af: '',
            n: '-1',

        } as Record<string & keyof IdefaultSearchParams, string>;
    let computedSearchParams = { ...defaultSearchParams, ...transforms }
    for (let [paramName, paramValue] of url.searchParams.entries()) {
        if (Object.keys(AvailableTransforms).includes(paramName as keyof IdefaultSearchParams)) {
            computedSearchParams[paramName as keyof IdefaultSearchParams] = paramValue;
        }
        if (Object.keys(AvailableFormats).includes(paramName as keyof IOutputFormats)) {
            console.info({ output: paramName })
            computedSearchParams.output = paramName
        }
    }
    let { fileName, extension } = getFileName(url)


    debug({ fileName, extension }, Object.entries(computedSearchParams).map(([key, value]) => `${key}=${value}`).join('_'))

    let urlParam = `${url.hostname}${url.pathname}`,
        weservUrl = new URL('https://images.weserv.nl/');



    if (accepts.includes('webp') && computedSearchParams.output === 'auto') {
        computedSearchParams.output = 'webp';
        if (!computedSearchParams.q) {
            computedSearchParams.q = '75'
        }
    }
    /*if (['tiff', 'gif', 'png', 'jpg', 'jpeg', 'webp', 'json'].includes(extension)) {
        computedSearchParams.output = extension
    }*/

    if (computedSearchParams.output) {
        computedSearchParams.output = computedSearchParams.output.replace('jpeg', 'jpg')
    }


    debug(JSON.stringify({ computedSearchParams }))
    for (let [paramName, paramValue] of Object.entries(computedSearchParams)) {
        weservUrl.searchParams.set(paramName, paramValue);
    }



    let transform_slug = Object.entries(Object.fromEntries(weservUrl.searchParams)).map(([key, val]) => `${key}=${val}`).sort().join('_')

    let cacheEntry = `${origin}/${transform_slug}/${domain}/${pathname}`
    debug({ cacheEntry })
    const cache = caches.default;
    let response = await cache.match(new Request(cacheEntry))

    weservUrl.searchParams.set('url', urlParam);
    if (['https', 'ssl'].includes(protocol)) weservUrl.searchParams.set('url', `ssl:${urlParam}`);
    if (computedSearchParams.output && computedSearchParams.output !== extension) {
        let renamedFilename = fileName.replace(`${extension}`, `${computedSearchParams.output}`);
        weservUrl.searchParams.set('filename', renamedFilename);
    }
    weservUrl.searchParams.sort()
    debug(weservUrl.toString())
    if (response) {
        //debug({ cacheHit: true, ctx });
        return response;
    }
    let {
        "accept": accept,
        "accept-encoding": accept_encoding,
        "accept-language": accept_language,
        "user-agent": user_agent,
        "cache-control": cache_control
    } = Object.fromEntries(request.headers.entries())



    return computeCachedResponse(
        new Request(weservUrl.toString(), {
            headers: {
                "accept": accept,
                "accept-encoding": accept_encoding,
                "accept-language": accept_language,
                "user-agent": user_agent,
                "cache-control": cache_control,
                "X-sourceUrl": request.url,
                "X-cacheEntry": cacheEntry
            }
        }), ctx).catch(err => {
            return fetch(`https://${urlParam}`)
        })

};
export interface IdefaultSearchParams {
    cbg: string;
    bg: string;
    fit: string;
    af: string;
    l?: string;
    w?: string | null;
    h?: string | null;
    output?: string;
    filename?: string;
    q?: string;
    n?: string;
    il?: string;
    sharp?: string;
    cw?: number;
    cy?: number;
    a?: string;
    cx?: number;
    ch?: number;
    hue?: number;
    dpr?: number;


    precrop?: string;

}

export interface IOutputFormats {
    jpg?: string;
    png?: string;
    gif?: string;
    tiff?: string;
    webp?: string;

    auto?: string;
}

export const AvailableFormats: Record<keyof IOutputFormats, string> = {
    jpg: 'Short for output=jpg',
    png: 'Short for output=png',
    tiff: 'Short for output=tiff',
    gif: 'Short for output=gif',
    webp: 'Short for output=webp',

    auto: `check the accept header  for webp support and use it if affirmative`
}
export const AvailableTransforms: Record<keyof IdefaultSearchParams, string> = {
    cbg: 'Background Color for Fit=Contain',
    bg: 'Background Color', //https://images.weserv.nl/docs/adjustment.html#background
    fit: 'Fit', //https://images.weserv.nl/docs/fit.html#inside
    af: 'Adaptative Filter', //https://images.weserv.nl/docs/format.html#adaptive-filter
    l: 'Compression Level', //https://images.weserv.nl/docs/format.html#compression-level
    w: 'Width',
    h: 'Height',
    a: 'Alignment',
    output: 'Output', //https://images.weserv.nl/docs/format.html#output
    filename: 'Filename', //https://images.weserv.nl/docs/format.html#filename
    q: 'Quality', //https://images.weserv.nl/docs/format.html#quality
    n: 'Number of Pages', //https://images.weserv.nl/docs/format.html#number-of-pages
    il: 'Interlaced/Progressive',
    sharp: 'Sharpen', //https://images.weserv.nl/docs/adjustment.html#sharpen
    //h:tps://images.weserv.nl/docs/crop.html#rectangle-crop
    cw: 'Crop width',
    cy: 'Crop y',
    cx: 'Crop x',
    ch: 'Crop height',
    precrop: 'Crop applied before resizing',
    hue: 'Hue',
    dpr: 'Device Pixel Ratio' //https://images.weserv.nl/docs/size.html#device-pixel-ratio


}