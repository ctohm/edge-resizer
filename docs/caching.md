# 🚀 Caching


 

<ShowCase>
<template v-slot:first_paragraph>
Except for the very first time they are requested (and inmediately cached), variations will answer from the edge at blazing speed, and will even survive for a few months if the original image is deleted. The image to the right doesn't exist but in Cloudflare's Cache.
</template>
<template v-slot:second_paragraph>The response headers will also hint the browser not to request this same asset for a year. While this isn't much of a feature, your browser will hopefully not need requesting it anytime soon and that will shave a couple of ms off.

</template>
<template v-slot:table>

 | w=150 h=150 |
|----------|
|![150x150](https://resizer.pictures/w=150_h=150/riff.one/images/designcue-unsplash.jpg)

</template>
</ShowCase>


### Canonicalizing Transformations

The order of the search parameters doesn't affect the final outcome. However, the stringified version of the URL would be different, creating two cache entries for the same image variation. To prevent this situation, the internal routing logic of Edge Resizer figures it out so you don't have to. 

The next two URLs are equivalent

```html
https://resizer.pictures/il_w=150_h=150/riff.one/images/designcue-unsplash.jpg

https://resizer.pictures/h=150_il_w=150/riff.one/images/designcue-unsplash.jpg

```


Regarding parameters that are provided as shortcuts for others, as in the case of `png` as a shortcut for `output=png`, canonicalization resolves those shortcuts before computing the cached entry. The next two URLs are equivalent

```html
https://resizer.pictures/output=png/riff.one/images/designcue-unsplash.jpg

https://resizer.pictures/png/riff.one/images/designcue-unsplash.jpg

```

In cases where the original image is transformed according to feature detections (as in the case of `webp` format in `auto` mode ), detected feature is merged into the canonical URL before caching.  If you're using a browser with webp support, the following URLs are equivalent:


```html
https://resizer.pictures/output=auto/riff.one/images/dice.png

https://resizer.pictures/auto/riff.one/images/dice.png

https://resizer.pictures/webp/riff.one/images/dice.png

// any of the above is translated to
https://resizer.pictures/output=webp/riff.one/images/dice.png

```

## Cache Busting

TBD. For now, you can play with the `MAX_AGE` environment variable (affects the weserve request) and passing searchParam `nocache=1`.  Setting `MAX_AGE = '1d'` and `nocache=1` isn't really real-time, but it's something.

BTW, errored responses aren't cached, so that scenario is already taken care of.







 