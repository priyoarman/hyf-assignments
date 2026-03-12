import { teas } from "../../data/teas.js";

const inventoryReport = (teasArray) => {
  let totalValue = 0;
  let totalPriceSum = 0;
  let inStockCount = 0;
  let outOfStockCount = 0;

  teasArray.forEach((tea) => {
    totalValue += tea.pricePerGram * tea.stockCount;
    totalPriceSum += tea.pricePerGram;

    if (tea.inStock) {
      inStockCount++;
    } else {
      outOfStockCount++;
    }
  });

  return {
    totalTeas: teasArray.length,
    inStock: inStockCount,
    outOfStock: outOfStockCount,
    totalInventoryValue: totalValue,
    averagePrice: totalPriceSum / teasArray.length,
  };
};

console.log(inventoryReport(teas));
