import { readJson, writeJson } from "https://deno.land/std/fs/mod.ts";

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

export * from "https://deno.land/std/fs/mod.ts";
