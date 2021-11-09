import { error } from 'itty-router-extras';
import { RequestWithParams } from '.';
import { EnvWithBindings } from './index';
import { Context } from './index';

async function computeCachedResponse(imageRequest: Request, env: EnvWithBindings, ctx: Context) {
    let cacheEntry = imageRequest.headers.get('X-cacheEntry')
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
    // console.log({ cacheMiss: response, event, contentType });
    if (response.ok && contentType.startsWith('image')) {
        // Reconstruct the Response object to make its headers mutable.
        //  debug(response);

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
        //response.headers.set('Content-Disposition', `inline; filename=image.webp`);
        let cacheRequest = cacheEntry ? new Request(cacheEntry) : imageRequest
        response.headers.set('link', `<${cacheRequest.url}>; rel="canonical"`)
        ctx.waitUntil(cache.put(cacheRequest, response.clone()));
        return response;
    } else {
        return error(response.status, new Error(response.statusText))
    }
}
function getFileName(url: URL): { fileName: string; extension: string } {
    const { pathname } = url,
        fileName = (pathname || '').split('/').pop() || '',
        extension = fileName.split('.').pop() || '';
    return { fileName, extension };
}

export const thirdParty = async (
    request: RequestWithParams,
    env: EnvWithBindings,
    ctx: Context
): Promise<Response> => {
    const { transforms, protocol = 'https', domain, pathname, origin } = request.params

    let url = new URL(request.url)

    url.pathname = pathname
    url.hostname = domain
    let accepts: string = request.headers.get('accept') || '',
        { fileName, extension } = getFileName(url),
        output = extension,
        quality = env.PNG_QUALITY,
        defaultSearchParams = {
            fit: 'contain',
            af: '',
            n: '-1',

        } as Record<string & keyof IdefaultSearchParams, string>;
    defaultSearchParams = { ...defaultSearchParams, ...transforms }
    for (let [paramName, paramValue] of url.searchParams.entries()) {
        if (Object.keys(AvailableTransforms).includes(paramName as keyof IdefaultSearchParams)) {
            defaultSearchParams[paramName as keyof IdefaultSearchParams] = paramValue;
        }
    }



    let passThrough = false, urlParam = `${url.hostname}${url.pathname}`,
        weservUrl = new URL('https://images.weserv.nl/');

    console.log({ urlParam })
    for (let [paramName, paramValue] of Object.entries(defaultSearchParams)) {
        weservUrl.searchParams.set(paramName, paramValue);
    }

    console.log(weservUrl.toString())
    if (accepts.includes('webp')) {
        output = 'webp';
        quality = 75;
    }

    if (url.searchParams.has('output')) {
        output = url.searchParams.get('output') || output;

        quality = output === 'jpg' ? env.JPG_QUALITY : quality;
    }
    weservUrl.searchParams.set('output', output);
    if (!weservUrl.searchParams.has('q')) {
        weservUrl.searchParams.set('q', String(quality));
    }
    let transform_slug = Object.entries(Object.fromEntries(weservUrl.searchParams)).map(([key, val]) => `${key}=${val}`).sort().join('_')

    let cacheEntry = `${origin}/${transform_slug}/${domain}/${pathname}`
    console.log({ cacheEntry })
    const cache = caches.default;
    let response = await cache.match(new Request(cacheEntry))
    if (response) {
        //debug({ cacheHit: true, ctx });
        return response;


    }
    weservUrl.searchParams.set('url', `ssl:${urlParam}`);
    let renamedFilename = fileName.replace(`${extension}`, `${output}`);
    weservUrl.searchParams.set('filename', renamedFilename);

    let {
        "accept": accept,
        "accept-encoding": accept_encoding,
        "accept-language": accept_language,
        "user-agent": user_agent,
        "cache-control": cache_control
    } = Object.fromEntries(request.headers.entries())



    return passThrough ? fetch(request) : computeCachedResponse(
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
        }), env, ctx)

};
export interface IdefaultSearchParams {
    cbg: string;
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
    bg?: string;
    cx?: number;
    ch?: number;
    hue?: number
}


export const AvailableTransforms: Record<keyof IdefaultSearchParams, string> = {
    cbg: 'Background Color for Fit=Contain', //https://images.weserv.nl/docs/format.html#compression-level
    fit: 'Fit', //https://images.weserv.nl/docs/fit.html#inside
    af: 'Adaptative Filter', //https://images.weserv.nl/docs/format.html#adaptive-filter
    l: 'Compression Level', //https://images.weserv.nl/docs/format.html#compression-level
    w: 'Width',
    h: 'Height',
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
    bg: 'Background',
    hue: 'Hue'
}