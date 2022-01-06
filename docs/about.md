



# What is Edge-Resizer ?

Nowadays APIs such as [https://images.weserv.nl/](https://images.weserv.nl/) are capable of dinamically generating variations of a given **source image address** according to parameters defined in the URL. e.g, given the original image, transparent 800x600 png

```erlang
https://riff.one/dice.png
```

Generating a variation such as a 384x128px thumbnail, right aligned, contain fitted, whitesmoke background, jpg format on  [https://images.weserv.nl/](https://images.weserv.nl/) would build up to a lenghty and complex URL:

```erlang
https://images.weserv.nl/?a=right&bg=f5f5f5&fit=contain&h=128&output=jpg&url=ssl%3Ariff.one%2Fdice.png&w=384
```

 **Edge Resizer** was created to relief you from the burden of this complexity providing **compact, tidy and self-contained URLs** that are resolved internally. Using Edge-Resizer, the above variation could be requested as 

```erlang
https://resizer.pictures/w=384_jpg_h=128_right_contain_bg=f5f5f5/riff.one/dice.png
```



These **long lived variations** are created through [**images.weserv.nl**](https://images.weserv.nl/)'s API only when (and if) they are first requested, having further requests answer from  [Cloudflare's Edge Cache](https://developers.cloudflare.com/workers/runtime-apis/cache) at blazing speeds. 

Deploy to Cloudflare to use it with your custom domains:

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/ctohm/edge-resizer) 

### No Edge and No Resizer

Edge Resizer doesn't perform image manipulation nor persistence. It depends on 

- ![Cloudflare Workers](https://resizer.pictures/auto/deploy.workers.cloudflare.com/favicon.ico) [Cloudflare's Edge Cache](https://developers.cloudflare.com/workers/runtime-apis/cache) to do the "Edge" part
- ![images.weserve.nk](https://resizer.pictures/w=30/images.weserv.nl/logo.svg) [**images.weserv.nl**](https://images.weserv.nl/)'s API for the "Resizer" part. 

Without them, Edge Resizer would be pointless. Thank you guys, you're da real MVP 🙏.

----


### What does Edge Resizer bring to the table?


- 🔌 [Compact & tidy URLs](https://resizer.pictures/routing)
- 💊 [Feature detection](https://resizer.pictures/feature_detection) through [Client Hints](https://developer.mozilla.org/en-US/docs/Glossary/Client_hints) and other headers
- 🧠 sensible defaults and syntactic sugar
- 🚀 Finer control of caches
- :blush: ...*A cheap and amateurish version of [Cloudflare Image Resizing](https://developers.cloudflare.com/images/image-resizing)*


Throughout the documentation, a ribbon like the one below will be used to distinguish a feature, parameter,default or shortcut 

|||
| - | - |
| that is non-standard to images.weserve.nl.|![edge-resizer-feature](https://resizer.pictures/images/er-feature.png)|


## Explore the Docs:




 - [🔌 Routing Strategy](https://resizer.pictures/routing)
 - [🔳 Resize, Crop, Align](https://resizer.pictures/resizing_and_cropping)
 - [🔃 Format Conversion](https://resizer.pictures/format)
 - [♻️ Transformations](https://resizer.pictures/transformations)
 - [💊 Feature Detection](https://resizer.pictures/feature_detection)
 - [🚀 Caching](https://resizer.pictures/caching)
 - [📡 Deploying](https://resizer.pictures/deploy)
 - [💥 Troubleshooting](https://resizer.pictures/troubleshooting)