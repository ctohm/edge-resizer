# :package: Deploy

**Edge Resizer can be deployed on your (sub)domain**. Just clone the repo, edit `wrangler.toml` populating `account_id`, `api_token` 
with yours, or using the (experimental) "Deploy with Workers" button:

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/ctohm/edge-resizer)

----

You'd probably want to have Edge-Resizer handle requests matching a particular path prefix (say `/img` o `/thumbnails`) instead of the whole (sub)domain. 

If that's the case, please define a secret `CF_ROUTE_PREFIX` in your repo (if you're using the 'Deploy with workers' button) or replace the `ROUTE_PREFIX` variable in `wrangler.toml` as you see fit. Internally a route normalization step should make the leading slash optional.

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