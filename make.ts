import { encode } from "https://deno.land/std/encoding/base64.ts";

await Deno.writeTextFile(
  "mod.ts",
  `export const redirectionWorkerDataUrl = 'data:application/javascript;base64,${
    encode(await Deno.readFile("./worker.ts"))
  }'`,
);
