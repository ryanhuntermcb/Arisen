

document.addEventListener("DOMContentLoaded", () => {
    if (document.title.toLowerCase() === 'testwheel') {
        try {
            // Event listeners for the Regrets page
            let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
            let clickCount = 0;

            // Puzzle Keys
            document.getElementById('upArrow').addEventListener("click", () => {
                clickCount++;
                const middleNumber = document.getElementById('middleNumber');
                const bottomNumber = document.getElementById('bottomNumber');

                if (clickCount % 2 === 1) {
                    middleNumber.classList.add("upClass");
                    bottomNumber.classList.add("upClass");
                    
                } else {
                    middleNumber.classList.remove("upClass");
                    bottomNumber.classList.remove("upClass");
                }
            });

            document.getElementById('downArrow').addEventListener("click", () => {
                clickCount--;
                const middleNumber = document.getElementById('middleNumber');
                const topNumber = document.getElementById('topNumber');

                if (clickCount % 2 === 1) {
                    middleNumber.classList.add("downClass");
                    topNumber.classList.add("downClass");
                } else {
                    middleNumber.classList.remove("downClass");
                    topNumber.classList.remove("downClass");
                }
            });
        } catch (error) {
            console.log(`Event Listener: [testwheel]
            Error Message: ${error.message}`);
        }
    }
}, false);
