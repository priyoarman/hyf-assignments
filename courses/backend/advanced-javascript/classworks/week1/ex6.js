import { teas as data } from "../../data/teas.js";

const pricePer100g = (anything) => anything * 100;

const priceTags = data.map((tea) => {
  return `${tea.name} - ${pricePer100g(tea.pricePerGram)} DKK/100g`;
});

console.log(priceTags);

const implicitPriceTags = data.map(
  (tea) => `${tea.name} - ${pricePer100g(tea.pricePerGram)} DKK/100g`,
);

console.log(implicitPriceTags);
