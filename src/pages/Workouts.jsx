import React, { useState } from 'react';
import { Search, Filter, Plus, Edit2, Dumbbell, FileText, TrendingUp, Users, Trash2 } from 'lucide-react';
import DataTable from '../components/ui/DataTable';
import WorkoutVideoModal from '../components/workout/WorkoutVideoModal';
import WorkoutTabModal from '../components/workout/WorkoutTabModal';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import { workoutsData } from '../data/data';
import './Workouts.css';

export default function Workouts() {
  const [selectedTab, setSelectedTab] = useState('Fitness');
  const [searchQuery, setSearchQuery] = useState('');
  const [workoutTabs, setWorkoutTabs] = useState(workoutsData.tabs);
  const [workoutVideos, setWorkoutVideos] = useState(workoutsData.videos);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideoData, setSelectedVideoData] = useState(null);
  const [isTabModalOpen, setIsTabModalOpen] = useState(false);
  const [selectedTabData, setSelectedTabData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState(null);

  const filteredData = workoutVideos.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.videoUrl.toLowerCase().includes(query) ||
      item.workoutTab.toLowerCase().includes(query) ||
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query)
    );
  });

  const tabColumns = [
    {
      key: 'id',
      label: '#',
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
      key: 'iconName',
      label: 'ICON NAME',
      sortable: true,
      width: '150px',
      render: (value) => (
        <div className="workout-table-icon" title={value}>
          {value || '●'}
        </div>
      )
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
        <div className="workout-table-url" title={value}>
          {value.length > 40 ? `${value.substring(0, 40)}...` : value}
        </div>
      )
    },
    {
      key: 'workoutTab',
      label: 'WORKOUT TAB',
      sortable: true,
      width: '120px'
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
      key: 'active',
      label: 'ACTIVE',
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

  const handleSaveTab = (formData) => {
    const tabObject = {
      tabName: formData.tabName,
      iconName: formData.iconName
    };
    
    if (selectedTabData) {
      const selectedTabName = typeof selectedTabData === 'string' ? selectedTabData : selectedTabData.tabName;
      setWorkoutTabs(prev => 
        prev.map(tab => {
          const tabName = typeof tab === 'string' ? tab : tab.tabName;
          return tabName === selectedTabName ? tabObject : tab;
        })
      );
    } else {
      setWorkoutTabs(prev => [tabObject, ...prev]);
    }
    setIsTabModalOpen(false);
    setSelectedTabData(null);
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

  const handleSaveVideo = (formData) => {
    if (selectedVideoData) {
      setWorkoutVideos(prev => 
        prev.map(item => 
          item.id === selectedVideoData.id 
            ? { ...item, ...formData, active: true }
            : item
        )
      );
    } else {
      const newVideo = {
        id: workoutVideos.length + 1,
        ...formData,
        active: true
      };
      setWorkoutVideos(prev => [...prev, newVideo]);
    }
    setIsModalOpen(false);
    setSelectedVideoData(null);
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

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      if (deleteType === 'tab') {
        const tabName = typeof itemToDelete === 'string' ? itemToDelete : itemToDelete.tabName;
        setWorkoutTabs(prev => prev.filter(tab => {
          const currentTabName = typeof tab === 'string' ? tab : tab.tabName;
          return currentTabName !== tabName;
        }));
      } else {
        setWorkoutVideos(prev => prev.filter(item => item.id !== itemToDelete.id));
      }
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
  const activeVideos = workoutVideos.filter(item => item.active).length;

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
        <div className="workout-table-container">
          <DataTable
            data={workoutTabs.map((tab, index) => ({
              id: index + 1,
              tabName: typeof tab === 'string' ? tab : tab.tabName,
              iconName: typeof tab === 'string' ? '●' : (tab.iconName || '●'),
              ...(typeof tab === 'object' ? tab : {})
            }))}
            columns={tabColumns}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
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
          />
        </div>
      </div>

      <WorkoutVideoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveVideo}
        videoData={selectedVideoData}
        tabs={workoutTabs}
      />

      <WorkoutTabModal
        isOpen={isTabModalOpen}
        onClose={handleCloseTabModal}
        onSave={handleSaveTab}
        tabData={selectedTabData}
        existingTabs={workoutTabs}
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
