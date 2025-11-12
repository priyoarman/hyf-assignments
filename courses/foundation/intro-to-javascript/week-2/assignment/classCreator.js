// copy your homework solution here to make the webpage work!
const class07Students = [];

const addStudentToClass = (studentName) => {
  if (studentName === "") {
    console.log("Cannot add an empty string as a student.");
    return;
  }

  if (class07Students.includes(studentName)) {
    console.log("Student " + studentName + " is already in the class");
    return;
  }

  if (studentName === "Queen") {
    class07Students.push(studentName);
    return;
  }

  if (class07Students.length >= 6) {
    console.log("Cannot add more students to class 07");
    return;
  }

  class07Students.push(studentName);
}

const getNumberOfStudents = () => {
  return class07Students.length;
}



// You dont need to understand any of this! At least not yet :)
const studentInput = document.querySelector("input");
const ul = document.querySelector("ul");
const span = document.querySelector("span");
document.querySelector("button").addEventListener("click", () => {
    const studentName = studentInput.value;
    addStudentToClass(studentName);
    ul.innerHTML = "";
    class07Students.forEach(class07Student => {
        const li = document.createElement("li");
        li.innerHTML = class07Student;
        if (class07Student.toLowerCase() === "queen") {
            li.classList.add("queen");
            li.innerHTML = `${class07Student} 👑`;
        }
        ul.appendChild(li);
    });

    span.innerHTML = `Number of students: ${getNumberOfStudents()}`;
});
