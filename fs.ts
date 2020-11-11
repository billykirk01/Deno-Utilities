import { readJson, writeJson } from "https://deno.land/std@0.77.0/fs/mod.ts";
import { BufReader, readLines } from "https://deno.land/std@0.77.0/io/mod.ts";

/**
 * Write the string to file.
 *
 * @param filename File to write
 * @param content The content write to file
 * @returns Promise<void>
 */
export async function appendFileStr(
    filename: string,
    content: string
): Promise<void> {
    const encoder = new TextEncoder();
    await Deno.writeFile(filename, encoder.encode(content), { append: true });
}

export async function transformJSONArray(
    inputFile: string,
    outputFile: string,
    transformFn: (obj: any) => any
) {
    const inputJSON = await readJson(inputFile) as any[];
    if (transformFn && typeof (transformFn) === 'function') {
        const outputJSON = inputJSON.map(transformFn);
        writeJson(outputFile, outputJSON);
        return;
    }
    writeJson(outputFile, inputJSON);
}



/** Iterates through a file line by line.
 * @param filename File to read
 */

export async function* readline(filename: string): AsyncGenerator<string> {
  const r: Deno.File = await Deno.open(filename);
  const reader = new BufReader(r);

  for await (const line of readLines(reader)) {
    yield line;
  }

  r.close();
}

export * from "https://deno.land/std/fs/mod.ts";
