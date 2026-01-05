import React from 'react';
import './Header.css';

export default function Header({ pageTitle = 'Dashboard' }) {
  const role = localStorage.getItem('role');
  const isTeacher = role === 'teacher';

  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  const userName = userData.firstName ? `${userData.firstName} ${userData.lastName}` : (isTeacher ? 'Teacher User' : 'Admin User');
  const userInitial = userData.firstName ? userData.firstName.charAt(0).toUpperCase() : (isTeacher ? 'T' : 'A');

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
            {userInitial}
          </div>
          <div className="header-user-info">
            <div className="header-user-name">
              {userName}
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

