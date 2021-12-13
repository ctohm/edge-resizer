## :petri_dish: Feature Detection


### WebP Support

If you pass `auto` to the `output` parameter, we'll check the  `accept` header of your request to figure out if you're using a WebP enabled browser or app. If that's the case, we'll alter the canonical request as if you explicitly asked for `webp`. [Caching](caching.html) will take place *after* this step, as to avoid using the same cache-key for devices with different feature support.

```html
https://resizer.pictures/w=150_output=auto/riff.one/img/designcue-unsplash.jpg

https://resizer.pictures/w=150_auto/riff.one/img/designcue-unsplash.jpg
```