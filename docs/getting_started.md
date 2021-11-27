![edge resizer](https://img.ctohm.com/w=800_h=210_fit=contain_a=bottom_ch=180_cbg=transparent/ctohm.github.io/edge-resizer/edge-resizer.png?debug=1)
# What is Edge-Resizer

Edge Resizer acts as a caching, optimization and transform proxy for image requests to your own or third party stored images.

Image transformation is performed by [**images.weserv.nl**](https://images.weserv.nl/)'s API, while caching is done using Cloudflare Workers's [fine control of the Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache). 

By leveraging both services, plus our own routing logic and sensible defaults, we are able to turn [Images.weserv.nl API](https://images.weserv.nl/) urls, stripping the searchParams, and serve the modified image from your own domain, with a generous cache in the edge.

----- 

And, in all honesty you could also say it's a cheap version of [Cloudflare Image Resizing](https://developers.cloudflare.com/images/image-resizing) 


## How to use it?

You're more than welcome to use my deployment **https://img.ctohm.com** and hotlink at will. But, of course: 

**Edge Resizer can be deployed on your (sub)domain**. It takes an optional `ROUTE_PREFIX` environment variable that would narrow its scope to handle only requests to that in order to avoid intercepting requests it's not meant to. 

Either with or without `ROUTE_PREFIX`, either your domain or mine,  the worker will compute the original image's URL using the convention:

```html
 https://<your_subdomain> / <prefix>? / <parameters> / <domain> / <pathname>
```

Example: Let's take our current subdomain: `https://img.ctohm.com`, and let's say we want the worker to handle:

```html
https://ctohm.github.io/edge-resizer/designcue-unsplash.jpg
```

Uh, we don't have a prefix in place, so I'll use `https` as a dummy (a real one, try it)

```html
https://img.ctohm.com/https/ctohm.github.io/edge-resizer/designcue-unsplash.jpg
```

Edge-Resizer understands it as:

|`https://img.ctohm.com/` |`https` | `ctohm.github.io` | `edge-resizer/designcue-unsplash.jpg`|
|----------|------|---------|  --- |
| *worker subdomain* |*parameter*| *origin hostname*| *origin pathname*|

::: tip
If you deployed this worker using a route prefix, say `img` you should use that instead of the dummy prefix above
:::

If I had configured the worker to handle requests matching the `/thumbnails` prefix, then it should be

```html
https://img.ctohm.com/ thumbnail /ctohm.github.io/edge-resizer/designcue-unsplash.jpg
```




