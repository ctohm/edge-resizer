# 🔌 Routing Strategy

Given a source image URL, visible to cloudflare and images.weserve.nl:

> **https://riff.one/designcue-unsplash.jpg**

If you wanted to generate a 300x200 thumbnail, on the fly, you would request

> **https://resizer.pictures/w=300_h=200/riff.one/designcue-unsplash.jpg**

(I'm using our hostname just for the example). Edge Resizer parses the pathname as:

|`{transformations}` | `/{source hostname}` | `/{source pathname}`|
|------|---------|  --- |
| `w=300_h=200/` | `riff.one` | `/designcue-unsplash.jpg`|

In this section we'll explain the logic and constraints that define if a request will be handled (and therefore if the underlying image will be proxied) or it will pass through unaltered.

### 1. Transformations are mandatory

Edge resizer will only proxy those routes whose pathname matches the [pattern of available transformations](parameters.html). 

::: tip
If you don't want to apply any transformation, but still want Edge-Resizer handle the route (for example, for caching or to avoid mixed content) pass an underscore as dummy transform:

```erlang
https://resizer.pictures/_/riff.one/img/dice.png
```
::: 



--- 

### 2. Using prefixes or namespaces


Whatever comes *before* the transformations segment is not considered to compute the source image, so it's safe to deploy Edge Resizer on particular routes instead of `*`. Any of the following
would have Edge Resizer handle the request and yield the same thumbnail:

> [*https://resizer.pictures*/w=300_h=200/*riff.one/designcue-unsplash.jpg*](https://resizer.pictures/w=300_h=200/riff.one/designcue-unsplash.jpg)
> 
> [*https://resizer.pictures*/thumbnails/w=300_h=200/*riff.one/designcue-unsplash.jpg*](https://resizer.pictures/thumbnails/w=300_h=200/riff.one/designcue-unsplash.jpg)
> 
> [*https://resizer.pictures*/foo/bar/w=300_h=200/*riff.one/designcue-unsplash.jpg*](https://resizer.pictures/foo/bar/w=300_h=200/riff.one/designcue-unsplash.jpg)

::: tip
This is particularly useful to avoid Edge Resizer being used blindly across all the zone, and instead restrict its operation to specific namespaces or prefixes.
:::

### 3. Protocol is optional 

To compute the source hostname, it's indifferent to Edge Resizer if you pass the protocol in the URL. The following are equivalent:

> [*https://resizer.pictures/w=300_h=200*/riff.one/*designcue-unsplash.jpg*](https://resizer.pictures/w=300_h=200/riff.one/designcue-unsplash.jpg)
> 
> [*https://resizer.pictures/w=300_h=200*/https://riff.one/*designcue-unsplash.jpg*](https://resizer.pictures/w=300_h=200/https://riff.one/designcue-unsplash.jpg)


### 4. Source host on the same zone

If the original image was in the same zone as the worker, eg:

> https://resizer.pictures/images/cloudflare_workers.svg

Normally, a thumbnail URL should contain the source host
 
 > [*https://* resizer.pictures/*w=200_h=200*/resizer.pictures/*images/cloudflare_workers.svg*](https://resizer.pictures/w=200_h=200/resizer.pictures/images/cloudflare_workers.svg)

Which would be parsed as

| zone | t. params | source host | source pathname |
|-|-|-|-|
| resizer.pictures/ | *w=200_h=200* | /resizer.pictures | /images/cloudflare_workers.svg |

In case you wanted to avoid repeating the hostname, there are two workarounds that you can try:

#### **Option 1**. Skip the source hostname entirely and hope for the best

The following URL yields the same result as the long one above. 

>   https://resizer.pictures/w=200/images/cloudflare_workers.svg

Internally, the router cannot detect a valid source hostname in there, but its second best choice is taking `images` as a dummy source hostname and replace it with the origin host in the next step.

However, **this won't work if you try to proxy an image in the zone's root folder**. There's simply not enough "parts" to parse and route 

> This one won't work. 
>   https://resizer.pictures/w=200/favicon.svg

In that case, use option 2.

#### **Option 2**. Use `0.0` as dummy hostname:

We use a simplified regex to identify the source image hostname as such. Since there are no hostnames shorter than 4 characters (`g.cn`) passing `0.0` or `x.x` as a dummy hostname will satisfy the route pattern and, at the same time, its length will prompt us to replace the dummy with the current request origin. Therefore:

> [*https://* resizer.pictures/*w=200_h=200*/0.0/*favicon.svg*](https://resizer.pictures/w=200_h=200/0.0/favicon.svg)

is translated to

 > [*https://* resizer.pictures/*w=200_h=200*/resizer.pictures/*images/cloudflare_workers.svg*](https://resizer.pictures/w=200_h=200/resizer.pictures/images/cloudflare_workers.svg)



### 5. Alternative transformation separators

The transformation part of the URL you request through Edge-Resizer uses an underscore to separate parameters from each other.
Though we don't aim to offer feature parity with Cloudflare Images, using commas instead of underscores will work too


```html
<img src="http://img.cdn4dd.com/cdn-cgi/image/w=300,format=auto/https://riff.one/designcue-unsplash.jpg">
``` 

<img src="https://resize.pictures/w=300_format=auto/riff.one/designcue-unsplash.jpg">

