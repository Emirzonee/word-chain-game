import React, { useState, useEffect } from 'react';
import wordList from './english-words.json';
import './App.css';
import Navbar from '/src/Navbar.jsx';

const App = () => {
  const [word, setWord] = useState('');
  const [usedWords, setUsedWords] = useState([]);
  const [message, setMessage] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [totalTime, setTotalTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    const saved = localStorage.getItem('bestScore');
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => {
    if (gameOver) return;

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          setMessage({ text: 'Game Over! Time ran out.', type: 'error' });
          return 0;
        }
        return prev - 1;
      });
      setTotalTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [gameOver]);

  const restartGame = () => {
    setWord('');
    setUsedWords([]);
    setMessage(null);
    setScore(0);
    setTimer(15);
    setTotalTime(0);
    setGameOver(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const lowerWord = word.trim().toLowerCase();

    if (!lowerWord) {
      setMessage({ text: 'Please enter a word', type: 'error' });
      return;
    }

    if (!wordList.includes(lowerWord)) {
      setMessage({ text: `"${word}" is not a valid word.`, type: 'invalid' });
      return;
    }

    if (usedWords.includes(lowerWord)) {
      setMessage({ text: 'This word has already been used.', type: 'used' });
      return;
    }

    if (usedWords.length > 0 && lowerWord[0] !== usedWords[usedWords.length - 1].slice(-1)) {
      setMessage({ 
        text: `Word must start with "${usedWords[usedWords.length - 1].slice(-1).toUpperCase()}"`,
        type: 'error'
      });
      return;
    }

    setUsedWords([...usedWords, lowerWord]);
    setScore(prev => prev + lowerWord.length);
    setMessage({
      text: `Next word must start with "${lowerWord.slice(-1).toUpperCase()}"`,
      type: 'success'
    });
    setWord('');
    setTimer(15);
  };

  if (gameOver) {
    const longestWord = usedWords.reduce((a, b) => (a.length > b.length ? a : b), '');
    const isHighScore = score > bestScore;

    // REKOR KONTROLÜ VE KAYDI (EN KRİTİK KISIM)
    if (isHighScore) {
      localStorage.setItem('bestScore', score.toString());
      setBestScore(score); // <- State güncellemesi şart!
      console.log("Yeni rekor kaydedildi:", score); // Debug
    }

    return (
      <div className="game-over-container">
        {/* TEBRİKLER MESAJI (BU KISIM ÇALIŞACAK) */}
        {isHighScore && (
          <div className="high-score-banner">
            🎉 TEBRİKLER! YENİ REKOR: {score} 🎉
          </div>
        )}

        <div className="stats-container">
          <div className="stat-item">
            <span>Total Time:</span>
            <strong>{totalTime}s</strong>
          </div>
          <div className="stat-item">
            <span>Word Count:</span>
            <strong>{usedWords.length}</strong>
          </div>
          <div className="stat-item">
            <span>Your Score:</span>
            <strong>{score}</strong>
          </div>
          <div className="stat-item">
            <span>Best Score:</span>
            <strong>{bestScore}</strong>
          </div>
          <div className="stat-item">
            <span>Longest Word:</span>
            <strong>{longestWord.toUpperCase()} ({longestWord.length} letters)</strong>
          </div>
        </div>

        <div className="words-used-container">
          <h3>Words Used:</h3>
          <div className="word-chips">
            {usedWords.map((w, i) => (
              <span key={i} className="word-chip">
                {w.toUpperCase()}
              </span>
            ))}
          </div>
        </div>

        <button className="restart-button" onClick={restartGame}>
          🔁 Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="game-container">
      <h1 className="game-title">Word Chain Game 🔤</h1>
      
      <div className="stats-container">
        <div className="stat-item">
          <span>Score:</span>
          <strong>{score}</strong>
        </div>
        <div className="stat-item">
          <span>Time Left:</span>
          <strong>{timer}s</strong>
        </div>
        <div className="stat-item">
          <span>Total Time:</span>
          <strong>{totalTime}s</strong>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="word-form">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word..."
          autoFocus
          className="word-input"
        />
        <button type="submit" className="submit-button">Submit</button>
      </form>

      {message && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      {usedWords.length > 0 && (
        <div className="words-used-container">
          <h3>Current Chain:</h3>
          <div className="word-chips">
            {usedWords.map((w, i) => (
              <span key={i} className="word-chip">
                {w.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;