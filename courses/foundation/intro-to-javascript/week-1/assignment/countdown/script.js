const display = document.getElementById("display");

const hoursInput = document.getElementById("hours");
const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");

const startButton = document.getElementById("startButton");
const stopButton = document.getElementById("stopButton");
const resetButton = document.getElementById("resetButton");

let timerId = null;
let totalSeconds = 0;

function startTimer() {
  if (timerId) {
    return;
  }

  const hours = parseInt(hoursInput.value) || 0;
  const minutes = parseInt(minutesInput.value) || 0;
  const seconds = parseInt(secondsInput.value) || 0;

  hoursInput.value = "";
  minutesInput.value = "";
  secondsInput.value = "";

  totalSeconds = hours * 3600 + minutes * 60 + seconds;

  if (totalSeconds <= 0) {
    return;
  }

  updateDisplay();

  timerId = setInterval(tick, 1000);
}

function tick() {
  totalSeconds--;

  updateDisplay();

  if (totalSeconds <= 0) {
    stopTimer();
    display.textContent = "TIME OVER";
  }
}

function stopTimer() {
  clearInterval(timerId);
  timerId = null;
}

function resetTimer() {
  stopTimer();

  totalSeconds = 0;

  hoursInput.value = "";
  minutesInput.value = "";
  secondsInput.value = "";

  display.textContent = "00:00:00";
}

function updateDisplay() {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  display.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
resetButton.addEventListener("click", resetTimer);
