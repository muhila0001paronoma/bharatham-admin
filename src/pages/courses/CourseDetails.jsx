import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, BookOpen, Clock, Users, TrendingUp } from 'lucide-react';
import DataTable from '../../components/ui/DataTable';
import CourseModal from '../../components/courses/CourseModal';
import ConfirmationModal from '../../components/ui/ConfirmationModal';
import './CourseDetails.css';

const CourseDetails = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courseToDelete, setCourseToDelete] = useState(null);

  const [rows, setRows] = useState([
    {
      id: 1,
      title: 'Beginner Bharatanatyam Basics',
      about: 'Learn foundational Bharatanatyam movements and rhythms',
      duration: '12 weeks',
      level: 'Beginner',
      price: '24,500',
      status: 'Upcoming',
      teacherName: 'Sita Raman',
      startDate: '2025-12-04',
      endDate: '2026-03-16',
      active: true
    },
    {
      id: 2,
      title: 'Beginner Bharatanatyam Basics',
      about: 'Learn foundational Bharatanatyam movements and rhythms',
      duration: '12 weeks',
      level: 'Beginner',
      price: '24,500',
      status: 'Upcoming',
      teacherName: 'Sita Raman',
      startDate: '2025-12-04',
      endDate: '2026-03-16',
      active: true
    },
    {
      id: 3,
      title: 'Beginner Bharatanatyam Basics',
      about: 'Learn foundational Bharatanatyam movements and rhythms',
      duration: '12 weeks',
      level: 'Beginner',
      price: '24,500',
      status: 'Upcoming',
      teacherName: 'Sita Raman',
      startDate: '2025-12-04',
      endDate: '2026-03-16',
      active: true
    },
    {
      id: 4,
      title: 'Beginner Bharatanatyam Basics',
      about: 'Learn foundational Bharatanatyam movements and rhythms',
      duration: '12 weeks',
      level: 'Beginner',
      price: '24,500',
      status: 'Upcoming',
      teacherName: 'Sita Raman',
      startDate: '2025-12-04',
      endDate: '2026-03-16',
      active: true
    },
    {
      id: 5,
      title: 'Beginner Bharatanatyam Basics',
      about: 'Learn foundational Bharatanatyam movements and rhythms',
      duration: '12 weeks',
      level: 'Beginner',
      price: '24,500',
      status: 'Upcoming',
      teacherName: 'Sita Raman',
      startDate: '2025-12-04',
      endDate: '2026-03-16',
      active: true
    },
    {
      id: 6,
      title: 'Beginner Bharatanatyam Basics',
      about: 'Learn foundational Bharatanatyam movements and rhythms',
      duration: '12 weeks',
      level: 'Beginner',
      price: '24,500',
      status: 'Upcoming',
      teacherName: 'Sita Raman',
      startDate: '2025-12-04',
      endDate: '2026-03-16',
      active: true
    }
  ]);

  const handleAddCourse = () => {
    setSelectedCourse(null);
    setIsModalOpen(true);
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (course) => {
    setCourseToDelete(course);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (courseToDelete) {
      setRows(prev => prev.filter(c => c.id !== courseToDelete.id));
      setIsDeleteModalOpen(false);
      setCourseToDelete(null);
    }
  };

  const handleSaveCourse = (formData) => {
    if (selectedCourse) {
      setRows(prev => prev.map(c => c.id === selectedCourse.id ? { ...formData, id: c.id } : c));
    } else {
      const newCourse = {
        ...formData,
        id: rows.length > 0 ? Math.max(...rows.map(c => c.id)) + 1 : 1
      };
      setRows(prev => [...prev, newCourse]);
    }
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  const filteredData = rows.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.teacherName.toLowerCase().includes(query) ||
      item.about.toLowerCase().includes(query)
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
      key: 'title',
      label: 'TITLE',
      sortable: true,
      width: '200px',
      render: (value) => <div className="title-cell">{value}</div>
    },
    {
      key: 'about',
      label: 'ABOUT',
      sortable: true,
      width: '250px',
      render: (value) => <div className="about-cell">{value}</div>
    },
    {
      key: 'duration',
      label: 'DURATION',
      sortable: true,
    },
    {
      key: 'level',
      label: 'LEVEL',
      sortable: true,
    },
    {
      key: 'price',
      label: 'PRICE',
      sortable: true,
      render: (value) => `₹${value}`
    },
    {
      key: 'status',
      label: 'STATUS',
      sortable: true,
      render: (value) => (
        <span className={`theory-status ${value.toLowerCase() === 'upcoming' ? 'theory-status-info' : value.toLowerCase() === 'active' ? 'theory-status-active' : 'theory-status-inactive'}`}>
          {value}
        </span>
      )
    },
    {
      key: 'teacherName',
      label: 'TEACHER NAME',
      sortable: true,
    },
    {
      key: 'startDate',
      label: 'START DATE',
      sortable: true,
    },
    {
      key: 'endDate',
      label: 'END DATE',
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
      width: '180px',
      render: (_, row) => (
        <div className="action-buttons">
          <button className="view-lessons-btn">View Lessons</button>
          <button className="edit-btn" onClick={() => handleEdit(row)}>
            <Edit size={18} />
          </button>
          <button className="delete-btn" onClick={() => handleDeleteClick(row)}>
            <Trash2 size={18} />
          </button>
        </div>
      )
    }
  ];

  const totalCourses = rows.length;
  const activeCourses = rows.filter(r => r.active).length;

  return (
    <div className="course-details-page">
      <div className="theory-page-header">
        <div className="theory-page-header-content">
          <div className="theory-page-header-left">
            <div className="theory-page-header-icon">
              <BookOpen size={28} />
            </div>
            <div>
              <h1 className="theory-page-header-title">Course Management</h1>
              <p className="theory-page-header-subtitle">Manage all dance courses and their details</p>
            </div>
          </div>
          <div className="theory-page-header-stats">
            <div className="theory-page-stat-card">
              <div className="theory-page-stat-icon theory-page-stat-icon-primary">
                <BookOpen size={20} />
              </div>
              <div className="theory-page-stat-content">
                <div className="theory-page-stat-value">{totalCourses}</div>
                <div className="theory-page-stat-label">Total Courses</div>
              </div>
            </div>
            <div className="theory-page-stat-card">
              <div className="theory-page-stat-icon theory-page-stat-icon-success">
                <TrendingUp size={20} />
              </div>
              <div className="theory-page-stat-content">
                <div className="theory-page-stat-value">{activeCourses}</div>
                <div className="theory-page-stat-label">Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="theory-section">
        <div className="theory-section-header">
          <h2 className="theory-section-title">Course Details</h2>
          <button className="theory-button theory-button-primary" onClick={handleAddCourse}>
            <Plus className="theory-button-icon" />
            <span>Add New Course</span>
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
          />
        </div>
      </div>

      <CourseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCourse}
        courseData={selectedCourse}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Course"
        message={`Are you sure you want to delete "${courseToDelete?.title || 'this course'}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        icon={Trash2}
      />
    </div>
  );
};

export default CourseDetails;
