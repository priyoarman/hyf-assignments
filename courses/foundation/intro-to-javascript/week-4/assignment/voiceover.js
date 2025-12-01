let savedName = "";
let myTodos = [];

function greetingsReply(text, command) {
  if (text.includes("hello my name is")) {
    const parts = command.split(" is ");
    if (parts.length > 1) {
      savedName = parts[1];
      return "Nice to meet you " + savedName;
    } else {
      return "Please tell me your name.";
    }
  }

  if (text.includes("what is my name")) {
    if (savedName === "") {
      return "I don't know your name yet";
    }
    return "Your name is " + savedName;
  }
}

function addTodo(command) {
  const task = command.replace("Add ", "").replace(" to my todo", "");
  myTodos.push(task);
  return task + " added to your todo";
}

function removeTodo(command) {
  const task = command.replace("Remove ", "").replace(" from my todo", "");
  const index = myTodos.indexOf(task);

  if (index !== -1) {
    myTodos.splice(index, 1);
    return "Removed " + task + " from your todo";
  } else {
    return "I could not find that item";
  }
}

function todoCheck() {
  if (myTodos.length === 0) {
    return "You have no todos";
  }
  return "You have " + myTodos.length + " todos: " + myTodos.join(" and ");
}

function dayToday() {
  const today = new Date();
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const day = today.getDate();
  const monthIndex = today.getMonth();
  const year = today.getFullYear();

  return day + ". of " + monthNames[monthIndex] + " " + year;
}

function calculation(text) {
  const parts = text.split(" ");
  const number1 = Number(parts[2]);
  const number2 = Number(parts[4]);

  if (text.includes("+")) {
    return number1 + number2;
  }

  if (text.includes("-")) {
    return number1 - number2;
  }
  
  if (text.includes("*")) {
    return number1 * number2;
  }

  if (text.includes("/")) {
    return number1 / number2;
  }
  
  return "I could not calculate that right now.";
}

function setTimer(text) {
  const parts = text.split(" ");
  const minutes = Number(parts[4]);

  if (isNaN(minutes)) {
    return "Please provide a valid number of minutes.";
  }

  const timeToWait = minutes * 60 * 1000;

  setTimeout(function () {
    console.log("Timer done!");
    if (typeof alert !== "undefined") {
      alert("Timer done!");
    }
  }, timeToWait);

  return "Timer set for " + minutes + " minutes";
}

function background() {
  if (typeof document !== "undefined") {
    document.body.style.backgroundColor = "red";
    return "I have changed the background to red";
  } else {
    return "I cannot change background color outside of a browser.";
  }
}

function getReply(command) {
  const text = command.toLowerCase();

  if (text.includes("hello my name is") || text.includes("what is my name")) {
    return greetingsReply(text, command);
  }

  if (text.includes("add") && text.includes("to my todo")) {
    return addTodo(command);
  }

  if (text.includes("remove") && text.includes("from my todo")) {
    return removeTodo(command);
  }

  if (text.includes("what is on my todo")) {
    return todoCheck();
  }

  if (text.includes("what day is it today")) {
    return dayToday();
  }

  if (text.startsWith("what is") && (text.includes("+") || text.includes("-") || text.includes("*") || text.includes("/") )) {
    return calculation(text);
  }

  if (text.includes("set a timer for")) {
    return setTimer(text);
  }

  if (text.includes("make background red")) {
    return background();
  }

  return "I did not understand that";
}

console.log("1:", getReply("Hello my name is Arman")); 
console.log("2:", getReply("What is my name?")); 
console.log("3:", getReply("Add fishing to my todo")); 
console.log("4:", getReply("What is on my todo"));
console.log("5:", getReply("what is 15 / 5"));
console.log("6:", getReply("What day is it today"));
console.log("7:", getReply("set a timer for 1 minutes"));