












import React, { useState } from 'react';
import { Search, Filter, Edit, Trash2, HelpCircle, MessageSquare, CheckCircle } from 'lucide-react';
import DataTable from '../../components/ui/DataTable';
import EnquiryModal from '../../components/courses/EnquiryModal';
import ConfirmationModal from '../../components/ui/ConfirmationModal';
import './UserEnquiry.css';

const UserEnquiry = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [enquiryToDelete, setEnquiryToDelete] = useState(null);

  const [rows, setRows] = useState([
    {
      id: 1,
      courseTitle: 'Beginner Bharatanatyam Basics',
      userEmail: 'bavi003@gmail.com',
      subject: 'Tell me about this course schedule and pricing',
      message: 'Hi, I would like to know the exact timings for the weekend batches.',
      reply: '',
      enquiredAt: '2026-03-16 00:00:00',
      active: true
    },
    {
      id: 2,
      courseTitle: 'Beginner Bharatanatyam Basics',
      userEmail: 'bavi03@gmail.com',
      subject: 'Tell me about this course schedule and pricing',
      message: 'Is there a discount for bulk enrollment?',
      reply: '',
      enquiredAt: '2026-03-16 00:00:00',
      active: true
    },
    {
      id: 3,
      courseTitle: 'Beginner Bharatanatyam Basics',
      userEmail: 'bavi003@gmail.com',
      subject: 'Tell me about this course schedule and pricing',
      message: 'What is the duration of each session?',
      reply: '',
      enquiredAt: '2026-03-16 00:00:00',
      active: true
    },
    {
      id: 4,
      courseTitle: 'Beginner Bharatanatyam Basics',
      userEmail: 'bavi003@gmail.com',
      subject: 'Tell me about this course schedule and pricing',
      message: 'Can I get a trial class before paying?',
      reply: '',
      enquiredAt: '2026-03-16 00:00:00',
      active: true
    },
    {
      id: 5,
      courseTitle: 'Beginner Bharatanatyam Basics',
      userEmail: 'bavi003@gmail.com',
      subject: 'Tell me about this course schedule and pricing',
      message: 'I want to know about the intermediate level transition.',
      reply: '',
      enquiredAt: '2026-03-16 00:00:00',
      active: true
    },
    {
      id: 6,
      courseTitle: 'Beginner Bharatanatyam Basics',
      userEmail: 'bavi003@gmail.com',
      subject: 'Tell me about this course schedule and pricing',
      message: 'What certification will I get at the end?',
      reply: '',
      enquiredAt: '2026-03-16 00:00:00',
      active: true
    }
  ]);

  const handleEdit = (enquiry) => {
    setSelectedEnquiry(enquiry);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (enquiry) => {
    setEnquiryToDelete(enquiry);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (enquiryToDelete) {
      setRows(prev => prev.filter(e => e.id !== enquiryToDelete.id));
      setIsDeleteModalOpen(false);
      setEnquiryToDelete(null);
    }
  };

  const handleSaveEnquiry = (formData) => {
    if (selectedEnquiry) {
      setRows(prev => prev.map(e => e.id === selectedEnquiry.id ? { ...formData, id: e.id } : e));
    } else {
      const newEnquiry = {
        ...formData,
        id: rows.length > 0 ? Math.max(...rows.map(e => e.id)) + 1 : 1
      };
      setRows(prev => [...prev, newEnquiry]);
    }
    setIsModalOpen(false);
    setSelectedEnquiry(null);
  };

  const filteredData = rows.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.courseTitle.toLowerCase().includes(query) ||
      item.userEmail.toLowerCase().includes(query) ||
      item.subject.toLowerCase().includes(query)
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
      width: '180px',
      render: (value) => <div className="enquiry-title-cell">{value}</div>
    },
    {
      key: 'userEmail',
      label: 'USER EMAIL',
      sortable: true,
      width: '180px',
    },
    {
      key: 'subject',
      label: 'SUBJECT',
      sortable: true,
      width: '250px',
      render: (value) => <div className="enquiry-subject-cell">{value}</div>
    },
    {
      key: 'enquiredAt',
      label: 'ENQUIRED AT',
      sortable: true,
      width: '160px',
    },
    {
      key: 'active',
      label: 'ACTIVE',
      sortable: true,
      width: '100px',
      render: (value) => (
        <span className={`theory-status ${value ? 'theory-status-active' : 'theory-status-inactive'}`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'ACTIONS',
      render: (_, row) => (
        <div className="enquiry-action-buttons">
          <button className="send-reply-link" onClick={() => handleEdit(row)}>
            Send Reply
          </button>
          <button className="enquiry-edit-btn" onClick={() => handleEdit(row)}>
            <Edit size={18} />
          </button>
          <button className="enquiry-delete-btn" onClick={() => handleDeleteClick(row)}>
            <Trash2 size={18} />
          </button>
        </div>
      )
    }
  ];

  const totalEnquiries = rows.length;
  const pendingEnquiries = rows.filter(r => !r.reply).length;

  return (
    <div className="enquiries-page">
      <div className="theory-page-header">
        <div className="theory-page-header-content">
          <div className="theory-page-header-left">
            <div className="theory-page-header-icon">
              <HelpCircle size={28} />
            </div>
            <div>
              <h1 className="theory-page-header-title">User Enquiries</h1>
              <p className="theory-page-header-subtitle">Track and respond to student inquiries promptly</p>
            </div>
          </div>
          <div className="theory-page-header-stats">
            <div className="theory-page-stat-card">
              <div className="theory-page-stat-icon theory-page-stat-icon-primary">
                <MessageSquare size={20} />
              </div>
              <div className="theory-page-stat-content">
                <div className="theory-page-stat-value">{totalEnquiries}</div>
                <div className="theory-page-stat-label">Total Enquiries</div>
              </div>
            </div>
            <div className="theory-page-stat-card">
              <div className="theory-page-stat-icon theory-page-stat-icon-success">
                <CheckCircle size={20} />
              </div>
              <div className="theory-page-stat-content">
                <div className="theory-page-stat-value">{totalEnquiries - pendingEnquiries}</div>
                <div className="theory-page-stat-label">Resolved</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="theory-section">
        <div className="theory-section-header">
          <h2 className="theory-section-title">Enquiries</h2>
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

      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveEnquiry}
        enquiryData={selectedEnquiry}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Enquiry"
        message={`Are you sure you want to delete this enquiry from "${enquiryToDelete?.userEmail}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        icon={Trash2}
      />
    </div>
  );
};

export default UserEnquiry;
