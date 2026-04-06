import Tea from "./exercise1.js";
import Order from "./exercise2.js";
import { OrderItem } from "./exercise2.js";
import { teas } from "../data/teas.js";

export default class Customer {
  constructor(name, email) {
    // Store name, email, and empty orders array
    this.name = name;
    this.email = email;
    this.orders = [];
  }

  placeOrder(order) {
    // Confirm the order and add to this.orders
    // Return the order
    order.status = "confirmed";
    this.orders.push(order);
    return order;
  }

  totalSpent() {
    // Sum all order totals using .reduce()
    return this.orders.reduce((total, order) => total + order.getTotal(), 0);
  }

  getOrderHistory() {
    // Return formatted string of all orders
    // "Alex (alex@example.com) - 2 orders"
    // ""
    // "Order 1 (confirmed) - 1 item"
    // "  100g Sencha - 12.00 DKK"
    // "Total: 12.00 DKK"
    // ""
    // "Order 2 (confirmed) - 1 item"
    // "  50g Matcha - 22.50 DKK"
    // "Total: 22.50 DKK"
    // ""
    // "Lifetime total: 34.50 DKK"
    const header = `${this.name} (${this.email}) - ${this.orders.length} orders`;
    const orderLines = this.orders.map((order, index) => {
      const orderHeader = `Order ${index + 1} (${order.status}) - ${order.items.length} item${order.items.length > 1 ? "s" : ""}`;
      const itemLines = order.items.map((item) => `  ${item.describe()}`);
      const orderTotal = `Total: ${order.getTotal().toFixed(2)} DKK`;
      return [orderHeader, ...itemLines, orderTotal].join("\n");
    });
    const lifetimeTotal = `Lifetime total: ${this.totalSpent().toFixed(2)} DKK`;
    return [header, "", ...orderLines, "", lifetimeTotal].join("\n");
  }
}

// Test:
const teaInstances = teas.map(Tea.fromObject);
const customer = new Customer("Alex", "alex@example.com");

const order1 = new Order();
order1.addItem(new OrderItem(teaInstances[0], 100)); // Sencha
customer.placeOrder(order1);

const order2 = new Order();
order2.addItem(new OrderItem(teaInstances[7], 50)); // Matcha
customer.placeOrder(order2);

console.log(customer.getOrderHistory());
console.log("Total spent:", customer.totalSpent().toFixed(2), "DKK");
