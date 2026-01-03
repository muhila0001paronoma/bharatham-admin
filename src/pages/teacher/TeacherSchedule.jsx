import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2 } from 'lucide-react';
import DataTable from '../../components/ui/DataTable';
import ClassScheduleModal from '../../components/classschedule/ClassScheduleModal';
import ConfirmationModal from '../../components/ui/ConfirmationModal';
import AttendanceModal from '../../components/classschedule/AttendanceModal';
import '../teachers/ChoreographyVideos.css';
import './TeacherSchedule.css';

const TeacherSchedule = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isAttendanceModalOpen, setIsAttendanceModalOpen] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [selectedScheduleForAttendance, setSelectedScheduleForAttendance] = useState(null);
    const [scheduleToDelete, setScheduleToDelete] = useState(null);

    const [rows, setRows] = useState([
        {
            id: 1,
            courseTitle: 'Beginner Bharatanatyam Basics',
            date: '2026-03-16',
            startTime: '18:00:00',
            endTime: '19:30:00',
            status: 'Upcoming',
            active: true
        },
        {
            id: 2,
            courseTitle: 'Beginner Bharatanatyam Basics',
            date: '2026-03-16',
            startTime: '18:00:00',
            endTime: '19:30:00',
            status: 'Upcoming',
            active: true
        },
        {
            id: 3,
            courseTitle: 'Beginner Bharatanatyam Basics',
            date: '2026-03-16',
            startTime: '18:00:00',
            endTime: '19:30:00',
            status: 'Upcoming',
            active: true
        },
        {
            id: 4,
            courseTitle: 'Beginner Bharatanatyam Basics',
            date: '2026-03-16',
            startTime: '18:00:00',
            endTime: '20:30:00',
            status: 'Upcoming',
            active: true
        },
        {
            id: 5,
            courseTitle: 'Beginner Bharatanatyam Basics',
            date: '2026-03-16',
            startTime: '18:00:00',
            endTime: '19:30:00',
            status: 'Upcoming',
            active: true
        }
    ]);

    const handleAddSchedule = () => {
        setSelectedSchedule(null);
        setIsModalOpen(true);
    };

    const handleEdit = (schedule) => {
        setSelectedSchedule(schedule);
        setIsModalOpen(true);
    };

    const handleDeleteClick = (schedule) => {
        setScheduleToDelete(schedule);
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (scheduleToDelete) {
            setRows(prev => prev.filter(s => s.id !== scheduleToDelete.id));
            setIsDeleteModalOpen(false);
            setScheduleToDelete(null);
        }
    };

    const handleViewAttendance = (schedule) => {
        setSelectedScheduleForAttendance(schedule);
        setIsAttendanceModalOpen(true);
    };

    const handleSaveSchedule = (formData) => {
        if (selectedSchedule) {
            // Update existing
            setRows(prev => prev.map(s => s.id === selectedSchedule.id ? { ...formData, id: s.id } : s));
        } else {
            // Add new
            const newSchedule = {
                ...formData,
                id: rows.length > 0 ? Math.max(...rows.map(s => s.id)) + 1 : 1
            };
            setRows(prev => [...prev, newSchedule]);
        }
        setIsModalOpen(false);
        setSelectedSchedule(null);
    };

    const filteredData = rows.filter(item => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            item.courseTitle.toLowerCase().includes(query) ||
            item.status.toLowerCase().includes(query)
        );
    });

    const columns = [
        {
            key: 'id',
            label: '#',
            sortable: true,
            width: '60px',
            render: (value) => value
        },
        {
            key: 'courseTitle',
            label: 'COURSE TITLE',
            sortable: true,
            render: (value) => <div className="font-medium text-gray-900">{value}</div>
        },
        {
            key: 'date',
            label: 'DATE',
            sortable: true,
        },
        {
            key: 'startTime',
            label: 'START TIME',
            sortable: true,
        },
        {
            key: 'endTime',
            label: 'END TIME',
            sortable: true,
        },
        {
            key: 'status',
            label: 'STATUS',
            sortable: true,
            render: (value) => (
                <span className="text-gray-600">{value}</span>
            )
        },
        {
            key: 'active',
            label: 'ACTIVE',
            sortable: true,
            render: (value) => (
                <span className={`theory-status ${value ? 'theory-status-active' : 'theory-status-inactive'}`}>
                    {value ? 'Active' : 'Inactive'}
                </span>
            )
        },
        {
            key: 'attendance',
            label: '',
            width: '120px',
            render: (_, row) => (
                <button className="view-attendance-btn" onClick={() => handleViewAttendance(row)}>
                    View<br />Attendance
                </button>
            )
        },
        {
            key: 'actions',
            label: '',
            width: '100px',
            render: (_, row) => (
                <div className="action-buttons">
                    <button className="edit-btn" onClick={() => handleEdit(row)}>
                        <Edit size={20} />
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteClick(row)}>
                        <Trash2 size={20} />
                    </button>
                </div>
            )
        }
    ];

    return (
        <div className="teacher-schedule-page">


            <div className="theory-section" style={{ marginTop: '0' }}>
                <div className="theory-section-header">
                    <h2 className="theory-section-title">My Classes</h2>
                    <button className="theory-button theory-button-primary" onClick={handleAddSchedule}>
                        <Plus className="theory-button-icon" />
                        <span>Add New Schedule</span>
                    </button>
                </div>

                <div className="theory-details-toolbar">
                    <div className="theory-search-filter">
                        <button className="theory-filter-button" title="Filter">
                            <Filter className="theory-filter-icon" />
                        </button>
                        <div className="theory-search-input-wrapper">
                            <Search className="theory-search-icon" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="theory-search-input"
                            />
                        </div>
                    </div>
                </div>

                <div className="theory-table-container">
                    <DataTable
                        columns={columns}
                        data={filteredData}
                        selectable={true}
                        pageSize={pageSize}
                        onPageSizeChange={setPageSize}
                        rowHeight={70}
                    />
                </div>
            </div>

            <ClassScheduleModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveSchedule}
                scheduleData={selectedSchedule}
            />

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Delete Schedule"
                message={`Are you sure you want to delete "${scheduleToDelete?.courseTitle || 'this schedule'}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                type="danger"
                icon={Trash2}
            />

            <AttendanceModal
                isOpen={isAttendanceModalOpen}
                onClose={() => setIsAttendanceModalOpen(false)}
                scheduleData={selectedScheduleForAttendance}
            />
        </div>
    );
};

export default TeacherSchedule;
