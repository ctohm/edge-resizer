# 🔃 Conversion


### Supported input formats

As stated elsewhere, Edge-Resizer delegates to [**images.weserv.nl**](https://images.weserv.nl/)'s API, and because of that, we're able to read from [quite a few formats](https://github.com/weserv/images/issues/105#issuecomment-327497304) including, but not limited to, JPG, PNG, AVIF, GIF, TIFF, PDF, SVG, ICO, WEBP.

The following formats can be safely read, but you cannot use them as output:

<span class="gray">

|ICO | PDF |   HEIC   | SVG | AVIF |
|----------|------|---------|  --  | --  |
|![ico](https://img.ctohm.com/w=150/riff.one/img/multi_res.ico) |![pdf](https://img.ctohm.com/w=150_n=1/riff.one/img/sample_3pages.pdf) |  ![heig](https://img.ctohm.com/w=150/riff.one/img/sample1.heic) |  ![svg](https://img.ctohm.com/w=128/riff.one/favicon.svg) | ![avif](https://img.ctohm.com/w=150/riff.one/img/fox.avif) 

</span>

::: warning
Conversion from SVG can yield unexpected results when referencing non-standard fonts and not embedding them.
:::
### Output: 

See also: [Output at weserv docs](https://images.weserv.nl/docs/format.html#output)


Using the `output` parameter it is possible to request the image to be transformed to `jpg`, `png`, `gif`, `tiff` and `webp`. When not specified, it defaults to the input format as long as it's among the former. Other formats that are valid inputs will gracefully fallback to supported output formats (mostly png and jpg tbh)

<output-formats :formats="[`jpg`, `png`, `gif`, `webp`]" image="https://riff.one/images/designcue-unsplash.jpg"></output-formats>

You can output TIFF too. Clicking the following link will start downloading an image:

https://img.ctohm.com/tiff/riff.one/images/designcue-unsplash.jpg



Internally, we attempt to compute the [filename](https://images.weserv.nl/docs/format.html#filename) parameter to match the request. When an output conversion is due, the filename will change accordingly.

The `filename` parameter affects, for example, the name suggested when you rightclick the image and pick `save image as`. 

```html
https://img.ctohm.com/w=150_output=gif/riff.one/images/designcue-unsplash.jpg
```

would suggest name `designcue-unsplash.gif`


### Feature Detection

If you pass `auto` to the `output` parameter, we'll check the  `accept` header of your request to figure out if you're using a WebP enabled browser or app. If that's the case, we'll alter the canonical request as if you explicitly asked for `webp`. [Caching](caching.html) will take place *after* this step, as to avoid using the same cache-key for devices with different feature support.

```html
https://img.ctohm.com/w=150_output=auto/riff.one/img/designcue-unsplash.jpg

https://img.ctohm.com/w=150_auto/riff.one/img/designcue-unsplash.jpg
```