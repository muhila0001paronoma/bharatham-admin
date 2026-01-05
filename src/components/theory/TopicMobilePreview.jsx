import React from 'react';
import { ArrowLeft } from 'lucide-react';
import './TopicMobilePreview.css';

export default function TopicMobilePreview({ formData, existingTopics = [] }) {
  const allTopicsNames = existingTopics.map(t => typeof t === 'object' ? t.topicName : t);
  const allTopics = formData.topicName
    ? [formData.topicName, ...allTopicsNames.filter(t => t !== formData.topicName)]
    : allTopicsNames;

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
          <div className="theory-topic-preview-header">
            <div className="theory-topic-preview-title">Theory</div>
          </div>

          {/* Tabs */}
          <div className="theory-topic-preview-tabs">
            <div className="theory-topic-preview-tab theory-topic-preview-tab-active">
              <span>History</span>
            </div>
            <div className="theory-topic-preview-tab theory-topic-preview-tab-active">
              <span>Theory</span>
              <div className="theory-topic-preview-tab-underline"></div>
            </div>
          </div>

          {/* Topics Grid */}
          <div className="theory-topic-preview-grid">
            {allTopics.length > 0 ? (
              allTopics.map((topic, index) => (
                <div
                  key={index}
                  className={`theory-topic-preview-card ${topic === formData.topicName ? 'theory-topic-preview-card-new' : ''}`}
                >
                  <div className="theory-topic-preview-card-content">
                    <div className="theory-topic-preview-card-text">
                      {topic || 'New Topic'}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="theory-topic-preview-empty">
                {formData.topicName ? 'Preview will show here...' : 'Enter topic name to see preview'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

