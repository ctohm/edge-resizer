
//import { version } from '../package.json';
import { json, ThrowableRouter } from 'itty-router-extras';

import { EnvWithBindings, ResizerRouter, fallbackSvg, AvailableTransforms, RequestWithParams } from 'edge-resizer/ResizerRouter'
function printHeaders({ vw, vh, dpr, webp }: { vw: string, vh: string, dpr: string, webp: string }): Response {

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<svg width="300px" height="100px" viewBox="0 0 300 100" xmlns="http://www.w3.org/2000/svg">
<rect x="5" y="5" width="280" height="90" rx="2.5955" ry="2.5955" fill="#e0ffff" opacity=".857" stroke="#0063bb" stroke-linejoin="round" stroke-width="2.7109"/>
<text x="0" y="50" fill="#171e31" font-family="sans-serif" font-size="12px"  letter-spacing="0px" stroke-width=".39821" text-anchor="left" 
  xml:space="preserve">
<tspan x="10" y="25" text-align="center">Detected Viewport Width: ${vw}</tspan>
<tspan x="10" y="45" text-align="center">Detected Viewport Height: ${vh}</tspan>
<tspan x="10" y="65" text-align="center">Detected DPR : ${dpr}</tspan>
<tspan x="10" y="85" text-align="center">Webp Support: ${webp ? 'yes' : 'nope'}</tspan>
</text>

</svg>`);
}
function checkHeaders(req: RequestWithParams): Promise<Response> {
  const vw = Number(req.headers.get('viewport-width') || req.headers.get('sec-ch-viewport-width') || req.headers.get('sec-ch-width') || req.headers.get('width')) || 'N/A'
  const vh = Number(req.headers.get('sec-ch-viewport-height')) || 'N/A'
  const dpr = Number(req.headers.get('dpr') || req.headers.get('sec-ch-dpr')) || 'N/A'
  const webp = req.headers.get('accept')?.includes('webp') ? 'yes' : 'nope'
  let placeholder = encodeURIComponent(`000?text=Viewport-Height:+${vw}%0AViewport-Width:+${vh}%0ADPR:+${dpr}%0AWebp%20support:+${webp}&font_size=21&font=museo`),
    requested = `https://resizer.pictures/auto_dpr/fakeimg.pl/300x145/fff/${placeholder}`
  console.log({ requested })
  return fetch(requested).then(res => {
    if (!res.ok) {
      return json(Object.fromEntries(res.headers))
    }
    return res
  })



}
/**
 * Ensure leading slash and no trailing slash for non empty prefixes.
 * Prefixes consisting of a single slash should be transformed to empty strings
 * @param {string} prefix
 * @returns  {string}
 */
const normalizePrefix = (prefix = '') => `/${(prefix).replace(/^\/?(.*?)\/?$/g, '$1')}`.replace(/^\/$/, '')

export default {
  fetch: async (request: Request, env: EnvWithBindings, ctx: FetchEvent): Promise<Response> => {
    const NORMALIZED_ROUTE_PREFIX = normalizePrefix(env.ROUTE_PREFIX),
      url = new URL(request.url)
    const options = { ROUTE_PREFIX: `${NORMALIZED_ROUTE_PREFIX}/`, DEBUG: env.DEBUG || url.searchParams.has('debug') }
    //ctx.passThroughOnException()
    const resizerRouter = new ResizerRouter(options)

    // Replace 
    const mainRouter: ThrowableRouter<Request> = ThrowableRouter({ base: '', stack: true })
      .get('/favicon*', () => new Response(fallbackSvg()))
      .get('/version', () => json({
        worker: '@ctohm/edge-resizer', debug: env.DEBUG, release: env.RELEASE, env: env.WORKER_ENV,
        timestamp: env.TIMESTAMP, deployed_at: new Date(1000 * Number(env.TIMESTAMP)).toISOString(),
        route_prefix: NORMALIZED_ROUTE_PREFIX
      }))
      .get('/transforms', () => json({
        AvailableTransforms
      }))
      .get('/detected_features', (req: RequestWithParams) => checkHeaders(req))
      .get(`${NORMALIZED_ROUTE_PREFIX}/*`,
        resizerRouter.handle)
      .get('/detected_features/:webp/:vw/:vh/:dpr', (req: RequestWithParams) => printHeaders(req.params as unknown as { vw: string, vh: string, dpr: string, webp: string }))
      .all('*', (req: Request) => {
        /**
         * Prevent infinite favicon loop
         */
        if (req.headers.get('referer')?.includes('favicon.ico')) {
          return new Response(fallbackSvg())
        }
        console.log({ catchAll: req.url })
        return fetch(req)
      })


    return mainRouter
      .handle(request, ctx)
      .catch((err: Error) => {
        let warnObj = {
          error: err.message,
          stack: (err.stack || '').split('\n'),
        };

        console.warn(warnObj);
        return json(warnObj)
      });
  }
}
