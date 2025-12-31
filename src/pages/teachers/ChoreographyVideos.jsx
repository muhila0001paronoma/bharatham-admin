import React, { useState } from 'react';
import { Search, Filter, Edit, Trash2, Plus, Video, Film, CheckCircle } from 'lucide-react';
import DataTable from '../../components/ui/DataTable';
import ChoreographyVideoModal from '../../components/teachers/ChoreographyVideoModal';
import ConfirmationModal from '../../components/ui/ConfirmationModal';
import './ChoreographyVideos.css';

const ChoreographyVideos = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videoToDelete, setVideoToDelete] = useState(null);

  // Mock data as seen in the image
  const [rows, setRows] = useState([
    {
      id: 1,
      videoUrl: 'https://example.com/videos/adavus-basic.mp4',
      thumbnailUrl: 'https://example.com/thumbnails/adavus-basic.jpg',
      title: 'Adavus - Basic Steps',
      teacherName: 'Sita Raman',
      description: 'Learn the fundamental adavus (basic steps) of Bharatanatyam',
      level: 'Beginner',
      duration: '14 minutes',
      active: true
    },
    {
      id: 2,
      videoUrl: 'https://example.com/videos/adavus-basic.mp4',
      thumbnailUrl: 'https://example.com/thumbnails/adavus-basic.jpg',
      title: 'Adavus - Basic Steps',
      teacherName: 'Sita Raman',
      description: 'Learn the fundamental adavus (basic steps) of Bharatanatyam',
      level: 'Beginner',
      duration: '14 minutes',
      active: true
    },
    {
      id: 3,
      videoUrl: 'https://example.com/videos/adavus-basic.mp4',
      thumbnailUrl: 'https://example.com/thumbnails/adavus-basic.jpg',
      title: 'Adavus - Basic Steps',
      teacherName: 'Sita Raman',
      description: 'Learn the fundamental adavus (basic steps) of Bharatanatyam',
      level: 'Beginner',
      duration: '14 minutes',
      active: true
    },
    {
      id: 4,
      videoUrl: 'https://example.com/videos/adavus-basic.mp4',
      thumbnailUrl: 'https://example.com/thumbnails/adavus-basic.jpg',
      title: 'Adavus - Basic Steps',
      teacherName: 'Sita Raman',
      description: 'Learn the fundamental adavus (basic steps) of Bharatanatyam',
      level: 'Beginner',
      duration: '14 minutes',
      active: true
    },
    {
      id: 5,
      videoUrl: 'https://example.com/videos/adavus-basic.mp4',
      thumbnailUrl: 'https://example.com/thumbnails/adavus-basic.jpg',
      title: 'Adavus - Basic Steps',
      teacherName: 'Sita Raman',
      description: 'Learn the fundamental adavus (basic steps) of Bharatanatyam',
      level: 'Beginner',
      duration: '14 minutes',
      active: true
    },
    {
      id: 6,
      videoUrl: 'https://example.com/videos/adavus-basic.mp4',
      thumbnailUrl: 'https://example.com/thumbnails/adavus-basic.jpg',
      title: 'Adavus - Basic Steps',
      teacherName: 'Sita Raman',
      description: 'Learn the fundamental adavus (basic steps) of Bharatanatyam',
      level: 'Beginner',
      duration: '14 minutes',
      active: true
    }
  ]);

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

  const handleConfirmDelete = () => {
    if (videoToDelete) {
      setRows(prev => prev.filter(v => v.id !== videoToDelete.id));
      setIsDeleteModalOpen(false);
      setVideoToDelete(null);
    }
  };

  const handleSaveVideo = (formData) => {
    if (selectedVideo) {
      // Update existing
      setRows(prev => prev.map(v => v.id === selectedVideo.id ? { ...formData, id: v.id } : v));
    } else {
      // Add new
      const newVideo = {
        ...formData,
        id: rows.length > 0 ? Math.max(...rows.map(v => v.id)) + 1 : 1
      };
      setRows(prev => [...prev, newVideo]);
    }
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const filteredData = rows.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(query) ||
      item.teacherName.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
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
      key: 'teacherName',
      label: 'TEACHER NAME',
      sortable: true,
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
  const activeVideos = rows.filter(r => r.active).length;

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

      <ChoreographyVideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveVideo}
        videoData={selectedVideo}
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
