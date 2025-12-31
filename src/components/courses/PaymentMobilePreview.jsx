import React from 'react';
import { ArrowLeft, CheckCircle2, Download, Share2 } from 'lucide-react';
import './PaymentMobilePreview.css';

export default function PaymentMobilePreview({ formData }) {
    return (
        <div className="payment-mobile-preview-container">
            <div className="payment-mobile-frame">
                {/* Phone Status Bar */}
                <div className="payment-mobile-status-bar">
                    <div className="payment-mobile-status-time">9:41</div>
                    <div className="payment-mobile-status-icons">
                        <div className="payment-mobile-status-icon"></div>
                        <div className="payment-mobile-status-icon"></div>
                        <div className="payment-mobile-status-icon"></div>
                    </div>
                </div>

                {/* Phone Content */}
                <div className="payment-mobile-content">
                    <div className="payment-mobile-header">
                        <ArrowLeft size={18} color="#1e293b" />
                        <span className="payment-mobile-header-title">Payment Receipt</span>
                        <Share2 size={16} color="#1e293b" />
                    </div>

                    <div className="payment-mobile-success-section">
                        <div className="payment-mobile-success-icon">
                            <CheckCircle2 size={48} color="#10b981" />
                        </div>
                        <h3 className="payment-mobile-status-heading">Payment Successful</h3>
                        <p className="payment-mobile-amount-display">₹{formData.amount || '0'}</p>
                    </div>

                    <div className="payment-mobile-details-card">
                        <div className="payment-mobile-detail-row">
                            <span className="payment-mobile-detail-label">Course</span>
                            <span className="payment-mobile-detail-value">{formData.courseTitle || 'Course Title'}</span>
                        </div>
                        <div className="payment-mobile-detail-row">
                            <span className="payment-mobile-detail-label">Status</span>
                            <span className="payment-mobile-detail-value status-paid">{formData.status || 'PAID'}</span>
                        </div>
                        <div className="payment-mobile-detail-row">
                            <span className="payment-mobile-detail-label">Payment Type</span>
                            <span className="payment-mobile-detail-value">{formData.type || 'Advance'}</span>
                        </div>
                        <div className="payment-mobile-detail-row">
                            <span className="payment-mobile-detail-label">Date</span>
                            <span className="payment-mobile-detail-value">{formData.paidAt ? formData.paidAt.split(' ')[0] : '2026-03-16'}</span>
                        </div>
                        <div className="payment-mobile-detail-row">
                            <span className="payment-mobile-detail-label">Transaction ID</span>
                            <span className="payment-mobile-detail-value">#BHAR{Math.floor(Math.random() * 900000) + 100000}</span>
                        </div>
                    </div>

                    <button className="payment-mobile-download-btn">
                        <Download size={16} />
                        <span>Download PDF</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
