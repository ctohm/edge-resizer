import { Router, RouterOptions } from 'itty-router';
import { json } from 'itty-router-extras'

export interface IWaitableObject {
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
    ASSETS?: KVNamespace;
    MAX_AGE?: string
}

function getFileName(url: URL): { fileName: string; extension: string } {
    const { pathname } = url,
        lastPart = (decodeURIComponent(pathname || '').split('?')[0] || '').replace(/\/$/, '').split('/').pop() || ''
    const { groups } = /(?<fileName>([^/]+))(?<extension>(\.(apng|avif|gif|jpg|png|svg|webp|bmp|ico|tif|tiff|jpeg))?)/i.exec(lastPart) || { groups: { fileName: '', extension: '' } }

    return { fileName: groups?.fileName || '', extension: groups?.extension || '' };
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

    auto: `output=webp (if supported)`
}
export const AvailableTransforms: Record<keyof IdefaultSearchParams, {
    regex: string,
    title: string, docs?: string, example: string, section?: string, sectionLink?: string, note?: string
}> = {
    w: {
        regex: '(?:width|w)=[0-9.-]+',
        title: 'Width', example: 'w=250', section: 'Resize', sectionLink: 'https://images.weserv.nl/docs/size.html', docs: 'https://images.weserv.nl/docs/size.html#width'
    },
    h: {
        regex: '(?:height|h)=[0-9.-]+',
        title: 'Height', example: 'h=150', docs: 'https://images.weserv.nl/docs/size.html#height'
    },
    we: {
        regex: 'we',
        title: 'Without Enlargement', example: 'we', docs: 'https://images.weserv.nl/docs/fit.html#without-enlargement'
    },
    dpr: {
        regex: 'dpr=[0-9]+',
        title: 'Device Pixel Ratio', docs: 'https://images.weserv.nl/docs/size.html#device-pixel-ratio', example: 'dpr=2'
    },
    ro: {
        regex: 'ro=[0-9.-]+',
        title: 'Rotate', example: 'ro=45', docs: 'https://images.weserv.nl/docs/orientation.html#ro'
    },
    flip: {
        regex: 'flip',
        title: 'Flip', example: 'flip', note: '', docs: 'https://images.weserv.nl/docs/orientation.html#flip'
    },
    flop: {
        regex: 'flop',
        title: 'Flop', example: 'flop', note: '', docs: 'https://images.weserv.nl/docs/orientation.html#flop'
    },

    il: {
        regex: 'il',
        title: 'Interlaced/Progressive', example: 'il', section: 'Optimization/Conversion', sectionLink: 'https://images.weserv.nl/docs/format.html#adaptive-filter'
    },
    af: {
        regex: 'af',
        title: 'Adaptative Filter', docs: 'https://images.weserv.nl/docs/format.html#adaptive-filter', example: 'af'
    },
    q: {
        regex: '(?:q|quality)=[0-9.]+',
        title: 'Quality', docs: 'https://images.weserv.nl/docs/format.html#quality', example: 'q=80'
    },
    l: {
        regex: 'l=[0-9]',
        title: 'Compression Level', docs: 'https://images.weserv.nl/docs/format.html#compression-level', example: 'l=6'
    },
    n: {
        regex: 'n=[0-9]+',
        title: 'Number of Pages', docs: 'https://images.weserv.nl/docs/format.html#number-of-pages', example: 'n=0'
    },
    page: {
        regex: 'page=[0-9]+',
        title: 'Page', docs: 'https://images.weserv.nl/docs/format.html#page', example: 'page=1'
    },
    output: {
        regex: '(?:output|format)=(?:auto|json|png|jpg|gif|tiff|webp|jpeg)',
        title: 'Output', docs: 'https://images.weserv.nl/docs/format.html#output', example: 'output=png'
    },


    cw: {
        regex: 'cw=[0-9]+',
        title: 'Crop width', example: 'cw=200', section: 'Crop', sectionLink: 'https://images.weserv.nl/docs/crop.html#rectangle-crop'
    },
    ch: {
        regex: 'ch=[0-9]+',
        title: 'Crop height', example: 'ch=100'
    },
    cx: {
        regex: 'cx=[0-9]+',
        title: 'Crop x', example: 'cx=10'
    },
    cy: {
        regex: 'cy=[0-9]+',
        title: 'Crop y', example: 'cy=10'
    },
    a: {
        regex: 'a=[a-z-]+',
        title: 'Alignment', example: 'a=center', docs: 'https://images.weserv.nl/docs/crop.html#alignment-position'
    },
    precrop: {
        regex: 'precrop',
        title: 'Crop applied before resizing', example: 'precrop'
    },
    cbg: {
        regex: 'cbg=[a-z0-9A-Z]+',
        title: 'Background Color', example: 'cbg=AA00CC', note: 'Applies to "cropped" space when fit=Contain'
    },
    trim: {
        regex: 'trim(?:=[0-9]+)?',
        title: 'Trim', example: 'trim', docs: 'https://images.weserv.nl/docs/crop.html#trim'
    },

    con: {
        regex: 'con=[0-9]+',
        title: 'Contrast', example: 'con=3', section: 'Filters', note: ''
    },
    bg: {
        regex: 'bg=[a-z0-9A-Z]+',
        title: 'Background Color', docs: 'https://images.weserv.nl/docs/adjustment.html#background', example: 'bg=CCAA00', note: ''
    },
    blur: {
        regex: 'blur(?:=[0-9]+)?',
        title: 'Blur', example: 'blur=2', docs: 'https://images.weserv.nl/docs/adjustment.html#blur', note: ''
    },
    filt: {
        regex: 'filt=[a-z]+',
        title: 'Filter', example: 'filt=sepia', note: ''
    },
    fit: {
        regex: 'fit=(?:contain|cover|fill|inside|outsize)',
        title: 'Fit', docs: 'https://images.weserv.nl/docs/fit.html#inside', example: 'fit=contain', note: ''
    },
    gam: {
        regex: 'gam=[0-9.-]+',
        title: 'Gamma', example: 'gam=1', docs: 'https://images.weserv.nl/docs/adjustment.html#gam', note: ''
    },
    hue: {
        regex: 'hue=[0-9.-]+',
        title: 'Hue', example: 'hue=180', docs: 'https://images.weserv.nl/docs/adjustment.html#hue', note: ''
    },
    mod: {
        regex: 'mod=[0-9.-]+',
        title: 'Brightness', example: 'mod=2', docs: 'https://images.weserv.nl/docs/adjustment.html#mod', note: ''
    },
    sat: {
        regex: 'sat=[0-9.-]+',
        title: 'Saturation', example: 'sat=50', docs: 'https://images.weserv.nl/docs/adjustment.html#sat', note: ''
    },
    sharp: {
        regex: 'sharp(?:=[0-9]+)?',
        title: 'Sharpen', docs: 'https://images.weserv.nl/docs/adjustment.html#sharpen', example: 'sharp=2', note: ''
    },
    tint: {
        regex: 'tint=[a-z0-9A-Z]+',
        title: 'Tint', example: 'tint=red', docs: 'https://images.weserv.nl/docs/adjustment.html#tint', note: ''
    },
}

const deviceHints: Record<'vw' | 'vh' | 'dpr', { title: string, regex: string, note?: string }> = {
    vw: { title: 'viewport width', regex: 'vw(=[0-9.]+)?' },
    vh: { title: 'viewport height', regex: 'vh(=[0-9.]+)?' },
    dpr: { title: 'Device Pixel Ratio', regex: 'dpr', note: 'Passing `dpr` without value will use hinted DPR from client' }
}
const transformKey = Object.keys(AvailableTransforms)
    .concat(
        Object.keys(FormatAliases),
        Object.keys(AlignmentAliases),
        Object.keys(FitAliases),
        Object.keys(deviceHints),
        // these are accepted just for RC
        ['http', 'https']
    ),
    validTransforms = Object.values(AvailableTransforms).map(tx => tx.regex)
        .concat(Object.values(deviceHints).map(hint => hint.regex),
            Object.keys(FitAliases),
            Object.keys(FormatAliases),
            // these are accepted just for RC
            ['http', 'https', '_']
        ).join('|');
const transformationsGroupOld = `(?<transformations>(_?(${transformKey.join('|')})?(=[^:,_/]*)*)+)`,
    transformationsGroup = `(?<transformations>((${validTransforms})([_,;:]\\1)*)+)`,
    originhostGroup = '(?<originhost>(self|([a-z0-9:@_-]+)(\\.[a-z0-9_-]+){1,2}(\\.[a-z0-9_-]+)?(\\:\\d+)?))',
    pathNameGroup = `(?<pathname>(.*))`;


export class ResizerRouter {
    handle: (request: Request, ...extra: any) => any
    public static transformationsGroupRegex = new RegExp(`\/${transformationsGroup}\/(https?:\/\/)?${originhostGroup}\/${pathNameGroup}`)
    public static transformationsGroupOldRegex = new RegExp(`\/${transformationsGroupOld}\/(https?:\/\/)?${originhostGroup}\/${pathNameGroup}`)
    public static transformationsGroupNoDomainRegex = new RegExp(`\/${transformationsGroup}\/(?<dummyhost>([a-z0-9_-][^/]*))\/${pathNameGroup}`)
    constructor(options: RouterOptions<Request> & Partial<EnvWithBindings>) {
        const debug = (options || {}).DEBUG ? console.log.bind('ResizerRouter:') : () => { return null; },
            defaultSearchParams = {
                fit: 'contain',
                n: '-1',
                maxage: options.MAX_AGE || '1y'
            } as { fit: string, n: string, maxage: string }

        const ittyRouter = Router<RequestWithParams>({
            base: options.ROUTE_PREFIX || options.base,

            routes: [
                ['GET', ResizerRouter.transformationsGroupRegex, [ResizerRouter.handleMatchingRoute(debug, defaultSearchParams)]],
                ['GET', ResizerRouter.transformationsGroupOldRegex, [ResizerRouter.handleMatchingRoute(debug, defaultSearchParams)]],
                /**
                 * Handle the case in which no domain group could be matched. Assume its pointing to the same origin.
                 * The "dummy host" is just part of the image pathname
                 */

                ['GET', ResizerRouter.transformationsGroupNoDomainRegex, [ResizerRouter.handleMatchingRoute(debug, defaultSearchParams)]],
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
    static handleMatchingRoute(
        debugFn: { (...attrs: any[]): void } = (...attrs: any[]) => { return attrs },
        defaultSearchParams: { fit: string, n: string, maxage: string } = {
            fit: 'contain',
            n: '-1',
            maxage: '1y'
        }
    ): { (req: RequestWithParams, ctx: Context): Promise<Response> } {
        return (
            req: RequestWithParams,

            ctx: Context
        ): Promise<Response> => {
            const url = new URL(req.url),
                debug = debugFn
            req.params = req.params || {} as TImageParameters;

            req.params.origin = url.origin;
            if (req.params.dummyhost) {
                req.params.pathname = `${req.params.dummyhost}/${req.params.pathname}`
                req.params.originhost = url.host
            }
            if (['self', '0.0'].includes(req.params.originhost) || req.params.originhost.length < 4) {
                req.params.originhost = url.host
            }
            try {
                debug({
                    //cf: cf, referrerPolicy, origin: url.origin, host: url.host, hostname: url.hostname,
                    originhost: req.params.originhost,
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
                req.params = ResizerRouter.normalizeRequestParams(req, pathSearchParams)
                req.params.defaults = defaultSearchParams
                req.params.protocol = req.params.protocol || 'https';

                if (!req.params.originhost) {
                    return Promise.resolve(json(req.params))
                }
                return computeWeserveRequest(req, ctx, debug);
            } catch (e) {
                console.error(e);
                return Promise.resolve(new Response((e as Error).message, { status: 500 }))
            }
        }

    }
    static normalizeRequestParams(req: RequestWithParams, pathSearchParams: URLSearchParams): TImageParameters {
        let params = req.params as TImageParameters
        params.discarded = {} as Record<string, string>;
        params.transforms = {} as Record<string & keyof IdefaultSearchParams, string>;

        for (let [key, value] of pathSearchParams.entries()) {
            key = key.replace('format', 'output').replace('width', 'w').replace('height', 'h').replace('quality', 'q')
            if (['http', 'https'].includes(key)) {
                params.protocol = key;
            } else if (Object.keys(AvailableTransforms).includes(key)) {
                params.transforms[key as keyof IdefaultSearchParams] = value ?? true;
            } else if (Object.keys(FormatAliases).includes(key)) {
                params.transforms.output = key;
            } else if (Object.keys(FitAliases).includes(key)) {
                params.transforms.fit = key;
            } else if (Object.keys(AlignmentAliases).includes(key)) {
                params.transforms.a = key;
            } else {
                params.discarded[key as string] = value
            }
        }
        if (params.transforms['dpr'] === '' && req.headers.has('dpr')) {
            params.transforms['dpr'] = String(Number(req.headers.get('dpr')) || 1)
        }
        if (params.transforms['trim'] === '') {
            params.transforms['trim'] = "10";
        }
        if (params.discarded.vw !== undefined) {

            const vw = Number(req.headers.get('viewport-width') || req.headers.get('sec-ch-viewport-width') || req.headers.get('sec-ch-width') || req.headers.get('width'))
            if (vw || !isNaN(vw)) {
                let multiplier = Number(params.discarded.vw) || 1
                multiplier = Math.min(0, Math.max(1, multiplier))
                //  debug({ vw, multiplier })
                params.transforms.w = String(Math.ceil(multiplier * vw)) // 10 px interval
            }


        }
        if (params.discarded.vh !== undefined) {

            const vh = Number(req.headers.get('sec-ch-viewport-height'))
            if (vh && !isNaN(vh)) {
                let multiplier = Number(params.discarded.vh) || 1
                multiplier = Math.min(0, Math.max(1, multiplier))
                //  debug({ vh, multiplier })
                params.transforms.h = String(Math.ceil(multiplier * vh)) // 10 px interval
            }


        }
        return params as TImageParameters
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

async function computeWeserveRequest(
    request: RequestWithParams,

    ctx: Context,
    debug: { (...attrs: any[]): void }
): Promise<Response> {
    const { transforms, defaults, discarded, originhost, protocol, pathname, origin } = request.params || {} as TImageParameters,
        { maxage, ...otherDefaults } = defaults

    let url = new URL(request.url)

    url.pathname = pathname
    url.host = originhost
    let accepts: string = request.headers.get('accept') || '',
        fetchDest = request.headers.get('Sec-Fetch-Dest') || ''





    let { fileName, extension } = getFileName(url)
    let skipCache = url.searchParams.has('nocache')


    let urlParam = `${url.hostname}${url.pathname}`,
        weservUrl = new URL('https://images.weserv.nl/'),
        computedSearchParams = { ...otherDefaults, ...transforms }



    if (accepts.includes('webp') && computedSearchParams.output === 'auto') {
        computedSearchParams.output = 'webp';
        //if (!computedSearchParams.q) {            computedSearchParams.q = '75'        }
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
    let canonicalVariationURL = `${origin}/${transform_slug}/${originhost}/${pathname}`
    /**
     * !experimental
     * append unknown searchparams to the canonical canonicalVariationURL to check or set 
     * in the Cache API, since they may alter the final result, and we shouldn't
     * have more than one possible outcome given a canonical cached request
     */
    if (discarded_entries !== '') {
        canonicalVariationURL = [
            canonicalVariationURL,
            decodeURIComponent(discarded_entries)
        ].join('?')

    }

    urlParam = decodeURIComponent(urlParam)
    weservUrl.searchParams.set('url', urlParam);

    return getFromCacheOrThrow({ canonicalVariationURL, weservUrl, skipCache, fetchDest, debug })
        /**
         * If the variation isn't already in cache, we enter the `catch` block.
         */
        .catch((err: Error) => {


            debug({ errMessage: err.message, skipCache, fileName, extension, computedSearchParams, discarded_entries, canonicalVariationURL, protocol, fetchDest, urlParam })
            /**
             * Add some extra parameters to weserveUrl that don't interact with cache canonicalization
             */
            if (['https', 'ssl'].includes(protocol)) weservUrl.searchParams.set('url', `ssl:${urlParam}`);
            weservUrl.searchParams.set('filename', fileName);
            if (computedSearchParams.output && computedSearchParams.output !== extension) {
                let renamedFilename = fileName.replace(`${extension}`, `${computedSearchParams.output}`);
                weservUrl.searchParams.set('filename', renamedFilename);
            }
            weservUrl.searchParams.set('maxage', maxage)
            weservUrl.searchParams.sort()
            if (skipCache) weservUrl.searchParams.set('maxage', '1d') // this is the bare minimum. Sorry about that.





            /**
             * !experimental
             * Pass any unknown searchparams to weserve, verbatim
            */
            if (discarded_entries !== '') {
                for (let [paramName, paramValue] of Object.entries(discarded)) {
                    weservUrl.searchParams.set(paramName, paramValue)
                }
            }
            /**
             * WeServe understands comma separated values. Make sure we don't escape them
             */
            const weserveUrlStr = weservUrl.toString().replace(/%2C/g, ',')
            /**
             * These headers are passed verbatim to WeServe
             */
            let {
                accept,
                "accept-encoding": accept_encoding,
                "accept-language": accept_language,
                "user-agent": user_agent,
                "cache-control": cache_control,

                //Cookie
            } = Object.fromEntries(request.headers.entries())
            return computeCachedResponse(
                new Request(weserveUrlStr, {
                    headers: {
                        fileName,
                        accept,

                        "accept-encoding": accept_encoding,
                        "accept-language": accept_language,
                        "user-agent": user_agent,
                        "cache-control": cache_control,
                        "x-er-source-url": `https://${urlParam}`,
                        "x-er-input-extension": extension,
                        "x-er-canonical-variation-url": canonicalVariationURL
                    }
                }), ctx, debug)
                .catch(() => {
                    return fetch(`https://${urlParam}`)
                })
        })
}
async function computeCachedResponse(imageRequest: Request, ctx: Context, debug: (...args: any[]) => void): Promise<Response> {

    const weServeResponse = await fetch(imageRequest);

    const contentType = weServeResponse.headers.get('Content-Type') || '';
    // debug({ cacheMiss: response, event, contentType });
    if (!weServeResponse.ok || !contentType.startsWith('image')) {
        console.warn({ ok: weServeResponse.ok, contentType, statusText: weServeResponse.statusText, status: weServeResponse.status })
        return weServeResponse
    }
    /**
     * we got an image from weServe: let's perform some response manipulation and caching before returning its contents
     */
    const canonicalVariationURL = imageRequest.headers.get('x-er-canonical-variation-url'),
        fileName = imageRequest.headers.get('fileName'),
        sourceUrl = imageRequest.headers.get('x-er-source-url'),
        inputExtension = imageRequest.headers.get('x-er-input-extension') || fileName?.split('.').pop() || '',
        weserveUrlStr = imageRequest.url

    console.info({ canonicalVariationURL, weserveUrlStr, sourceUrl, fileName })
    let newExtension = contentType.split('/').pop()?.replace('jpeg', 'jpg'),
        response = new Response(weServeResponse.body, weServeResponse);

    const acceptCh = [
        'Viewport-Height', 'Sec-CH-Viewport-Height',
        'Viewport-Width', 'Sec-CH-Viewport-Width',
        'DPR', 'Sec-CH-DPR',
        'Width', 'Sec-CH-Width',
    ]
        .join(', ')

    response.headers.set('Accept-CH', acceptCh);
    response.headers.set('Vary', `${acceptCh}, Accept, Accept-Encoding`);

    response.headers.delete('cf-cache-status');
    response.headers.set('Cache-Control', 'public, max-age=' + String(31536000));
    response.headers.set('x-er-cached-On', String(Date.now()));
    response.headers.set('last-modified', new Date(Date.now() - 180000).toUTCString());
    if (sourceUrl) response.headers.set('x-er-source-url', sourceUrl);
    response.headers.set('x-er-weserve-url', weserveUrlStr);

    if (fileName) {
        response.headers.set('Content-Disposition', `inline; filename = ${decodeURIComponent(fileName.replace(inputExtension, newExtension || inputExtension)).trim()} `);
    }
    let cacheRequest = canonicalVariationURL ? new Request(canonicalVariationURL) : imageRequest
    response.headers.set('link', `<${cacheRequest.url}>; rel = "canonical"`)
    const cache = caches.default;
    debug({
        cacheHit: false,
        contentType,

        sourceUrl,
        weserveUrlStr,
        fileName,
        canonicalVariationURL
        // headers: Object.fromEntries(response.headers)
    });

    ctx.waitUntil(cache.put(cacheRequest, response.clone()));
    return response;

}



async function getFromCacheOrThrow({ canonicalVariationURL, weservUrl, skipCache, debug
}: {
    canonicalVariationURL: string, weservUrl: URL, fetchDest: string, skipCache: boolean, debug: { (...attrs: any[]): void }
}): Promise<Response> {
    if (skipCache) return Promise.reject(new Error('skipping cache'))
    /**
     * Canonical cached URL doesn't have weserv parameters `url` nor `filename`. 
     * The former is already present in the original URL.  The latter is unrelated to the image's
     * binary contents
     * @todo The protocol isn't considered either. Shoudl it be?
     */
    let response = await caches.default.match(new Request(canonicalVariationURL))

    if (!response) {
        return Promise.reject(new Error('variation not cached'))
    }
    if (!response.ok) {
        return Promise.reject(new Error(response.statusText))
    }
    const contentType = response.headers.get('Content-Type') || '';
    if (!contentType.startsWith('image/')) {
        return Promise.reject(new Error('non-image contentType: ' + contentType))
    }

    const cachedOn = response.headers.get('x-er-cached-on') || String(Date.now()),
        cachedSourceUrl = response.headers.get('x-er-source-url') || decodeURIComponent(`https://${weservUrl.searchParams.get('url')}`),
        cachedWeserveurl = decodeURIComponent(response.headers.get('x-er-weserve-url') || weservUrl.toString()),
        cachedContentDisposition = response.headers.get('Content-Disposition'),
        cachedLink = response.headers.get('link'),
        ageSeconds = Math.ceil((Date.now() - Number(cachedOn)) / 1000)
    debug({
        cacheHit: true,
        contentType,
        ageSeconds,
        cachedSourceUrl,
        cachedWeserveurl,
        cachedContentDisposition,
        cachedLink
        // headers: Object.fromEntries(response.headers)
    });
    return response;
}