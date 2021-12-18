## ⛳ Use Cases

### Stripping the searchParams

: this worker is all about tidy URLs. There was a particular situation for which having clean urls was crucial.


So... **Story time**

> It turns out I had a mobile app in whose banner Google Play and App Store were promoted, side to side.

<labeled-image src="https://resizer.pictures/_/riff.one/images/banner_lysto.png"><code>https://resizer.pictures/_/riff.one/images/banner_lysto.png</code></labeled-image>


It turns out this was an _unforgivable sin_, for which the app was stopped from publishing further updates. 

---

Technically, it should have been as easy as modifying all banners using query string parameters. Don't you think?

<labeled-image src="https://resizer.pictures/_/riff.one/images/banner_lysto.png?ch=250"><code>https://resizer.pictures/_/riff.one/images/banner_lysto.png?ch=250</code></labeled-image>


But we were dealing with an automated image verification system, which outright dismissed the searchstring altogether. 

By implementing our current routing logic that encodes the query parameters as part of the pathname, we achieved an output with a clean URL that the robot found to be fully compliant.

<labeled-image src="https://resizer.pictures/ch=250/riff.one/images/banner_lysto.png"><code>https://resizer.pictures/ch=250/riff.one/images/banner_lysto.png</code></labeled-image>



## Worker and image in the same host

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

