import { teas } from "../data/teas.js";

export const order = {
  id: 1001,
  customerId: 42,
  items: [
    { teaId: 1, grams: 100 },
    { teaId: 8, grams: 50 },
    { teaId: 3, grams: 200 },
  ],
};

export const validateOrder = (order, callback) => {
  setTimeout(() => {
    const errors = [];
    order.items.forEach((item) => {
      const teaExists = teas.some((t) => t.id === item.teaId);
      if (!teaExists) {
        errors.push(`Tea ID ${item.teaId} does not exist.`);
      }
    });

    callback({
      valid: errors.length === 0,
      errors: errors,
    });
  }, 200);
};

export const calculateTotal = (order, callback) => {
  setTimeout(() => {
    const total = order.items.reduce((sum, item) => {
      const tea = teas.find((t) => t.id === item.teaId);
      return sum + (tea ? tea.pricePerGram * item.grams : 0);
    }, 0);

    callback({
      orderId: order.id,
      total: Number(total.toFixed(2)),
    });
  }, 300);
};

export const checkStock = (order, callback) => {
  setTimeout(() => {
    const shortages = [];
    order.items.forEach((item) => {
      const tea = teas.find((t) => t.id === item.teaId);
      if (tea && tea.stockCount < item.grams) {
        shortages.push(`${tea.name} has ${tea.stockCount}g left.`);
      }
    });

    callback({
      orderId: order.id,
      inStock: shortages.length === 0,
      shortages: shortages,
    });
  }, 400);
};

validateOrder(order, (result) => {
  console.log("Validation result:", result);
});

calculateTotal(order, (result) => {
  console.log("Calculation result:", result);
});

checkStock(order, (result) => {
  console.log("Stock check result:", result);
});