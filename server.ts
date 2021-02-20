import { serveTLS } from "https://deno.land/std@0.88.0/http/server.ts";

const proto = "https";
const domain = "example.com";
const options = {
  port: 443,
  certFile: `/etc/letsencrypt/live/${domain}/fullchain.pem`,
  keyFile: `/etc/letsencrypt/live/${domain}/privkey.pem`,
};

const worker = new Worker(new URL("worker.ts", import.meta.url).href, {
  type: "module",
  deno: {
    namespace: true,
  },
});

worker.postMessage({ redirectionUrl: `${proto}://${domain}`, port: 80 });

console.log(`${proto.toUpperCase()} server listening on ${proto}://${domain}`);

for await (const req of serveTLS(options)) {
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
