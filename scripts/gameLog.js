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
    regrets: "regret4key",
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
    //Creates the gameLog object in the browsers local Storage or Resets an existing gameLog object. 
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

function backgroundOpacity() {
    try {
        let background = document.getElementsByClassName("homeimg")[0];
        let opacityValue = gameProgress();
        opacityValue = Math.pow(opacityValue, 3)
        if (opacityValue) {
            console.log(opacityValue);
            background.style.opacity = opacityValue;
        } else {
            background.style.opacity = 0;
        }
    }
    catch {
        console.log("Opacity error")
    }
}
gameProgress();
backgroundOpacity();


//function to check if an individual puzzle has been completed
function hasWonPuzzle(puzzleName) {
    //console.log(userGameLog[puzzleName]);
    return userGameLog[puzzleName];
}


//function to check if a game meets the correct conditions to be won
function checkPuzzleAnswer(puzzleName, userAnswer) {
    console.log(gameSolutions[puzzleName] + " guess: " + userAnswer);

    userAnswer = userAnswer.toLowerCase();

    if (!hasWonPuzzle(puzzleName)) {
        if (userAnswer == gameSolutions[puzzleName]) {
            updateGameLog(puzzleName, true);
            console.log(`Correct Answer ${puzzleName} puzzle completed`);
            return true;
        }
        else {
            console.log("Incorrect Answer")
            return false;
        }
    } else {
        console.log(`${puzzleName} has already been won`);
        return true;
    }

}

function checkLessonsPuzzleEventHandler() {
    //alert("event handler worked");
    checkPuzzleAnswer('lessons', document.forms['lessonsEntry']['password'].value);
}

function checkRegretsPuzzleEventHandler() {
    checkPuzzleAnswer('regrets', 'regret4Key')
    alert("you finished the regrets Puzzle")
}

function clickABoutPhoto() {
    window.location.href="./about2.html";

}

function isButtonWorking() {
    console.log('button test')
}

//This adds event listeners the outer most one waits for the DOM to be loaded so the HTML objects exist before the 
//inner functions get called that create other event handlers for each page.
//Other even listeners can be added into the parent event listener
//at some point we will need to break this Javascript up into smaller files so stuff that is unique to a page doesn't have to be error handled
document.addEventListener("DOMContentLoaded", () => {
    try {//event listeners for the Lessons page
        document.getElementById('checkPuzzle').addEventListener("click", checkLessonsPuzzleEventHandler);
    }
    catch {
        console.log("this is not the lessons page")
    }
    try {//event listeners for the Regrets page

        if (!hasWonPuzzle('regrets')) {//if the puzzle has been won then the event listeners are not created
            //Initial Puzzle State: Hiding Regret Letters
            document.getElementById('regret2').style.display = "none"
            document.getElementById('regret3').style.display = "none";
            document.getElementById('regret4').style.display = "none"; //Adjusting Opacity is also another option.

            //Puzzle Keys
            document.getElementById('regret1Key').addEventListener("click", () => { document.getElementById('regret2').style.display = "block"; });
            document.getElementById('regret2Key').addEventListener("click", () => { document.getElementById('regret3').style.display = "block"; });
            document.getElementById('regret3Key').addEventListener("click", () => { document.getElementById('regret4').style.display = "block"; });
            document.getElementById('regret4Key').addEventListener("click", checkRegretsPuzzleEventHandler);
        }
        else {
            console.log('All Regrets should be displayed because the puzzle has already been won');
        }
    }
    catch {
        console.log("this is not the regrets page")
    }
    try {//event listeners for the about page
        document.getElementById('checksPuzzleAbout').addEventListener("click", clickABoutPhoto);
    }catch {
        console.log("this is not the abouts page")
    }
    if (document.title.toLowerCase() === "support"){
        try {//event listeners for the support page
            document.getElementById('resetGame').addEventListener("click", resetGame);
        }catch {
            console.log("Something went wrong with the Support page Event Listeners")
        }    
    }
}, false);

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


//window.localStorage.removeItem(gameLogKey);

//test