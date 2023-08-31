const guessedLetters = ".guessed-letters";      // prior letters guessed
const letterInput = "#letter";                    // current letter guessed
const guessButton = ".guess";                   // guess button
const wordInProgress = ".word-in-progress";     // word in progress
const numGuessesRemaining = ".remaining";       // guesses remaining sentence
const numGuessesSpan = ".remaining span";       // guesses remaining #
const lettersGuessed = ".message";              // letters guessed message
const playAgainButton = ".play-again";          // play again button
const word = "magnolia";                        // word to guess

// Display circles as placeholders for the chosen word's letters
const placeholder = function (word) {

    const placeholderLetters = [];

    for(const letter of word) {
        console.log(letter);
        placeholderLetters.push(`●`);
    }
    
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);





guessButton.addEventListener("click", function (e) {
    // prevent default reload since we're working with a dynamic form
    e.preventDefault();

    // create variable to capture input value
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";

});