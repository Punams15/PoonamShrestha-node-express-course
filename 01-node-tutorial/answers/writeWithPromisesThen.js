 const { writeFile, readFile } = require("fs").promises;
 
 writeFile("temp.txt", "Line 1: Good Morning!\n" ) 
  .then(() => {  
    console.log ("Line 1 is done");
    return writeFile("temp.txt", "Line 2:How are you?\n", { flag: "a" }); 
 })  
     .then(() => {  
    console.log ("Line 2 is done");
     return writeFile("temp.txt", "Line 3:Good to meet you!\n", { flag: "a" });  
     })
    .then(() => {  
    console.log ("Line 3 is done");
     return readFile("temp.txt", "utf8"); 
     })
.then((data) => {
    //data parameter is returned by readFile
    console.log("File contents:\n" + data); //replaced this **console.log("File contents:\n", data);**  to avoid space in front of line 1 .Can also be used this :console.log(data); or console.log(`File contents:\n${data}`);

  })
  .catch((err) => {
    console.log("An error occurred:", err);
  });
