import { serve } from "https://deno.land/std@0.75.0/http/server.ts";

const addr = "0.0.0.0:80";

self.onmessage = async (e) => {
  const { redirection } = e.data;
  for await (const req of serve(addr)) {
    switch (req.method) {
      case "GET":
        req.respond(
          {
            body: "We redirect now",
            headers: new Headers(
              [["Location", `https://${redirection}${req.url}`]],
            ),
            status: 301,
          },
        );
        break;
      default:
        req.respond({ status: 405 });
    }
  }
  self.close();
};
