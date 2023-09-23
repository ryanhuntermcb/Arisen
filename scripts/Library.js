//Begin to refactor using import export statements

//Puzzle Answers
let Username = 'test'
let Password = 'test'

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

export { containmentEntry, imprisonment, isPrisoner }
