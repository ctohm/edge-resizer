import type { EnvWithBindings } from 'edge-resizer'
import { json } from 'itty-router-extras'
export async function onRequest(context: EventContext<EnvWithBindings, 'route', { vw: number, vh: number, dpr: number, webp: boolean }>): Promise<Response> {
    // Contents of context object
    const {
        request, // same as existing Worker API
        env, // same as existing Worker API
        params, // if filename includes [id] or [[path]]
        waitUntil, // same as ctx.waitUntil in existing Worker API
        next, // used for middleware or to fetch assets
        data, // arbitrary space for passing data between middlewares
    } = context,
        { destination, mode, referrer, integrity, url } = request
    const vw = Number(request.headers.get('viewport-width') || request.headers.get('sec-ch-viewport-width') || request.headers.get('sec-ch-width') || request.headers.get('width')) || 'N/A'
    const vh = Number(request.headers.get('sec-ch-viewport-height')) || 'N/A'
    const dpr = Number(request.headers.get('dpr') || request.headers.get('sec-ch-dpr')) || 'N/A'
    const webp = request.headers.get('accept')?.includes('webp') ? 'yes' : 'nope'
    console.log({ ...env, destination, mode, referrer, integrity, url })

    return json({ vw, vh, dpr, webp, env, params })
}

