const QUESTIONS = [
  {
    text: "What is the highest point of the Piacenza Hills?",
    options: ["800 meters", "1200 meters", "600 meters", "400 meters"],
    correct: 1,
    hint: "It is located in the highest area of the Piacenza region."
  },
  {
    text: "Which river runs through the Piacenza Hills?",
    options: ["Po", "Trebbia", "Nure", "Tidone"],
    correct: 1,
    hint: "This river is known for its crystal-clear waters."
  },
  {
    text: "What local products are most common in the Piacenza Hills?",
    options: ["Parmigiano", "Cured meats", "Wine", "Truffles"],
    correct: 2,
    hint: "This area is famous for producing high-quality wines."
  },
];

let currentStep = 0;
let score = 0;
let timeLeft = 0; // Timer starts at 0
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
  alert("Treasure Hunt of the Piacenza Hills - A game to discover local treasures!");
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft++;
    const hours = String(Math.floor(timeLeft / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, '0');
    const seconds = String(timeLeft % 60).padStart(2, '0');
    document.getElementById('status-bar').innerText = `Time: ${hours}:${minutes}:${seconds}`;

    if (timeLeft >= 86400) { // Timer does not exceed 24 hours
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
    feedback.innerText = 'Correct!';
    feedback.className = 'correct';
  } else {
    feedback.innerText = 'Incorrect';
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
  document.getElementById('final-score').innerText = `Your final score: ${score} points`;
}

function resetGame() {
  currentStep = 0;
  score = 0;
  timeLeft = 0;
  document.getElementById('game-end').style.display = 'none';
  document.getElementById('game-info').style.display = 'block';
  document.getElementById('start-btn').style.display = 'inline-block';
}
