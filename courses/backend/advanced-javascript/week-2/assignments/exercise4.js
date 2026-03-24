import fs from "fs";
import { teas } from "../data/teas.js";

function generateInventoryReport(callback) {
  fs.readFile("./inventory-updates.json", "utf8", (error, data) => {
    if (error) {
      callback(error, null);
      return;
    }

    try {
      const updates = JSON.parse(data);
      
      const netChanges = updates.reduce((acc, update) => {
        acc[update.teaId] = (acc[update.teaId] || 0) + update.change;
        return acc;
      }, {});
      
      const reportLines = teas
        .filter(tea => netChanges[tea.id] !== undefined)
        .map(tea => {
          const change = netChanges[tea.id];
          const newStock = tea.stockCount + change;
          const changeStr = change >= 0 ? `+${change}` : `${change}`;
          const negative = newStock < 0 ? " (NEGATIVE!)" : "";
          return `- ${tea.name}: was ${tea.stockCount}, change ${changeStr}, now ${newStock}${negative}`;
        });
      
      const report = "Inventory Report:\n" + reportLines.join("\n");
      callback(null, report);
    } catch (parseError) {
      callback(parseError, null);
    }
  });
}

generateInventoryReport((error, report) => {
  if (error) {
    console.error("Failed:", error.message);
    return;
  }
  console.log(report);
});