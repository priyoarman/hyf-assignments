import { teas } from "../data/teas.js";

class Tea {
  // your constructor
  constructor(name, type, origin, pricePerGram, organic) {
    if (!name) {
      throw new Error("Error: Name is required");
    }
    if (pricePerGram < 0) {
      throw new Error("Error: Price must be positive");
    }
    const validTypes = ["green", "black", "herbal", "oolong", "white"];
    if (!validTypes.includes(type)) {
      throw new Error(`Error: Invalid type: ${type}`);
    }
    this.name = name;
    this.type = type;
    this.origin = origin;
    this.pricePerGram = pricePerGram;
    this.organic = organic;
  }
}

const valid = new Tea("Sencha", "green", "Japan", 0.12, true);
console.log(valid);

try {
  const noName = new Tea("", "green", "Japan", 0.12, true);
} catch (error) {
  console.error(error.message); // "Error: Name is required"
}

try {
  const badPrice = new Tea("Sencha", "green", "Japan", -1, true);
} catch (error) {
  console.error(error.message); // "Error: Price must be positive"
}

try {
  const badType = new Tea("Sencha", "purple", "Japan", 0.12, true);
} catch (error) {
  console.error(error.message); // "Error: Invalid type: purple"
}
