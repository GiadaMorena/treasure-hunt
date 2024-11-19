const QUESTIONS = [
  {
    text: "Qual è l'altezza massima dei Colli Piacentini?",
    options: ["800 metri", "1200 metri", "600 metri", "400 metri"],
    correct: 1,
    hint: "Si trova nella zona più elevata del territorio piacentino"
  },
  {
    text: "Qual è il fiume principale che attraversa i Colli Piacentini?",
    options: ["Po", "Trebbia", "Nure", "Tidone"],
    correct: 1,
    hint: "Questo fiume è famoso per le sue acque cristalline"
  },
  {
    text: "Quali prodotti tipici sono più diffusi nei Colli Piacentini?",
    options: ["Parmigiano", "Salumi", "Vino", "Tartufi"],
    correct: 2,
    hint: "Questa zona è rinomata per la produzione di vini pregiati"
  },
];

let currentStep = 0;
let score = 0;
let timeElapsed = 0; // Timer in secondi
let timer;
let gameStarted = false;

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('hint-btn').addEventListener('click', toggleHint);
document.getElementById('reset-btn').addEventListener('click', resetGame);

function startGame() {
  gameStarted = true;
  document.getElementById('game-info').style.display = 'none';
  document.getElementById('start-btn').style.display = 'none';
  document.getElementById('game-content').style.display = 'block';
  startTimer();
  showQuestion();
}

function startTimer() {
  timer = setInterval(() => {
    timeElapsed++;
    updateTimerDisplay();
    if (timeElapsed >= 86400) { // 24 ore in secondi
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const hours = Math.floor(timeElapsed / 3600);
  const minutes = Math.floor((timeElapsed % 3600) / 60);
  const seconds = timeElapsed % 60;
  document.getElementById('status-bar').innerText = `Tempo: ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function showQuestion() {
  const question = QUESTIONS[currentStep];
  document.getElementById('question-text').innerText = question.text;

  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';
  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.innerText = option;
    button.addEventListener('click', () => handleAnswer(index));
    optionsDiv.appendChild(button);
  });
}

function handleAnswer(selectedIndex) {
  const question = QUESTIONS[currentStep];
  if (selectedIndex === question.correct) {
    score += 100;
  }

  if (currentStep < QUESTIONS.length - 1) {
    currentStep++;
    showQuestion();
  } else {
    endGame();
  }
}

function endGame() {
  clearInterval(timer);
  document.getElementById('game-content').style.display = 'none';
  document.getElementById('game-end').style.display = 'block';
  document.getElementById('final-score').innerText = `Il tuo punteggio: ${score} punti`;
}

function resetGame() {
  currentStep = 0;
  score = 0;
  timeElapsed = 0;
  gameStarted = false;
  document.getElementById('game-end').style.display = 'none';
  document.getElementById('game-info').style.display = 'block';
  document.getElementById('start-btn').style.display = 'block';
  clearInterval(timer);
}

function toggleHint() {
  const hintText = QUESTIONS[currentStep].hint;
  const hintElement = document.getElementById('hint');
  hintElement.style.display = hintElement.style.display === 'none' ? 'block' : 'none';
  hintElement.innerText = hintText;
}
