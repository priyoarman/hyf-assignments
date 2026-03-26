const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

async function getTeaDetails(id) {
  const [teaResponse, inventoryResponse] = await Promise.all([
    fetch(`${API_BASE}/teas/${id}`),
    fetch(`${API_BASE}/inventory/${id}`),
  ]);

  const [tea, inventory] = await Promise.all([
    teaResponse.json(),
    inventoryResponse.json(),
  ]);

  return { ...tea, stockCount: inventory.stockCount };
}

// Test it:
getTeaDetails(2).then((tea) => {
  console.log(`${tea.name} (${tea.origin})`);
  console.log(`Price: ${tea.pricePerGram} DKK/gram`);
  console.log(`Stock: ${tea.stockCount} grams`);
  console.log(`Value: ${(tea.pricePerGram * tea.stockCount).toFixed(2)} DKK`);
});
