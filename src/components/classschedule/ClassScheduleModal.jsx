import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { courseService } from '../../services/courseService';
import './ClassScheduleModal.css';

export default function ClassScheduleModal({ isOpen, onClose, onSave, scheduleData = null }) {
  const [formData, setFormData] = useState({
    courseId: '',
    date: '',
    startTime: '',
    endTime: '',
    isActive: true
  });
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      fetchCourses();
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await courseService.getAllCourses();
      if (response.success) {
        setCourses(response.data);
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scheduleData) {
      setFormData({
        courseId: scheduleData.courseId || '',
        date: scheduleData.date || '',
        startTime: scheduleData.startTime || '',
        endTime: scheduleData.endTime || '',
        isActive: scheduleData.isActive !== undefined ? scheduleData.isActive : true
      });
    } else {
      setFormData({
        courseId: '',
        date: '',
        startTime: '',
        endTime: '',
        isActive: true
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
                <label htmlFor="courseId" className="theory-form-label">
                  Course
                </label>
                <select
                  id="courseId"
                  name="courseId"
                  value={formData.courseId}
                  onChange={handleChange}
                  required
                  className="theory-form-select"
                  disabled={loading}
                >
                  <option value="">Select a course</option>
                  {courses.map(course => (
                    <option key={course.id} value={course.id}>
                      {course.title || course.courseTitle || course.id}
                    </option>
                  ))}
                </select>
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
                  step="1"
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
                  step="1"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="theory-form-group">
                <label className="theory-form-checkbox-label">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
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
                <button type="submit" className="theory-form-submit-btn" disabled={loading}>
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

