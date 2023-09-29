// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question

const startQuizBtn = document.querySelector("#start");
const restartQuizBtn = document.querySelector("#restart");
const highscoreBtn = document.getElementById("show-highscores");
var countElement = document.getElementsByClassName("container");
let currentQuestion;
let answer;
var highscoreElement = document.getElementById("highScores")
var timerElement = document.getElementById('countdown');
var decisionElement = document.getElementById('decision');
var startElement = document.getElementById('splash-screen');
var questionElement = document.getElementById("options");
var gameoverElement = document.getElementById("gameOver");
var qnum = 0;
var timeLeft = 60;
let timeInterval;
let highScores = [];

// array of questions
const questionList = [{
    //the question
    question: "Where does Gabe live?",
    //the possible answers to the question
    Choices: ["Brooklyn", "Queens", "Staten Island"],
    //the correct answer to the question
    Correct: "Brooklyn"
},
{
    question: "Why Gabriel decide to learn to code?",
    Choices: ["Career advancement", "Just for fun", "entrepreneurial opportunities"],
    Correct: "entrepreneurial opportunities"
},
{
    question: "what is javascript used for?",
    Choices: ["create dynamic content for websites", "processing and transforming massive quantities of data", "improve the security, performance, and reliability of anything connected to the Internet",],
    Correct: "create dynamic content for websites"
},
{
    question: "What Is The MERN Stack?",
    Choices: ["Linux (Operating System), Apache (Web Server), MySQL (Database)", "Ruby on Rails", "MongoDB, Express. js, AngularJS, Node. js", "MongoDB, Express, React, Node,"],
    Correct: "MongoDB, Express, React, Node,",
},
{
    question: "How does mern stack work?",
    Choices: ["Uses a 3-tier architecture comprising the front end, the back end, and the database", "Uses application programming interface (API or web API)", "Uses Kubernetes containers resemble virtual machines (VMs), each with its own CPU share, filesystem, process space, memory, and more.", "It's open-source system for automating deployment, scaling,"],
    Correct: "Uses a 3-tier architecture comprising the front end, the back end, and the database",
}
];
startQuizBtn.addEventListener("click", beginQuiz);
highscoreBtn.addEventListener("click", highscoreboard);
restartQuizBtn.addEventListener("click", restartQuiz);
//timer function
function timer() {
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
    timeInterval = setInterval(function () {
        // As long as the `timeLeft` is greater than 1
        if (timeLeft > 1) {
            // Set the `textContent` of `timerElement` to show the remaining seconds
            timerElement.textContent = timeLeft + ' seconds remaining';
            // Decrement `timeLeft` by 1
            timeLeft--;
        } else if (timeLeft === 1) {
            // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
            timerElement.textContent = timeLeft + ' second remaining';
            timeLeft--;
        } else {
            // Once `timeLeft` gets to 0, set `timerElement` to a game over string
            timerElement.textContent = 'Times up';
            
            endQuiz();
            // Use `clearInterval()` to stop the timer
            clearInterval(timeInterval);
        }
    }, 1000);
}

function userinfo() {
    //new usr object name property=textboxname.content 
    //usr object score = timeLeft when q array index = array -1
}
function displayMessage() {
    timerElement.textContent = timeLeft
}
function populateQuestions() {
    //set the variable current question to the question object at index qnum in the questions list array
    questionElement.innerHTML = "";
    decisionElement.innerText = "";
    if (qnum === questionList.length) {
        endQuiz()
    } else {
        currentQuestion = questionList[qnum];
        //set answer to the currentQuestion objects correct paramenter
        answer = currentQuestion.Correct;
        //create a new h2 element call curqTitle
        let curqTitle = document.createElement("h2");
        // set the curqTitle inner text to the question parament of the current question
        curqTitle.innerText = currentQuestion.question;
        //append the new element to the choices article
        questionElement.append(curqTitle)
        //create a div to seperate the choices from the question for css purposes
        let choiceDiv = document.createElement("div");
        choiceDiv.setAttribute("class", "cln");
        curqTitle.append(choiceDiv);
        //iterate though the questions while the index of the current question is less than the length of the choices array for the current question
        for (let i = 0; i < currentQuestion.Choices.length; i++) {
            //create button choice button and set inner text of choice button to the index of i in the choices array for the current question
            let chosenBtn = document.createElement("button");
            chosenBtn.innerText = currentQuestion.Choices[i];
            choiceDiv.append(chosenBtn);
            chosenBtn.addEventListener("click", function (e) {
                e.preventDefault();
                checkAnswer(answer, this.innerText)
            })
            //add event listen for each button with event.target.innertext reads the inner text of the button that is clicked  
            document.getElementById("options").classList.add("show")
        }
    }
    function checkAnswer(a, b) {
        if (a == b) {
            decisionElement.textContent = 'Correct ';
        } else {
            decisionElement.textContent = 'Incorrect ';
            if (timeLeft < 5) {
                timerElement.textContent = "";

            } else {
                timeLeft = timeLeft - 5;
            }
        }
        qnum++;
        setTimeout(populateQuestions, 500);
    }
}



function beginQuiz() {
    qnum = 0;
    timeLeft = 60;
    restartQuizBtn.classList.add("hide")
    //hide start screen and move to questions
    // e.preventDefault();
    startElement.classList.add("hide");
    highscoreElement.classList.add("hide");
    timer();
    console.log("starting your quiz dave")
    populateQuestions();
}
function restartQuiz() {
    // evnt.preventDefault()
    // highscoreElement.classList.add("hide")
    beginQuiz()
    }


function endQuiz() {
    var scr = timeLeft;
    // clear timer element from screen
    timerElement.textContent = "";
    clearInterval(timeInterval)
    gameoverElement.classList.replace("hide", "show");
    let initialsEntry = document.createElement("INPUT");
    let okBtn = document.createElement("button");
    okBtn.innerText = "Enter";
    okBtn.addEventListener("click", function (event) {
        event.preventDefault();
        initials = initialsEntry.value
        console.log(initials)
        if (initials == "") {
            alert("please enter your intials")
        }
        else {
            alert("Your score is " + scr + "\n" + "Your initials are " + initials);
            const usr = {
                initials: initials,
                score: scr,
            };
            highScores.push(usr)
            localStorage.setItem("storedScores", JSON.stringify(highScores));
        }
        gameoverElement.innerHTML = "";
        highscoreboard()
    })
    initialsEntry.setAttribute("type", "text");
    scoreEl = document.createElement("p");
    scoreEl.innerText = scr;
    gameoverElement.append(
        scoreEl,
        initialsEntry,
        okBtn
    );
}
function highscoreboard() {
    highscoreElement.classList.remove("hide");
    highscoreElement.innerHTML = ""
    restartQuizBtn.classList.remove("hide");
    if (highScores.length == 0) {
        alert("No Highscores Yet");
        //document.getElementById("restart").remove("class","hide");
    } else {
        highScores= JSON.parse(localStorage.getItem("storedScores"));
        highScores.sort((a,b) => b.score -a.score);
        for (let x = 0; x < highScores.length; x++) {
            var scoreP = document.createElement("p");
            scoreP.innerText = highScores[x].score + " " + highScores[x].initials;
            highscoreElement.append(scoreP);
        }
    }
    console.log("showing leaderboard");
    //remove all element in options article
    questionElement.innerHTML = "";
    startElement.classList.add("hide");
    //hide countdown element
    clearInterval(timeInterval);
}