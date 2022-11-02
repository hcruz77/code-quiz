var startBtn = document.getElementById('startBtn');
var questionHeader = document.getElementById('questionHeader');
var buttonArea = document.getElementById('buttonArea');
var game = document.getElementById('game');
var intro = document.getElementById('intro');
var endScreenEl = document.getElementById('endScreen');
var saveScoreBtn = document.getElementById('saveScore');
var timerEl = document.getElementById('timeEl');

var btnA = document.getElementById('a');
var btnB = document.getElementById('b');
var btnC = document.getElementById('c');
var btnD = document.getElementById('d');

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
      'Reusable blocks of code'],
    answer: 'Reusable blocks of code'
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
let timeLeft = 30;

function startGame() {
  game.classList = '';
  intro.classList = 'hide';

  displayQuestions();

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
        // Use `clearInterval()` to stop the timer
        clearInterval(timeInterval);
        // Call the `displayMessage()` function
        endScreen();
      }
    }
  }, 1000);
}
//displays questions and choices
function displayQuestions() {
  questionHeader.textContent = questions[arrayIndex].question;

  btnA.textContent = questions[arrayIndex].choices[0];
  btnB.textContent = questions[arrayIndex].choices[1];
  btnC.textContent = questions[arrayIndex].choices[2];
  btnD.textContent = questions[arrayIndex].choices[3];
};
//clears the screen
function endScreen() {
  game.classList = 'hide';
  endScreenEl.classList = '';
}
//saves score and initials to local storage
function saveScore() {
  var initialsEl = document.getElementById('initials').value;

  if (localStorage.getItem('Scores')) {
    scoresArr = [localStorage.getItem('Scores')];
  } else {
    scoresArr = [];
  }

  scoresArr.push(initialsEl);

  localStorage.setItem('Scores', scoresArr);
}

//executes the button function when user chooses an answer
buttonArea.addEventListener('click', function (event) {
  console.log(event.target.textContent);

  if (arrayIndex >= 3) {
    console.log("Game is done");
    endScreen();
  } else {
    if (event.target.textContent === questions[arrayIndex].answer) {
      console.log('Correct');
      arrayIndex++;
      displayQuestions();
    } else {
      console.log('Incorrect!');
      timeLeft -= 5;
      arrayIndex++;
      displayQuestions();
    }
  }
});

startBtn.addEventListener('click', startGame);
saveScoreBtn.addEventListener('click', saveScore);