import { teas } from "../data/teas.js";

const groupedByOrigin = teas.reduce((group, tea) => {
  const country = tea.origin;

  if (!group[country]) {
    group[country] = [];
  }

  group[country].push(tea.name);

  return group;
}, {});

console.log(groupedByOrigin);

// Expected: { Japan: ["Sencha", "Matcha", ...], China: [...], ... }
