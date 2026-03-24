const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

fetch(`${API_BASE}/teas`)
  .then((response) => response.json())
  .then((teas) => {
    // Filter to Japanese teas
    // Log each one's name and price
    teas.forEach(tea => {
      if (tea.origin = "Japan") {
        console.log(`- ${tea.teaName}: ${tea.stockCount}`);
      }
    });
    
  })
  .catch((error) => console.error(error));