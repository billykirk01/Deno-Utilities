import { readJsonSync as _readJsonSync } from "https://deno.land/std/fs/mod.ts";
import { resolve } from "https://deno.land/std/fs/path/mod.ts";

export function readJsonSync(fileName: string): unknown {
    return _readJsonSync(resolve(fileName))
}