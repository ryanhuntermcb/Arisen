
document.addEventListener("DOMContentLoaded", () => {
    
    let ButtonOne = document.getElementById("TextButtonOne");
    let LargeTextBox = document.getElementById("TextBoxLarge");
    console.log(ButtonOne);

    console.log("Hello Again")

    let TestArray = ['#', 'a', 'b', 'c', '#']
    
    console.log(TestArray);
    
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
