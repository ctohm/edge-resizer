import exportDefault from '../worker';
import type { EnvWithBindings } from 'edge-resizer'

export async function onRequest({ request, env, params, waitUntil }: { request: Request }): Promise<Response> {
    return exportDefault.fetch(request, env, { waitUntil })

}