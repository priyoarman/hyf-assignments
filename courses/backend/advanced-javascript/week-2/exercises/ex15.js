import { teas } from "../data/teas.js";

function findTeaById(id, callback) {
    setTimeout(function () {
      const tea = teas.find(t => t.id === id);
      callback(tea);
    }, 500);
}


findTeaById(1, function (tea) {
  console.log("Got:", tea.name);
});
findTeaById(5, function (tea) {
  console.log("Got:", tea.name);
});
findTeaById(10, function (tea) {
  console.log("Got:", tea.name);
});
console.log("All requests sent!");