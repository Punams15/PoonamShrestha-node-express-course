const { createReadStream } = require("fs"); //1)Import createReadStream function from Node.js’s built-in fs (file system) module.

const stream = createReadStream("../content/big.txt", {      //2)Create a read stream, his creates a stream object that reads the file ../content/big.txt
  encoding: "utf8",
  highWaterMark: 200
});

let chunkCounter = 0;  //3)This variable will count how many chunks have been read from the stream.Each data event corresponds to one chunk.

stream.on("data", (chunk) => {     //4) Listen to the data event...Handle "data" event and increment counter
  chunkCounter++;
  console.log(`Chunk ${chunkCounter}:`, chunk);
});

stream.on("end", () => {    //5)Listen and Handle "end" event and report total chunks
  console.log(`\nStream finished. Total chunks: ${chunkCounter}`);
});

stream.on("error", (err) => {     //6)Listen and Handle "error" event
  console.error("Stream error:", err);
});


// modifying prompter.js and creating customEmitter.js) cover the same learning goals of 13-event-emitter.js and 14-request-event.js:(tutorial help folder)


// default 64kb
// last buffer - remainder
// highWaterMark - control size
// const stream = createReadStream('./content/big.txt', { highWaterMark: 90000 })
// const stream = createReadStream('../content/big.txt', { encoding: 'utf8' })






//1)fs.createReadStream

	//Instead of loading the whole file at once (readFileSync), it reads the file in chunks.

	//encoding: "utf8" converts buffer to string.

	//highWaterMark: 200 sets chunk size to 200 bytes.

//2)data event

	//Fired every time a new chunk is read.

	//Here, we increment a counter and log the chunk contents.

//3)end event

	//Fired when the file is completely read.

	//Logs total number of chunks received.

//4)error event

	//Catches any read errors, like if the file doesn’t exist.