
export async function onRequest({ request }: { request: Request }): Promise<Response> {

    const vw = Number(request.headers.get('viewport-width') || request.headers.get('sec-ch-viewport-width') || request.headers.get('sec-ch-width') || request.headers.get('width')) || 'N/A'
    const vh = Number(request.headers.get('sec-ch-viewport-height')) || 'N/A'
    const dpr = Number(request.headers.get('dpr') || request.headers.get('sec-ch-dpr')) || 'N/A'
    const webp = request.headers.get('accept')?.includes('webp') ? 'yes' : 'nope'

    let placeholder = encodeURIComponent(`000?text=Viewport-Height:+${vw}%0AViewport-Width:+${vh}%0ADPR:+${dpr}%0AWebp%20support:+${webp}&font_size=21&font=museo`),
        requested = `https://resizer.pictures/auto_dpr/fakeimg.pl/300x145/fff/${placeholder}`
    console.log({ requested })
    return fetch(requested).then(res => {
        if (!res.ok) {
            return new Response(JSON.stringify({ vw, vh, dpr, webp }), { headers: { 'content-type': 'application/json' } });
        }
        return res
    })
}