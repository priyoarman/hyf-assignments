const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

fetch(`${API_BASE}/teas/1`)
  .then((response) => response.json())
  .then((tea) => {
    console.log("Tea:", tea.name);
    // Return a new fetch to chain it
    return fetch(`${API_BASE}/inventory`)
    .then((response) => response.json())
    .then((inventory) => ({
      tea,
      inventory,
    }));
  })
  .then((tea, inventory) => {
    // Find this tea's stock in the inventory
    // Log the stock count
    const stockItem = inventory.find((item) => item.teaName === tea.name);
    if (stockItem) {
      console.log(`Stock for ${tea.name}: ${stockItem.stockCount}`);
    } else {
      console.log(`No stock found for ${tea.name}`);
    }
  })
  .catch((error) => console.error("Error:", error.message));
