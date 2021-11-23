

![Logo](https://ctohm.github.io/edge-resizer/docs/ctohm_firma_correo.png)

![](https://img.shields.io/static/v1?label=Made%20With&message=TypeScript&color=f0f0f0&labelColor=3974c0&style=for-the-badge&logo=typescript&logoColor=white&messageColor=3974c0) &nbsp; &nbsp; ![](https://img.shields.io/badge/Cloudflare-Workers-orange?color=f38020&logo=cloudflare&logoColor=f38020&style=for-the-badge&labelColor=gainsboro)

Resize, crop and optimize images on the fly (according to URL parameters), cache the result on the edge and serve it from there indefinitely.



## How ?

This worker computes the original image's URL using the convention:

`https://img.ctohm.com/<protocol>/<domain>/<pathname>`

Example: 

- Origin src: `https://cf-badger.com/images/cf-badger-512x512.png`
- Edge-processed src: `https://img.ctohm.com/https/cf-badger.com/images/cf-badger-512x512.png`

Which means:

|`https://img.ctohm.com/` |`https` /| `cf-badger.com` /| `images/cf-badger-512x512.png`|
|----------|------|---------|  --- |
| *worker subdomain* |*protocol*| *origin hostname*| *origin pathname*|


#### Transformations

Query string parameters can be passed along to perform transformations over the image: resizing, optimizing, compression, changing format, cropping and changing hue. These operations are applied through [Images.weserv.nl API](https://images.weserv.nl/)

e.g `https://img.ctohm.com/https/cf-badger.com/images/cf-badger-512x512.png?w=150&h=150`

| w=150 hue=160 | w=160 h=120 cbf=green |   fit=cover sharp=2  |
|----------|------|---------|  
|![original](https://img.ctohm.com/https/cf-badger.com/images/cf-badger-512x512.png?w=150&hue=160) |![fit and cbg](https://img.ctohm.com/https/cf-badger.com/images/cf-badger-512x512.png?w=160&h=120&cbg=green) |  ![fit and cbg](https://img.ctohm.com/https/cf-badger.com/images/cf-badger-512x512.png?w=150&h=100&fit=cover&sharp=2&cbg=green) |  

In the examples above, each thumbnail is created on the fly, then cached in the edge and served from there. Further requests for the same modification on the same original image will actually be served from the cache without ever reaching Weserve nor the origin.

Also, it will be served with distant expiration times so your browser will hopefully not need requesting it anytime soon.

So yay, you've got a free on-demand thumbnail that is basically stored for free (unless we discover we've gone bankrupt due to TOS misunterstanding)

#### Alternative Syntax 

Instead of using the query string, parameters can be passed stringified in place of the protocol, replacing `&` with `_`. So instead of requesting this:

https://img.ctohm.com/https/ctohm.github.io/edge-resizer/docs/designcue-unsplash.jpg?ch=150&cy=10&w=700

I could do

https://img.ctohm.com/ch=150_cy=10_w=700/ctohm.github.io/edge-resizer/docs/designcue-unsplash.jpg

![Unsplash](https://img.ctohm.com/ch=150_cy=10_w=700/ctohm.github.io/edge-resizer/docs/designcue-unsplash.jpg)

(I found a pretty good use case in which [this syntax shines over using query string](MY_USE_CASE.md))


----------
## Available Transformations



#### [Width and Height](https://images.weserv.nl/docs/size.html#width)

-    w: 'Width',
-    h: 'Height',

- e.g. https://img.ctohm.com/w=150_h=150/cf-badger.com/images/cf-badger-512x512.png

#### Fit/Colorize/Sharpen

 - fit: [Fit](https://images.weserv.nl/docs/fit.html)
 - cbg: Background Color for Fit=Contain
 - hue: [Hue Rotation (0 to 360) ](https://images.weserv.nl/docs/adjustment.html#hue-rotation)

 - sharp: [Sharpen](https://images.weserv.nl/docs/adjustment.html#sharpen)
 - n: [Number of Pages](https://images.weserv.nl/docs/format.html#number-of-pages) (is multipage images still a thing?)



#### Compression/Optimization

- af: [Adaptative Filter](https://images.weserv.nl/docs/format.html#adaptive-filter)
- l: [Compression Level](https://images.weserv.nl/docs/format.html#compression-level)
- q: [Quality](https://images.weserv.nl/docs/format.html#quality)
- il: [Interlaced/Progressive](https://images.weserv.nl/docs/format.html#interlace-progressive)

#### Output Format and naming

- output: [Output](https://images.weserv.nl/docs/format.html#output)
- filename: [Filename](https://images.weserv.nl/docs/format.html#filename)

- e.g https://img.ctohm.com/w=100_output=gif/cf-badger.com/images/cf-badger-512x512.png

| Original (png) | JPEG |   GIF   | WEBP |
|----------|------|---------|  --  |
|![original](https://img.ctohm.com/w=100/cf-badger.com/images/cf-badger-512x512.png) |![jpg](https://img.ctohm.com/hue=40_w=100_output=jpeg/cf-badger.com/images/cf-badger-512x512.png) |  ![gif](https://img.ctohm.com/hue=90_w=100_output=gif/cf-badger.com/images/cf-badger-512x512.png) |  ![webp](https://img.ctohm.com/hue=120_w=100_output=webp/cf-badger.com/images/cf-badger-512x512.png) |  


### [Cropping](https://images.weserv.nl/docs/crop.html#rectangle-crop)

    cw: 'Crop width',
    cy: 'Crop y',
    cx: 'Crop x',
    ch: 'Crop height',

This one is tricky to get it right and deserves it's own section: **No Query-String alternate syntax**.

--------------



## TODO

- [ ] tests
- [x] fix a handful of embarassing bugs after announcing what-i-built
- [ ] use vary to deliver WEBP, then AVIF to everyone except iOS
- [ ] figure out a way to receive device pixel ratio and deliver retina images
- [ ] other transformations
- [ ] get absorbed by Cloudflare
- [ ] don't get absorbed but have massive adoption
  - [ ] lots of issues 
  - [x] anxiety
  - [ ] abandon project