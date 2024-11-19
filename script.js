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
let timeLeft = 86400; // 24 ore in secondi (86400)
let timer;

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('start-nav').addEventListener('click', startGame);
document.getElementById('info-nav').addEventListener('click', showInfo);
document.getElementById('hint-btn').addEventListener('click', toggleHint);
document.getElementById('reset-btn').addEventListener('click', resetGame);

function startGame() {
  document.getElementById('game-info').style.display = 'none';
  document.getElementById('start-btn').style.display = 'none';
  document.getElementById('game-content').style.display = 'block';
  startTimer();
  showQuestion();
}

function showInfo() {
  alert("Caccia al Tesoro dei Colli Piacentini - Un gioco per scoprire i tesori locali!");
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    const hours = String(Math.floor(timeLeft / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');
    document.getElementById('status-bar').innerText = `Tempo: ${hours}:${minutes}:${seconds}`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
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
  const feedback = document.getElementById('answer-feedback');
  if (selectedIndex === question.correct) {
    score += 100;
    feedback.innerText = 'Corretto!';
    feedback.className = 'correct';
  } else {
    feedback.innerText = 'Errato, riprova!';
    feedback.className = 'incorrect';
  }

  if (currentStep < QUESTIONS.length - 1) {
    setTimeout(() => {
      feedback.innerText = '';
      currentStep++;
      showQuestion();
    }, 1000);
  } else {
    setTimeout(endGame, 1000);
  }
}

function toggleHint() {
  const currentQuestion = QUESTIONS[currentStep];
  const hint = document.getElementById('hint');
  hint.style.display = hint.style.display === 'none' ? 'block' : 'none';
  hint.innerText = currentQuestion.hint;
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
  timeLeft = 86400;
  document.getElementById('game-end').style.display = 'none';
  document.getElementById('game-info').style.display = 'block';
  document.getElementById('start-btn').style.display = 'inline-block';
}
