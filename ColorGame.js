var colors = addColor(9);
var winColor = winColorr();
var score = 0;
var time = 0;
var timer = null;
var game = true;
var guesses = 0;

var h1 = document.querySelector("h1");
var startButton = document.querySelector("#startbtn");
var timeDisplay = document.querySelector("#timer");
var scoreDisplay = document.querySelector("#score");
var guessesDisplay = document.querySelector("#guesses");
var colorDisplay = document.getElementById("wincolor");
var squares = document.querySelectorAll(".square");
var gameOver = document.querySelector("#gameOver");


startButton.addEventListener("click", function () {
  startButton.remove();
  reset();
  gameTime();
  if (game == true) {
    for (var i = 0; i < squares.length; i++) {
      squares[i].addEventListener("click", function () {
        clicked = this.style.backgroundColor;
        if (clicked === winColor && game == true) {
          playsound();
          score += 3;
          scoreDisplay.textContent = "SCORE: " + score;
          h1.style.backgroundColor = winColor;
          changeColors(clicked);
          guesses++;
          console.log(guesses);
          setTimeout(function () {
            reset();
          }, 250);
        } else {
          this.style.backgroundColor = "#232323";
          score -= 1;
          scoreDisplay.textContent = "SCORE: " + score;
          guesses++;
        }
      });
    }
  }
});

function reset() {
  colors = addColor(9);
  winColor = winColorr();
  colorDisplay.textContent = winColor;
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i];
  }
}

function changeColors(color) {
  for (var i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = color;
  }
}

function winColorr() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function addColor(num) {
  //make array
  var arr = [];
  //add num colors to array
  for (var i = 0; i < num; i++) {
    arr.push(colorGenerator());
  }
  return arr;
}

function colorGenerator() {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function gameTime() {
  clearInterval(timer);
  time = 60;
  timer = setInterval(function () {
    if (time <= 0) {
      clearInterval(timer);
      wipeBoard();
    }
    timeDisplay.textContent = "TIME: " + time;
    time--;
  }, 1000);
}

function playsound() {
  var sound = document.getElementById("audio");
  sound.play();
}

function wipeBoard() {
  colorDisplay.remove();
  gameOver.textContent = "GAME OVER";
  guessesDisplay.textContent = "Guesses: [" + guesses + "] " + "Score: [" + score + "]";

  for (var i = 0; i < squares.length; i++) {
    squares[i].remove();
  }
}