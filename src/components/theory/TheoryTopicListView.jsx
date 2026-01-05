import React from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import './TheoryTopicListView.css';

export default function TheoryTopicListView({ formData, onBack }) {
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
          <div className="theory-topic-list-header">
            <div className="theory-mobile-back-button" onClick={onBack}>
              <ArrowLeft size={18} color="#7A4D3A" />
            </div>
            <div className="theory-topic-list-title">
              {formData.topic?.topicName || formData.topic || 'Theory Topic'}
            </div>
          </div>

          {/* Search Input */}
          <div className="theory-topic-list-search">
            <Search size={16} color="#BC6135" />
            <input
              type="text"
              placeholder={`Search ${formData.topic?.topicName || formData.topic || 'topics'}`}
              className="theory-topic-list-search-input"
            />
          </div>

          {/* Theory Cards Grid */}
          <div className="theory-topic-list-grid">
            <div className="theory-topic-list-card">
              {formData.image && (
                <img
                  src={formData.image}
                  alt={formData.subTopic || 'Theory'}
                  className="theory-topic-list-card-image"
                />
              )}
              <div className="theory-topic-list-card-title">
                {formData.subTopic || 'Sub Topic Name'}
              </div>
              <div className="theory-topic-list-card-desc">
                {formData.description
                  ? (formData.description.length > 50
                    ? formData.description.slice(0, 50) + '...'
                    : formData.description)
                  : 'Enter description...'}
              </div>
              <div className="theory-topic-list-card-button">
                Learn More
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

