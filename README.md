<center>

![Logo](assets/ctohm_firma_correo.svg)

![](https://img.shields.io/static/v1?label=Made%20With&message=TypeScript&color=f0f0f0&labelColor=3974c0&style=for-the-badge&logo=typescript&logoColor=white&messageColor=3974c0) &nbsp; &nbsp; ![](https://img.shields.io/badge/Cloudflare-Workers-orange?color=f38020&logo=cloudflare&logoColor=f38020&style=for-the-badge&labelColor=gainsboro)

Resize, crop and optimize images according to URL parameters, and serve a cached result from then on.

</center>

## How ?

This worker computes the original image's URL using the convention:

`https://img.ctohm.com/<protocol>/<domain>/<pathname>`

Let's use our Github Avatar as an example:

`https://avatars.githubusercontent.com/u/71311688`

You'd request it with

`https://img.ctohm.com/https/avatars.githubusercontent.com/u/71311688`

The original url is rebuilt and served from then on cached in the edge.

There's a middle step in which any transformations computed from the search params are applied through [Images.weserv.nl API](https://images.weserv.nl/)

----------
## Available Transformations



#### [Width and Height](https://images.weserv.nl/docs/size.html#width)

-    w: 'Width',
-    h: 'Height',



#### Fit/Colorize/Sharpen

 - fit: [Fit](https://images.weserv.nl/docs/fit.html)
 - cbg: [Background Color for Fit=Contain](https://images.weserv.nl/docs/format.html#compression-level)
 - sharp: [Sharpen](https://images.weserv.nl/docs/adjustment.html#sharpen)
 - n: [Number of Pages](https://images.weserv.nl/docs/format.html#number-of-pages) (is multipage images still a thing?)

#### [Cropping](https://images.weserv.nl/docs/crop.html#rectangle-crop)

    cw: 'Crop width',
    cy: 'Crop y',
    cx: 'Crop x',
    ch: 'Crop height',
#### Compression/Optimization

- af: [Adaptative Filter](https://images.weserv.nl/docs/format.html#adaptive-filter)
- l: [Compression Level](https://images.weserv.nl/docs/format.html#compression-level)
- q: [Quality](https://images.weserv.nl/docs/format.html#quality)
- il: [Interlaced/Progressive](https://images.weserv.nl/docs/format.html#interlace-progressive)

#### Output Format and naming

- output: [Output](https://images.weserv.nl/docs/format.html#output)
- filename: [Filename](https://images.weserv.nl/docs/format.html#filename)


