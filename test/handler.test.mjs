
import { ConsoleLog, Miniflare } from "miniflare";

import test from "ava";

/**
 * @type {import('miniflare').Options}
 */
const mfOptions={
  scriptPath: "./test/worker.js",
  // Some options omitted, see src/options/index.ts for the full list
  sourceMap: true,
  
  wranglerConfigPath: "./wrangler.toml",
  watch: false,
  port: 8989,
  upstream: "https://example.com",
  host:'0.0.0.0',
  
  cachePersist: true,
  
}
 
test("loads image with transformations and no prefix", async (t) => {
  // Get the Miniflare instance
  const  mf = new Miniflare(mfOptions)
  // Dispatch a fetch event to our worker
  let targetImg=`w=250_auto/upload.wikimedia.org/wikipedia/commons/f/f4/LosSantos-paisajeRural%282015%290711.jpg`
  const result = await mf.dispatchFetch(`http://${mfOptions.host}:${mfOptions.port}/${targetImg}`);
  t.is(result.status, 200)
 
  // Check the count is "1" as this is the first time we've been to this path
  t.assert(result.headers.get('content-type').includes('image/'));
});
test("loads image with no transformations and dummy prefix", async (t) => {
  // Get the Miniflare instance
  const  mf = new Miniflare(mfOptions)  // Dispatch a fetch event to our worker
  let targetImg=`_/upload.wikimedia.org/wikipedia/commons/f/f4/LosSantos-paisajeRural%282015%290711.jpg`
  const result = await mf.dispatchFetch(`http://${mfOptions.host}:${mfOptions.port}/${targetImg}`);
  t.is(result.status, 200)
 
  // Check the count is "1" as this is the first time we've been to this path
  t.assert(result.headers.get('content-type').includes('image/'));
});


test("loads image with transformations and  prefix", async (t) => {
  // Get the Miniflare instance
 const mfPrefix=new Miniflare({...mfOptions,bindings:{ROUTE_PREFIX:'/img'}})
  // Dispatch a fetch event to our worker
  let targetImg=`img/w=250_auto/images.weserv.nl/lichtenstein.jpg`
  const result = await mfPrefix.dispatchFetch(`http://${mfOptions.host}:${mfOptions.port}/${targetImg}`);
  t.is(result.status, 200)
 
  // Check the count is "1" as this is the first time we've been to this path
  t.assert(result.headers.get('content-type').includes('image/'));
});
test("loads image with  prefix, no transformations", async (t) => {
  // Get the Miniflare instance
  const mfPrefix=new Miniflare({...mfOptions,bindings:{ROUTE_PREFIX:'/img'}})
  // Dispatch a fetch event to our worker
  let targetImg=`img/images.weserv.nl/lichtenstein.jpg`
  const result = await mfPrefix.dispatchFetch(`http://${mfOptions.host}:${mfOptions.port}/${targetImg}`);
  t.is(result.status, 200)
 
  // Check the count is "1" as this is the first time we've been to this path
  t.assert(result.headers.get('content-type').includes('image/'));
});
