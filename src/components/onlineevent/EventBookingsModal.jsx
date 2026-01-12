import React from 'react';
import { X, Trash2, Users, CheckCircle, Clock, Calendar } from 'lucide-react';
import './EventBookingsModal.css';

export default function EventBookingsModal({ isOpen, onClose, bookings = [], eventName, onDeleteBooking }) {
    if (!isOpen) return null;

    // Calculate stats
    const totalBookings = bookings.length;
    const paidBookings = bookings.filter(b => b.status === 'paid').length;
    const pendingBookings = bookings.filter(b => b.status === 'pending').length;

    return (
        <div className="bookings-modal-overlay" onClick={onClose}>
            <div className="bookings-modal-content" onClick={(e) => e.stopPropagation()}>

                {/* Header */}
                <div className="bookings-modal-header">
                    <div className="bookings-header-content">
                        <div className="bookings-title-label">Event Bookings</div>
                        <h2 className="bookings-event-name">{eventName}</h2>
                    </div>
                    <button className="bookings-close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Stats Row */}
                <div className="bookings-stats-row">
                    <div className="booking-stat-card">
                        <div className="booking-stat-icon-wrapper stat-icon-blue">
                            <Users size={20} />
                        </div>
                        <div className="booking-stat-info">
                            <div className="booking-stat-value">{totalBookings}</div>
                            <div className="booking-stat-label">Total Bookings</div>
                        </div>
                    </div>
                    <div className="booking-stat-card">
                        <div className="booking-stat-icon-wrapper stat-icon-green">
                            <CheckCircle size={20} />
                        </div>
                        <div className="booking-stat-info">
                            <div className="booking-stat-value">{paidBookings}</div>
                            <div className="booking-stat-label">Confirmed (Paid)</div>
                        </div>
                    </div>
                    <div className="booking-stat-card">
                        <div className="booking-stat-icon-wrapper stat-icon-purple">
                            <Clock size={20} />
                        </div>
                        <div className="booking-stat-info">
                            <div className="booking-stat-value">{pendingBookings}</div>
                            <div className="booking-stat-label">Pending</div>
                        </div>
                    </div>
                </div>

                {/* Body / List */}
                <div className="bookings-modal-body">
                    {bookings && bookings.length > 0 ? (
                        <div className="bookings-table-container">
                            <table className="bookings-table">
                                <thead>
                                    <tr>
                                        <th style={{ width: '60px' }}>#</th>
                                        <th>User Email</th>
                                        <th>Status</th>
                                        <th>Booking Date</th>
                                        <th style={{ textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((booking, index) => (
                                        <tr key={booking.id}>
                                            <td style={{ color: '#94a3b8', fontWeight: 500 }}>{index + 1}</td>
                                            <td>
                                                <div className="booking-email">{booking.userEmail}</div>
                                            </td>
                                            <td>
                                                <span className={`booking-status-badge booking-status-${booking.status?.toLowerCase() || 'pending'}`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="booking-date">
                                                    {booking.createdAt ? new Date(booking.createdAt).toLocaleDateString(undefined, {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    }) : '-'}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="booking-actions">
                                                    <button
                                                        onClick={() => onDeleteBooking(booking)}
                                                        className="booking-delete-btn"
                                                        title="Delete Booking"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="bookings-empty-state">
                            <div className="empty-state-icon">
                                <Calendar size={32} />
                            </div>
                            <div className="empty-state-text">
                                <h3>No bookings yet</h3>
                                <p>There are no bookings recorded for this event yet.</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer (Optional, useful if list is long) */}
                <div className="bookings-modal-footer">
                    <button type="button" className="event-form-cancel-btn" onClick={onClose}>
                        Close
                    </button>
                </div>

            </div>
        </div>
    );
}

