import React, { useState, useEffect } from 'react';
import { X, Video } from 'lucide-react';
import { Input } from '../ui/input';
import WorkoutMobilePreview from './WorkoutMobilePreview';
import './WorkoutModal.css';

export default function WorkoutVideoModal({ isOpen, onClose, onSave, videoData = null, tabs = [], isLoading = false }) {
  const [formData, setFormData] = useState({
    workoutTabId: '',
    video: null,
    videoUrl: '',
    title: '',
    description: ''
  });
  const [videoPreview, setVideoPreview] = useState('');

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
        workoutTabId: videoData.workoutTabId || '',
        video: null,
        videoUrl: videoData.videoUrl || '',
        title: videoData.title || '',
        description: videoData.description || ''
      });
      setVideoPreview(videoData.videoUrl ? 'Existing Video' : '');
    } else {
      setFormData({
        workoutTabId: '',
        video: null,
        videoUrl: '',
        title: '',
        description: ''
      });
      setVideoPreview('');
    }
  }, [videoData, isOpen]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'video') {
      const file = files[0];
      setFormData(prev => ({ ...prev, video: file }));
      setVideoPreview(file ? file.name : '');
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
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
                  id="workoutTabId"
                  name="workoutTabId"
                  value={formData.workoutTabId}
                  onChange={handleChange}
                  className="workout-form-select"
                  required
                >
                  <option value="">Select a workout tab</option>
                  {tabs.map((tab) => (
                    <option key={tab.id} value={tab.id}>
                      {tab.tabName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="workout-form-group">
                <label htmlFor="video" className="workout-form-label">
                  Workout Video
                </label>
                <div className="workout-file-input-wrapper">
                  <input
                    id="video"
                    name="video"
                    type="file"
                    accept="video/mp4"
                    onChange={handleChange}
                    className="workout-file-input"
                    required={!videoData}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="video" className="workout-file-label">
                    <div className="workout-file-info">
                      <Video size={18} />
                      <span>{videoPreview || 'Select Video (.mp4)'}</span>
                    </div>
                    <div className="workout-file-button">Browse</div>
                  </label>
                </div>
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
                <button
                  type="submit"
                  className="workout-form-submit-btn"
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : (videoData ? 'Update' : 'Add')} Workout Video
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


