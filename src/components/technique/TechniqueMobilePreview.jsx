import React, { useState } from 'react';
import './TechniqueMobilePreview.css';

export default function TechniqueMobilePreview({ formData }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const images = [formData.imgUrl1, formData.imgUrl2, formData.imgUrl3].filter(Boolean);

  const detailPoints = formData.keyPoints
    ? formData.keyPoints
        .split(/[.\n]/)
        .map((s) => s.trim())
        .filter((s) => s.length > 10)
    : [];

  const handleMarkComplete = () => {
    setIsCompleted(true);
  };

  return (
    <div className="technique-mobile-preview-container">
      <div className="technique-mobile-frame">
        <div className="technique-mobile-status-bar">
          <div className="technique-mobile-status-time">9:41</div>
          <div className="technique-mobile-status-icons">
            <div className="technique-mobile-status-icon"></div>
            <div className="technique-mobile-status-icon"></div>
            <div className="technique-mobile-status-icon"></div>
          </div>
        </div>

        <div className="technique-mobile-content">
          <div className="technique-mobile-header">
            <div className="technique-mobile-title">
              {formData.name || 'Technique Name'}
            </div>
          </div>

          {images.length > 0 && (
            <div className="technique-mobile-image-section">
              <div className="technique-mobile-main-image-container">
                <img 
                  src={images[selectedImageIndex]} 
                  alt={formData.name || 'Technique'} 
                  className="technique-mobile-main-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              {images.length > 1 && (
                <div className="technique-mobile-thumbnail-container">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      className={`technique-mobile-thumbnail-wrapper ${
                        selectedImageIndex === index ? 'technique-mobile-thumbnail-wrapper-active' : ''
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img 
                        src={img} 
                        alt={`Thumbnail ${index + 1}`} 
                        className="technique-mobile-thumbnail"
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

          {formData.description && (
            <div className="technique-mobile-description-container">
              <div className="technique-mobile-description-title">Description</div>
              <div className="technique-mobile-description">
                {formData.description}
              </div>
            </div>
          )}

          {formData.keyPoints && (
            <div className="technique-mobile-details-container">
              <div className="technique-mobile-details-title">Key Points</div>
              {detailPoints.length > 0 ? (
                detailPoints.map((point, index) => (
                  <div key={index} className="technique-mobile-point-item">
                    <div className="technique-mobile-bullet-point"></div>
                    <div className="technique-mobile-point-text">{point}</div>
                  </div>
                ))
              ) : (
                <div className="technique-mobile-point-item">
                  <div className="technique-mobile-bullet-point"></div>
                  <div className="technique-mobile-point-text">{formData.keyPoints}</div>
                </div>
              )}
            </div>
          )}

          <div 
            className={`technique-mobile-complete-button ${isCompleted ? 'technique-mobile-complete-button-done' : ''}`}
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

