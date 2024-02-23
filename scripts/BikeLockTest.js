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


document.addEventListener("DOMContentLoaded", () => {
    //let optionTemplate = `<option value=${optionInput}>${optionInput}</option>`
    CreateOneWheelLetterOption([1,2,3], 'PuzzleContainer', 'Letter1')
    CreateOneWheelLetterOption([4,5,6], 'PuzzleContainer', 'Letter2')

/*
    let inputArray = ['1', '2', '3']
    let inputTargetContainerId = 'PuzzleContainer'
    let inputSelectListName = 'TestList'

    let TargetContainer = document.getElementById(inputTargetContainerId)
    TargetContainer.innerHTML += `<select name=${inputSelectListName} id=${inputSelectListName} class="dropbtn "></select>`

    console.log(inputArray.length)
    for (let i = 0; i < inputArray.length; i++) {
        console.log(`${i} and ${inputArray.length}`)

        let firstElement = ''

        if (i == 0) {
            firstElement = 'Select'
        }
        let optionTemplate = `<option value=${inputArray[i]}>${inputArray[i]}</option>`
        document.getElementById(inputSelectListName).innerHTML += optionTemplate
    }
    */
    /*
        for (let i = 0; i < inputArray.length ; i++) {
            let firstElement = (i = 0 ? 'selected' : '')
            let optionTemplate = `<option value=${optionInput} ${firstElement}>${optionInput}</option>`
            document.getElementById('bun').innerHTML += optionTemplate
            console.log('test')
        }
    */

    //document.getElementById('bun').innerHTML += optionTemplate

    /*
    let ButtonOne = document.getElementById("TextButtonOne");
    let LargeTextBox = document.getElementById("TextBoxLarge");
    console.log(ButtonOne);

    console.log("Hello Again")

    let TestArray = ['#', 'a', 'b', 'c', '#']
    
    console.log(TestArray);
    */


    //document.getElementById('TextOne').innerHTML = TestArray.join("");
    /*
        ButtonOne.addEventListener('click', ()=>{
            if(!LargeTextBox.classList.contains("MoveTextAnimationDown")){
                LargeTextBox.classList.add("MoveTextAnimationDown")
                console.log(1)
            }
            else {
                LargeTextBox.classList.remove("MoveTextAnimationDown")
                console.log(2)
            }
        })
    */
    /*
        let Ptext = document.getElementById("Text")
        Ptext.addEventListener('click', ()=>{
            if(!Ptext.classList.contains("fadeInUp-animation")){
                Ptext.classList.add("fadeInUp-animation")
                console.log(3)
                Ptext.innerHTML='New'
                
            }
            else {
                Ptext.classList.remove("fadeInUp-animation")
                console.log(4)
            }
        })
        */
})

//Function to add drop downs
//required inputs : Object containing number of Selections with arrays of objects
/*
{
    PuzzleName = "SelectorName"
    Options = {
        1 = [a,b,c]
        2 = [d,e,f]
    }
}
*/
