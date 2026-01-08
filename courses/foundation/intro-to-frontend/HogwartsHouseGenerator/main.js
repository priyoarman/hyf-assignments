const houses = [
  'Gryffindor',
  'Hufflepuff',
  'Ravenclaw',
  'Slytherin'
];

const nameInput = document.getElementById('nameInput');
const assignBtn = document.getElementById('assignBtn');
const retryBtn = document.getElementById('retryBtn');
const result = document.getElementById('result');
const error = document.getElementById('error');

let lastHouse = null;

function randomHouse(exclude) {
  let house;
  do {
    house = houses[Math.floor(Math.random() * houses.length)];
  } while (house === exclude && houses.length > 1);
  return house;
}

function assignHouse() {
  const name = nameInput.value.trim();

  if (!name) {
    error.textContent = 'Please enter your name.';
    return;
  }

  error.textContent = '';
  const house = randomHouse();
  lastHouse = house;

  result.textContent = `${name} belongs in ${house}!`;
  retryBtn.disabled = false;
}

function tryAgain() {
  const name = nameInput.value.trim();
  const house = randomHouse(lastHouse);
  lastHouse = house;

  result.textContent = `${name} belongs in ${house}!`;
}

assignBtn.addEventListener('click', assignHouse);
retryBtn.addEventListener('click', tryAgain);
