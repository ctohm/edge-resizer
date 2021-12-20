



# What is Edge-Resizer ?

Edge Resizer was conceived as a routing middleware offering tidy URLs to complex transformations.


 translating **tidy, compact and self-contained URLs** to the (potentially) complex request needed to [dinamically generate variations](https://images.weserv.nl/) of a source image. E.g. a 256x192 thumbnail:

> **original img**: [*https://* **riff.one/designcue-unsplash.jpg**](https://riff.one/designcue-unsplash.jpg)
> 
> **thumbnail** : [*https://resizer.pictures/w=256_h=192/* **riff.one/designcue-unsplash.jpg**](https://resizer.pictures/w=256_h=192/riff.one/designcue-unsplash.jpg)

| | 
|-|
|![](https://resizer.pictures/w=196_we_right_contain_jpg/riff.one/img/dice_128.png)|


These **long lived variations** are created through [**images.weserv.nl**](https://images.weserv.nl/)'s API only when (and if) they are first requested, having further requests answer from  [Cloudflare's Edge Cache](https://developers.cloudflare.com/workers/runtime-apis/cache) at blazing speeds. 

Deploy to Cloudflare to use it with your custom domains:

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/ctohm/edge-resizer) 

### No Edge and No Resizer

Edge Resizer doesn't perform image manipulation nor persistence. It depends on 

- ![Cloudflare Workers](https://resizer.pictures/auto/deploy.workers.cloudflare.com/favicon.ico) [Cloudflare's Edge Cache](https://developers.cloudflare.com/workers/runtime-apis/cache) to do the "Edge" part
- ![images.weserve.nk](https://resizer.pictures/w=30/images.weserv.nl/logo.svg) [**images.weserv.nl**](https://images.weserv.nl/)'s API for the "Resizer" part. 

Without them, Edge Resizer would be pointless. Thank you guys, you're da real MVP 🙏.

----

 https://resizer.pictures/w=256_h=192/ riff.one/designcue-unsplash.jpg

### What does Edge Resizer bring to the table?


- 🔌 [Compact & tidy URLs](https://resizer.pictures/routing)
- 💊 [Feature detection](https://resizer.pictures/feature_detection) through [Client Hints](https://developer.mozilla.org/en-US/docs/Glossary/Client_hints) and other headers
- 🧠 sensible defaults and syntactic sugar
- 🚀 Finer control of caches
- :blush: ...*A cheap and amateurish version of [Cloudflare Image Resizing](https://developers.cloudflare.com/images/image-resizing)*



<div style="float:right;margin-right:-1em;">

![edge-resizer-feature](https://resizer.pictures/images/er-feature.png)

</div>

Throughout the documentation, a ribbon like the one to the right will be used to distinguish a feature, parameter, default or shortcut that is non-standard to images.weserve.nl.

## Explore the Docs:




 - [🔌 Routing Strategy](https://resizer.pictures/routing)
 - [🔳 Resize, Crop, Align](https://resizer.pictures/resizing_and_cropping)
 - [🔃 Format Conversion](https://resizer.pictures/format)
 - [♻️ Transformations](https://resizer.pictures/transformations)
 - [💊 Feature Detection](https://resizer.pictures/feature_detection)
 - [🚀 Caching](https://resizer.pictures/caching)
 - [📡 Deploying](https://resizer.pictures/deploy)
 - [💥 Troubleshooting](https://resizer.pictures/troubleshooting)