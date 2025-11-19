const firstWords = [
  "Easy",
  "Awesome",
  "Corporate",
  "Ez",
  "Bright",
  "Green",
  "Cloud",
  "Rapid",
  "Hyper",
  "Pixel",
];
const secondWords = [
  "Corp",
  "Solutions",
  "Labs",
  "Namey",
  "Studio",
  "Systems",
  "Networks",
  "House",
  "Forge",
  "Works",
];

const randomIndex1 = Math.floor(Math.random() * 10);
const randomIndex2 = Math.floor(Math.random() * 10);

const startupName = firstWords[randomIndex1] + " " + secondWords[randomIndex2];

console.log(startupName);

const characterCount = startupName.length;

console.log(
  "The startup " + startupName + " contains " + characterCount + " charcters."
);
