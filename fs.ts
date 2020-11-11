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
  content: string,
): Promise<void> {
  const encoder = new TextEncoder();
  await Deno.writeFile(filename, encoder.encode(content), { append: true });
}

export async function transformJSONArray(
  inputFile: string,
  outputFile: string,
  transformFn: (obj: any) => any,
) {
  const inputJSON = await readJson(inputFile) as any[];
  if (transformFn && typeof (transformFn) === "function") {
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

/** Reads a JSON file and then parses it into an object */
export async function readJson(filePath: string): Promise<unknown> {
  const decoder = new TextDecoder("utf-8");

  const content = decoder.decode(await Deno.readFile(filePath));

  try {
    return JSON.parse(content);
  } catch (err) {
    err.message = `${filePath}: ${err.message}`;
    throw err;
  }
}

/* Writes an object to a JSON file. */
export async function writeJson(
  filePath: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  object: any,
  options: WriteJsonOptions = {},
): Promise<void> {
  const jsonString = serialize(filePath, object, options);
  await Deno.writeTextFile(filePath, jsonString, {
    append: options.append,
    create: options.create,
    mode: options.mode,
  });
}

export * from "https://deno.land/std/fs/mod.ts";
