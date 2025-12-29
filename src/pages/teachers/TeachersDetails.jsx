import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, X, Upload } from 'lucide-react';
import DataTable from '../../components/ui/DataTable';
import TeacherMobilePreview from '../../components/teachers/TeacherMobilePreview';
import { getTeachersDetails } from '../../data/data.js';
import './TeachersDetails.css';
import '../../components/ui/DataTable.css';

const TeachersDetails = () => {
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(10);

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
    active: true,
    image: null
  });

  useEffect(() => {
    const loadTeachers = async () => {
      const teachers = await getTeachersDetails();
      setRows(teachers);
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
        position: teacher.position,
        active: teacher.active,
        image: teacher.image
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
        active: true,
        image: null
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const newTeacher = {
        ...form,
        id: rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1
      };
      setRows([...rows, newTeacher]);
    } else {
      setRows(rows.map(r => r.id === selectedTeacher.id ? { ...form, id: r.id } : r));
    }
    handleCloseModal();
  };

  const handleDelete = (row) => {
    if (window.confirm('Are you sure you want to delete this teacher?')) {
      setRows(rows.filter(r => r.id !== row.id));
    }
  };

  const filteredData = rows.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.specialization.toLowerCase().includes(query) ||
      item.position.toLowerCase().includes(query)
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
      key: 'image',
      label: 'IMAGE',
      sortable: false,
      width: '100px',
      render: (value) => (
        <div className="teacher-table-image">
          {value ? (
            <img src={value} alt="Teacher" className="teacher-table-image" />
          ) : (
            <div className="teacher-table-image" />
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
      key: 'position',
      label: 'POSITION',
      sortable: true,
    },
    {
      key: 'active',
      label: 'ACTIVE',
      sortable: true,
      render: (value) => (
        <span className={`status-pill ${value ? 'active' : ''}`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    }
  ];

  return (
    <div className="teachers-details-page">
      <div className="teachers-details-header">
        <h2 className="teachers-details-title">Teachers</h2>
      </div>

      <div className="teachers-details-container">
        <div className="teachers-details-card">
          <div className="teachers-details-card-header">
            <h3 className="card-title">Teacher Details</h3>

            <div className="teachers-details-toolbar">
              <div className="teachers-details-search-filter">
                <button className="filter-btn" title="Filter">
                  <Filter size={18} />
                </button>

                <div className="search-input-wrapper">
                  <Search size={18} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                  />
                </div>
              </div>

              <button className="add-btn" onClick={() => handleOpenModal('add')}>
                <Plus size={18} />
                <span>Add New Teacher</span>
              </button>
            </div>
          </div>

          <div className="teachers-details-table-wrapper">
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
        </div>
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
                      <div className="upload-icon-box">
                        <Upload size={20} />
                      </div>
                      <div className="upload-text">
                        <span>Click to upload</span>
                        <span>JPG, PNG or GIF (max. 2MB)</span>
                      </div>
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
              <button type="submit" form="teacherForm" className="modal-btn save">
                {modalMode === 'edit' ? 'Update Teacher' : 'Save Teacher'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeachersDetails;
