import { teas } from "../data/teas.js";

function functionRunner(fn) {
  // call the function that was passed in
  fn();
}

// Test it:
functionRunner(function () {
  console.log("I was called!");
});

// Also test with a function variable:
const sayHello = function () {
  console.log("Hello!");
};
functionRunner(sayHello);
