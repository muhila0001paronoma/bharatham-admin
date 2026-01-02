import React, { useState } from 'react';
import { Search, Filter, Plus, Edit2, Trash2, Calendar, FileText, TrendingUp, Users } from 'lucide-react';
import DataTable from '../components/ui/DataTable';
import ClassScheduleModal from '../components/classschedule/ClassScheduleModal';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import { classScheduleData } from '../data/data';
import './ClassSchedule.css';

const ClassSchedule = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScheduleData, setSelectedScheduleData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const [schedules, setSchedules] = useState(classScheduleData.schedules || []);

  const filteredData = schedules.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.courseTitle.toLowerCase().includes(query) ||
      item.status.toLowerCase().includes(query) ||
      item.date.toLowerCase().includes(query)
    );
  });

  const columns = [
    {
      key: 'id',
      label: '#',
      sortable: true,
      width: '60px',
      render: (value, row, index) => index + 1
    },
    {
      key: 'courseTitle',
      label: 'COURSE TITLE',
      sortable: true,
      width: '250px',
      render: (value) => <div className="font-medium text-gray-900">{value}</div>
    },
    {
      key: 'date',
      label: 'DATE',
      sortable: true,
      width: '120px',
      render: (value) => <div className="text-gray-600">{value}</div>
    },
    {
      key: 'startTime',
      label: 'START TIME',
      sortable: true,
      width: '120px',
      render: (value) => <div className="text-gray-600">{value}</div>
    },
    {
      key: 'endTime',
      label: 'END TIME',
      sortable: true,
      width: '120px',
      render: (value) => <div className="text-gray-600">{value}</div>
    },
    {
      key: 'status',
      label: 'STATUS',
      sortable: true,
      width: '120px',
      render: (value) => (
        <span className="text-gray-600">
          {value}
        </span>
      )
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
    }
  ];

  const handleAddSchedule = () => {
    setSelectedScheduleData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setSelectedScheduleData(row);
    setIsModalOpen(true);
  };

  const handleSaveSchedule = (formData) => {
    if (selectedScheduleData) {
      setSchedules(prev => 
        prev.map(item => 
          item.id === selectedScheduleData.id 
            ? { ...item, ...formData }
            : item
        )
      );
    } else {
      const newSchedule = {
        id: schedules.length + 1,
        ...formData
      };
      setSchedules(prev => [...prev, newSchedule]);
    }
    setIsModalOpen(false);
    setSelectedScheduleData(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedScheduleData(null);
  };

  const handleDelete = (row) => {
    setItemToDelete(row);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      setSchedules(prev => prev.filter(item => item.id !== itemToDelete.id));
      setItemToDelete(null);
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleFilter = () => {
    console.log('Filter');
  };

  const totalSchedules = schedules.length;
  const activeSchedules = schedules.filter(item => item.active).length;
  const upcomingSchedules = schedules.filter(item => item.status === 'Upcoming').length;

  return (
    <div className="theory-page">
      <div className="theory-page-header">
        <div className="theory-page-header-content">
          <div className="theory-page-header-left">
            <div className="theory-page-header-icon">
              <Calendar size={28} />
            </div>
            <div>
              <h1 className="theory-page-header-title">Class Schedule Management</h1>
              <p className="theory-page-header-subtitle">Manage class schedules and sessions for the Bharatham app</p>
            </div>
          </div>
          <div className="theory-page-header-stats">
            <div className="theory-page-stat-card">
              <div className="theory-page-stat-icon theory-page-stat-icon-primary">
                <FileText size={20} />
              </div>
              <div className="theory-page-stat-content">
                <div className="theory-page-stat-value">{totalSchedules}</div>
                <div className="theory-page-stat-label">Total Schedules</div>
              </div>
            </div>
            <div className="theory-page-stat-card">
              <div className="theory-page-stat-icon theory-page-stat-icon-success">
                <TrendingUp size={20} />
              </div>
              <div className="theory-page-stat-content">
                <div className="theory-page-stat-value">{upcomingSchedules}</div>
                <div className="theory-page-stat-label">Upcoming</div>
              </div>
            </div>
            <div className="theory-page-stat-card">
              <div className="theory-page-stat-icon theory-page-stat-icon-info">
                <Users size={20} />
              </div>
              <div className="theory-page-stat-content">
                <div className="theory-page-stat-value">{activeSchedules}</div>
                <div className="theory-page-stat-label">Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="theory-section">
        <div className="theory-section-header">
          <h2 className="theory-section-title">Class Schedules</h2>
          <button
            onClick={handleAddSchedule}
            className="theory-button theory-button-primary"
          >
            <Plus className="theory-button-icon" />
            Add New Schedule
          </button>
        </div>
        <div className="theory-details-toolbar">
          <div className="theory-search-filter">
            <button
              onClick={handleFilter}
              className="theory-filter-button"
              title="Filter"
            >
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
            onEdit={handleEdit}
            onDelete={handleDelete}
            selectable={true}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
            onRowSelect={setSelectedRows}
          />
        </div>
      </div>

      <ClassScheduleModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveSchedule}
        scheduleData={selectedScheduleData}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete Schedule"
        message={`Are you sure you want to delete "${itemToDelete?.courseTitle || 'this schedule'}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        icon={Trash2}
      />
    </div>
  );
};

export default ClassSchedule;
