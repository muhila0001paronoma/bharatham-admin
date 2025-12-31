import React, { useState, useEffect } from 'react';
import { X, Upload, Calendar, DollarSign, BookOpen, Clock } from 'lucide-react';
import CourseMobilePreview from './CourseMobilePreview';
import './CourseModal.css';

const CourseModal = ({ isOpen, onClose, onSave, courseData }) => {
    const [formData, setFormData] = useState({
        title: '',
        about: '',
        duration: '',
        level: 'Beginner',
        price: '',
        status: 'Upcoming',
        teacherName: '',
        startDate: '',
        endDate: '',
        active: true,
        image: ''
    });

    useEffect(() => {
        if (courseData) {
            setFormData(courseData);
        } else {
            setFormData({
                title: '',
                about: '',
                duration: '',
                level: 'Beginner',
                price: '',
                status: 'Upcoming',
                teacherName: '',
                startDate: '',
                endDate: '',
                active: true,
                image: ''
            });
        }
    }, [courseData, isOpen]);

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
        <div className="course-modal-overlay" onClick={onClose}>
            <div className="course-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="course-modal-header">
                    <h3 className="course-modal-title">
                        {courseData ? 'Edit Course' : 'Add New Course'}
                    </h3>
                    <button className="course-modal-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="course-modal-body-container">
                    <div className="course-modal-form-section">
                        <form onSubmit={handleSubmit} className="course-modal-form" id="courseForm">
                            <div className="course-modal-row">
                                <div className="course-modal-field">
                                    <label>Course Title</label>
                                    <div className="input-with-icon">
                                        <BookOpen size={18} className="input-icon" />
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            placeholder="e.g. Beginner Bharatanatyam Basics"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="course-modal-field">
                                    <label>Teacher Name</label>
                                    <input
                                        type="text"
                                        name="teacherName"
                                        value={formData.teacherName}
                                        onChange={handleChange}
                                        placeholder="e.g. Sita Raman"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="course-modal-field">
                                <label>About Course</label>
                                <textarea
                                    name="about"
                                    value={formData.about}
                                    onChange={handleChange}
                                    placeholder="Enter course description..."
                                    rows={3}
                                    required
                                />
                            </div>

                            <div className="course-modal-row">
                                <div className="course-modal-field">
                                    <label>Duration</label>
                                    <div className="input-with-icon">
                                        <Clock size={18} className="input-icon" />
                                        <input
                                            type="text"
                                            name="duration"
                                            value={formData.duration}
                                            onChange={handleChange}
                                            placeholder="e.g. 12 weeks"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="course-modal-field">
                                    <label>Level</label>
                                    <select name="level" value={formData.level} onChange={handleChange}>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>
                            </div>

                            <div className="course-modal-row">
                                <div className="course-modal-field">
                                    <label>Price (₹)</label>
                                    <div className="input-with-icon">
                                        <DollarSign size={18} className="input-icon" />
                                        <input
                                            type="text"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            placeholder="e.g. 24,500"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="course-modal-field">
                                    <label>Status</label>
                                    <select name="status" value={formData.status} onChange={handleChange}>
                                        <option value="Upcoming">Upcoming</option>
                                        <option value="Ongoing">Ongoing</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                            </div>

                            <div className="course-modal-row">
                                <div className="course-modal-field">
                                    <label>Start Date</label>
                                    <div className="input-with-icon">
                                        <Calendar size={18} className="input-icon" />
                                        <input
                                            type="date"
                                            name="startDate"
                                            value={formData.startDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="course-modal-field">
                                    <label>End Date</label>
                                    <div className="input-with-icon">
                                        <Calendar size={18} className="input-icon" />
                                        <input
                                            type="date"
                                            name="endDate"
                                            value={formData.endDate}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="course-modal-field">
                                <label>Course Image URL</label>
                                <div className="input-with-icon">
                                    <Upload size={18} className="input-icon" />
                                    <input
                                        type="url"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleChange}
                                        placeholder="https://example.com/course-image.jpg"
                                    />
                                </div>
                            </div>

                            <div className="course-modal-field">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="active"
                                        checked={formData.active}
                                        onChange={handleChange}
                                    />
                                    <span>Active Course</span>
                                </label>
                            </div>
                        </form>
                    </div>

                    <div className="course-modal-preview-section">
                        <div className="course-preview-header">
                            <h3 className="course-preview-title">Mobile Preview</h3>
                        </div>
                        <CourseMobilePreview formData={formData} />
                    </div>
                </div>

                <div className="course-modal-footer">
                    <button type="button" className="modal-btn cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" form="courseForm" className="modal-btn save">
                        {courseData ? 'Update Course' : 'Save Course'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseModal;
