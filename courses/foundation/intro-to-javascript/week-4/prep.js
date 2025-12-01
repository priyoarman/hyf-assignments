// // const arr = ["Hello", "World", "and", "JavScript"];

// // const firstItem = arr[0][0];

// // // console.log(firstItem);

// // const anotherArr = [1, 2, 3, 4];

// // const anotherFirstItem = anotherArr[0];

// // const typeOfSelection = typeof anotherFirstItem;

// // console.log(anotherFirstItem);

// // console.log(typeOfSelection)

// // const objArr = [
// //   [{first: "Hello", second: "World"},
// //   {first: "Goodbye", second: "Mars"},],
// //   {first: "Thank You", second: "Venus"},
// //   function moonGreetings() {
// //     if (2 < 3) {
// //         return "Hello World"
// //     } else {
// //         "It's another World"
// //     }
// //   }
// // ];

// // const firstObjArr = objArr[0][0].first;
// // const secondObjArr = objArr[1];
// // const thirdObjArr = objArr[2];

// // console.log(thirdObjArr);

// // let todoItem = "Buy Groceries";
// // console.log(todoItem);

// // function checkItem() {
// //   todoItem = todoItem + " - done";
// // }

// // checkItem();
// // console.log(todoItem);

// // function multiply(a, b) {
// //   // the value of a will be substituted with the value of 10!
// //   // the value of b will be substituted with the value of 4!
// //   console.log(a, b); // logs out 10 4
// //   return a * b;
// // }

// // const returnedValue = multiply(10 , 4);

// // console.log(returnedValue)

// // console.log(__dirname)

// // const  arr = ["Copenhagen", "Odense", "Aarhus"]

// // for (let key in arr) {
// //     console.log(key, arr[key])

// // }

// // const book = {
// //     title: "title",
// //     author: "author",
// //     pages: 200,
// //     read: true,
// // }

// // console.log(book.pages)
// // console.log(book.read)

// // const cities = ["Copenhagen", "Helsinki", "Oslo"];

// // console.log(cities[0]);
// // console.log(cities.length);

// // cities.push("Dhaka");
// // cities.push("Istanbul");
// // console.log(cities.length);
// // console.log(cities);

// // cities.pop();
// // console.log(cities);

// // cities.unshift("Seoul");
// // console.log(cities);

// // cities.shift();
// // console.log(cities)

// // const countries = ["Denmark", "Finland", "Norway", "Sweden", "Germany", "Switzeland", "Bangladesh", "Spain"]
// // console.log(countries)

// // const part = countries.slice(1, 4)
// // const anotherPart = countries.slice(2)
// // const splicePart = countries.splice(1,4)

// // console.log(part, anotherPart, splicePart)

// // for (let index=0; index < countries.length; index++){
// //     console.log(index, countries[index])
// // }

// // for (const country of countries){
// //     console.log(country)
// // }

// // countries.forEach((country, idx) => console.log(idx, country))

// // const cities = ["Copenhagen", "Helsinki", "Oslo", "Dhaka", "Moscow"];

// // const caps = cities.map(f => f.toUpperCase());

// // console.log(caps)

// // const long = cities.filter(f => f.length > 5)

// // console.log(long)

// ///////////////////

// // const found = cities.find(f => f.toLowerCase().startsWith("h"))

// // console.log(found.toUpperCase())

// // console.log(cities.includes("Helsinki"))

// // const nums = [1, 2, 3, 4, 5];

// // for (let index = 0; index < nums.length; index++) {
// //   nums[index] = nums[index] * 2;
// // }

// // console.log(nums);

// // const nums = [1, 2, 3, 4, 5]

// // const doubled = nums.map(n => n * 2)

// // console.log(doubled)

// // const result4 = num => num * 2;

// const numbers = [1, 2, 4, 8, 16]

// function doubled(){
//     for (let index = 0; index < numbers.length; index++) {
//         const element = numbers[index] * 2;
//         console.log(element);
//     }
// }

// doubled();

// const str = "123";

// console.log(str)

// const age = 110;

// const generation =
//   age > 40 && age <= 100 ? "Old" : age > 100 ? "Dead" : "Young";

// console.log(generation);

// for (let i = 0; i < 5; i++) {
//   console.log("hop", i);
// }

// let n = 0;

// while(n < 3){
//     console.log("tick", n);
//     n++;
// }

// for (const toy of ["ball","doll","car"]) {
//   console.log(toy);
// }

const obj = {a:1, b:2};
for (const k in obj) {
  console.log(k, obj[k]);
}
