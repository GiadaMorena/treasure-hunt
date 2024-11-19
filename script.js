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
let timeLeft = 300; // 5 minuti per il gioco
let timer;

document.getElementById('start-btn').addEventListener('click', startGame);

function startGame() {
  document.getElementById('game-info').style.display = 'none';
  document.getElementById('start-btn').style.display = 'none';
  document.getElementById('game-content').style.display = 'block';
  startTimer();
  showQuestion();
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('status-bar').innerText = `Tempo: ${Math.floor(timeLeft / 60)}:${timeLeft % 60}`;
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

document.getElementById('reset-btn').addEventListener('click', () => {
  currentStep = 0;
  score = 0;
  timeLeft = 300;
  document.getElementById('game-end').style.display = 'none';
  document.getElementById('game-info').style.display = 'block';
  document.getElementById('start-btn').style.display = 'block';
});
