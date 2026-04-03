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

class OrderItem {
  constructor(tea, grams) {
    this.tea = tea;
    this.grams = grams;
  }

  lineTotal() {
    return this.tea.priceFor(this.grams);
  }
}

const sencha = new Tea("Sencha", "green", "Japan", 0.12, true);
const item = new OrderItem(sencha, 200);

console.log(item.tea.name); // "Sencha"
console.log(item.grams); // 200
console.log(item.lineTotal()); // 24
