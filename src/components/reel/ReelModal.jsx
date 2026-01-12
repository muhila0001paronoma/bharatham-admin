import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import ReelMobilePreview from './ReelMobilePreview';
import sampleReelVideo from '../../assets/sample_reel.mp4';
import './ReelModal.css';

export default function ReelModal({ isOpen, onClose, onSave, reelData = null }) {
  const [formData, setFormData] = useState({
    reelUrl: '',
    reelTitle: '',
    uploadedBy: '',
    uploadedAt: '',
    likeCount: 0,
    shareCount: 0,
    isActive: true
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
        reelUrl: reelData.reelUrl || '',
        reelTitle: reelData.reelTitle || '',
        uploadedBy: reelData.uploadedBy || '',
        uploadedAt: reelData.uploadedAt || '',
        likeCount: reelData.likeCount || 0,
        shareCount: reelData.shareCount || 0,
        isActive: reelData.isActive !== undefined ? reelData.isActive : true
      });
      setVideoFile(null);
    } else {
      const now = new Date();
      const formattedDate = now.toISOString().slice(0, 19).replace('T', ' ');
      setFormData({
        reelUrl: '', // Removed sampleReelVideo dependency for new reels
        reelTitle: '',
        uploadedBy: '',
        uploadedAt: formattedDate,
        likeCount: 0,
        shareCount: 0,
        isActive: true
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
          reelUrl: reader.result
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
                  {formData.reelUrl && (
                    <div className="reel-form-video-preview">
                      <video
                        src={formData.reelUrl}
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
                            setFormData(prev => ({ ...prev, reelUrl: '' }));
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
                  id="reelTitle"
                  name="reelTitle"
                  type="text"
                  value={formData.reelTitle}
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
                <input
                  id="uploadedAt"
                  name="uploadedAt"
                  type="datetime-local"
                  className="w-full p-2 border rounded"
                  value={formData.uploadedAt ? new Date(formData.uploadedAt).toISOString().slice(0, 16) : ''}
                  onChange={(e) => {
                    const date = new Date(e.target.value);
                    setFormData(prev => ({ ...prev, uploadedAt: date.toISOString() }));
                  }}
                  required
                />
              </div>

              <div className="reel-form-group">
                <label htmlFor="likes" className="reel-form-label">
                  Likes
                </label>
                <Input
                  id="likeCount"
                  name="likeCount"
                  type="number"
                  value={formData.likeCount}
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
                  id="shareCount"
                  name="shareCount"
                  type="number"
                  value={formData.shareCount}
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
                    name="isActive"
                    checked={formData.isActive}
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

