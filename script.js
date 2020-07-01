//variables to keep track of state
let questionIndex = 0;
let timer = questions.length * 15;
let timerId;
//variables the DOM elements or the HTML "ids"
const questionElement = document.querySelector("#questions");
const timerElement = document.querySelector("#timer");
const choicesElement = document.querySelector("#choices");
const startButton = document.querySelector("#start");
const userInitials = document.querySelector("#initials");
const submitButton = document.querySelector("#submit");
const feedback = document.querySelector("#feedback");
let score = 0;
//functions quiz 
function startQuiz() {
    const startScreen = document.querySelector(".start-screen");
    //hiding our start screen

    startScreen.classList.add("hide")
    //unhide our questions
    questionElement.classList.remove("hide");
    //start timer 
    timerId = setInterval(clockCountdown, 1000);
    timerElement.textContent = timer;

    askQuestion();
}
//to pull the first question
function askQuestion() {
    const questionAsked = questions[questionIndex];
    const questionTitle = document.querySelector("#question-title");
    questionTitle.textContent = questionAsked.titleOfQuestion;
    choicesElement.innerHTML = "";
    //loop through the current question choices
    for (let i = 0; i < questionAsked.choice.length; i++) {
        const choiceNode = document.createElement("button");
        choiceNode.setAttribute("value", questionAsked.choice[i]);
        choiceNode.textContent = i + 1 + ". " + questionAsked.choice[i];
        // attach click event listener to each choice
        choiceNode.onclick = clickQuestion;
        // display on the page
        choicesElement.appendChild(choiceNode);


    }
}

function clickQuestion(event) {

    if (event.target.value !== questions[questionIndex].answer) {

        timer -= 15;

        if (timer < 0) {
            timer = 0;
        }
        timerElement.textContent = timer;
        feedback.textContent = "Wrong";
    } else {
        feedback.textContent = "Correct";
        questionIndex++;
        score++
        askQuestion();
        

    }
    
    //show feedback
    feedback.classList.toggle("hide");
    //hiding feedback after one second
    setTimeout(function () {
        feedback.classList.toggle("hide");

    }, 1000);
    
}

///end quiz function
function endQuiz() {
    //stop timer
    clearInterval(timerId);
    //show end screen
    const endScreen = document.querySelector("#endscreen");
    endScreen.removeAttribute("class");
    const finalScore = document.querySelector("#finalscore");
    finalScore.textContent = score;
    questionElement.classList.add("hide");
}
//clock function
function clockCountdown() {
    timer--;
    timerElement.textContent = timer;
    if (timer <= 0) {
        endQuiz();
    }
}
// save high scores
function saveHighScore(){
    localStorage.setItem("high score", "" + score);
}

//make the buttons work

function enterUsed(event) {
    if (event.key === "Enter") {
        saveHighScore();
    }
}

startButton.onclick = startQuiz;

initials.onkeyup = enterUsed;
//save highscore function called on click
submitButton.onclick = saveHighScore;