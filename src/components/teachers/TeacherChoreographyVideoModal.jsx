import React, { useState, useEffect } from 'react';
import { X, Video, Image as ImageIcon } from 'lucide-react';
import ChoreographyVideoMobilePreview from './ChoreographyVideoMobilePreview';
import './TeacherChoreographyVideoModal.css';

const TeacherChoreographyVideoModal = ({ isOpen, onClose, onSave, videoData }) => {
    const [formData, setFormData] = useState({
        title: '',
        teacherName: 'Teacher User', // Default to current teacher
        videoUrl: '',
        thumbnailUrl: '',
        description: '',
        level: 'Beginner',
        duration: '',
        active: true
    });

    useEffect(() => {
        if (videoData) {
            setFormData(videoData);
        } else {
            setFormData({
                title: '',
                teacherName: 'Teacher User',
                videoUrl: '',
                thumbnailUrl: '',
                description: '',
                level: 'Beginner',
                duration: '',
                active: true
            });
        }
    }, [videoData, isOpen]);

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
        <div className="video-modal-overlay" onClick={onClose}>
            <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="video-modal-header">
                    <h3 className="video-modal-title">
                        {videoData ? 'Edit Video' : 'Add New Video'}
                    </h3>
                    <button className="video-modal-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="video-modal-body-container">
                    {/* Left Side - Form */}
                    <div className="video-modal-form-section">
                        <form onSubmit={handleSubmit} className="video-modal-form" id="videoForm">
                            <div className="video-modal-row">
                                <div className="video-modal-field">
                                    <label>Video Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        placeholder="e.g. Adavus - Basic Steps"
                                        required
                                    />
                                </div>
                                <div className="video-modal-field">
                                    <label>Level</label>
                                    <select name="level" value={formData.level} onChange={handleChange}>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>
                            </div>

                            <div className="video-modal-field">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Enter video description..."
                                    rows={4}
                                    required
                                />
                            </div>

                            <div className="video-modal-row">
                                <div className="video-modal-field">
                                    <label>Duration</label>
                                    <input
                                        type="text"
                                        name="duration"
                                        value={formData.duration}
                                        onChange={handleChange}
                                        placeholder="e.g. 14 minutes"
                                        required
                                    />
                                </div>
                                <div className="video-modal-field">
                                    <label className="checkbox-label" style={{ marginTop: '30px' }}>
                                        <input
                                            type="checkbox"
                                            name="active"
                                            checked={formData.active}
                                            onChange={handleChange}
                                        />
                                        <span>Active Video</span>
                                    </label>
                                </div>
                            </div>

                            <div className="video-modal-row">
                                <div className="video-modal-field">
                                    <label>Video URL</label>
                                    <div className="input-with-icon">
                                        <Video size={18} className="input-icon" />
                                        <input
                                            type="url"
                                            name="videoUrl"
                                            value={formData.videoUrl}
                                            onChange={handleChange}
                                            placeholder="https://example.com/video.mp4"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="video-modal-field">
                                    <label>Thumbnail URL</label>
                                    <div className="input-with-icon">
                                        <ImageIcon size={18} className="input-icon" />
                                        <input
                                            type="url"
                                            name="thumbnailUrl"
                                            value={formData.thumbnailUrl}
                                            onChange={handleChange}
                                            placeholder="https://example.com/image.jpg"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Right Side - Preview */}
                    <div className="video-modal-preview-section">
                        <div className="video-preview-header">
                            <h3 className="video-preview-title">Mobile Preview</h3>
                        </div>
                        <ChoreographyVideoMobilePreview formData={formData} />
                    </div>
                </div>

                <div className="video-modal-footer">
                    <button type="button" className="modal-btn cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" form="videoForm" className="modal-btn save">
                        {videoData ? 'Update Video' : 'Add Video'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TeacherChoreographyVideoModal;
