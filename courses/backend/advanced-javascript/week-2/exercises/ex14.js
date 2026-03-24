import { teas } from "../data/teas.js";

function findTeaById(id, callback) {
    setTimeout(function () {
      const tea = teas.find(t => t.id === id);
      callback(tea);
    }, 500);
}

// Test it:
console.log("Looking up tea...");
findTeaById(5, function (tea) {
  console.log("Found:", tea.name);
});
console.log("Request sent, waiting...");