import { teas as data } from "../data/teas.js";

const organicTeasPrices = data
  .filter((tea) => tea.organic)
  .map((tea) => `${tea.name} - ${tea.pricePerGram * 100} DKK/100g`);

console.log(organicTeasPrices);
