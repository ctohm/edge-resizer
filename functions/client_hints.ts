
export async function onRequest({ request }: { request: Request }): Promise<Response> {

    const vw = Number(request.headers.get('viewport-width') || request.headers.get('sec-ch-viewport-width') || request.headers.get('sec-ch-width') || request.headers.get('width')) || 'N/A'
    const vh = Number(request.headers.get('sec-ch-viewport-height')) || 'N/A'
    const dpr = Number(request.headers.get('dpr') || request.headers.get('sec-ch-dpr')) || 'N/A'
    const webp = request.headers.get('accept')?.includes('webp') ? 'yes' : 'nope'
    return new Response(JSON.stringify({ vw, vh, dpr, webp }), { headers: { 'content-type': 'application/json' } });
}