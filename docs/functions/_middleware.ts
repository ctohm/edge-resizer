import type { EnvWithBindings } from 'edge-resizer'
import { json, error } from 'itty-router-extras'
export async function onRequest(context: EventContext<EnvWithBindings, 'route', { vw: string, vh: string, dpr: string, webp: string }>): Promise<Response> {
    const {
        request, // same as existing Worker API
        env, // same as existing Worker API
        params, // if filename includes [id] or [[path]]
        waitUntil, // same as ctx.waitUntil in existing Worker API
        next, // used for middleware or to fetch assets
        data, // arbitrary space for passing data between middlewares
    } = context,
        { destination, mode, referrer, integrity, url } = request

    const vw = String(request.headers.get('viewport-width') || request.headers.get('sec-ch-viewport-width') || request.headers.get('sec-ch-width') || request.headers.get('width')) || 'N/A'
    const vh = String(request.headers.get('sec-ch-viewport-height')) || 'N/A'
    const dpr = String(request.headers.get('dpr') || request.headers.get('sec-ch-dpr')) || 'N/A'
    const webp = request.headers.get('accept')?.includes('webp') ? 'yes' : 'nope'
    context.data = { ...context.data, vw, vh, dpr, webp }
    let placeholder = encodeURIComponent(`000?text=Viewport-Height:+${vw}%0AViewport-Width:+${vh}%0ADPR:+${dpr}%0AWebp%20support:+${webp}&font_size=21&font=museo`),
        requested = `https://resizer.pictures/auto_dpr/fakeimg.pl/300x145/fff/${placeholder}`
    console.log({ contextData: context.data })
    try {
        // wait for the next function to finish
        return await context.next()
    } catch (err) {
        // catch and report and errors when running the next function
        return new Response(`${(err as Error).message}\n${(err as Error).stack}`, { status: 500 })
    }
}