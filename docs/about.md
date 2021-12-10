



# What is Edge-Resizer ?

Edge Resizer was conceived as a way to generate long thumbnails on demand for a given collection of publicly visible images, for which it would be overkill to pregenerate potentially unneded variations. Basically, the first time a given thumbnail size is requested, it's generated and cached on the edge.

Images are transformed and/or optimized through [**images.weserv.nl**](https://images.weserv.nl/)'s API, while caching is done using Cloudflare Workers's [fine control of the Cache API](https://developers.cloudflare.com/workers/runtime-apis/cache). 

With both services, plus our own [routing logic](routing.html), feature detection, syntactic sugar and sensible defaults, you basically have every possible transformation of (size, ting, hue, blur, and more) one request away. **Long lived image variations** will be generated on demand with compact and clean urls (no searchParams whatsoever) and (optionally) served from [your own subdomain](deploy.html). 


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

![150x150](https://resizer.pictures/contain_ro=90_w=180_h=140_jpg_bg=eee/riff.one/img/dice_200.png)

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

