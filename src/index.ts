
//import { version } from '../package.json';
import { json, ThrowableRouter } from 'itty-router-extras';
import { AvailableTransforms, IdefaultSearchParams, thirdParty, AvailableFormats } from './thirdParty';

interface IWaitableObject {
  waitUntil: (promise: Promise<any>) => void;
}
export type RequestWithParams = Request & {
  color?: string;
  params: { transforms: Record<string & keyof IdefaultSearchParams, string> } & {
    [s: string]: string;

  };

}


const fallbackSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="50.8mm" height="49.98mm" viewBox="0 0 180 177.1" xmlns="http://www.w3.org/2000/svg">
<g transform="matrix(3.9212 0 0 3.9212 6182.7 1395.7)">
<rect x="-1574" y="-353.15" width="40.331" height="39.59" rx="2.5955" ry="2.5955" fill="#e0ffff" opacity=".857" stroke="#0063bb" stroke-linejoin="round" stroke-width="2.7109"/>
<text x="-1553.8228" y="-341.6825" fill="#171e31" font-family="sans-serif" font-size="9.5981px" font-weight="bold" letter-spacing="0px" stroke-width=".39821" text-anchor="middle" word-spacing="0px" style="font-feature-settings:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;line-height:1.25" xml:space="preserve"><tspan x="-1553.8228" y="-341.6825" text-align="center">CTOhm</tspan><tspan x="-1553.8228" y="-329.68481" text-align="center">Edge</tspan><tspan x="-1553.8228" y="-317.68713" text-align="center">Resizer</tspan></text>
</g>
</svg>`;


export type Context = {
  request: Request;

} & IWaitableObject;

const getRouter = ({ ROUTE_PREFIX: prefix }: { ROUTE_PREFIX: string }) => {
  const validKeys = Object.keys(AvailableTransforms).concat(Object.keys(AvailableFormats), ['http', 'https'])
  // handle the case in which only the prefix is passed
  if (prefix) validKeys.push(prefix)
  // IF prefix is empty then it does nothing in the regex.
  const groupRegex = `^${prefix ? ('/' + prefix) : ''}\/(?<transformations>(_?(${validKeys.join('|')})?(=[^_/]*)*)*\/?)(?<domain>([a-z0-9_.-]+))/(?<pathname>(.*))?`
  //console.log(groupRegex)
  const router = ThrowableRouter<RequestWithParams>({
    stack: true,
    routes: [


      [
        'GET', new RegExp(groupRegex)
        , [
          async (
            req: RequestWithParams,
            env: EnvWithBindings,
            ctx: Context
          ): Promise<Response> => {
            const url = new URL(req.url)
            env = { ...env, DEBUG: url.searchParams.has('debug') }
            let debug = env && env.DEBUG ? console.log.bind('computeCachedResponse:') : () => { return null }

            let { cf, referrerPolicy } = req
            req.params.transforms = {} as Record<string & keyof IdefaultSearchParams, string>
            req.params.origin = url.origin

            debug({
              cf: cf, referrerPolicy, origin: url.origin, host: url.host, hostname: url.hostname,
              transformations: req.params.transformations,
              headers: Object.fromEntries(req.headers)
            })

            for (let [key, value] of new URLSearchParams(req.params.transformations.replace(/[_/,]/g, '&')).entries()) {
              if (['http', 'https'].includes(key)) req.params.protocol = key
              if (Object.keys(AvailableTransforms).includes(key)) req.params.transforms[key as keyof IdefaultSearchParams] = value ?? true
              if (Object.keys(AvailableFormats).includes(key)) {
                debug({ output: key })
                req.params.transforms.output = key
              }
            }
            req.params.protocol = req.params.protocol || 'https'
            return thirdParty(req, ctx, env)


          }
        ]],
    ]
  })


  return router
    .get('/favicon*', (req: RequestWithParams) => new Response(fallbackSvg, { headers: { 'X-Requested': req.url } }))
    .get('*', (req: RequestWithParams) => {
      console.log('*', req.url)
      return fetch(req)
    })

}
export interface EnvWithBindings {
  DEBUG: boolean;
  WORKER_ENV: string;
  ROUTE_PREFIX: string;
}

const exportDefault = {
  fetch: async (request: Request, env: EnvWithBindings, ctx: Context): Promise<Response> => {
    return Promise.resolve(getRouter(env).handle(request, env, ctx))
      .catch((err) => {
        let warnObj = {
          error: err.message,
          stack: err.stack.split('\n'),
        };

        console.warn(warnObj);
        return json(warnObj)
      });
  }
}
addEventListener('fetch', async (event: FetchEvent) => {
  //console.log({ url, keys: Object.keys(event.request) })
  const { request } = event,
    waitUntil = event.waitUntil.bind(event),
    ctx: Context = {
      waitUntil,
      request,
    },
    env: EnvWithBindings = {
      WORKER_ENV,
      DEBUG,
      ROUTE_PREFIX
    }

  event.respondWith(exportDefault.fetch(request, env, ctx))
});




