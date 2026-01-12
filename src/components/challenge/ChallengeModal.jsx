import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import ChallengeMobilePreview from './ChallengeMobilePreview';
import './ChallengeModal.css';

export default function ChallengeModal({ isOpen, onClose, onSave, challengeData = null, isLoading = false }) {
  const [formData, setFormData] = useState({
    challengeName: '',
    shortDescription: '',
    explanation: '',
    startDate: '',
    endDate: '',
    timeDuration: '',
    totalPoints: '',
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
    if (challengeData) {
      setFormData({
        challengeName: challengeData.challengeName || '',
        shortDescription: challengeData.shortDescription || '',
        explanation: challengeData.explanation || '',
        startDate: challengeData.startDate ? challengeData.startDate.split('T')[0] : '',
        endDate: challengeData.endDate ? challengeData.endDate.split('T')[0] : '',
        timeDuration: challengeData.timeDuration || '',
        totalPoints: challengeData.totalPoints || '',
        active: challengeData.isActive !== undefined ? challengeData.isActive : true
      });
    } else {
      setFormData({
        challengeName: '',
        shortDescription: '',
        explanation: '',
        startDate: '',
        endDate: '',
        timeDuration: '',
        totalPoints: '',
        active: true
      });
    }
  }, [challengeData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      challengeName: formData.challengeName,
      shortDescription: formData.shortDescription,
      explanation: formData.explanation,
      startDate: `${formData.startDate}T00:00:00`,
      endDate: `${formData.endDate}T23:59:59`,
      timeDuration: parseInt(formData.timeDuration) || 0,
      totalPoints: parseInt(formData.totalPoints) || 0
    };
    onSave(submitData);
  };

  if (!isOpen) return null;

  return (
    <div className="challenge-modal-overlay" onClick={onClose}>
      <div className="challenge-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="challenge-modal-header">
          <h2 className="challenge-modal-title">
            {challengeData ? 'Update Challenge' : 'Add New Challenge'}
          </h2>
          <button className="challenge-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="challenge-modal-body">
          {/* Left Side - Form */}
          <div className="challenge-modal-form-section">
            <form onSubmit={handleSubmit} className="challenge-form">
              <div className="challenge-form-group">
                <label htmlFor="challengeName" className="challenge-form-label">
                  Challenge Name <span className="required">*</span>
                </label>
                <Input
                  id="challengeName"
                  name="challengeName"
                  type="text"
                  value={formData.challengeName}
                  onChange={handleChange}
                  placeholder="Enter challenge name"
                  required
                />
              </div>

              <div className="challenge-form-group">
                <label htmlFor="shortDescription" className="challenge-form-label">
                  Short Description <span className="required">*</span>
                </label>
                <Input
                  id="shortDescription"
                  name="shortDescription"
                  type="text"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="Enter short description"
                  required
                />
              </div>

              <div className="challenge-form-group">
                <label htmlFor="explanation" className="challenge-form-label">
                  Explanation <span className="required">*</span>
                </label>
                <textarea
                  id="explanation"
                  name="explanation"
                  value={formData.explanation}
                  onChange={handleChange}
                  placeholder="Enter detailed explanation"
                  className="challenge-form-textarea"
                  rows="4"
                  required
                />
              </div>

              <div className="challenge-form-row">
                <div className="challenge-form-group">
                  <label htmlFor="startDate" className="challenge-form-label">
                    Start Date <span className="required">*</span>
                  </label>
                  <Input
                    id="startDate"
                    name="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="challenge-form-group">
                  <label htmlFor="endDate" className="challenge-form-label">
                    End Date <span className="required">*</span>
                  </label>
                  <Input
                    id="endDate"
                    name="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="challenge-form-row">
                <div className="challenge-form-group">
                  <label htmlFor="timeDuration" className="challenge-form-label">
                    Time Duration (minutes) <span className="required">*</span>
                  </label>
                  <Input
                    id="timeDuration"
                    name="timeDuration"
                    type="number"
                    value={formData.timeDuration}
                    onChange={handleChange}
                    placeholder="e.g., 15"
                    min="0"
                    required
                  />
                </div>

                <div className="challenge-form-group">
                  <label htmlFor="totalPoints" className="challenge-form-label">
                    Points <span className="required">*</span>
                  </label>
                  <Input
                    id="totalPoints"
                    name="totalPoints"
                    type="number"
                    value={formData.totalPoints}
                    onChange={handleChange}
                    placeholder="Enter points"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="challenge-form-group">
                <label className="challenge-form-checkbox-label">
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleChange}
                    className="challenge-form-checkbox"
                  />
                  <span>Active</span>
                </label>
              </div>

              <div className="challenge-form-actions">
                <button type="button" className="challenge-form-cancel-btn" onClick={onClose} disabled={isLoading}>
                  Cancel
                </button>
                <button type="submit" className="challenge-form-submit-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>{challengeData ? 'Update' : 'Add'} Challenge</>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Right Side - Mobile Preview */}
          <div className="challenge-modal-preview-section">
            <div className="challenge-preview-header">
              <h3 className="challenge-preview-title">Mobile Preview</h3>
            </div>
            <ChallengeMobilePreview formData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
}


