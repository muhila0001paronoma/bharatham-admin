import React from 'react';
import { ArrowLeft, Clock } from 'lucide-react';
import './QuizMobilePreview.css';

export default function QuizMobilePreview({ formData, backgroundImage, questionData }) {
  const totalQuestions = formData.totalQuestions || 5;
  const currentQuestion = 1;
  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  
  // Default background image matching frontend
  const defaultBgImage = backgroundImage || 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80';
  
  // Use question data if provided, otherwise use sample
  const questionText = questionData?.question || 'Sample question text will appear here. This is how the question will look on mobile devices.';
  const options = questionData?.options || ['Option 1', 'Option 2 (Selected)', 'Option 3', 'Option 4'];
  const timeLeft = questionData?.timeLeft || 30;

  return (
    <div className="quiz-mobile-preview-container">
      <div className="quiz-mobile-frame">
        {/* Phone Status Bar */}
        <div className="quiz-mobile-status-bar">
          <div className="quiz-mobile-status-time">9:41</div>
          <div className="quiz-mobile-status-icons">
            <div className="quiz-mobile-status-icon"></div>
            <div className="quiz-mobile-status-icon"></div>
            <div className="quiz-mobile-status-icon"></div>
          </div>
        </div>

        {/* Phone Content with Background */}
        <div className="quiz-mobile-content-wrapper">
          <div 
            className="quiz-mobile-background-image"
            style={{ 
              backgroundImage: `url(${defaultBgImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat'
            }}
          ></div>
          <div className="quiz-mobile-content">
            {/* Header */}
            <div className="quiz-mobile-header">
              <div className="quiz-mobile-back-button">
                <ArrowLeft size={20} color="#FFFFFF" />
              </div>
              <div className="quiz-mobile-title">
                {formData.title || 'Quiz Title'}
              </div>
              <div className="quiz-mobile-header-spacer"></div>
            </div>

            {/* Progress Bar */}
            <div className="quiz-mobile-progress-container">
              <div className="quiz-mobile-progress-bar">
                <div 
                  className="quiz-mobile-progress-fill" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="quiz-mobile-progress-text">
                Question {currentQuestion} of {totalQuestions}
              </div>
            </div>

            {/* Question Card */}
            <div className="quiz-mobile-question-card">
              <div className="quiz-mobile-timer-container">
                <Clock size={16} color="#FFFFFF" />
                <span className="quiz-mobile-timer-text">{timeLeft}s</span>
              </div>

              <div className="quiz-mobile-question-text">
                {questionText}
              </div>

              {/* Options */}
              <div className="quiz-mobile-options-container">
                {options.map((option, index) => (
                  <div 
                    key={index}
                    className={`quiz-mobile-option ${index === 1 ? 'quiz-mobile-option-selected' : ''}`}
                  >
                    <span className="quiz-mobile-option-text">
                      {String.fromCharCode(65 + index)}. {option}
                    </span>
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="quiz-mobile-submit-button">
                Next Question
              </div>
            </div>

            {/* Notes Section (if provided) */}
            {formData.notes && formData.notes.trim().length > 0 && (
              <div className="quiz-mobile-notes-container">
                <div className="quiz-mobile-notes-title">Notes</div>
                <div className="quiz-mobile-notes-text">
                  {formData.notes}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

