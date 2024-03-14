//Begin to refactor using import export statements
//need to fix the About2 page since it has trouble using functions from modules

//---------------------------------------------------
//----------------Containment------------------------
//---------------------------------------------------

//Puzzle Answers
let Username = 'Daniel'
let Password = 'ForgetMe'

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

//---------------------------------------------------
//----------------Start Logic------------------------
//---------------------------------------------------
function isNew() { //checking if user is New and starting tutorial script
    let $readValue = sessionStorage['newSession'];
    if ($readValue !== 'false') {
        let $newSession = 'true'
        sessionStorage['newSession'] = $newSession
        console.log($readValue)
        return true;
    }
}

function start() {
    if (isNew()) {
        window.open('./start.html', '_self');
    }
}

//---------------------------------------------------
//--------------Progress Tracker---------------------
//---------------------------------------------------
const progressTrackerKey = `progressTracker` //progressTracker should always be an int
const progressTrackerInitialState = 0

//game solutions should be known and tracked at the puzzle level not in the progress tracker
function progressTrackerExists() {
    if (parseInt(localStorage.getItem(progressTrackerKey))) {
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
        return parseInt(JSON.parse(localStorage.getItem(progressTrackerKey)));

    }
    else {
        resetProgress();
        return parseInt(JSON.parse(localStorage.getItem(progressTrackerKey)));
    }
}

function incrementProgressTracker(puzzleNumber) {
    let currentProgress = getProgressTrackerState()
    if (currentProgress == puzzleNumber - 1) {
        console.log('proceed with incrementing tracker')
        let newProgress = 1 + currentProgress
        window.localStorage.setItem(progressTrackerKey, JSON.stringify(newProgress))
    }
    else if (currentProgress >= puzzleNumber) {
        console.log(`Puzzle #${puzzleNumber} Already Solved`)
    }
    else {
        console.log('Trying to solve a puzzle out of order')
    }
}

//This is just to keep track of which puzzle is assigned which number
const puzzles = Object.seal({
    About1: 1,
    Lessons1: 2,
    Regrets1: 3,
    Regrets2: 4,
    Lessons2: 5,
    Regrets3: 6,
    About2: 7,
    Regrets4: 8,
    Containment: 9,
})

function getOverallProgress() {
    let totalGames = Object.keys(puzzles).length;
    return (getProgressTrackerState() / totalGames);
}

function areAllPuzzlesComplete() {
    if (getOverallProgress() === 1) {
        return true
    }
    else {
        return false
    }
}

//---------------------------------------------------
//--------------Bike Lock Puzzle---------------------
//---------------------------------------------------
function CreateOneWheelLetterOption(inputArray, inputTargetContainerId, inputSelectListName) {
    let inputArrayLength
    let TargetContainer = document.getElementById(inputTargetContainerId)

    if (Array.isArray(inputArray)) {
        inputArrayLength = inputArray.length
    }
    else {
        inputArrayLength = 1
    }

    TargetContainer.innerHTML += `<select name=${inputSelectListName} id=${inputSelectListName} class="dropbtn "></select>`

    for (let i = 0; i < inputArrayLength; i++) {
        //console.log(`${i} and ${inputArrayLength}`)

        let firstElement = ''

        if (i == 0) {
            firstElement = 'Select'
        }

        let optionTemplate = `<option value=${inputArray[i]}>${inputArray[i]}</option>`

        document.getElementById(inputSelectListName).innerHTML += optionTemplate
    }
}

function CreateBikeLockPuzzle(PuzzleSolution, PuzzleDifficulty, PuzzleName, TargetContainerId) {
    PuzzleSolution = String(PuzzleSolution).toUpperCase()
    let NumberOfWheels = PuzzleSolution.length
    let PuzzleSolutionArray = PuzzleSolution.split('')
    let TargetContainer = document.getElementById(TargetContainerId)
    TargetContainer.innerHTML = '' //The puzzle should be the only thing inside of the target container

    //Ensure PuzzleDifficulty is between 1 and 10
    if (!(PuzzleDifficulty > 0)) {
        PuzzleDifficulty = 1
    }
    if (PuzzleDifficulty > 10) {
        PuzzleDifficulty = 10
    }

    //console.log(PuzzleSolutionArray) //Answer but split into Array

    for (let i = 0; i < NumberOfWheels; i++) {
        let start = PuzzleSolutionArray[i]
        let arrayTest = [start]
        let i2 = 0

        while (i2 < PuzzleDifficulty) {
            let rand = randomLetter()
            if (arrayTest.includes(rand)) {
                continue
            }
            else {
                //console.log(rand)
                arrayTest.push(rand)
                i2++
                //console.log(randomIndex(5))
            }
        }

        //Solution letter index swap
        let swapToIndex = randomIndex(arrayTest.length)

        let swapFrom = arrayTest[0]
        arrayTest[0] = arrayTest[swapToIndex]
        arrayTest[swapToIndex] = swapFrom

        CreateOneWheelLetterOption(arrayTest, TargetContainerId, `${PuzzleName}${i}`)

        //console.log(swapToIndex)
        //console.log(arrayTest)
        PuzzleSolutionArray[i] = arrayTest

        //let finish = 
    }


    //console.log(PuzzleSolutionArray)
    for (let i = 0; i < NumberOfWheels; i++) {
        //CreateOneWheelLetterOption(PuzzleSolutionArray[i],inputTargetContainerId, inputSelectListName)
    }

}

function randomLetter() {
    const uppercaseAsciiStart = 65;
    const letterIndex = Math.floor(Math.random() * 26);
    const letter = String.fromCharCode(uppercaseAsciiStart + letterIndex);
    return letter
}

function randomIndex(ArrayLength) {
    return Math.floor(Math.random() * ArrayLength)   //this should be a random spot
}

function IsPuzzleSolved(PuzzleContainerId, PuzzleSolution) {
    let PuzzleParent = document.getElementById(PuzzleContainerId).children
    //console.log(PuzzleParent)

    let currentAnswer = ''
    for (let i = 0; i < PuzzleParent.length; i++) {
        currentAnswer += PuzzleParent[i].value
    }

    if (currentAnswer == PuzzleSolution) {
        return true
    }
    else {
        return false
    }

}


export {
    containmentEntry, imprisonment, isPrisoner, start, //main //Containment

    gameProgress, backgroundOpacity, checkLessonsPuzzleEventHandler, //GameLog
    checkRegretsPuzzleEventHandler, resetGame, checkAboutPuzzleEventHandler, //GameLog
    checkContainmentPuzzleEventHandler, hasWonPuzzle, clickABoutPhoto, //GameLog
    
    resetProgress, getProgressTrackerState, incrementProgressTracker, //New Progress Tracker
    getOverallProgress, areAllPuzzlesComplete, //New Progress Tracker
    
    IsPuzzleSolved, CreateBikeLockPuzzle //Create Bike Lock Puzzles
}
