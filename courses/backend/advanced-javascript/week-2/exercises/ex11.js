import { teas } from "../data/teas.js";

function myFilter(array, callback) {
  // return array.filter(callback)
  const filteredElements = [];

  for (let i = 0; i < array.length; i++) {
    const element = array[i];
    if (element) {
      return filteredElements.push(callback(element));
    }
  }
}

// Test it:
const organic = myFilter(teas, function (tea) {
  return tea.organic;
});
console.log(organic.length); // number of organic teas
