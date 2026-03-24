import { teas } from "../data/teas.js";

const inventoryValue = teas.reduce((sum, tea) => {
    return sum + (tea.pricePerGram * tea.stockCount);
}, 0);

console.log(inventoryValue);

