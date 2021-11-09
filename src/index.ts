
//import { version } from '../package.json';
import { json, ThrowableRouter, text } from 'itty-router-extras';
import { fallbackSvg } from './fallback_svg';
import { AvailableTransforms, IdefaultSearchParams, thirdParty } from './thirdParty';
import { home_html } from './home_html';

interface IWaitableObject {
  waitUntil: (promise: Promise<any>) => void;
}
export type RequestWithParams = Request & {
  color?: string;
  params: { transforms: Record<string & keyof IdefaultSearchParams, string> } & {
    [s: string]: string;

  };

}

import { getAssetFromKV } from '@cloudflare/kv-asset-handler';




export interface EnvWithBindings {

  PNG_QUALITY: number;
  JPG_QUALITY: number;

  WORKER_ENV: string;

}

export type Context = {
  request: Request;

} & IWaitableObject;
const router = ThrowableRouter<RequestWithParams>({
  stack: true,
  routes: [
    [
      'GET', new RegExp(`(?:_)?([^=/]+)(=?[^_/]*)\/(?<domain>([a-z0-9_.-]+))/(?<pathname>(.*))?`)
      , [
        async (
          req: RequestWithParams,
          env: EnvWithBindings,
          ctx: Context
        ): Promise<Response> => {
          const transformSegment = new URL(req.url).pathname.split('/')[1]
          req.params.transforms = {} as Record<string & keyof IdefaultSearchParams, string>

          for (let [key, value] of new URLSearchParams(transformSegment.replace(/_/g, '&')).entries()) {
            if (['http', 'https'].includes(key)) {
              req.params.protocol = key
            }
            //let [full, key, value] = match as [string, keyof IdefaultSearchParams, string];
            //full = full + '' // TS stop nagging pls
            if (Object.keys(AvailableTransforms).includes(key)) {
              req.params.transforms[key as keyof IdefaultSearchParams] = value ?? true
            }

          }
          req.params.protocol = req.params.protocol || 'https'
          console.log({ params: req.params })
          return thirdParty(req, env, ctx)


        }
      ]],
  ]
})


router
  //.get('/(?:_)?([^=]+)=([^_]+)/')
  //.get(`/(http|https)/:domain/:pathname*`, thirdParty)
  .get('/favicon.ico', () => new Response(fallbackSvg, { headers: { 'Content-Type': 'image/svg' } }))
  .get('*',
    (
      request: RequestWithParams, env: EnvWithBindings, ctx: Context) => getAssetFromKV({ request, waitUntil: ctx.waitUntil } as unknown as FetchEvent
      )
  )



const exportDefault = {
  fetch: async (request: Request, env: EnvWithBindings, ctx: Context): Promise<Response> => {
    return Promise.resolve(router.handle(request, env, ctx))
      .catch((err) => {
        let warnObj = {
          error: err.message,
          stack: err.stack.split('\n'),
        };

        console.warn(warnObj, env);
        return json(warnObj)
      });
  }
}
addEventListener('fetch', async (event: FetchEvent) => {
  //console.log({ url, keys: Object.keys(event.request) })
  const env: EnvWithBindings = {

    PNG_QUALITY,
    JPG_QUALITY,

    WORKER_ENV,
  },
    { request } = event,
    waitUntil = event.waitUntil.bind(event),
    ctx: Context = {
      waitUntil,
      request,
    }

  event.respondWith(exportDefault.fetch(request, env, ctx))
});




