# 🔌 Routing Strategy

Edge Resizer will try to infer the source image's URL by taking into account, in the first place, an optional route prefix (see [deploy](deploy.html)),  then a regular expression matching the pattern of [available transformations](transformations.html). 

In the following scenarios, the source image is:

> **https://riff.one/images/designcue-unsplash.jpg**

### Scenario: prefix + transformation

When both are present, **make sure the prefix comes before  the transformation part**

| *worker subdomain* |*prefix or transformation*| *origin hostname*| *origin pathname*|
|----------|------|---------|  --- |
|`zone/` |`img/w=300_h=200` | `/riff.one` | `/images/designcue-unsplash.jpg`|
|`zone/` |`img` | `/riff.one` | `/images/designcue-unsplash.jpg`|
|`zone/` |`w=300_h=200` | `/riff.one` | `/images/designcue-unsplash.jpg`|
|`zone/` |`w=300_h=200/img` | `/riff.one` |  <span style="color:red"><span style="margin:-0.5em 1em -0.2em 0 ;font-size:2em;padding:0;float:left">:cry:</span> won't work</span> |

The last URL wouldn't work. The prefix must come before the transformation part. Otherwise it would be **postfix**.

### Scenario: no prefix, no transformation

If neither is found, Edge Resizer will ultimately forward the request, unmodified. This might be ok if you're using Edge-Resizer as part of an existing site. If this is unintended, you can ensure the URL is treated as an image by passing an underscore as dummy prefix:

| *worker subdomain* |*prefix or transformation*| *origin hostname*| *origin pathname*|
|----------|------|---------|  --- |
|`zone/` |`_` | `/riff.one` | `/images/designcue-unsplash.jpg`|



## Transformation vs searchParams

Internally, requested transformations are translated to searchParams as expected by  [img.weserv.nl](https://img.weserv.nl). You can pass said searchParams directly and they'll be forwarded accordingly. 


::: info 💡 The following are equivalent
https://edge.resizer.pictures/_/riff.one/images/designcue-unsplash.jpg?ch=150&w=700

https://edge.resizer.pictures/ch=150_w=700/riff.one/images/designcue-unsplash.jpg
:::


<div style="margin:0 auto;">
<img src="https://edge.resizer.pictures/ch=150_w=700/riff.one/images/designcue-unsplash.jpg">

<sup style="margin:-1em auto 1em;width:100%;display:block;text-align:center">Photo by drmakete lab on Unsplash</sup>

</div>

This is the only way in which some transformations detailed on [images.weserv.nl docs](https://images.weserv.nl/docs/), which we don't explicitly consider, can be applied to your images.

---

You might wonder: "*why not just use the searchParams and forget about routing?*". Well: There was  **[:boom: a very practical reason](use_cases.html)** to implement our routing logic. But having compact and tidy URLs is nice by itself, isn't it?








