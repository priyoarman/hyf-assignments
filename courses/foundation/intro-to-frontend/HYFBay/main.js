console.log("Script loaded");

const products = getAvailableProducts();
console.log(products);

// This should create the ul and the li's with the individual products details
function renderProducts(products) {
  // your code goes here
  const productList = document.querySelector("#product-list");
  
  productList.innerHTML = "";

  products.forEach((product) => {
    const listItem = document.createElement("li");
    const title = document.createElement("h2");
    title.textContent = product.name;
    const price = document.createElement("div");
    price.textContent = `Price: ${product.price} DKK`;
    const rating = document.createElement("div");
    rating.textContent = `Rating: ${product.rating}/10`;

    listItem.appendChild(title);
    listItem.appendChild(price);
    listItem.appendChild(rating);

    productList.appendChild(listItem);
  });
}

renderProducts(products); 
