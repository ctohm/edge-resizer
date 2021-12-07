# What is Edge-Resizer ?

Edge Resizer acts as a caching, optimization and transform proxy for image requests to your own or third party stored images.

Images are transformed and/or optimized through [**images.weserv.nl**](https://images.weserv.nl/)'s API, while caching is done using Cloudflare Workers's [fine control of the Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache). 

With both services, plus our own [routing logic](routing.html) and sensible defaults, long lived image variations will be generated on demand with compact and clean urls (no searchParams whatsoever) and (optionally) served from [your own subdomain](deploy.html). 

Please note **images.weserv.nl** and Cloudflare must be able to access the source URL in order to cache, proxy or generate variations.  The outcome, if successful, will be **publicly readable** regardless of the original image restrictions unless you implement access control yourself (for example, using Cloudflare Access).

-----

:blush: ...*Besides the above explanation, in all honesty you could also say it's a cheap version of [Cloudflare Image Resizing](https://developers.cloudflare.com/images/image-resizing)*



* ['🍬 About](https://edge.resizer.pictures/about.html)
* ['🔌 Routing Strategy](https://edge.resizer.pictures/routing.html)
* ['🔗 Hotlink at will](https://edge.resizer.pictures/hotlinking.html)
* ['🌎 Deploy your own](https://edge.resizer.pictures/deploy.html)
* ['📙 Use it as a library](https://edge.resizer.pictures/library.html)
* ['♻️ Transformations](https://edge.resizer.pictures/transformations.html)
* ['🔃 Conversion](https://edge.resizer.pictures/conversion.html)
* ['🚀 Caching](https://edge.resizer.pictures/caching.html)
* ['⛳ Use Cases](https://edge.resizer.pictures/use_cases.html)



## TODO

- [x] basic tests
- [ ] more tests
- [ ] deploy with workers
- [x] enable using Edge-Resizer as a dependency
- [x] fix a handful of embarassing bugs after announcing what-i-built
- [ ] use vary to deliver WEBP?
- [ ] figure out a way to receive device pixel ratio and deliver retina images
- [ ] other transformations
- [ ] get absorbed by Cloudflare
- [ ] don't get absorbed but have massive adoption
  - [ ] lots of issues 
  - [x] anxiety
  - [ ] abandon project