import React from 'react';
import { ArrowLeft, Star, Calendar, Clock } from 'lucide-react';
import './ChallengeMobilePreview.css';

export default function ChallengeMobilePreview({ formData }) {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="challenge-mobile-preview-container">
      <div className="challenge-mobile-frame">
        {/* Phone Status Bar */}
        <div className="challenge-mobile-status-bar">
          <div className="challenge-mobile-status-time">9:41</div>
          <div className="challenge-mobile-status-icons">
            <div className="challenge-mobile-status-icon"></div>
            <div className="challenge-mobile-status-icon"></div>
            <div className="challenge-mobile-status-icon"></div>
          </div>
        </div>

        {/* Phone Content */}
        <div className="challenge-mobile-content">
          {/* Header */}
          <div className="challenge-mobile-header">
            <div className="challenge-mobile-back-button">
              <ArrowLeft size={18} color="#7A4D3A" />
            </div>
            <div className="challenge-mobile-title">Challenge</div>
            <div className="challenge-mobile-header-right"></div>
          </div>

          {/* Challenge Card */}
          <div className="challenge-mobile-card">
            <div className="challenge-mobile-card-content">
              {/* Title */}
              <h2 className="challenge-mobile-card-title">
                {formData.challengeName || 'Challenge Name'}
              </h2>

              {/* Description */}
              <p className="challenge-mobile-card-description">
                {formData.shortDescription || 'Enter short description...'}
              </p>

              {/* Meta Row - Points and Duration */}
              <div className="challenge-mobile-meta-row">
                <div className="challenge-mobile-meta-pill">
                  <Star size={16} color="#FFD700" />
                  <span className="challenge-mobile-meta-text">
                    {formData.totalPoints || '0'} pts
                  </span>
                </div>
                {formData.duration && (
                  <div className="challenge-mobile-meta-pill challenge-mobile-meta-pill-time">
                    <Clock size={16} color="#B8732F" />
                    <span className="challenge-mobile-meta-text challenge-mobile-meta-text-time">
                      {formData.duration}
                    </span>
                  </div>
                )}
              </div>

              {/* Date Info */}
              {(formData.startDate || formData.endDate) && (
                <div className="challenge-mobile-date-info">
                  <Calendar size={16} color="#7A4D3A" />
                  <span className="challenge-mobile-date-text">
                    {formatDate(formData.startDate)} - {formatDate(formData.endDate)}
                  </span>
                </div>
              )}

              {/* Explanation Section */}
              {formData.explanation && (
                <div className="challenge-mobile-section">
                  <h3 className="challenge-mobile-section-title">How it works</h3>
                  <p className="challenge-mobile-section-text">
                    {formData.explanation}
                  </p>
                </div>
              )}
            </div>

            {/* Action Button */}
            <button className="challenge-mobile-primary-button">
              Start Challenge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

