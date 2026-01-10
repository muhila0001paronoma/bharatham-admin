import React, { useState, useEffect } from 'react';
import { Search, Filter, Edit, Trash2, Plus, Video, Film, CheckCircle } from 'lucide-react';
import DataTable from '../../components/ui/DataTable';
import ChoreographyVideoModal from '../../components/teachers/ChoreographyVideoModal';
import ConfirmationModal from '../../components/ui/ConfirmationModal';
import { choreographyVideoService } from '../../services/choreographyVideoService';
import { teacherService } from '../../services/teacherService';
import './ChoreographyVideos.css';

const ChoreographyVideos = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoToDelete, setVideoToDelete] = useState(null);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [teachers, setTeachers] = useState({});

  // Helper function to get teacher name from ID
  const getTeacherName = (teacherId) => {
    return teachers[teacherId]?.name || teacherId;
  };

  // Helper function to format duration
  const formatDuration = (seconds) => {
    if (!seconds) return '0 minutes';
    const minutes = Math.floor(seconds / 60);
    return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  };

  // Load videos and teachers
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch both videos and teachers
        const [videosResponse, teachersResponse] = await Promise.all([
          choreographyVideoService.getAll(),
          teacherService.getAll()
        ]);

        // Create teacher lookup map
        if (teachersResponse.success && teachersResponse.data) {
          const teacherMap = {};
          teachersResponse.data.forEach(teacher => {
            teacherMap[teacher.id] = teacher;
          });
          setTeachers(teacherMap);
        }

        // Set videos
        if (videosResponse.success && videosResponse.data) {
          setRows(videosResponse.data);
        }
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load videos. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const handleAddVideo = () => {
    setSelectedVideo(null);
    setIsModalOpen(true);
  };

  const handleEdit = (video) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (video) => {
    setVideoToDelete(video);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!videoToDelete) return;

    try {
      setLoading(true);
      const response = await choreographyVideoService.delete(videoToDelete.id);

      if (response.success) {
        // Reload videos
        const videosResponse = await choreographyVideoService.getAll();
        if (videosResponse.success && videosResponse.data) {
          setRows(videosResponse.data);
        }
        setIsDeleteModalOpen(false);
        setVideoToDelete(null);
      } else {
        setError(response.message || 'Failed to delete video');
      }
    } catch (err) {
      console.error('Error deleting video:', err);
      setError('Failed to delete video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveVideo = async (formData) => {
    try {
      setLoading(true);
      let response;

      if (selectedVideo) {
        // Update existing
        response = await choreographyVideoService.update(selectedVideo.id, formData);
      } else {
        // Add new
        response = await choreographyVideoService.create(formData);
      }

      if (response.success) {
        // Reload videos
        const videosResponse = await choreographyVideoService.getAll();
        if (videosResponse.success && videosResponse.data) {
          setRows(videosResponse.data);
        }
        setIsModalOpen(false);
        setSelectedVideo(null);
      } else {
        setError(response.message || 'Failed to save video');
      }
    } catch (err) {
      console.error('Error saving video:', err);
      setError('Failed to save video. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const filteredData = rows.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    const teacherName = getTeacherName(item.teacherId);
    return (
      item.title.toLowerCase().includes(query) ||
      teacherName.toLowerCase().includes(query) ||
      (item.description && item.description.toLowerCase().includes(query))
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
      key: 'videoUrl',
      label: 'VIDEO URL',
      sortable: true,
      render: (value) => <div className="url-cell" title={value}>{value}</div>
    },
    {
      key: 'thumbnailUrl',
      label: 'THUMBNAIL URL',
      sortable: true,
      render: (value) => <div className="url-cell" title={value}>{value}</div>
    },
    {
      key: 'title',
      label: 'TITLE',
      sortable: true,
    },
    {
      key: 'teacherId',
      label: 'TEACHER NAME',
      sortable: true,
      render: (value) => getTeacherName(value)
    },
    {
      key: 'description',
      label: 'DESCRIPTION',
      sortable: true,
      render: (value) => <div className="description-cell">{value}</div>
    },
    {
      key: 'level',
      label: 'LEVEL',
      sortable: true,
    },
    {
      key: 'duration',
      label: 'DURATION',
      sortable: true,
      render: (value) => formatDuration(value)
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
    },
    {
      key: 'actions',
      label: 'ACTIONS',
      render: (_, row) => (
        <div className="action-buttons">
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

  const totalVideos = rows.length;
  const activeVideos = rows.filter(r => r.isActive).length;

  return (
    <div className="choreography-page">
      <div className="theory-page-header">
        <div className="theory-page-header-content">
          <div className="theory-page-header-left">
            <div className="theory-page-header-icon">
              <Video size={28} />
            </div>
            <div>
              <h1 className="theory-page-header-title">Choreography Management</h1>
              <p className="theory-page-header-subtitle">Manage and showcase dance choreography videos</p>
            </div>
          </div>
          <div className="theory-page-header-stats">
            <div className="theory-page-stat-card">
              <div className="theory-page-stat-icon theory-page-stat-icon-primary">
                <Film size={20} />
              </div>
              <div className="theory-page-stat-content">
                <div className="theory-page-stat-value">{totalVideos}</div>
                <div className="theory-page-stat-label">Total Videos</div>
              </div>
            </div>
            <div className="theory-page-stat-card">
              <div className="theory-page-stat-icon theory-page-stat-icon-success">
                <CheckCircle size={20} />
              </div>
              <div className="theory-page-stat-content">
                <div className="theory-page-stat-value">{activeVideos}</div>
                <div className="theory-page-stat-label">Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="theory-section">
        <div className="theory-section-header">
          <h2 className="theory-section-title">Choreography Videos</h2>
          <button className="theory-button theory-button-primary" onClick={handleAddVideo}>
            <Plus className="theory-button-icon" />
            <span>Add Video</span>
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

        {loading && <div className="quiz-loading">Loading videos...</div>}
        {error && <div className="quiz-error">{error}</div>}

        {!loading && !error && (
          <div className="theory-table-container">
            <DataTable
              columns={columns}
              data={filteredData}
              selectable={true}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
            />
          </div>
        )}
      </div>

      <ChoreographyVideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveVideo}
        videoData={selectedVideo}
        teachers={Object.values(teachers)}
        loading={loading}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Choreography Video"
        message={`Are you sure you want to delete "${videoToDelete?.title || 'this video'}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        icon={Trash2}
      />
    </div>
  );
};

export default ChoreographyVideos;
