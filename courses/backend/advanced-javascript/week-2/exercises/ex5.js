import { teas } from "../data/teas.js";

const totalStock = teas.reduce((sum, tea) => 
        sum + tea.stockCount, 0);

console.log(totalStock); // sum of all stockCount values
