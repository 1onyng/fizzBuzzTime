var startTimerButton = document.querySelector('.startTimer');
var pauseTimerButton = document.querySelector('.pauseTimer');
var timerDisplay = document.querySelector('.timer');
var fizzBuzzDisplay = document.querySelector('.fizzBuzz');
var startTime;
var updatedTime;
var difference;
var tInterval;
var savedTime;
var paused = false;
var running = false;

// function changePage() {
//   if (window.location.href === "https://1onyng.github.io/fizzBuzzTime/index.html") {
//     sessionStorage.setItem("fizz", document.getElementById("fizz").value);
//     sessionStorage.setItem("buzz", document.getElementById("buzz").value);
//     window.location.href = "timer.html";
//   } else {
//     window.location.href = "index.html"
//   }
// } 

function changePage() {
  if (window.location.pathname === "/Users/tonyng/Desktop/fizzbuzztime/index.html") {
    var fizz = document.getElementById("fizz").value;
    var buzz = document.getElementById("buzz").value;
    if (isNaN(fizz) || isNaN(buzz)) {
      alert("Fizz and Buzz need to be a number. Please try again.");
    } else if (fizz < 2 || fizz > 10 || buzz < 2 || buzz > 10) {
      alert("Fizz and Buzz need to be within the prescribed range. Please try again.")
    } else {
      sessionStorage.setItem("fizz", fizz);
      sessionStorage.setItem("buzz", buzz);
      window.location.href = "timer.html";
    }
  } else {
    window.location.href = "index.html"
  }
} 

function fizzBuzz(hr, min, sec) {
  let minSec = min * 60;
  let hrSec = hr * 60 * 60;
  let totalSec = minSec + hrSec + sec;
  var fizz = sessionStorage.getItem("fizz");
  var buzz = sessionStorage.getItem("buzz");

  if (totalSec % fizz == 0 && totalSec % buzz == 0) {
    fizzBuzzDisplay.innerHTML = "fizzbuzz";
  } else if (totalSec % fizz == 0) {
    fizzBuzzDisplay.innerHTML = "fizz";
  } else if (totalSec % buzz == 0) {
    fizzBuzzDisplay.innerHTML = "buzz";
  } else {
    fizzBuzzDisplay.innerHTML = "";
  }
}

function startTimer() {
  if (!running) {
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1000);
    paused = false;
    running = true;
  }
}
function pauseTimer() {
  if (!difference) {
    // if timer never started, don't allow pause button to do anything
  } else if (!paused) {
    clearInterval(tInterval);
    savedTime = difference;
    paused = true;
    running = false;
  } else {
    resetTimer();
  }
}

function resetTimer() {
  clearInterval(tInterval);
  savedTime = 0;
  difference = 0;
  paused = false;
  running = false;
  timerDisplay.innerHTML = '0:00:00';
  fizzBuzzDisplay.innerHTML = '';
}

function getShowTime() {
  updatedTime = new Date().getTime();
  if (savedTime) {
    difference = (updatedTime - startTime) + savedTime;
  } else {
    difference = updatedTime - startTime;
  }
  var hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((difference % (1000 * 60)) / 1000);

  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  if (hours === 9 && minutes === 59 && seconds === 59) {
    resetTimer();
    alert("Timer has expired.");
  }
  else {
    timerDisplay.innerHTML = hours + ':' + minutes + ':' + seconds;
    fizzBuzz(hours, minutes, seconds);
  }
}