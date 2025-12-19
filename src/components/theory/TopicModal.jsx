import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Input } from '../ui/input';
import TopicMobilePreview from './TopicMobilePreview';
import './TheoryModal.css';

export default function TopicModal({ isOpen, onClose, onSave, topicData = null, existingTopics = [] }) {
  const [formData, setFormData] = useState({
    topicName: '',
    active: true
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
        topicName: topicData.topicName || topicData || '',
        active: topicData.active !== undefined ? topicData.active : true
      });
    } else {
      setFormData({
        topicName: '',
        active: true
      });
    }
  }, [topicData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="theory-modal-overlay" onClick={onClose}>
      <div className="theory-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="theory-modal-header">
          <h2 className="theory-modal-title">
            {topicData ? 'Update Theory Topic' : 'Create New Topic'}
          </h2>
          <button className="theory-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="theory-modal-body">
          {/* Left Side - Form */}
          <div className="theory-modal-form-section">
            <form onSubmit={handleSubmit} className="theory-form">
              <div className="theory-form-group">
                <label htmlFor="topicName" className="theory-form-label">
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

              <div className="theory-form-actions">
                <button type="button" className="theory-form-cancel-btn" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="theory-form-submit-btn">
                  {topicData ? 'Update' : 'Create'} Topic
                </button>
              </div>
            </form>
          </div>

          {/* Right Side - Mobile Preview */}
          <div className="theory-modal-preview-section">
            <div className="theory-preview-header">
              <h3 className="theory-preview-title">Mobile Preview</h3>
            </div>
            <TopicMobilePreview 
              formData={formData} 
              existingTopics={existingTopics}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

