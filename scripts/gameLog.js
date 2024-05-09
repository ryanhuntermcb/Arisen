import {
    //gameProgress, 
    backgroundOpacity, 
    //checkLessonsPuzzleEventHandler,
    //checkRegretsPuzzleEventHandler, resetGame, 
    //checkAboutPuzzleEventHandler,
    //checkContainmentPuzzleEventHandler, 
    //hasWonPuzzle, 
    clickABoutPhoto, containmentEntry, //group these together

    resetProgress, getProgressTrackerState, incrementProgressTracker, //New Progress Tracker
    //getOverallProgress, areAllPuzzlesComplete, //New Progress Tracker
    CreateBikeLockPuzzle, IsPuzzleSolved, //Bike Lock Puzzles
    imprisonment
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
            
            let htmlAbout = `<a href="./about.html">About</a><br>`
            let htmlLessons = `<a id="lessonsLink" href="./lessons.html">Lessons</a><br>`
            let htmlRegrets = `<a id="regretsLink" href="./regrets.html">Regrets</a><br>`
            let htmlContainment = `<a id="containment" href="./containment.html">Containment</a><br>`//old id='context' I don't think we need it anymore
            let linkDiv = document.getElementById('link2')
            let firstLinkDiv = document.getElementById('link1')

            //Makes links available depending on game stage.
            if (getProgressTrackerState() < 9) {
                firstLinkDiv.innerHTML += htmlAbout
                getProgressTrackerState() > 0 ? linkDiv.innerHTML += htmlLessons : false;
                getProgressTrackerState() > 1 ? linkDiv.innerHTML += htmlRegrets : false;
                getProgressTrackerState() > 7 ? linkDiv.innerHTML += htmlContainment : false;
            }
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
            if (getProgressTrackerState() >= 6) {//Link to Picture only available after puzzle #7 Regrets3
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
            if (getProgressTrackerState() >= 5) {
                StatusText.innerHTML = puzzleSolvedText
            }

            if (getProgressTrackerState() < 2) {
                document.getElementById('ARGModel').addEventListener("click", async () => {
                    incrementProgressTracker(2); //Puzzle #2 Lessons1
                    document.getElementById('ARGModel').classList.add("ARGModel");
                    document.getElementById("1").innerHTML = ""
                    //document.getElementById('1').style.color = 'red';
                    for (let i = 0; i < 200; i++) {
                        document.getElementById("1").textContent += "i have regrets. ";
                        await new Promise(resolve => setTimeout(resolve, 10));
                    }
                })
            };
        }
        catch (error) {
            console.log(
                `Event Listener: [lessons]
        Error Message: ${error.message}`)
        }
    }
    if (document.title.toLowerCase() === 'regrets') {
        try {//event listeners for the Regrets page
            let regret1Key = document.getElementById('regret1Key')
            let regret2 = document.getElementById('regret2')
            let regret2Key = document.getElementById('regret2Key')
            let regret3 = document.getElementById('regret3')
            let regret3Key = document.getElementById('regret3Key')
            let regret4 = document.getElementById('regret4')
            let regret4Key = document.getElementById('regret4Key')

            //Prevents pages access before appropriate progress level.
            getProgressTrackerState() < 2 ? window.open('./Home.html', '_self') : false;

            if (getProgressTrackerState() == 2) {
                regret1Key.addEventListener("click", () => {
                    incrementProgressTracker(3)//Puzzle #3 Regrets1
                    //regret2.classList.remove('hidden');
                    window.location.reload();
                });
            }

            getProgressTrackerState() > 2 ? regret2.classList.remove('hidden') : false;

            if (getProgressTrackerState() == 3) {
                regret2Key.addEventListener("click", () => {
                    incrementProgressTracker(4);//Puzzle #4
                    window.location.reload();
                    window.scrollTo(0, document.body.scrollHeight);//Should help make sure this isn't missed
                });
            }

            (getProgressTrackerState() < 5 && getProgressTrackerState() > 3) ? document.getElementById('regret3Hint').classList.remove('hidden') : false;

            getProgressTrackerState() > 4 ? regret3.classList.remove('hidden') : false;

            if (getProgressTrackerState() == 5) {
                //Add event listener for Regrets three here.
                regret3Key.addEventListener("click", () => {
                    incrementProgressTracker(6);//Puzzle #6
                })
            }

            getProgressTrackerState() > 6 ? regret4.classList.remove('hidden') : false;

            if (getProgressTrackerState() == 7) {
                regret4Key.addEventListener("click", () => {
                    incrementProgressTracker(8);//Puzzle #8
                })
            }

            if (getProgressTrackerState() > 7) {
                let spanTags = document.getElementsByTagName("span")
                for (let i of spanTags) {
                    console.log(i)
                    i.classList.remove("Blackout")
                }
            }
            /*
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
                        */
        }
        catch (error) {
            console.log(
                `Event Listener: [regrets]
            Error Message: ${error.message}`)
        }
    }



    /*
    if (document.title.toLowerCase() === 'about2') {
        try {//event listeners for the about page
            document.getElementById('responseButton').addEventListener("click", checkAboutPuzzleEventHandler);
        } catch (error) {
            console.log(
                `Event Listener: [about2]
            Error Message: ${error.message}`)
        }
    }
    */
    if (document.title.toLowerCase() === "support") {
        try {//event listeners for the support page
            document.getElementById('resetGame').addEventListener("click", () => {
                resetProgress();
                window.reload(self);
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
            if (containmentEntry()) {
                incrementProgressTracker(9);//Puzzle #9
                imprisonment();
            };

            //adjust the home page to just show support after the conatinament game has been won.
        })
    }
}, false);

//The being we interact with ideally will look like a combination of Alt Cunningham from Cyberpunk 2077 mixed with Undertale pixel art style.