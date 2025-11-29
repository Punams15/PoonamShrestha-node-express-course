const { writeFile, readFile } = require("fs").promises;
const writer = async () => {
  try {
    await writeFile("temp.txt", "Line 1: Hello World!\n");    //same arguments as last week’s exercise 10-fs-sync
    await writeFile("temp.txt", "Line 2: Learning is awesome\n", { flag: "a" });  //same arguments as last week’s exercise 10-fs-sync
    await writeFile("temp.txt", "Line 3: Adventures are fun\n", { flag: "a" });   //same arguments as last week’s exercise 10-fs-sync
    console.log("done writing 3 lines");
  } catch (err) {
    console.log("An error occurred while writing 3 lines: ", err);
  }
};
const reader = async () => {
  try {
    const readTempTxt = await readFile("temp.txt", "utf8");
    console.log(readTempTxt);
  } catch (err) {
    console.log("An error occurred while reading file: ", err);
  }
};
const readWrite = async () => {
  try {
    await writer();
    await reader();
  } catch (err) {
    console.log("An error occurred while reading and writing file: ", err);
  }
};
readWrite();
