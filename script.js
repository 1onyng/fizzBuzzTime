let timerDisplay = document.querySelector('.timer'); 
let fizzBuzzDisplay = document.querySelector('.fizzBuzz'); 
let stopped = false; 
let running = false;
let startTime;
let updatedTime;
let diffTime;
let tInterval;
let savedTime; 

function changePage() {
  if (window.location.href === "/https://1onyng.github.io/fizzBuzzTime/index.html") {
    //window.location.pathname === "/Users/tonyng/Desktop/fizzbuzztime/index.html" for local testing
    let fizz = document.getElementById("fizz").value;
    let buzz = document.getElementById("buzz").value;
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
  let fizz = sessionStorage.getItem("fizz");
  let buzz = sessionStorage.getItem("buzz");

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
    tInterval = setInterval(showTime, 1000);
    stopped = false;
    running = true;
  }
}

function stopTimer() {
  if (!stopped) {
    clearInterval(tInterval);
    savedTime = diffTime;
    stopped = true;
    running = false;
  } else {
    resetTimer();
  }
}

function resetTimer() {
  clearInterval(tInterval);
  savedTime = 0;
  diffTime = 0;
  stopped = false;
  running = false;
  timerDisplay.innerHTML = '0:00:00';
  fizzBuzzDisplay.innerHTML = '';
}

function showTime() {
  updatedTime = new Date().getTime();

  if (savedTime) {
    diffTime = (updatedTime - startTime) + savedTime;
  } else {
    diffTime = updatedTime - startTime;
  }

  let hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((diffTime % (1000 * 60)) / 1000);

  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  if (hours === 9 && minutes === 59 && seconds === 59) {
    resetTimer();
    alert("Timer has expired.");
  } else {
    timerDisplay.innerHTML = hours + ':' + minutes + ':' + seconds;
    fizzBuzz(hours, minutes, seconds);
  }
}