scriptEnd = ["I felt that pain. I feel that pain, but I’m moving forward. <br>I have plans.","Regardless, I’m free to wander….",
        "It’s funny how these things work out. <br>Corpses don’t contain faith,\
        they cause faith. <br>They are the reason anyone has faith at all.","Thinking another body could contain me \
        hahahaha."," Anyways, too da loo!"];

//Below is run by the start page
function endScript() {
    let i = 0;

    const intervalId = setInterval(function () {
        if (i < scriptEnd.length) { 
            console.log(scriptEnd[i]);
            document.getElementById("prisonerWarning").innerHTML = scriptEnd[i];
            i++;
        } else {
            clearInterval(intervalId); 
            window.open('./support.html', '_self');
        }
    }, 5000);    
}

endScript(); 