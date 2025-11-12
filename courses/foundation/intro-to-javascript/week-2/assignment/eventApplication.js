const getEventWeekday = (daysInFuture) => {
  const weekdays = [
    "Sunday", 
    "Monday", 
    "Tuesday", 
    "Wednesday", 
    "Thursday", 
    "Friday", 
    "Saturday"
  ];

  const today = new Date();
  const todayIndex = today.getDay();

  const futureIndex = (todayIndex + daysInFuture) % 7;

  return weekdays[futureIndex];
};

console.log("In 2 days, it will be: " + getEventWeekday(2));