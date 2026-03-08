import { teas as data } from "./data/teas.js";

const highCaffeine = data.filter(tea => tea.caffeineLevel === "high");

console.log(highCaffeine);