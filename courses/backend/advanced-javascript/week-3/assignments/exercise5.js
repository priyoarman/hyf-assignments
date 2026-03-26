const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

async function checkOrderStock(items) {
  const [teasResponse, inventoryResponse] = await Promise.all([
    fetch(`${API_BASE}/teas`),
    fetch(`${API_BASE}/inventory`),
  ]);

  const [teas, inventory] = await Promise.all([
    teasResponse.json(),
    inventoryResponse.json(),
  ]);

  const shortages = [];
  for (const item of items) {
    const tea = teas.find((t) => t.id === item.teaId);
    const stock = inventory.find((i) => i.teaId === item.teaId);
    const available = stock?.stockCount ?? 0;
    if (available < item.grams) {
      shortages.push({
        name: tea?.name ?? `Tea #${item.teaId}`,
        needed: item.grams,
        available,
      });
    }
  }
  return { inStock: shortages.length === 0, shortages };
}

async function calculateOrderTotal(items) {
  const response = await fetch(`${API_BASE}/teas`);
  const teas = await response.json();

  let total = 0;
  for (const item of items) {
    const tea = teas.find((t) => t.id === item.teaId);
    if (!tea) throw new Error(`Tea with id ${item.teaId} not found`);
    total += tea.pricePerGram * item.grams;
  }
  return total;
}

async function processOrder(items) {
  console.log("Processing order...\n");

  console.log("1. Validating items...");
  const response = await fetch(`${API_BASE}/teas`);
  const teas = await response.json();

  const missingIds = items
    .filter((item) => !teas.find((t) => t.id === item.teaId))
    .map((item) => item.teaId);

  if (missingIds.length > 0) {
    throw new Error(`Unknown tea IDs: ${missingIds.join(", ")}`);
  }

  console.log("2. Checking stock...");
  const stockResult = await checkOrderStock(items);
  if (!stockResult.inStock) {
    const details = stockResult.shortages
      .map((s) => `${s.name} (need ${s.needed}g, have ${s.available}g)`)
      .join(", ");
    throw new Error(`Items out of stock: ${details}`);
  }

  console.log("3. Calculating total...");
  const total = await calculateOrderTotal(items);

  console.log("4. Creating summary...\n");
  return {
    items: items.length,
    total,
    status: "ready",
  };
}

const myOrder = [
  { teaId: 7, grams: 50 },
  { teaId: 6, grams: 100 },
];

processOrder(myOrder)
  .then((result) => {
    console.log("Order ready!");
    console.log(`Items: ${result.items}`);
    console.log(`Total: ${result.total.toFixed(2)} DKK`);
  })
  .catch((err) => {
    console.error("Order failed:", err.message);
  });
