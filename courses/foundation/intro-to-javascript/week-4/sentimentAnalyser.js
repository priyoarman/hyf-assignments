// Build a sentiment analyser
// A sentiment analyser is some functionality that figures out how positive/negative a sentence is.

// For example, the sentence `I am mega super awesome happy" Should have a high score The sentence "I hate doing boring stuff" should have a low score.

// Create a function that takes a string as a parameter. calling the function will return an object with score, positiveWords and negativeWords. You decide how the score should be implemented and what words are negative and positive.

// Here is an example of using the function:

// Copy
// const sentimentScoreObject = getSentimentScore("I am mega super awesome happy");

// console.log(sentimentScoreObject);
// /*
// {
//   score: 3,
//   positiveWords: ['happy', 'awesome', 'super'],
//   negativeWords: [],
// }
// */

const positiveWordsList = ["happy", "awesome", "super"];

const negativeWordsList = ["hate", "boring", "bad"];

const getSentimentScore = (input) => {
  const words = input.toLowerCase().split(" ");
  let score = 0;
  const positiveWords = [];
  const negativeWords = [];

  for (const word of words) {
    
    if (positiveWordsList.includes(word)) {
      score += 1;
      positiveWords.push(word);
    } else if (negativeWordsList.includes(word)) {
      score -= 1;
      negativeWords.push(word);
    }
  }

  return {
    score,
    positiveWords,
    negativeWords,
  };
};

const sentimentScoreObject = getSentimentScore("I am mega super awesome happy but I hate doing boring stuff");

console.log(sentimentScoreObject);
/*
{
  score: 3,
  positiveWords: ['happy', 'awesome', 'super'],
  negativeWords: [],
}
*/