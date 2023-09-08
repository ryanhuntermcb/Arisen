let input1 = "";

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
    response2: "hello 2",
    response3: "hello 3",
    specialResponse3: "special hello 3" //you get this after completing Regrets Puzzle, grab from local storage
};

try {

    dialogueCounter = 0;

function dialogue(){

    //getting first input
    if (dialogueCounter === 0) {
        //gets input and resets input to blank
        input1 = document.getElementById('response').value;
        document.getElementById('response').value = "";
        dialoguecounter = dialogueCounter++;
    }

    //After user inputs name
    if (dialogueCounter === 1){
        //if user inputs no name causes spam
        if (input1 === ""){
            badResponse1 = "THAT'S NOT A NAME"

            for (let i = 0; i < 1000; i++) {
                document.getElementById("dialogue").textContent += badResponse1;   
            }
            
            //waits 7 seconds before trying again
            setTimeout(function() {
                document.getElementById("dialogue").innerHTML = "Sorry about that,\
                                        let's start again.<br><br>" + speech.intro;
                dialogueCounter = 0; 
                
            }, 7000);  

        //if user enters special name they get special dialogue
        }else if(input1 === "Daniel"){
            dialogueCounter = -1;
            document.getElementById("dialogue").innerHTML = speech.specialResponse1;

            //sets dom to just black
            setTimeout(function() {
                var body = document.body;
                while (body.firstChild) {
                    body.removeChild(body.firstChild);
                }
                body.style.backgroundColor = "black";
            }, 8000);

        //any other text will be considered a valid name
        }else{
            document.getElementById("dialogue").innerHTML = "haha, "+input1+speech.response1;
        }
        

        if (dialogueCounter === 1) {
            
        }
    }  

}
} catch {
    console.log("Something went wrong with dialogue. Please refresh page")
}

