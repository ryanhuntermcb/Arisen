//---------------------------------------------------
//--------------Progress Tracker---------------------
//---------------------------------------------------
const progressTrackerKey = `progressTracker`
const progressTrackerInitialState = 0
//let userProgressTracker
//Progress tracker will be an int
//the function that progresses the tracker will need to check and make sure that increments larger than 1++ do not happen
//I think an input of the puzzle number into the function would be a good way to keep things in line.

//game solutions should be known and tracked at the puzzle level not in the progress tracker
function progressTrackerExists() {
    if (localStorage.getItem(progressTrackerKey)) {
        return true;
    }
    else
        return false;
}

function resetProgress() {
    localStorage.setItem(progressTrackerKey, JSON.stringify(progressTrackerInitialState));
}

function getProgressTrackerState() {
    if (progressTrackerExists()) {
        return JSON.parse(localStorage.getItem(progressTrackerKey));

    }
    else {
        resetProgress();
        return JSON.parse(localStorage.getItem(progressTrackerKey));
    }
}

function incrementProgressTracker(puzzleNumber) {
    let currentProgress = parseInt(getProgressTrackerState())
    if (currentProgress == puzzleNumber - 1) {
        console.log('proceed with incrementing tracker')
    }
    else {
        console.log('Trying to solve a puzzle out of order')
    }
}
/*
Puzzle Numbers
About1 = 1
Lessons1 = 2
Regrets1 = 3
Regrets2 = 4
Lessons2 = 5
Regrets3 = 6
About2 = 7
Regrets4 = 8
Containment = 9
*/
//---------------------------------------------------
//----------------Game Log---------------------------
//---------------------------------------------------


/*
//Object.seal prevents us from adding properties that aren't in the gameLongInitialState object by accident.
let userGameLog = Object.seal(getGameLog());



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
    window.location.href = "./about2.html";

}

function isButtonWorking() {
    console.log('button test')
}

function checkAboutPuzzleEventHandler() {
    updateGameLog('about', true)
}

function checkContainmentPuzzleEventHandler() {
    updateGameLog('containment', true)
}

if (hasWon()) {
    alert("You've won all the games");
}
*/