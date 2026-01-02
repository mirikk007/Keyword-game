const words = [
  "future", "neural", "intelligence", "data", "vision", "speed", "robot", "machine", 
  "network", "mind", "brain", "logic", "system", "energy", "human", "ai", 
  "cyber", "code", "digital", "think", "smart", "virtual", "core", "deep", 
  "matrix", "signal", "pattern", "input", "output", "memory"
];

let timeLeft, timer, currentWord, correct = 0, wrong = 0, paused = false;

const menu = document.getElementById('menu');
const game = document.getElementById('game');
const result = document.getElementById('result');
const wordBox = document.getElementById('wordBox');
const input = document.getElementById('input');
const timerEl = document.getElementById('timer');
const correctEl = document.getElementById('correct');
const wrongEl = document.getElementById('wrong');
const finalCorrect = document.getElementById('finalCorrect');
const finalWrong = document.getElementById('finalWrong');

document.getElementById('startBtn').addEventListener('click', startGame);
document.getElementById('restartBtn').addEventListener('click', startGame);
document.getElementById('pauseBtn').addEventListener('click', togglePause);
document.getElementById('playAgainBtn').addEventListener('click', () => {
  result.classList.add('hidden');
  menu.classList.remove('hidden');
});

function randomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

function startGame() {
  const timeSelect = document.getElementById('time');
  timeLeft = parseInt(timeSelect.value);
  correct = 0; wrong = 0; paused = false;
  correctEl.textContent = wrongEl.textContent = 0;

  menu.classList.add('hidden');
  game.classList.remove('hidden');
  result.classList.add('hidden');
  input.disabled = false;
  input.focus();
  

  currentWord = randomWord();
  wordBox.textContent = currentWord;
  timerEl.textContent = `⏱ Осталось: ${timeLeft}`;

  clearInterval(timer);
  timer = setInterval(() => {
    if (!paused) {
      timeLeft--;
      timerEl.textContent = `⏱ Осталось: ${timeLeft}`;
      if (timeLeft <= 0) endGame();
    }
  }, 1000);
}

input.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && !paused) {
    e.preventDefault();
    checkWord();
  }
});

function checkWord() {
  if (input.value.trim().toLowerCase() === currentWord.toLowerCase()) {
    correct++;
    correctEl.textContent = correct;
    flashEffect('correct');
  } else {
    wrong++;
    wrongEl.textContent = wrong;
    flashEffect('wrong');
  }
  input.value = '';
  currentWord = randomWord();
  wordBox.textContent = currentWord;
}

function flashEffect(type) {
  wordBox.classList.add(type);
  setTimeout(() => wordBox.classList.remove(type), 300);
}

function togglePause() {
  paused = !paused;
  document.getElementById('pauseBtn').textContent = paused ? "▶ Продолжить" : "⏸ Пауза";
  input.disabled = paused;
}

function endGame() {
  clearInterval(timer);
  game.classList.add('hidden');
  result.classList.remove('hidden');
  finalCorrect.textContent = correct;
  finalWrong.textContent = wrong;
}