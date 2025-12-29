import React, { useState } from 'react';
import { Search, Filter, Edit, Trash2, Plus } from 'lucide-react';
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
        <span className={`status-pill ${value ? 'active' : ''}`}>
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

  return (
    <div className="choreography-page">
      <div className="choreography-container">
        <div className="choreography-card">
          <div className="choreography-card-header">
            <h3 className="choreography-title">Choreography Videos</h3>

            <div className="choreography-toolbar">
              <div className="choreography-search-filter">
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

                <button className="add-btn" onClick={handleAddVideo}>
                  <Plus size={18} />
                  <span>Add Video</span>
                </button>
              </div>
            </div>
          </div>

          <div className="choreography-table-wrapper">
            <DataTable
              columns={columns}
              data={filteredData}
              selectable={true}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
            />
          </div>
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
