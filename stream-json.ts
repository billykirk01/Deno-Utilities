// import { EventEmitter } from "https://deno.land/std/node/events.ts";

// export class JSONStream extends EventEmitter {

//     private openBraceCount = 0;
//     private tempUint8Array: number[] = [];
//     private decoder = new TextDecoder();

//     constructor (private filepath: string) {
//         super();
//         this.stream();
//     }

//     async stream() {
//         console.time("Run Time");
//         let file = await Deno.open(this.filepath);
//         //creates iterator from reader, default buffer size is 32kb
//         for await (const buffer of Deno.iter(file)) {

//             for (let i = 0, len = buffer.length; i < len; i++) {
//                 const uint8 = buffer[ i ];

//                 //remove whitespace
//                 if (uint8 === 10 || uint8 === 13 || uint8 === 32) continue;

//                 //open brace
//                 if (uint8 === 123) {
//                     if (this.openBraceCount === 0) this.tempUint8Array = [];
//                     this.openBraceCount++;
//                 };

//                 this.tempUint8Array.push(uint8);

//                 //close brace
//                 if (uint8 === 125) {
//                     this.openBraceCount--;
//                     if (this.openBraceCount === 0) {
//                         const uint8Ary = new Uint8Array(this.tempUint8Array);
//                         const jsonString = this.decoder.decode(uint8Ary);
//                         const object = JSON.parse(jsonString);
//                         this.emit('object', object);
//                     }
//                 };
//             };
//         }
//         file.close();
//         console.timeEnd("Run Time");
//     }
// }

// // const stream = new JSONStream('test.json');

// // stream.on('object', (object: any) => {
// //      do something with object
// // });
