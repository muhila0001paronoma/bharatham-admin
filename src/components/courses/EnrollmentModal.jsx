import React, { useState, useEffect } from 'react';
import { X, Mail, Book, Calendar } from 'lucide-react';
import EnrollmentMobilePreview from './EnrollmentMobilePreview';
import './EnrollmentModal.css';

const EnrollmentModal = ({ isOpen, onClose, onSave, enrollmentData }) => {
    const [formData, setFormData] = useState({
        courseTitle: '',
        userEmail: '',
        enrolledAt: '',
        active: true
    });

    useEffect(() => {
        if (enrollmentData) {
            setFormData(enrollmentData);
        } else {
            setFormData({
                courseTitle: '',
                userEmail: '',
                enrolledAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
                active: true
            });
        }
    }, [enrollmentData, isOpen]);

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
        <div className="enrollment-modal-overlay" onClick={onClose}>
            <div className="enrollment-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="enrollment-modal-header">
                    <h3 className="enrollment-modal-title">
                        {enrollmentData ? 'Edit Enrollment' : 'Add New Enrollment'}
                    </h3>
                    <button className="enrollment-modal-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="enrollment-modal-body-container">
                    <div className="enrollment-modal-form-section">
                        <form onSubmit={handleSubmit} className="enrollment-modal-form" id="enrollmentForm">
                            <div className="enrollment-modal-field">
                                <label>Course Title</label>
                                <div className="enrollment-input-with-icon">
                                    <Book size={18} className="enrollment-input-icon" />
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

                            <div className="enrollment-modal-field">
                                <label>User Email</label>
                                <div className="enrollment-input-with-icon">
                                    <Mail size={18} className="enrollment-input-icon" />
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

                            <div className="enrollment-modal-field">
                                <label>Enrolled At</label>
                                <div className="enrollment-input-with-icon">
                                    <Calendar size={18} className="enrollment-input-icon" />
                                    <input
                                        type="text"
                                        name="enrolledAt"
                                        value={formData.enrolledAt}
                                        onChange={handleChange}
                                        placeholder="YYYY-MM-DD HH:mm:ss"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="enrollment-modal-field">
                                <label className="enrollment-checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="active"
                                        checked={formData.active}
                                        onChange={handleChange}
                                    />
                                    <span>Active Enrollment</span>
                                </label>
                            </div>
                        </form>
                    </div>

                    <div className="enrollment-modal-preview-section">
                        <div className="enrollment-preview-header">
                            <h3 className="enrollment-preview-title">Mobile Preview</h3>
                        </div>
                        <EnrollmentMobilePreview formData={formData} />
                    </div>
                </div>

                <div className="enrollment-modal-footer">
                    <button type="button" className="enrollment-modal-btn cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" form="enrollmentForm" className="enrollment-modal-btn save">
                        {enrollmentData ? 'Update Enrollment' : 'Save Enrollment'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EnrollmentModal;
