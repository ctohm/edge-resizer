var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, copyDefault, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// ../node_modules/itty-router/dist/itty-router.min.js
var require_itty_router_min = __commonJS({
  "../node_modules/itty-router/dist/itty-router.min.js"(exports, module) {
    module.exports = { Router: ({ base: t = "", routes: l = [] } = {}) => ({ __proto__: new Proxy({}, { get: (e, a, o) => (e2, ...r) => l.push([a.toUpperCase(), RegExp(`^${(t + e2).replace(/(\/?)\*/g, "($1.*)?").replace(/\/$/, "").replace(/:(\w+)(\?)?(\.)?/g, "$2(?<$1>[^/]+)$2$3").replace(/\.(?=[\w(])/, "\\.")}/*$`), r]) && o }), routes: l, async handle(e, ...r) {
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

// ../node_modules/itty-router-extras/middleware/withContent.js
var require_withContent = __commonJS({
  "../node_modules/itty-router-extras/middleware/withContent.js"(exports, module) {
    var withContent = async (t) => {
      let n = t.headers.get("content-type");
      t.content = void 0;
      try {
        n && n.includes("application/json") && (t.content = await t.json());
      } catch (t2) {
      }
    };
    module.exports = { withContent };
  }
});

// ../node_modules/itty-router-extras/middleware/withCookies.js
var require_withCookies = __commonJS({
  "../node_modules/itty-router-extras/middleware/withCookies.js"(exports, module) {
    var withCookies = (o) => {
      o.cookies = {};
      try {
        o.cookies = (o.headers.get("Cookie") || "").split(/;\s*/).map((o2) => o2.split("=")).reduce((o2, [e, i]) => (o2[e] = i, o2), {});
      } catch (o2) {
      }
    };
    module.exports = { withCookies };
  }
});

// ../node_modules/itty-router-extras/middleware/withParams.js
var require_withParams = __commonJS({
  "../node_modules/itty-router-extras/middleware/withParams.js"(exports, module) {
    var withParams = (a) => {
      for (const s in a.params || {})
        a[s] = a.params[s];
    };
    module.exports = { withParams };
  }
});

// ../node_modules/itty-router-extras/middleware/index.js
var require_middleware = __commonJS({
  "../node_modules/itty-router-extras/middleware/index.js"(exports, module) {
    module.exports = { ...require_withContent(), ...require_withCookies(), ...require_withParams() };
  }
});

// ../node_modules/itty-router-extras/response/createResponseType.js
var require_createResponseType = __commonJS({
  "../node_modules/itty-router-extras/response/createResponseType.js"(exports, module) {
    var createResponseType = (e = "text/plain; charset=utf-8") => (s, t = {}) => {
      const { headers: n = {}, ...o } = t;
      return typeof s == "object" ? new Response(JSON.stringify(s), { headers: { "Content-Type": e, ...n }, ...o }) : new Response(s, t);
    };
    module.exports = { createResponseType };
  }
});

// ../node_modules/itty-router-extras/response/json.js
var require_json = __commonJS({
  "../node_modules/itty-router-extras/response/json.js"(exports, module) {
    var { createResponseType } = require_createResponseType();
    var json2 = createResponseType("application/json; charset=utf-8");
    module.exports = { json: json2 };
  }
});

// ../node_modules/itty-router-extras/response/error.js
var require_error = __commonJS({
  "../node_modules/itty-router-extras/response/error.js"(exports, module) {
    var { json: json2 } = require_json();
    var error = (r = 500, o = "Internal Server Error.") => json2({ ...typeof o == "object" ? o : { status: r, error: o } }, { status: r });
    module.exports = { error };
  }
});

// ../node_modules/itty-router-extras/response/missing.js
var require_missing = __commonJS({
  "../node_modules/itty-router-extras/response/missing.js"(exports, module) {
    var { error } = require_error();
    var missing = (r = "Not found.") => error(404, r);
    module.exports = { missing };
  }
});

// ../node_modules/itty-router-extras/response/status.js
var require_status = __commonJS({
  "../node_modules/itty-router-extras/response/status.js"(exports, module) {
    var { json: json2 } = require_json();
    var status = (s, t) => t ? json2({ ...typeof t == "object" ? t : { status: s, message: t } }, { status: s }) : new Response(null, { status: s });
    module.exports = { status };
  }
});

// ../node_modules/itty-router-extras/response/text.js
var require_text = __commonJS({
  "../node_modules/itty-router-extras/response/text.js"(exports, module) {
    var text = (e, t = {}) => new Response(e, t);
    module.exports = { text };
  }
});

// ../node_modules/itty-router-extras/response/index.js
var require_response = __commonJS({
  "../node_modules/itty-router-extras/response/index.js"(exports, module) {
    module.exports = { ...require_error(), ...require_json(), ...require_missing(), ...require_status(), ...require_text() };
  }
});

// ../node_modules/itty-router-extras/router/ThrowableRouter.js
var require_ThrowableRouter = __commonJS({
  "../node_modules/itty-router-extras/router/ThrowableRouter.js"(exports, module) {
    "use strict";
    var { Router: Router2 } = require_itty_router_min();
    var { error } = require_response();
    var ThrowableRouter = (r = {}) => {
      const { stack: e = false } = r;
      return new Proxy(Router2(r), { get: (r2, t) => (...o) => t === "handle" ? r2[t](...o).catch((r3) => error(r3.status || 500, { status: r3.status || 500, error: r3.message, stack: e && r3.stack || void 0 })) : r2[t](...o) });
    };
    module.exports = { ThrowableRouter };
  }
});

// ../node_modules/itty-router-extras/router/index.js
var require_router = __commonJS({
  "../node_modules/itty-router-extras/router/index.js"(exports, module) {
    module.exports = { ...require_ThrowableRouter() };
  }
});

// ../node_modules/itty-router-extras/classes/StatusError.js
var require_StatusError = __commonJS({
  "../node_modules/itty-router-extras/classes/StatusError.js"(exports, module) {
    var StatusError = class extends Error {
      constructor(r = 500, t = "Internal Error.") {
        super(t), this.name = "StatusError", this.status = r;
      }
    };
    module.exports = { StatusError };
  }
});

// ../node_modules/itty-router-extras/classes/index.js
var require_classes = __commonJS({
  "../node_modules/itty-router-extras/classes/index.js"(exports, module) {
    module.exports = { ...require_StatusError() };
  }
});

// ../node_modules/itty-router-extras/index.js
var require_itty_router_extras = __commonJS({
  "../node_modules/itty-router-extras/index.js"(exports, module) {
    module.exports = { ...require_middleware(), ...require_response(), ...require_router(), ...require_classes() };
  }
});

// ResizerRouter.ts
var import_itty_router = __toESM(require_itty_router_min());
var import_itty_router_extras = __toESM(require_itty_router_extras());
function getFileName(url) {
  const { pathname } = url, lastPart = (decodeURIComponent(pathname || "").split("?")[0] || "").replace(/\/$/, "").split("/").pop() || "", regexResult = /(.*?)\.(apng|avif|gif|jpg|png|svg|webp|bmp|ico|tif|tiff|jpeg)$/i.exec(lastPart);
  if (!regexResult || regexResult.length < 3)
    return { fileName: lastPart, extension: "" };
  return { fileName: regexResult[1], extension: regexResult[2] };
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
  auto: `output=webp (if supported)`
};
var AvailableTransforms = {
  w: {
    regex: "(?:width|w)=[0-9.-]+",
    title: "Width",
    example: "w=250",
    section: "Resize",
    sectionLink: "https://images.weserv.nl/docs/size.html",
    docs: "https://images.weserv.nl/docs/size.html#width"
  },
  h: {
    regex: "(?:height|h)=[0-9.-]+",
    title: "Height",
    example: "h=150",
    docs: "https://images.weserv.nl/docs/size.html#height"
  },
  we: {
    regex: "we",
    title: "Without Enlargement",
    example: "we",
    docs: "https://images.weserv.nl/docs/fit.html#without-enlargement"
  },
  dpr: {
    regex: "dpr=[0-9]+",
    title: "Device Pixel Ratio",
    docs: "https://images.weserv.nl/docs/size.html#device-pixel-ratio",
    example: "dpr=2"
  },
  ro: {
    regex: "ro=[0-9.-]+",
    title: "Rotate",
    example: "ro=45",
    docs: "https://images.weserv.nl/docs/orientation.html#ro"
  },
  flip: {
    regex: "flip",
    title: "Flip",
    example: "flip",
    note: "",
    docs: "https://images.weserv.nl/docs/orientation.html#flip"
  },
  flop: {
    regex: "flop",
    title: "Flop",
    example: "flop",
    note: "",
    docs: "https://images.weserv.nl/docs/orientation.html#flop"
  },
  il: {
    regex: "il",
    title: "Interlaced/Progressive",
    example: "il",
    section: "Optimization/Conversion",
    sectionLink: "https://images.weserv.nl/docs/format.html#adaptive-filter"
  },
  af: {
    regex: "af",
    title: "Adaptative Filter",
    docs: "https://images.weserv.nl/docs/format.html#adaptive-filter",
    example: "af"
  },
  q: {
    regex: "(?:q|quality)=[0-9.]+",
    title: "Quality",
    docs: "https://images.weserv.nl/docs/format.html#quality",
    example: "q=80"
  },
  l: {
    regex: "l=[0-9]",
    title: "Compression Level",
    docs: "https://images.weserv.nl/docs/format.html#compression-level",
    example: "l=6"
  },
  n: {
    regex: "n=[0-9]+",
    title: "Number of Pages",
    docs: "https://images.weserv.nl/docs/format.html#number-of-pages",
    example: "n=0"
  },
  page: {
    regex: "page=[0-9]+",
    title: "Page",
    docs: "https://images.weserv.nl/docs/format.html#page",
    example: "page=1"
  },
  output: {
    regex: "(?:output|format)=(?:auto|json|png|jpg|gif|tiff|webp|jpeg)",
    title: "Output",
    docs: "https://images.weserv.nl/docs/format.html#output",
    example: "output=png"
  },
  cw: {
    regex: "cw=[0-9]+",
    title: "Crop width",
    example: "cw=200",
    section: "Crop",
    sectionLink: "https://images.weserv.nl/docs/crop.html#rectangle-crop"
  },
  ch: {
    regex: "ch=[0-9]+",
    title: "Crop height",
    example: "ch=100"
  },
  cx: {
    regex: "cx=[0-9]+",
    title: "Crop x",
    example: "cx=10"
  },
  cy: {
    regex: "cy=[0-9]+",
    title: "Crop y",
    example: "cy=10"
  },
  a: {
    regex: "a=[a-z-]+",
    title: "Alignment",
    example: "a=center",
    docs: "https://images.weserv.nl/docs/crop.html#alignment-position"
  },
  precrop: {
    regex: "precrop",
    title: "Crop applied before resizing",
    example: "precrop"
  },
  cbg: {
    regex: "cbg=[a-z0-9A-Z]+",
    title: "Background Color",
    example: "cbg=AA00CC",
    note: 'Applies to "cropped" space when fit=Contain'
  },
  trim: {
    regex: "trim(?:=[0-9]+)?",
    title: "Trim",
    example: "trim",
    docs: "https://images.weserv.nl/docs/crop.html#trim"
  },
  con: {
    regex: "con=[0-9]+",
    title: "Contrast",
    example: "con=3",
    section: "Filters",
    note: ""
  },
  bg: {
    regex: "bg=[a-z0-9A-Z]+",
    title: "Background Color",
    docs: "https://images.weserv.nl/docs/adjustment.html#background",
    example: "bg=CCAA00",
    note: ""
  },
  blur: {
    regex: "blur(?:=[0-9]+)?",
    title: "Blur",
    example: "blur=2",
    docs: "https://images.weserv.nl/docs/adjustment.html#blur",
    note: ""
  },
  filt: {
    regex: "filt=[a-z]+",
    title: "Filter",
    example: "filt=sepia",
    note: ""
  },
  fit: {
    regex: "fit=(?:contain|cover|fill|inside|outsize)",
    title: "Fit",
    docs: "https://images.weserv.nl/docs/fit.html#inside",
    example: "fit=contain",
    note: ""
  },
  gam: {
    regex: "gam=[0-9.-]+",
    title: "Gamma",
    example: "gam=1",
    docs: "https://images.weserv.nl/docs/adjustment.html#gam",
    note: ""
  },
  hue: {
    regex: "hue=[0-9.-]+",
    title: "Hue",
    example: "hue=180",
    docs: "https://images.weserv.nl/docs/adjustment.html#hue",
    note: ""
  },
  mod: {
    regex: "mod=[0-9.-]+",
    title: "Brightness",
    example: "mod=2",
    docs: "https://images.weserv.nl/docs/adjustment.html#mod",
    note: ""
  },
  sat: {
    regex: "sat=[0-9.-]+",
    title: "Saturation",
    example: "sat=50",
    docs: "https://images.weserv.nl/docs/adjustment.html#sat",
    note: ""
  },
  sharp: {
    regex: "sharp(?:=[0-9]+)?",
    title: "Sharpen",
    docs: "https://images.weserv.nl/docs/adjustment.html#sharpen",
    example: "sharp=2",
    note: ""
  },
  tint: {
    regex: "tint=[a-z0-9A-Z]+",
    title: "Tint",
    example: "tint=red",
    docs: "https://images.weserv.nl/docs/adjustment.html#tint",
    note: ""
  }
};
var deviceHints = {
  vw: { title: "viewport width", regex: "vw(=[0-9.]+)?" },
  vh: { title: "viewport height", regex: "vh(=[0-9.]+)?" },
  dpr: { title: "Device Pixel Ratio", regex: "dpr", note: "Passing `dpr` without value will use hinted DPR from client" }
};
var transformKey = Object.keys(AvailableTransforms).concat(Object.keys(FormatAliases), Object.keys(AlignmentAliases), Object.keys(FitAliases), Object.keys(deviceHints), ["http", "https"]);
var validTransforms = Object.values(AvailableTransforms).map((tx) => tx.regex).concat(Object.values(deviceHints).map((hint) => hint.regex), Object.keys(FitAliases), Object.keys(FormatAliases), ["http", "https", "_"]).join("|");
var transformationsGroupOld = `(?<transformations>(_?(${transformKey.join("|")})?(=[^:,_/]*)*)+)`;
var transformationsGroup = `(?<transformations>((${validTransforms})([_,;:]\\1)*)+)`;
var originhostGroup = "(?<originhost>(self|([a-z0-9:@_-]+)(\\.[a-z0-9_-]+){1,2}(\\.[a-z0-9_-]+)?(\\:\\d+)?))";
var pathNameGroup = `(?<pathname>(.*))`;
var _ResizerRouter = class {
  constructor(options) {
    const debug = (options || {}).DEBUG ? console.log.bind("ResizerRouter:") : () => {
      return null;
    }, defaultSearchParams = {
      fit: "contain",
      n: "-1",
      maxage: options.MAX_AGE || "1y"
    };
    const ittyRouter = (0, import_itty_router.Router)({
      base: options.ROUTE_PREFIX || options.base,
      routes: [
        ["GET", _ResizerRouter.transformationsGroupRegex, [_ResizerRouter.handleMatchingRoute(debug, defaultSearchParams)]],
        ["GET", _ResizerRouter.transformationsGroupOldRegex, [_ResizerRouter.handleMatchingRoute(debug, defaultSearchParams)]],
        ["GET", _ResizerRouter.transformationsGroupNoDomainRegex, [_ResizerRouter.handleMatchingRoute(debug, defaultSearchParams)]]
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
  static handleMatchingRoute(debugFn = (...attrs) => {
    return attrs;
  }, defaultSearchParams = {
    fit: "contain",
    n: "-1",
    maxage: "1y"
  }) {
    return (req, ctx) => {
      const url = new URL(req.url), debug = debugFn;
      req.params = req.params || {};
      req.params.origin = url.origin;
      if (req.params.dummyhost) {
        req.params.pathname = `${req.params.dummyhost}/${req.params.pathname}`;
        req.params.originhost = url.host;
      }
      if (["self", "0.0"].includes(req.params.originhost) || req.params.originhost.length < 4) {
        req.params.originhost = url.host;
      }
      try {
        debug({
          originhost: req.params.originhost,
          pathname: req.params.pathname,
          transformations: req.params.transformations
        });
        const pathSearchParams = new URLSearchParams(req.params.transformations.replace(/[+_/,]/g, "&"));
        for (let [key, value] of url.searchParams.entries()) {
          pathSearchParams.set(key, value);
        }
        req.params = _ResizerRouter.normalizeRequestParams(req, pathSearchParams);
        req.params.defaults = defaultSearchParams;
        req.params.protocol = req.params.protocol || "https";
        if (!req.params.originhost) {
          return Promise.resolve((0, import_itty_router_extras.json)(req.params));
        }
        return computeWeserveRequest(req, ctx, debug);
      } catch (e) {
        console.error(e);
        return Promise.resolve(new Response(e.message, { status: 500 }));
      }
    };
  }
  static normalizeRequestParams(req, pathSearchParams) {
    let params = req.params;
    params.discarded = {};
    params.transforms = {};
    for (let [key, value] of pathSearchParams.entries()) {
      key = key.replace("format", "output").replace("width", "w").replace("height", "h").replace("quality", "q");
      if (["http", "https"].includes(key)) {
        params.protocol = key;
      } else if (Object.keys(AvailableTransforms).includes(key)) {
        params.transforms[key] = value ?? true;
      } else if (Object.keys(FormatAliases).includes(key)) {
        params.transforms.output = key;
      } else if (Object.keys(FitAliases).includes(key)) {
        params.transforms.fit = key;
      } else if (Object.keys(AlignmentAliases).includes(key)) {
        params.transforms.a = key;
      } else {
        params.discarded[key] = value;
      }
    }
    if (params.transforms["dpr"] === "" && req.headers.has("dpr")) {
      params.transforms["dpr"] = String(Number(req.headers.get("dpr")) || 1);
    }
    if (params.transforms["trim"] === "") {
      params.transforms["trim"] = "10";
    }
    if (params.discarded.vw !== void 0) {
      const vw = Number(req.headers.get("viewport-width") || req.headers.get("sec-ch-viewport-width") || req.headers.get("sec-ch-width") || req.headers.get("width"));
      if (vw || !isNaN(vw)) {
        let multiplier = Number(params.discarded.vw) || 1;
        multiplier = Math.min(0, Math.max(1, multiplier));
        params.transforms.w = String(Math.ceil(multiplier * vw));
      }
    }
    if (params.discarded.vh !== void 0) {
      const vh = Number(req.headers.get("sec-ch-viewport-height"));
      if (vh && !isNaN(vh)) {
        let multiplier = Number(params.discarded.vh) || 1;
        multiplier = Math.min(0, Math.max(1, multiplier));
        params.transforms.h = String(Math.ceil(multiplier * vh));
      }
    }
    return params;
  }
};
var ResizerRouter = _ResizerRouter;
ResizerRouter.transformationsGroupRegex = new RegExp(`/${transformationsGroup}/(https?://)?${originhostGroup}/${pathNameGroup}`);
ResizerRouter.transformationsGroupOldRegex = new RegExp(`/${transformationsGroupOld}/(https?://)?${originhostGroup}/${pathNameGroup}`);
ResizerRouter.transformationsGroupNoDomainRegex = new RegExp(`/${transformationsGroup}/(?<dummyhost>([a-z0-9_-][^/]*))/${pathNameGroup}`);
function fallbackSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="50.8mm" height="49.98mm" viewBox="0 0 180 177.1" xmlns="http://www.w3.org/2000/svg">
<g transform="matrix(3.9212 0 0 3.9212 6182.7 1395.7)">
<rect x="-1574" y="-353.15" width="40.331" height="39.59" rx="2.5955" ry="2.5955" fill="#e0ffff" opacity=".857" stroke="#0063bb" stroke-linejoin="round" stroke-width="2.7109"/>
<text x="-1553.8228" y="-341.6825" fill="#171e31" font-family="sans-serif" font-size="9.5981px" font-weight="bold" letter-spacing="0px" stroke-width=".39821" text-anchor="middle" word-spacing="0px" style="font-feature-settings:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-variant-numeric:normal;line-height:1.25" xml:space="preserve"><tspan x="-1553.8228" y="-341.6825" text-align="center">CTOhm</tspan><tspan x="-1553.8228" y="-329.68481" text-align="center">Edge</tspan><tspan x="-1553.8228" y="-317.68713" text-align="center">Resizer</tspan></text>
</g>
</svg>`;
}
async function computeWeserveRequest(request, ctx, debug) {
  const { transforms, defaults, discarded, originhost, protocol, pathname, origin } = request.params || {}, { maxage, ...otherDefaults } = defaults;
  let url = new URL(request.url);
  url.pathname = pathname;
  url.host = originhost;
  let accepts = request.headers.get("accept") || "", fetchDest = request.headers.get("Sec-Fetch-Dest") || "";
  let { fileName, extension } = getFileName(url);
  let skipCache = url.searchParams.has("nocache");
  let urlParam = `${url.hostname}${url.pathname}`, weservUrl = new URL("https://images.weserv.nl/"), computedSearchParams = { ...otherDefaults, ...transforms };
  if (accepts.includes("webp") && computedSearchParams.output === "auto") {
    computedSearchParams.output = "webp";
  } else if (!["tiff", "gif", "png", "jpg", "jpeg", "webp", "json"].includes(computedSearchParams.output)) {
    let { output: unsupportedFormat, ...otherSearchParams } = computedSearchParams;
    debug(unsupportedFormat);
    computedSearchParams = otherSearchParams;
  }
  if (computedSearchParams.output) {
    computedSearchParams.output = computedSearchParams.output.replace("jpeg", "jpg");
  }
  fileName = [fileName, computedSearchParams.output || extension].join(".");
  for (let [paramName, paramValue] of Object.entries(computedSearchParams)) {
    weservUrl.searchParams.set(paramName, paramValue);
  }
  weservUrl.searchParams.sort();
  let transform_slug = Object.entries(Object.fromEntries(weservUrl.searchParams)).map(([key, val]) => `${key}=${val}`).sort().join("_");
  let discarded_entries = Object.entries(discarded).map(([key, val]) => `${key}=${val}`).sort().join("&");
  let canonicalVariationURL = `${origin}/${transform_slug}/${originhost}/${pathname}`;
  if (discarded_entries !== "") {
    canonicalVariationURL = [
      canonicalVariationURL,
      decodeURIComponent(discarded_entries)
    ].join("?");
  }
  debug({ fileName, extension, output: computedSearchParams.output, canonicalVariationURL });
  urlParam = decodeURIComponent(urlParam);
  weservUrl.searchParams.set("url", urlParam);
  return getFromCacheOrThrow({ canonicalVariationURL, weservUrl, skipCache, fetchDest, debug }).catch((err) => {
    debug({ errMessage: err.message, skipCache, fileName, extension, computedSearchParams, discarded_entries, canonicalVariationURL, protocol, fetchDest, urlParam });
    if (["https", "ssl"].includes(protocol))
      weservUrl.searchParams.set("url", `ssl:${urlParam}`);
    weservUrl.searchParams.set("maxage", maxage);
    weservUrl.searchParams.sort();
    if (skipCache)
      weservUrl.searchParams.set("maxage", "1d");
    if (discarded_entries !== "") {
      for (let [paramName, paramValue] of Object.entries(discarded)) {
        weservUrl.searchParams.set(paramName, paramValue);
      }
    }
    const weserveUrlStr = weservUrl.toString().replace(/%2C/g, ",");
    let {
      accept,
      "accept-encoding": accept_encoding,
      "accept-language": accept_language,
      "user-agent": user_agent,
      "cache-control": cache_control
    } = Object.fromEntries(request.headers.entries());
    return computeCachedResponse(new Request(weserveUrlStr, {
      headers: {
        fileName,
        accept,
        "accept-encoding": accept_encoding,
        "accept-language": accept_language,
        "user-agent": user_agent,
        "cache-control": cache_control,
        "x-er-source-url": `https://${urlParam}`,
        "x-er-input-extension": extension,
        "x-er-canonical-variation-url": canonicalVariationURL
      }
    }), ctx, debug).catch(() => {
      return fetch(`https://${urlParam}`);
    });
  });
}
async function computeCachedResponse(imageRequest, ctx, debug) {
  const weServeResponse = await fetch(imageRequest);
  const contentType = weServeResponse.headers.get("Content-Type") || "";
  if (!weServeResponse.ok || !contentType.startsWith("image")) {
    console.warn({ ok: weServeResponse.ok, contentType, statusText: weServeResponse.statusText, status: weServeResponse.status });
    return weServeResponse;
  }
  const canonicalVariationURL = imageRequest.headers.get("x-er-canonical-variation-url"), fileName = imageRequest.headers.get("fileName"), sourceUrl = imageRequest.headers.get("x-er-source-url"), inputExtension = (imageRequest.headers.get("x-er-input-extension") || fileName?.split(".").pop() || "").replace(/^.+/, ""), weserveUrlStr = imageRequest.url;
  console.info({ canonicalVariationURL, weserveUrlStr, sourceUrl, fileName });
  let newExtension = contentType.split("/").pop()?.replace("jpeg", "jpg"), response = new Response(weServeResponse.body, weServeResponse);
  const acceptCh = [
    "Viewport-Height",
    "Sec-CH-Viewport-Height",
    "Viewport-Width",
    "Sec-CH-Viewport-Width",
    "DPR",
    "Sec-CH-DPR",
    "Width",
    "Sec-CH-Width"
  ].join(", ");
  response.headers.set("Accept-CH", acceptCh);
  response.headers.set("Vary", `${acceptCh}, Accept, Accept-Encoding`);
  response.headers.delete("cf-cache-status");
  response.headers.set("Cache-Control", "public, max-age=" + String(31536e3));
  response.headers.set("x-er-cached-On", String(Date.now()));
  response.headers.set("last-modified", new Date(Date.now() - 18e4).toUTCString());
  if (sourceUrl)
    response.headers.set("x-er-source-url", sourceUrl);
  response.headers.set("x-er-weserve-url", weserveUrlStr);
  if (fileName) {
    response.headers.set("Content-Disposition", `inline; filename = ${decodeURIComponent(fileName.replace(inputExtension, newExtension || inputExtension))}`.trim());
  }
  let cacheRequest = canonicalVariationURL ? new Request(canonicalVariationURL) : imageRequest;
  response.headers.set("link", `<${cacheRequest.url}>; rel = "canonical"`);
  const cache = caches.default;
  debug({
    cacheHit: false,
    contentType,
    sourceUrl,
    weserveUrlStr,
    fileName,
    canonicalVariationURL
  });
  ctx.waitUntil(cache.put(cacheRequest, response.clone()));
  return response;
}
async function getFromCacheOrThrow({
  canonicalVariationURL,
  weservUrl,
  skipCache,
  debug
}) {
  if (skipCache)
    return Promise.reject(new Error("skipping cache"));
  let response = await caches.default.match(new Request(canonicalVariationURL));
  if (!response) {
    return Promise.reject(new Error("variation not cached"));
  }
  if (!response.ok) {
    return Promise.reject(new Error(response.statusText));
  }
  const contentType = response.headers.get("Content-Type") || "";
  if (!contentType.startsWith("image/")) {
    return Promise.reject(new Error("non-image contentType: " + contentType));
  }
  const cachedOn = response.headers.get("x-er-cached-on") || String(Date.now()), cachedSourceUrl = response.headers.get("x-er-source-url") || decodeURIComponent(`https://${weservUrl.searchParams.get("url")}`), cachedWeserveurl = decodeURIComponent(response.headers.get("x-er-weserve-url") || weservUrl.toString()), cachedContentDisposition = response.headers.get("Content-Disposition"), cachedLink = response.headers.get("link"), ageSeconds = Math.ceil((Date.now() - Number(cachedOn)) / 1e3);
  debug({
    cacheHit: true,
    contentType,
    ageSeconds,
    cachedSourceUrl,
    cachedWeserveurl,
    cachedContentDisposition,
    cachedLink
  });
  return response;
}
export {
  AlignmentAliases,
  AvailableTransforms,
  FitAliases,
  FormatAliases,
  ResizerRouter,
  fallbackSvg
};
