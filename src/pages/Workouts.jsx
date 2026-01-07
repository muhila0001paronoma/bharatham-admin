import React, { useState } from 'react';
import { Search, Filter, Plus, Edit2, Dumbbell, FileText, TrendingUp, Users, Trash2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import DataTable from '../components/ui/DataTable';
import WorkoutVideoModal from '../components/workout/WorkoutVideoModal';
import WorkoutTabModal from '../components/workout/WorkoutTabModal';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import { workoutsData } from '../data/data';
import './Workouts.css';

export default function Workouts() {
  const [selectedTab, setSelectedTab] = useState('Fitness');
  const [searchQuery, setSearchQuery] = useState('');
  const [tabSearchQuery, setTabSearchQuery] = useState('');
  const [workoutTabs, setWorkoutTabs] = useState([]);
  const [workoutVideos, setWorkoutVideos] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoData, setSelectedVideoData] = useState(null);
  const [isTabModalOpen, setIsTabModalOpen] = useState(false);
  const [selectedTabData, setSelectedTabData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    fetchTabs();
    fetchVideos();
  }, []);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      fetchVideos(searchQuery);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const fetchTabs = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/workout/tabs`, {
        headers: getAuthHeaders()
      });
      const result = await response.json();
      if (result.success) {
        setWorkoutTabs(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching workout tabs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVideos = async (searchQuery = '') => {
    setIsLoading(true);
    try {
      const url = searchQuery
        ? `${import.meta.env.VITE_API_URL}/workout/videos/search?title=${searchQuery}`
        : `${import.meta.env.VITE_API_URL}/workout/videos`;

      const response = await fetch(url, {
        headers: getAuthHeaders()
      });
      const result = await response.json();
      if (result.success) {
        setWorkoutVideos(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching workout videos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTabs = workoutTabs.filter(tab => {
    if (!tabSearchQuery) return true;
    const query = tabSearchQuery.toLowerCase();
    return tab.tabName.toLowerCase().includes(query);
  });

  const filteredData = workoutVideos; // Already filtered by API or fetchVideos

  const tabColumns = [
    {
      key: 'id',
      label: '#',
      align: 'center',
      sortable: true,
      width: '60px',
      render: (value, row, index) => index + 1
    },
    {
      key: 'tabName',
      label: 'TAB NAME',
      sortable: true,
      width: '200px'
    },
    {
      key: 'tabIcon',
      label: 'ICON',
      align: 'center',
      sortable: false,
      width: '100px',
      render: (value) => {
        const Icon = LucideIcons[value] || LucideIcons.Dumbbell;
        return (
          <div className="workout-table-icon" title={value}>
            <Icon size={20} />
          </div>
        );
      }
    },
    {
      key: 'actions',
      label: 'ACTIONS',
      sortable: false,
      width: '100px',
      render: (value, row) => (
        <div className="workout-table-actions">
          <button
            className="workout-table-action-btn workout-table-action-edit"
            onClick={() => handleEditTab(row)}
            title="Edit"
          >
            <Edit2 size={16} />
          </button>
          <button
            className="workout-table-action-btn workout-table-action-delete"
            onClick={() => handleDeleteTab(row)}
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )
    }
  ];

  const columns = [
    {
      key: 'id',
      label: '#',
      align: 'center',
      sortable: true,
      width: '60px',
      render: (value, row, index) => index + 1
    },
    {
      key: 'videoUrl',
      label: 'VIDEO URL',
      sortable: true,
      width: '250px',
      render: (value) => (
        <div
          className="workout-table-url"
          title={value}
          onClick={() => window.open(value, '_blank')}
        >
          {value.length > 40 ? `${value.substring(0, 40)}...` : value}
        </div>
      )
    },
    {
      key: 'workoutTabId',
      label: 'WORKOUT TAB',
      sortable: true,
      width: '120px',
      render: (value) => workoutTabs.find(t => t.id === value)?.tabName || 'Unknown'
    },
    {
      key: 'title',
      label: 'TITLE',
      sortable: true,
      width: '200px'
    },
    {
      key: 'description',
      label: 'DESCRIPTION',
      sortable: false,
      width: '350px',
      render: (value) => (
        <div className="workout-table-description" title={value}>
          {value.length > 100 ? `${value.substring(0, 100)}...` : value}
        </div>
      )
    },
    {
      key: 'isActive',
      label: 'ACTIVE',
      align: 'center',
      sortable: true,
      width: '100px',
      render: (value) => (
        <span className={`workout-status ${value ? 'workout-status-active' : 'workout-status-inactive'}`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    }
  ];

  const handleCreateTab = () => {
    setSelectedTabData(null);
    setIsTabModalOpen(true);
  };

  const handleEditTab = (tab) => {
    setSelectedTabData(tab);
    setIsTabModalOpen(true);
  };

  const handleSaveTab = async (formData) => {
    setIsLoading(true);
    try {
      const isEdit = !!selectedTabData;
      const url = isEdit
        ? `${import.meta.env.VITE_API_URL}/workout/tabs/${selectedTabData.id}`
        : `${import.meta.env.VITE_API_URL}/workout/tabs`;

      const response = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          tabName: formData.tabName,
          tabIcon: formData.tabIcon
        }),
      });

      const result = await response.json();
      if (result.success) {
        await fetchTabs();
        setIsTabModalOpen(false);
        setSelectedTabData(null);
      } else {
        alert(result.message || 'Failed to save workout tab');
      }
    } catch (error) {
      console.error('Error saving workout tab:', error);
      alert('An error occurred while saving the workout tab');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseTabModal = () => {
    setIsTabModalOpen(false);
    setSelectedTabData(null);
  };

  const handleAddWorkoutVideo = () => {
    setSelectedVideoData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setSelectedVideoData(row);
    setIsModalOpen(true);
  };

  const handleSaveVideo = async (formData) => {
    setIsLoading(true);
    try {
      const isEdit = !!selectedVideoData;
      const url = isEdit
        ? `${import.meta.env.VITE_API_URL}/workout/videos/${selectedVideoData.id}`
        : `${import.meta.env.VITE_API_URL}/workout/videos`;

      const data = new FormData();
      data.append('workoutTabId', formData.workoutTabId);
      data.append('title', formData.title);
      data.append('description', formData.description);
      if (formData.video) {
        data.append('video', formData.video);
      }

      const headers = { ...getAuthHeaders() };
      delete headers['Content-Type']; // Let browser set boundary for multipart/form-data

      const response = await fetch(url, {
        method: isEdit ? 'PUT' : 'POST',
        headers: headers,
        body: data,
      });

      const result = await response.json();
      if (result.success) {
        await fetchVideos();
        setIsModalOpen(false);
        setSelectedVideoData(null);
      } else {
        alert(result.message || 'Failed to save workout video');
      }
    } catch (error) {
      console.error('Error saving workout video:', error);
      alert('An error occurred while saving the workout video');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideoData(null);
  };

  const handleDelete = (row) => {
    setItemToDelete(row);
    setDeleteType('video');
    setIsDeleteModalOpen(true);
  };

  const handleDeleteTab = (row) => {
    setItemToDelete(row);
    setDeleteType('tab');
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;

    setIsLoading(true);
    try {
      if (deleteType === 'tab') {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/workout/tabs/${itemToDelete.id}`, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
        const result = await response.json();
        if (result.success) {
          await fetchTabs();
        } else {
          alert(result.message || 'Failed to delete workout tab');
        }
      } else {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/workout/videos/${itemToDelete.id}`, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });
        const result = await response.json();
        if (result.success) {
          await fetchVideos();
        } else {
          alert(result.message || 'Failed to delete workout video');
        }
      }
    } catch (error) {
      console.error('Error deleting:', error);
      alert('An error occurred while deleting');
    } finally {
      setIsLoading(false);
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
      setDeleteType(null);
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
    setDeleteType(null);
  };

  const handleFilter = () => {
    console.log('Filter');
  };

  const totalTabs = workoutTabs.length;
  const totalVideos = workoutVideos.length;
  const activeVideos = workoutVideos.filter(item => item.isActive).length;

  return (
    <div className="workout-page">
      <div className="workout-page-header">
        <div className="workout-page-header-content">
          <div className="workout-page-header-left">
            <div className="workout-page-header-icon">
              <Dumbbell size={28} />
            </div>
            <div>
              <h1 className="workout-page-header-title">Workout Management</h1>
              <p className="workout-page-header-subtitle">Manage workout tabs and videos for the Bharatham app</p>
            </div>
          </div>
          <div className="workout-page-header-stats">
            <div className="workout-page-stat-card">
              <div className="workout-page-stat-icon workout-page-stat-icon-primary">
                <FileText size={20} />
              </div>
              <div className="workout-page-stat-content">
                <div className="workout-page-stat-value">{totalTabs}</div>
                <div className="workout-page-stat-label">Tabs</div>
              </div>
            </div>
            <div className="workout-page-stat-card">
              <div className="workout-page-stat-icon workout-page-stat-icon-success">
                <TrendingUp size={20} />
              </div>
              <div className="workout-page-stat-content">
                <div className="workout-page-stat-value">{totalVideos}</div>
                <div className="workout-page-stat-label">Total Videos</div>
              </div>
            </div>
            <div className="workout-page-stat-card">
              <div className="workout-page-stat-icon workout-page-stat-icon-info">
                <Users size={20} />
              </div>
              <div className="workout-page-stat-content">
                <div className="workout-page-stat-value">{activeVideos}</div>
                <div className="workout-page-stat-label">Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="workout-section">
        <div className="workout-section-header">
          <h2 className="workout-section-title">Workout Tabs</h2>
          <button
            onClick={handleCreateTab}
            className="workout-button workout-button-primary"
          >
            <Plus className="workout-button-icon" />
            Create Workout Tab
          </button>
        </div>
        <div className="workout-videos-toolbar">
          <div className="workout-search-filter">
            <div className="workout-search-input-wrapper">
              <Search className="workout-search-icon" />
              <input
                type="text"
                placeholder="Search tabs..."
                value={tabSearchQuery}
                onChange={(e) => setTabSearchQuery(e.target.value)}
                className="workout-search-input"
              />
            </div>
          </div>
        </div>
        <div className="workout-table-container">
          <DataTable
            data={filteredTabs}
            columns={tabColumns}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
            isLoading={isLoading}
          />
        </div>
      </div>

      <div className="workout-section">
        <div className="workout-section-header">
          <h2 className="workout-section-title">Workout Videos</h2>
          <button
            onClick={handleAddWorkoutVideo}
            className="workout-button workout-button-primary"
          >
            <Plus className="workout-button-icon" />
            Add Workout Video
          </button>
        </div>
        <div className="workout-videos-toolbar">
          <div className="workout-search-filter">
            <button
              onClick={handleFilter}
              className="workout-filter-button"
              title="Filter"
            >
              <Filter className="workout-filter-icon" />
            </button>
            <div className="workout-search-input-wrapper">
              <Search className="workout-search-icon" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="workout-search-input"
              />
            </div>
          </div>
        </div>
        <div className="workout-table-container">
          <DataTable
            columns={columns}
            data={filteredData}
            onEdit={handleEdit}
            onDelete={handleDelete}
            selectable={true}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
            isLoading={isLoading}
          />
        </div>
      </div>

      <WorkoutVideoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveVideo}
        videoData={selectedVideoData}
        tabs={workoutTabs}
        isLoading={isLoading}
      />

      <WorkoutTabModal
        isOpen={isTabModalOpen}
        onClose={handleCloseTabModal}
        onSave={handleSaveTab}
        tabData={selectedTabData}
        existingTabs={workoutTabs}
        isLoading={isLoading}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title={deleteType === 'tab' ? 'Delete Workout Tab' : 'Delete Workout Video'}
        message={deleteType === 'tab'
          ? `Are you sure you want to delete "${typeof itemToDelete === 'string' ? itemToDelete : itemToDelete?.tabName || 'this workout tab'}"? This action cannot be undone.`
          : `Are you sure you want to delete "${itemToDelete?.title || 'this workout video'}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        icon={Trash2}
      />
    </div>
  );
}
