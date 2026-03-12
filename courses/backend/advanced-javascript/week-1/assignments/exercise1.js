import { teas } from "../data/teas.js";

const teasWithCaffeine = teas
  .filter((tea) => tea.caffeineLevel !== "none")
  .map((tea) => tea.name.toUpperCase());

console.log(teasWithCaffeine);
