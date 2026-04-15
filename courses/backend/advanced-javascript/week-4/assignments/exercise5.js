import Tea from "./exercise1.js";
import Order from "./exercise2.js";
import { OrderItem } from "./exercise2.js";
import Inventory from "./exercise3.js";
import Customer from "./exercise4.js";
import { teas } from "../data/teas.js";

class TeaShop {
  constructor(teaData) {
    // Create a TeaCatalog from the data
    // Create an Inventory from the data
    // Store customers as an empty array
    this.catalog = teaData.map(Tea.fromObject);
    this.inventory = new Inventory();
    teaData.forEach((data) => {
      const tea = this.catalog.find((t) => t.name === data.name);
      this.inventory.add(tea, data.stockCount);
    });
    this.customers = [];
  }

  registerCustomer(name, email) {
    // Create and return a new Customer
    const customer = new Customer(name, email);
    this.customers.push(customer);
    return customer;
  }

  createOrder(customer, items) {
    // items is array of { teaName, grams }
    // 1. Find each tea in the catalog
    // 2. Check stock in inventory
    // 3. Create OrderItems and an Order
    // 4. Sell from inventory
    // 5. Place order on the customer
    // 6. Return the order
    const order = new Order();
    items.forEach(({ teaName, grams }) => {
      const tea = this.catalog.find((t) => t.name === teaName);
      if (!tea) {
        throw new Error(`Tea not found: ${teaName}`);
      }
      if (this.inventory.getStock(teaName) < grams) {
        throw new Error(`Not enough stock for ${teaName}`);
      }
      order.addItem(new OrderItem(tea, grams));
      this.inventory.sell(teaName, grams);
    });
    return customer.placeOrder(order);
  }

  getReport() {
    // Return a shop report:
    // - Total customers
    // - Total orders
    // - Total revenue
    // - Low stock items
    const totalCustomers = this.customers.length;
    const totalOrders = this.customers.reduce(
      (sum, c) => sum + c.orders.length,
      0,
    );
    const totalRevenue = this.customers.reduce(
      (sum, c) => sum + c.totalSpent(),
      0,
    );
    const lowStockItems = this.inventory
      .getLowStock(100)
      .map((e) => `${e.tea.name} (${e.stockCount}g)`);
    return `Tea Shop Report:\n- Total customers: ${totalCustomers}\n- Total orders: ${totalOrders}\n- Total revenue: ${totalRevenue.toFixed(2)} DKK\n- Low stock items: ${lowStockItems.join(", ")}`;
  }
}

// Test:
const shop = new TeaShop(teas);

const alex = shop.registerCustomer("Alex", "alex@example.com");
const maria = shop.registerCustomer("Maria", "maria@example.com");

const order1 = shop.createOrder(alex, [
  { teaName: "Sencha", grams: 100 },
  { teaName: "Matcha", grams: 25 },
]);
console.log(order1.getSummary());

const order2 = shop.createOrder(maria, [{ teaName: "Earl Grey", grams: 200 }]);
console.log(order2.getSummary());

console.log(shop.getReport());
