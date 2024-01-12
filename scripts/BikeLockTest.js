
document.addEventListener("DOMContentLoaded", () => {
    
    let ButtonOne = document.getElementById("TextButtonOne");
    let LargeTextBox = document.getElementById("TextBoxLarge");
    console.log(ButtonOne);

    console.log("Hello Again")

    let TestArray = ['a', 'b', 'c']
    
    console.log(TestArray);
    
    document.getElementById('TextOne').innerHTML = TestArray.join("");

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

})

