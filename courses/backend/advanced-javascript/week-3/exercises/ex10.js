const API_BASE = "https://tea-api-787553294298.europe-west1.run.app/api";

const countTeas = async () => {
  // use await instead of .then()
  const response = await fetch(`${API_BASE}/teas`);
  const teas = await response.json();
  return teas;
}

countTeas();
