# 🔃 Conversion


### Supported input formats

As stated elsewhere, Edge-Resizer delegates to [**images.weserv.nl**](https://images.weserv.nl/)'s API, and because of that, we're able to read from [quite a few formats](https://github.com/weserv/images/issues/105#issuecomment-327497304) including, but not limited to, JPG, PNG, AVIF, GIF, TIFF, PDF, SVG, ICO, WEBP.




### Output: [Output](https://images.weserv.nl/docs/format.html#output)


Using the `output` parameter it is possible to request the image to be transformed to `jpg`, `png`, `gif`, `tiff` and `webp`. When not specified, it defaults to the input format as long as it's supported.

Other formats that are valid inputs will gracefully fallback to supported output formats (mostly png and jpg tbh)


### Filename: [Filename](https://images.weserv.nl/docs/format.html#filename)

The `filename` parameter affects, for example, the name suggested when you rightclick the image and pick `save image as`. 

```html
https://img.ctohm.com/w=150_output=gif/riff.one/images/designcue-unsplash.jpg
```

| Original (png) | JPEG |   GIF   | WEBP |
|----------|------|---------|  --  |
|![original](https://img.ctohm.com/w=150_png/riff.one/images/designcue-unsplash.jpg) |![jpg](https://img.ctohm.com/hue=90_w=150_jpg/riff.one/images/designcue-unsplash.jpg) |  ![gif](https://img.ctohm.com/hue=180_w=150_gif/riff.one/images/designcue-unsplash.jpg) |  ![webp](https://img.ctohm.com/hue=270_w=150_output=webp/riff.one/images/designcue-unsplash.jpg) |  

### Feature Detection

If you pass `auto` to the `output` parameter, we'll check the  `accept` header of your request to figure out if you're using a WebP enabled browser or app. If that's the case, we'll alter the canonical request as if you explicitly asked for `webp`. [Caching](caching.html) will take place *after* this step, as to avoid using the same cache-key for devices with different feature support.