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

  describe() {
    const totalPrice = this.lineTotal().toFixed(2);
    return `${this.grams}g ${this.tea.name} - ${totalPrice} DKK`;
  }
}

const sencha = new Tea("Sencha", "green", "Japan", 0.12, true);
const item = new OrderItem(sencha, 200);

console.log(item.describe()); // "200g Sencha - 24.00 DKK"

const earlGrey = new Tea("Earl Grey", "black", "India", 0.08, false);
const matcha = new Tea("Matcha", "green", "Japan", 0.45, true);

const items = [
  new OrderItem(sencha, 100),
  new OrderItem(earlGrey, 200),
  new OrderItem(matcha, 50),
];

items.map((item) => item.describe()).forEach((line) => console.log(line));
// "100g Sencha - 12.00 DKK"
// "200g Earl Grey - 16.00 DKK"
// "50g Matcha - 22.50 DKK"
