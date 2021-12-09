# 🔌 Routing Strategy

Edge Resizer will try to infer the source image's URL by taking into account, in the first place, an optional route prefix (see [deploy](deploy.html)),  then a regular expression matching the pattern of [available transformations](transformations.html). 

In the following scenarios, the source image is:

> **https://riff.one/img/designcue-unsplash.jpg**

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
Though we don't aim to offer feature parity with Cloudflare Images, 



