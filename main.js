
document.querySelector('footer').innerText = `${gameName} game - By: Shams Elhawary💫 © ${new Date().getFullYear()}`;

//letters
let letters = "abcdefghijklmnopqrstuvwxyz";
let lettersArray = Array.from(letters);

//selecting letter container
let letterContainer = document.querySelector(".lettres");

//Generating letters
lettersArray.forEach(letter => {
    let span = document.createElement("span");
    let theLetter = document.createTextNode(letter);
    span.appendChild(theLetter);
    span.className = "letter-box";
    letterContainer.appendChild(span);
});

// Object Of Words + Categories
const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "Html", "mysql", "python"],
    footballTeams: ["Manchester City", "Liverpool", "Leicester City", "Fulham", "Everton", "Chelsea", "Aston Villa", "Arsenal", "Tottenham", "Manchester United", "West Ham", "Al Ahly","Zamalek","Barcelona","Real Madrid","Bayern","Dortmund","Al Masry","Milan","Pyramids"],
    people: ["Saher", "Gad", "Hatem", "Saif", "Shams", "Aya", "Salma", "Reem","Saad","Mahmoud","omr","Mohamed","Ahmed","shehab","sondos","salsabil"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar", "Oman", "Iraq", "Libya", "Tunisia"]
}

// Get Random Property
let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];

// Random Number Depend On Words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");
let lettersAndSpace = Array.from(randomValueValue);

lettersAndSpace.forEach(letter => {
    let span = document.createElement("span");

    // If Letter Is Space
    if (letter === " ") {
        span.className = "has-space";
    }
    lettersGuessContainer.appendChild(span);
});

// Select Guess Span

let guessSpans = document.querySelectorAll(".letters-guess span");

//set wrong attempts
let wrongAttempts = 0;
//select the draw element
let theDraw = document.querySelector(".hangman-draw");

// handle Click On Letters
document.addEventListener("click", (e) => {

    let theStatus = false;

    if (e.target.className === 'letter-box'){
    e.target.classList.add("clicked");
    let theClickedLetter = e.target.innerHTML.toLowerCase();
    let theChosenWord = Array.from(randomValueValue.toLowerCase());


    theChosenWord.forEach((wordLetter, wordIndex)=>{
        if(theClickedLetter == wordLetter ){
            theStatus = true;
            // loop on all guess spans
            guessSpans.forEach((span,spanIndex)=>{
                if(wordIndex === spanIndex){
                    span.innerHTML = theClickedLetter;
                }
            });

        }
    })

    if(theStatus !== true){
        wrongAttempts ++ ;
        theDraw.classList.add(`wrong-${wrongAttempts}`);

        document.getElementById('wrong').play();

        if (wrongAttempts === 8){
            endGame();
            document.getElementById('gameOver').play();
            letterContainer.classList.add("finished");
        }else{
            success();
            }   
}else{
    document.getElementById('wright').play();
}
    }
        }); 

// End Game Function
function endGame(){
    let div = document.createElement("div");
    let divText = document.createTextNode(`Game Over, The Word Is: ${randomValueValue}`);
    div.appendChild(divText);
    div.className = "game-over";
    document.body.appendChild(div);
}





function success() {
    const allLetters = Array.from(document.querySelectorAll(".letters-guess span"));

    // Extract the letters' content and join them into a string
    const wordAndSpace = allLetters.map(letter => letter.textContent.trim()).join("");




	let numspan = document.querySelectorAll(".letters-guess span");
	
	// console.log(numspan);


    // Ensure randomValueValue exists and compare it with the guessed word
    if (typeof randomValueValue !== "undefined" && wordAndSpace === randomValueValue.toLowerCase().trim()) {
            // Create the success message
            const successDiv = document.createElement("div");
            successDiv.textContent = `🎉 Great Job! You Win! The Word Is: "${randomValueValue}" 🎉`;
            successDiv.className = "success";
                    document.getElementById('success').play();

            document.body.appendChild(successDiv);
            letterContainer.classList.add("finished");
        // }
    }
}














