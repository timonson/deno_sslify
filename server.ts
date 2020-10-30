import { serve } from "https://deno.land/std@0.75.0/http/server.ts";

const proto = "http";
const addr = "0.0.0.0:443";
const root = "static";

const worker = new Worker(new URL("worker.ts", import.meta.url).href, {
  type: "module",
  deno: true,
});
worker.postMessage({ redirection: addr });

console.log(`${proto.toUpperCase()} server listening on ${proto}://${addr}/`);

for await (const req of serve(addr)) {
  switch (req.method) {
    case "GET":
      req.respond(
        {
          body: "Hello World",
        },
      );
      break;
    default:
      req.respond({ status: 405 });
  }
}
