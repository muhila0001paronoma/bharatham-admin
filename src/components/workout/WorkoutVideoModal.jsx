import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Input } from '../ui/input';
import WorkoutMobilePreview from './WorkoutMobilePreview';
import './WorkoutModal.css';

export default function WorkoutVideoModal({ isOpen, onClose, onSave, videoData = null, tabs = [] }) {
  const [formData, setFormData] = useState({
    workoutTab: '',
    videoUrl: '',
    title: '',
    description: ''
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
    if (videoData) {
      setFormData({
        workoutTab: videoData.workoutTab || '',
        videoUrl: videoData.videoUrl || '',
        title: videoData.title || '',
        description: videoData.description || ''
      });
    } else {
      setFormData({
        workoutTab: '',
        videoUrl: '',
        title: '',
        description: ''
      });
    }
  }, [videoData, isOpen]);

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
    <div className="workout-modal-overlay" onClick={onClose}>
      <div className="workout-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="workout-modal-header">
          <h2 className="workout-modal-title">
            {videoData ? 'Update Workout Video' : 'Add New Workout Video'}
          </h2>
          <button className="workout-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="workout-modal-body">
          <div className="workout-modal-form-section">
            <form onSubmit={handleSubmit} className="workout-form">
              <div className="workout-form-group">
                <label htmlFor="workoutTab" className="workout-form-label">
                  Workout Tab
                </label>
                <select
                  id="workoutTab"
                  name="workoutTab"
                  value={formData.workoutTab}
                  onChange={handleChange}
                  className="workout-form-select"
                  required
                >
                  <option value="">Select a workout tab</option>
                  {tabs.map((tab) => (
                    <option key={tab} value={tab}>
                      {tab}
                    </option>
                  ))}
                </select>
              </div>

              <div className="workout-form-group">
                <label htmlFor="videoUrl" className="workout-form-label">
                  Video URL
                </label>
                <Input
                  id="videoUrl"
                  name="videoUrl"
                  type="url"
                  value={formData.videoUrl}
                  onChange={handleChange}
                  placeholder="https://www.youtube.com/watch?v=..."
                  required
                />
              </div>

              <div className="workout-form-group">
                <label htmlFor="title" className="workout-form-label">
                  Title
                </label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter video title"
                  required
                />
              </div>

              <div className="workout-form-group">
                <label htmlFor="description" className="workout-form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter video description"
                  className="workout-form-textarea"
                  rows="5"
                  required
                />
              </div>

              <div className="workout-form-actions">
                <button type="button" className="workout-form-cancel-btn" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="workout-form-submit-btn">
                  {videoData ? 'Update' : 'Add'} Workout Video
                </button>
              </div>
            </form>
          </div>

          <div className="workout-modal-preview-section">
            <div className="workout-preview-header">
              <h3 className="workout-preview-title">Mobile Preview</h3>
            </div>
            <WorkoutMobilePreview formData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
}


