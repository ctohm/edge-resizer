

* ['🍬 About](https://resizer.pictures/about.html)
* ['🔌 Routing Strategy](https://resizer.pictures/routing.html)
* ['🔗 Hotlink at will](https://resizer.pictures/hotlinking.html)
* ['🌎 Deploy your own](https://resizer.pictures/deploy.html)
* ['📙 Use it as a library](https://resizer.pictures/library.html)
* ['♻️ Transformations](https://resizer.pictures/transformations.html)
* ['🔃 Conversion](https://resizer.pictures/conversion.html)
* ['🚀 Caching](https://resizer.pictures/caching.html)
* ['⛳ Use Cases](https://resizer.pictures/use_cases.html)
* ['💥 Troubleshooting'](https://resizer.pictures/troubleshooting.html)

# What is Edge-Resizer ?

Edge Resizer acts as a caching, optimization and transform proxy for image requests to your own or third party stored images.

Images are transformed and/or optimized through [**images.weserv.nl**](https://images.weserv.nl/)'s API, while caching is done using Cloudflare Workers's [fine control of the Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache). 

With both services, plus our own [routing logic](routing.html) and sensible defaults, long lived image variations will be generated on demand with compact and clean urls (no searchParams whatsoever) and (optionally) served from [your own subdomain](deploy.html). 

### TL/DR

<ShowCase class="bordered">
<template v-slot:first_paragraph>
Given the image at 
</template>
<template v-slot:second_paragraph>

> https://riff.one/img/dice.png

</template>
<template v-slot:table >

![150x150](https://riff.one/img/dice_200.png)

</template>
</ShowCase>

<ShowCase>
<template v-slot:first_paragraph>
Requesting 

https://resizer.pictures/fill_h=200_gif/riff.one/img/dice_200.png

<br><br>
Internally translates to 

</template>

<template v-slot:table>

![150x150](https://resizer.pictures/contain_a=top-right_w=180_h=140_jpg_bg=eee/riff.one/img/dice_200.png)
![150x150](https://resizer.pictures/contain_a=bottom-left_w=180_h=160_jpg_bg=eee/riff.one/img/dice_200.png)

</template>
</ShowCase>

```html
https://images.weserv.nl/?fit=fill&h=200&output=gif&url=ssl%3Ariff.one%2Fimg%2Fdice_200.png
```


Besides it being a tidier URL, the [caching](caching.html) layer on top of the response will use the nice URL as cache key



::: warning 
Please note **images.weserv.nl** and Cloudflare must be able to access the source URL in order to cache, proxy or generate variations.  The outcome, if successful, will be **publicly readable** regardless of the original image restrictions unless you implement access control yourself (for example, using Cloudflare Access).
::: 





-----

:blush: ...*Besides the above explanation, in all honesty you could also say it's a cheap version of [Cloudflare Image Resizing](https://developers.cloudflare.com/images/image-resizing)*

