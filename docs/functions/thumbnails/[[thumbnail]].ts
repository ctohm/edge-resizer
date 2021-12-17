
export async function onRequest({ request, env, params }: { request: Request }): Promise<Response> {

    return new Response(JSON.stringify({ env, params }), { headers: { 'content-type': 'application/json' } });
}