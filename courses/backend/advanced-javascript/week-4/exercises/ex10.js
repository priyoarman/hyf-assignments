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

class Order {
  constructor() {
    this.items = [];
    this.status = "pending";
  }

  addItem(orderItem) {
    if (this.status !== "pending") {
      throw new Error(`Cannot add items to a ${this.status} order`);
    }
    this.items.push(orderItem);
  }

  confirm() {
    if (this.status !== "pending") {
      throw new Error(
        `Can only confirm a pending order (current status: ${this.status})`,
      );
    }
    this.status = "confirmed";
  }

  ship() {
    if (this.status !== "confirmed") {
      throw new Error(
        `Can only ship a confirmed order (current status: ${this.status})`,
      );
    }
    this.status = "shipped";
  }

  deliver() {
    if (this.status !== "shipped") {
      throw new Error(
        `Can only deliver a shipped order (current status: ${this.status})`,
      );
    }
    this.status = "delivered";
  }
}

const order = new Order();
const sencha = new Tea("Sencha", "green", "Japan", 0.12, true);
order.addItem(new OrderItem(sencha, 100));
console.log(order.status); // "pending"

order.confirm();
console.log(order.status); // "confirmed"

try {
  order.addItem(new OrderItem(sencha, 50));
} catch (error) {
  console.error(error.message); // "Cannot add items to a confirmed order"
}

order.ship();
order.deliver();
console.log(order.status); // "delivered"
