import React, { useState, useEffect } from 'react';
import { Timer, HelpCircle, MapPin, Award } from 'lucide-react';

const QUESTIONS = [
  {
    id: 1,
    text: "Qual è l'altezza massima dei Colli Piacentini?",
    options: ["800 metri", "1200 metri", "600 metri", "400 metri"],
    correct: 1,
    hint: "Si trova nella zona più elevata del territorio piacentino",
  },
  {
    id: 2,
    text: "Qual è il fiume principale che attraversa i Colli Piacentini?",
    options: ["Po", "Trebbia", "Nure", "Tidone"],
    correct: 1,
    hint: "Questo fiume è famoso per le sue acque cristalline",
  },
  {
    id: 3,
    text: "Quali prodotti tipici sono più diffusi nei Colli Piacentini?",
    options: ["Parmigiano", "Salumi", "Vino", "Tartufi"],
    correct: 2,
    hint: "Questa zona è rinomata per la produzione di vini pregiati",
  },
];

const TreasureHunt = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minuti per il gioco
  const [showHint, setShowHint] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    let timer;
    if (gameStarted && timeLeft > 0 && !gameEnded) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setGameEnded(true);
    }
    return () => clearInterval(timer);
  }, [gameStarted, timeLeft, gameEnded]);

  const handleAnswer = (selectedIndex) => {
    if (selectedIndex === QUESTIONS[currentStep].correct) {
      setScore((prev) => prev + 100);
    }

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep((prev) => prev + 1);
      setShowHint(false);
    } else {
      setGameEnded(true);
    }
  };

  const resetGame = () => {
    setCurrentStep(0);
    setScore(0);
    setTimeLeft(300);
    setGameStarted(false);
    setGameEnded(false);
  };

  const renderGameContent = () => {
    if (!gameStarted) {
      return (
        <div className="game-container">
          <h2>Caccia al Tesoro dei Colli Piacentini</h2>
          <p>Scopri la bellezza dei Colli Piacentini attraverso un divertente quiz!</p>
          <button onClick={() => setGameStarted(true)}>Inizia l'Avventura</button>
        </div>
      );
    }

    if (gameEnded) {
      return (
        <div className="game-container">
          <Award size={64} />
          <h2>Gioco Completato!</h2>
          <p>Il tuo punteggio: {score} punti</p>
          <button onClick={resetGame}>Ricomincia</button>
        </div>
      );
    }

    const currentQuestion = QUESTIONS[currentStep];

    return (
      <div className="game-container">
        <div className="status-bar">
          <div>
            <Timer /> {Math.floor(timeLeft / 60)}:{timeLeft % 60}
          </div>
          <div>
            <MapPin /> Tappa {currentStep + 1}/{QUESTIONS.length}
          </div>
        </div>
        <h2>{currentQuestion.text}</h2>
        <div className="options">
          {currentQuestion.options.map((option, index) => (
            <button key={index} onClick={() => handleAnswer(index)}>
              {option}
            </button>
          ))}
        </div>
        <button onClick={() => setShowHint(!showHint)}>
          <HelpCircle /> {showHint ? 'Nascondi Suggerimento' : 'Mostra Suggerimento'}
        </button>
        {showHint && <p>{currentQuestion.hint}</p>}
      </div>
    );
  };

  return <div className="game-wrapper">{renderGameContent()}</div>;
};

export default TreasureHunt;
