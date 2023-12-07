import {
    gameProgress, backgroundOpacity, checkLessonsPuzzleEventHandler,
    checkRegretsPuzzleEventHandler, resetGame, checkAboutPuzzleEventHandler,
    checkContainmentPuzzleEventHandler, hasWonPuzzle, clickABoutPhoto, containmentEntry //group these together
} from "../scripts/Library.js";

//Changes Opacity of Home/Welcome page depending on the number of games won
if (document.title.toLowerCase() === "welcome") {
    try {
        console.log('Test')
        gameProgress();
        backgroundOpacity(); 
    }
    catch (error) {
        console.log(
            `Opacity Functions: [Home]
                Error Message: ${error.message}`)
    }
}

//This adds event listeners the outer most one waits for the DOM to be loaded so the HTML objects exist before the 
//inner functions get called that create other event handlers for each page.
//Other even listeners can be added into the parent event listener
document.addEventListener("DOMContentLoaded", () => {
    if (document.title.toLowerCase() === 'lessons') {
        try {//event listeners for the Lessons page
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
                document.getElementById('regret4Key').addEventListener("click", checkRegretsPuzzleEventHandler);
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
    if (document.title.toLowerCase() === 'about') {
        try {//event listeners for the about page
            document.getElementById('checksPuzzleAbout').addEventListener("click", clickABoutPhoto);
        } catch (error) {
            console.log(
                `Event Listener: [about]
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