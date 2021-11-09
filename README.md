

![Logo](https://img.ctohm.com/repo_title.svg)

![](https://img.shields.io/static/v1?label=Made%20With&message=TypeScript&color=f0f0f0&labelColor=3974c0&style=for-the-badge&logo=typescript&logoColor=white&messageColor=3974c0) &nbsp; &nbsp; ![](https://img.shields.io/badge/Cloudflare-Workers-orange?color=f38020&logo=cloudflare&logoColor=f38020&style=for-the-badge&labelColor=gainsboro)

Resize, crop and optimize images on the fly (according to URL parameters), cache the result on the edge and serve it from there indefinitely.



## How ?

This worker computes the original image's URL using the convention:

`https://img.ctohm.com/<protocol>/<domain>/<pathname>`

Let's use CF-Badger logo as an example:

`https://cf-badger.com/images/cf-badger-512x512.png`

You'd request it with

`https://img.ctohm.com/` `https` / `cf-badger.com` / `images/cf-badger-512x512.png`

Query string parameters can be passed along to perform transformations over the image: resizing, optimizing, compression, changing format, cropping and changing hue. These operations are applied through [Images.weserv.nl API](https://images.weserv.nl/)

e.g `https://img.ctohm.com/https/cf-badger.com/images/cf-badger-512x512.png?w=150&h=150`

| w=150 hue=160 | w=120 h=160 fit=contain cbf=green |   fit=cover sharp=2  |
|----------|------|---------|  
|![original](https://img.ctohm.com/https/cf-badger.com/images/cf-badger-512x512.png?w=150&hue=160) |![fit and cbg](https://img.ctohm.com/https/cf-badger.com/images/cf-badger-512x512.png?w=120&h=160&fit=contain&cbg=green) |  ![fit and cbg](https://img.ctohm.com/https/cf-badger.com/images/cf-badger-512x512.png?w=150&h=100&fit=cover&sharp=2&cbg=green) |  

In the examples above, each thumbnail is created on the fly, then cached in the edge and served from there. Further requests for the same modification on the same original image will actually be served from the cache without ever reaching Weserve nor the origin. 

Also, it will be served with distant expiration times so your browser will hopefully not need requesting it anytime soon.

So yay, you've got a free on-demand thumbnail that is basically stored for free (unless we discover we've gone bankrupt due to TOS misunterstanding)




----------
## Available Transformations



#### [Width and Height](https://images.weserv.nl/docs/size.html#width)

-    w: 'Width',
-    h: 'Height',

- e.g. https://img.ctohm.com/https/cf-badger.com/images/cf-badger-512x512.png?w=150&h=150

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

- e.g https://img.ctohm.com/https/cf-badger.com/images/cf-badger-512x512.png?w=100&output=gif

| Original (png) | JPEG |   GIF   | WEBP |
|----------|------|---------|  --  |
|![original](https://img.ctohm.com/https/cf-badger.com/images/cf-badger-512x512.png?w=100) |![jpg](https://img.ctohm.com/hue=40_w=100/https://cf-badger.com/images/cf-badger-512x512.png?output=jpeg) |  ![gif](https://img.ctohm.com/hue=90/https://cf-badger.com/images/cf-badger-512x512.png?w=100&output=gif) |  ![webp](https://img.ctohm.com/hue=120/https://cf-badger.com/images/cf-badger-512x512.png?w=100&output=webp) |  


### [Cropping](https://images.weserv.nl/docs/crop.html#rectangle-crop)

    cw: 'Crop width',
    cy: 'Crop y',
    cx: 'Crop x',
    ch: 'Crop height',

This one is tricky to get it right and deserves it's own section: **No Query-String alternate syntax**.

--------------
## No Query-String alternate syntax

Free is good. Free on-demand edge cached thumbnails are even better. **But it gets better yet**. It turns out I had a mobile app in whose banner Google Play and App Store were promoted, side to side.

![banner](https://img.ctohm.com/banner.png)

It turns out this was an unforgivable sin, for which the app was stopped from publishing further updates. 

Technically, I could modify all banners using query string:

![banner](https://img.ctohm.com/https/img.ctohm.com/banner.png?ch=250)
`https://img.ctohm.com/https/img.ctohm.com/banner.png?ch=250`

But their verification system didn't take those parameters in consideration. So we implemented an alternate syntax that dismisses protocol parameter and in its place, instead, encodes the query parameters. The resulting banner, in the end, was fully compliant


![banner](https://img.ctohm.com/ch=250_cx=40_cw=560_hue=110/img.ctohm.com/banner.png)
`https://img.ctohm.com/ch=250_cx=80_cw=470_format=webp_q=0.5/img.ctohm.com/banner.png`

 (hue wasn't changed. I'm just showing off)

-----------



## TODO

- [ ] tests
- [ ] use vary to deliver WEBP, then AVIF to everyone except iOS
- [ ] figure out a way to receive device pixel ratio and deliver retina images
- [ ] other transformations
- [ ] get absorbed by Cloudflare
- [ ] don't get absorbed but have massive adoption
  - [ ] lots of issues 
  - [ ] anxiety
  - [ ] abandon project