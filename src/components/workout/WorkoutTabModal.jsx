import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { Input } from '../ui/input';
import WorkoutTabMobilePreview from './WorkoutTabMobilePreview';
import './WorkoutModal.css';

const RECOMMENDED_ICONS = [
  'Dumbbell', 'StretchHorizontal', 'Timer', 'Heart', 'Zap', 'Flame',
  'Activity', 'Watch', 'Play', 'TrendingUp', 'Map', 'Target',
  'Moon', 'Sun', 'User', 'Users', 'Bike', 'Footprints', 'Trophy', 'Medal'
];

// Dynamically get all icons from LucideIcons
const ALL_LUCIDE_ICONS_LIST = Object.entries(LucideIcons)
  .filter(([name, component]) =>
    typeof component === 'object' &&
    name.charAt(0) === name.charAt(0).toUpperCase() &&
    !['X', 'Check', 'Chevron'].some(exclude => name.startsWith(exclude))
  )
  .map(([name, component]) => ({ name, icon: component }));

export default function WorkoutTabModal({ isOpen, onClose, onSave, tabData = null, existingTabs = [], isLoading = false }) {
  const [formData, setFormData] = useState({
    tabName: '',
    tabIcon: 'Dumbbell'
  });
  const [iconSearch, setIconSearch] = useState('');
  const [viewAll, setViewAll] = useState(false);

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
        tabName: tabData.tabName || '',
        tabIcon: tabData.tabIcon || 'Dumbbell'
      });
    } else {
      setFormData({
        tabName: '',
        tabIcon: 'Dumbbell'
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
                <label className="workout-form-label">
                  Select Icon
                </label>
                <div className="workout-icon-picker">
                  <div className="workout-icon-picker-toolbar">
                    <div className="workout-icon-search-wrapper">
                      <LucideIcons.Search size={14} className="workout-icon-search-icon" />
                      <input
                        type="text"
                        placeholder="Search all icons..."
                        value={iconSearch}
                        onChange={(e) => setIconSearch(e.target.value)}
                        className="workout-icon-search-input"
                      />
                    </div>
                    <button
                      type="button"
                      className={`workout-icon-toggle-btn ${viewAll ? 'active' : ''}`}
                      onClick={() => setViewAll(!viewAll)}
                    >
                      {viewAll ? 'Show Recommended' : 'View All'}
                    </button>
                  </div>
                  <div className="workout-icon-grid">
                    {ALL_LUCIDE_ICONS_LIST.filter(item => {
                      const matchesSearch = item.name.toLowerCase().includes(iconSearch.toLowerCase());
                      const isRecommended = RECOMMENDED_ICONS.includes(item.name);
                      return matchesSearch && (viewAll || isRecommended || iconSearch.length > 0);
                    }).map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <div
                          key={item.name}
                          className={`workout-icon-item ${formData.tabIcon === item.name ? 'workout-icon-item-active' : ''}`}
                          onClick={() => setFormData(prev => ({ ...prev, tabIcon: item.name }))}
                          title={item.name}
                        >
                          <IconComponent size={20} />
                        </div>
                      );
                    })}
                  </div>
                </div>
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
                  {isLoading ? 'Saving...' : (tabData ? 'Update' : 'Create')} Tab
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

