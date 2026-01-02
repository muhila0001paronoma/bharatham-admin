
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Input } from '../ui/input';
import '../theory/TheoryModal.css'; // Reusing styles

export default function PreferenceModal({ isOpen, onClose, onSave, initialData = null, title = '', label = '', placeholder = '' }) {
    const [value, setValue] = useState('');

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
        setValue(initialData ? (typeof initialData === 'string' ? initialData : initialData.text || initialData.question || '') : '');
    }, [initialData, isOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(value);
    };

    if (!isOpen) return null;

    return (
        <div className="theory-modal-overlay" onClick={onClose}>
            <div className="theory-modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', height: 'auto', minHeight: 'auto' }}>
                <div className="theory-modal-header">
                    <h2 className="theory-modal-title">{title}</h2>
                    <button className="theory-modal-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="theory-modal-body" style={{ flexDirection: 'column' }}>
                    <div className="theory-modal-form-section" style={{ width: '100%', padding: '0', border: 'none' }}>
                        <form onSubmit={handleSubmit} className="theory-form">
                            <div className="theory-form-group">
                                <label className="theory-form-label">
                                    {label}
                                </label>
                                <Input
                                    type="text"
                                    value={value}
                                    onChange={(e) => setValue(e.target.value)}
                                    placeholder={placeholder}
                                    required
                                    autoFocus
                                />
                            </div>

                            <div className="theory-form-actions">
                                <button type="button" className="theory-form-cancel-btn" onClick={onClose}>
                                    Cancel
                                </button>
                                <button type="submit" className="theory-form-submit-btn">
                                    Save
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
