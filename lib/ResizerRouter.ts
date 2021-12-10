import { Router, RouterOptions } from 'itty-router';

interface IWaitableObject {
    waitUntil: (promise: Promise<any>) => void;
}
export type TImageParameters = {
    transforms: Record<string & keyof IdefaultSearchParams, string>;
    defaults: { fit: string, n: string, maxage: string },
    discarded: Record<string, string>;
} & {
    [s: string]: string;

};
export type RequestWithParams = Request & {

    params?: TImageParameters;

};

export type Context = {
    request: Request;

} & IWaitableObject;


export interface EnvWithBindings {
    DEBUG: boolean;
    WORKER_ENV: string;
    ROUTE_PREFIX: string;
    RELEASE: string;
    TIMESTAMP?: number;
    MAX_AGE?: string
}


function getFileName(url: URL): { fileName: string; extension: string } {
    const { pathname } = url,
        fileName = ((pathname || '').split('/').pop() || '').split('.'),
        extension = (fileName.pop() || '').toLowerCase();
    return { fileName: [...fileName, extension].join('.'), extension };
}


export interface IdefaultSearchParams {
    cbg: string;
    page?: number;
    bg: string;
    fit: string;
    af: string;
    l?: string;
    w?: string | null;
    h?: string | null;
    output?: string;
    // filename?: string;
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
    flip?: string;
    flop?: string;
    ro: number;
    we?: string;
    trim?: string;
    blur?: number;
    filt?: string;
    con?: number;
    mod?: string;
    sat?: string;
    gam?: number;
    tint?: string;
}

export interface IOutputFormats {
    jpg?: string;
    png?: string;
    gif?: string;
    tiff?: string;
    webp?: string;
    jpeg?: string;
    auto?: string;
}
interface IFitModes {
    contain?: string;
    cover?: string;
    fill?: string;
    inside?: string;
    outside?: string;
}
export const AlignmentAliases = {
    'top-left': 'a=top-left',
    'top': 'a=top',
    'top-right': 'a=top-right',
    'left': 'a=left',
    'center': 'a=center',
    'right': 'a=right',
    'bottom-left': 'a=bottom-left',
    'bottom': 'a=bottom',
    'bottom-right': 'a=bottom-right',
}
export const FitAliases: Record<keyof IFitModes, string> = {
    contain: 'fit=contain',
    cover: 'fit=cover',
    fill: 'fit=fill',
    inside: 'fit=inside',
    outside: 'fit=outside',
}
export const FormatAliases: Record<keyof IOutputFormats, string> = {
    jpg: 'output=jpg',
    jpeg: 'output=jpg',
    png: 'output=png',
    tiff: 'output=tiff',
    gif: 'output=gif',
    webp: 'output=webp',

    auto: `check the accept header  for webp support and use it if affirmative`
}
export const AvailableTransforms: Record<keyof IdefaultSearchParams, { title: string, docs?: string, example: string, section?: string, sectionLink?: string }> = {
    w: { title: 'Width', example: 'w=250', section: 'Resize', sectionLink: 'https://images.weserv.nl/docs/size.html', docs: 'https://images.weserv.nl/docs/size.html#width' },
    h: { title: 'Height', example: 'h=150', docs: 'https://images.weserv.nl/docs/size.html#height' },
    we: { title: 'Without Enlargement', example: 'we', docs: 'https://images.weserv.nl/docs/fit.html#without-enlargement' },
    dpr: { title: 'Device Pixel Ratio', docs: 'https://images.weserv.nl/docs/size.html#device-pixel-ratio', example: 'dpr=2' },
    ro: { title: 'Rotate', example: 'ro=45' },
    //  filename: 'Filename', docs:'https://images.weserv.nl/docs/format.html#filename',
    // Added on version 1.2.0
    //h:tps://images.weserv.nl/docs/crop.html#rectangle-crop
    il: { title: 'Interlaced/Progressive', example: 'il', section: 'Optimization/Conversion', sectionLink: 'https://images.weserv.nl/docs/format.html#adaptive-filter' },
    af: { title: 'Adaptative Filter', docs: 'https://images.weserv.nl/docs/format.html#adaptive-filter', example: 'af' },
    q: { title: 'Quality', docs: 'https://images.weserv.nl/docs/format.html#quality', example: 'q=80' },
    l: { title: 'Compression Level', docs: 'https://images.weserv.nl/docs/format.html#compression-level', example: 'l=6' },
    n: { title: 'Number of Pages', docs: 'https://images.weserv.nl/docs/format.html#number-of-pages', example: 'n=0' },
    page: { title: 'Page', docs: 'https://images.weserv.nl/docs/format.html#page', example: 'page=1' },
    output: { title: 'Output', docs: 'https://images.weserv.nl/docs/format.html#output', example: 'output=png' },


    cw: { title: 'Crop width', example: 'cw=200', section: 'Crop', sectionLink: 'https://images.weserv.nl/docs/crop.html#rectangle-crop' },
    ch: { title: 'Crop height', example: 'ch=100' },
    cx: { title: 'Crop x', example: 'cx=10' },
    cy: { title: 'Crop y', example: 'cy=10' },
    a: { title: 'Alignment', example: 'a=center', docs: 'https://images.weserv.nl/docs/crop.html#alignment-position' },
    precrop: { title: 'Crop applied before resizing', example: 'precrop' },
    cbg: { title: 'Background Color for Fit=Contain', example: 'cbg=AA00CC' },
    trim: { title: 'Trim', example: 'trim', docs: 'https://images.weserv.nl/docs/crop.html#trim' },

    con: { title: 'Contrast', example: 'con=3', section: 'Filters' },
    bg: { title: 'Background Color', docs: 'https://images.weserv.nl/docs/adjustment.html#background', example: 'bg=CCAA00' },
    blur: { title: 'Blur', example: 'blur=2' },

    filt: { title: 'Filter', example: 'filt=sepia' },
    fit: { title: 'Fit', docs: 'https://images.weserv.nl/docs/fit.html#inside', example: 'fit=contain' },
    flip: { title: 'Flip', example: 'flip' },
    flop: { title: 'Flop', example: 'flop' },
    gam: { title: 'Gamma', example: 'gam=1' },
    hue: { title: 'Hue', example: 'hue=180' },
    mod: { title: 'Brightness', example: 'mod=2' },
    sat: { title: 'Saturation', example: 'sat=50' },
    sharp: { title: 'Sharpen', docs: 'https://images.weserv.nl/docs/adjustment.html#sharpen', example: 'sharp=2' },
    tint: { title: 'Tint', example: 'tint=red' },











}

export class ResizerRouter {
    handle: (request: Request, ...extra: any) => any
    constructor(options: RouterOptions<Request> & Partial<EnvWithBindings>) {
        const debug = (options || {}).DEBUG ? console.log.bind('ResizerRouter:') : () => { return null; };
        const domainGroup = `(?<domain>([a-z0-9._-]+))`;
        const pathNameGroup = `(?<pathname>(.*))`;
        const validXFormKeys = Object.keys(AvailableTransforms)
            .concat(
                Object.keys(FormatAliases),
                Object.keys(FitAliases),
                ['http', 'https', 'images', 'img', 'vw']
            );
        const transformationsGroup = `(?<transformations>(_?(${validXFormKeys.join('|')})?(=[^_/]*)*)*)`;
        const groupRegex = `\/${transformationsGroup}\/${domainGroup}\/${pathNameGroup}?`,
            defaultSearchParams = {
                fit: 'contain',
                n: '-1',
                maxage: options.MAX_AGE || '1y'
            } as { fit: string, n: string, maxage: string }
        const ittyRouter = Router<RequestWithParams>({
            base: options.ROUTE_PREFIX || options.base,

            routes: [
                ['GET', new RegExp(groupRegex), [handleMatchingRoute(debug, defaultSearchParams)]],
            ]
        }) as Router<RequestWithParams>

        /**
         * 
         */
        ittyRouter.get('favicon*', (req: Request) => new Response(fallbackSvg(), { headers: { 'X-Requested': req.url } }))


        /**
         * Requests not handled at this point are forwarded as-is
         */

        this.handle = (req: RequestWithParams, ctx: Context) => ittyRouter.handle(req, ctx)

        return new Proxy(ittyRouter, {
            get: (obj, prop) => (...args: any) => {
                return prop === 'handle' ? obj.get('*', (req2: Request) => {
                    /**
                     * Prevent infinite favicon loop
                     */
                    if (req2.headers.get('referer')?.includes('favicon.ico')) {
                        return new Response(null, { status: 204 })
                    }
                    console.log({ resizeRouterCatchAll: req2.url })

                    return fetch(req2)
                    // @ts-ignore
                }).handle(...args) : obj[prop](...args)
            }
        })
    }
}



export function fallbackSvg(): string {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="50.8mm" height="49.98mm" viewBox="0 0 180 177.1" xmlns="http://www.w3.org/2000/svg">
<g transform="matrix(3.9212 0 0 3.9212 6182.7 1395.7)">
<rect x="-1574" y="-353.15" width="40.331" height="39.59" rx="2.5955" ry="2.5955" fill="#e0ffff" opacity=".857" stroke="#0063bb" stroke-linejoin="round" stroke-width="2.7109"/>
<text x="-1553.8228" y="-341.6825" fill="#171e31" font-family="sans-serif" font-size="9.5981px" font-weight="bold" letter-spacing="0px" stroke-width=".39821" text-anchor="middle" word-spacing="0px" style="font-feature-settings:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;line-height:1.25" xml:space="preserve"><tspan x="-1553.8228" y="-341.6825" text-align="center">CTOhm</tspan><tspan x="-1553.8228" y="-329.68481" text-align="center">Edge</tspan><tspan x="-1553.8228" y="-317.68713" text-align="center">Resizer</tspan></text>
</g>
</svg>`;
}

/**
 * Process route params in order to extract transformations as an Object
 * to pass to the next handler
 * Shorthand syntax for output formats is translated to its canonical form (output=<format>)
 * Shorthand syntax for fit types is translated to its canonical form (fit=<fit type>)
* 
* Searchparams, if they are among the supported transformations, will be merged into the Object, overriding route params 
* When they aren't a recognizable transformation, they are stored (and passed to the next handler) as a separate object
* That object will be ultimately added to the request to WeServe, but won't be part of the canonical nice URL we use as 
* cache-key. 
 * @returns 
 */
function handleMatchingRoute(
    debugFn: { (...attrs: any[]): void },
    defaultSearchParams: { fit: string, n: string, maxage: string }
): { (req: RequestWithParams, ctx: Context): Promise<Response> } {
    return (
        req: RequestWithParams,

        ctx: Context
    ): Promise<Response> => {
        const url = new URL(req.url),
            debug = debugFn
        req.params = req.params || {} as TImageParameters;
        req.params.discarded = {} as Record<string, string>;
        req.params.transforms = {} as Record<string & keyof IdefaultSearchParams, string>;
        req.params.origin = url.origin;
        try {
            debug({
                //cf: cf, referrerPolicy, origin: url.origin, host: url.host, hostname: url.hostname,
                domain: req.params.domain,
                pathname: req.params.pathname,
                transformations: req.params.transformations,
                // headers: Object.fromEntries(req.headers)
            });
            // Compute the searchparams equivalent of the transform slug that came in the request
            const pathSearchParams = new URLSearchParams(req.params.transformations.replace(/[+_/,]/g, '&'))

            // append the actual searchParams
            for (let [key, value] of url.searchParams.entries()) {
                pathSearchParams.set(key, value)
            }
            for (let [key, value] of pathSearchParams.entries()) {
                if (['http', 'https'].includes(key)) {
                    req.params.protocol = key;
                } else if (Object.keys(AvailableTransforms).includes(key)) {
                    req.params.transforms[key as keyof IdefaultSearchParams] = value ?? true;
                } else if (Object.keys(FormatAliases).includes(key)) {
                    debug({ output: key });
                    req.params.transforms.output = key;
                } else if (Object.keys(FitAliases).includes(key)) {
                    debug({ fit: key });
                    req.params.transforms.fit = key;
                } else if (key === 'vw' && req.headers.has('viewport-width')) {
                    const vw = Number(req.headers.get('viewport-width'))
                    if (isNaN(vw)) continue;
                    req.params.transforms.w = String(Math.ceil(vw / 10) * 10) // 10 px interval

                } else {
                    req.params.discarded[key as string] = value
                }
            }

            req.params.defaults = defaultSearchParams
            req.params.protocol = req.params.protocol || 'https';
            return thirdParty(req, ctx, debug);
        } catch (e) {
            console.error(e);
            return Promise.resolve(new Response((e as Error).message, { status: 500 }))
        }
    }

}
async function thirdParty(
    request: RequestWithParams,

    ctx: Context,
    debug: { (...attrs: any[]): void }
): Promise<Response> {
    const { transforms, defaults, discarded, domain, protocol, pathname, origin } = request.params || {} as TImageParameters,
        { maxage, ...otherDefaults } = defaults

    let url = new URL(request.url)

    url.pathname = pathname
    url.hostname = domain
    let accepts: string = request.headers.get('accept') || ''




    let { fileName, extension } = getFileName(url)
    let nocache = url.searchParams.has('nocache')

    debug({ nocache, fileName, extension },)

    let urlParam = `${url.hostname}${url.pathname}`,
        weservUrl = new URL('https://images.weserv.nl/'),
        computedSearchParams = { ...otherDefaults, ...transforms }



    if (accepts.includes('webp') && computedSearchParams.output === 'auto') {
        computedSearchParams.output = 'webp';
        if (!computedSearchParams.q) {
            computedSearchParams.q = '75'
        }
    } else if (!['tiff', 'gif', 'png', 'jpg', 'jpeg', 'webp', 'json'].includes(computedSearchParams.output)) {
     /**
      *  Remove output parameter if it's not supported
      */   let { output: unsupportedFormat, ...otherSearchParams } = computedSearchParams
        debug(unsupportedFormat)

        computedSearchParams = otherSearchParams as unknown as Record<string & keyof IdefaultSearchParams, string> & { maxage: string };

    }


    if (computedSearchParams.output) {
        computedSearchParams.output = computedSearchParams.output.replace('jpeg', 'jpg')
    }


    debug(JSON.stringify({ computedSearchParams }))
    for (let [paramName, paramValue] of Object.entries(computedSearchParams)) {
        weservUrl.searchParams.set(paramName, paramValue);
    }

    weservUrl.searchParams.sort()
    let transform_slug = Object.entries(Object.fromEntries(weservUrl.searchParams)).map(([key, val]) => `${key}=${val}`).sort().join('_')
    let discarded_entries = Object.entries(discarded).map(([key, val]) => `${key}=${val}`).sort().join('&')

    /**
     * This is the clean, canonical and tidy URL string that we will look for in the cache,
     * and use it to persist to it when not found already
     */
    let cacheEntry = `${origin}/${transform_slug}/${domain}/${pathname}`
    /**
     * !experimental
     * append unknown searchparams to the canonical cacheEntry to check or set 
     * in the Cache API, since they may alter the final result, and we shouldn't
     * have more than one possible outcome given a canonical cached request
     */
    if (discarded_entries !== '') {
        cacheEntry = [
            cacheEntry,
            decodeURIComponent(discarded_entries)
        ].join('?')

    }

    const cache = caches.default;

    debug({ discarded_entries, cacheEntry, fileName, protocol })
    /**
     * Canonical cached URL doesn't have weserv parameters `url` nor `filename`. 
     * The former is already present in the original URL.  The latter is unrelated to the image's
     * binary contents
     * @todo The protocol isn't considered either. Shoudl it be?
     */
    let response = !nocache && await cache.match(new Request(cacheEntry))

    if (response) {
        const contentType = response.headers.get('Content-Type') || '',
            age = response.headers.get('age') || '0';
        debug({ cacheHit: true, contentType, age });
        return response;
    }
    weservUrl.searchParams.set('filename', fileName);
    urlParam = decodeURIComponent(urlParam)

    weservUrl.searchParams.set('url', urlParam);
    if (['https', 'ssl'].includes(protocol)) weservUrl.searchParams.set('url', `ssl:${urlParam}`);
    if (computedSearchParams.output && computedSearchParams.output !== extension) {
        let renamedFilename = fileName.replace(`${extension}`, `${computedSearchParams.output}`);
        weservUrl.searchParams.set('filename', renamedFilename);
    }
    weservUrl.searchParams.set('maxage', maxage)
    weservUrl.searchParams.sort()
    if (nocache) weservUrl.searchParams.set('maxage', '1d') // this is the bare minimum. Sorry about that.
    let {
        "accept": accept,
        "accept-encoding": accept_encoding,
        "accept-language": accept_language,
        "user-agent": user_agent,
        "cache-control": cache_control,
        //Cookie
    } = Object.fromEntries(request.headers.entries())




    /**
     * !experimental
     * Pass any unknown searchparams unchanged to weserve
    */
    if (discarded_entries !== '') {
        for (let [paramName, paramValue] of Object.entries(discarded)) {
            weservUrl.searchParams.set(paramName, paramValue)
        }
    }

    const weserveUrlStr = weservUrl.toString().replace(/%2C/g, ',')
    console.log({ weserveUrlStr })
    return computeCachedResponse(
        new Request(weserveUrlStr, {
            headers: {
                fileName,
                accept,

                "accept-encoding": accept_encoding,
                "accept-language": accept_language,
                "user-agent": user_agent,
                "cache-control": cache_control,
                "X-sourceUrl": request.url,
                "X-inputExtension": extension,
                "X-cacheEntry": cacheEntry
            }
        }), ctx).catch(() => {
            return fetch(`https://${urlParam}`)
        })

}
async function computeCachedResponse(imageRequest: Request, ctx: Context): Promise<Response> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let cacheEntry = imageRequest.headers.get('X-cacheEntry'),
        fileName = imageRequest.headers.get('fileName'),
        inputExtension = imageRequest.headers.get('X-inputExtension') || fileName?.split('.').pop() || ''
    const cache = caches.default;

    let resizedUrlStr = imageRequest.url
    console.info({ cacheEntry, resizedUrlStr })



    let response = await fetch(resizedUrlStr);

    const contentType = response.headers.get('Content-Type') || '';
    // debug({ cacheMiss: response, event, contentType });
    if (!response.ok || !contentType.startsWith('image')) {
        console.log({ ok: response.ok, contentType, statusText: response.statusText, status: response.status })
        return response
    }
    let newExtension = contentType.split('/').pop()?.replace('jpeg', 'jpg')
    response = new Response(response.body, response);
    let sourceUrl = imageRequest.headers.get('X-sourceUrl')
    //Set cache control headers to cache on browser for 1 year
    response.headers.set('Accept-CH', 'Viewport-Width');
    response.headers.append('Accept-CH', 'Width');
    response.headers.set('Vary', 'Viewport-Width, Width, Accept, Accept-Encoding');

    response.headers.delete('cf-cache-status');
    response.headers.set('Cache-Control', 'public, max-age=' + String(31536000));
    response.headers.set('X-Cached-On', String(Date.now()));
    response.headers.set('last-modified', new Date(Date.now() - 180000).toUTCString());
    if (sourceUrl) response.headers.set('X-sourceUrl', sourceUrl);
    response.headers.set('X-resizedUrl', resizedUrlStr);

    if (fileName) {
        response.headers.set('Content-Disposition', `inline; filename=${decodeURIComponent(fileName.replace(inputExtension, newExtension || inputExtension)).trim()}`);
    }
    let cacheRequest = cacheEntry ? new Request(cacheEntry) : imageRequest
    response.headers.set('link', `<${cacheRequest.url}>; rel="canonical"`)
    ctx.waitUntil(cache.put(cacheRequest, response.clone()));
    return response;

}


