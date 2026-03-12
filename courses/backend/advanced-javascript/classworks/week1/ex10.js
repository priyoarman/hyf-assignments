import { teas as data } from "../../data/teas.js";

const inStockAndOrganic = data.filter((tea) => tea.organic && tea.inStock);

console.log(inStockAndOrganic);
