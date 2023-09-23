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