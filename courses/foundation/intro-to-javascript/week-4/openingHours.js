// // 🏪 STORE OPENING HOURS - EXERCISE
// //====================================
    
// const opening_hours = [
//     {
//         day: "Saturday",
//         open: 10,
//         close: 16
//     },
//     {
//         day: "Sunday",
//         open: "Closed",
//         close: "Closed"
//     },
//     {
//         day: "Monday",
//         open: 9,
//         close: 19
//     },
//     {
//         day: "Tuesday",
//          open: 9,
//         close: 19
//     },
//     {   
//         day: "Wednesday",
//         open: 9,
//         close: 19
//     },
//     {
//         day: "Thursday",
//          open: 9,
//         close: 19
//     },
//     {
//         day: "Friday",
//         open: 9,
//         close: 20
//     }
// ];


// // ========================================
// // EXERCISE 1: Get Opening Hours for a Day
// // ========================================

// /*
// EXAMPLE:
// getOpeningHours("Monday") 
// // Should return: { day: "Monday", open: "09:00", close: "19:00" }

// */

// // const getOpeningHours = () => {
// //     for (let i = 0; i < opening_hours.length; i++) {
// //         const currentDay = opening_hours[i];
// //         console.log(currentDay)
// //     }
// // }

// // getOpeningHours("")

// function getOpeningHours(newDay){
//     for (let i = 0; i < opening_hours.length; i++) {
//         if (opening_hours[i].day === newDay) {
//             return opening_hours[i];
//         }
//     }
// }
// // console.log(getOpeningHours("Monday"))

// // ========================================
// // EXERCISE 2: Check If Store Is Open
// // ========================================
// /*
// EXAMPLE:
// isOpenNow("Monday", "10") // "open"
// isOpenNow("Monday", "20") // "closed"
// isOpenNow("Friday", "18") // "open"
// isOpenNow("Sunday", "11") // "closed"
// */

// // const isOpenNow = () => {
// //     if(currentDay.day = "Monday"){
// //         return "open"
// //     }
// //     if(currentDay.day = "")
// // }

// const isOpenNow = (day, time) => {
//   for (const obj of opening_hours) {
//     if (obj.day === day) {
//       return obj.open < time && obj.close > time ? "open" : "closed";
//     }
//   }
//   return "Enter valid day";
// };



// // ========================================
// // EXERCISE 3: Special Event Hours
// // ========================================
// /*
// TASK: During special events, the store opens 1 hour earlier and closes 1 hour later.
// Create a function that checks if the store is open considering special events.

// INPUT: 
//   - day (string): Day name
//   - time (string): Time in format "HH:MM"
//   - isSpecialEvent (boolean): true if there's a special event
// */

// const isOpenWithEvent = (day, time, event) => {
//   for (const obj of opening_hours) {
//     if (obj.day === day) {
//         if (!event) {
//             return obj.open < time && obj.close > time ? "open" : "closed";
//         } else {
//             return obj.open <= (time - 1) && obj.close >= (time + 1) ? "open" : "closed";
//         }   
//     }
//   }
//   return "Enter valid day";
// };

// console.log(isOpenWithEvent("Monday", 8, false)); // "closed"
// console.log(isOpenWithEvent("Monday", 8, true));  // "open"
// console.log(isOpenWithEvent("Friday", 21, true));  // "closed"


// const sundayEvent = (day, time, event){
//     for (const obj of opening_hours) {
//     if (obj.day === day) {
//         if (!event) {
//             return obj.open < time && obj.close > time ? "open" : "closed";
//         } else {
//             const open = obj.open -1;
//         const close = obj.close + 1; 
//         return open <= time && close>=time ? "open" : "close";  
//         }   
//     }
//   }
//   return "Enter valid day";
// }