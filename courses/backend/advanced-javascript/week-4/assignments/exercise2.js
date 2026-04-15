import Tea from "./exercise1.js";
import { teas } from "../data/teas.js";

export class OrderItem {
  constructor(tea, grams) {
    // tea is a Tea instance, grams is a positive number
    // Validate: grams must be positive
    if (grams <= 0) {
      throw new Error("Grams must be positive");
    }
    this.tea = tea;
    this.grams = grams;
  }

  lineTotal() {
    // Use tea.priceFor()
    return parseFloat(this.tea.priceFor(this.grams));
  }

  describe() {
    // "200g Sencha - 24.00 DKK"
    return `${this.grams}g ${this.tea.name} - ${this.lineTotal().toFixed(2)} DKK`;
  }
}

export default class Order {
  constructor() {
    // items array, status starts as "pending"
    this.items = [];
    this.status = "pending";
  }

  addItem(orderItem) {
    // Add item (only when pending)
    if (this.status !== "pending") {
      throw new Error("Cannot add item to non-pending order");
    }
    this.items.push(orderItem);
  }

  getTotal() {
    // Sum all line totals using .reduce()
    return this.items.reduce((sum, item) => sum + item.lineTotal(), 0);
  }

  getSummary() {
    // Return formatted multi-line string:
    // "Order (pending) - 2 items"
    // "  200g Sencha - 24.00 DKK"
    // "  50g Matcha - 22.50 DKK"
    // "Total: 46.50 DKK"
    const status = this.status;
    const itemCount = this.items.length;
    const lines = this.items.map((item) => `  ${item.describe()}`);
    const total = this.getTotal().toFixed(2);
    return `Order (${status}) - ${itemCount} items\n${lines.join("\n")}\nTotal: ${total} DKK`;
  }
}

// Test:
const teaInstances = teas.map(Tea.fromObject);
const order = new Order();
order.addItem(new OrderItem(teaInstances[0], 200)); // Sencha
order.addItem(new OrderItem(teaInstances[7], 50)); // Matcha

console.log(order.getSummary());
console.log("Total:", order.getTotal().toFixed(2), "DKK");
