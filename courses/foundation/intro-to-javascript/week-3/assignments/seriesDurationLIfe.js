const seriesDurations = [
  {
    title: "Game of thrones",
    days: 3,
    hours: 1,
    minutes: 0,
  },
  {
    title: "Sopranos",
    days: 3,
    hours: 14,
    minutes: 0,
  },
  {
    title: "The Wire",
    days: 2,
    hours: 12,
    minutes: 0,
  },
  {
    title: "Friends",
    days: 3,
    hours: 18,
    minutes: 0,
  },
];

function watchtimeInMinutes(s) {
  return s.days * 24 * 60 + s.hours * 60 + s.minutes;
}

function logOutSeriesText() {
  // write code here
  const lifeInMinutes = 80 * 365 * 24 * 60;
  let totalMinutes = 0;

  for (let i = 0; i < seriesDurations.length; i++) {
    const series = seriesDurations[i];
    const minutes = watchtimeInMinutes(series);
    totalMinutes += minutes;
    const percent = (minutes / lifeInMinutes) * 100;
    console.log(s.title + " took " + percent.toFixed(3) + "% of my life");
  }

  let totalPercent = (totalMinutes / lifeInMinutes) * 100;
  console.log("In total that is "  + totalPercent.toFixed(3) + " % of my life")
}

logOutSeriesText(); // logs out the text found above
