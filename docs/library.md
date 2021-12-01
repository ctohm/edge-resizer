# 📙 Use it as Library

For those cases in which you want to add Edge-Resizer capabilities to your existing worker, required with `npm` or `yarn` 

```bash
npm i -D @ctohm/edge-resizer
```


```bash
yarn add -D @ctohm/edge-resizer
```

It's up to you where to have Edge-Resizer's router handle the request, but when you do, make sure you instance it with the proper `ROUTE_PREFIX` (it should have a leading slash).

Parameters to the `handle` method are pretty generic: the ubiquitous Request, an environment containing your bindings (for which an empty object is fine)  and a context implementing the `waitUntil` method. 


### Example: Format ServiceWorker

```ts 

import { EnvWithBindings,   ResizerRouter } from './ResizerRouter'

addEventListener('fetch', async (event: FetchEvent) => {
  //console.log({ url, keys: Object.keys(event.request) })
  const { request } = event,
    
    env: EnvWithBindings = {
      WORKER_ENV,
      DEBUG,
      ROUTE_PREFIX='/'
    },
    resizeRouter=new ResizerRouter({base:ROUTE_PREFIX})

  event.respondWith(resizeRouter.handle(request, env, event))
});
``` 

### Example: Format Modules

If your worker is using the `module` format:


```ts 

import { EnvWithBindings,   ResizerRouter } from './ResizerRouter'

export default {
    fetch:(request,env,context) => {
        const resizeRouter=new ResizerRouter({base:ROUTE_PREFIX})
        return resizeRouter.handle(request, env, context)
    }
}

``` 

::: tip 
In the examples above, both the FetchEvent found in classic ServiceWorker format, as well as the context objet as seen in Module format implement the `waitUntil` method, which is the only enforced interface contract.