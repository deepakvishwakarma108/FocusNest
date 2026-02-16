let studyTime = 25 * 60;
let breakTime = 5 * 60;
let timeLeft = studyTime;
let timerInterval;
let isRunning = false;
let isStudySession = true;

// Quotes
const quotes = [
  "Small progress is still progress 💪",
  "Stay focused, stay consistent 🎯",
  "Your future self will thank you 🙌",
  "Discipline beats motivation every time 🔥",
  "One study session can change everything 📚"
];

document.getElementById("quote").innerText =
  quotes[Math.floor(Math.random() * quotes.length)];

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  document.getElementById("timer").innerText =
    `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
}

function startTimer() {
  if (isRunning) return;

  isRunning = true;

  timerInterval = setInterval(() => {
    timeLeft--;

    if (timeLeft <= 0) {
      playSound();
      switchSession();
    }

    updateDisplay();
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  isRunning = false;
}

function resetTimer() {
  pauseTimer();
  timeLeft = studyTime;
  isStudySession = true;
  document.getElementById("sessionType").innerText = "Study Session";
  updateDisplay();
}

function switchSession() {
  if (isStudySession) {
    timeLeft = breakTime;
    document.getElementById("sessionType").innerText = "Break Time ☕";
  } else {
    timeLeft = studyTime;
    document.getElementById("sessionType").innerText = "Study Session 📖";
  }
  isStudySession = !isStudySession;
}

function setPreset(study, brk) {
  studyTime = study * 60;
  breakTime = brk * 60;
  resetTimer();
}

function setCustomTimer() {
  let studyInput = document.getElementById("studyInput").value;
  let breakInput = document.getElementById("breakInput").value;

  if (studyInput > 0) studyTime = studyInput * 60;
  if (breakInput > 0) breakTime = breakInput * 60;

  resetTimer();
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
}

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function playSound() {
  let context = new (window.AudioContext || window.webkitAudioContext)();
  let oscillator = context.createOscillator();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(800, context.currentTime);

  oscillator.connect(context.destination);
  oscillator.start();

  setTimeout(() => {
    oscillator.stop();
  }, 300);
}

updateDisplay();

