import React, { useState } from 'react';
import './GameMobilePreview.css';

export default function GameMobilePreview({ formData, gameQuestions = [] }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = gameQuestions[currentQuestionIndex] || null;
  const isLastQuestion = currentQuestionIndex === gameQuestions.length - 1;

  const handleAnswerSelect = (index) => {
    if (!showResult) {
      setSelectedAnswer(index);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      return;
    }
    setCurrentQuestionIndex(prev => prev + 1);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (!formData.gameName) {
    return (
      <div className="game-mobile-preview-container">
        <div className="game-mobile-frame">
          <div className="game-mobile-status-bar">
            <div className="game-mobile-status-time">10:48</div>
            <div className="game-mobile-status-icons">
              <div className="game-mobile-status-icon"></div>
              <div className="game-mobile-status-icon"></div>
              <div className="game-mobile-status-icon"></div>
            </div>
          </div>
          <div className="game-mobile-content">
            <div className="game-mobile-empty">
              Enter game details to see preview
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameQuestions.length === 0) {
    return (
      <div className="game-mobile-preview-container">
        <div className="game-mobile-frame">
          <div className="game-mobile-status-bar">
            <div className="game-mobile-status-time">10:48</div>
            <div className="game-mobile-status-icons">
              <div className="game-mobile-status-icon"></div>
              <div className="game-mobile-status-icon"></div>
              <div className="game-mobile-status-icon"></div>
            </div>
          </div>
          <div className="game-mobile-content">
            <div className="game-mobile-start-screen">
              <div className="game-mobile-preview-section">
                <div className="game-mobile-preview-image-container">
                  {formData.imgUrl ? (
                    <img src={formData.imgUrl} alt={formData.gameName} className="game-mobile-preview-image" />
                  ) : (
                    <div className="game-mobile-preview-image-placeholder">Game Image</div>
                  )}
                </div>
                <h2 className="game-mobile-preview-title">{formData.gameName}</h2>
                <p className="game-mobile-preview-description">{formData.description || 'Game description'}</p>
              </div>
              <div className="game-mobile-rules">
                <h3 className="game-mobile-rules-title">Game Rules</h3>
                <p className="game-mobile-rules-text">• Answer questions correctly to earn points</p>
                <p className="game-mobile-rules-text">• Complete all questions to finish</p>
                <p className="game-mobile-rules-text">• Your score will be saved</p>
              </div>
              <button className="game-mobile-start-button" disabled>
                Start Game
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = currentQuestion;
  const options = [
    question.answer1,
    question.answer2,
    question.answer3,
    question.answer4
  ];
  const correctIndex = parseInt(question.correctAnswer) - 1;

  return (
    <div className="game-mobile-preview-container">
      <div className="game-mobile-frame">
        <div className="game-mobile-status-bar">
          <div className="game-mobile-status-time">10:48</div>
          <div className="game-mobile-status-icons">
            <div className="game-mobile-status-icon"></div>
            <div className="game-mobile-status-icon"></div>
            <div className="game-mobile-status-icon"></div>
          </div>
        </div>

        <div className="game-mobile-content">
          <div className="game-mobile-header">
            <div className="game-mobile-progress-container">
              <div className="game-mobile-progress-text">
                Question {currentQuestionIndex + 1} of {gameQuestions.length}
              </div>
              <div className="game-mobile-progress-bar">
                <div 
                  className="game-mobile-progress-fill"
                  style={{ width: `${((currentQuestionIndex + 1) / gameQuestions.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="game-mobile-stats-container">
              <div className="game-mobile-stat-item">
                <div className="game-mobile-stat-value">0</div>
                <div className="game-mobile-stat-label">Score</div>
              </div>
              <div className="game-mobile-stat-item">
                <div className="game-mobile-stat-value">30s</div>
                <div className="game-mobile-stat-label">Time</div>
              </div>
            </div>
          </div>

          <div className="game-mobile-question-container">
            <h3 className="game-mobile-question-title">{question.question || 'What is this mudra called?'}</h3>
            <div className="game-mobile-mudra-image-container">
              {question.imgUrl ? (
                <img src={question.imgUrl} alt="Mudra" className="game-mobile-mudra-image" />
              ) : (
                <div className="game-mobile-mudra-image-placeholder">Mudra Image</div>
              )}
            </div>
          </div>

          <div className="game-mobile-options-container">
            {options.map((option, index) => {
              let optionClass = 'game-mobile-option-button';
              const isSelected = selectedAnswer === index;
              
              if (isSelected && !showResult) {
                optionClass += ' game-mobile-option-selected';
              }
              
              if (showResult && selectedAnswer === index) {
                optionClass += index === correctIndex 
                  ? ' game-mobile-option-correct' 
                  : ' game-mobile-option-wrong';
              }
              
              return (
                <button
                  key={index}
                  className={optionClass}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={showResult}
                >
                  <span className={showResult && index === correctIndex ? 'game-mobile-option-text-correct' : ''}>
                    {option}
                  </span>
                </button>
              );
            })}
          </div>

          {selectedAnswer !== null && !showResult && (
            <button 
              className="game-mobile-submit-button"
              onClick={() => setShowResult(true)}
            >
              {isLastQuestion ? 'Finish Game' : 'Next Question'}
            </button>
          )}

          {showResult && !isLastQuestion && (
            <button 
              className="game-mobile-submit-button"
              onClick={handleNext}
            >
              Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

