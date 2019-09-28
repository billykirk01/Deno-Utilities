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

export function writeToFile(filename: string, content: string, options: Deno.WriteFileOptions): void {
    const filePath = resolve(filename)
    const encoder = new TextEncoder();
    Deno.writeFileSync(filePath, encoder.encode(content), options);
}

export function appendToFile(filename: string, content: string) {
    writeToFile(filename, content, { append: true });
}

export function appendLineToFile(filename: string, content: string): void {
    appendToFile(filename, content + "\n")
}

export function readJSON(fileName: string): unknown {
    return readJsonSync(resolve(fileName))
}

export function writeJSON(fileName: string, json: any): unknown {
    return writeJsonSync(resolve(fileName), json)
}

export function transformJSONArray<T>(inputFileName: string, outputFileName: string, transformFn?: (obj: T) => any) {
    const inputFile = resolve(inputFileName)
    const outputFile = resolve(outputFileName)
    const inputJSON = readJSON(inputFile) as T[]
    if (transformFn) {
        const outputJSON = inputJSON.map(transformFn)
        writeJSON(outputFile, outputJSON)
        return
    }
    writeJSON(outputFile, inputJSON)
}

export * from "https://deno.land/std/fs/mod.ts"