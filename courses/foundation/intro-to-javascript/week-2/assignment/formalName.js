// Copy your getFullname function here
const getFullName = (firstName, lastName, useFormalName, gender) => {
  const fullname = firstName + " " + lastName;

  if (useFormalName) {
    if (gender === 'woman') {
      return "Lady " + fullname;
    } else if (gender === 'man') {
      return "Lord " + fullname;
    } else {
      return fullname;
    }
  } else {
    return fullname;
  }
};

// You dont neew to understand this just yet :)
const firstnameInput = document.querySelector('main input.firstname');
const lastnameInput = document.querySelector('main input.lastname');
const useFormalNameInput = document.querySelector('main input[name="use-formal-name"]');
const genderInput = document.querySelector('main #gender-select'); 
const boardingcardButton = document.querySelector("main button");
const boardingcard = document.querySelector("main div.boardingcard");
const fullnameElement = document.querySelector("main div.boardingcard .fullname");

boardingcardButton.addEventListener("click", () => {
    const firstname = firstnameInput.value;
    const lastname = lastnameInput.value;
    const useFormalName = useFormalNameInput.checked;
    
    const gender = genderInput.value; 
    
    const fullname = getFullName(firstname, lastname, useFormalName, gender);
    
    fullnameElement.innerHTML = fullname;
    boardingcard.classList.remove('hidden');
});
