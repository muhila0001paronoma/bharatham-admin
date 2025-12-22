import React from 'react';
import './WorkoutTabMobilePreview.css';

export default function WorkoutTabMobilePreview({ formData, existingTabs = [] }) {
  const newTab = formData.tabName ? { tabName: formData.tabName, iconName: formData.iconName || '●' } : null;
  const allTabs = newTab
    ? [newTab, ...existingTabs.filter(t => {
        const existingTabName = typeof t === 'string' ? t : t.tabName;
        return existingTabName !== formData.tabName;
      })]
    : existingTabs;

  const getTabName = (tab) => {
    return typeof tab === 'string' ? tab : tab.tabName;
  };

  const getTabIcon = (tab) => {
    if (typeof tab === 'string') {
      const iconMap = {
        'Fitness': '💪',
        'Mobility': '🧘',
        'Strength': '🏋️',
        'Flexibility': '🤸',
        'Cardio': '🏃'
      };
      return iconMap[tab] || '●';
    }
    return tab.iconName || '●';
  };

  return (
    <div className="workout-mobile-preview-container">
      <div className="workout-mobile-frame">
        <div className="workout-mobile-status-bar">
          <div className="workout-mobile-status-time">10:48</div>
          <div className="workout-mobile-status-icons">
            <div className="workout-mobile-status-icon"></div>
            <div className="workout-mobile-status-icon"></div>
            <div className="workout-mobile-status-icon"></div>
          </div>
        </div>

        <div className="workout-mobile-content">
          <div className="workout-tab-preview-header">
            <div className="workout-tab-preview-title">Workouts</div>
          </div>

          <div className="workout-tab-preview-grid">
            {allTabs.length > 0 ? (
              allTabs.map((tab, index) => {
                const tabName = getTabName(tab);
                const isNew = tabName === formData.tabName;
                return (
                  <div 
                    key={index} 
                    className={`workout-tab-preview-card ${isNew ? 'workout-tab-preview-card-new' : ''}`}
                  >
                    <div className="workout-tab-preview-card-content">
                      <div className="workout-tab-preview-card-icon">
                        {getTabIcon(tab)}
                      </div>
                      <div className="workout-tab-preview-card-text">
                        {tabName || 'New Tab'}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="workout-tab-preview-empty">
                {formData.tabName ? 'Preview will show here...' : 'Enter tab name to see preview'}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

