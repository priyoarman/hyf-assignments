import { teas } from "../data/teas.js";

function createGreeter(greeting) {
  return function (name) {
    console.log(`${greeting}, ${name}!`);
  };
}

const sayHello = createGreeter("Hello");
const sayHi = createGreeter("Hi");

sayHello("Alice"); // "Hello, Alice!"
sayHi("Bob"); // "Hi, Bob!"
