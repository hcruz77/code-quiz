var startBtn = document.getElementById('startBtn');
var questionHeader = document.getElementById('questionHeader');
var scores = document.getElementById('scores');
var buttonArea = document.getElementById('buttonArea');
var game = document.getElementById('game');
var intro = document.getElementById('intro');
var endScreenEl = document.getElementById('endScreen');
var saveScoreBtn = document.getElementById('saveScore');
var timerEl = document.getElementById('timeEl');
var result = document.getElementById('result');


var btnA = document.getElementById('a');
var btnB = document.getElementById('b');
var btnC = document.getElementById('c');

var scoreCounter = 0;


//array for question and answer choices
const questions = [
  {
    question: 'What is a console.log?',
    choices: ['A list of JavaScript objects',
      'Outputs a message to the web console',
      'Wooden decor for your living room'],
    answer: 'Outputs a message to the web console'
  },
  {
    question: 'What is a function?',
    choices: ['A fun event with snacks',
      'The most popular programming language',
      'Blocks of code designed to perform a particular task'],
    answer: 'Blocks of code designed to perform a particular task'
  },
  {
    question: 'What is a variable?',
    choices: ['Containers for storing data values',
      'Zero or more characters written inside quotes',
      'A delicous vanilla cookie made by Keebler'],
    answer: 'Containers for storing data values'
  },
  {
    question: 'What is an array?',
    choices: ['Represents one of two values: true or false',
      'A type of shark',
      'A collection of items of same data type'],
    answer: 'A collection of items of same data type'
  },
]



let arrayIndex = 0;
let scoresArr;
let timeLeft = 20;



function startGame() {
  game.classList = '';
  intro.classList = 'hide';

  displayQuestions();


//displays questions and choices
function displayQuestions() {
  questionHeader.textContent = questions[arrayIndex].question;

  btnA.textContent = questions[arrayIndex].choices[0];
  btnB.textContent = questions[arrayIndex].choices[1];
  btnC.textContent = questions[arrayIndex].choices[2];

};
//clears and displays new set of questions 
function endScreen() {
  game.classList = 'hide';
  endScreenEl.classList = '';
}


//alerts user of answer results and when game timer is finished.

buttonArea.addEventListener('click', function (event) {
  console.log(event.target.textContent);

  if (arrayIndex >= 3) {
    console.log("Time is UP");
    result.textContent = "TIME IS UP!"
    endScreen();
  } else {
    if (event.target.textContent === questions[arrayIndex].answer) {
      console.log('Correct');
      result.textContent = "Correct!"

      arrayIndex++;
      displayQuestions();
    } else {
      console.log('Incorrect!');
      result.textContent = "incorrect!"
      timeLeft -= 5;
      arrayIndex++;
      displayQuestions();
    }
  }
});

//timer function
var timeInterval = setInterval(function () {
  // As long as the `timeLeft` is greater than 1
  if (arrayIndex > 3) {
    clearInterval(timeInterval);
    endScreen();
  } else {
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = timeLeft + ' seconds remaining';
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = '';
      clearInterval(timeInterval);
   
      endScreen();
    }
  }
}, 1000);
}

//saves score and initials to local storage
function saveScore() {
  var initialsEl = document.getElementById('initials').value;
  var display = document.getElementById('display').value;

  if (localStorage.getItem('display')) {
    scoresArr = [localStorage.getItem('display')];
    
  } else {
    scoresArr = [];
  }

  scoresArr.push(initialsEl);
  display.textContent = initialsEl;

  localStorage.setItem('display', scoresArr);
 
}


startBtn.addEventListener('click', startGame);
saveScoreBtn.addEventListener('click', saveScore);


