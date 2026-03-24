import { teas } from "../data/teas.js";

const logTea = function (tea) {
  console.log(`${tea.name} (${tea.origin})`);
};

logTea(teas[1]); // should log: "Sencha (Japan)"
