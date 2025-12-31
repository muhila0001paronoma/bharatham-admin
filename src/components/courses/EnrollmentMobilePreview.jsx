import React from 'react';
import { ArrowLeft, CheckCircle2, Share2, BookOpen } from 'lucide-react';
import './EnrollmentMobilePreview.css';

export default function EnrollmentMobilePreview({ formData }) {
    return (
        <div className="enrollment-mobile-preview-container">
            <div className="enrollment-mobile-frame">
                {/* Phone Status Bar */}
                <div className="enrollment-mobile-status-bar">
                    <div className="enrollment-mobile-status-time">9:41</div>
                    <div className="enrollment-mobile-status-icons">
                        <div className="enrollment-mobile-status-icon"></div>
                        <div className="enrollment-mobile-status-icon"></div>
                        <div className="enrollment-mobile-status-icon"></div>
                    </div>
                </div>

                {/* Phone Content */}
                <div className="enrollment-mobile-content">
                    <div className="enrollment-mobile-header">
                        <ArrowLeft size={18} color="#1e293b" />
                        <span className="enrollment-mobile-header-title">Confirmation</span>
                        <Share2 size={16} color="#1e293b" />
                    </div>

                    <div className="enrollment-mobile-success-section">
                        <div className="enrollment-mobile-success-icon">
                            <CheckCircle2 size={48} color="#10b981" />
                        </div>
                        <h3 className="enrollment-mobile-status-heading">Enrolled Successfully</h3>
                        <p className="enrollment-mobile-status-subheading">Welcome to the course!</p>
                    </div>

                    <div className="enrollment-mobile-details-card">
                        <div className="enrollment-mobile-detail-row">
                            <span className="enrollment-mobile-detail-label">Course</span>
                            <span className="enrollment-mobile-detail-value">{formData.courseTitle || 'Course Title'}</span>
                        </div>
                        <div className="enrollment-mobile-detail-row">
                            <span className="enrollment-mobile-detail-label">Student</span>
                            <span className="enrollment-mobile-detail-value">{formData.userEmail || 'student@email.com'}</span>
                        </div>
                        <div className="enrollment-mobile-detail-row">
                            <span className="enrollment-mobile-detail-label">Status</span>
                            <span className={`enrollment-mobile-detail-value ${formData.active ? 'status-active' : ''}`}>
                                {formData.active ? 'Active' : 'Inactive'}
                            </span>
                        </div>
                        <div className="enrollment-mobile-detail-row">
                            <span className="enrollment-mobile-detail-label">Enrolled Date</span>
                            <span className="enrollment-mobile-detail-value">
                                {formData.enrolledAt ? formData.enrolledAt.split(' ')[0] : new Date().toISOString().slice(0, 10)}
                            </span>
                        </div>
                        <div className="enrollment-mobile-detail-row">
                            <span className="enrollment-mobile-detail-label">ID</span>
                            <span className="enrollment-mobile-detail-value">#ENR{Math.floor(Math.random() * 9000) + 1000}</span>
                        </div>
                    </div>

                    <button className="enrollment-mobile-action-btn">
                        <BookOpen size={16} />
                        <span>Go to Course</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
