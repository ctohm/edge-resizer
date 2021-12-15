# 🔃 Format Conversion


### Supported input formats

As stated elsewhere, (but we can't stress it enough) Edge-Resizer delegates to [**images.weserv.nl**](https://images.weserv.nl/)'s API, and because of that, we're able to read from [quite a few formats](https://github.com/weserv/images/issues/105#issuecomment-327497304) including, but not limited to, JPG, PNG, AVIF, GIF, TIFF, PDF, SVG, ICO, WEBP.

The following formats can be safely read, but you cannot use them as output:

<span class="gray">

|ICO | PDF |   HEIC   | SVG | AVIF |
|----------|------|---------|  --  | --  |
|![ico](https://resizer.pictures/w=150_page=2/riff.one/img/multi_res.ico) |![pdf](https://resizer.pictures/w=150_n=1/riff.one/img/sample_3pages.pdf) |  ![heig](https://resizer.pictures/w=150/riff.one/img/sample1.heic) |  ![svg](https://resizer.pictures/w=128/resizer.pictures/favicon.svg) | ![avif](https://resizer.pictures/w=150/riff.one/img/fox.avif) 

</span>

::: warning
Conversion from SVG can yield unexpected results when referencing non-standard fonts and not embedding them.
:::

### Output 

(See [🔗 weserve's docs about output](https://images.weserv.nl/docs/format.html#output))


Using the `output` parameter, you can have the outcome transformed to `jpg`, `png`, `gif`,  and `webp` formats. `tiff` format is also supported, but it can't be displayed inline. 

When not specified, it defaults to the input format as long as it's among the former. Other formats that are valid inputs will gracefully fallback to supported output formats (mostly png and jpg tbh)




<output-formats :only-formats="[`jpg`, `png`, `gif`, `webp`]" image="https://riff.one/images/designcue-unsplash.jpg">
</output-formats>

You can output TIFF too. Clicking the following link will start downloading an image:

https://resizer.pictures/tiff/riff.one/images/designcue-unsplash.jpg



Internally, we attempt to compute the [filename](https://images.weserv.nl/docs/format.html#filename) parameter to match the request. When an output conversion is due, the filename will change accordingly.

The `filename` parameter affects, for example, the name suggested when you rightclick the image and pick `save image as`. 

```html
https://resizer.pictures/w=150_output=gif/riff.one/images/designcue-unsplash.jpg
```

would suggest name `designcue-unsplash.gif`




 ### Compression/Optimization

- af: [Adaptative Filter](https://images.weserv.nl/docs/format.html#adaptive-filter) (only works on *png*)
- l: [Compression Level](https://images.weserv.nl/docs/format.html#compression-level) (number between 0 and 9. Only works on *png*, default 6)
- q: [Quality](https://images.weserv.nl/docs/format.html#quality) (only works on *jpg*, *tiff* and *webp*. number between 0 and 100, default 80)
- il: [Interlaced/Progressive](https://images.weserv.nl/docs/format.html#interlace-progressive)





| png  | jpg  | webp |
|----------|------|---------|
| <image-transform image="riff.one/dice.png" transform="w=400_l=0">w=400 l=0 **481kB**</image-transform>  | <image-transform image="riff.one/designcue-unsplash.jpg" transform="w=400_q=100">w=400 q=100 **147kB** </image-transform>  | <image-transform image="riff.one/designcue-unsplash.jpg" transform="cx=700_cy=500_precrop_w=400_h=300_fill_q=100_webp_flop_hue=260">webp w=400 q=100 **60kB**</image-transform> |
|  <image-transform image="riff.one/dice.png" transform="w=400_l=6_af">w=400 l=6 af  **102kB**</image-transform> |<image-transform image="riff.one/designcue-unsplash.jpg" transform="w=400 q=10">w=400 q=10 **22kB**</image-transform> | <image-transform image="riff.one/designcue-unsplash.jpg" transform="cx=700_cy=500_precrop_w=400_h=300_fill_q=10_webp_flop_hue=260">webp w=400 q=10 **5.2kB**</image-transform> |


