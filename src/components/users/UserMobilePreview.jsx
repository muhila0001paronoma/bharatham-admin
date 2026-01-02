
import React from 'react';
import { Signal, Wifi, Battery, ChevronLeft, Search, Bell } from 'lucide-react';
import './UserMobilePreview.css';

const UserMobilePreview = ({ formData }) => {
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className="user-mobile-preview-container">
            <div className="user-mobile-device">
                {/* Status Bar */}
                <div className="user-mobile-status-bar">
                    <span className="user-mobile-time">{currentTime}</span>
                    <div className="user-mobile-status-icons">
                        <Signal size={14} className="user-mobile-icon" />
                        <Wifi size={14} className="user-mobile-icon" />
                        <Battery size={14} className="user-mobile-icon" />
                    </div>
                </div>

                {/* Header */}
                <div className="user-mobile-header">
                    <div className="user-mobile-header-top">
                        <ChevronLeft size={20} />
                        <span className="user-mobile-header-title">User Profile</span>
                        <div className="user-mobile-header-spacer"></div>
                    </div>
                </div>

                {/* Content */}
                <div className="user-mobile-content">
                    <div className="user-mobile-profile-card">
                        <div className="user-mobile-avatar-container">
                            <div className="user-mobile-avatar">
                                {formData.firstName ? formData.firstName.charAt(0).toUpperCase() : 'U'}
                            </div>
                        </div>
                        <div className="user-mobile-info">
                            <h3 className="user-mobile-name">
                                {formData.firstName || 'First'} {formData.lastName || 'Last'}
                            </h3>
                            <span className="user-mobile-role-badge">
                                {formData.role || 'Student'}
                            </span>
                        </div>
                    </div>

                    <div className="user-mobile-details-section">
                        <h4 className="user-mobile-section-title">Contact Info</h4>
                        <div className="user-mobile-detail-row">
                            <span className="user-mobile-detail-label">Email</span>
                            <span className="user-mobile-detail-value">{formData.email || 'email@example.com'}</span>
                        </div>
                        <div className="user-mobile-detail-row">
                            <span className="user-mobile-detail-label">Phone</span>
                            <span className="user-mobile-detail-value">{formData.phoneNumber || '+1234567890'}</span>
                        </div>
                    </div>

                    <div className="user-mobile-details-section">
                        <h4 className="user-mobile-section-title">Account Status</h4>
                        <div className="user-mobile-detail-row">
                            <span className="user-mobile-detail-label">Verified</span>
                            <span className={`user-mobile-status-value ${formData.isVerified === 'True' || formData.isVerified === true ? 'verified' : 'unverified'}`}>
                                {formData.isVerified === 'True' || formData.isVerified === true ? 'Yes' : 'No'}
                            </span>
                        </div>
                        <div className="user-mobile-detail-row">
                            <span className="user-mobile-detail-label">Active</span>
                            <span className={`user-mobile-status-value ${formData.active ? 'active' : 'inactive'}`}>
                                {formData.active ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                    </div>

                </div>

                {/* Bottom Navigation (Mock) */}
                <div className="user-mobile-bottom-nav">
                    <div className="user-mobile-nav-indicator"></div>
                </div>
            </div>
        </div>
    );
};

export default UserMobilePreview;
