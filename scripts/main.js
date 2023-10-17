import { containmentEntry, imprisonment, isPrisoner, start } from '../scripts/Library.js'

console.log(isPrisoner())

//Check if User has completed containment
imprisonment();
//checking if user is New and starting tutorial script
start();

document.addEventListener("DOMContentLoaded", () => {
    if (document.title === 'Containment') {
        document.getElementById('containmentButton').addEventListener("click", (btn) => {
            btn.preventDefault();
            containmentEntry();
        })
    }
})