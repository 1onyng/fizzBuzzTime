var startTimerButton = document.querySelector('.startTimer');
var pauseTimerButton = document.querySelector('.pauseTimer');
var timerDisplay = document.querySelector('.timer');
var startTime;
var updatedTime;
var difference;
var tInterval;
var savedTime;
var paused = false;
var running = false;

function startTimer() {
  if (!running) {
    startTime = new Date().getTime();
    tInterval = setInterval(getShowTime, 1000);
    paused = false;
    running = true;
    // timerDisplay.style.background = "#FF0000";
    // timerDisplay.style.cursor = "auto";
    // timerDisplay.style.color = "yellow";
    // startTimerButton.classList.add('lighter');
    // pauseTimerButton.classList.remove('lighter');
    // startTimerButton.style.cursor = "auto";
    // pauseTimerButton.style.cursor = "pointer";
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
    // timerDisplay.style.background = "#A90000";
    // timerDisplay.style.color = "#690000";
    // timerDisplay.style.cursor = "pointer";
    // startTimerButton.classList.remove('lighter');
    // pauseTimerButton.classList.add('lighter');
    // startTimerButton.style.cursor = "pointer";
    // pauseTimerButton.style.cursor = "auto";
  } else {
    // if the timer was already paused, when they click pause again, start the timer again
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
  // timerDisplay.style.background = "#A90000";
  // timerDisplay.style.color = "#fff";
  // timerDisplay.style.cursor = "pointer";
  // startTimerButton.classList.remove('lighter');
  // pauseTimerButton.classList.remove('lighter');
  // startTimerButton.style.cursor = "pointer";
  // pauseTimerButton.style.cursor = "auto";
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

  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;

  if (hours === 9 && minutes === 59 && seconds === 59) {
    resetTimer();
  }
  else {
    timerDisplay.innerHTML = hours + ':' + minutes + ':' + seconds;
  }
}