
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Input } from '../ui/input';
import UserMobilePreview from './UserMobilePreview';
import '../theory/TheoryModal.css'; // Reusing TheoryModal styles

export default function UserModal({ isOpen, onClose, onSave, userData = null }) {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phoneNumber: '',
        isVerified: 'True', // Default to True (auto-verified by admin)
        role: 'user', // Default to 'user' to match backend
        active: true
    });

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    useEffect(() => {
        if (userData) {
            // UPDATE mode - password field not shown (optional update)
            setFormData({
                firstName: userData.firstName || '',
                lastName: userData.lastName || '',
                email: userData.email || '',
                password: '', // Not used in update (optional)
                phoneNumber: userData.phoneNumber || '',
                isVerified: userData.isVerified || 'True',
                role: userData.role || 'user',
                active: userData.active !== undefined ? userData.active : true
            });
        } else {
            // CREATE mode - password field required
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '', // Required for CREATE
                phoneNumber: '',
                isVerified: 'True', // Auto-verified by admin
                role: 'user', // Default role
                active: true
            });
        }
    }, [userData, isOpen]);

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
        <div className="theory-modal-overlay" onClick={onClose}>
            <div className="theory-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="theory-modal-header">
                    <h2 className="theory-modal-title">
                        {userData ? 'Update User' : 'Add New User'}
                    </h2>
                    <button className="theory-modal-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="theory-modal-body">
                    {/* Left Side - Form */}
                    <div className="theory-modal-form-section">
                        <form onSubmit={handleSubmit} className="theory-form">
                            <div className="theory-form-group">
                                <label htmlFor="firstName" className="theory-form-label">
                                    First Name
                                </label>
                                <Input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="Enter first name"
                                    required
                                />
                            </div>

                            <div className="theory-form-group">
                                <label htmlFor="lastName" className="theory-form-label">
                                    Last Name
                                </label>
                                <Input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Enter last name"
                                    required
                                />
                            </div>

                            <div className="theory-form-group">
                                <label htmlFor="email" className="theory-form-label">
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter email address"
                                    required={!userData} // Required only for CREATE
                                    disabled={!!userData} // Disabled for UPDATE (email is path variable)
                                />
                            </div>

                            {!userData && (
                                <div className="theory-form-group">
                                    <label htmlFor="password" className="theory-form-label">
                                        Password
                                    </label>
                                    <Input
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter password (min 8 characters)"
                                        required
                                        minLength={8}
                                    />
                                </div>
                            )}

                            <div className="theory-form-group">
                                <label htmlFor="phoneNumber" className="theory-form-label">
                                    Phone Number
                                </label>
                                <Input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    required={!userData} // Required only for CREATE
                                />
                            </div>

                            <div className="theory-form-group">
                                <label htmlFor="role" className="theory-form-label">
                                    Role
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="theory-form-select"
                                >
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                    <option value="teacher">Teacher</option>
                                </select>
                            </div>

                            <div className="theory-form-group">
                                <label htmlFor="isVerified" className="theory-form-label">
                                    Is Verified
                                </label>
                                <select
                                    id="isVerified"
                                    name="isVerified"
                                    value={formData.isVerified}
                                    onChange={handleChange}
                                    className="theory-form-select"
                                >
                                    <option value="True">True</option>
                                    <option value="False">False</option>
                                </select>
                            </div>

                            <div className="theory-form-group">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="active"
                                        checked={formData.active}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                                    />
                                    <span className="text-sm font-medium text-gray-700">Active</span>
                                </label>
                            </div>

                            <div className="theory-form-actions">
                                <button type="button" className="theory-form-cancel-btn" onClick={onClose}>
                                    Cancel
                                </button>
                                <button type="submit" className="theory-form-submit-btn">
                                    {userData ? 'Update' : 'Add'} User
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Right Side - Mobile Preview */}
                    <div className="theory-modal-preview-section">
                        <div className="theory-preview-header">
                            <h3 className="theory-preview-title">Mobile Preview</h3>
                        </div>
                        <UserMobilePreview formData={formData} />
                    </div>
                </div>
            </div>
        </div>
    );
}
