import React from 'react';
import { ArrowLeft, Send, MessageCircle, Clock } from 'lucide-react';
import './EnquiryMobilePreview.css';

export default function EnquiryMobilePreview({ formData }) {
    return (
        <div className="enquiry-mobile-preview-container">
            <div className="enquiry-mobile-frame">
                {/* Phone Status Bar */}
                <div className="enquiry-mobile-status-bar">
                    <div className="enquiry-mobile-status-time">9:41</div>
                    <div className="enquiry-mobile-status-icons">
                        <div className="enquiry-mobile-status-icon"></div>
                        <div className="enquiry-mobile-status-icon"></div>
                        <div className="enquiry-mobile-status-icon"></div>
                    </div>
                </div>

                {/* Phone Content */}
                <div className="enquiry-mobile-content">
                    <div className="enquiry-mobile-header">
                        <ArrowLeft size={18} color="#1e293b" />
                        <span className="enquiry-mobile-header-title">Enquiry Details</span>
                        <div style={{ width: 18 }}></div>
                    </div>

                    <div className="enquiry-mobile-chat-view">
                        <div className="enquiry-mobile-date-stamp">
                            {formData.enquiredAt ? formData.enquiredAt.split(' ')[0] : 'Today'}
                        </div>

                        <div className="enquiry-mobile-message-card">
                            <div className="enquiry-mobile-course-tag">
                                {formData.courseTitle || 'General Enquiry'}
                            </div>
                            <h4 className="enquiry-mobile-subject">
                                {formData.subject || 'Enquiry Subject'}
                            </h4>
                            <p className="enquiry-mobile-message">
                                {formData.message || 'Please type your enquiry message in the form to see how it looks here...'}
                            </p>
                            <div className="enquiry-mobile-message-meta">
                                <Clock size={10} />
                                <span>{formData.enquiredAt ? formData.enquiredAt.split(' ')[1] : '09:41 AM'}</span>
                            </div>
                        </div>

                        {formData.reply && (
                            <div className="enquiry-mobile-reply-card">
                                <p className="enquiry-mobile-reply-text">{formData.reply}</p>
                                <div className="enquiry-mobile-reply-meta">
                                    <span>Admin Support</span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="enquiry-mobile-input-bar">
                        <div className="enquiry-mobile-input-placeholder">Send a follow-up...</div>
                        <div className="enquiry-mobile-send-btn">
                            <Send size={14} color="#fff" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
