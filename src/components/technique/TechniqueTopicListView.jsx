import React from 'react';
import { ArrowLeft, Bell, Calendar, User } from 'lucide-react';
import './TechniqueTopicListView.css';

const getTopicIcon = (topicName) => {
  const iconMap = {
    'Face Expressions': '😊',
    'Hand Mudras': '✋',
    'Body Postures': '🧘',
    'Knee Movements': '🦵',
    'Leg & Feet Positions': '👣'
  };
  return iconMap[topicName] || '●';
};

export default function TechniqueTopicListView({ formData, existingTopics = [], onBack }) {
  const allTopics = formData.topicName 
    ? [formData.topicName, ...existingTopics.filter(t => t !== formData.topicName)]
    : existingTopics;

  return (
    <div className="technique-mobile-preview-container">
      <div className="technique-mobile-frame">
        <div className="technique-mobile-status-bar">
          <div className="technique-mobile-status-time">10:48</div>
          <div className="technique-mobile-status-icons">
            <div className="technique-mobile-status-icon"></div>
            <div className="technique-mobile-status-icon"></div>
            <div className="technique-mobile-status-icon"></div>
          </div>
        </div>

        <div className="technique-mobile-content">
          {onBack && (
            <div className="technique-mobile-header">
              <div className="technique-mobile-back-button" onClick={onBack}>
                <ArrowLeft size={18} color="#7A4D3A" />
              </div>
              <div className="technique-mobile-title">Techniques</div>
            </div>
          )}

          {!onBack && (
            <div className="technique-topic-preview-header">
              <div className="technique-topic-preview-title">Techniques</div>
              <div className="technique-topic-preview-header-icons">
                <Bell size={18} color="#7A4D3A" />
                <Calendar size={18} color="#7A4D3A" />
                <User size={18} color="#7A4D3A" />
              </div>
            </div>
          )}

          <div className="technique-topic-preview-tabs">
            <div className="technique-topic-preview-tab">
              <span>Shiva</span>
            </div>
            <div className="technique-topic-preview-tab technique-topic-preview-tab-active">
              <span>Techniques</span>
              <div className="technique-topic-preview-tab-underline"></div>
            </div>
          </div>

          <div className="technique-topic-preview-list">
            {allTopics.length > 0 ? (
              allTopics.map((topic, index) => (
                <div 
                  key={index} 
                  className={`technique-topic-preview-item ${topic === formData.topicName ? 'technique-topic-preview-item-new' : ''}`}
                >
                  <div className="technique-topic-preview-item-icon">
                    <span className="technique-topic-preview-icon-emoji">{getTopicIcon(topic)}</span>
                  </div>
                  <div className="technique-topic-preview-item-text">
                    {topic || 'New Topic'}
                  </div>
                  <div className="technique-topic-preview-item-arrow">›</div>
                </div>
              ))
            ) : (
              <div className="technique-topic-preview-empty">
                {formData.topicName ? 'Preview will show here...' : 'Enter topic name to see preview'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

