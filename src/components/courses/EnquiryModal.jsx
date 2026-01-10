import React, { useState, useEffect } from 'react';
import { X, Mail, Book, Tag, MessageSquare, Reply } from 'lucide-react';
import EnquiryMobilePreview from './EnquiryMobilePreview';
import { courseService } from '../../services/courseService';
import './EnquiryModal.css';

const EnquiryModal = ({ isOpen, onClose, onSave, enquiryData }) => {
    const [formData, setFormData] = useState({
        courseId: '',
        courseTitle: '',
        userEmail: '',
        subject: '',
        message: '',
        reply: '',
        enquiredAt: '',
        active: true
    });

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await courseService.getAll();
                if (response.success) {
                    setCourses(response.data);
                }
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        if (enquiryData) {
            setFormData(enquiryData);
        } else {
            setFormData({
                courseId: '',
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

        if (name === 'courseId') {
            const selectedCourse = courses.find(c => c.id === value);
            setFormData(prev => ({
                ...prev,
                courseId: value,
                courseTitle: selectedCourse ? selectedCourse.courseTitle : ''
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: type === 'checkbox' ? checked : value
            }));
        }
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
                                    <label>Course</label>
                                    <div className="enquiry-input-with-icon">
                                        <Book size={18} className="enquiry-input-icon" />
                                        <select
                                            name="courseId"
                                            value={formData.courseId}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="">Select a Course</option>
                                            {courses.map(course => (
                                                <option key={course.id} value={course.id}>
                                                    {course.courseTitle}
                                                </option>
                                            ))}
                                        </select>
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
