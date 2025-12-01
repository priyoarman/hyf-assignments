const letters = "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz";

// function encrypted(text) {
//   const array = text.split("");
//   let agentName = "";
  
//   for (const item of array) {
//     const index = letters.indexOf(item);
//     const word = letters[index + 1];
//     agentName += word;
//   }
//   return agentName;
// }

// console.log(encrypted("famita")); // gbnjub
// console.log(encrypted("annamani")); // boobnboj

function reversed(text){
    const array = text.split("");
    let agentName = "";

    for(const item of array){
        const index = letters.lastIndexOf(item);
        const reversedWord = letters[index -1];
        agentName += reversedWord;
    }
    return agentName;
}

console.log(reversed("gbnjub"));
// const secretAgent = "Ifmmp ufan33, zpvs asf po njttjpo up mfaso kawatdsjqu";  
  
// decode(secretAgent)
 
// function decode(message){
//     let docodedMessage = "";

//     for(let i =0; i < message.length; i++){
//         const letter = message[i]; // b
      

//         const code = letter.charCodeAt(0) // 98

//         const convertCode = code -1; // 97

//         const convertedLetter = String.fromCharCode(convertCode);

//         docodedMessage += convertedLetter; 

//     }

//     return docodedMessage;

// }
 
// console.log(decode(secretAgent)) 