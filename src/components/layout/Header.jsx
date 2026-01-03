import React from 'react';
import './Header.css';

export default function Header({ pageTitle = 'Dashboard' }) {
  const role = localStorage.getItem('role');
  const isTeacher = role === 'teacher';

  return (
    <div className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">
            {pageTitle}
          </h1>
          <p className="header-subtitle">
            {isTeacher ? 'Bharatham Teacher Panel' : 'Bharatham Admin Panel'}
          </p>
        </div>
        <div className="header-user-section">
          <div className="header-avatar">
            {isTeacher ? 'T' : 'A'}
          </div>
          <div className="header-user-info">
            <div className="header-user-name">
              {isTeacher ? 'Teacher User' : 'Admin User'}
            </div>
            <div className="header-user-role">
              {isTeacher ? 'Teacher' : 'Administrator'}
            </div>
          </div>
          <div className="header-notification">
            <div className="header-notification-badge"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

