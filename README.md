

![Logo](repo_title.svg)

![](https://img.shields.io/static/v1?label=Made%20With&message=TypeScript&color=f0f0f0&labelColor=3974c0&style=for-the-badge&logo=typescript&logoColor=white&messageColor=3974c0) &nbsp; &nbsp; ![](https://img.shields.io/badge/Cloudflare-Workers-orange?color=f38020&logo=cloudflare&logoColor=f38020&style=for-the-badge&labelColor=gainsboro)

Resize, crop and optimize images according to URL parameters, and serve a cached result from then on.



## How ?

This worker computes the original image's URL using the convention:

`https://img.ctohm.com/<protocol>/<domain>/<pathname>`

Let's use CF-Badger logo as an example:

`https://cf-badger.com/images/cf-badger-512x512.png`

You'd request it with

`https://img.ctohm.com/` `https` / `cf-badger.com` / `images/cf-badger-512x512.png`

The original url is rebuilt and served from then on cached in the edge.

There's a middle step in which any transformations computed from the search params are applied through [Images.weserv.nl API](https://images.weserv.nl/)

----------
## Available Transformations



#### [Width and Height](https://images.weserv.nl/docs/size.html#width)

-    w: 'Width',
-    h: 'Height',

- e.g. https://img.ctohm.com/https/cf-badger.com/images/cf-badger-512x512.png?w=150&h=150

![avatar](https://img.ctohm.com/https/cf-badger.com/images/cf-badger-512x512.png?w=150&h=150)

#### Fit/Colorize/Sharpen

 - fit: [Fit](https://images.weserv.nl/docs/fit.html)
 - cbg: Background Color for Fit=Contain

 ![fit and cbg](https://img.ctohm.com/https/cf-badger.com/images/cf-badger-512x512.png?w=150&h=250&fit=contain&cbg=green)

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


#### [Cropping](https://images.weserv.nl/docs/crop.html#rectangle-crop)

    cw: 'Crop width',
    cy: 'Crop y',
    cx: 'Crop x',
    ch: 'Crop height',

(This one is tricky to get it right)