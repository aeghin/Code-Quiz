//Global Variables

var questionContainer = document.querySelector("#question-container");
var scoreContainer = document.querySelector("#score-container");
var starterContainer = document.querySelector("#starter-container");
var endingContainer = document.querySelector("#end-container");
var highScoreContainer = document.querySelector("#high-score-container");
var initForm = document.querySelector("#initials-form");
var correctAns = document.querySelector("#correct");
var ViewHighScore = document.querySelector("#view-high-scores");
var listHighScore = document.querySelector("#high-score-list");
var startQ = document.querySelector("#start-game");
var incorrectAns = document.querySelector("#wrong");
var backBtn = document.querySelector("#go-back");
var clearBtn = document.querySelector("#clear-high-scores");
var question = document.querySelector("#question");
var ansBtn = document.querySelector("#answer-buttons");
var timer = document.querySelector("#timer");
var score = 0;
var timeLeft;
var gameOver;
timer.innerText = 0;


var HighScores = [];

//Array Details 
var arrayMixedQuestions;
var QuestionIndex = 0;



// Questions 
var questions = [
  {
    q: 'Where in your HTML file do you place the JS file?',
    a: 'End of Body tag',
    choices: [{ choice: 'Beginning of HTML tag' }, { choice: 'End of HTML tag' }, { choice: 'Beginning of Body tag' }, { choice: 'End of Body tag' }]
  },
  {
    q: 'The first index of an array is ____.',
    a: '0',
    choices: [{ choice: '1' }, { choice: '4' }, { choice: '0' }, { choice: '-1' }]
  },
  {
    q: 'How do you add a comment in a JavaScript?',
    a: '//This is a comment',
    choices: [{ choice: '<!--This is a comment-->' }, { choice: '//This is a comment' }, { choice: 'This is a comment",' }, { choice: '* This is a comment *' }]
  },
  {
    q: 'Which of these is not a way to save a variable?',
    a: 'vet',
    choices: [{ choice: 'vet' }, { choice: 'var' }, { choice: 'let' }, { choice: 'const' }]
  },
  {
    q: 'Commonly used data types DO NOT include:',
    a: 'alerts',
    choices: [{ choice: 'strings' }, { choice: 'booleans' }, { choice: 'alerts' }, { choice: 'numbers' }]
  },
  {
    q: 'The logical operator that represents OR is ____.',
    a: '||',
    choices: [{ choice: '^^' }, { choice: '&&' }, { choice: '!==' }, { choice: '||' }]
  },
  {
    q: 'What HTML attribute references an external JavaScript file?',
    a: 'src',
    choices: [{ choice: 'href' }, { choice: 'src' }, { choice: 'class' }, { choice: 'index' }]
  },
];

//Go back to front page.
var frontPage = function () {
  highScoreContainer.classList.add("hide")
  highScoreContainer.classList.remove("show")
  starterContainer.classList.remove("hide")
  starterContainer.classList.add("show")
  scoreContainer.removeChild(scoreContainer.lastChild)
  QuestionIndex = 0
  gameOver = ""
  timer.textContent = 0
  score = 0

  if (correctAns.className = "show") {
    correctAns.classList.remove("show");
    correctAns.classList.add("hide")
  }
  if (incorrectAns.className = "show") {
    incorrectAns.classList.remove("show");
    incorrectAns.classList.add("hide");
  }
};

//45 seconds on the clock. Checks time. 
var setTime = function () {
  timeLeft = 45;

  var timercheck = setInterval(function () {
    timer.innerText = timeLeft;
    timeLeft--

    if (gameOver) {
      clearInterval(timercheck)
    }

    if (timeLeft < 0) {
      showScore()
      timer.innerText = 0
      clearInterval(timercheck)
    }

  }, 1000)
};

var startGame = function () {
  starterContainer.classList.add('hide');
  starterContainer.classList.remove('show');
  questionContainer.classList.remove('hide');
  questionContainer.classList.add('show');
  arrayMixedQuestions = questions.sort(() => Math.random() - 0.5)
  setTime()
  setQuestion()
};

//new question 
var setQuestion = function () {
  resetAnswers()
  displayQuestion(arrayMixedQuestions[QuestionIndex])
};

//Remvoing the ansBtn 
var resetAnswers = function () {
  while (ansBtn.firstChild) {
    ansBtn.removeChild(ansBtn.firstChild)
  };
};

//shows question
var displayQuestion = function (index) {
  question.innerText = index.q
  for (var i = 0; i < index.choices.length; i++) {
    var answerbutton = document.createElement('button')
    answerbutton.innerText = index.choices[i].choice
    answerbutton.classList.add('btn')
    answerbutton.classList.add('answerbtn')
    answerbutton.addEventListener("click", answerCheck)
    ansBtn.appendChild(answerbutton)
  }
};
//users is shown if correct answer was chosen
var answerCorrect = function () {
  if (correctAns.className = "hide") {
    correctAns.classList.remove("hide")
    correctAns.classList.add("banner")
    incorrectAns.classList.remove("banner")
    incorrectAns.classList.add("hide")
  }
};
//shows incorrect answer message.
var answerWrong = function () {
  if (incorrectAns.className = "hide") {
    incorrectAns.classList.remove("hide")
    incorrectAns.classList.add("banner")
    correctAns.classList.remove("banner")
    correctAns.classList.add("hide")
  }
};

//verifies if answer is correct    
var answerCheck = function (event) {
  var selectedAnswer = event.target
  if (arrayMixedQuestions[QuestionIndex].a === selectedAnswer.innerText) {
    answerCorrect()
    score = score + 7
  }

  else {
    answerWrong()
    score = score - 1;
    timeLeft = timeLeft - 3;
  };

  //checks for more questions otherwise game is over.
  QuestionIndex++
  if (arrayMixedQuestions.length > QuestionIndex + 1) {
    setQuestion()
  }
  else {
    gameOver = "true";
    showScore();
  }
};

// shows final score once game is over.
var showScore = function () {
  questionContainer.classList.add("hide");
  endingContainer.classList.remove("hide");
  endingContainer.classList.add("show");

  var scoreDisplay = document.createElement("p");
  scoreDisplay.innerText = ("Your final score is " + score + "!");
  scoreContainer.appendChild(scoreDisplay);
};

// inputsd high score
var createHighScore = function (event) {
  event.preventDefault()
  var initials = document.querySelector("#initials").value;
  if (!initials) {
    alert("Enter your intials!");
    return;
  }

  initForm.reset();

  var HighScore = {
    initials: initials,
    score: score
  }


  HighScores.push(HighScore);
  HighScores.sort((a, b) => { return b.score - a.score });


  while (listHighScore.firstChild) {
    listHighScore.removeChild(listHighScore.firstChild)
  }

  for (var i = 0; i < HighScores.length; i++) {
    var highscoreEl = document.createElement("li");
    highscoreEl.ClassName = "high-score";
    highscoreEl.innerHTML = HighScores[i].initials + " - " + HighScores[i].score;
    listHighScore.appendChild(highscoreEl);
  }

  saveHighScore();
  displayHighScores();

};

//Saving the score
var saveHighScore = function () {
  localStorage.setItem("HighScores", JSON.stringify(HighScores))
};

// shows the high scores list
var showHighScore = function () {
  var LoadedHighScores = localStorage.getItem("HighScores")
  if (!LoadedHighScores) {
    return false;
  }

  LoadedHighScores = JSON.parse(LoadedHighScores);
  LoadedHighScores.sort((a, b) => { return b.score - a.score })


  for (var i = 0; i < LoadedHighScores.length; i++) {
    var highscoreEl = document.createElement("li");
    highscoreEl.ClassName = "high-score";
    highscoreEl.innerText = LoadedHighScores[i].initials + " - " + LoadedHighScores[i].score;
    listHighScore.appendChild(highscoreEl);

    HighScores.push(LoadedHighScores[i]);

  }
};


var displayHighScores = function () {

  highScoreContainer.classList.remove("hide");
  highScoreContainer.classList.add("show");
  gameOver = "true"

  if (endingContainer.className = "show") {
    endingContainer.classList.remove("show");
    endingContainer.classList.add("hide");
  }
  if (starterContainer.className = "show") {
    starterContainer.classList.remove("show");
    starterContainer.classList.add("hide");
  }

  if (questionContainer.className = "show") {
    questionContainer.classList.remove("show");
    questionContainer.classList.add("hide");
  }

  if (correctAns.className = "show") {
    correctAns.classList.remove("show");
    correctAns.classList.add("hide");
  }

  if (incorrectAns.className = "show") {
    incorrectAns.classList.remove("show");
    incorrectAns.classList.add("hide");
  }

}
// Wipes out scores list
var clearScores = function () {
  HighScores = [];

  while (listHighScore.firstChild) {
    listHighScore.removeChild(listHighScore.firstChild);
  }

  localStorage.clear(HighScores);

}

showHighScore()

//starts game
startQ.addEventListener("click", startGame)
//submit your score when clicked
initForm.addEventListener("submit", createHighScore)
//View high scores on click
ViewHighScore.addEventListener("click", displayHighScores)
//Go back to front page
backBtn.addEventListener("click", frontPage)
//Clears all of the scores.
clearBtn.addEventListener("click", clearScores)








