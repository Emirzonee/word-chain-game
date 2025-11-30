import React, { useState } from 'react';

const HighScores = () => {
  const [scores, setScores] = useState(() => {
    const saved = localStorage.getItem('allScores');
    return saved ? JSON.parse(saved) : [];
  });

  const bestScore = localStorage.getItem('bestScore') || 0;
  const sortedScores = [...scores].sort((a, b) => b - a).slice(0, 10);

  return (
    <div className="game-container">
      <h1 className="game-title">High Scores 🏆</h1>
      
      <div className="stat-item" style={{ marginBottom: '2rem' }}>
        <span>Best Score</span>
        <strong>{bestScore}</strong>
      </div>

      <div className="scores-list">
        <h3>Top 10 Scores:</h3>
        {sortedScores.length > 0 ? (
          sortedScores.map((score, index) => (
            <div key={index} className="score-item">
              #{index + 1}: <strong>{score}</strong> points
            </div>
          ))
        ) : (
          <p>No scores recorded yet</p>
        )}
      </div>
    </div>
  );
};

export default HighScores;