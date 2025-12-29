import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Input } from '../ui/input';
import TechniqueMobilePreview from './TechniqueMobilePreview';
import './TechniqueModal.css';

export default function TechniqueModal({ isOpen, onClose, onSave, techniqueData = null, topics = [] }) {
  const [formData, setFormData] = useState({
    topic: '',
    name: '',
    description: '',
    keyPoints: '',
    level: 'Beginner',
    imgUrl1: '',
    imgUrl2: '',
    imgUrl3: ''
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
    if (techniqueData) {
      setFormData({
        topic: techniqueData.topic || '',
        name: techniqueData.name || '',
        description: techniqueData.description || '',
        keyPoints: techniqueData.keyPoints || '',
        level: techniqueData.level || 'Beginner',
        imgUrl1: techniqueData.imgUrl1 || '',
        imgUrl2: techniqueData.imgUrl2 || '',
        imgUrl3: techniqueData.imgUrl3 || ''
      });
    } else {
      setFormData({
        topic: '',
        name: '',
        description: '',
        keyPoints: '',
        level: 'Beginner',
        imgUrl1: '',
        imgUrl2: '',
        imgUrl3: ''
      });
    }
  }, [techniqueData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e, imageKey) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          [imageKey]: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (imageKey) => {
    setFormData(prev => ({
      ...prev,
      [imageKey]: ''
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
            {techniqueData ? 'Update Technique Detail' : 'Add New Technique Detail'}
          </h2>
          <button className="technique-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="technique-modal-body">
          <div className="technique-modal-form-section">
            <form onSubmit={handleSubmit} className="technique-form">
              <div className="technique-form-group">
                <label htmlFor="imgUrl1" className="technique-form-label">
                  Image 1
                </label>
                <div className="technique-form-image-upload">
                  <input
                    id="imgUrl1"
                    name="imgUrl1"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'imgUrl1')}
                    className="technique-form-file-input"
                  />
                  {formData.imgUrl1 && (
                    <div className="technique-form-image-preview">
                      <img src={formData.imgUrl1} alt="Preview 1" onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200x200?text=Invalid+Image';
                      }} />
                      <button
                        type="button"
                        className="technique-form-image-remove"
                        onClick={() => handleRemoveImage('imgUrl1')}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="technique-form-group">
                <label htmlFor="imgUrl2" className="technique-form-label">
                  Image 2 (Optional)
                </label>
                <div className="technique-form-image-upload">
                  <input
                    id="imgUrl2"
                    name="imgUrl2"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'imgUrl2')}
                    className="technique-form-file-input"
                  />
                  {formData.imgUrl2 && (
                    <div className="technique-form-image-preview">
                      <img src={formData.imgUrl2} alt="Preview 2" onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200x200?text=Invalid+Image';
                      }} />
                      <button
                        type="button"
                        className="technique-form-image-remove"
                        onClick={() => handleRemoveImage('imgUrl2')}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="technique-form-group">
                <label htmlFor="imgUrl3" className="technique-form-label">
                  Image 3 (Optional)
                </label>
                <div className="technique-form-image-upload">
                  <input
                    id="imgUrl3"
                    name="imgUrl3"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, 'imgUrl3')}
                    className="technique-form-file-input"
                  />
                  {formData.imgUrl3 && (
                    <div className="technique-form-image-preview">
                      <img src={formData.imgUrl3} alt="Preview 3" onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200x200?text=Invalid+Image';
                      }} />
                      <button
                        type="button"
                        className="technique-form-image-remove"
                        onClick={() => handleRemoveImage('imgUrl3')}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="technique-form-group">
                <label htmlFor="topic" className="technique-form-label">
                  Topic
                </label>
                <select
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  className="technique-form-select"
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

              <div className="technique-form-group">
                <label htmlFor="name" className="technique-form-label">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter technique name"
                  required
                />
              </div>

              <div className="technique-form-group">
                <label htmlFor="description" className="technique-form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter description"
                  className="technique-form-textarea"
                  rows="3"
                  required
                />
              </div>

              <div className="technique-form-group">
                <label htmlFor="keyPoints" className="technique-form-label">
                  Key Points
                </label>
                <textarea
                  id="keyPoints"
                  name="keyPoints"
                  value={formData.keyPoints}
                  onChange={handleChange}
                  placeholder="Enter key points (each point on a new line or separated by periods)"
                  className="technique-form-textarea"
                  rows="5"
                  required
                />
              </div>

              <div className="technique-form-group">
                <label htmlFor="level" className="technique-form-label">
                  Level
                </label>
                <select
                  id="level"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="technique-form-select"
                  required
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="technique-form-actions">
                <button type="button" className="technique-form-cancel-btn" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="technique-form-submit-btn">
                  {techniqueData ? 'Update' : 'Add'} Technique Detail
                </button>
              </div>
            </form>
          </div>

          <div className="technique-modal-preview-section">
            <div className="technique-preview-header">
              <h3 className="technique-preview-title">Mobile Preview</h3>
            </div>
            <TechniqueMobilePreview formData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
}


