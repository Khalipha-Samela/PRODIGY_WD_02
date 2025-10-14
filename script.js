// DOM elements
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const millisecondsElement = document.getElementById('milliseconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

// Stopwatch variables
let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 0;
let lastLapTime = 0;

// Format helpers
function formatTime(time) {
  return time.toString().padStart(2, '0');
}

function formatMilliseconds(time) {
  return time.toString().padStart(2, '0');
}

// Update display
function updateDisplay() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;

  const totalMilliseconds = elapsedTime;
  const totalSeconds = Math.floor(totalMilliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const milliseconds = Math.floor((totalMilliseconds % 1000) / 10);

  minutesElement.textContent = formatTime(minutes);
  secondsElement.textContent = formatTime(seconds);
  millisecondsElement.textContent = '.' + formatMilliseconds(milliseconds);
}

// Start stopwatch
function startStopwatch() {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateDisplay, 10);
    isRunning = true;

    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled = false;
  }
}

// Pause stopwatch
function pauseStopwatch() {
  if (isRunning) {
    clearInterval(timerInterval);
    isRunning = false;

    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }
}

// Reset stopwatch
function resetStopwatch() {
  clearInterval(timerInterval);
  isRunning = false;
  elapsedTime = 0;
  lapCount = 0;
  lastLapTime = 0;

  minutesElement.textContent = '00';
  secondsElement.textContent = '00';
  millisecondsElement.textContent = '.00';
  lapsList.innerHTML = '<div class="no-laps">No laps recorded yet</div>';

  startBtn.disabled = false;
  pauseBtn.disabled = true;
  lapBtn.disabled = true;
}

// Record lap
function recordLap() {
  if (isRunning) {
    lapCount++;
    const currentLapTime = elapsedTime;
    const lapDuration = currentLapTime - lastLapTime;

    const lapItem = document.createElement('div');
    lapItem.className = 'lap-item';

    const totalSeconds = Math.floor(currentLapTime / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((currentLapTime % 1000) / 10);

    const lapDurationSeconds = Math.floor(lapDuration / 1000);
    const lapMinutes = Math.floor(lapDurationSeconds / 60);
    const lapSeconds = lapDurationSeconds % 60;
    const lapMilliseconds = Math.floor((lapDuration % 1000) / 10);

    lapItem.innerHTML = `
      <span class="lap-number">${formatTime(lapCount)}</span>
      <span class="lap-time">${formatTime(minutes)}:${formatTime(seconds)}.${formatMilliseconds(milliseconds)}</span>
      <span class="lap-duration">+${formatTime(lapMinutes)}:${formatTime(lapSeconds)}.${formatMilliseconds(lapMilliseconds)}</span>
    `;

    if (lapsList.querySelector('.no-laps')) {
      lapsList.innerHTML = '';
    }

    lapsList.prepend(lapItem);
    lastLapTime = currentLapTime;
  }
}

// Event listeners
startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

// Initial button states
pauseBtn.disabled = true;
lapBtn.disabled = true;
