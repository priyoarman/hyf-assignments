import { teas } from "../data/teas.js";
import fs from "fs";

//  Use reduce to calculate the total stock for each caffeine level
function stockByCaffeine(teas) {
  return teas.reduce((acc, tea) => {
    // Your implementation
    acc[tea.caffeineLevel] += tea.stockCount;
    return acc;
  }, { high: 0, medium: 0, low: 0, none: 0 });
}

console.log(stockByCaffeine(teas));
// expected: { high: 745, medium: 450, low: 190, none: 635 }