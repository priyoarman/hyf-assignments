import { teas as data } from "../../data/teas.js";

const organicTeas = data.filter(tea => tea.organic);

console.log(organicTeas);