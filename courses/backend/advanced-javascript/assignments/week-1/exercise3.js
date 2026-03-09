import { teas } from "../../data/teas.js";

const lowStockAlert = (teas) => {
  return teas
    .filter((tea) => tea.stockCount < 50)
    .sort((a, b) => a.stockCount - b.stockCount)
    .map((tea) => ({
      name: tea.name,
      stockCount: tea.stockCount,
    }));
};

console.log(lowStockAlert(teas));
