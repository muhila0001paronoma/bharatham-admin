import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Input } from '../ui/input';
import './PreferenceModal.css';

export default function PreferenceModal({
  isOpen,
  onClose,
  onSave,
  initialData = '',
  title = 'Add Item',
  label = 'Text',
  placeholder = 'Enter text here...'
}) {
  const [text, setText] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setText(initialData || '');
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialData]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSave(text.trim());
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="preference-modal-overlay" onClick={handleOverlayClick}>
      <div className="preference-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="preference-modal-header">
          <h2 className="preference-modal-title">{title}</h2>
          <button className="preference-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="preference-modal-form">
          <div className="preference-modal-body">
            <div className="preference-form-group">
              <label htmlFor="text-input" className="preference-form-label">
                {label}
              </label>
              <Input
                id="text-input"
                type="text"
                value={text}
                onChange={handleChange}
                placeholder={placeholder}
                required
                autoFocus
              />
            </div>
          </div>

          <div className="preference-modal-actions">
            <button
              type="button"
              className="preference-form-cancel-btn"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="preference-form-submit-btn"
              disabled={!text.trim()}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

