import React, { useState, useEffect } from 'react';
import { X, DollarSign, Mail, Book, Calendar, CreditCard } from 'lucide-react';
import PaymentMobilePreview from './PaymentMobilePreview';
import './PaymentModal.css';

const PaymentModal = ({ isOpen, onClose, onSave, paymentData }) => {
    const [formData, setFormData] = useState({
        courseTitle: '',
        userEmail: '',
        amount: '',
        status: 'PAID',
        type: 'Advance',
        paidAt: '',
        active: true
    });

    useEffect(() => {
        if (paymentData) {
            setFormData(paymentData);
        } else {
            setFormData({
                courseTitle: '',
                userEmail: '',
                amount: '',
                status: 'PAID',
                type: 'Advance',
                paidAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
                active: true
            });
        }
    }, [paymentData, isOpen]);

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
        <div className="payment-modal-overlay" onClick={onClose}>
            <div className="payment-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="payment-modal-header">
                    <h3 className="payment-modal-title">
                        Edit Payment Record
                    </h3>
                    <button className="payment-modal-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="payment-modal-body-container">
                    <div className="payment-modal-form-section">
                        <form onSubmit={handleSubmit} className="payment-modal-form" id="paymentForm">
                            <div className="payment-modal-field">
                                <label>Course Title</label>
                                <div className="payment-input-with-icon">
                                    <Book size={18} className="payment-input-icon" />
                                    <input
                                        type="text"
                                        name="courseTitle"
                                        value={formData.courseTitle}
                                        onChange={handleChange}
                                        placeholder="e.g. Beginner Bharatanatyam Basics"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="payment-modal-field">
                                <label>User Email</label>
                                <div className="payment-input-with-icon">
                                    <Mail size={18} className="payment-input-icon" />
                                    <input
                                        type="email"
                                        name="userEmail"
                                        value={formData.userEmail}
                                        onChange={handleChange}
                                        placeholder="e.g. bavi003@gmail.com"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="payment-modal-row">
                                <div className="payment-modal-field">
                                    <label>Amount (₹)</label>
                                    <div className="payment-input-with-icon">
                                        <DollarSign size={18} className="payment-input-icon" />
                                        <input
                                            type="text"
                                            name="amount"
                                            value={formData.amount}
                                            onChange={handleChange}
                                            placeholder="e.g. 10,000"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="payment-modal-field">
                                    <label>Payment Type</label>
                                    <div className="payment-input-with-icon">
                                        <CreditCard size={18} className="payment-input-icon" />
                                        <select name="type" value={formData.type} onChange={handleChange}>
                                            <option value="Advance">Advance</option>
                                            <option value="Full Payment">Full Payment</option>
                                            <option value="Installment">Installment</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="payment-modal-row">
                                <div className="payment-modal-field">
                                    <label>Status</label>
                                    <select name="status" value={formData.status} onChange={handleChange}>
                                        <option value="PAID">PAID</option>
                                        <option value="PENDING">PENDING</option>
                                        <option value="FAILED">FAILED</option>
                                    </select>
                                </div>
                                <div className="payment-modal-field">
                                    <label>Paid At</label>
                                    <div className="payment-input-with-icon">
                                        <Calendar size={18} className="payment-input-icon" />
                                        <input
                                            type="text"
                                            name="paidAt"
                                            value={formData.paidAt}
                                            onChange={handleChange}
                                            placeholder="YYYY-MM-DD HH:mm:ss"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="payment-modal-field">
                                <label className="payment-checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="active"
                                        checked={formData.active}
                                        onChange={handleChange}
                                    />
                                    <span>Active Payment Status</span>
                                </label>
                            </div>
                        </form>
                    </div>

                    <div className="payment-modal-preview-section">
                        <div className="payment-preview-header">
                            <h3 className="payment-preview-title">Mobile Preview</h3>
                        </div>
                        <PaymentMobilePreview formData={formData} />
                    </div>
                </div>

                <div className="payment-modal-footer">
                    <button type="button" className="payment-modal-btn cancel" onClick={onClose}>
                        Cancel
                    </button>
                    <button type="submit" form="paymentForm" className="payment-modal-btn save">
                        Update Payment
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentModal;
