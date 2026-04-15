import Tea from "./exercise1.js";
import Order, { OrderItem } from "./exercise2.js";
import { teas } from "../data/teas.js";

// 1. PremiumTea extends Tea
class PremiumTea extends Tea {
  constructor(name, type, origin, pricePerGram, organic, grade) {
    // Call super(), store grade
    // Validate grade is "A", "B", or "C"
    super(name, type, origin, pricePerGram, organic);
    const validGrades = ["A", "B", "C"];
    if (!validGrades.includes(grade)) {
      throw new Error(`Invalid grade: ${grade}`);
    }
    this.grade = grade;
  }

  priceFor(grams) {
    // Override: A = 50% markup, B = 25%, C = 10%
    const basePrice = super.priceFor(grams);
    let markup = 0;
    if (this.grade === "A") {
      markup = 0.5;
    } else if (this.grade === "B") {
      markup = 0.25;
    } else if (this.grade === "C") {
      markup = 0.1;
    }
    return (parseFloat(basePrice) * (1 + markup)).toFixed(2);
  }

  describe() {
    // Override: include [Grade A] in description
    const gradeText = ` [Grade ${this.grade}]`;
    const organicText = this.organic ? " [organic]" : "";
    const markup = this.grade === "A" ? 0.5 : this.grade === "B" ? 0.25 : 0.1;
    const effectivePrice = (this.pricePerGram * 100 * (1 + markup)).toFixed(2);
    return `${this.name}${gradeText} (${this.type}) from ${this.origin} - ${effectivePrice} DKK/100g${organicText}`;
  }

  static fromTea(tea, grade) {
    // Create a PremiumTea from an existing Tea instance
    return new PremiumTea(
      tea.name,
      tea.type,
      tea.origin,
      tea.pricePerGram,
      tea.organic,
      grade,
    );
  }
}

// 2. ExpressOrder extends Order
class ExpressOrder extends Order {
  constructor(expressFee) {
    // Call super(), store express fee (default 25 DKK)
    super();
    this.expressFee = expressFee !== undefined ? expressFee : 25;
  }

  getTotal() {
    // Override: add express fee to parent's total
    return super.getTotal() + this.expressFee;
  }

  getSummary() {
    // Override: include express fee line in summary
    const status = this.status;
    const itemCount = this.items.length;
    const lines = this.items.map((item) => `  ${item.describe()}`);
    const baseTotal = super.getTotal().toFixed(2);
    return `Order (${status}) - ${itemCount} item${itemCount > 1 ? "s" : ""}\n${lines.join("\n")}\nExpress Fee: ${this.expressFee} DKK\nTotal: ${this.getTotal().toFixed(2)} DKK`;
  }
}

// Test PremiumTea:
const gyokuro = new PremiumTea("Gyokuro", "green", "Japan", 0.56, false, "A");
console.log(gyokuro.describe());
// "Gyokuro [Grade A] (green) from Japan - 84.00 DKK/100g"
console.log(gyokuro.priceFor(100)); // 84

const upgraded = PremiumTea.fromTea(teas.map(Tea.fromObject)[0], "B");
console.log(upgraded.describe());

// Test ExpressOrder:
const express = new ExpressOrder(25);
express.addItem(new OrderItem(gyokuro, 100));
console.log(express.getSummary());
// Should show items + express fee + total
console.log(express.getTotal()); // 84 + 25 = 109
