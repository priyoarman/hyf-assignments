import { teas as data } from "../data/teas.js";

const greenTeas = data
  .filter((tea) => tea.type == "green")
  .map((tea) => tea.name);

console.log(greenTeas);
