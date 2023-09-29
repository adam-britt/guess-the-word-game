const guessedLettersElement = document.querySelector(".guessed-letters");   // prior letters guessed
const guessLetterButton = document.querySelector(".guess");                 // guess button
const letterInput = document.querySelector("#letter");                      // current letter guessed
const wordInProgress = document.querySelector(".word-in-progress");         // word in progress
const remainingGuessesElement = document.querySelector(".remaining");       // guesses remaining sentence
const remainingGuessesSpan = document.querySelector(".remaining span");     // guesses remaining #
const message = document.querySelector(".message");                         // letters guessed message
const playAgainButton = document.querySelector(".play-again");              // play again button

const word = "magnolia";                                                    // word to guess
const guessedLetters = [];                                                  // 


// Display circles as placeholders for chosen word letters
const placeholder = function (word) {
    // Create array of letters
    const placeholderLetters = [];
    // For each letter that exists, initially, add a ● to the array
    for(const letter of word) {
        console.log(letter);
        placeholderLetters.push(`●`);
    }
    // Join all placeholder letters to form word in progress
    wordInProgress.innerText = placeholderLetters.join("");
};
// Call function to display circle placeholders
placeholder(word);


// Make the guess button functional
guessLetterButton.addEventListener("click", function (e) {
    // Prevent default reload since we're working with a dynamic form
    e.preventDefault();

    // Create variable to capture input value
    const guess = letterInput.value;
    console.log(guess);

    message.innerHTML = "";
    const goodGuess = validateInput(guess);
    console.log(validInput);

    if(goodGuess) {
        makeGuess(guess);
    }
    letterInput.value = "";
});


const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if(input.length === 0) {
        // is the input empty?
        message.innerText = "Please enter a letter.";
    } else if(input !== acceptedLetter) {
        // did user type more than one letter?
        message.innerText = "Please enter a single letter.";
    } else if(!input.match(acceptedLetter)) {
        // did user type a number or special character?
        message.innerText = "Please enter a letter between A-Z.";
    } else {
        // user successfully submitted a single letter
        return input;
    }
};


const makeGuess = function(guess) {
    guess = guess.toUpperCase();
    if(guessedLettersElement.includes(guess)) {
        message.innerText = "You already guessed that letter, silly. Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
}