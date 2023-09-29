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

    // Empty message paragraph
    message.innerText = "";

    // Create variable to capture input value
    const guess = letterInput.value;

    // Make sure it's a single letter
    const goodGuess = validateInput(guess);

    if(goodGuess) {
        // It's a letter - make the guess
        makeGuess(guess);
    }
    letterInput.value = "";
});


// Validate user input to make sure it's not empty, more than one letter or a special character
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    // Is the input empty?
    if(input.length === 0) {
        message.innerText = "Please enter a letter.";
    }
    // Did user type more than one letter?
    else if(input.length > 1) {
        message.innerText = "Please enter a single letter.";
    }
    // Did user type a number or special character?
    else if(!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter between A-Z.";
    }
    // User successfully submitted a single letter
    else {  
        return input;
    }
};


const makeGuess = function(guess) {
    guess = guess.toUpperCase();
    if(guessedLetters.includes(guess)) {
        message.innerText = "You already guessed that letter, silly. Try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};