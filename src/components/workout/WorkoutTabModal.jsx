import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Input } from '../ui/input';
import WorkoutTabMobilePreview from './WorkoutTabMobilePreview';
import './WorkoutModal.css';

export default function WorkoutTabModal({ isOpen, onClose, onSave, tabData = null, existingTabs = [] }) {
  const [formData, setFormData] = useState({
    tabName: '',
    iconName: ''
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
    if (tabData) {
      setFormData({
        tabName: tabData.tabName || (typeof tabData === 'string' ? tabData : ''),
        iconName: tabData.iconName || ''
      });
    } else {
      setFormData({
        tabName: '',
        iconName: ''
      });
    }
  }, [tabData, isOpen]);

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
            {tabData ? 'Update Workout Tab' : 'Create Workout Tab'}
          </h2>
          <button className="workout-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="workout-modal-body">
          <div className="workout-modal-form-section">
            <form onSubmit={handleSubmit} className="workout-form">
              <div className="workout-form-group">
                <label htmlFor="tabName" className="workout-form-label">
                  Tab Name
                </label>
                <Input
                  id="tabName"
                  name="tabName"
                  type="text"
                  value={formData.tabName}
                  onChange={handleChange}
                  placeholder="Enter tab name"
                  required
                />
              </div>

              <div className="workout-form-group">
                <label htmlFor="iconName" className="workout-form-label">
                  Icon Name
                </label>
                <Input
                  id="iconName"
                  name="iconName"
                  type="text"
                  value={formData.iconName}
                  onChange={handleChange}
                  placeholder="Enter icon (e.g., 💪, 🧘, 🏋️)"
                  required
                />
              </div>

              <div className="workout-form-actions">
                <button type="button" className="workout-form-cancel-btn" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="workout-form-submit-btn">
                  {tabData ? 'Update' : 'Create'} Tab
                </button>
              </div>
            </form>
          </div>

          <div className="workout-modal-preview-section">
            <div className="workout-preview-header">
              <h3 className="workout-preview-title">Mobile Preview</h3>
            </div>
            <WorkoutTabMobilePreview 
              formData={formData} 
              existingTabs={existingTabs}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

