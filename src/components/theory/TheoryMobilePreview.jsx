import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import './TheoryMobilePreview.css';
import TheoryTopicListView from './TheoryTopicListView';

export default function TheoryMobilePreview({ formData }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [showListView, setShowListView] = useState(false);

  const handleMarkComplete = () => {
    setIsCompleted(true);
  };

  const handleBackClick = () => {
    setShowListView(true);
  };

  const handleBackToList = () => {
    setShowListView(false);
  };

  if (showListView) {
    return (
      <TheoryTopicListView 
        formData={formData}
        onBack={handleBackToList}
      />
    );
  }

  return (
    <div className="theory-mobile-preview-container">
      <div className="theory-mobile-frame">
        {/* Phone Status Bar */}
        <div className="theory-mobile-status-bar">
          <div className="theory-mobile-status-time">9:41</div>
          <div className="theory-mobile-status-icons">
            <div className="theory-mobile-status-icon"></div>
            <div className="theory-mobile-status-icon"></div>
            <div className="theory-mobile-status-icon"></div>
          </div>
        </div>

        {/* Phone Content */}
        <div className="theory-mobile-content">
          {/* Header */}
          <div className="theory-mobile-header">
            <div className="theory-mobile-back-button" onClick={handleBackClick}>
              <ArrowLeft size={18} color="#7A4D3A" />
            </div>
            <div className="theory-mobile-title">
              {formData.subTopic || 'Sub Topic Name'}
            </div>
          </div>

          {/* Image */}
          {formData.image && (
            <div className="theory-mobile-image-container">
              <img 
                src={formData.image} 
                alt={formData.subTopic || 'Theory'} 
                className="theory-mobile-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Description (if no notes) */}
          {formData.description && (!formData.notes || formData.notes.trim().length === 0) && (
            <div className="theory-mobile-description">
              {formData.description}
            </div>
          )}

          {/* Notes Section */}
          {formData.notes && formData.notes.trim().length > 0 ? (
            <div className="theory-mobile-notes-container">
              <div className="theory-mobile-notes-title">Notes</div>
              <div className="theory-mobile-notes-text">
                {formData.notes}
              </div>
            </div>
          ) : (
            <div className="theory-mobile-notes-container theory-mobile-notes-empty">
              <div className="theory-mobile-notes-title">Notes</div>
              <div className="theory-mobile-notes-text theory-mobile-notes-placeholder">
                Enter notes to see preview here...
              </div>
            </div>
          )}

          {/* Mark as Complete Button */}
          <div 
            className={`theory-mobile-complete-button ${isCompleted ? 'theory-mobile-complete-button-done' : ''}`}
            onClick={!isCompleted ? handleMarkComplete : undefined}
            style={{ cursor: isCompleted ? 'default' : 'pointer' }}
          >
            {isCompleted ? 'Completed ✔' : 'Mark as Complete'}
          </div>
        </div>
      </div>
    </div>
  );
}

