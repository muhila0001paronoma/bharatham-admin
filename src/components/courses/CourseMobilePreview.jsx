import React from 'react';
import { ArrowLeft, Clock, Award, Star, Share2, MoreVertical } from 'lucide-react';
import './CourseMobilePreview.css';

export default function CourseMobilePreview({ formData }) {
    return (
        <div className="course-mobile-preview-container">
            <div className="course-mobile-frame">
                {/* Phone Status Bar */}
                <div className="course-mobile-status-bar">
                    <div className="course-mobile-status-time">9:41</div>
                    <div className="course-mobile-status-icons">
                        <div className="course-mobile-status-icon"></div>
                        <div className="course-mobile-status-icon"></div>
                        <div className="course-mobile-status-icon"></div>
                    </div>
                </div>

                {/* Phone Content */}
                <div className="course-mobile-content">
                    {/* Header */}
                    <div className="course-mobile-header">
                        <div className="course-mobile-back-button">
                            <ArrowLeft size={18} color="#1e293b" />
                        </div>
                        <div className="course-mobile-title-text">Course Details</div>
                        <div className="course-mobile-actions">
                            <Share2 size={16} color="#1e293b" />
                            <MoreVertical size={16} color="#1e293b" />
                        </div>
                    </div>

                    <div className="course-mobile-course-card">
                        <div className="course-mobile-image-container">
                            {formData.image ? (
                                <img src={formData.image} alt="Course" className="course-mobile-image" />
                            ) : (
                                <div className="course-mobile-image-placeholder">
                                    <span>Course Image</span>
                                </div>
                            )}
                            <div className="course-mobile-level-badge">{formData.level || 'Beginner'}</div>
                        </div>

                        <div className="course-mobile-info">
                            <h3 className="course-mobile-course-title">
                                {formData.title || 'Course Title Here'}
                            </h3>

                            <div className="course-mobile-meta">
                                <div className="course-mobile-meta-item">
                                    <Clock size={12} />
                                    <span>{formData.duration || '12 weeks'}</span>
                                </div>
                                <div className="course-mobile-meta-item">
                                    <Award size={12} />
                                    <span>{formData.totalLessons || '0'} Lessons</span>
                                </div>
                                <div className="course-mobile-meta-item">
                                    <Star size={12} fill="#fbbf24" color="#fbbf24" />
                                    <span>4.8 (120)</span>
                                </div>
                            </div>

                            <div className="course-mobile-teacher-section">
                                <div className="course-mobile-teacher-avatar">
                                    {formData.teacherName ? formData.teacherName.charAt(0) : 'T'}
                                </div>
                                <div className="course-mobile-teacher-info">
                                    <span className="course-mobile-teacher-label">Instructor</span>
                                    <span className="course-mobile-teacher-name">{formData.teacherName || 'Sita Raman'}</span>
                                </div>
                            </div>

                            <div className="course-mobile-price-section">
                                <span className="course-mobile-price">₹{formData.price || '24,500'}</span>
                                <span className="course-mobile-price-label">One time payment</span>
                            </div>

                            <div className="course-mobile-description">
                                <h4 className="course-mobile-section-title">About Course</h4>
                                <p>{formData.about || 'Learn foundational Bharatanatyam movements and rhythms in this comprehensive course designed for beginners...'}</p>
                            </div>

                            <div className="course-mobile-start-date">
                                <span className="course-mobile-date-label">Batch Starts: </span>
                                <span className="course-mobile-date-value">{formData.startDate || '2025-12-04'}</span>
                            </div>
                        </div>
                    </div>

                    <button className="course-mobile-enroll-btn">
                        Enroll Now
                    </button>
                </div>
            </div>
        </div>
    );
}
