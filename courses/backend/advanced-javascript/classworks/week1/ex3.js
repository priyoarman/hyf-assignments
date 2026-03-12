import { teas as data } from "../../data/teas.js";

let organicCount = 0;

data.forEach((tea) => {
  if (tea.organic === true) {
    organicCount++;
  }
});

console.log(`The organic tea count is: ${organicCount}`);
