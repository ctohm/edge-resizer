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
|![150x150](https://img.ctohm.com/w=150_h=150/riff.one/images/designcue-unsplash.jpg)

</template>
</ShowCase>


### Canonicalizing Transformations

The routing logic will take care of canonicalizing the transformation parameters so you don't need to care about their order. The next two URLs are equivalent

```html
https://img.ctohm.com/il_w=150_h=150/riff.one/images/designcue-unsplash.jpg

https://img.ctohm.com/h=150_il_w=150/riff.one/images/designcue-unsplash.jpg

```


Regarding parameters that are provided as shortcuts for others, as in the case of `output`, canonicalization resolves those shortcuts before computing the cached entry. The next two URLs are equivalent

```html
https://img.ctohm.com/output=png/riff.one/images/designcue-unsplash.jpg

https://img.ctohm.com/png/riff.one/images/designcue-unsplash.jpg

```

In cases where the original image is transformed according to feature detections (as in the case of `webp` format in `auto` mode ), detected feature is merged into the canonical URL before caching.  If you're using a browser with webp support, the following URLs are equivalent:


```html
https://img.ctohm.com/output=auto/riff.one/images/dice.png

https://img.ctohm.com/auto/riff.one/images/dice.png

https://img.ctohm.com/webp/riff.one/images/dice.png

// any of the above is translated to
https://img.ctohm.com/output=webp/riff.one/images/dice.png

```









 