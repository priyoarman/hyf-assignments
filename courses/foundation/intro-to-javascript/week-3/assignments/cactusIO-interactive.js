const activities = []
const usageLimitInMinutes = 100;

function getDate(){
    const today = new Date();
    return today.toLocaleDateString("en-GB");
}

function addActivity(activity, duration) {

    const dateToday = getDate();

    if(typeof activity !== "string" || !activity || typeof duration !== "number" || duration <= 0){
        console.log("Error: Provide valid date, activity, and duration!")
        return;
    }

    activities.push({
        date: dateToday,
        activity: activity,
        duration: duration,
    });
    console.log(activities)
}

addActivity("Youtube", 60);
addActivity("Reddit", 18);

/*
activities should now look like this
[{
    date: '23/7-18',
    activity: 'Youtube',
    duration: 30,
}]
*/

function showStatus(){

    const dateToday = getDate();

    if(activities.length === 0){
        console.log("Add some activities, please!");
        return;
    }

    let totalDuration = 0;
    for (let i = 0; i < activities.length; i++){
        totalDuration += activities[i].duration;
    }

    console.log(dateToday + ": You added " + activities.length + " activities. They amount to " + totalDuration + " min. of usage.");

    if (totalDuration >= usageLimitInMinutes){
        console.log("Limit reached. No more smartphone usage.")
    }
}

showStatus();

function getMostTimeSpent() {

  if (activities.length === 0) return;

  const durationMap = {};
  
  for (let i = 0; i < activities.length; i++) {
    const act = activities[i];
    if (durationMap[act.activity]) {
      durationMap[act.activity] += act.duration;
    } else {
      durationMap[act.activity] = act.duration;
    }
  }

  let maxDuration = 0;
  let maxActivityName = '';

  for (const activity in durationMap) {
    if (durationMap[activity] > maxDuration) {
      maxDuration = durationMap[activity];
      maxActivityName = activity;
    }
  }

  console.log("Most time spent: " + maxActivityName + ", " + maxDuration + " minutes.");
}

getMostTimeSpent();