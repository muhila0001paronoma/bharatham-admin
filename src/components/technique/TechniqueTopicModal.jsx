import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Input } from '../ui/input';
import TechniqueTopicListView from './TechniqueTopicListView';
import './TechniqueModal.css';

export default function TechniqueTopicModal({ isOpen, onClose, onSave, topicData = null, existingTopics = [] }) {
  const [formData, setFormData] = useState({
    topicName: ''
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (topicData) {
      setFormData({
        topicName: topicData.topicName || topicData || ''
      });
    } else {
      setFormData({
        topicName: ''
      });
    }
  }, [topicData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="technique-modal-overlay" onClick={onClose}>
      <div className="technique-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="technique-modal-header">
          <h2 className="technique-modal-title">
            {topicData ? 'Update Technique Topic' : 'Create New Topic'}
          </h2>
          <button className="technique-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="technique-modal-body">
          <div className="technique-modal-form-section">
            <form onSubmit={handleSubmit} className="technique-form">
              <div className="technique-form-group">
                <label htmlFor="topicName" className="technique-form-label">
                  Topic Name
                </label>
                <Input
                  id="topicName"
                  name="topicName"
                  type="text"
                  value={formData.topicName}
                  onChange={handleChange}
                  placeholder="Enter topic name"
                  required
                />
              </div>

              <div className="technique-form-actions">
                <button type="button" className="technique-form-cancel-btn" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="technique-form-submit-btn">
                  {topicData ? 'Update' : 'Create'} Topic
                </button>
              </div>
            </form>
          </div>

          <div className="technique-modal-preview-section">
            <div className="technique-preview-header">
              <h3 className="technique-preview-title">Mobile Preview</h3>
            </div>
            <TechniqueTopicListView 
              formData={formData} 
              existingTopics={existingTopics}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

