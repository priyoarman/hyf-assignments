import { teas as data } from "../../data/teas.js";

const pricePer100g = data.map((tea) => tea.pricePerGram * 100);

console.log(pricePer100g);
