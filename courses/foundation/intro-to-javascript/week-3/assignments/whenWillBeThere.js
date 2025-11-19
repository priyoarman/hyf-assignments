const travelInformation = {
  speed: 50,
  destinationDistance: 432,
};

function calculateTravelTime(travelInfo) {
  const {speed, destinationDistance} = travelInfo;

  const timeInHours = destinationDistance / speed;
  const hours = Math.floor(timeInHours);
  const minutesDecimal = timeInHours - hours;
  const minutes = Math.floor(minutesDecimal * 60);

  return hours + " hours and " + minutes + " minutes";
}



const travelTime = calculateTravelTime(travelInformation);
console.log(travelTime); // 8 hours and 38 minutes
