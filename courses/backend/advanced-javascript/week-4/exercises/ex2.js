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
}

const firstTea = teas[0];
const tea = new Tea(
  firstTea.name,
  firstTea.type,
  firstTea.origin,
  firstTea.pricePerGram,
  firstTea.organic,
);
console.log(tea);
