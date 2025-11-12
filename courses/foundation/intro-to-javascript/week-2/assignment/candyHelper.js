let boughtCandyPrices = [];

const addCandy = (candyType, weight) => {
  let pricePerGram = 0;

  if (candyType === 'sweet') {
    pricePerGram = 0.5;
  } else if (candyType === 'chocolate') {
    pricePerGram = 0.7;
  } else if (candyType === 'toffee') {
    pricePerGram = 1.1;
  } else if (candyType === 'chewing-gum') {
    pricePerGram = 0.03;
  }

  let price = weight * pricePerGram;
  boughtCandyPrices.push(price);
}

let amountToSpend = Math.floor(Math.random() * 100);

const canBuyMoreCandy = () => {
  let totalPrice = 0;

  for (let i = 0; i < boughtCandyPrices.length; i++) {
    totalPrice += boughtCandyPrices[i];
  }

  return totalPrice < amountToSpend;
}

addCandy("sweet", 20);
addCandy("chocolate", 30);
addCandy("toffee", 10);

console.log("Your budget is:", amountToSpend.toFixed(2));
console.log("Current prices in cart:", boughtCandyPrices);

if (canBuyMoreCandy()) {
  console.log("You can buy more, so please do!");
} else {
  console.log("Enough candy for you!");
}