## Resizing

Pass w, h

- w: [🔗 Width](https://images.weserv.nl/docs/size.html#width),
- h: [🔗 Height](https://images.weserv.nl/docs/size.html#height)
- dpr: [🔗 Device Pixel Ratio](https://images.weserv.nl/docs/size.html#device-pixel-ratio)

```html
https://resizer.pictures/w=150_h=150/riff.one/images/dice.png
```

| dpr=2 w=200 | dpr=4 w=200 | dpr=2 w=200   | dpr=3 w=200 |
|----------|------|---------|  --  |
|![original](https://resizer.pictures/dpr=2_w=200/riff.one/images/dice.png) |![jpg](https://resizer.pictures/dpr=4_w=200/riff.one/images/dice.png) |  ![af](https://resizer.pictures/dpr=2_w=200/riff.one/images/designcue-unsplash.jpg)  |  ![webp](https://resizer.pictures/dpr=3_w=200/riff.one/images/designcue-unsplash.jpg) |  



## Fit and Align

 - fit: [🔗 Fit](https://images.weserv.nl/docs/fit.html) (contain, cover, inside, outside, fill)
 
 The following image, whose original dimensions were 200x150 is requested with dimensions 180x210.

<adjustments-grid :adjustments="{'w=200_h=150':'',contain:'',cover:'',fill:'',inside:'',outside:''}" :default_width="180" :default_height="210" default_tx="" image="riff.one/dice_200.png"/>



 - cbg: Background Color for Fit=Contain (eg  fit=contain&cbg=0f0)
 - a: alignment. One of
    - top-left
    - top
    - top-right
    - left
    - center
    - right
    - bottom-left
    - bottom
    - bottom-right
    - focal
    - entropy
    - attentio

<adjustments-grid :adjustments="{
    'a=top-left':'',
    'a=top':'',
    'a=top-right':'',
    'a=left':'',
    'a=center':'',
    'a=right':'',
    'a=bottom-left':'',
    'a=bottom':'',
    'a=bottom-right':''  }" :default_width="220" :default_height="190" default_tx="contain_we_cbg=77cccccc" image="riff.one/img/dice_128.png"/>

|  |  |  |
| - | - | - |
| <labeled-image  src="https://resizer.pictures/a=focal_w=230_h=220_cover_we/riff.one/fox.avif?fpx=0.1&fpy=0.4">a=focal fpx=0.1 fpy=0.6 fit=cover</labeled-image> | <labeled-image  src="https://resizer.pictures/a=entropy_w=230_h=220_cover_we/riff.one/fox.avif?fpx=0.3&fpy=0.6">w=470 fit=cover</labeled-image> | <labeled-image  src="https://resizer.pictures/a=attention_w=230_h=220_cover_we/riff.one/fox.avif?fpx=0.3&fpy=0.6">a=attention fit=cover</labeled-image> |

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

![cropping](https://riff.one/crop.png)

The final result is different if passing an explicit `width`, in which case the `fit` and `precrop` parameters become relevant too. Using fit=contain will output an image of the specified `width`, in which the cropped rectangle is padded by blank content. In turn, this blank content can be colorized using the `bg` parameter:

<labeled-image class="bordered" src="https://resizer.pictures/cbg=ccc_w=470_cx=130_cy=50_cw=180_ch=210_contain/riff.one/designcue-unsplash-430.jpg">w=470 bg=CCC fit=contain</labeled-image>

Using `fit=cover` renders just the cropped rectangle, without blank space paddings.

<labeled-image style="width:510px" class="bordered" src="https://resizer.pictures/w=470_cx=130_cy=50_cw=180_ch=210_cover/riff.one/designcue-unsplash-430.jpg">w=470 fit=cover</labeled-image>

When the `precrop` parameter is passed, the image is cropped first and then resized to fit the specified width:


<labeled-image style="width:510px" class="bordered" src="https://resizer.pictures/precrop_w=300_cx=130_cy=50_cw=180_ch=200_cover/riff.one/designcue-unsplash-430.jpg">w=300 precrop fit=cover</labeled-image>

--------------


