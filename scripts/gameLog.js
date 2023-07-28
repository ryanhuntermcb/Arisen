//I think we should use local storage if it is easier to add data to than to the Cookies in a browser.

//We need some way to keep track of which puzzles have been completed, I think an object with an item for each game that can hold true when completed would be a good start.
const gameLogKey = 'gameLog'
const gameLogInitialState = {
    lessons: false,
    regrets: false,
    about: false,
    containment: false,
    support: false,
};
//freeze prevents the answers being changed by a function. We will need to add the puzzle answers to this object as we finish them.
const gameSolutions = Object.freeze({
    lessons: "presage",
});

//Object.seal prevents us from adding properties that aren't in the gameLongInitialState object by accident.
let userGameLog = Object.seal(getGameLog());

function hasGameStarted() {
    if (localStorage.getItem(gameLogKey)) {
        return true;
    }
    else
        return false;
}

function resetGame() {
    //Creates the gameLog object in the browsers local Storage or Resets and existing gameLog object. 
    //JSON.stringify is needed because Local storage can only hold string values so the object needs to be turned into a string before it can be added.
    window.localStorage.setItem(gameLogKey, JSON.stringify(gameLogInitialState));
}

function getGameLog() {
    if (hasGameStarted()) {
        return JSON.parse(localStorage.getItem(gameLogKey));

    }
    else {
        resetGame();
        return JSON.parse(localStorage.getItem(gameLogKey));
    }

}

function updateGameLog(key, value) {
    //update JS object
    userGameLog[key] = value

    //update local storage object
    window.localStorage.setItem(gameLogKey, JSON.stringify(userGameLog))
}

function gameProgress() {
    let gamesWon = 0; 
    let totalGames = Object.keys(userGameLog).length;
    for (const key in userGameLog) {
        if (userGameLog[key])
            gamesWon += 1;
    }
    let gameProgress = gamesWon / totalGames
    return gameProgress;
}

function hasWon() {
    if (gameProgress() === 1) {
        return true
    }
    else {
        return false
    }
}

function backgroundOpacity(){
    let background = document.getElementsByClassName("homeimg")[0];
    let opacityValue = gameProgress();
    if (opacityValue) { 
        console.log(opacityValue);
        background.style.opacity = opacityValue;
    } else {
        background.style.opacity = 0;
    }
}
gameProgress();
backgroundOpacity();


//function to check if an individual puzzle has been completed
function hasWonPuzzle(puzzleName) {
    console.log(userGameLog[puzzleName]);
    return userGameLog[puzzleName];
}


//function to check if a game meets the correct conditions to be won
function checkPuzzleAnswer(puzzleName, userAnswer) {
    console.log(gameSolutions[puzzleName] + " guess: " + userAnswer);

    userAnswer = userAnswer.toLowerCase();

    if (!hasWonPuzzle(puzzleName)) {
        if( userAnswer == gameSolutions[puzzleName]){
            updateGameLog('lessons', true);
            console.log("CorrectAnswer puzzle completed");
            return true;
        }
        else {
            console.log("Incorrect Answer")
            return false;
        }
    } else {
        console.log("game already won");
        return true;
    }

}

// checkPuzzleAnswer('lessons', 'testing');
//hasWonPuzzle('lessons')
//checkPuzzleAnswer('lessons', 'presa');
//checkPuzzleAnswer('lessons', 'presage');
//console.log(userGameLog);

//Testing Functions
/*
gameProgress();

updateGameLog('lessons', '456');
updateGameLog('lessons23', '456');//wrong key name does not accidentally create a new item in the object
updateGameLog('about', '789');
updateGameLog('containment', '789');
updateGameLog('regrets', '789');
updateGameLog('support', '789');

console.log("Has Game Started? " + hasGameStarted());

console.log(getGameLog());

console.log(`Game Completion: ${gameProgress() * 100}%`);

console.log(hasWon());
*/

window.localStorage.removeItem(gameLogKey);