import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import OnlineEventMobilePreview from './OnlineEventMobilePreview';
import './OnlineEventModal.css';

export default function OnlineEventModal({ isOpen, onClose, onSave, eventData = null }) {
  const [formData, setFormData] = useState({
    eventName: '',
    eventDateTime: '',
    description: '',
    mode: 'Online',
    totalAmount: '',
    imgUrl: '',
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
    if (eventData) {
      setFormData({
        eventName: eventData.eventName || '',
        eventDateTime: eventData.eventDateTime ? eventData.eventDateTime.replace(' ', 'T').substring(0, 16) : '',
        description: eventData.description || '',
        mode: eventData.mode || 'Online',
        totalAmount: eventData.totalAmount || '',
        imgUrl: eventData.imgUrl || '',
        active: eventData.active !== undefined ? eventData.active : true
      });
    } else {
      setFormData({
        eventName: '',
        eventDateTime: '',
        description: '',
        mode: 'Online',
        totalAmount: '',
        imgUrl: '',
        active: true
      });
    }
  }, [eventData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Store file for upload
      setFormData(prev => ({
        ...prev,
        imageFile: file
      }));

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imgUrl: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...formData,
      eventDateTime: formData.eventDateTime ? formData.eventDateTime.replace('T', ' ') + ':00' : '',
      totalAmount: parseInt(formData.totalAmount) || 0,
      imageFile: formData.imageFile
    };
    onSave(submitData);
  };

  if (!isOpen) return null;

  return (
    <div className="event-modal-overlay" onClick={onClose}>
      <div className="event-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="event-modal-header">
          <h2 className="event-modal-title">
            {eventData ? 'Update Event' : 'Add New Event'}
          </h2>
          <button className="event-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="event-modal-body">
          {/* Left Side - Form */}
          <div className="event-modal-form-section">
            <form onSubmit={handleSubmit} className="event-form">
              <div className="event-form-group">
                <label htmlFor="eventName" className="event-form-label">
                  Event Name <span className="required">*</span>
                </label>
                <Input
                  id="eventName"
                  name="eventName"
                  type="text"
                  value={formData.eventName}
                  onChange={handleChange}
                  placeholder="Enter event name"
                  required
                />
              </div>

              <div className="event-form-group">
                <label htmlFor="eventDateTime" className="event-form-label">
                  Date & Time <span className="required">*</span>
                </label>
                <Input
                  id="eventDateTime"
                  name="eventDateTime"
                  type="datetime-local"
                  value={formData.eventDateTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="event-form-group">
                <label htmlFor="description" className="event-form-label">
                  Description <span className="required">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter event description"
                  className="event-form-textarea"
                  rows="3"
                  required
                />
              </div>

              <div className="event-form-row">
                <div className="event-form-group">
                  <label htmlFor="mode" className="event-form-label">
                    Mode <span className="required">*</span>
                  </label>
                  <select
                    id="mode"
                    name="mode"
                    value={formData.mode}
                    onChange={handleChange}
                    className="event-form-select"
                    required
                  >
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div className="event-form-group">
                  <label htmlFor="totalAmount" className="event-form-label">
                    Total Amount <span className="required">*</span>
                  </label>
                  <Input
                    id="totalAmount"
                    name="totalAmount"
                    type="number"
                    value={formData.totalAmount}
                    onChange={handleChange}
                    placeholder="Enter amount"
                    min="0"
                    required
                  />
                </div>
              </div>

              <div className="event-form-group">
                <label htmlFor="imgUrl" className="event-form-label">
                  Event Image
                </label>
                <div className="event-form-image-upload">
                  <input
                    id="imgUrl"
                    name="imgUrl"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="event-form-file-input"
                  />
                  {formData.imgUrl && (
                    <div className="event-form-image-preview">
                      <img src={formData.imgUrl} alt="Preview" onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200x200?text=Invalid+Image';
                      }} />
                      <button
                        type="button"
                        className="event-form-image-remove"
                        onClick={() => setFormData(prev => ({ ...prev, imgUrl: '' }))}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="event-form-group">
                <label className="event-form-checkbox-label">
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleChange}
                    className="event-form-checkbox"
                  />
                  <span>Active</span>
                </label>
              </div>

              <div className="event-form-actions">
                <button type="button" className="event-form-cancel-btn" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="event-form-submit-btn">
                  {eventData ? 'Update' : 'Add'} Event
                </button>
              </div>
            </form>
          </div>

          {/* Right Side - Mobile Preview */}
          <div className="event-modal-preview-section">
            <div className="event-preview-header">
              <h3 className="event-preview-title">Mobile Preview</h3>
            </div>
            <OnlineEventMobilePreview formData={formData} />
          </div>
        </div>
      </div>
    </div>
  );
}


