const guessedLettersElement = document.querySelector(".guessed-letters");   // prior letters guessed
const guessLetterButton = document.querySelector(".guess");                 // guess button
const letterInput = document.querySelector(".letter");                      // current letter guessed
const wordInProgress = document.querySelector(".word-in-progress");         // word in progress
const remainingGuessesElement = document.querySelector(".remaining");       // guesses remaining sentence
const remainingGuessesSpan = document.querySelector(".remaining span");     // guesses remaining #
const message = document.querySelector(".message");                         // letters guessed message
const playAgainButton = document.querySelector(".play-again");              // play again button

let word = "magnolia";                                                      // word to guess
let guessedLetters = [];                                                  // array of letters guessed so far
let remainingGuesses = 8;                                                   // how many guesses remain


// Async function to fetch data from a file via URL
const getWord = async function () {
    // Fetch the words from a txt file via link
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    console.log(words);

    // Split up the words in the array
    const wordArray = words.split("\n");
    console.log(wordArray);

    // Pick a random word from the array
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();

    // Call function to display circle placeholders
    placeholder(word);
}

// Begin the game
getWord();


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
        updateGuessesRemaining(guess);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
};


const showGuessedLetters = function() {
    guessedLettersElement.innerHTML = "";
    for(const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};


const updateWordInProgress = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    console.log(wordArray);

    const revealWord = [];

    for(const letter of wordArray) {
        if(guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    // console.log(revealWord);
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};


const updateGuessesRemaining = function(guess) {
    const upperWord = word.toUpperCase();
    // Bad guess - lose a chance
    if(!upperWord.includes(guess)) {
        message.innerText = `Sorry, the word has no ${guess} in it.`;
        remainingGuesses -= 1;
        console.log(remainingGuesses);
    } // Good guess - remainingGuesses does not change
    else {
        message.innerText = `Great guess! The word contains the letter ${guess}.`;
    }

    // Game Over - no more guesses
    if(remainingGuesses === 0) {
        message.innerHTML = `Game over! The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if(remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};


// Congratulate user if they won
const checkIfWin = function() {
    if(word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the word!</p>`;

        startOver();
    }
};


// Mechanics of starting over
const startOver = function() {
    // Remove guess button, remaining guesses element, guessed letters element
    guessLetterButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersElement.classList.add("hide");
    // Show play again button
    playAgainButton.classList.remove("hide");
};


// When play again is clicked
playAgainButton.addEventListener("click", function() {
    // Reset all original values - grab new word
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = "";
    message.innerText = "";

    // Grab a new word
    getWord();

    // Show the right UI elements
    guessLetterButton.classList.remove("hide");
    playAgainButton.classList.add("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
});