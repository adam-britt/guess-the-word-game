const guessedLetters = ".guessed-letters";      // prior letters guessed
const letterInput = "#letter";                  // current letter guessed
const guessLetterButton = ".guess";             // guess button
const wordInProgress = ".word-in-progress";     // word in progress
const numGuessesRemaining = ".remaining";       // guesses remaining sentence
const numGuessesSpan = ".remaining span";       // guesses remaining #
const lettersGuessed = ".message";              // letters guessed message
const playAgainButton = ".play-again";          // play again button
const word = "magnolia";                        // word to guess

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
// Call function
placeholder(word);

// Guess button
guessLetterButton.addEventListener("click", function (e) {
    // Prevent default reload since we're working with a dynamic form
    e.preventDefault();

    // Create variable to capture input value
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = "";
    
    
});



const isItALetter = function (userInput) {
    
}