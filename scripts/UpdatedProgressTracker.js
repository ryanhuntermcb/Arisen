/* This has already been added to the library.
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

//Testing
console.log(progressTrackerExists())
getProgressTrackerState()
console.log(progressTrackerExists())
incrementProgressTracker(1)

console.log(getOverallProgress());

//resetProgress()

//Will need to update the background opacity function to work with the new progress tracker

*/