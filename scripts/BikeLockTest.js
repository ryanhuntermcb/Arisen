/*
function CreateOneWheelLetterOption(inputArray, inputTargetContainerId, inputSelectListName) {
    let inputArrayLength
    let TargetContainer = document.getElementById(inputTargetContainerId)

    if (Array.isArray(inputArray)) {
        inputArrayLength = inputArray.length
    }
    else {
        inputArrayLength = 1
    }

    TargetContainer.innerHTML += `<select name=${inputSelectListName} id=${inputSelectListName} class="dropbtn "></select>`

    for (let i = 0; i < inputArrayLength; i++) {
        //console.log(`${i} and ${inputArrayLength}`)

        let firstElement = ''

        if (i == 0) {
            firstElement = 'Select'
        }

        let optionTemplate = `<option value=${inputArray[i]}>${inputArray[i]}</option>`

        document.getElementById(inputSelectListName).innerHTML += optionTemplate
    }
}

function CreateBikeLockPuzzle(PuzzleSolution, PuzzleDifficulty, PuzzleName, TargetContainerId) {
    PuzzleSolution = String(PuzzleSolution).toUpperCase()
    let NumberOfWheels = PuzzleSolution.length
    let PuzzleSolutionArray = PuzzleSolution.split('')
    let TargetContainer = document.getElementById(TargetContainerId)
    TargetContainer.innerHTML = '' //The puzzle should be the only thing inside of the target container

    //Ensure PuzzleDifficulty is between 1 and 10
    if (!(PuzzleDifficulty > 0)) {
        PuzzleDifficulty = 1
    }
    if (PuzzleDifficulty > 10) {
        PuzzleDifficulty = 10
    }

    //console.log(PuzzleSolutionArray) //Answer but split into Array

    for (let i = 0; i < NumberOfWheels; i++) {
        let start = PuzzleSolutionArray[i]
        let arrayTest = [start]
        let i2 = 0

        while (i2 < PuzzleDifficulty) {
            let rand = randomLetter()
            if (arrayTest.includes(rand)) {
                continue
            }
            else {
                //console.log(rand)
                arrayTest.push(rand)
                i2++
                //console.log(randomIndex(5))
            }
        }

        //Solution letter index swap
        let swapToIndex = randomIndex(arrayTest.length)

        let swapFrom = arrayTest[0]
        arrayTest[0] = arrayTest[swapToIndex]
        arrayTest[swapToIndex] = swapFrom

        CreateOneWheelLetterOption(arrayTest, TargetContainerId, `${PuzzleName}${i}`)

        //console.log(swapToIndex)
        //console.log(arrayTest)
        PuzzleSolutionArray[i] = arrayTest

        //let finish = 
    }


    //console.log(PuzzleSolutionArray)
    for (let i = 0; i < NumberOfWheels; i++) {
        //CreateOneWheelLetterOption(PuzzleSolutionArray[i],inputTargetContainerId, inputSelectListName)
    }

}

function randomLetter() {
    const uppercaseAsciiStart = 65;
    const letterIndex = Math.floor(Math.random() * 26);
    const letter = String.fromCharCode(uppercaseAsciiStart + letterIndex);
    return letter
}

function randomIndex(ArrayLength) {
    return Math.floor(Math.random() * ArrayLength)   //this should be a random spot
}

function IsPuzzleSolved(PuzzleContainerId, PuzzleSolution) {
    let PuzzleParent = document.getElementById(PuzzleContainerId).children
    //console.log(PuzzleParent)

    let currentAnswer = ''
    for (let i = 0; i < PuzzleParent.length; i++) {
        currentAnswer += PuzzleParent[i].value
    }

    if (currentAnswer == PuzzleSolution) {
        return true
    }
    else {
        return false
    }

}
*/
/*document.addEventListener("DOMContentLoaded", () => {
    let PuzzleContainerId = 'PuzzleContainer'
    let PuzzleSolution = 'solution'

    let PuzzleContainer = document.getElementById(PuzzleContainerId)
    let StatusText = document.getElementById('StatusText')

    CreateBikeLockPuzzle(PuzzleSolution, 4, 'TestPuzzle', PuzzleContainerId);

    PuzzleContainer.addEventListener("click", () => {
        if (IsPuzzleSolved(PuzzleContainerId, PuzzleSolution)) {
            StatusText.innerHTML = "Puzzle Solved"
        }
        else {
            StatusText.innerHTML = "Incorrect Combination"
            //console.log("Incorrect Combination")
        }
    })

        
    //CreateOneWheelLetterOption([1, 2, 3], 'PuzzleContainer', 'Letter1')
    //CreateOneWheelLetterOption([4, 5, 6], 'PuzzleContainer', 'Letter2')

})
*/
/*
document.addEventListener("DOMContentLoaded", () => {
    if (document.title.toLowerCase() === 'about') {
        try {
            let PuzzleContainerId = 'puzzle'
            let PuzzleSolution = 'DARK'

            let PuzzleContainer = document.getElementById(PuzzleContainerId)
            let StatusText = document.getElementById('StatusText')

            CreateBikeLockPuzzle(PuzzleSolution, 4, 'TestPuzzle', PuzzleContainerId);

            PuzzleContainer.addEventListener("click", () => {
                if (IsPuzzleSolved(PuzzleContainerId, PuzzleSolution)) {
                    StatusText.innerHTML = "Puzzle Solved"
                }
                else {
                    StatusText.innerHTML = "Incorrect Combination"
                    //console.log("Incorrect Combination")
                }
            })

        } catch (error) {
            console.log(
                `Event Listener: [about]
            Error Message: ${error.message}`)
        }


    }
    
    if (document.title.toLowerCase() === 'about') {
        try {
            let PuzzleContainerId = 'PuzzleContainer'
            let PuzzleSolution = 'solution'

            let PuzzleContainer = document.getElementById(PuzzleContainerId)
            let StatusText = document.getElementById('StatusText')

            CreateBikeLockPuzzle(PuzzleSolution, 4, 'TestPuzzle', PuzzleContainerId);

             PuzzleContainer.addEventListener("click", () => {
            if (IsPuzzleSolved(PuzzleContainerId, PuzzleSolution)) {
                StatusText.innerHTML = "Puzzle Solved"
            }
            else {
                StatusText.innerHTML = "Incorrect Combination"
                //console.log("Incorrect Combination")
            }
        })

        } catch (error) {
            console.log(
                `Event Listener: [about]
            Error Message: ${error.message}`)
        }
    }
    
}, false);
*/