import { teas as data } from "./data/teas.js";

const organicTeasPrices = data
  .filter((tea) => tea.organic)
  .map(function (tea) {
    const pricePer100g = tea.pricePerGram * 100;
    return `${tea.name} - ${pricePer100g} DKK/100g`;
  });

console.log(organicTeasPrices);
