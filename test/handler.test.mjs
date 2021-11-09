
import { ConsoleLog, Miniflare } from "miniflare";

import test from "ava";

test.beforeEach((t) => {
  // Create a new Miniflare environment for each test
  const mf = new Miniflare({
    scriptPath: "./dist/worker.js",
    // Some options omitted, see src/options/index.ts for the full list
    sourceMap: true,
    log: new ConsoleLog(), // Defaults to no-op logger
    wranglerConfigPath: "./wrangler.toml",
    watch: true,
    port: 8989,
    upstream: "https://img.ctohm.com",
    
    cachePersist: true,
    
  });
  t.context = { mf };
  console.log(t.context)
});

test("increments path count for new paths", async (t) => {
  // Get the Miniflare instance
  const { mf } = t.context;
  // Dispatch a fetch event to our worker
  const result = await mf.dispatchFetch("http://localhost:8989/w=100/avatars.githubusercontent.com/u/71311688");
  t.is(result.status, 200)
 
  // Check the count is "1" as this is the first time we've been to this path
  t.assert(result.headers.get('content-type').includes('image/'));
});
