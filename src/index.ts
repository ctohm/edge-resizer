
//import { version } from '../package.json';
import { json, ThrowableRouter } from 'itty-router-extras';

import { EnvWithBindings, Context, ResizerRouter, fallbackSvg } from 'edge-resizer/ResizerRouter'

/**
 * Ensure leading slash and no trailing slash for non empty prefixes.
 * Prefixes consisting of a single slash should be transformed to empty strings
 * @param {string} prefix
 * @returns  {string}
 */
const normalizePrefix = (prefix = '') => `/${(prefix).replace(/^\/?(.*?)\/?$/g, '$1')}`.replace(/^\/$/, '')

const exportDefault = {
  fetch: async (request: Request, env: EnvWithBindings, ctx: FetchEvent): Promise<Response> => {
    const NORMALIZED_ROUTE_PREFIX = normalizePrefix(env.ROUTE_PREFIX),
      url = new URL(request.url)
    const options = { ROUTE_PREFIX: `${NORMALIZED_ROUTE_PREFIX}/`, DEBUG: env.DEBUG || url.searchParams.has('debug') }
    ctx.passThroughOnException()
    // Replace 
    const mainRouter: ThrowableRouter<Request> = ThrowableRouter({ base: '', stack: true })
      .get('/favicon*', (req: Request) => new Response(fallbackSvg(), { headers: { "content-type": "image/svg", "cache-control": 'public, max-age=31536000', 'X-Requested': req.url } }))
      .get('/about', () => json({ worker: '@ctohm/edge-resizer', release: env.RELEASE, env: env.WORKER_ENV, route_prefix: NORMALIZED_ROUTE_PREFIX }))
      .get(`${NORMALIZED_ROUTE_PREFIX}/*`, new ResizerRouter(options).handle)
      .all('*', (req: Request) => {
        /**
         * Prevent infinite favicon loop
         */
        if (req.headers.get('referer')?.includes('favicon.ico')) {
          return new Response(null, { status: 204 })
        }

        return fetch(req)
      })



    return Promise.resolve(mainRouter.handle(request, ctx))
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

    env: EnvWithBindings = {
      WORKER_ENV,
      DEBUG,
      ROUTE_PREFIX,
      RELEASE
    }

  event.respondWith(exportDefault.fetch(request, env, event))
});


