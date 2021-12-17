
//import { version } from '../package.json';
import exportDefault from './module';
import type { EnvWithBindings } from 'edge-resizer'
addEventListener('fetch', async (event: FetchEvent) => {
  //console.log({ url, keys: Object.keys(event.request) })
  const { request } = event,

    env: EnvWithBindings = {
      WORKER_ENV,
      DEBUG,
      ROUTE_PREFIX,
      RELEASE,
      TIMESTAMP,
      MAX_AGE
    }

  event.respondWith(exportDefault.fetch(request, env, event))
});


