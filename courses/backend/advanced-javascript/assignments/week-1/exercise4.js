import { teas } from "../../data/teas.js";

const teasByOrigin = (teas) => {
  return teas.reduce((accumulator, tea) => {
    const country = tea.origin;

    if (!accumulator[country]) {
      accumulator[country] = [];
    }

    accumulator[country].push(tea.name);

    return accumulator;
  }, {});
};

console.log(teasByOrigin(teas));
