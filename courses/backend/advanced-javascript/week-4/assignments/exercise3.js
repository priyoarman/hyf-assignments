import Tea from "./exercise1.js";
import { teas } from "../data/teas.js";

export default class Inventory {
  constructor() {
    // Store a Map or object of tea ID → { tea, stockCount }
    this.stock = new Map();
  }

  add(tea, stockCount) {
    // Add a tea to inventory
    this.stock.set(tea.id, { tea, stockCount });
  }

  sell(teaName, grams) {
    // Reduce stock. Throw if not enough stock.
    const entry = Array.from(this.stock.values()).find(
      (e) => e.tea.name === teaName,
    );
    if (!entry) {
      throw new Error(`Tea not found: ${teaName}`);
    }
    if (entry.stockCount < grams) {
      throw new Error(`Not enough stock for ${teaName}`);
    }
    entry.stockCount -= grams;
  }

  restock(teaName, grams) {
    // Increase stock
    const entry = Array.from(this.stock.values()).find(
      (e) => e.tea.name === teaName,
    );
    if (!entry) {
      throw new Error(`Tea not found: ${teaName}`);
    }
    entry.stockCount += grams;
  }

  getStock(teaName) {
    // Return current stock count for a tea
    const entry = Array.from(this.stock.values()).find(
      (e) => e.tea.name === teaName,
    );
    return entry ? entry.stockCount : 0;
  }

  getLowStock(threshold) {
    // Return array of { tea, stockCount } where stock < threshold
    // Use .filter()
    return Array.from(this.stock.values()).filter(
      (e) => e.stockCount < threshold,
    );
  }

  getTotalValue() {
    // Sum of (pricePerGram * stockCount) for all items
    // Use .reduce()
    return Array.from(this.stock.values()).reduce(
      (total, e) => total + e.tea.pricePerGram * e.stockCount,
      0,
    );
  }
}

// Test:
const teaInstances = teas.map(Tea.fromObject);
const inventory = new Inventory();

teaInstances.forEach((tea) => {
  const data = teas.find((t) => t.name === tea.name);
  inventory.add(tea, data.stockCount);
});

console.log("Sencha stock:", inventory.getStock("Sencha")); // 150

inventory.sell("Sencha", 50);
console.log("After selling 50g:", inventory.getStock("Sencha")); // 100

console.log("Low stock (< 50):");
inventory.getLowStock(50).forEach((item) => {
  console.log(`- ${item.tea.name}: ${item.stockCount}g`);
});

console.log(
  "Total inventory value:",
  inventory.getTotalValue().toFixed(2),
  "DKK",
);
