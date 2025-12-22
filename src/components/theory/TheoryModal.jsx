import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import TheoryMobilePreview from './TheoryMobilePreview';
import './TheoryModal.css';

export default function TheoryModal({ isOpen, onClose, onSave, theoryData = null, topics = [] }) {
  const [formData, setFormData] = useState({
    topic: '',
    subTopic: '',
    description: '',
    notes: '',
    image: '',
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
    if (theoryData) {
      setFormData({
        topic: theoryData.topic || '',
        subTopic: theoryData.subTopic || '',
        description: theoryData.description || '',
        notes: theoryData.notes || '',
        image: theoryData.image || '',
        active: theoryData.active !== undefined ? theoryData.active : true
      });
    } else {
      setFormData({
        topic: '',
        subTopic: '',
        description: '',
        notes: '',
        image: '',
        active: true
      });
    }
  }, [theoryData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
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
            {theoryData ? 'Update Theory Detail' : 'Add New Theory Detail'}
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
                <label htmlFor="image" className="theory-form-label">
                  Image
                </label>
                <div className="theory-form-image-upload">
                  <input
                    id="image"
                    name="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="theory-form-file-input"
                  />
                  {formData.image && (
                    <div className="theory-form-image-preview">
                      <img src={formData.image} alt="Preview" onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200x200?text=Invalid+Image';
                      }} />
                      <button
                        type="button"
                        className="theory-form-image-remove"
                        onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="theory-form-group">
                <label htmlFor="topic" className="theory-form-label">
                  Topic
                </label>
                <select
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className="theory-form-select"
                  required
                >
                  <option value="">Select a topic</option>
                  {topics.map((topic) => (
                    <option key={topic} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>

              <div className="theory-form-group">
                <label htmlFor="subTopic" className="theory-form-label">
                  Sub Topic
                </label>
                <Input
                  id="subTopic"
                  name="subTopic"
                  type="text"
                  value={formData.subTopic}
                  onChange={handleChange}
                  placeholder="Enter sub topic name"
                  required
                />
              </div>

              <div className="theory-form-group">
                <label htmlFor="description" className="theory-form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  className="theory-form-textarea"
                  rows="3"
                  required
                />
              </div>

              <div className="theory-form-group">
                <label htmlFor="notes" className="theory-form-label">
                  Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Enter detailed notes"
                  className="theory-form-textarea"
                  rows="5"
                />
              </div>

              <div className="theory-form-actions">
                <button type="button" className="theory-form-cancel-btn" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="theory-form-submit-btn">
                  {theoryData ? 'Update' : 'Add'} Theory Detail
                </button>
              </div>
            </form>
          </div>

          {/* Right Side - Mobile Preview */}
          <div className="theory-modal-preview-section">
            <div className="theory-preview-header">
              <h3 className="theory-preview-title">Mobile Preview</h3>
            </div>
            <TheoryMobilePreview formData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
}

