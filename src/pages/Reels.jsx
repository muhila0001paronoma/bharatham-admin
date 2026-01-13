import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Edit2, Trash2, Eye, Play } from 'lucide-react';
import DataTable from '../components/ui/DataTable';
import ReelModal from '../components/reel/ReelModal';
import CommentsModal from '../components/reel/CommentsModal';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import { reelService } from '../services/reelService';
import './Reels.css';

export default function Reels() {
  const [searchQuery, setSearchQuery] = useState('');
  const [reels, setReels] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReelData, setSelectedReelData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [viewCommentsModal, setViewCommentsModal] = useState(false);
  const [selectedReelForComments, setSelectedReelForComments] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchReels();
  }, []);

  const fetchReels = async () => {
    setLoading(true);
    try {
      const response = await reelService.getAllReels();
      if (response.success) {
        setReels(response.data);
      } else {
        setError(response.message || 'Failed to fetch reels');
      }
    } catch (err) {
      setError('An error occurred while fetching reels');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredData = reels.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      (item.reelUrl && item.reelUrl.toLowerCase().includes(query)) ||
      (item.reelTitle && item.reelTitle.toLowerCase().includes(query)) ||
      (item.uploadedBy && item.uploadedBy.toLowerCase().includes(query))
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
      key: 'reelUrl',
      label: 'VIDEO URL',
      sortable: true,
      width: '300px',
      render: (value) => (
        <div className="reels-table-url" title={value}>
          {value && value.length > 50 ? `${value.substring(0, 50)}...` : value}
        </div>
      )
    },
    {
      key: 'reelTitle',
      label: 'TITLE',
      sortable: true,
      width: '200px'
    },
    {
      key: 'uploadedBy',
      label: 'UPLOADED BY',
      sortable: true,
      width: '200px'
    },
    {
      key: 'uploadedAt',
      label: 'UPLOADED AT',
      sortable: true,
      width: '180px',
      render: (value) => value ? new Date(value).toLocaleString() : 'N/A'
    },
    {
      key: 'likeCount',
      label: 'LIKES',
      sortable: true,
      width: '100px',
      render: (value) => value || 0
    },
    {
      key: 'shareCount',
      label: 'SHARES',
      sortable: true,
      width: '100px',
      render: (value) => value || 0
    },
    {
      key: 'isActive',
      label: 'ACTIVE',
      sortable: true,
      width: '100px',
      render: (value) => (
        <span className={`reels-status ${value ? 'reels-status-active' : 'reels-status-inactive'}`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'ACTIONS',
      sortable: false,
      width: '200px',
      render: (value, row) => (
        <div className="reels-table-actions">
          <button
            className="reels-action-btn reels-action-view-comments"
            onClick={() => handleViewComments(row)}
            title="View Comments"
          >
            View Comments
          </button>
          <button
            className="reels-action-btn reels-action-edit"
            onClick={() => handleEdit(row)}
            title="Edit"
          >
            <Edit2 size={16} />
          </button>
          <button
            className="reels-action-btn reels-action-delete"
            onClick={() => handleDelete(row)}
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ];

  const handleAddReel = () => {
    setSelectedReelData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setSelectedReelData(row);
    setIsModalOpen(true);
  };

  const handleSaveReel = async (formData) => {
    try {
      if (selectedReelData) {
        const response = await reelService.updateReel(selectedReelData.id, formData);
        if (response.success) {
          fetchReels();
        } else {
          alert(response.message || 'Failed to update reel');
        }
      } else {
        const response = await reelService.createReel(formData);
        if (response.success) {
          fetchReels();
        } else {
          alert(response.message || 'Failed to create reel');
        }
      }
      setIsModalOpen(false);
      setSelectedReelData(null);
    } catch (err) {
      console.error('Error saving reel:', err);
      alert('An error occurred while saving the reel');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReelData(null);
  };

  const handleDelete = (row) => {
    setItemToDelete(row);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      try {
        const response = await reelService.deleteReel(itemToDelete.id);
        if (response.success) {
          fetchReels();
        } else {
          alert(response.message || 'Failed to delete reel');
        }
        setItemToDelete(null);
        setIsDeleteModalOpen(false);
      } catch (err) {
        console.error('Error deleting reel:', err);
        alert('An error occurred while deleting the reel');
      }
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleViewComments = (row) => {
    setSelectedReelForComments(row);
    setViewCommentsModal(true);
  };

  const handleCloseCommentsModal = () => {
    setViewCommentsModal(false);
    setSelectedReelForComments(null);
  };

  const handleFilter = () => {
    console.log('Filter');
  };

  const totalReels = reels.length;
  const activeReels = reels.filter(item => item.isActive).length;
  const totalLikes = reels.reduce((sum, item) => sum + (item.likeCount || 0), 0);
  const totalShares = reels.reduce((sum, item) => sum + (item.shareCount || 0), 0);

  return (
    <div className="reels-page">
      <div className="reels-page-header">
        <div className="reels-page-header-content">
          <div className="reels-page-header-left">
            <div className="reels-page-header-icon">
              <Play size={28} />
            </div>
            <div>
              <h1 className="reels-page-header-title">Reels Management</h1>
              <p className="reels-page-header-subtitle">Manage reels and videos for the Bharatham app</p>
            </div>
          </div>
          <div className="reels-page-header-stats">
            <div className="reels-page-stat-card">
              <div className="reels-page-stat-icon reels-page-stat-icon-primary">
                <Play size={20} />
              </div>
              <div className="reels-page-stat-content">
                <div className="reels-page-stat-value">{totalReels}</div>
                <div className="reels-page-stat-label">Total Reels</div>
              </div>
            </div>
            <div className="reels-page-stat-card">
              <div className="reels-page-stat-icon reels-page-stat-icon-success">
                <Eye size={20} />
              </div>
              <div className="reels-page-stat-content">
                <div className="reels-page-stat-value">{activeReels}</div>
                <div className="reels-page-stat-label">Active</div>
              </div>
            </div>
            <div className="reels-page-stat-card">
              <div className="reels-page-stat-icon reels-page-stat-icon-info">
                <Search size={20} />
              </div>
              <div className="reels-page-stat-content">
                <div className="reels-page-stat-value">{totalLikes}</div>
                <div className="reels-page-stat-label">Total Likes</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="reels-section">
        <div className="reels-section-header">
          <h2 className="reels-section-title">Reels</h2>
          <button
            onClick={handleAddReel}
            className="reels-button reels-button-primary"
          >
            <Plus className="reels-button-icon" />
            Add New Reel
          </button>
        </div>
        <div className="reels-details-toolbar">
          <div className="reels-search-filter">
            <button
              onClick={handleFilter}
              className="reels-filter-button"
              title="Filter"
            >
              <Filter className="reels-filter-icon" />
            </button>
            <div className="reels-search-input-wrapper">
              <Search className="reels-search-icon" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="reels-search-input"
              />
            </div>
          </div>
        </div>
        <div className="reels-table-container">
          <DataTable
            columns={columns}
            data={filteredData}
            selectable={true}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
          />
        </div>
      </div>

      <ReelModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveReel}
        reelData={selectedReelData}
      />

      <CommentsModal
        isOpen={viewCommentsModal}
        onClose={handleCloseCommentsModal}
        reel={selectedReelForComments}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete Reel"
        message={`Are you sure you want to delete "${itemToDelete?.title || 'this reel'}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        icon={Trash2}
      />
    </div>
  );
}
