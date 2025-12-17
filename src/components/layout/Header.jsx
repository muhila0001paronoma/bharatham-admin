import React from 'react';
import './Header.css';

export default function Header({ pageTitle = 'Dashboard' }) {
  return (
    <div className="header">
      <div className="header-content">
        <div className="header-left">
          <h1 className="header-title">
            {pageTitle}
          </h1>
          <p className="header-subtitle">
            Bharatham Admin Panel
          </p>
        </div>
        <div className="header-user-section">
          <div className="header-avatar">
            A
          </div>
          <div className="header-user-info">
            <div className="header-user-name">
              Admin User
            </div>
            <div className="header-user-role">
              Administrator
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

