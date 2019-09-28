import { readJsonSync, writeJsonSync } from "https://deno.land/std/fs/mod.ts";
import { resolve } from "https://deno.land/std/fs/path/mod.ts";

export function fileExists(filename: string): boolean {
    try {
        Deno.statSync(resolve(filename));
        // successful, file or directory must exist
        return true;
    } catch (error) {
        if (error && error.kind === Deno.ErrorKind.NotFound) {
            // file or directory does not exist
            return false;
        } else {
            // unexpected error, maybe permissions, pass it along
            throw error;
        }
    }
}

export function removeFile(fileName: string) {
    if (fileExists(fileName)) {
        Deno.removeSync(resolve(fileName))
    }
}

export function writeFileStringSync(filename: string, content: string, options: Deno.WriteFileOptions) {
    const filePath = resolve(filename)
    const encoder = new TextEncoder();
    Deno.writeFileSync(filePath, encoder.encode(content), options);
}

export function appendLineToFile(filename: string, content: string) {
    writeFileStringSync(filename, content + "\n", { append: true })
}

export function readJSONSync<T>(fileName: string): T {
    return readJsonSync(resolve(fileName)) as T
}

export function writeJSONSync(fileName: string, json: any){
    return writeJsonSync(resolve(fileName), json)
}

export function transformJSONArray<T>(inputFileName: string, outputFileName: string, transformFn?: (obj: T) => any) {
    const inputFile = resolve(inputFileName)
    const outputFile = resolve(outputFileName)
    const inputJSON = readJSONSync(inputFile) as T[]
    if (transformFn) {
        const outputJSON = inputJSON.map(transformFn)
        writeJSONSync(outputFile, outputJSON)
        return
    }
    writeJSONSync(outputFile, inputJSON)
}

export * from "https://deno.land/std/fs/mod.ts"
export { resolve } from "https://deno.land/std/fs/path/mod.ts";