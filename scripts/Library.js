//Begin to refactor using import export statements
//need to fix the About2 page since it has trouble using functions from modules

//---------------------------------------------------
//----------------Containment------------------------
//---------------------------------------------------

//Puzzle Answers
let Username = 'test'
let Password = 'test'

//Containment Form Function
function containmentEntry() {
    let UserInput = Array.from(document.querySelectorAll('#EntryForm input')).reduce((acc, input) => ({ ...acc, [input.id]: input.value }), {});
    console.log(UserInput);
    if (Username == UserInput.Username && Password == UserInput.Password) {
        console.log('Access Granted');
        let $prisonerFlag = 'true'
        sessionStorage['prisonerFlag'] = $prisonerFlag

        document.getElementById('MessageWrapper').innerHTML = `<p>Access Granted: are you a prisoner? ${isPrisoner()}</p>`;
        window.open('./prisoner.html', '_self')
    }
    else {
        console.log('Access Denied');
        document.getElementById('MessageWrapper').innerHTML = `<p>Access Denied: Try Again</p>`;
    }
    console.log(isPrisoner());
    imprisonment();
}

function isPrisoner() {
    let $readValue = sessionStorage['prisonerFlag'];
    if ($readValue == 'true') {
        return true
    }
    else {
        return false
    }
}

//Locks Users out if they complete the puzzle
function imprisonment() {
    if (isPrisoner()) {
        window.open('./prisoner.html', '_self');
    }
}

//Created for testing but are not currently used
function cookieCreate(cookieName, value, hours) {
    const date = new Date();
    date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
    let expires = "expires=" + date.toUTCString();
    document.cookie = cookieName + "=" + value + ";" + expires + ";path=/";
}

function cookieGet(cookieName) {
    let cookie = cookieName + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cookieName) === 0) {
            return c.substring(cookieName.length + 1, c.length); // Add +1 to skip the "=" character
        }
    }
    return "";
}

//---------------------------------------------------
//----------------Game Log---------------------------
//---------------------------------------------------
const gameLogKey = 'gameLog'
const gameLogInitialState = {
    lessons: false,
    regrets: false,
    about: false,
    containment: false,
    //support: false,
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
    //I believe since userGameLog is a reference type that reseting it as equal to the initial state
    localStorage.setItem(gameLogKey, JSON.stringify(gameLogInitialState));
    userGameLog = getGameLog();
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

export {
    containmentEntry, imprisonment, isPrisoner, //Containment

    gameProgress, backgroundOpacity, checkLessonsPuzzleEventHandler, //GameLog
    checkRegretsPuzzleEventHandler, resetGame, checkAboutPuzzleEventHandler, //GameLog
    checkContainmentPuzzleEventHandler, hasWonPuzzle, clickABoutPhoto //GameLog        
}
