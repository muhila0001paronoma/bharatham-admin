import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import './TheoryMobilePreview.css';
import TheoryTopicListView from './TheoryTopicListView';

export default function TheoryMobilePreview({ formData }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [showListView, setShowListView] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const images = [formData.imgUrl1, formData.imgUrl2, formData.imgUrl3].filter(Boolean);
  const displayImages = images.length > 0 ? images : [formData.image].filter(Boolean);

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
        <div className="theory-mobile-status-bar">
          <div className="theory-mobile-status-time">9:41</div>
          <div className="theory-mobile-status-icons">
            <div className="theory-mobile-status-icon"></div>
            <div className="theory-mobile-status-icon"></div>
            <div className="theory-mobile-status-icon"></div>
          </div>
        </div>

        <div className="theory-mobile-content">
          <div className="theory-mobile-header">
            <div className="theory-mobile-back-button" onClick={handleBackClick}>
              <ArrowLeft size={18} color="#7A4D3A" />
            </div>
            <div className="theory-mobile-title">
              {formData.subTopic || 'Sub Topic Name'}
            </div>
          </div>

          {displayImages.length > 0 && (
            <div className="theory-mobile-image-section">
              <div className="theory-mobile-main-image-container">
                <img 
                  src={displayImages[selectedImageIndex]} 
                  alt={formData.subTopic || 'Theory'} 
                  className="theory-mobile-main-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              {displayImages.length > 1 && (
                <div className="theory-mobile-thumbnail-container">
                  {displayImages.map((img, index) => (
                    <div
                      key={index}
                      className={`theory-mobile-thumbnail-wrapper ${
                        selectedImageIndex === index ? 'theory-mobile-thumbnail-wrapper-active' : ''
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img 
                        src={img} 
                        alt={`Thumbnail ${index + 1}`} 
                        className="theory-mobile-thumbnail"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  ))}
                </div>
              )}
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

