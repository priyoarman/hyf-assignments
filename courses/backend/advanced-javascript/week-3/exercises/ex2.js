const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

fetch(`${API_BASE}/teas/3`)
  // your code
  .then((res) => res.json())
  .then((teas) => console.log(`${teas.name} from ${teas.origin}`))
  .catch((err) => console.error("Error message:", err.message));
