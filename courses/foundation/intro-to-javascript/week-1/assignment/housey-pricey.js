console.log("Peter's House :");

const petersWidth = 8;
const petersDepth = 10;
const petersHeight = 10;
const petersGarden = 100;
const petersActualPrice = 2500000;

const petersVolume = petersWidth * petersDepth * petersHeight;

const petersFormulaPrice = petersVolume * 2.5 * 1000 + petersGarden * 300;

console.log("Peter's formula price is: " + petersFormulaPrice);
console.log("Peter's actual price is: " + petersActualPrice);

if (petersActualPrice > petersFormulaPrice) {
    console.log("Peter is paying TOO MUCH")
} else if (petersActualPrice < petersFormulaPrice) {
    console.log("Peter is paying TOO LITTLE")
} else {
    console.log("Peter is paying the EXACT PRICE")
}

console.log("Julia's House :");

const juliasWidth = 5;
const juliasDepth = 11;
const juliasHeight = 8;
const juliasGarden = 70;
const juliasActualPrice = 1000000;

const juliasVolume = juliasWidth * juliasDepth * juliasHeight;

const juliasFormulaPrice = juliasVolume * 2.5 * 1000 + juliasGarden * 300;

console.log("Julia's formula price is: " + juliasFormulaPrice);
console.log("Julia's actual price is: " + juliasActualPrice);

if (juliasActualPrice > juliasFormulaPrice) {
    console.log("Julia is paying TOO MUCH")
} else if (juliasActualPrice < juliasFormulaPrice) {
    console.log("Julia is paying TOO LITTLE")
} else {
    console.log("Julia is paying the EXACT PRICE")
}