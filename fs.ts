import { readJsonSync as _readJsonSync } from "https://deno.land/std/fs/mod.ts";
import { resolve } from "https://deno.land/std/fs/path/mod.ts";

export function exists(filename: string): boolean {
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
    if (exists(fileName)) {
        Deno.removeSync(resolve(fileName))
    }
}

export function writeFileStrSync(filename: string, content: string, options: Deno.WriteFileOptions): void {
    const filePath = resolve(filename)
    const encoder = new TextEncoder();
    Deno.writeFileSync(filePath, encoder.encode(content), options);
}

export function readJsonSync(fileName: string): unknown {
    return _readJsonSync(resolve(fileName))
}