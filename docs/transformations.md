# ♻️ Effects & Filters

In this section we enumerate supported transformations such as resizing, optimizing, compression, changing format, cropping and changing hue. Other transformations can be passed directly as searchParams to the variation URL (not ideal, but :shrug:)

----------


### Colorize, Blur, Sharpen

 - blur:  [🔗 Blur](https://images.weserv.nl/docs/adjustment.html#blur)
 - sharp:  [🔗 Sharpen](https://images.weserv.nl/docs/adjustment.html#sharpen)
 - con:  [🔗 Contrast](https://images.weserv.nl/docs/adjustment.html#contrast)
 - hue:   (0 to 360) [🔗 Hue Rotation](https://images.weserv.nl/docs/adjustment.html#hue-rotation)
 - mod: [🔗 Brightness](https://images.weserv.nl/docs/adjustment.html#brightness)
 - sat: [🔗 Saturation](https://images.weserv.nl/docs/adjustment.html#saturation)
 - gam:  [🔗 Gamma](https://images.weserv.nl/docs/adjustment.html#gamma)
 - bg:  [🔗 Background Color](https://images.weserv.nl/docs/adjustment.html#background)
 

<p>
&nbsp;
</p>
<adjustments-grid :adjustments="{blur:2,sharp:3,con:7,hue:160,mod:1.4,sat:0.3,gam:2,tint:'red',bg:'19C'}" :default_width="210" default_tx="we"  :default_height="210" image="riff.one/dice_200.png"/>

### Rotation, Flip, Flop 

- ro:  [🔗 Rotate](https://images.weserv.nl/docs/adjustment.html#rotate)
- flip:  [🔗 Flip](https://images.weserv.nl/docs/adjustment.html#flip)
- flop:  [🔗 Flop](https://images.weserv.nl/docs/adjustment.html#flop)

<adjustments-grid :adjustments="{flip:'',flop:'',ro:270}" :default_width="210" default_tx="we"  :default_height="210" image="resizer.pictures/we_h=300_ch=270_cx=130_cw=300_cover/riff.one/designcue-unsplash.jpg"/>

----
#### Filters 

Filters are passed though the `filt` parameter.  (See [🔗 Filter](https://images.weserv.nl/docs/adjustment.html#filter))

| |   |   | 
|----------|------|---------|
| <image-transform image="riff.one/designcue-unsplash.jpg" transform="w=200_filt=greyscale">/filt=greyscale/</image-transform> | <image-transform image="riff.one/designcue-unsplash.jpg" transform="w=200_filt=sepia">/filt=sepia/</image-transform> | <image-transform image="riff.one/designcue-unsplash.jpg" transform="w=200_filt=negate">/filt=negate/</image-transform> | 

Duotone filters have, by default, `start=C83658` and `stop=D8E74F`.


| | | |
|----------|------|---------|
| <image-transform image="riff.one/designcue-unsplash.jpg" transform="w=200_filt=duotone">default duotone </image-transform> | <image-transform image="riff.one/designcue-unsplash.jpg?>start=C60&stop=96F" transform="w=200_filt=duotone">start=C60&stop=96F</image-transform> | <image-transform image="riff.one/designcue-unsplash.jpg?start=06C&stop=0C6" transform="w=200_filt=duotone">start=06C&stop=0C6</image-transform> | 
 
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


