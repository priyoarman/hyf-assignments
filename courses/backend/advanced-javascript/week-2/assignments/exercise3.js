import { teas } from "../data/teas.js";
import {
  order,
  validateOrder,
  calculateTotal,
  checkStock,
} from "./exercise2.js";

function processOrder(order) {
  console.log("Processing order", order.id);

  validateOrder(order, (validation) => {
    if (!validation.valid) {
      console.log("Validation failed:", validation.errors);
      return;
    }
    console.log("Validation passed");

    calculateTotal(order, (pricing) => {
      console.log("Total:", pricing.total, "DKK");

      checkStock(order, (stock) => {
        console.log("In stock:", stock.inStock);
        if (stock.shortages.length > 0) {
          console.log("Shortages:", stock.shortages);
        }
      });
    });
  });
}

processOrder(order);
