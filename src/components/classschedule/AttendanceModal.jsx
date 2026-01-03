import React, { useState, useEffect } from 'react';
import { X, User } from 'lucide-react';
import './AttendanceModal.css';

export default function AttendanceModal({ isOpen, onClose, scheduleData }) {
    const [attendanceList, setAttendanceList] = useState([]);

    // Mock data generator for attendance
    useEffect(() => {
        if (isOpen && scheduleData) {
            // Generate some mock students
            const students = [
                { id: 1, name: "Aarav Gupta", status: "Present" },
                { id: 2, name: "Diya Sharma", status: "Present" },
                { id: 3, name: "Ishaan Kumar", status: "Absent" },
                { id: 4, name: "Mira Patel", status: "Present" },
                { id: 5, name: "Rohan Singh", status: "Present" },
                { id: 6, name: "Ananya Reddy", status: "Late" },
                { id: 7, name: "Vihaan Malhotra", status: "Present" },
                { id: 8, name: "Kavya Iyer", status: "Absent" },
            ];
            setAttendanceList(students);
        }
    }, [isOpen, scheduleData]);

    if (!isOpen) return null;

    const presentCount = attendanceList.filter(s => s.status === 'Present').length;
    const totalCount = attendanceList.length;

    return (
        <div className="attendance-modal-overlay" onClick={onClose}>
            <div className="attendance-modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="attendance-modal-header">
                    <div>
                        <h3 className="attendance-modal-title">Attendance List</h3>
                        {scheduleData && (
                            <div className="attendance-modal-subtitle">
                                {scheduleData.courseTitle || 'Class'} • {scheduleData.date}
                            </div>
                        )}
                    </div>
                    <button className="attendance-modal-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="attendance-modal-body">
                    {attendanceList.length > 0 ? (
                        <div className="attendance-list">
                            {attendanceList.map((student) => (
                                <div key={student.id} className="attendance-item">
                                    <div className="attendance-student-info">
                                        <div className="attendance-avatar">
                                            {student.name.charAt(0)}
                                        </div>
                                        <div className="attendance-name">{student.name}</div>
                                    </div>
                                    <div className={`attendance-status status-${student.status.toLowerCase()}`}>
                                        {student.status}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="attendance-empty">
                            No attendance records found for this class.
                        </div>
                    )}
                </div>

                <div className="attendance-modal-footer">
                    <div>Total Students: {totalCount}</div>
                    <div>Present: {presentCount}</div>
                </div>
            </div>
        </div>
    );
}
