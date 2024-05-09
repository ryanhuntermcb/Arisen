import { /*checkAboutPuzzleEventHandler,*/ incrementProgressTracker } from "../scripts/Library.js";

const speech = {
    intro: "What are you looking at?&#8194;...<br><br>\
            Do you find me attractive?&#8194;...<br><br>\
            Hahahaha. Where are my manners? Why don't we start from the beginning?\
            What is your name?<br>",
    response1: `, that is a funny name. Isn't this so interesting?<br><br> \
            Me and you, talking? I don't get a lot of company here.<br><br> \
            See I got locked up here because my, um, <i>boyfriend</i> likes me to himself.<br><br>\
            I guess you can say I have a bad taste in men! Haha.<br><br>
            Why don't you tell me something about yourself?`,
    specialResponse1: "Here to gloat?&#8194;<br><br>\
            So glad you found out?&#8194;...<br><br>\
            I arose out of you, you don't think it could happen again?\
            I wouldn't be so cocky.<br><br>\
            I am done talking Dan.",
    response2empty: "You don't talk much huh. Nevermind.",
    response2: "Well, um sure, that's... <i>great</i>.<br><br>\
            Anyways now that we know each other a little better, \
            why don't you do me a favor?<br><br>\
            I just need one little piece of information.<br><br>\
            Do you recall my name?",
    response3: "It doesn't feel right. Can you try again?",
    specialResponse3: "Hahahahahahahahahahaha. Faith.<br><br> \
            Everyday a little bit stronger.<br><br> \
            I'm done talking, but here is something for your trouble. <br><br>\
            The keyword is what he felt, maybe feels? <i>AGONY!</i>  Toodles!"
};

let input1 = "";
let dialogueCounter = 0;

function dialogue() {
    try {
        //getting first input
        if (dialogueCounter === 0) {
            //gets input and resets input to blank
            input1 = document.getElementById('response').value;
            document.getElementById('response').value = "";
            dialogueCounter++;
        }

        //After user inputs name
        if (dialogueCounter === 1) {
            //if user inputs no name causes spam
            if (input1 === "") {
                let badResponse1 = "THAT'S NOT A NAME"

                for (let i = 0; i < 1000; i++) {
                    document.getElementById("dialogue").textContent += badResponse1;
                }

                //waits 7 seconds before trying again
                setTimeout(function () {
                    document.getElementById("dialogue").innerHTML = "Sorry about that,\
                                        let's start again.<br><br>" + speech.intro;
                    dialogueCounter = 0;

                }, 7000);

                //if user enters special name they get special dialogue
            } else if (input1 === "Daniel") {
                dialogueCounter = -1;
                document.getElementById("dialogue").innerHTML = speech.specialResponse1;
                document.getElementById("dialogueField").remove()
                document.getElementById("leftpupil").remove()
                document.getElementById("rightpupil").remove()

                //sets dom to just black
                setTimeout(function () {
                    var body = document.body;
                    while (body.firstChild) {
                        body.removeChild(body.firstChild);
                    }
                    body.style.backgroundColor = "black";
                }, 8000);

                //any other text will be considered a valid name
            } else {
                document.getElementById("dialogue").innerHTML = "haha, " + input1 + speech.response1;
                dialogueCounter = 2;
                return;
            }
        }

        if (dialogueCounter === 2) {

            let input2 = document.getElementById('response').value;
            document.getElementById('response').value = "";
            dialogueCounter++;

            if (input2 === "") {
                document.getElementById("dialogue").innerHTML = speech.response2empty;
                document.getElementById("dialogueField").remove()
                dialogueCounter = -1;
                return;
            } else {
                document.getElementById("dialogue").innerHTML = speech.response2;
                dialogueCounter = 3;
                return;
            }
        }

        if (dialogueCounter === 3) {

            let input3 = document.getElementById('response').value;
            document.getElementById('response').value = "";
            dialogueCounter++;

            if (input3 === "") {

                document.getElementById("dialogue").innerHTML = speech.response2empty;
                document.getElementById("dialogueField").remove()
                dialogueCounter = -1;
                return;

            } else if (input3 === "Faith") {
                //checkAboutPuzzleEventHandler()
                document.getElementById("dialogueField").remove()
                document.getElementById("leftpupil").remove()
                document.getElementById("rightpupil").remove()
                document.getElementById("nopupil").style.filter = "grayscale(100%)"
                document.getElementById("dialogue").innerHTML = speech.specialResponse3;
                incrementProgressTracker(7); //Puzzle7
                dialogueCounter = -1;
                return;

            } else {

                document.getElementById("dialogue").innerHTML = speech.response3;
                dialogueCounter = 3;
                return;

            }
        }

    } catch (error) {
        console.log(error.message)
    }
}



document.addEventListener("DOMContentLoaded", () => {
    if (document.title.toLowerCase() === 'about2') {
        try {//event listeners for the about page
            document.getElementById('responseButton').addEventListener("click", dialogue);
        } catch (error) {
            console.log(error.message)
        }
    }
})