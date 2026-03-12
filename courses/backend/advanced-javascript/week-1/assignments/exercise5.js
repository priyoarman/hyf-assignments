import { teas } from "../data/teas.js";

const searchTeas = (teas, search) => {
  const lowerSearch = search.toLowerCase();

  return teas
    .filter((tea) => tea.name.toLowerCase().includes(lowerSearch))
    .map((tea) => tea.name)
    .sort();
};

console.log(searchTeas(teas, "earl"));
// Returns: ["Earl Grey"]

console.log(searchTeas(teas, "dragon"));
// Returns: ["Dragon Well"]

console.log(searchTeas(teas, "ch"));
// Returns: ["Chamomile", "Genmaicha", "Lapsang Souchong"]
