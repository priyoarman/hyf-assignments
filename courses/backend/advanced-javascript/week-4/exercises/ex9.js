import { teas } from "../data/teas.js";

class Tea {
  // your constructor
  constructor(name, type, origin, pricePerGram, organic) {
    this.name = name;
    this.type = type;
    this.origin = origin;
    this.pricePerGram = pricePerGram;
    this.organic = organic;
  }

  priceFor(grams) {
    return this.pricePerGram * grams;
  }
}

class Inventory {
  constructor(tea, stockCount) {
    this.tea = tea;
    this.stockCount = stockCount;
  }

  sell(grams) {
    if (grams > this.stockCount) {
      throw new Error(
        `Not enough stock for ${this.tea.name} (have ${this.stockCount}, need ${grams})`,
      );
    }
    this.stockCount -= grams;
  }

  restock(grams) {
    this.stockCount += grams;
  }
}

const sencha = new Tea("Sencha", "green", "Japan", 0.12, true);
const stock = new Inventory(sencha, 150);

console.log(stock.stockCount); // 150
stock.sell(50);
console.log(stock.stockCount); // 100
stock.restock(200);
console.log(stock.stockCount); // 300

stock.sell(500); // Error: "Not enough stock for Sencha (have 300, need 500)"
