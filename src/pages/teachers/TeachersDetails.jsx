import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, X, Upload, Users, GraduationCap, TrendingUp, UserCheck } from 'lucide-react';
import DataTable from '../../components/ui/DataTable';
import TeacherMobilePreview from '../../components/teachers/TeacherMobilePreview';
import { teacherService } from '../../services/teacherService';
import './TeachersDetails.css';
import '../../components/ui/DataTable.css';

const TeachersDetails = () => {
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [form, setForm] = useState({
    name: '',
    experience: '',
    email: '',
    phone: '',
    specialization: '',
    position: '',
    bio: '',
    rating: 0,
    totalStudents: 0,
    active: true,
    image: null,
    imageFile: null
  });

  useEffect(() => {
    const loadTeachers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await teacherService.getAll();
        if (response.success && response.data) {
          setRows(response.data);
        }
      } catch (err) {
        console.error('Error loading teachers:', err);
        setError('Failed to load teachers. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadTeachers();
  }, []);

  const handleOpenModal = (mode = 'add', teacher = null) => {
    setModalMode(mode);
    if (mode === 'edit' && teacher) {
      setSelectedTeacher(teacher);
      setForm({
        name: teacher.name,
        experience: teacher.experience,
        email: teacher.email,
        phone: teacher.phone,
        specialization: teacher.specialization,
        position: teacher.title || '',
        bio: teacher.bio || '',
        rating: teacher.rating || 0,
        totalStudents: teacher.totalStudents || 0,
        active: teacher.isActive,
        image: teacher.avatarUrl,
        imageFile: null
      });
    } else {
      setSelectedTeacher(null);
      setForm({
        name: '',
        experience: '',
        email: '',
        phone: '',
        specialization: '',
        position: '',
        bio: '',
        rating: 0,
        totalStudents: 0,
        active: true,
        image: null,
        imageFile: null
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file' && files && files[0]) {
      const file = files[0];
      setForm(prev => ({
        ...prev,
        imageFile: file,
        image: URL.createObjectURL(file)
      }));
    } else {
      setForm(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const teacherData = {
        name: form.name,
        title: form.position,
        experience: form.experience,
        specialization: form.specialization,
        bio: form.bio,
        email: form.email,
        phone: form.phone,
        rating: parseFloat(form.rating) || 0,
        totalStudents: parseInt(form.totalStudents) || 0,
        isActive: form.active,
        imageFile: form.imageFile
      };

      let response;
      if (modalMode === 'edit' && selectedTeacher) {
        response = await teacherService.update(selectedTeacher.id, teacherData);
      } else {
        response = await teacherService.create(teacherData);
      }

      if (response.success) {
        // Reload teachers
        const teachersResponse = await teacherService.getAll();
        if (teachersResponse.success && teachersResponse.data) {
          setRows(teachersResponse.data);
        }
        handleCloseModal();
      } else {
        setError(response.message || 'Failed to save teacher');
      }
    } catch (err) {
      console.error('Error saving teacher:', err);
      setError('Failed to save teacher. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (row) => {
    if (!window.confirm(`Are you sure you want to delete ${row.name}?`)) {
      return;
    }

    try {
      setLoading(true);
      const response = await teacherService.delete(row.id);
      if (response.success) {
        // Reload teachers
        const teachersResponse = await teacherService.getAll();
        if (teachersResponse.success && teachersResponse.data) {
          setRows(teachersResponse.data);
        }
      } else {
        setError(response.message || 'Failed to delete teacher');
      }
    } catch (err) {
      console.error('Error deleting teacher:', err);
      setError('Failed to delete teacher. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredData = rows.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.specialization.toLowerCase().includes(query) ||
      (item.title && item.title.toLowerCase().includes(query))
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
      key: 'avatarUrl',
      label: 'IMAGE',
      sortable: false,
      width: '100px',
      render: (value) => (
        <div className="teacher-table-image">
          {value ? (
            <img src={value} alt="Teacher" className="teacher-table-image" />
          ) : (
            <div className="teacher-table-image-placeholder">
              <Users size={20} />
            </div>
          )}
        </div>
      )
    },
    {
      key: 'name',
      label: 'NAME',
      sortable: true,
    },
    {
      key: 'experience',
      label: 'EXPERIENCE',
      sortable: true,
    },
    {
      key: 'email',
      label: 'EMAIL',
      sortable: true,
    },
    {
      key: 'phone',
      label: 'PHONE NUMBER',
      sortable: true,
    },
    {
      key: 'specialization',
      label: 'SPECIALIZATION',
      sortable: true,
    },
    {
      key: 'title',
      label: 'POSITION',
      sortable: true,
    },
    {
      key: 'isActive',
      label: 'ACTIVE',
      sortable: true,
      render: (value) => (
        <span className={`theory-status ${value ? 'theory-status-active' : 'theory-status-inactive'}`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    }
  ];

  const totalTeachers = rows.length;
  const activeTeachers = rows.filter(r => r.isActive).length;

  return (
    <div className="teachers-details-page">
      <div className="theory-page-header">
        <div className="theory-page-header-content">
          <div className="theory-page-header-left">
            <div className="theory-page-header-icon">
              <GraduationCap size={28} />
            </div>
            <div>
              <h1 className="theory-page-header-title">Teacher Management</h1>
              <p className="theory-page-header-subtitle">Manage dance instructors and their professional profiles</p>
            </div>
          </div>
          <div className="theory-page-header-stats">
            <div className="theory-page-stat-card">
              <div className="theory-page-stat-icon theory-page-stat-icon-primary">
                <Users size={20} />
              </div>
              <div className="theory-page-stat-content">
                <div className="theory-page-stat-value">{totalTeachers}</div>
                <div className="theory-page-stat-label">Total Teachers</div>
              </div>
            </div>
            <div className="theory-page-stat-card">
              <div className="theory-page-stat-icon theory-page-stat-icon-success">
                <UserCheck size={20} />
              </div>
              <div className="theory-page-stat-content">
                <div className="theory-page-stat-value">{activeTeachers}</div>
                <div className="theory-page-stat-label">Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="theory-section">
        <div className="theory-section-header">
          <h2 className="theory-section-title">Teacher Details</h2>
          <button className="theory-button theory-button-primary" onClick={() => handleOpenModal('add')}>
            <Plus className="theory-button-icon" />
            <span>Add New Teacher</span>
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

        {loading && <div className="quiz-loading">Loading teachers...</div>}
        {error && <div className="quiz-error">{error}</div>}

        {!loading && !error && (
          <div className="theory-table-container">
            <DataTable
              columns={columns}
              data={filteredData}
              onEdit={(row) => handleOpenModal('edit', row)}
              onDelete={handleDelete}
              selectable={true}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
            />
          </div>
        )}
      </div>

      {showModal && (
        <div className="teacher-modal-overlay" onClick={handleCloseModal}>
          <div className="teacher-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="teacher-modal-header">
              <h3 className="teacher-modal-title">
                {modalMode === 'edit' ? 'Edit Teacher' : 'Add New Teacher'}
              </h3>
              <button className="teacher-modal-close" onClick={handleCloseModal}>
                <X size={18} />
              </button>
            </div>

            <div className="teacher-modal-body">
              {/* Left Side - Form */}
              <div className="teacher-modal-form-section">
                <form id="teacherForm" className="teacher-modal-form" onSubmit={handleSubmit}>
                  <div className="teacher-modal-field">
                    <label>Teacher Image</label>
                    <div className="image-upload-wrapper">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleChange}
                        style={{ display: 'none' }}
                        id="imageUpload"
                      />
                      <label htmlFor="imageUpload" style={{ cursor: 'pointer', width: '100%' }}>
                        {form.image ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <img src={form.image} alt="Preview" style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} />
                            <span>Click to change image</span>
                          </div>
                        ) : (
                          <>
                            <div className="upload-icon-box">
                              <Upload size={20} />
                            </div>
                            <div className="upload-text">
                              <span>Click to upload</span>
                              <span>JPG, PNG or GIF (max. 2MB)</span>
                            </div>
                          </>
                        )}
                      </label>
                    </div>
                  </div>

                  <div className="teacher-modal-row">
                    <div className="teacher-modal-field">
                      <label htmlFor="name">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. Sita Raman"
                        required
                      />
                    </div>
                    <div className="teacher-modal-field">
                      <label htmlFor="experience">Experience</label>
                      <input
                        type="text"
                        id="experience"
                        name="experience"
                        value={form.experience}
                        onChange={handleChange}
                        placeholder="e.g. 6 years"
                        required
                      />
                    </div>
                  </div>

                  <div className="teacher-modal-row">
                    <div className="teacher-modal-field">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="sita.raman@gmail.com"
                        required
                      />
                    </div>
                    <div className="teacher-modal-field">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+919876543210"
                        required
                      />
                    </div>
                  </div>

                  <div className="teacher-modal-row">
                    <div className="teacher-modal-field">
                      <label htmlFor="specialization">Specialization</label>
                      <input
                        type="text"
                        id="specialization"
                        name="specialization"
                        value={form.specialization}
                        onChange={handleChange}
                        placeholder="e.g. Lasya and Mudras"
                        required
                      />
                    </div>
                    <div className="teacher-modal-field">
                      <label htmlFor="position">Position</label>
                      <select id="position" name="position" value={form.position} onChange={handleChange} required>
                        <option value="">Select Position</option>
                        <option value="Lead Instructor">Lead Instructor</option>
                        <option value="Senior Teacher">Senior Teacher</option>
                        <option value="Junior Teacher">Junior Teacher</option>
                        <option value="Assistant">Assistant</option>
                      </select>
                    </div>
                  </div>

                  <div className="teacher-modal-row">
                    <div className="teacher-modal-field">
                      <label htmlFor="rating">Initial Rating</label>
                      <input
                        type="number"
                        id="rating"
                        name="rating"
                        value={form.rating}
                        onChange={handleChange}
                        step="0.1"
                        min="0"
                        max="5"
                        placeholder="e.g. 4.5"
                        required
                      />
                    </div>
                    <div className="teacher-modal-field">
                      <label htmlFor="totalStudents">Total Students</label>
                      <input
                        type="number"
                        id="totalStudents"
                        name="totalStudents"
                        value={form.totalStudents}
                        onChange={handleChange}
                        placeholder="e.g. 150"
                        required
                      />
                    </div>
                  </div>

                  <div className="teacher-modal-field">
                    <label htmlFor="bio">Biography</label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={form.bio}
                      onChange={handleChange}
                      placeholder="Enter teacher's biography and professional background..."
                      rows={4}
                      required
                    />
                  </div>

                  <div className="teacher-modal-field">
                    <label className="quiz-checkbox-label">
                      <input
                        type="checkbox"
                        name="active"
                        checked={form.active}
                        onChange={handleChange}
                      />
                      <span>Active Teacher Profile</span>
                    </label>
                  </div>
                </form>
              </div>

              {/* Right Side - Mobile Preview */}
              <div className="teacher-modal-preview-section">
                <div className="teacher-preview-header">
                  <h3 className="teacher-preview-title">Mobile Preview</h3>
                </div>
                <TeacherMobilePreview formData={form} />
              </div>
            </div>

            <div className="teacher-modal-actions">
              <button type="button" className="modal-btn cancel" onClick={handleCloseModal}>Cancel</button>
              <button type="submit" form="teacherForm" className="modal-btn save" disabled={loading}>
                {loading ? 'Saving...' : (modalMode === 'edit' ? 'Update Teacher' : 'Save Teacher')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeachersDetails;
