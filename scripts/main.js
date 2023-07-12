//Puzzle Answers
let $Username = 'test'


console.log(isPrisoner())


//Containment Form Function
function containmentEntry(){
    $Test = Array.from(document.querySelectorAll('#EntryForm input')).reduce((acc, input) => ({...acc, [input.id]: input.value }), {});
    console.log($Test);
    //alert('submitted');
    if ($Username == $Test.Username && $Username == $Test.Password){
        console.log('Access Granted');
        
        let $prisonerFlag = 'true'
        sessionStorage['prisonerFlag'] = $prisonerFlag    
        
        document.getElementById('MessageWrapper').innerHTML = `<p>Access Granted: are you a prisoner? ${isPrisoner()}</p>`;
        //window.open('./prisoner.html', '_self')
    }
    else{
        console.log('Access Denied');
        document.getElementById('MessageWrapper').innerHTML = `<p>Access Denied: are you a prisoner? ${isPrisoner()}</p>`;
    }
    //console.log($Test.Username)
    console.log(isPrisoner());
    imprisonment();
}

function isPrisoner(){
    let $readValue = sessionStorage['prisonerFlag'];
    if($readValue == 'true'){
        return true
    }
    else{
        return false
    }
}

function imprisonment(){
    if(isPrisoner()){
        window.open('./prisoner.html', '_self');
    }
}

//main.js will need to be added to each of the files in the website to make sure users cannot escape the prison
//in its current form the prison sentence ends when you terminate the browser session, could look into other more permanent options
imprisonment();