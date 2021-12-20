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

Wouldn't it be nice if we could save us some keystrokes and avoid having to type the hostname twice as in

 > [*https://* resizer.pictures/*w=200_h=200*/resizer.pictures/*images/cloudflare_workers.svg*](https://resizer.pictures/w=200_h=200/resizer.pictures/images/cloudflare_workers.svg)

Sure, you can. See [Worker and image in the same host](use_cases.html#worker-and-image-in-the-same-host)

---

### 5. Alternative transformation separators

As mentioned, underscores are used as separators to compute which transformations were requested:

```html
<img src="/w=300_h=250_fit=cover/https://riff.one/designcue-unsplash.jpg">
``` 

However, the router will also accept commas as separators because... why not?

```erlang
/w=300,h=250,fit=cover/https://riff.one/designcue-unsplash.jpg
``` 

You would notice this format is somewhat similar to [Cloudflare Image Resizing](https://developers.cloudflare.com/images/image-resizing/url-format)'s:

```erlang
/cdn-cgi/image/w=300,h=250,fit=cover/https://riff.one/designcue-unsplash.jpg
``` 

Well yes, this enables (to a very limited extent) switching back and forth between Edge-Resizer and Cloudflare Image Resizing. In the same line we support aliasing `w` as `width`, `h` as `height`,  `q` as `quality` and `output` as `format`. However, no further efforts are planned to extend this syntax compatibility, and it's not feasible to think about feature parity since even operations that  existing both in [Cloudflare Image Resizing](https://developers.cloudflare.com/images/image-resizing/url-format) and images.weserv.nl, do often expect values from different sets, or have different meanings.