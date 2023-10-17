//Sets user to no longer get the intro script
function isOld() {
    let $oldSession = 'false'
    sessionStorage['newSession'] = $oldSession
}

script = ["I can never really know.","I'm stuck here as usual.","I guess I was just born wrong.\
            ","Well, I hope you enjoy your stay.<br> if you click around...\
            ","You might just find something interesting!","You might even find me!"]

//Below is run by the start page
function startScript() {

    let i = 0;

    const intervalId = setInterval(function () {
        if (i < script.length) {
            console.log(script[i]);
            document.getElementById("start").innerHTML = script[i];
            i++;
            //changes image opacity
            if (i === 6){
                console.log("opacity")
                let background = document.getElementsByClassName("startimg")[0];
                let opacityValue = 0.10;
                background.style.opacity = opacityValue;
            }
        } else {
            clearInterval(intervalId); // Stop the interval when all elements are processed
            isOld()
            window.open('./home.html', '_self');
        }
    }, 500);    
}

startScript()