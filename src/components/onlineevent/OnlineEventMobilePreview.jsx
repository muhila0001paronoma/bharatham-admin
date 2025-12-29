import React from 'react';
import { ArrowLeft, Calendar, DollarSign, Globe } from 'lucide-react';
import './OnlineEventMobilePreview.css';

export default function OnlineEventMobilePreview({ formData }) {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount) => {
    if (!amount) return '₹0';
    return `₹${parseInt(amount).toLocaleString('en-IN')}`;
  };

  return (
    <div className="event-mobile-preview-container">
      <div className="event-mobile-frame">
        {/* Phone Status Bar */}
        <div className="event-mobile-status-bar">
          <div className="event-mobile-status-time">9:41</div>
          <div className="event-mobile-status-icons">
            <div className="event-mobile-status-icon"></div>
            <div className="event-mobile-status-icon"></div>
            <div className="event-mobile-status-icon"></div>
          </div>
        </div>

        {/* Phone Content */}
        <div className="event-mobile-content">
          {/* Header */}
          <div className="event-mobile-header">
            <div className="event-mobile-back-button">
              <ArrowLeft size={18} color="#7A4D3A" />
            </div>
            <div className="event-mobile-title">Event Booking</div>
            <div className="event-mobile-header-right"></div>
          </div>

          {/* Event Card */}
          <div className="event-mobile-card">
            {/* Banner Image */}
            {formData.imgUrl && (
              <div className="event-mobile-banner">
                <img 
                  src={formData.imgUrl} 
                  alt={formData.eventName || 'Event'} 
                  className="event-mobile-banner-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}

            <div className="event-mobile-card-content">
              {/* Title */}
              <h2 className="event-mobile-card-title">
                {formData.eventName || 'Event Name'}
              </h2>

              {/* Description */}
              <p className="event-mobile-card-description">
                {formData.description || 'Enter event description...'}
              </p>

              {/* Details Section */}
              <div className="event-mobile-details-section">
                {formData.eventDateTime && (
                  <div className="event-mobile-detail-row">
                    <Calendar size={20} color="#7A4D3A" />
                    <div className="event-mobile-detail-content">
                      <div className="event-mobile-detail-label">Event Date & Time</div>
                      <div className="event-mobile-detail-value">
                        {formatDate(formData.eventDateTime)}
                      </div>
                    </div>
                  </div>
                )}

                {formData.totalAmount && (
                  <div className="event-mobile-detail-row">
                    <DollarSign size={20} color="#7A4D3A" />
                    <div className="event-mobile-detail-content">
                      <div className="event-mobile-detail-label">Amount</div>
                      <div className="event-mobile-detail-value">
                        {formatAmount(formData.totalAmount)}
                      </div>
                    </div>
                  </div>
                )}

                {formData.mode && (
                  <div className="event-mobile-detail-row">
                    <Globe size={20} color="#7A4D3A" />
                    <div className="event-mobile-detail-content">
                      <div className="event-mobile-detail-label">Mode</div>
                      <div className="event-mobile-detail-value">
                        {formData.mode}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Book Button */}
              <button className="event-mobile-book-button">
                <Calendar size={20} color="#FFFFFF" className="event-mobile-book-button-icon" />
                <span className="event-mobile-book-button-text">Confirm Booking</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

