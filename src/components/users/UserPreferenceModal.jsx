import React, { useEffect, useState } from 'react';
import { X, ClipboardList } from 'lucide-react';
import { userPreferenceService } from '../../services/userPreferenceService';
import '../theory/TheoryModal.css';

export default function UserPreferenceModal({ isOpen, onClose, userEmail, userName }) {
    const [preferences, setPreferences] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (isOpen && userEmail) {
            fetchUserPreferences();
        }
    }, [isOpen, userEmail]);

    const fetchUserPreferences = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await userPreferenceService.getUserPreferences(userEmail);
            if (response.success) {
                setPreferences(response.data);
            } else {
                setError(response.message || 'Failed to fetch preferences');
            }
        } catch (err) {
            console.error('Error fetching user preferences:', err);
            setError('An error occurred while fetching preferences');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="theory-modal-overlay" onClick={onClose}>
            <div className="theory-modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '600px' }}>
                <div className="theory-modal-header">
                    <h2 className="theory-modal-title flex items-center gap-2">
                        <ClipboardList size={20} />
                        Preferences: {userName}
                    </h2>
                    <button className="theory-modal-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="theory-modal-body">
                    {loading ? (
                        <div className="p-8 text-center text-gray-500">Loading preferences...</div>
                    ) : error ? (
                        <div className="p-8 text-center text-red-500">{error}</div>
                    ) : preferences.length === 0 ? (
                        <div className="p-8 text-center text-gray-500">No preference data found for this user.</div>
                    ) : (
                        <div className="w-full space-y-4 p-4">
                            {preferences.map((pref) => (
                                <div key={pref.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                    <div className="text-sm font-semibold text-[#1a237e] mb-1">
                                        {pref.question}
                                    </div>
                                    <div className="text-sm text-gray-700">
                                        <span className="font-medium text-green-600">Selected: </span>
                                        {pref.selectedAnswer}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="theory-modal-footer flex border-t border-gray-100 p-4 justify-end">
                    <button className="theory-form-cancel-btn" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
