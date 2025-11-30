import React from 'react';

const HowToPlay = () => {
  return (
    <div className="game-container">
      <h1 className="game-title">How to Play 📖</h1>
      <div className="rules">
        <h3>Game Rules:</h3>
        <ol>
          <li>Enter a valid English word</li>
          <li>Next word must start with the last letter of previous word</li>
          <li>You have <strong>15 seconds</strong> to enter each word</li>
          <li>Longer words give more points (1 point per letter)</li>
          <li>Words cannot be repeated</li>
        </ol>
        <h3>Scoring:</h3>
        <ul>
          <li>Each letter: +1 point</li>
          <li>New high score: 🎉 Celebration!</li>
        </ul>
      </div>
    </div>
  );
};

export default HowToPlay;