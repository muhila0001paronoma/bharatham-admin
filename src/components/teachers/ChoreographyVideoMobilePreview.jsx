import React from 'react';
import { Play, ArrowLeft, MoreVertical, Heart, Share2, MessageCircle } from 'lucide-react';
import './ChoreographyVideoMobilePreview.css';

export default function ChoreographyVideoMobilePreview({ formData }) {
    return (
        <div className="video-mobile-preview-container">
            <div className="video-mobile-frame">
                {/* Phone Status Bar */}
                <div className="video-mobile-status-bar">
                    <div className="video-mobile-status-time">9:41</div>
                    <div className="video-mobile-status-icons">
                        <div className="video-mobile-status-icon"></div>
                        <div className="video-mobile-status-icon"></div>
                        <div className="video-mobile-status-icon"></div>
                    </div>
                </div>

                {/* Phone Content */}
                <div className="video-mobile-content">
                    {/* Header */}
                    <div className="video-mobile-header">
                        <div className="video-mobile-back-button">
                            <ArrowLeft size={18} color="#000" />
                        </div>
                        <div className="video-mobile-title-main">Bharatham App</div>
                        <div className="video-mobile-more">
                            <MoreVertical size={18} color="#000" />
                        </div>
                    </div>

                    <div className="video-mobile-player-section">
                        {/* Video Thumbnail Area */}
                        <div className="video-mobile-placeholder">
                            {formData.thumbnailUrl ? (
                                <img
                                    src={formData.thumbnailUrl}
                                    alt="Thumbnail"
                                    className="video-mobile-thumbnail"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/300x180?text=Invalid+Thumbnail'; }}
                                />
                            ) : (
                                <div className="video-mobile-empty-thumbnail">
                                    <span>Enter Thumbnail URL to Preview</span>
                                </div>
                            )}
                            <div className="video-mobile-play-overlay">
                                <div className="video-mobile-play-btn">
                                    <Play size={24} fill="currentColor" />
                                </div>
                            </div>
                            {formData.duration && (
                                <div className="video-mobile-duration-badge">{formData.duration}</div>
                            )}
                        </div>

                        <div className="video-mobile-details">
                            <div className="video-mobile-info-top">
                                <h4 className="video-mobile-video-title">
                                    {formData.title || 'Video Title Goes Here'}
                                </h4>
                                <div className="video-mobile-icons">
                                    <Heart size={18} />
                                    <Share2 size={18} />
                                </div>
                            </div>

                            <div className="video-mobile-teacher-info">
                                <div className="video-mobile-teacher-avatar">
                                    {formData.teacherName ? formData.teacherName.charAt(0) : 'T'}
                                </div>
                                <div className="video-mobile-teacher-details">
                                    <span className="video-mobile-teacher-name">{formData.teacherName || 'Teacher Name'}</span>
                                    <span className="video-mobile-level-badge">{formData.level}</span>
                                </div>
                            </div>

                            <div className="video-mobile-description">
                                <p>{formData.description || 'Provide a description to see how it looks on the mobile app...'}</p>
                            </div>
                        </div>

                        <div className="video-mobile-tabs">
                            <div className="video-mobile-tab active">Overview</div>
                            <div className="video-mobile-tab">Comments</div>
                        </div>
                    </div>

                    <div className="video-mobile-footer-nav">
                        <div className="nav-item">🏠</div>
                        <div className="nav-item">📂</div>
                        <div className="nav-item active">🎬</div>
                        <div className="nav-item">⚙️</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
