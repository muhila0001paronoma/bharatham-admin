import React from 'react';
import './QuizMobilePreview.css';

export default function QuizMobilePreview({ formData, backgroundImage, questionData }) {
  const totalQuestions = formData.totalQuestions || 5;
  const currentQuestion = 1;

  // Handle different data formats from Theory and Technique quizzes
  let questionText = '';
  let options = [];

  if (questionData?.question) {
    // Theory Quiz format
    questionText = questionData.question;
    options = questionData.options || ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  } else if (formData?.question) {
    // Technique Quiz format
    questionText = formData.question;
    options = [
      formData.answer1 || 'Option 1',
      formData.answer2 || 'Option 2',
      formData.answer3 || 'Option 3',
      formData.answer4 || 'Option 4'
    ].filter(opt => opt.trim()); // Filter out empty options
  } else {
    // Default preview
    questionText = 'Sample question text will appear here. This is how the question will look on mobile devices.';
    options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  }

  const timeLeft = questionData?.timeLeft || 30;
  const selectedOption = 1; // Default selected option for preview
  const notes = formData?.notes || formData?.explanation || '';

  return (
    <div className="quiz-mobile-preview-container">
      <div className="quiz-mobile-frame">
        {/* Phone Status Bar */}
        <div className="quiz-mobile-status-bar">
          <div className="quiz-mobile-status-time">10:48</div>
          <div className="quiz-mobile-status-icons">
            <div className="quiz-mobile-status-icon"></div>
            <div className="quiz-mobile-status-icon"></div>
            <div className="quiz-mobile-status-icon"></div>
          </div>
        </div>

        {/* Phone Content */}
        <div className="quiz-mobile-content">
          {/* Progress Section */}
          <div className="quiz-mobile-header">
            <div className="quiz-mobile-progress-container">
              <div className="quiz-mobile-progress-text">
                Question {currentQuestion} of {totalQuestions}
              </div>
              <div className="quiz-mobile-progress-bar">
                <div
                  className="quiz-mobile-progress-fill"
                  style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
                />
              </div>
            </div>
            <div className="quiz-mobile-stats-container">
              <div className="quiz-mobile-stat-item">
                <div className="quiz-mobile-stat-value">0</div>
                <div className="quiz-mobile-stat-label">Score</div>
              </div>
              <div className="quiz-mobile-stat-item">
                <div className="quiz-mobile-stat-value">{timeLeft}s</div>
                <div className="quiz-mobile-stat-label">Time</div>
              </div>
            </div>
          </div>

          {/* Question Container */}
          <div className="quiz-mobile-question-container">
            <h3 className="quiz-mobile-question-title">{questionText}</h3>
          </div>

          {/* Options Container */}
          <div className="quiz-mobile-options-container">
            {options.map((option, index) => {
              let optionClass = 'quiz-mobile-option-button';
              const isSelected = selectedOption === index;

              if (isSelected) {
                optionClass += ' quiz-mobile-option-selected';
              }

              return (
                <button
                  key={index}
                  className={optionClass}
                >
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {/* Submit Button */}
          <button className="quiz-mobile-submit-button">
            Next Question
          </button>

          {/* Notes Section (if provided) */}
          {notes && notes.trim().length > 0 && (
            <div className="quiz-mobile-notes-container">
              <div className="quiz-mobile-notes-title">Explanation</div>
              <div className="quiz-mobile-notes-text">
                {notes}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
