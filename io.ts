import { BufReader, readLines } from "https://deno.land/std/io/mod.ts";

/** Iterates through a file line by line yielding the line on each iteration.
 * @param filename File to read
 */

export async function* readLinesFromFile(
  filename: string,
): AsyncGenerator<string> {
  const r: Deno.File = await Deno.open(filename);
  const reader = new BufReader(r);
  for await (const line of readLines(reader)) {
    yield line;
  }

  r.close();
}

/** Iterates through a file line by line yeilding a tuple of the line and line number on each iteration.
 * @param filename File to read
 */

export async function* readLinesFromFileWithCount(
  filename: string,
): AsyncGenerator<[string, number]> {
  const r: Deno.File = await Deno.open(filename);
  const reader = new BufReader(r);
  let index = 0;
  for await (const line of readLines(reader)) {
    index++;
    yield [line, index];
  }

  r.close();
}

/**
 * Writes a line to file.
 *
 * @param filename File to write
 * @param content The content to write to file
 * @returns Promise<void>
 */
export async function writeLineToFile(
  filename: string,
  content: string,
  options: Deno.WriteFileOptions = { append: true },
): Promise<void> {
  const encoder = new TextEncoder();
  await Deno.writeFile(
    filename,
    encoder.encode(content + "\n"),
    options,
  );
}

// /** Reads a JSON file and then parses it into an object */
// export async function readJson(filePath: string): Promise<unknown> {
//   const decoder = new TextDecoder("utf-8");

//   const content = decoder.decode(await Deno.readFile(filePath));

//   try {
//     return JSON.parse(content);
//   } catch (err) {
//     err.message = `${filePath}: ${err.message}`;
//     throw err;
//   }
// }

// /* Writes an object to a JSON file. */
// export async function writeJson(
//   filePath: string,
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   object: any,
//   options: WriteJsonOptions = {},
// ): Promise<void> {
//   const jsonString = serialize(filePath, object, options);
//   await Deno.writeTextFile(filePath, jsonString, {
//     append: options.append,
//     create: options.create,
//     mode: options.mode,
//   });
// }

// type Replacer = (key: string, value: any) => any;

// export interface WriteJsonOptions extends Deno.WriteFileOptions {
//   replacer?: Array<number | string> | Replacer;
//   spaces?: number | string;
// }

// function serialize(
//   filePath: string,
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   object: any,
//   options: WriteJsonOptions,
// ): string {
//   try {
//     const jsonString = JSON.stringify(
//       object,
//       options.replacer as string[],
//       options.spaces,
//     );
//     return `${jsonString}\n`;
//   } catch (err) {
//     err.message = `${filePath}: ${err.message}`;
//     throw err;
//   }
// }

// export async function transformJSONArray(
//     inputFile: string,
//     outputFile: string,
//     transformFn: (obj: any) => any,
//   ) {
//     const inputJSON = await readJson(inputFile) as any[];
//     if (transformFn && typeof (transformFn) === "function") {
//       const outputJSON = inputJSON.map(transformFn);
//       writeJson(outputFile, outputJSON);
//       return;
//     }
//     writeJson(outputFile, inputJSON);
//   }
