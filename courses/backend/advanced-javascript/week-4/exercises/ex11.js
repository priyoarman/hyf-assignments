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

class Order {
  constructor() {
    this.items = [];
    this.status = "pending";
  }

  addItem(item) {
    this.items.push(item);
  }

  getTotal() {
    return this.items.reduce((total, item) => total + item.lineTotal(), 0);
  }

  getSummary() {
    const itemLines = this.items
      .map((item) => `- ${item.describe()}`)
      .join("\n");
    const totalPrice = this.getTotal().toFixed(2);
    return `Order (${this.status}) - ${this.items.length} items\n${itemLines}\nTotal: ${totalPrice} DKK`;
  }
}

const order = new Order();
order.addItem(
  new OrderItem(new Tea("Sencha", "green", "Japan", 0.12, true), 100),
);
order.addItem(
  new OrderItem(new Tea("Matcha", "green", "Japan", 0.45, true), 50),
);

console.log(order.getTotal()); // 34.5
console.log(order.getSummary());
// Order (pending) - 2 items
// - 100g Sencha - 12.00 DKK
// - 50g Matcha - 22.50 DKK
// Total: 34.50 DKK
