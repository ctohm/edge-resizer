## 🔳 Resize, Crop, Align

Edge-Resizer was conceived as a thumbnail generation tool (more like, a middleware to harness the power of those tools)

Pass w, h

- w: positive integer [🔗 Width](https://images.weserv.nl/docs/size.html#width),
- h: positive integer [🔗 Height](https://images.weserv.nl/docs/size.html#height)
- dpr: positive integer [🔗 Device Pixel Ratio](https://images.weserv.nl/docs/size.html#device-pixel-ratio) (defaults to 1)

```html
https://resizer.pictures/w=150_h=150/riff.one/images/dice.png
```

| dpr=2 w=200 | dpr=4 w=200 | dpr=2 w=200   | dpr=3 w=200 |
|----------|------|---------|  --  |
|![original](https://resizer.pictures/dpr=2_w=200/riff.one/images/dice.png) |![jpg](https://resizer.pictures/dpr=4_w=200/riff.one/images/dice.png) |  ![af](https://resizer.pictures/dpr=2_w=200/riff.one/images/designcue-unsplash.jpg)  |  ![webp](https://resizer.pictures/dpr=3_w=200/riff.one/images/designcue-unsplash.jpg) |  

<er-feature class="end" ></er-feature>

In parallel to width, height and setting a specific DPR, you can use [vw](feature_detection#vw), [vh](feature_detection#vh) to have Edge Resizer size the image according to your Client Hints headers (Sec-CH-Viewport-[width,height]). Likewise, using  [dpr](feature_detection#dpr) without a value means "check my Sec-CH-DPR header to pick the best one for me".




## Fit and Align

 - fit: [🔗 Fit](https://images.weserv.nl/docs/fit.html) (contain, cover, inside, outside, fill)
 

<er-feature  class="banner" >
<div class="feature_description"><b>💡</b> Every supported value for `fit` can also be passed in its shorthand form </div>
</er-feature>

 The following image, whose original dimensions were 200x150 is requested with dimensions 180x210.

<adjustments-grid  class="fit" :aliasprefix="'fit='" :adjustments="{'w=200_h=150':'','fit=contain':'','fit=cover':'','fit=fill':'','fit=inside':'','fit=outside':''}" :default_width="180" :default_height="210" default_tx="" image="riff.one/dice_200.png"/>






### Alignment

In scenarios where the original image will show up in a canvas larger than itself, you'd want to set exactly where in this extra room it should align: 

 - `a=top-left`
 - `a=top`
 - `a=top-right`

... you get the idea.

<er-feature  class="banner" >
<div class="feature_description"><b>💡</b> Every supported value for `a` can also be passed in its shorthand form </div>
</er-feature>

<adjustments-grid  aliasprefix='a=' :adjustments="{
    'a=top-left':'',
    'a=top':'',
    'a=top-right':'',
    'a=left':'',
    'a=center':'',
    'a=right':'',
    'a=bottom-left':'',
    'a=bottom':'',
    'a=bottom-right':''  }" :default_width="220" :default_height="190" default_tx="contain_we_cbg=77cccccc" image="riff.one/img/dice_128.png"/>

Special values `a=attention`, `a=focal` and `a=entropy` are computed according to a given image contents through some kind of sorcery. And sure, you can use the shorthand form too.

|  |  |  |
| - | - | - |
| <labeled-image  src="https://resizer.pictures/a=focal_w=230_h=220_cover_we/riff.one/fox.avif?fpx=0.1&fpy=0.4">a=focal fpx=0.1 fpy=0.6 fit=cover</labeled-image> | <labeled-image  src="https://resizer.pictures/a=entropy_w=230_h=220_cover_we/riff.one/fox.avif?fpx=0.3&fpy=0.6">w=470 fit=cover</labeled-image> | <labeled-image  src="https://resizer.pictures/a=attention_w=230_h=220_cover_we/riff.one/fox.avif?fpx=0.3&fpy=0.6">a=attention fit=cover</labeled-image> |




<available-parameters :keys="['alignments']" />




## Cropping

[Cropping](https://images.weserv.nl/docs/crop.html#rectangle-crop) is achieved through 4 parameters

-  cw: 'Crop width',
-  cy: 'Crop y',
-  cx: 'Crop x',
-  ch: 'Crop height',

This one is tricky to get right, but you can see an example on the story of [my use case](use_cases.md). 

| original w=200 h=150 | w=200 h=150 | w=200 h=150 |  w=400 h=300  |
|----------|------|---------|  --  |
|  | cx=20 cy=20 fit=cover| cx=20 cy=20 ch=54 fit=cover| cx=82 cy=67 ch=137 cw=224 fit=cover|
|![original](https://resizer.pictures/w=200_h=150/riff.one/images/printable_chart.png) |![jpg](https://resizer.pictures/w=200_h=150_cx=20_cy=20_fit=cover/riff.one/images/printable_chart.png) |  ![af](https://resizer.pictures/w=300_cx=130_cy=50_cw=180_ch=210/riff.one/images/printable_chart.png)  |  ![webp](https://resizer.pictures/w=400_h=300_cx=82_cy=67_ch=137_cw=224_fit=cover/riff.one/images/printable_chart.png) |  

Basically, taking the image AFTER any resizing, you define a rectangle of [cw] x [ch] pixels, starting from a top left corner located at [cx, cy]. 

In the example below, the original image is resized to 430 x 270. From this size we want, in turn, to crop a 180 x 210 rectangle starting from [130, 50].


<labeled-image  src="https://riff.one/crop.png"> </labeled-image>


### To width or not to width 

The final result is different if passing an explicit `width`, in which case the `fit` and `precrop` parameters become relevant too. Using fit=contain will output an image of the specified `width`, in which the cropped rectangle is padded by blank content. In turn, this blank content can be colorized using the `cbg` parameter:

<labeled-image class="bordered" src="https://resizer.pictures/cbg=ccc_w=470_cx=130_cy=50_cw=180_ch=210_contain/riff.one/designcue-unsplash-430.jpg">w=470 bg=CCC fit=contain</labeled-image>

### A note on coloring

The difference regarding the  background color and the **crop background color**, is easier to appreciate on transparent or semi-transparent images. This example algo uses rotation background color to illustrate their different scopes:


<labeled-image class="bordered" src="https://resizer.pictures/cbg=eac_bg=9ac_w=250_cw=180_ch=210_ro=10_contain/riff.one/dice.png?rbg=9c6">cbg=eac_bg=9ac_w=250_cw=180_ch=210_ro=10_contain</labeled-image>

Using `fit=cover` renders just the cropped rectangle, without blank space paddings (otherwise it would be mostly useless). Please note the output size is defined by `cw` and `ch`. Meaning: if you request width=400 and cx=200, it's only logic you'd get a 200px wide image. 

<labeled-image style="width:510px" class="bordered" src="https://resizer.pictures/w=400_cw=250_ch=250_cover_cy=80/riff.one/designcue-unsplash-430.jpg">w=400_cw=250_ch=250_cover_cy=80</labeled-image>

**But**, when the `precrop` parameter is passed, the image is cropped first and then resized, in which case the output size obeys the `w` and `h` parameters:


<labeled-image style="width:510px" class="bordered" src="https://resizer.pictures/precrop_cw=380_ch=300_cover_w=250/riff.one/designcue-unsplash-430.jpg">precrop_cw=380_ch=300_cover_w=250</labeled-image>

--------------

You can achieve neat effects by keeping a constant cw and ch, and playing with cx and cy:

<crop-table :rows="3" :cols="3"  image="riff.one/designcue-unsplash.jpg"   :cw="200" :ch="150"/>