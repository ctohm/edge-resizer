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
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/itty-router/dist/itty-router.min.js
var require_itty_router_min = __commonJS({
  "node_modules/itty-router/dist/itty-router.min.js"(exports, module2) {
    module2.exports = { Router: ({ base: t = "", routes: l = [] } = {}) => ({ __proto__: new Proxy({}, { get: (e, a, o) => (e2, ...r) => l.push([a.toUpperCase(), RegExp(`^${(t + e2).replace(/(\/?)\*/g, "($1.*)?").replace(/\/$/, "").replace(/:(\w+)(\?)?(\.)?/g, "$2(?<$1>[^/]+)$2$3").replace(/\.(?=[\w(])/, "\\.")}/*$`), r]) && o }), routes: l, async handle(e, ...r) {
      let a, o, t2 = new URL(e.url);
      e.query = Object.fromEntries(t2.searchParams);
      for (var [p, s, u] of l)
        if ((p === e.method || p === "ALL") && (o = t2.pathname.match(s))) {
          e.params = o.groups;
          for (var c of u)
            if ((a = await c(e.proxy || e, ...r)) !== void 0)
              return a;
        }
    } }) };
  }
});

// ResizerRouter.ts
__export(exports, {
  AlignmentAliases: () => AlignmentAliases,
  AvailableTransforms: () => AvailableTransforms,
  FitAliases: () => FitAliases,
  FormatAliases: () => FormatAliases,
  ResizerRouter: () => ResizerRouter,
  fallbackSvg: () => fallbackSvg
});
var import_itty_router = __toModule(require_itty_router_min());
function getFileName(url) {
  const { pathname } = url, fileName = ((pathname || "").split("/").pop() || "").split("."), extension = (fileName.pop() || "").toLowerCase();
  return { fileName: [...fileName, extension].join("."), extension };
}
var AlignmentAliases = {
  "top-left": "a=top-left",
  "top": "a=top",
  "top-right": "a=top-right",
  "left": "a=left",
  "center": "a=center",
  "right": "a=right",
  "bottom-left": "a=bottom-left",
  "bottom": "a=bottom",
  "bottom-right": "a=bottom-right"
};
var FitAliases = {
  contain: "fit=contain",
  cover: "fit=cover",
  fill: "fit=fill",
  inside: "fit=inside",
  outside: "fit=outside"
};
var FormatAliases = {
  jpg: "output=jpg",
  jpeg: "output=jpg",
  png: "output=png",
  tiff: "output=tiff",
  gif: "output=gif",
  webp: "output=webp",
  auto: `check the accept header  for webp support and use it if affirmative`
};
var AvailableTransforms = {
  a: { title: "Alignme" },
  af: { title: "Adaptative Filter", docs: "https://images.weserv.nl/docs/format.html#adaptive-filter" },
  bg: { title: "Background Color", docs: "https://images.weserv.nl/docs/adjustment.html#background" },
  blur: { title: "Blur" },
  cbg: { title: "Background Color for Fit=Contain" },
  ch: { title: "Crop height" },
  con: { title: "Contrast" },
  cw: { title: "Crop width" },
  cx: { title: "Crop x" },
  cy: { title: "Crop y" },
  dpr: { title: "Device Pixel Ratio", docs: "https://images.weserv.nl/docs/size.html#device-pixel-ratio" },
  filt: { title: "Filter" },
  fit: { title: "Fit", docs: "https://images.weserv.nl/docs/fit.html#inside" },
  flip: { title: "Flip" },
  flop: { title: "Flop" },
  gam: { title: "Gamma" },
  h: { title: "Height" },
  hue: { title: "Hue" },
  il: { title: "Interlaced/Progressive" },
  l: { title: "Compression Level", docs: "https://images.weserv.nl/docs/format.html#compression-level" },
  mod: { title: "Brightness" },
  n: { title: "Number of Pages", docs: "https://images.weserv.nl/docs/format.html#number-of-pages" },
  output: { title: "Output", docs: "https://images.weserv.nl/docs/format.html#output" },
  page: { title: "Page", docs: "https://images.weserv.nl/docs/format.html#page" },
  precrop: { title: "Crop applied before resizing" },
  q: { title: "Quality", docs: "https://images.weserv.nl/docs/format.html#quality" },
  ro: { title: "Rotate" },
  sat: { title: "Sat" },
  sharp: { title: "Sharpen", docs: "https://images.weserv.nl/docs/adjustment.html#sharpen" },
  tint: { title: "Tint" },
  trim: { title: "Trim" },
  w: { title: "Width" },
  we: { title: "Without Enlargement" }
};
var ResizerRouter = class {
  constructor(options) {
    const debug = (options || {}).DEBUG ? console.log.bind("ResizerRouter:") : () => {
      return null;
    };
    const domainGroup = `(?<domain>([a-z0-9._-]+))`;
    const pathNameGroup = `(?<pathname>(.*))`;
    const validXFormKeys = Object.keys(AvailableTransforms).concat(Object.keys(FormatAliases), Object.keys(FitAliases), ["http", "https", "images", "img", "vw"]);
    const transformationsGroup = `(?<transformations>(_?(${validXFormKeys.join("|")})?(=[^_/]*)*)*)`;
    const groupRegex = `/${transformationsGroup}/${domainGroup}/${pathNameGroup}?`, defaultSearchParams = {
      fit: "contain",
      n: "-1",
      maxage: options.MAX_AGE || "1y"
    };
    const ittyRouter = (0, import_itty_router.Router)({
      base: options.ROUTE_PREFIX || options.base,
      routes: [
        ["GET", new RegExp(groupRegex), [handleMatchingRoute(debug, defaultSearchParams)]]
      ]
    });
    ittyRouter.get("favicon*", (req) => new Response(fallbackSvg(), { headers: { "X-Requested": req.url } }));
    this.handle = (req, ctx) => ittyRouter.handle(req, ctx);
    return new Proxy(ittyRouter, {
      get: (obj, prop) => (...args) => {
        return prop === "handle" ? obj.get("*", (req2) => {
          if (req2.headers.get("referer")?.includes("favicon.ico")) {
            return new Response(null, { status: 204 });
          }
          console.log({ resizeRouterCatchAll: req2.url });
          return fetch(req2);
        }).handle(...args) : obj[prop](...args);
      }
    });
  }
};
function fallbackSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="50.8mm" height="49.98mm" viewBox="0 0 180 177.1" xmlns="http://www.w3.org/2000/svg">
<g transform="matrix(3.9212 0 0 3.9212 6182.7 1395.7)">
<rect x="-1574" y="-353.15" width="40.331" height="39.59" rx="2.5955" ry="2.5955" fill="#e0ffff" opacity=".857" stroke="#0063bb" stroke-linejoin="round" stroke-width="2.7109"/>
<text x="-1553.8228" y="-341.6825" fill="#171e31" font-family="sans-serif" font-size="9.5981px" font-weight="bold" letter-spacing="0px" stroke-width=".39821" text-anchor="middle" word-spacing="0px" style="font-feature-settings:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;line-height:1.25" xml:space="preserve"><tspan x="-1553.8228" y="-341.6825" text-align="center">CTOhm</tspan><tspan x="-1553.8228" y="-329.68481" text-align="center">Edge</tspan><tspan x="-1553.8228" y="-317.68713" text-align="center">Resizer</tspan></text>
</g>
</svg>`;
}
function handleMatchingRoute(debugFn, defaultSearchParams) {
  return (req, ctx) => {
    const url = new URL(req.url), debug = debugFn;
    req.params = req.params || {};
    req.params.discarded = {};
    req.params.transforms = {};
    req.params.origin = url.origin;
    try {
      debug({
        domain: req.params.domain,
        pathname: req.params.pathname,
        transformations: req.params.transformations
      });
      const pathSearchParams = new URLSearchParams(req.params.transformations.replace(/[+_/,]/g, "&"));
      for (let [key, value] of url.searchParams.entries()) {
        pathSearchParams.set(key, value);
      }
      for (let [key, value] of pathSearchParams.entries()) {
        if (["http", "https"].includes(key)) {
          req.params.protocol = key;
        } else if (Object.keys(AvailableTransforms).includes(key)) {
          req.params.transforms[key] = value ?? true;
        } else if (Object.keys(FormatAliases).includes(key)) {
          debug({ output: key });
          req.params.transforms.output = key;
        } else if (Object.keys(FitAliases).includes(key)) {
          debug({ fit: key });
          req.params.transforms.fit = key;
        } else if (key === "vw" && req.headers.has("viewport-width")) {
          const vw = Number(req.headers.get("viewport-width"));
          if (isNaN(vw))
            continue;
          req.params.transforms.w = String(Math.ceil(vw / 10) * 10);
        } else {
          req.params.discarded[key] = value;
        }
      }
      req.params.defaults = defaultSearchParams;
      req.params.protocol = req.params.protocol || "https";
      return thirdParty(req, ctx, debug);
    } catch (e) {
      console.error(e);
      return Promise.resolve(new Response(e.message, { status: 500 }));
    }
  };
}
async function thirdParty(request, ctx, debug) {
  const { transforms, defaults, discarded, domain, protocol, pathname, origin } = request.params || {}, { maxage, ...otherDefaults } = defaults;
  let url = new URL(request.url);
  url.pathname = pathname;
  url.hostname = domain;
  let accepts = request.headers.get("accept") || "";
  let { fileName, extension } = getFileName(url);
  let nocache = url.searchParams.has("nocache");
  debug({ nocache, fileName, extension });
  let urlParam = `${url.hostname}${url.pathname}`, weservUrl = new URL("https://images.weserv.nl/"), computedSearchParams = { ...otherDefaults, ...transforms };
  if (accepts.includes("webp") && computedSearchParams.output === "auto") {
    computedSearchParams.output = "webp";
    if (!computedSearchParams.q) {
      computedSearchParams.q = "75";
    }
  } else if (!["tiff", "gif", "png", "jpg", "jpeg", "webp", "json"].includes(computedSearchParams.output)) {
    let { output: unsupportedFormat, ...otherSearchParams } = computedSearchParams;
    debug(unsupportedFormat);
    computedSearchParams = otherSearchParams;
  }
  if (computedSearchParams.output) {
    computedSearchParams.output = computedSearchParams.output.replace("jpeg", "jpg");
  }
  debug(JSON.stringify({ computedSearchParams }));
  for (let [paramName, paramValue] of Object.entries(computedSearchParams)) {
    weservUrl.searchParams.set(paramName, paramValue);
  }
  weservUrl.searchParams.sort();
  let transform_slug = Object.entries(Object.fromEntries(weservUrl.searchParams)).map(([key, val]) => `${key}=${val}`).sort().join("_");
  let discarded_entries = Object.entries(discarded).map(([key, val]) => `${key}=${val}`).sort().join("&");
  let cacheEntry = `${origin}/${transform_slug}/${domain}/${pathname}`;
  if (discarded_entries !== "") {
    cacheEntry = [
      cacheEntry,
      decodeURIComponent(discarded_entries)
    ].join("?");
  }
  const cache = caches.default;
  debug({ discarded_entries, cacheEntry, fileName, protocol });
  let response = !nocache && await cache.match(new Request(cacheEntry));
  if (response) {
    const contentType = response.headers.get("Content-Type") || "", age = response.headers.get("age") || "0";
    debug({ cacheHit: true, contentType, age });
    return response;
  }
  weservUrl.searchParams.set("filename", fileName);
  urlParam = decodeURIComponent(urlParam);
  weservUrl.searchParams.set("url", urlParam);
  if (["https", "ssl"].includes(protocol))
    weservUrl.searchParams.set("url", `ssl:${urlParam}`);
  if (computedSearchParams.output && computedSearchParams.output !== extension) {
    let renamedFilename = fileName.replace(`${extension}`, `${computedSearchParams.output}`);
    weservUrl.searchParams.set("filename", renamedFilename);
  }
  weservUrl.searchParams.set("maxage", maxage);
  weservUrl.searchParams.sort();
  if (nocache)
    weservUrl.searchParams.set("maxage", "1d");
  let {
    "accept": accept,
    "accept-encoding": accept_encoding,
    "accept-language": accept_language,
    "user-agent": user_agent,
    "cache-control": cache_control
  } = Object.fromEntries(request.headers.entries());
  if (discarded_entries !== "") {
    for (let [paramName, paramValue] of Object.entries(discarded)) {
      weservUrl.searchParams.set(paramName, paramValue);
    }
  }
  const weserveUrlStr = weservUrl.toString().replace(/%2C/g, ",");
  console.log({ weserveUrlStr });
  return computeCachedResponse(new Request(weserveUrlStr, {
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
  }), ctx).catch(() => {
    return fetch(`https://${urlParam}`);
  });
}
async function computeCachedResponse(imageRequest, ctx) {
  let cacheEntry = imageRequest.headers.get("X-cacheEntry"), fileName = imageRequest.headers.get("fileName"), inputExtension = imageRequest.headers.get("X-inputExtension") || fileName?.split(".").pop() || "";
  const cache = caches.default;
  let resizedUrlStr = imageRequest.url;
  console.info({ cacheEntry, resizedUrlStr });
  let response = await fetch(resizedUrlStr);
  const contentType = response.headers.get("Content-Type") || "";
  if (!response.ok || !contentType.startsWith("image")) {
    console.log({ ok: response.ok, contentType, statusText: response.statusText, status: response.status });
    return response;
  }
  let newExtension = contentType.split("/").pop()?.replace("jpeg", "jpg");
  response = new Response(response.body, response);
  let sourceUrl = imageRequest.headers.get("X-sourceUrl");
  response.headers.set("Accept-CH", "Viewport-Width");
  response.headers.append("Accept-CH", "Width");
  response.headers.set("Vary", "Viewport-Width, Width, Accept, Accept-Encoding");
  response.headers.delete("cf-cache-status");
  response.headers.set("Cache-Control", "public, max-age=" + String(31536e3));
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
