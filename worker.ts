import { serve } from "https://deno.land/std@0.88.0/http/server.ts";

self.onmessage = async (e) => {
  const { redirectionUrl, port } = e.data;
  for await (const req of serve({ port })) {
    switch (req.method) {
      case "GET":
        req.respond(
          {
            headers: new Headers(
              [["Location", `${redirectionUrl}${req.url}`]],
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
