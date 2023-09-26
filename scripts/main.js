import { containmentEntry, imprisonment, isPrisoner } from '../scripts/Library.js'

console.log(isPrisoner())

imprisonment();

document.addEventListener("DOMContentLoaded", () => {
    if (document.title === 'Containment') {
        document.getElementById('containmentButton').addEventListener("click", (btn) => {
            btn.preventDefault();
            containmentEntry();
        })
    }
})

//checking if user is New and starting tutorial script
function isNew() {
    let $readValue = sessionStorage['newSession'];
    if ($readValue !== 'false') {
        let $newSession = 'true'
        sessionStorage['newSession'] = $newSession
        console.log($readValue)
        return true;
    }
}

function start() {
    if (isNew()) {
        window.open('./start.html', '_self');
    }
}

start()