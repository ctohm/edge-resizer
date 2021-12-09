# What is Edge-Resizer ?

Edge Resizer acts as a caching, optimization and transform proxy for image requests to your own or third party stored images.

Images are transformed and/or optimized through [**images.weserv.nl**](https://images.weserv.nl/)'s API, while caching is done using Cloudflare Workers's [fine control of the Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache). 

With both services, plus our own [routing logic](routing.html) and sensible defaults, long lived image variations will be generated on demand with compact and clean urls (no searchParams whatsoever) and (optionally) served from [your own subdomain](deploy.html). 

### TL/DR

<ShowCase>
<template v-slot:first_paragraph>
Given the image at 
</template>
<template v-slot:second_paragraph>

> https://riff.one/img/dice.png

</template>
<template v-slot:table>

![150x150](https://riff.one/img/dice_200.png)

</template>
</ShowCase>

<ShowCase>
<template v-slot:first_paragraph>
Requesting 

> https://resizer.pictures/w=260_h=250_jpg_cover/riff.one/img/dice_200.png

</template>
<template v-slot:table>

![150x150](http://192.168.0.18:8989/w=260_h=250_jpg_cover/riff.one/img/dice_200.png)

</template>
</ShowCase>

<ShowCase>
<template v-slot:first_paragraph>
Internally translates to 

> https://images.weserv.nl/?fit=cover&h=250&output=jpg&url=ssl%3Ariff.one%2Fimg%2Fdice.png&w=300


</template>
<template v-slot:table>

![150x150](https://images.weserv.nl/?fit=cover&h=250&output=jpg&url=ssl%3Ariff.one%2Fimg%2Fdice.png&w=300)

</template>
</ShowCase>



Please note **images.weserv.nl** and Cloudflare must be able to access the source URL in order to cache, proxy or generate variations.  The outcome, if successful, will be **publicly readable** regardless of the original image restrictions unless you implement access control yourself (for example, using Cloudflare Access).

[![deploy](https://cf-badger.com/badger/_92d6783acc858b700b72/endpoint.svg?branch=master&style=for-the-badge)](https://github.com/ctohm/edge-resizer/actions/workflows/deploy.yml)

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/ctohm/edge-resizer)


-----

:blush: ...*Besides the above explanation, in all honesty you could also say it's a cheap version of [Cloudflare Image Resizing](https://developers.cloudflare.com/images/image-resizing)*



* ['🍬 About](https://resizer.pictures/about.html)
* ['🔌 Routing Strategy](https://resizer.pictures/routing.html)
* ['🔗 Hotlink at will](https://resizer.pictures/hotlinking.html)
* ['🌎 Deploy your own](https://resizer.pictures/deploy.html)
* ['📙 Use it as a library](https://resizer.pictures/library.html)
* ['♻️ Transformations](https://resizer.pictures/transformations.html)
* ['🔃 Conversion](https://resizer.pictures/conversion.html)
* ['🚀 Caching](https://resizer.pictures/caching.html)
* ['⛳ Use Cases](https://resizer.pictures/use_cases.html)



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