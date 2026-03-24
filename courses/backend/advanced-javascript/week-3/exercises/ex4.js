const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

fetch(`${API_BASE}/inventory`)
  // your code
  .then((res) => res.json())
  .then((inventory) => {
    console.log(`Low stock:`);
    inventory.forEach(tea => {
      if (tea.stockCount < 50) {
        console.log(`- ${tea.teaName}: ${tea.stockCount}`);
      }
    });
  })
  .catch((err) => console.error("Error message:", err.message));
