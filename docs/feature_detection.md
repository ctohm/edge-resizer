# 💊 Feature Detection
## WebP Support

If you pass `auto` to the `output` parameter, we'll check the  `accept` header of your request to figure out if you're using a WebP enabled browser or app. If that's the case, we'll alter the canonical request as if you explicitly asked for `webp`. 

For the original image 

```
https://riff.one/img/designcue-unsplash.jpg
```

The following parameters and header would yield a WebP encoded image.

```

GET https://resizer.pictures/w=150_output=auto/riff.one/img/designcue-unsplash.jpg  
Accept: image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8

```

:::info
[Caching](caching.html) will take place *after* this step, as to avoid using the same cache-key for devices with different feature support.
:::



## Client Hints

Response headers will tell your browser we've enabled a few [Client Hints](https://developer.mozilla.org/en-US/docs/Glossary/Client_hints). When supported, its requests should include information about screen size or DPI. 

<feature-detections :keys="['vw','vh','dpr']" />
