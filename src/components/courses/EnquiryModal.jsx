import React, { useState, useEffect } from 'react';
import { X, Mail, Book, Tag, MessageSquare, Reply } from 'lucide-react';
import EnquiryMobilePreview from './EnquiryMobilePreview';
import './EnquiryModal.css';

const EnquiryModal = ({ isOpen, onClose, onSave, enquiryData }) => {
    const [formData, setFormData] = useState({
        courseTitle: '',
        userEmail: '',
        subject: '',
        message: '',
        reply: '',
        enquiredAt: '',
        active: true
    });

    useEffect(() => {
        if (enquiryData) {
            setFormData(enquiryData);
        } else {
            setFormData({
                courseTitle: '',
                userEmail: '',
                subject: '',
                message: '',
                reply: '',
                enquiredAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
                active: true
            });
        }
    }, [enquiryData, isOpen]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="enquiry-modal-overlay" onClick={onClose}>
            <div className="enquiry-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="enquiry-modal-header">
                    <h3 className="enquiry-modal-title">
                        {enquiryData ? 'Edit Enquiry' : 'Add New Enquiry'}
                    </h3>
                    <button className="enquiry-modal-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="enquiry-modal-body-container">
                    <div className="enquiry-modal-form-section">
                        <form onSubmit={handleSubmit} className="enquiry-modal-form" id="enquiryForm">
                            <div className="enquiry-modal-row">
                                <div className="enquiry-modal-field">
                                    <label>Course Title</label>
                                    <div className="enquiry-input-with-icon">
                                        <Book size={18} className="enquiry-input-icon" />
                                        <input
                                            type="text"
                                            name="courseTitle"
                                            value={formData.courseTitle}
                                            onChange={handleChange}
                                            placeholder="e.g. Beginner Bharatanatyam Basics"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="enquiry-modal-field">
                                    <label>User Email</label>
                                    <div className="enquiry-input-with-icon">
                                        <Mail size={18} className="enquiry-input-icon" />
                                        <input
                                            type="email"
                                            name="userEmail"
                                            value={formData.userEmail}
                                            onChange={handleChange}
                                            placeholder="e.g. user@example.com"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="enquiry-modal-field">
                                <label>Subject</label>
                                <div className="enquiry-input-with-icon">
                                    <Tag size={18} className="enquiry-input-icon" />
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="Enter enquiry subject..."
                                        required
                                    />
                                </div>
                            </div>

                            <div className="enquiry-modal-field">
                                <label>Message</label>
                                <div className="enquiry-input-with-icon textarea-icon-wrapper">
                                    <MessageSquare size={18} className="enquiry-input-icon area-icon" />
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="User inquiry message..."
                                        rows={4}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="enquiry-modal-field">
                                <label>Response / Reply</label>
                                <div className="enquiry-input-with-icon textarea-icon-wrapper">
                                    <Reply size={18} className="enquiry-input-icon area-icon" />
                                    <textarea
                                        name="reply"
                                        value={formData.reply}
                                        onChange={handleChange}
                                        placeholder="Type your response here..."
                                        rows={3}
                                    />
                                </div>
                            </div>

                            <div className="enquiry-modal-field">
                                <label className="enquiry-checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="active"
                                        checked={formData.active}
                                        onChange={handleChange}
                                    />
                                    <span>Active Enquiry</span>
                                </label>
                            </div>
                        </form>
                    </div>

                    <div className="enquiry-modal-preview-section">
                        <div className="enquiry-preview-header">
                            <h3 className="enquiry-preview-title">Mobile Preview</h3>
                        </div>
                        <EnquiryMobilePreview formData={formData} />
                    </div>
                </div>

                <div className="enquiry-modal-footer">
                    <button type="button" className="enquiry-modal-btn cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" form="enquiryForm" className="enquiry-modal-btn save">
                        {enquiryData ? 'Update Enquiry' : 'Save Enquiry'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EnquiryModal;
