// Credit card number formatter
// This is a very real world example of a problem I got at my previous work. I was tasked to implement one of the smart credit card input fields, where the credit card numbers are separated with a space. e.g. inputting 123456789 would show 1234 5678 9.


// Credit card formatter
// Create a function that takes a number as parameter. The function should return the following object:


// Copy
// const formattedCreditCardObject = formatCreditCardNumber(123456789);
// console.log(formattedCreditCardObject);
// /*
// {
//   original: 123456789,
//   formatted: "1234 5678 9",
// }
// */
// Thins to consider:

// What should happen if the function is called with an argument that is not a number?

const formatCreditCardNumber = (number) => {
  if (typeof number !== "number") {
    return {
      original: number,
      formatted: "Invalid input, please provide a number",
    };
  }

  const numberStr = number.toString();
  let formattedStr = "";

  for (let i = 0; i < numberStr.length; i++) {
    formattedStr += numberStr[i];
    if ((i + 1) % 4 === 0 && i !== numberStr.length - 1) {
      formattedStr += " ";
    }
  }

  return {
    original: number,
    formatted: formattedStr,
  };
};

const formattedCreditCardObject = formatCreditCardNumber(1234567891234567);
console.log(formattedCreditCardObject);