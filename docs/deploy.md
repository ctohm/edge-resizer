# :package: Deploy

**Edge Resizer can be deployed on your (sub)domain**. Just clone the repo, copy `wrangler.example.toml` as `wrangler.toml` replacing the placeholders 
`YOUR_ACCOUNT_ID`, `YOUR_ZONE_ID`, `TOUR_CF_TOKEN` and the route (or routes) accordignly.

----

You'd probably want to have Edge-Resizer handle requests matching a particular path prefix (say `/img` o `/thumbnails`) instead of the whole (sub)domain. 

If that's the case, please change the `ROUTE_PREFIX` variable in `wrangler.toml`, to match the former, including the leading slash.

The URL of the image you want to proxy should be appended right after the (optional) prefix 

``` 
 https://<your_subdomain> / <prefix>? / <source domain> / <source pathname>
``` 

 By default, the worker doesn't define a prefix, which means it'll try to match any route satisfying the [routing logic](routing.html).

 ::: tip
 To prevent unwanted routes to be "intercepted" by the worker, narrow its scope using `ROUTE_PREFIX` 

 :::

 ::: tip another tip
 To ensure a given route is handled by the worker when not using a prefix or a transformation, use `_` as dummy prefix
 :::