import {
    gameProgress, backgroundOpacity, checkLessonsPuzzleEventHandler,
    checkRegretsPuzzleEventHandler, resetGame, checkAboutPuzzleEventHandler,
    checkContainmentPuzzleEventHandler, hasWonPuzzle, clickABoutPhoto, containmentEntry, //group these together

    resetProgress, getProgressTrackerState, incrementProgressTracker, //New Progress Tracker
    getOverallProgress, areAllPuzzlesComplete, //New Progress Tracker
    CreateBikeLockPuzzle, IsPuzzleSolved //Bike Lock Puzzles
} from "../scripts/Library.js";

let puzzleSolvedText = "Puzzle Solved"


//This adds event listeners the outer most one waits for the DOM to be loaded so the HTML objects exist before the 
//inner functions get called that create other event handlers for each page.
//Other even listeners can be added into the parent event listener
document.addEventListener("DOMContentLoaded", () => {
    if (document.title.toLowerCase() === "welcome") {//Home.html
        try {
            //Changes Opacity of Home/Welcome page depending on the number of games won
            backgroundOpacity();

            let htmlLessons = `<a id="lessonsLink" href="./lessons.html">Lessons</a><br>`
            let htmlRegrets = `<a id="regretsLink" href="./regrets.html">Regrets</a><br>`
            let htmlContainment = `<a id="containment" href="./containment.html">Containment</a><br>`//old id='context' I don't think we need it anymore
            let linkDiv = document.getElementById('link2')

            //Makes links available depending on game stage.
            getProgressTrackerState() > 0 ? linkDiv.innerHTML += htmlLessons : false;
            getProgressTrackerState() > 1 ? linkDiv.innerHTML += htmlRegrets : false;
            getProgressTrackerState() > 7 ? linkDiv.innerHTML += htmlContainment : false;
        }
        catch (error) {
            console.log(
                `Event Listener: [welcome]
            Error Message: ${error.message}`)
        }
    }
    if (document.title.toLowerCase() === 'about') {
        try {//event listeners for the about page
            let PuzzleContainerId = 'puzzle'
            let PuzzleSolution = 'DARK'
            let PuzzleContainer = document.getElementById(PuzzleContainerId)
            let StatusText = document.getElementById('StatusText')
            //let puzzleSolvedText = "Puzzle Solved"

            console.log(getProgressTrackerState())
            if (getProgressTrackerState() >= 7) {//Link to Picture only available after puzzle #7 Regrets3
                document.getElementById('checksPuzzleAbout').addEventListener("click", clickABoutPhoto);
            }

            if (getProgressTrackerState() < 1) {//Bike Lock Puzzle is only visible when it hasn't been solved
                CreateBikeLockPuzzle(PuzzleSolution, 4, 'TestPuzzle', PuzzleContainerId);
                PuzzleContainer.addEventListener("click", () => {
                    if (IsPuzzleSolved(PuzzleContainerId, PuzzleSolution)) {
                        incrementProgressTracker(1);//Puzzle #1
                        StatusText.innerHTML = puzzleSolvedText
                    }
                    else {
                        StatusText.innerHTML = "Incorrect Combination"
                        //console.log("Incorrect Combination")
                    }
                })
            }

            if (getProgressTrackerState() >= 1) {
                StatusText.innerHTML = puzzleSolvedText
            }


        } catch (error) {
            console.log(
                `Event Listener: [about]
            Error Message: ${error.message}`)
        }
    }

    if (document.title.toLowerCase() === 'lessons') {
        try {//event listeners and logic for the Lessons page
            let PuzzleContainerId = 'lesson2BikeLock'
            let PuzzleSolution = 'IAMFAITH'
            let PuzzleContainer = document.getElementById(PuzzleContainerId)
            let StatusText = document.getElementById('StatusText')

            //Prevents pages access before appropriate progress level.
            getProgressTrackerState() < 1 ? window.open('./Home.html', '_self') : false;

            //Hides Lessons2 until after Regrets2
            getProgressTrackerState() > 3 ? document.getElementById('2').classList.remove('hidden') : false;

            //Creates Lesson2 BikeLock Puzzle
            if (getProgressTrackerState() < 5) {
                //Bike Lock Puzzle is only visible when it hasn't been solved
                CreateBikeLockPuzzle(PuzzleSolution, 6, 'Lesson2', PuzzleContainerId);
                PuzzleContainer.addEventListener("click", () => {
                    if (IsPuzzleSolved(PuzzleContainerId, PuzzleSolution)) {
                        incrementProgressTracker(5);//Puzzle #5
                        StatusText.innerHTML = puzzleSolvedText
                    }
                    else {
                        StatusText.innerHTML = "Incorrect Combination"
                        //console.log("Incorrect Combination")
                    }
                })
            }
            if (getProgressTrackerState() >= 5){
                StatusText.innerHTML = puzzleSolvedText
            }

            document.getElementById('ARGModel').addEventListener("click", async () => {
                document.getElementById('ARGModel').classList.add("ARGModel");
                document.getElementById("1").innerHTML = ""
                //document.getElementById('1').style.color = 'red';
                for (let i = 0; i < 200; i++) {
                    document.getElementById("1").textContent += "i have regrets. ";
                    await new Promise(resolve => setTimeout(resolve, 10));
                }
            });
            document.getElementById('checkPuzzle').addEventListener("click", checkLessonsPuzzleEventHandler);
        }
        catch (error) {
            console.log(
                `Event Listener: [lessons]
        Error Message: ${error.message}`)
        }
    }
    if (document.title.toLowerCase() === 'regrets') {
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
                document.getElementById('regret4Key').addEventListener("click", () => {
                    checkRegretsPuzzleEventHandler();
                    let regret2 = document.getElementById('regret2')
                    let test = regret2.getElementsByTagName('span')
                    for (let i of test) {
                        i.classList.remove('Blackout')
                    }
                });

            }
            else {
                console.log('All Regrets should be displayed because the puzzle has already been won');
            }
        }
        catch (error) {
            console.log(
                `Event Listener: [regrets]
            Error Message: ${error.message}`)
        }
    }




    if (document.title.toLowerCase() === 'about2') {
        try {//event listeners for the about page
            document.getElementById('responseButton').addEventListener("click", checkAboutPuzzleEventHandler);
        } catch (error) {
            console.log(
                `Event Listener: [about2]
            Error Message: ${error.message}`)
        }
    }
    if (document.title.toLowerCase() === "support") {
        try {//event listeners for the support page
            document.getElementById('resetGame').addEventListener("click", () => {
                resetGame()
            });
            document.getElementById('winAboutGame').addEventListener("click", checkAboutPuzzleEventHandler);
            document.getElementById('winContainmentGame').addEventListener("click", checkContainmentPuzzleEventHandler);
        } catch (error) {
            console.log(
                `Event Listener: [support]
            Error Message: ${error.message}`)
        }
    }
    if (document.title === 'Containment') {
        document.getElementById('containmentButton').addEventListener("click", (btn) => {
            btn.preventDefault();
            containmentEntry();
        })
    }
}, false);

//The being we interact with ideally will look like a combination of Alt Cunningham from Cyberpunk 2077 mixed with Undertale pixel art style.