import { RouteEntry, Router, RouterOptions } from 'itty-router';
import { ThrowableRouter, error } from 'itty-router-extras';
import { AvailableTransforms, IdefaultSearchParams, thirdParty, AvailableFormats } from './thirdParty';

export class ResizerRouter {
    readonly validKeys = Object.keys(AvailableTransforms).concat(Object.keys(AvailableFormats), ['http', 'https', 'images', 'img']);


    debug: { (...data: any[]): void; };
    readonly domainGroup = `(?<domain>([a-z0-9._-]+))`;
    readonly pathNameGroup = `(?<pathname>(.*))`;
    /**
    *
    */
    get transformationsGroup(): string {
        return `(?<transformations>(_?(${this.validKeys.join('|')})?(=[^_/]*)*)*)`;
    }
    /**
 *
 */
    get groupRegex(): string {
        return `\/${this.transformationsGroup}\/${this.domainGroup}\/${this.pathNameGroup}?`;
    }


    handle: { (req: Request, env: EnvWithBindings, ctx: Context): Promise<any> }
    /**
     * The constructor expects the environment to avoid reading globals,
     * which might not exist when using module format
     *
     * @param {EnvWithBindings} env
     */
    constructor(options: RouterOptions<Request> & Partial<EnvWithBindings>) {
        this.debug = (options || {}).DEBUG ? console.log.bind('ResizerRouter:') : () => { return null; };

        const imageRoutes: RouteEntry<RequestWithParams>[] = [
            ['GET', new RegExp(this.groupRegex), [this.handleMatchingRoute]],
        ];
        const ittyOpts = {
            base: options.base,
            stack: true,
            routes: imageRoutes
        };

        const ittyRouter = ThrowableRouter<RequestWithParams>(ittyOpts)
            /**
             * 
             */
            .get('favicon*', (req: Request) => new Response(ResizerRouter.fallbackSvg(), { headers: { 'X-Requested': req.url } }))
            /**
             * Requests not handled at this point are forwarded as-is
             */
            .get('*', (req: Request) => {
                return fetch(req);
            })

        this.handle = async (req: Request, env: EnvWithBindings, ctx: Context) => {
            // console.log({ req })
            return ittyRouter.handle(req, env, ctx)
        }
    }

    static defaultRoutes<Q extends Request | RequestWithParams, R extends Router<Q> | ThrowableRouter<Q>>(router: R): R {
        return router
            .get('/favicon*', (req: Request) => new Response(ResizerRouter.fallbackSvg(), { headers: { 'X-Requested': req.url } }))
            /**
             * Requests not handled at this point are forwarded as-is
             */
            .get('*', (req: Request) => {
                return fetch(req);
            }) as unknown as R;
    }
    async handleMatchingRoute(
        req: RequestWithParams,
        env: EnvWithBindings,
        ctx: Context
    ): Promise<Response> {
        const url = new URL(req.url),
            debug = ((env || {}).DEBUG || url.searchParams.has('debug')) ? console.log.bind('ResizerRouter:') : () => { return null; };
        req.params = req.params || {} as TImageParameters;

        let { cf, referrerPolicy } = req;
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

            for (let [key, value] of new URLSearchParams(req.params.transformations.replace(/[_/,]/g, '&')).entries()) {
                if (['http', 'https'].includes(key))
                    req.params.protocol = key;
                if (Object.keys(AvailableTransforms).includes(key))
                    req.params.transforms[key as keyof IdefaultSearchParams] = value ?? true;
                if (Object.keys(AvailableFormats).includes(key)) {
                    debug({ output: key });
                    req.params.transforms.output = key;
                }
            }
            req.params.protocol = req.params.protocol || 'https';
            return thirdParty(req, ctx, env);
        } catch (e) {
            console.error(e);
            return error(500, (e as Error).message)
        }

    }

    static fallbackSvg(): string {
        return `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="50.8mm" height="49.98mm" viewBox="0 0 180 177.1" xmlns="http://www.w3.org/2000/svg">
  <g transform="matrix(3.9212 0 0 3.9212 6182.7 1395.7)">
  <rect x="-1574" y="-353.15" width="40.331" height="39.59" rx="2.5955" ry="2.5955" fill="#e0ffff" opacity=".857" stroke="#0063bb" stroke-linejoin="round" stroke-width="2.7109"/>
  <text x="-1553.8228" y="-341.6825" fill="#171e31" font-family="sans-serif" font-size="9.5981px" font-weight="bold" letter-spacing="0px" stroke-width=".39821" text-anchor="middle" word-spacing="0px" style="font-feature-settings:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;line-height:1.25" xml:space="preserve"><tspan x="-1553.8228" y="-341.6825" text-align="center">CTOhm</tspan><tspan x="-1553.8228" y="-329.68481" text-align="center">Edge</tspan><tspan x="-1553.8228" y="-317.68713" text-align="center">Resizer</tspan></text>
  </g>
  </svg>`;
    }

}
interface IWaitableObject {
    waitUntil: (promise: Promise<any>) => void;
}
export type TImageParameters = { transforms: Record<string & keyof IdefaultSearchParams, string>; } & {
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
}
