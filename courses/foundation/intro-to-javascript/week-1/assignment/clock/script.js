// const timeNow = document.getElementById('time');
// const dateNow = document.getElementById('date');

// const clock = () => {
// const now = new Date(Date.now());
// const hh = now.getHours();
// const mm = now.getMinutes();
// const ss = now.getSeconds();
// timeNow.textContent = hh + ":" + mm + ":" + ss;
// dateNow.textContent = now.toDateString();
// }

// setInterval(clock, 1000);

// clock();

const timeNow = document.getElementById('time');
const dateNow = document.getElementById('date');

function showTime() {

    let dateTime= new Date();

    let time = dateTime.toLocaleTimeString();
    let date = dateTime.toDateString();

    timeNow.textContent = time;
    dateNow.textContent = date;
}

setInterval(showTime, 1000);