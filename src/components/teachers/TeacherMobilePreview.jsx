import React from 'react';
import { ArrowLeft, Mail, Phone, Award, Star } from 'lucide-react';
import './TeacherMobilePreview.css';

export default function TeacherMobilePreview({ formData }) {
    const teacherName = formData.name || 'Teacher Name';
    const teacherExperience = formData.experience || 'Experience';
    const teacherSpecialization = formData.specialization || 'Specialization';
    const teacherPosition = formData.position || 'Position';
    const teacherEmail = formData.email || 'teacher@example.com';
    const teacherPhone = formData.phone || '+91 00000 00000';

    // Placeholder image
    const profileImage = formData.image || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&q=80';

    return (
        <div className="teacher-mobile-preview-container">
            <div className="teacher-mobile-frame">
                {/* Phone Status Bar */}
                <div className="teacher-mobile-status-bar">
                    <div className="teacher-mobile-status-time">9:41</div>
                    <div className="teacher-mobile-status-icons">
                        <div className="teacher-mobile-status-icon-cellular"></div>
                        <div className="teacher-mobile-status-icon-wifi"></div>
                        <div className="teacher-mobile-status-icon-battery"></div>
                    </div>
                </div>

                {/* Phone Content */}
                <div className="teacher-mobile-content">
                    {/* Header */}
                    <div className="teacher-mobile-header">
                        <ArrowLeft size={20} color="#1e293b" />
                        <div className="teacher-mobile-header-title">Teacher Profile</div>
                        <div style={{ width: 20 }}></div>
                    </div>

                    <div className="teacher-mobile-scroll-area">
                        {/* Profile Section */}
                        <div className="teacher-mobile-profile-card">
                            <div
                                className="teacher-mobile-image"
                                style={{
                                    backgroundImage: `url(${profileImage})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            ></div>
                            <div className="teacher-mobile-info">
                                <h3 className="teacher-mobile-name">{teacherName}</h3>
                                <p className="teacher-mobile-position">{teacherPosition}</p>
                                <div className="teacher-mobile-rating">
                                    <Star size={14} fill="#fbbf24" color="#fbbf24" />
                                    <Star size={14} fill="#fbbf24" color="#fbbf24" />
                                    <Star size={14} fill="#fbbf24" color="#fbbf24" />
                                    <Star size={14} fill="#fbbf24" color="#fbbf24" />
                                    <Star size={14} fill="#e2e8f0" color="#e2e8f0" />
                                    <span>4.0</span>
                                </div>
                            </div>
                        </div>

                        {/* Experience & Specialization */}
                        <div className="teacher-mobile-details-grid">
                            <div className="teacher-mobile-detail-item">
                                <div className="teacher-mobile-detail-icon">
                                    <Clock size={16} />
                                </div>
                                <div className="teacher-mobile-detail-text">
                                    <span>Experience</span>
                                    <span>{teacherExperience}</span>
                                </div>
                            </div>
                            <div className="teacher-mobile-detail-item">
                                <div className="teacher-mobile-detail-icon">
                                    <Award size={16} />
                                </div>
                                <div className="teacher-mobile-detail-text">
                                    <span>Specialization</span>
                                    <span>{teacherSpecialization}</span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="teacher-mobile-section">
                            <h4 className="teacher-mobile-section-title">Contact Information</h4>
                            <div className="teacher-mobile-contact-list">
                                <div className="teacher-mobile-contact-item">
                                    <Mail size={16} color="#64748b" />
                                    <span>{teacherEmail}</span>
                                </div>
                                <div className="teacher-mobile-contact-item">
                                    <Phone size={16} color="#64748b" />
                                    <span>{teacherPhone}</span>
                                </div>
                            </div>
                        </div>

                        {/* Bio Placeholder */}
                        <div className="teacher-mobile-section">
                            <h4 className="teacher-mobile-section-title">About Teacher</h4>
                            <p className="teacher-mobile-bio">
                                Experienced Bharatanatyam instructor dedicated to preserving classical traditions while inspiring modern students' growth.
                            </p>
                        </div>

                        <div className="teacher-mobile-button">
                            Book a Class
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Minimal Clock component for the preview
function Clock({ size, color = "currentColor" }) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
        </svg>
    );
}
