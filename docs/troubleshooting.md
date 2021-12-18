# 💥 Troubleshooting

## I need to proxy an image including its query params

URI Encode its pathname! Internally we will `decodeURIComponent` anyway, so given an image such as

<labeled-image src="https://via.placeholder.com/600x190/000.png?text=example"><b>🔗 https://via.placeholder.com/600x190/000.png?text=example</b></labeled-image>


You would request it as if the filename was 

```js
encodeURIComponent('000.png?text=image+with+search+parameters')
```

Therefore:

<labeled-image src="https://resizer.pictures/_/via.placeholder.com/600x190/000.png%3Ftext%3Dexample"><b>🔗 https://resizer.pictures/_/via.placeholder.com/600x190/000.png%3Ftext%3Dexample</b></labeled-image>

Don't encode the full image source. If you do so, Edge Resizer won't be able to identify its parts.

------

## A transformation works in *images.weserve.nl* but not here

Internally, requested transformations are translated to searchParams as expected by  [images.weserv.nl](https://images.weserv.nl). You can pass said searchParams directly and they'll be forwarded accordingly. 


::: info 💡 The following are equivalent
https://resizer.pictures/_/riff.one/img/designcue-unsplash.jpg?hue=150&w=700

https://resizer.pictures/hue=150_w=700/riff.one/img/designcue-unsplash.jpg
:::



<labeled-image src="https://resizer.pictures/ch=150_w=700/riff.one/img/designcue-unsplash.jpg">Photo by DesignCue on Unsplash </labeled-image>

Searchparams that we don't explicitly support are passed as-is to [images.weserv.nl](https://images.weserv.nl). 

For example, we don't support the syntax  `mod=[brightness multiplier],[saturation multiplier],[hue degrees]`  for the [modulate](https://images.weserv.nl/docs/adjustment.html#modulate), since [commas have a special meaning](routing.html#_5-alternative-transformation-separators) for our router

<labeled-image src="https://resizer.pictures/w=420/riff.one/img/dice.png?mod=0.8,2,114">https://resizer.pictures/w=420/riff.one/img/dice.png?mod=0.8,2,114</labeled-image>


This is the only way in which some transformations detailed on [images.weserv.nl docs](https://images.weserv.nl/docs/), which we don't explicitly consider, can be applied to your images.

---

You might wonder: "*why not just use the searchParams and forget about routing?*". Well: There was  **[:boom: a very practical reason](use_cases.html)** to implement our routing logic. But having compact and tidy URLs is nice by itself, isn't it?
