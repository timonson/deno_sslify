import { serve } from "https://deno.land/std@0.88.0/http/server.ts";

const port = 80;

self.onmessage = async (e) => {
  const { redirection } = e.data;
  for await (const req of serve({ port })) {
    switch (req.method) {
      case "GET":
        req.respond(
          {
            body: "We redirect now",
            headers: new Headers(
              [["Location", `${redirection}${req.url}`]],
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
