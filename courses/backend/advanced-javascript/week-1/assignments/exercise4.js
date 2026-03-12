import { teas } from "../data/teas.js";

const teasByOrigin = (teasArray) => {
  const groups = {};

  teasArray.forEach((tea) => {
    const country = tea.origin;

    if (!groups[country]) {
      groups[country] = [];
    }

    groups[country].push(tea.name);
  });

  return groups;
};

console.log(teasByOrigin(teas));
