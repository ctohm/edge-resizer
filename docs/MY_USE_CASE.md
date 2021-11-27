## Story Time: a perfect use case for the "No Query-String alternate syntax"

Free is good. Free on-demand edge cached thumbnails are even better. **But it gets better yet**. It turns out I had a mobile app in whose banner Google Play and App Store were promoted, side to side.

![banner](https://img.ctohm.com/https/ctohm.github.io/edge-resizer/docs/banner_lysto.png)

It turns out this was an unforgivable sin, for which the app was stopped from publishing further updates. 

Technically, I could modify all banners using query string:

![banner](https://img.ctohm.com/https/ctohm.github.io/edge-resizer/docs/banner_lysto.png?ch=250)
`https://img.ctohm.com/https/img.ctohm.com/banner_lysto.png?ch=250`

But their verification system didn't take those parameters in consideration. So we implemented an alternate syntax that dismisses protocol parameter and in its place, instead, encodes the query parameters. The resulting banner, in the end, was fully compliant


![banner](https://img.ctohm.com/ch=250_cx=40_cw=560_hue=110/ctohm.github.io/edge-resizer/docs/banner_lysto.png)
`https://img.ctohm.com/ch=250_cx=80_cw=470_format=webp_q=0.5/ctohm.github.io/edge-resizer/docs/banner_lysto.png`

 (hue wasn't changed. I'm just showing off)




