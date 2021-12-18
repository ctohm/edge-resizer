---
title: 🚀 Caching
editLink: true
---

# {{ $frontmatter.title }}
 
---

<ShowCase>
<template v-slot:first_paragraph>
<br>
Variations are generated on demand, at which point they are stored in Cloudflare's Edge Cache. <b>Ephemeral but long lived</b>, further requests will receive a cached response at blazing speed.
</template>
<template v-slot:second_paragraph>Populating the edge cache this way 

</template>
<template v-slot:table>
    <labeled-image src="https://resizer.pictures/w=150_h=150/riff.one/images/designcue-unsplash.jpg">w=150_h=150</labeled-image>
</template>
</ShowCase>


### Canonicalizing Transformations

The order of the search parameters doesn't affect the final outcome. However, the stringified version of the URL would be different, creating two cache entries for the same image variation. To prevent this situation, the internal routing logic of Edge Resizer figures it out so you don't have to. 

The next two URLs are equivalent

```erlang
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







 