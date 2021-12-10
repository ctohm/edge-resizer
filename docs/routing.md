# 🔌 Routing Strategy

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
Given a real image, visible to cloudflare and images.weserve.nl:

> **https://riff.one/img/designcue-unsplash.jpg**

If you wanted to generate a 300x200 thumbnail, on the fly, you would request

> **https://resizer.pictures/w=300_h=200/riff.one/img/designcue-unsplash.jpg**

Edge Resizer parses that URL as

|`{transformations}` | `/{source hostname}` | `/{source pathname}`|
|------|---------|  --- |
| `w=300_h=200` | `/riff.one` | `/img/designcue-unsplash.jpg`|

 try to infer the source image's URL by taking into account, in the first place, an optional route prefix (see [deploy](deploy.html)),  then a regular expression matching the pattern of [available transformations](transformations.html). 

In the following scenarios, the source image is:



### Scenario: prefix + transformation

When both are present, **make sure the prefix comes before  the transformation part**

| *worker subdomain* |*prefix or transformation*| *origin hostname*| *origin pathname*|
|----------|------|---------|  --- |
|`zone/` |`img/w=300_h=200` | `/riff.one` | `/img/designcue-unsplash.jpg`|
|`zone/` |`img` | `/riff.one` | `/img/designcue-unsplash.jpg`|
|`zone/` |`w=300_h=200` | `/riff.one` | `/img/designcue-unsplash.jpg`|
|`zone/` |`w=300_h=200/img` | `/riff.one` |  <span style="color:red"><span style="margin:-0.5em 1em -0.2em 0 ;font-size:2em;padding:0;float:left">:cry:</span> won't work</span> |

The last URL wouldn't work. The prefix must come before the transformation part. Otherwise it would be **postfix**.

### Scenario: no prefix, no transformation

If neither is found, Edge Resizer will ultimately forward the request, unmodified. This might be ok if you're using Edge-Resizer as part of an existing site. If this is unintended, you can ensure the URL is treated as an image by passing an underscore as dummy prefix:

| *worker subdomain* |*prefix or transformation*| *origin hostname*| *origin pathname*|
|----------|------|---------|  --- |
|`zone/` |`_` | `/riff.one` | `/images/designcue-unsplash.jpg`|



### Alternative transformation separators

The transformation part of the URL you request through Edge-Resizer uses an underscore to separate parameters from each other.
Though we don't aim to offer feature parity with Cloudflare Images, using commas instead of underscores will work too, meaning there are some URLs for which 



