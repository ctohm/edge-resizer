# What is Edge-Resizer ?

Edge Resizer acts as a caching, optimization and transform proxy for image requests to your own or third party stored images.

Images are transformed and/or optimized through [**images.weserv.nl**](https://images.weserv.nl/)'s API, while caching is done using Cloudflare Workers's [fine control of the Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache). 

With both services, plus our own [routing logic](routing.html) and sensible defaults, long lived image variations will be generated on demand with compact and clean urls (no searchParams whatsoever) and (optionally) served from [your own subdomain](deploy.html). 

Please note **images.weserv.nl** and Cloudflare must be able to access the source URL in order to cache, proxy or generate variations.  The outcome, if successful, will be **publicly readable** regardless of the original image restrictions unless you implement access control yourself (for example, using Cloudflare Access).

-----

:blush: ...*Besides the above explanation, in all honesty you could also say it's a cheap version of [Cloudflare Image Resizing](https://developers.cloudflare.com/images/image-resizing)*


