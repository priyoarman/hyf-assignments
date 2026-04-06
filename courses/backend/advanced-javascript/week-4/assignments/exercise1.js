import { teas } from "../data/teas.js";

export default class Tea {
  constructor(name, type, origin, pricePerGram, organic, id) {
    if (typeof name !== "string" || name.trim() === "") {
      throw new Error("Name is required");
    }
    const validTypes = ["green", "black", "herbal", "oolong", "white"];
    if (!validTypes.includes(type)) {
      throw new Error(`Invalid type: ${type}`);
    }
    if (typeof pricePerGram !== "number" || pricePerGram <= 0) {
      throw new Error("Price per gram must be a positive number");
    }
    this.name = name;
    this.type = type;
    this.origin = origin;
    this.pricePerGram = pricePerGram;
    this.organic = organic;
    this.id = id;
  }

  priceFor(grams) {
    return (this.pricePerGram * grams).toFixed(2);
  }

  describe() {
    const organicText = this.organic ? " [organic]" : "";
    return `${this.name} (${this.type}) from ${this.origin} - ${this.pricePerGram * 100} DKK/100g${organicText}`;
  }

  static fromObject(obj) {
    return new Tea(
      obj.name,
      obj.type,
      obj.origin,
      obj.pricePerGram,
      obj.organic,
      obj.id,
    );
  }
}

// Test validation:
try {
  new Tea("", "green", "Japan", 0.12, true);
} catch (e) {
  console.log(e.message);
} // "Name is required"

try {
  new Tea("Test", "purple", "Japan", 0.12, true);
} catch (e) {
  console.log(e.message);
} // "Invalid type: purple"

// Test factory method:
const teaInstances = teas.map(Tea.fromObject);
console.log(teaInstances.length); // 20
console.log(teaInstances[0].describe());
// "Sencha (green) from Japan - 12.00 DKK/100g [organic]"
console.log(teaInstances[1].describe());
// "Earl Grey (black) from India - 8.00 DKK/100g"
