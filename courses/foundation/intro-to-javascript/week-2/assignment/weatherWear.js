const getClothingSuggestion = (temperature) => {
  if (temperature >= 18) {
    return "Shorts and a t-shirt";
  } else if (temperature >= 10) {
    return "Light jacket/sweater and jeans";
  } else if (temperature >= 0) {
    return "Warm coat and pants.";
  } else {
    return "Heavy winter coat, pants, and gloves";
  }
};

const clothesToWear = getClothingSuggestion(-1);
console.log(clothesToWear);