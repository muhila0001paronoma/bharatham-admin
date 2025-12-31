import React, { useState } from 'react';
import { Search, Filter, Edit, Trash2, UserCheck, Users, Calendar } from 'lucide-react';
import DataTable from '../../components/ui/DataTable';
import EnrollmentModal from '../../components/courses/EnrollmentModal';
import ConfirmationModal from '../../components/ui/ConfirmationModal';
import './UserEnroll.css';

const UserEnroll = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [enrollmentToDelete, setEnrollmentToDelete] = useState(null);

  const [rows, setRows] = useState([
    {
      id: 1,
      courseTitle: 'Beginner Bharatanatyam Basics',
      userEmail: 'bavi003@gmail.com',
      enrolledAt: '2026-03-16 00:00:00',
      active: true
    },
    {
      id: 2,
      courseTitle: 'Beginner Bharatanatyam Basics',
      userEmail: 'bavi003@gmail.com',
      enrolledAt: '2026-03-16 00:00:00',
      active: true
    },
    {
      id: 3,
      courseTitle: 'Beginner Bharatanatyam Basics',
      userEmail: 'bavi003@gmail.com',
      enrolledAt: '2026-03-16 00:00:00',
      active: true
    },
    {
      id: 4,
      courseTitle: 'Beginner Bharatanatyam Basics',
      userEmail: 'bavi003@gmail.com',
      enrolledAt: '2026-03-16 00:00:00',
      active: true
    },
    {
      id: 5,
      courseTitle: 'Beginner Bharatanatyam Basics',
      userEmail: 'bavi003@gmail.com',
      enrolledAt: '2026-03-16 00:00:00',
      active: true
    }
  ]);

  const handleEdit = (enrollment) => {
    setSelectedEnrollment(enrollment);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (enrollment) => {
    setEnrollmentToDelete(enrollment);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (enrollmentToDelete) {
      setRows(prev => prev.filter(r => r.id !== enrollmentToDelete.id));
      setIsDeleteModalOpen(false);
      setEnrollmentToDelete(null);
    }
  };

  const handleSaveEnrollment = (formData) => {
    if (selectedEnrollment) {
      setRows(prev => prev.map(r => r.id === selectedEnrollment.id ? { ...formData, id: r.id } : r));
    } else {
      const newEnrollment = {
        ...formData,
        id: rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1
      };
      setRows(prev => [...prev, newEnrollment]);
    }
    setIsModalOpen(false);
    setSelectedEnrollment(null);
  };

  const filteredData = rows.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.courseTitle.toLowerCase().includes(query) ||
      item.userEmail.toLowerCase().includes(query)
    );
  });

  const columns = [
    {
      key: 'id',
      label: '#',
      sortable: true,
      width: '60px',
    },
    {
      key: 'courseTitle',
      label: 'COURSE TITLE',
      sortable: true,
      render: (value) => <div className="enrollment-title-cell">{value}</div>
    },
    {
      key: 'userEmail',
      label: 'USER EMAIL',
      sortable: true,
    },
    {
      key: 'enrolledAt',
      label: 'ENROLLED AT',
      sortable: true,
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
      key: 'actions',
      label: 'ACTIONS',
      width: '120px',
      render: (_, row) => (
        <div className="enrollment-action-buttons">
          <button className="enrollment-edit-btn" onClick={() => handleEdit(row)}>
            <Edit size={18} />
          </button>
          <button className="enrollment-delete-btn" onClick={() => handleDeleteClick(row)}>
            <Trash2 size={18} />
          </button>
        </div>
      )
    }
  ];

  const totalEnrollments = rows.length;
  const activeEnrollments = rows.filter(r => r.active).length;

  return (
    <div className="enrollment-page">
      <div className="theory-page-header">
        <div className="theory-page-header-content">
          <div className="theory-page-header-left">
            <div className="theory-page-header-icon">
              <UserCheck size={28} />
            </div>
            <div>
              <h1 className="theory-page-header-title">Enrollment Management</h1>
              <p className="theory-page-header-subtitle">Manage user enrollments across all courses</p>
            </div>
          </div>
          <div className="theory-page-header-stats">
            <div className="theory-page-stat-card">
              <div className="theory-page-stat-icon theory-page-stat-icon-primary">
                <Users size={20} />
              </div>
              <div className="theory-page-stat-content">
                <div className="theory-page-stat-value">{totalEnrollments}</div>
                <div className="theory-page-stat-label">Total Enrolled</div>
              </div>
            </div>
            <div className="theory-page-stat-card">
              <div className="theory-page-stat-icon theory-page-stat-icon-success">
                <Calendar size={20} />
              </div>
              <div className="theory-page-stat-content">
                <div className="theory-page-stat-value">{activeEnrollments}</div>
                <div className="theory-page-stat-label">Active Now</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="theory-section">
        <div className="theory-section-header">
          <h2 className="theory-section-title">Enrollment</h2>
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
          />
        </div>
      </div>

      <EnrollmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEnrollment}
        enrollmentData={selectedEnrollment}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Enrollment"
        message={`Are you sure you want to delete this enrollment for "${enrollmentToDelete?.userEmail}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        icon={Trash2}
      />
    </div>
  );
};

export default UserEnroll;
