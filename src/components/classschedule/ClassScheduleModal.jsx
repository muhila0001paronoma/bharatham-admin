import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import './ClassScheduleModal.css';

export default function ClassScheduleModal({ isOpen, onClose, onSave, scheduleData = null }) {
  const [formData, setFormData] = useState({
    courseTitle: '',
    date: '',
    startTime: '',
    endTime: '',
    status: 'Upcoming',
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
    if (scheduleData) {
      setFormData({
        courseTitle: scheduleData.courseTitle || '',
        date: scheduleData.date || '',
        startTime: scheduleData.startTime || '',
        endTime: scheduleData.endTime || '',
        status: scheduleData.status || 'Upcoming',
        active: scheduleData.active !== undefined ? scheduleData.active : true
      });
    } else {
      setFormData({
        courseTitle: '',
        date: '',
        startTime: '',
        endTime: '',
        status: 'Upcoming',
        active: true
      });
    }
  }, [scheduleData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="theory-modal-overlay" onClick={onClose}>
      <div className="schedule-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="theory-modal-header">
          <h2 className="theory-modal-title">
            {scheduleData ? 'Update Class Schedule' : 'Add New Class Schedule'}
          </h2>
          <button className="theory-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="schedule-modal-body">
          <div className="schedule-modal-form-section">
            <form onSubmit={handleSubmit} className="theory-form">
              <div className="theory-form-group">
                <label htmlFor="courseTitle" className="theory-form-label">
                  Course Title
                </label>
                <input
                  id="courseTitle"
                  name="courseTitle"
                  type="text"
                  value={formData.courseTitle}
                  onChange={handleChange}
                  placeholder="Enter course title"
                  required
                />
              </div>

              <div className="theory-form-group">
                <label htmlFor="date" className="theory-form-label">
                  Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="theory-form-group">
                <label htmlFor="startTime" className="theory-form-label">
                  Start Time
                </label>
                <input
                  id="startTime"
                  name="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="theory-form-group">
                <label htmlFor="endTime" className="theory-form-label">
                  End Time
                </label>
                <input
                  id="endTime"
                  name="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="theory-form-group">
                <label htmlFor="status" className="theory-form-label">
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  required
                  className="theory-form-select"
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="theory-form-group">
                <label className="theory-form-checkbox-label">
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleChange}
                    className="theory-form-checkbox"
                  />
                  <span>Active</span>
                </label>
              </div>

              <div className="theory-form-actions">
                <button type="button" className="theory-form-cancel-btn" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="theory-form-submit-btn">
                  {scheduleData ? 'Update' : 'Add'} Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

