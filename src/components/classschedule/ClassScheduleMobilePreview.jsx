import React from 'react';
import './ClassScheduleMobilePreview.css';

export default function ClassScheduleMobilePreview({ formData }) {
  const formatDate = (dateString) => {
    if (!dateString) return '--';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
    } catch {
      return dateString;
    }
  };

  const formatDay = (dateString) => {
    if (!dateString) return '--';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '--';
      return new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
    } catch {
      return '--';
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return 'TBD';
    try {
      const [hours, minutes] = timeString.split(':');
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${minutes || '00'} ${ampm}`;
    } catch {
      return timeString;
    }
  };

  const formatTimeRange = (startTime, endTime) => {
    if (!startTime) return 'TBD';
    const start = formatTime(startTime);
    if (!endTime) return start;
    const end = formatTime(endTime);
    return `${start} - ${end}`;
  };

  const getRelativeLabel = (dateString) => {
    if (!dateString) return 'Upcoming';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Upcoming';
      const now = new Date();
      const diffTime = date - now;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 0) return 'Past';
      if (diffDays === 0) return 'Today';
      if (diffDays === 1) return 'Tomorrow';
      if (diffDays <= 7) return `In ${diffDays} days`;
      return 'Upcoming';
    } catch {
      return 'Upcoming';
    }
  };

  const dayLabel = formatDay(formData.date);
  const dateLabel = formatDate(formData.date);
  const timeLabel = formatTimeRange(formData.startTime, formData.endTime);
  const relativeLabel = getRelativeLabel(formData.date);
  const courseTitle = formData.courseTitle || 'Course Title';
  const teacherName = 'Guru Name'; // Default teacher name

  return (
    <div className="schedule-mobile-preview-container">
      <div className="schedule-mobile-frame">
        {/* Phone Status Bar */}
        <div className="schedule-mobile-status-bar">
          <div className="schedule-mobile-status-time">9:41</div>
          <div className="schedule-mobile-status-icons">
            <div className="schedule-mobile-status-icon"></div>
            <div className="schedule-mobile-status-icon"></div>
            <div className="schedule-mobile-status-icon"></div>
          </div>
        </div>

        {/* Phone Content */}
        <div className="schedule-mobile-content">
          {/* Featured Card */}
          <div className="schedule-mobile-live-card">
            <div className="schedule-mobile-live-badge">{relativeLabel}</div>
            <div className="schedule-mobile-live-title">{courseTitle}</div>
            <div className="schedule-mobile-live-meta">
              {dateLabel} • {timeLabel}
            </div>
            <div className="schedule-mobile-live-copy">Guided by {teacherName}</div>
            <div className="schedule-mobile-primary-btn">
              <span className="schedule-mobile-primary-text">Join via Zoom</span>
            </div>
          </div>

          {/* Upcoming Sessions List */}
          <div className="schedule-mobile-schedule-wrapper">
            <div className="schedule-mobile-section-label">Upcoming Sessions</div>
            <div className="schedule-mobile-schedule-row">
              <div className="schedule-mobile-session-meta">
                <div className="schedule-mobile-session-day">{dayLabel}</div>
                <div className="schedule-mobile-session-time">{timeLabel}</div>
              </div>
              <div className="schedule-mobile-session-info">
                <div className="schedule-mobile-session-title">{courseTitle}</div>
                <div className="schedule-mobile-session-teacher">{teacherName}</div>
                <div className="schedule-mobile-session-date">{relativeLabel}</div>
              </div>
              <div className="schedule-mobile-outline-btn">
                <span className="schedule-mobile-outline-text">View</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

