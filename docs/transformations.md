# Transformations

Parameters can be passed along to perform transformations over the image: resizing, optimizing, compression, changing format, cropping and changing hue. These operations are applied through [Images.weserv.nl API](https://images.weserv.nl/)

e.g resize to 150x150
```html
https://img.ctohm.com/https/ctohm.github.io/edge-resizer/designcue-unsplash.jpg?w=150&h=150`
```

| w=150 h=150 |
|----------|
|![150x150](https://img.ctohm.com/w=150_h=150/ctohm.github.io/edge-resizer/designcue-unsplash.jpg)



In the example above, the thumbnail is created on the fly, then cached in the edge and served from there. Further requests for the same modification on the same original image will actually be served from the cache without ever reaching Weserve nor the origin.

Also, it will be served with distant expiration times so your browser will hopefully not need requesting it anytime soon.

So yay, you've got a free on-demand thumbnail that is basically stored for free (unless we discover we've gone bankrupt due to TOS misunterstanding)

### Alternative Syntax 

Instead of using the query string, parameters can be passed stringified in place of the protocol, replacing `&` with `_`. So instead of requesting this:

```html
https://img.ctohm.com/https/ctohm.github.io/edge-resizer/designcue-unsplash.jpg?ch=150&cy=10&w=700
```
<center>
<img src="https://img.ctohm.com/ch=150_cy=10_w=700/ctohm.github.io/edge-resizer/designcue-unsplash.jpg">

<sup>Photo by drmakete lab on Unsplash</sup>

</center>




I could achieve the same transformation (width 700, crop height 150, crop vertical offset 10 ) using:

```html
https://img.ctohm.com/ch=150_cy=10_w=700/ctohm.github.io/edge-resizer/designcue-unsplash.jpg
```

See? the query string `ch=150&cy=10&w=700` was prepended to the pathname as `ch=150_cy=10_w=700`.

Edge-Resizer understands it as:

|`https://img.ctohm.com/` |`ch=150&cy=10&w=700` | `cf-badger.com` | `images/cf-badger-512x512.png`|
|----------|------|---------|  --- |
| *worker subdomain* |*transformations*| *origin hostname*| *origin pathname*|





(I found a pretty good use case in which [this syntax shines over using query string](MY_USE_CASE.md))


----------
## Available Transformations



### Width and Height


-    w: [Width](https://images.weserv.nl/docs/size.html#width),
-    h: [Height](https://images.weserv.nl/docs/size.html#height)
- dpr: [Device Pixel Ratio](https://images.weserv.nl/docs/size.html#device-pixel-ratio)

```html
https://img.ctohm.com/w=150_h=150/ctohm.github.io/edge-resizer/designcue-unsplash.jpg
```

| w=150 h=150 | w
|----------|----------|
|![150x150](https://img.ctohm.com/w=150_h=150/ctohm.github.io/edge-resizer/designcue-unsplash.jpg)|![150x150](https://img.ctohm.com/w=150_h=150/ctohm.github.io/edge-resizer/designcue-unsplash.jpg)


### Fit/Colorize/Sharpen

 - fit: [Fit](https://images.weserv.nl/docs/fit.html) (contain, cover, inside, outside, fill)
 - bg: [Background Color](https://images.weserv.nl/docs/adjustment.html#background) (eg  fit=contain&cbg=0f0)
 - cbg: Background Color for Fit=Contain (eg  fit=contain&cbg=0f0)
 - hue: [Hue Rotation (0 to 360) ](https://images.weserv.nl/docs/adjustment.html#hue-rotation)
 - sharp: [Sharpen](https://images.weserv.nl/docs/adjustment.html#sharpen)
 - n: [Number of Pages](https://images.weserv.nl/docs/format.html#number-of-pages) (is multipage images still a thing?)

| w=100 hue=160 | w=160 h=100 cbg=green |  w=150 h=100 fit=cover sharp=4  |
|----------|------|---------|  
|![original](https://img.ctohm.com/w=100_hue=160/ctohm.github.io/edge-resizer/designcue-unsplash.jpg) |![fit and cbg](https://img.ctohm.com/w=160_h=100_cbg=green/ctohm.github.io/edge-resizer/designcue-unsplash.jpg) |  ![fit and cbg](https://img.ctohm.com/w=150_h=100_fit=cover&sharp=4/ctohm.github.io/edge-resizer/designcue-unsplash.jpg) |  

 ### Compression/Optimization

- af: [Adaptative Filter](https://images.weserv.nl/docs/format.html#adaptive-filter) (only works on *png*)
- l: [Compression Level](https://images.weserv.nl/docs/format.html#compression-level) (number between 0 and 9. Only works on *png*, default 6)
- q: [Quality](https://images.weserv.nl/docs/format.html#quality) (only works on *jpg*, *tiff* and *webp*. number between 0 and 100, default 80)
- il: [Interlaced/Progressive](https://images.weserv.nl/docs/format.html#interlace-progressive)


| dpr=2 w=200 l=0 | dpr=2 w=200 l=6 af | dpr=2 w=200 q=100   | dpr=2 w=200 q=5 il |
|----------|------|---------|  --  |
| png 481kB | png 102kB | jpg 148kB| jpg 3.8kB  |
|![original](https://img.ctohm.com/dpr=2_w=200_png_l=0/ctohm.github.io/edge-resizer/dice.png) |![jpg](https://img.ctohm.com/dpr=2_w=200_png_l=6_af/ctohm.github.io/edge-resizer/dice.png) |  ![af](https://img.ctohm.com/dpr=2_w=200_jpg_q=100/ctohm.github.io/edge-resizer/designcue-unsplash.jpg)  |  ![webp](https://img.ctohm.com/dpr=2_w=200_jpg_q=5/ctohm.github.io/edge-resizer/designcue-unsplash.jpg) |  



### Output Format and naming

- output: [Output](https://images.weserv.nl/docs/format.html#output)
- filename: [Filename](https://images.weserv.nl/docs/format.html#filename)

```html
https://img.ctohm.com/w=150_output=gif/ctohm.github.io/edge-resizer/designcue-unsplash.jpg
```

| Original (png) | JPEG |   GIF   | WEBP |
|----------|------|---------|  --  |
|![original](https://img.ctohm.com/w=150_png/ctohm.github.io/edge-resizer/designcue-unsplash.jpg) |![jpg](https://img.ctohm.com/hue=90_w=150_jpg/ctohm.github.io/edge-resizer/designcue-unsplash.jpg) |  ![gif](https://img.ctohm.com/hue=180_w=150_gif/ctohm.github.io/edge-resizer/designcue-unsplash.jpg) |  ![webp](https://img.ctohm.com/hue=270_w=150_output=webp/ctohm.github.io/edge-resizer/designcue-unsplash.jpg) |  


### Crop

[Cropping](https://images.weserv.nl/docs/crop.html#rectangle-crop) is achieved through 4 parameters

-  cw: 'Crop width',
-  cy: 'Crop y',
-  cx: 'Crop x',
-  ch: 'Crop height',

This one is tricky to get it right, but you can see an example on the story of [my use case](MY_USE_CASE.md).

| original w=200 h=150 | w=200 h=150 | w=200 h=150 |  w=400 h=300  |
|----------|------|---------|  --  |
|  | cx=20 cy=20 fit=cover| cx=20 cy=20 ch=54 fit=cover| cx=82 cy=67 ch=137 cw=224 fit=cover|
|![original](https://img.ctohm.com/w=200_h=150/ctohm.github.io/edge-resizer/printable_chart.png) |![jpg](https://img.ctohm.com/w=200_h=150_cx=20_cy=20_fit=cover/ctohm.github.io/edge-resizer/printable_chart.png) |  ![af](https://img.ctohm.com/w=200_h=150_cx=20_cy=20_ch=54_fit=cover/ctohm.github.io/edge-resizer/printable_chart.png)  |  ![webp](https://img.ctohm.com/w=400_h=300_cx=82_cy=67_ch=137_cw=224_fit=cover/ctohm.github.io/edge-resizer/printable_chart.png) |  


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