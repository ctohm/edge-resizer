# 📙 Use it as Library

For those cases in which you want to add Edge-Resizer capabilities to your existing worker, required with `npm` or `yarn` 

```bash
npm i -D edge-resizer
```


```bash
yarn add -D edge-resizer
```

It's up to you where to have Edge-Resizer's router handle the request, but when you do, make sure you instance it with the proper `ROUTE_PREFIX` (it should have a leading slash. In this scenario there's no route normalization involved).

Parameters to the `handle` method are pretty generic: the ubiquitous Request, and an object the `waitUntil` method. The latter would be the `event` if using service-worker format, and `context`  when using module format.


### Example: Format Service-Worker

```ts 

import {ResizerRouter} from 'edge-resizer'

addEventListener('fetch', async (event: FetchEvent) => {
  const  resizeRouter=new ResizerRouter({ ROUTE_PREFIX: '/thumbnails' })
  event.respondWith(resizeRouter.handle(event.request, event))
});
``` 

### Example: Format Modules

If your worker is using the `module` format:


```ts 

import {ResizerRouter} from 'edge-resizer'

export default {
    fetch:(request, env, context) => {
        const resizeRouter=new ResizerRouter({ ROUTE_PREFIX: env.ROUTE_PREFIX || '/thumbnails' })
        return resizeRouter.handle(request, context)
    }
}

``` 

::: tip 
In the examples above, both the FetchEvent found in classic ServiceWorker format, as well as the context objet as seen in Module format implement the `waitUntil` method, which is the only enforced interface contract.
:::

::: warning
In the examples above, eventhough `resizeRouter` is a full blown itty-router instance, it has a catch-all handler already declared (and it just forwards the request). Therefore don't expect it to handle additional routes.
:::