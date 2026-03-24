const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

fetch(`${API_BASE}/teas`)
  .then((res) => res.json())
  .then((teas) => console.log(`Found ${teas.length} teas`))
  .catch((err) => console.error("Error message:", err.message));
