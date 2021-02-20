# deno_tlsify

Redirect from HTTP to HTTPS using the Deno Web Workers API.

Run the example with `deno -A --unstable server.ts`.

You can use the worker in your own code by importing the Data URL:

```typescript
import { redirectionWorkerDataUrl } from "https://deno.land/x/deno_tlsify/mod.ts"

const worker = new Worker(redirectionWorkerDataUrl, {
  type: "module",
  deno: {
    namespace: true,
  },
})

worker.postMessage({ redirectionUrl: `https://domain.com`, port: 80 })
```

Don't forget to use deno's `--unstable` flag!
