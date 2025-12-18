import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import './ConfirmationModal.css';

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'danger', // 'danger', 'warning', 'info', 'success'
  icon: Icon = AlertTriangle
}) {
  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="confirmation-modal-overlay" onClick={handleOverlayClick}>
      <div className="confirmation-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="confirmation-modal-header">
          <div className={`confirmation-modal-icon confirmation-modal-icon-${type}`}>
            <Icon size={24} />
          </div>
          <button className="confirmation-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <div className="confirmation-modal-body">
          <h3 className="confirmation-modal-title">{title}</h3>
          <p className="confirmation-modal-message">{message}</p>
        </div>

        <div className="confirmation-modal-actions">
          <button
            type="button"
            className="confirmation-modal-cancel-btn"
            onClick={onClose}
          >
            {cancelText}
          </button>
          <button
            type="button"
            className={`confirmation-modal-confirm-btn confirmation-modal-confirm-btn-${type}`}
            onClick={handleConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

