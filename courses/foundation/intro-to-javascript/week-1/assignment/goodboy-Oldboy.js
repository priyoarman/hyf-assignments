const dogYearOfBirth = 2017;
const dogYearFuture = 2027;

const dogYear = dogYearFuture - dogYearOfBirth;

const shouldShowResultInDogYears = true;

if (shouldShowResultInDogYears) {
    console.log("Your dog will be " + dogYear * 7 + " dog years old in 2027")
} else {
    console.log("Your dog will be " + dogYear + " years old in 2027" )
}
