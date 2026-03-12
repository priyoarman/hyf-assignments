import { teas as data } from "../data/teas.js";

const japaneseTeasSorted = data
  .filter((tea) => tea.origin == "Japan")
  .sort((a, b) => a.pricePerGram - b.pricePerGram);

console.log(japaneseTeasSorted);
