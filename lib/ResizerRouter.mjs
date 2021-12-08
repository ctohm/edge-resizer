var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// node_modules/itty-router/dist/itty-router.min.js
var require_itty_router_min = __commonJS({
  "node_modules/itty-router/dist/itty-router.min.js"(exports, module) {
    module.exports = { Router: ({ base: t = "", routes: l = [] } = {}) => ({ __proto__: new Proxy({}, { get: (e, a, o) => (e2, ...r) => l.push([a.toUpperCase(), RegExp(`^${(t + e2).replace(/(\/?)\*/g, "($1.*)?").replace(/\/$/, "").replace(/:(\w+)(\?)?(\.)?/g, "$2(?<$1>[^/]+)$2$3").replace(/\.(?=[\w(])/, "\\.")}/*$`), r]) && o }), routes: l, async handle(e, ...r) {
      let a, o, t2 = new URL(e.url);
      e.query = Object.fromEntries(t2.searchParams);
      for (var [p, s, u2] of l)
        if ((p === e.method || p === "ALL") && (o = t2.pathname.match(s))) {
          e.params = o.groups;
          for (var c of u2)
            if ((a = await c(e.proxy || e, ...r)) !== void 0)
              return a;
        }
    } }) };
  }
});

// ResizerRouter.ts
var import_itty_router = __toModule(require_itty_router_min());

// ../node_modules/worktop/cookie/index.mjs
var g = /* @__PURE__ */ new Set([
  "domain",
  "path",
  "max-age",
  "expires",
  "samesite",
  "secure",
  "httponly"
]);
function u(a) {
  let r = {}, e, t, n = 0, m = a.split(/;\s*/g), s, i;
  for (; n < m.length; n++)
    if (t = m[n], e = t.indexOf("="), ~e) {
      if (s = t.substring(0, e++).trim(), i = t.substring(e).trim(), i[0] === '"' && (i = i.substring(1, i.length - 1)), ~i.indexOf("%"))
        try {
          i = decodeURIComponent(i);
        } catch (f) {
        }
      g.has(t = s.toLowerCase()) ? t === "expires" ? r.expires = new Date(i) : t === "max-age" ? r.maxage = +i : r[t] = i : r[s] = i;
    } else
      (s = t.trim().toLowerCase()) && (s === "httponly" || s === "secure") && (r[s] = true);
  return r;
}

// ResizerRouter.ts
function getFileName(url) {
  const { pathname } = url, fileName = ((pathname || "").split("/").pop() || "").split("."), extension = (fileName.pop() || "").toLowerCase();
  return { fileName: [...fileName, extension].join("."), extension };
}
var AvailableFormats = {
  jpg: "Short for output=jpg",
  png: "Short for output=png",
  tiff: "Short for output=tiff",
  gif: "Short for output=gif",
  webp: "Short for output=webp",
  auto: `check the accept header  for webp support and use it if affirmative`
};
var AvailableTransforms = {
  cbg: "Background Color for Fit=Contain",
  bg: "Background Color",
  fit: "Fit",
  af: "Adaptative Filter",
  l: "Compression Level",
  w: "Width",
  h: "Height",
  page: "Page",
  a: "Alignment",
  output: "Output",
  q: "Quality",
  n: "Number of Pages",
  il: "Interlaced/Progressive",
  sharp: "Sharpen",
  cw: "Crop width",
  cy: "Crop y",
  cx: "Crop x",
  ch: "Crop height",
  precrop: "Crop applied before resizing",
  hue: "Hue",
  dpr: "Device Pixel Ratio",
  we: "Without Enlargement",
  blur: "Blur",
  flip: "Flip",
  flop: "Flop",
  ro: "Rotate",
  con: "Contrast",
  filt: "Filter",
  trim: "Trim"
};
function defaultRoutes(router) {
  return router.get("/favicon*", (req) => new Response(fallbackSvg(), { headers: { "X-Requested": req.url } })).get("*", (req) => {
    return fetch(req);
  });
}
function fallbackSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="50.8mm" height="49.98mm" viewBox="0 0 180 177.1" xmlns="http://www.w3.org/2000/svg">
<g transform="matrix(3.9212 0 0 3.9212 6182.7 1395.7)">
<rect x="-1574" y="-353.15" width="40.331" height="39.59" rx="2.5955" ry="2.5955" fill="#e0ffff" opacity=".857" stroke="#0063bb" stroke-linejoin="round" stroke-width="2.7109"/>
<text x="-1553.8228" y="-341.6825" fill="#171e31" font-family="sans-serif" font-size="9.5981px" font-weight="bold" letter-spacing="0px" stroke-width=".39821" text-anchor="middle" word-spacing="0px" style="font-feature-settings:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;line-height:1.25" xml:space="preserve"><tspan x="-1553.8228" y="-341.6825" text-align="center">CTOhm</tspan><tspan x="-1553.8228" y="-329.68481" text-align="center">Edge</tspan><tspan x="-1553.8228" y="-317.68713" text-align="center">Resizer</tspan></text>
</g>
</svg>`;
}
function handleMatchingRoute(debugFn) {
  return (req, ctx) => {
    const url = new URL(req.url), debug = debugFn;
    req.params = req.params || {};
    req.params.transforms = {};
    req.params.origin = url.origin;
    try {
      debug({
        domain: req.params.domain,
        pathname: req.params.pathname,
        transformations: req.params.transformations
      });
      for (let [key, value] of new URLSearchParams(req.params.transformations.replace(/[_/,]/g, "&")).entries()) {
        if (["http", "https"].includes(key))
          req.params.protocol = key;
        if (Object.keys(AvailableTransforms).includes(key))
          req.params.transforms[key] = value ?? true;
        if (Object.keys(AvailableFormats).includes(key)) {
          debug({ output: key });
          req.params.transforms.output = key;
        }
      }
      req.params.protocol = req.params.protocol || "https";
      return thirdParty(req, ctx, debug);
    } catch (e) {
      console.error(e);
      return Promise.resolve(new Response(e.message, { status: 500 }));
    }
  };
}
async function thirdParty(request, ctx, debug) {
  const { transforms, domain, pathname, origin } = request.params || {};
  let url = new URL(request.url);
  url.pathname = pathname;
  url.hostname = domain;
  let accepts = request.headers.get("accept") || "", defaultSearchParams = {
    fit: "contain",
    n: "-1"
  };
  let computedSearchParams = { ...defaultSearchParams, ...transforms };
  let discardedSearchParamsBag = new URLSearchParams();
  for (let [paramName, paramValue] of url.searchParams.entries()) {
    if (Object.keys(AvailableTransforms).includes(paramName)) {
      computedSearchParams[paramName] = paramValue;
    } else if (Object.keys(AvailableFormats).includes(paramName)) {
      console.info({ output: paramName });
      computedSearchParams.output = paramName;
    } else {
      discardedSearchParamsBag.set(paramName, paramValue);
    }
  }
  let { fileName, extension } = getFileName(url);
  let nocache = url.searchParams.has("nocache");
  debug({ nocache, fileName, extension }, Object.entries(computedSearchParams).map(([key, value]) => `${key}=${value}`).join("_"));
  let urlParam = `${url.hostname}${url.pathname}`, weservUrl = new URL("https://images.weserv.nl/");
  if (accepts.includes("webp") && computedSearchParams.output === "auto") {
    computedSearchParams.output = "webp";
    if (!computedSearchParams.q) {
      computedSearchParams.q = "75";
    }
  } else if (!["tiff", "gif", "png", "jpg", "jpeg", "webp", "json"].includes(computedSearchParams.output)) {
    let { output: discardedOutput, ...otherSearchParams } = computedSearchParams;
    debug(discardedOutput);
    computedSearchParams = otherSearchParams;
  }
  if (computedSearchParams.output) {
    computedSearchParams.output = computedSearchParams.output.replace("jpeg", "jpg");
  }
  debug(JSON.stringify({ computedSearchParams }));
  for (let [paramName, paramValue] of Object.entries(computedSearchParams)) {
    weservUrl.searchParams.set(paramName, paramValue);
  }
  let transform_slug = Object.entries(Object.fromEntries(weservUrl.searchParams)).map(([key, val]) => `${key}=${val}`).sort().join("_");
  let cacheEntry = `${origin}/${transform_slug}/${domain}/${pathname}`;
  const cache = caches.default;
  debug({ cacheEntry, fileName });
  let response = !nocache && await cache.match(new Request(cacheEntry));
  weservUrl.searchParams.set("filename", fileName);
  weservUrl.searchParams.set("url", decodeURIComponent(urlParam));
  if (computedSearchParams.output && computedSearchParams.output !== extension) {
    let renamedFilename = fileName.replace(`${extension}`, `${computedSearchParams.output}`);
    weservUrl.searchParams.set("filename", renamedFilename);
  }
  weservUrl.searchParams.sort();
  if (nocache)
    weservUrl.searchParams.set("cachebust", String(Date.now()));
  debug(weservUrl.toString(), discardedSearchParamsBag.toString());
  if (response) {
    return response;
  }
  let {
    "accept": accept,
    "accept-encoding": accept_encoding,
    "accept-language": accept_language,
    "user-agent": user_agent,
    "cache-control": cache_control
  } = Object.fromEntries(request.headers.entries());
  const cookie = Object.entries(u(request.headers.get("Cookie") || "")), cfFiltered = cookie.filter(([key]) => key.startsWith("cf.image."));
  let cfImages = cfFiltered.reduce((accum, [key, val]) => {
    accum[key.replace("cf.image.", "")] = val;
    console.log(accum);
    return accum;
  }, {});
  return computeCachedResponse(new Request(weservUrl.toString(), {
    headers: {
      fileName,
      accept,
      "accept-encoding": accept_encoding,
      "accept-language": accept_language,
      "user-agent": user_agent,
      "cache-control": cache_control,
      "X-sourceUrl": request.url,
      "X-inputExtension": extension,
      "X-cacheEntry": cacheEntry
    }
  }), ctx, cfImages).catch((err) => {
    return fetch(`https://${urlParam}`);
  });
}
async function computeCachedResponse(imageRequest, ctx, cfImages) {
  let cacheEntry = imageRequest.headers.get("X-cacheEntry"), fileName = imageRequest.headers.get("fileName"), inputExtension = imageRequest.headers.get("X-inputExtension") || fileName?.split(".").pop() || "";
  const cache = caches.default;
  let resizedUrlStr = imageRequest.url;
  let cf = {
    image: cfImages || {}
  };
  let response = await fetch(resizedUrlStr, { cf });
  const contentType = response.headers.get("Content-Type") || "";
  if (!response.ok || !contentType.startsWith("image")) {
    return response;
  }
  let newExtension = contentType.split("/").pop()?.replace("jpeg", "jpg");
  response = new Response(response.body, response);
  let sourceUrl = imageRequest.headers.get("X-sourceUrl");
  response.headers.set("Accept-CH", "Viewport-Width");
  response.headers.append("Accept-CH", "Width");
  response.headers.set("Vary", "Viewport-Width, Width, Accept");
  response.headers.set("Requested-CF", JSON.stringify(cf));
  response.headers.delete("cf-cache-status");
  response.headers.set("Cache-Control", "public, max-age=31536000");
  response.headers.set("X-Cached-On", String(Date.now()));
  response.headers.set("last-modified", new Date(Date.now() - 18e4).toUTCString());
  if (sourceUrl)
    response.headers.set("X-sourceUrl", sourceUrl);
  response.headers.set("X-resizedUrl", resizedUrlStr);
  if (fileName) {
    response.headers.set("Content-Disposition", `inline; filename=${decodeURIComponent(fileName.replace(inputExtension, newExtension || inputExtension)).trim()}`);
  }
  let cacheRequest = cacheEntry ? new Request(cacheEntry) : imageRequest;
  response.headers.set("link", `<${cacheRequest.url}>; rel="canonical"`);
  ctx.waitUntil(cache.put(cacheRequest, response.clone()));
  return response;
}
var ResizerRouter = class {
  constructor(options) {
    const debug = (options || {}).DEBUG ? console.log.bind("ResizerRouter:") : () => {
      return null;
    };
    const domainGroup = `(?<domain>([a-z0-9._-]+))`;
    const pathNameGroup = `(?<pathname>(.*))`;
    const validXFormKeys = Object.keys(AvailableTransforms).concat(Object.keys(AvailableFormats), ["http", "https", "images", "img"]);
    const transformationsGroup = `(?<transformations>(_?(${validXFormKeys.join("|")})?(=[^_/]*)*)*)`;
    const groupRegex = `/${transformationsGroup}/${domainGroup}/${pathNameGroup}?`;
    const ittyRouter = (0, import_itty_router.Router)({
      base: options.ROUTE_PREFIX || options.base,
      routes: [
        ["GET", new RegExp(groupRegex), [handleMatchingRoute(debug)]]
      ]
    });
    ittyRouter.get("favicon*", (req) => new Response(fallbackSvg(), { headers: { "X-Requested": req.url } })).get("*", (req) => {
      return fetch(req);
    });
    this.handle = (req, ctx) => ittyRouter.handle(req, ctx);
    return ittyRouter;
  }
};
export {
  AvailableFormats,
  AvailableTransforms,
  ResizerRouter,
  defaultRoutes,
  fallbackSvg
};
