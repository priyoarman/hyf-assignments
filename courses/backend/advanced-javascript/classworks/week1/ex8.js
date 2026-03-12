import { teas as data } from "../../data/teas.js";

const japaneseTeas = data.filter(tea => tea.origin === "Japan");

console.log(japaneseTeas);