import { teas as data } from "../data/teas.js"

const filterTeas = (teas, criteria) => {
    data.filter((tea) => tea.organic)
}

console.log(filterTeas);
