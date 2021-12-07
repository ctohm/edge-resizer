## ⛳ Use Cases

### Stripping the searchParams

Story time: this worker was designed to overcome a particular situation for which having clean urls was crucial.

It turns out I had a mobile app in whose banner Google Play and App Store were promoted, side to side.


![banner](https://edge.resizer.pictures/_/riff.one/images/banner_lysto.png)

It turns out this was an unforgivable sin, for which the app was stopped from publishing further updates. 

Technically, I could modify all banners using query string:

![banner](https://edge.resizer.pictures/_/riff.one/images/banner_lysto.png?ch=250)
`https://edge.resizer.pictures/_/riff.one/images/banner_lysto.png?ch=250`

But their verification system didn't take those parameters in consideration. So we implemented our current syntax that encodes the query parameters as part of the pathname. The resulting banner, in the end, was fully compliant


![banner](https://edge.resizer.pictures/ch=250_cx=20_cw=610_auto_q=0.5/riff.one/images/banner_lysto.png)
`https://edge.resizer.pictures/ch=250_cx=80_cw=470_auto_q=0.5/riff.one/images/banner_lysto.png`

 (hue wasn't changed. I'm just showing off)




