import { appendFileStr } from "https://raw.githubusercontent.com/wkirk01/Deno-Utilities/master/fs.ts";
import { join } from "https://deno.land/std/path/mod.ts";

const filePath = join(Deno.cwd(), "test.txt");

await Deno.remove(filePath);

appendFileStr(filePath, "Hello world from line 1!\n");
appendFileStr(filePath, "Hello world from line 2!");