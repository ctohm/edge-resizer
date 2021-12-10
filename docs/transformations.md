# ♻️ Transformations

In this section we enumerate supported transformations such as resizing, optimizing, compression, changing format, cropping and changing hue. Other transformations can be passed directly as searchParams to the variation URL (not ideal, but :shrug:)

----------
## Available Transformations


### Colorize, Blur, Sharpen

 - bg:  [🔗 Background Color](https://images.weserv.nl/docs/adjustment.html#background) (eg  fit=contain&cbg=0f0)
 - ro:  [🔗 Rotate](https://images.weserv.nl/docs/adjustment.html#rotate)
 - modulate:
   - hue:   (0 to 360) [🔗 Hue Rotation](https://images.weserv.nl/docs/adjustment.html#hue-rotation)
   - mod: [🔗 Brightness](https://images.weserv.nl/docs/adjustment.html#brightness)
   - sat: [🔗 Saturation](https://images.weserv.nl/docs/adjustment.html#saturation)
 - sharp:  [🔗 Sharpen](https://images.weserv.nl/docs/adjustment.html#sharpen)
 - gam:  [🔗 Gamma](https://images.weserv.nl/docs/adjustment.html#gamma)
 - blur:  [🔗 Blur](https://images.weserv.nl/docs/adjustment.html#blur)
 - flip:  [🔗 Flip](https://images.weserv.nl/docs/adjustment.html#flip)
 - flop:  [🔗 Flop](https://images.weserv.nl/docs/adjustment.html#flop)
 - con:  [🔗 Contrast](https://images.weserv.nl/docs/adjustment.html#contrast)
 - filt:  [🔗 Filter](https://images.weserv.nl/docs/adjustment.html#filter)
 - trim:  [🔗 Trim](https://images.weserv.nl/docs/adjustment.html#trim) 


<adjustments-grid :adjustments="{hue:160,blur:2,sharp:3,con:7,mod:1.4,sat:0.3,gam:2,flip:'',flop:'',tint:'red',ro:90,bg:'19C'}" :default_width="210" default_tx="we"  :default_height="210" image="riff.one/dice_200.png"/>



----
#### Filters 

Filters are passed though the `filt` parameter. 

| |   |   | |
|----------|------|---------|  -- |
| <image-transform image="riff.one/designcue-unsplash.jpg" transform="w=200_filt=greyscale">greyscale</image-transform> | <image-transform image="riff.one/designcue-unsplash.jpg" transform="w=200_filt=sepia">sepia</image-transform> | <image-transform image="riff.one/designcue-unsplash.jpg" transform="w=200_filt=negate">negate</image-transform> | <image-transform image="riff.one/designcue-unsplash.jpg" transform="w=200_filt=duotone">duotone</image-transform> |
 
### Pages and Frames

- n: [Number of Pages](https://images.weserv.nl/docs/format.html#number-of-pages) 
- page: [Page](https://images.weserv.nl/docs/format.html#page)

Use the `page` parameter to skip as many pages when reading from a **PDF or multipage TIFF**.  The `n` parameter means "output n pages". Using them in combination lets you   pull a single page.

| page=1, n=2  |  n=2 (first two pages) | page=2 n=1 (only page 1) |
|----------|------|---------|
| skip 1, yield the next 2 | yields first 2 | skip 2, yield 1 page |
|![original](https://resizer.pictures/w=300_page=1_n=2/riff.one/img/sample_3pages.pdf) |![page 1](https://resizer.pictures/w=300_n=2/riff.one/img/sample_3pages.pdf) |  ![page 2](https://resizer.pictures/w=300_page=2_n=1/riff.one/img/sample_3pages.pdf) |     


Example with TIFF images,  

| page=0 n=1 | page=1 n=1 | page=2 n=1 |
|----------|------|---------|  
|![page 0](https://resizer.pictures/w=300_h=150_page=0_n=1_png/riff.one/banners2.tiff) |![page 1](https://resizer.pictures/w=300_page=1_n=1_png/riff.one/banners2.tiff)| ![page 2](https://resizer.pictures/w=300_page=2_n=1_png/riff.one/banners2.tiff) |  


 
----

On animations (this example uses an animated gif), `n`  limits the output to the first n frames. Also, applying the `page` parameter to it yields a funny effect.

| original 24 frames | limit to 6 frames | 3 frames | wtf is this? (page=2) |
|----------|------|---------|   -- |
|![original](https://resizer.pictures/w=300/riff.one/img/pig.gif) |![5 frames](https://resizer.pictures/w=300_n=6/riff.one/img/pig.gif) | ![3 frames](https://resizer.pictures/w=300_n=3_page=0/riff.one/img/pig.gif) |![original](https://resizer.pictures/w=300_page=2/riff.one/img/pig.gif) |

--- 

On **multi resolution .ico files**, the `page` parameter is used to pick a particular resolution on a  (however it had a weird effect in the pig above)

| page=1 72x72 | page=2 96x96 | page=3 128x128 |
|----------|------|---------|  
|![original](https://resizer.pictures/page=1/riff.one/img/multi_res.ico) |![5 frames](https://resizer.pictures/page=2/riff.one/img/multi_res.ico) | ![3 frames](https://resizer.pictures/page=3/riff.one/img/multi_res.ico) |  




 ### Compression/Optimization

- af: [Adaptative Filter](https://images.weserv.nl/docs/format.html#adaptive-filter) (only works on *png*)
- l: [Compression Level](https://images.weserv.nl/docs/format.html#compression-level) (number between 0 and 9. Only works on *png*, default 6)
- q: [Quality](https://images.weserv.nl/docs/format.html#quality) (only works on *jpg*, *tiff* and *webp*. number between 0 and 100, default 80)
- il: [Interlaced/Progressive](https://images.weserv.nl/docs/format.html#interlace-progressive)


| dpr=2 w=200 l=0 | dpr=2 w=200 l=6 af | dpr=2 w=200 q=100   | dpr=2 w=200 q=5 il |
|----------|------|---------|  --  |
| png 481kB | png 102kB | jpg 148kB| jpg 3.8kB  |
|![original](https://resizer.pictures/dpr=2_w=200_png_l=0/riff.one/images/dice.png) |![jpg](https://resizer.pictures/dpr=2_w=200_png_l=6_af/riff.one/images/dice.png) |  ![af](https://resizer.pictures/dpr=2_w=200_jpg_q=100/riff.one/images/designcue-unsplash.jpg)  |  ![webp](https://resizer.pictures/dpr=2_w=200_jpg_q=5/riff.one/images/designcue-unsplash.jpg) |  

