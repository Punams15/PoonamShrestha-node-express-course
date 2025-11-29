//EventEmitter is a built-in Node.js class that allows you to emit events and listen for them.
//(emitter.on function) .on(eventName, callback) — sets up a listener for an event.
//(.emit function) .emit(eventName, data) — triggers that event and sends optional data to the listeners.




//1) trigger events with a timer 
const EventEmitter = require("events");  
const emitter = new EventEmitter();  

// Listener for 'timer' events
emitter.on("timer", (msg) => console.log("Timer event received:", msg));

// Emit 'timer' event every 2 seconds
setInterval(() => {
  emitter.emit("timer", "hi there");
}, 2000);
//Listener (.on) should be set once, outside of setInterval.
//emit goes inside setInterval if you want repeated emissions.

//2)async function that waits on an event:Example below from CTD assignment

//const EventEmitter = require("events");  
//const emitter = new EventEmitter();  
//const waitForEvent = () => {  
  //return new Promise((resolve) => {  
    //emitter.on("happens", (msg) => resolve(msg));  
  //});  
//};  
//const doWait = async () => {  
  //const msg = await waitForEvent();  
  //console.log("We got an event! Here it is: ", msg);  
//};  
//doWait();  
//emitter.emit("happens", "Hello World!");  