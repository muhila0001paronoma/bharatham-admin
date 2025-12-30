import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import ReelMobilePreview from './ReelMobilePreview';
import sampleReelVideo from '../../assets/sample_reel.mp4';
import './ReelModal.css';

export default function ReelModal({ isOpen, onClose, onSave, reelData = null }) {
  const [formData, setFormData] = useState({
    videoUrl: '',
    title: '',
    uploadedBy: '',
    uploadedAt: '',
    likes: 0,
    shares: 0,
    active: true
  });
  const [videoFile, setVideoFile] = useState(null);

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
    if (reelData) {
      setFormData({
        videoUrl: reelData.videoUrl || '',
        title: reelData.title || '',
        uploadedBy: reelData.uploadedBy || '',
        uploadedAt: reelData.uploadedAt || '',
        likes: reelData.likes || 0,
        shares: reelData.shares || 0,
        active: reelData.active !== undefined ? reelData.active : true
      });
      setVideoFile(null);
    } else {
      const now = new Date();
      const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');
      setFormData({
        videoUrl: sampleReelVideo,
        title: '',
        uploadedBy: '',
        uploadedAt: formattedDate,
        likes: 0,
        shares: 0,
        active: true
      });
      setVideoFile(null);
    }
  }, [reelData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          videoUrl: reader.result
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
    <div className="reel-modal-overlay" onClick={onClose}>
      <div className="reel-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="reel-modal-header">
          <h2 className="reel-modal-title">
            {reelData ? 'Update Reel' : 'Add New Reel'}
          </h2>
          <button className="reel-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="reel-modal-body">
          {/* Left Side - Form */}
          <div className="reel-modal-form-section">
            <form onSubmit={handleSubmit} className="reel-form">
              <div className="reel-form-group">
                <label htmlFor="videoFile" className="reel-form-label">
                  Video File
                </label>
                <div className="reel-form-video-upload">
                  <input
                    id="videoFile"
                    name="videoFile"
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="reel-form-file-input"
                    required={!reelData}
                  />
                  {formData.videoUrl && (
                    <div className="reel-form-video-preview">
                      <video
                        src={formData.videoUrl}
                        className="reel-form-video-preview-element"
                        controls
                        muted
                      />
                      {videoFile && (
                        <button
                          type="button"
                          className="reel-form-video-remove"
                          onClick={() => {
                            setVideoFile(null);
                            setFormData(prev => ({ ...prev, videoUrl: '' }));
                          }}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="reel-form-group">
                <label htmlFor="title" className="reel-form-label">
                  Title
                </label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter reel title"
                  required
                />
              </div>

              <div className="reel-form-group">
                <label htmlFor="uploadedBy" className="reel-form-label">
                  Uploaded By
                </label>
                <Input
                  id="uploadedBy"
                  name="uploadedBy"
                  type="email"
                  value={formData.uploadedBy}
                  onChange={handleChange}
                  placeholder="user@example.com"
                  required
                />
              </div>

              <div className="reel-form-group">
                <label htmlFor="uploadedAt" className="reel-form-label">
                  Uploaded At
                </label>
                <Input
                  id="uploadedAt"
                  name="uploadedAt"
                  type="datetime-local"
                  value={formData.uploadedAt ? formData.uploadedAt.replace(' ', 'T').slice(0, 16) : ''}
                  onChange={(e) => {
                    const value = e.target.value.replace('T', ' ') + ':00';
                    setFormData(prev => ({ ...prev, uploadedAt: value }));
                  }}
                  required
                />
              </div>

              <div className="reel-form-group">
                <label htmlFor="likes" className="reel-form-label">
                  Likes
                </label>
                <Input
                  id="likes"
                  name="likes"
                  type="number"
                  value={formData.likes}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  required
                />
              </div>

              <div className="reel-form-group">
                <label htmlFor="shares" className="reel-form-label">
                  Shares
                </label>
                <Input
                  id="shares"
                  name="shares"
                  type="number"
                  value={formData.shares}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  required
                />
              </div>

              <div className="reel-form-group">
                <label className="reel-form-checkbox-label">
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleChange}
                    className="reel-form-checkbox"
                  />
                  <span>Active</span>
                </label>
              </div>

              <div className="reel-form-actions">
                <button type="button" className="reel-form-cancel-btn" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="reel-form-submit-btn">
                  {reelData ? 'Update' : 'Add'} Reel
                </button>
              </div>
            </form>
          </div>

          {/* Right Side - Mobile Preview */}
          <div className="reel-modal-preview-section">
            <div className="reel-preview-header">
              <h3 className="reel-preview-title">Mobile Preview</h3>
            </div>
            <ReelMobilePreview formData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
}

