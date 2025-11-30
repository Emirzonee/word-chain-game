import React, { useState, useEffect } from 'react';
import wordList from '../english-words.json';

const Game = () => {
  const [word, setWord] = useState('');
  const [usedWords, setUsedWords] = useState([]);
  const [message, setMessage] = useState('');
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15);
  const [totalTime, setTotalTime] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [bestScore, setBestScore] = useState(() => {
    return parseInt(localStorage.getItem('bestScore')) || 0;
  });

  // Timer logic
  useEffect(() => {
    if (gameOver) return;

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          setMessage('Game Over! Time ran out.');
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
    setMessage('');
    setScore(0);
    setTimer(15);
    setTotalTime(0);
    setGameOver(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const lowerWord = word.trim().toLowerCase();

    if (!lowerWord) {
      setMessage('Please enter a word');
      return;
    }

    if (!wordList.includes(lowerWord)) {
      setMessage(`"${word}" is not a valid word.`);
      return;
    }

    if (usedWords.includes(lowerWord)) {
      setMessage('This word has already been used.');
      return;
    }

    if (usedWords.length > 0 && lowerWord[0] !== usedWords[usedWords.length - 1].slice(-1)) {
      setMessage(`Word must start with "${usedWords[usedWords.length - 1].slice(-1).toUpperCase()}"`);
      return;
    }

    setUsedWords([...usedWords, lowerWord]);
    setScore((prev) => prev + lowerWord.length);
    setMessage(`Next word must start with "${lowerWord.slice(-1).toUpperCase()}"`);
    setWord('');
    setTimer(15);
  };

  if (gameOver) {
    const longestWord = usedWords.reduce((a, b) => (a.length > b.length ? a : b), '');
    const isHighScore = score > bestScore;

    if (isHighScore) {
      localStorage.setItem('bestScore', score);
      setBestScore(score);
    }

    return (
      <div className="game-container">
        <h2>Game Over 🎮</h2>

        {isHighScore && (
          <div className="high-score-banner">
            🎉 Congratulations! New High Score!
          </div>
        )}

        <div className="stats-container">
          <p><strong>Total Time:</strong> {totalTime}s</p>
          <p><strong>Word Count:</strong> {usedWords.length}</p>
          <p><strong>Your Score:</strong> {score}</p>
          <p><strong>Best Score:</strong> {bestScore}</p>
          <p><strong>Longest Word:</strong> {longestWord.toUpperCase()} ({longestWord.length} letters)</p>
        </div>

        <div className="words-used">
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
      <h1>Word Chain Game 🔤</h1>
      
      <div className="stats-row">
        <div className="stat-box">
          <span>Score</span>
          <strong>{score}</strong>
        </div>
        <div className="stat-box">
          <span>Time Left</span>
          <strong>{timer}s</strong>
        </div>
        <div className="stat-box">
          <span>Total Time</span>
          <strong>{totalTime}s</strong>
        </div>
        <div className="stat-box">
          <span>Words</span>
          <strong>{usedWords.length}</strong>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="word-form">
        <input
          type="text"
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Enter a word..."
          autoFocus
        />
        <button type="submit">Submit</button>
      </form>

      {message && (
        <div className={`message ${message.includes('must start') ? 'info' : 
                        message.includes('valid') || message.includes('already') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      {usedWords.length > 0 && (
        <div className="words-used">
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

export default Game;