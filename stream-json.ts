import { EventEmitter } from "https://deno.land/std/node/events.ts";

class JSONStream extends EventEmitter {

    private openBraceCount = 0;
    private tempByteArray: number[] = [];
    private decoder = new TextDecoder();

    constructor (private filepath: string) {
        super();
        this.stream();
    }

    async stream() {
        console.time("Run Time");
        let file = await Deno.open(this.filepath);
        const iter = Deno.iter(file);
        for await (const chunk of iter) {
            chunk.forEach((uint8) => {
                //open brace
                if (uint8 === 123) {
                    if (this.openBraceCount === 0) this.tempByteArray = [];
                    this.openBraceCount++;
                };

                this.tempByteArray.push(uint8);

                //close brace
                if (uint8 === 125) {
                    this.openBraceCount--;
                    if (this.openBraceCount === 0) {
                        const uint8Ary = new Uint8Array(this.tempByteArray);
                        const jsonString = this.decoder.decode(uint8Ary);
                        const object = JSON.parse(jsonString);
                        this.emit('object', object);
                    }
                };
            });
        }
        file.close();
        console.timeEnd("Run Time");
    }
}

const stream = new JSONStream('test.json');

stream.on('object', (object: any) => {
    // do something with object
});

