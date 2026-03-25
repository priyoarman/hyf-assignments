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

  return {
    inStock: shortages.length === 0,
    shortages,
  };
}

const largeOrder = [
  { teaId: 1, grams: 100 },
  { teaId: 2, grams: 500 },
  { teaId: 5, grams: 9999 },
];

checkOrderStock(largeOrder).then((result) => {
  if (result.inStock) {
    console.log("All items in stock!");
  } else {
    console.log("Shortages:");
    result.shortages.forEach((s) => {
      console.log(`- ${s.name}: need ${s.needed}, have ${s.available}`);
    });
  }
});
