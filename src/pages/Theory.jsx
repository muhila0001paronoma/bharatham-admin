import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config';
import { Search, Filter, Plus, Edit2, BookOpen, FileText, TrendingUp, Users, Trash2 } from 'lucide-react';
import DataTable from '../components/ui/DataTable';
import TheoryModal from '../components/theory/TheoryModal';
import TopicModal from '../components/theory/TopicModal';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import { theoryData } from '../data/data';
import './Theory.css';

export default function Theory() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [theoryTopics, setTheoryTopics] = useState([]);
  const [theoryDetails, setTheoryDetails] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTheoryData, setSelectedTheoryData] = useState(null);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [selectedTopicData, setSelectedTopicData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isTopicDeleteModalOpen, setIsTopicDeleteModalOpen] = useState(false);
  const [topicToDelete, setTopicToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch theory topics on mount
  useEffect(() => {
    fetchTopics();
  }, []);

  // Fetch theory details when topics are loaded or on mount
  useEffect(() => {
    fetchAllTheoryDetails();
  }, [theoryTopics]);

  const getAuthHeaders = (isMultipart = false) => {
    const token = localStorage.getItem('token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    if (!isMultipart) {
      headers['Content-Type'] = 'application/json';
    }
    return headers;
  };

  const fetchTopics = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/theory/topics`, {
        headers: getAuthHeaders()
      });
      const result = await response.json();
      if (result.success) {
        setTheoryTopics(result.data);
      }
    } catch (error) {
      console.error('Error fetching topics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllTheoryDetails = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/theory/details`, {
        headers: getAuthHeaders()
      });
      const result = await response.json();
      if (result.success) {
        setTheoryDetails(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching all theory details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTheoryDetailsByTopic = async (topicId) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/theory/topics/${topicId}/details`, {
        headers: getAuthHeaders()
      });
      const result = await response.json();
      if (result.success) {
        setTheoryDetails(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching theory details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredData = theoryDetails.filter(item => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = !searchQuery ||
      (item.subTopicName || '').toLowerCase().includes(query) ||
      (item.description || '').toLowerCase().includes(query) ||
      (item.notes || '').toLowerCase().includes(query);

    const matchesTopic = !selectedTopicId || item.topicId === selectedTopicId;

    return matchesSearch && matchesTopic;
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
      key: 'imageUrl',
      label: 'IMAGE',
      sortable: false,
      width: '120px',
      render: (value, row) => (
        <div className="theory-table-images">
          {value && (
            <img
              src={value}
              alt="Theory"
              className="theory-table-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/40x40?text=Image';
              }}
            />
          )}
        </div>
      )
    },
    {
      key: 'topicId',
      label: 'TOPIC',
      sortable: true,
      width: '150px',
      render: (value) => {
        const topic = theoryTopics.find(t => t.topicId === value);
        return topic ? topic.topicName : 'N/A';
      }
    },
    {
      key: 'subTopicName',
      label: 'SUB TOPIC',
      sortable: true,
      width: '150px'
    },
    {
      key: 'description',
      label: 'DESCRIPTION',
      sortable: true,
      width: '250px'
    },
    {
      key: 'notes',
      label: 'NOTES',
      sortable: false,
      width: '300px',
      render: (value) => (
        <div className="theory-table-notes" title={value}>
          {value && value.length > 100 ? `${value.substring(0, 100)}...` : value}
        </div>
      )
    },
    {
      key: 'isActive',
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

  const handleCreateTopic = () => {
    setSelectedTopicData(null);
    setIsTopicModalOpen(true);
  };

  const handleEditTopic = (topic) => {
    setSelectedTopicData(topic);
    setIsTopicModalOpen(true);
  };

  const handleSaveTopic = async (formData) => {
    setIsLoading(true);
    try {
      const url = selectedTopicData
        ? `${API_BASE_URL}/theory/topics/${selectedTopicData.topicId}`
        : `${API_BASE_URL}/theory/topics`;

      const method = selectedTopicData ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify({
          topicName: formData.topicName
        }),
      });

      const result = await response.json();

      if (result.success) {
        await fetchTopics();
        setIsTopicModalOpen(false);
        setSelectedTopicData(null);
      } else {
        alert(result.message || 'Failed to save topic');
      }
    } catch (error) {
      console.error('Error saving topic:', error);
      alert('An error occurred while saving the topic');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseTopicModal = () => {
    setIsTopicModalOpen(false);
    setSelectedTopicData(null);
  };

  const handleAddTheoryDetail = () => {
    setSelectedTheoryData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setSelectedTheoryData(row);
    setIsModalOpen(true);
  };

  const handleSaveTheory = async (formData) => {
    setIsLoading(true);
    try {
      const isUpdate = !!selectedTheoryData;
      const url = isUpdate
        ? `${import.meta.env.VITE_API_URL}/theory/details/${selectedTheoryData.detailId}`
        : `${import.meta.env.VITE_API_URL}/theory/details`;

      const method = isUpdate ? 'PUT' : 'POST';

      const data = new FormData();
      data.append('topicId', formData.topicId);
      data.append('subTopicName', formData.subTopicName);
      data.append('description', formData.description);
      data.append('notes', formData.notes || '');

      if (formData.file) {
        data.append('image', formData.file);
      }

      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(true),
        body: data,
      });

      const result = await response.json();

      if (result.success) {
        await fetchAllTheoryDetails();
        setIsModalOpen(false);
        setSelectedTheoryData(null);
      } else {
        alert(result.message || 'Failed to save theory detail');
      }
    } catch (error) {
      console.error('Error saving theory detail:', error);
      alert('An error occurred while saving the theory detail');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTheoryData(null);
  };

  const handleDelete = (row) => {
    setItemToDelete(row);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!itemToDelete) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/theory/details/${itemToDelete.detailId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      const result = await response.json();

      if (result.success) {
        await fetchAllTheoryDetails();
      } else {
        alert(result.message || 'Failed to delete theory detail');
      }
    } catch (error) {
      console.error('Error deleting theory detail:', error);
      alert('An error occurred while deleting the theory detail');
    } finally {
      setIsLoading(false);
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
    }
  };

  const handleDeleteTopic = (e, topic) => {
    e.stopPropagation();
    setTopicToDelete(topic);
    setIsTopicDeleteModalOpen(true);
  };

  const handleConfirmDeleteTopic = async () => {
    if (!topicToDelete) return;
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/theory/topics/${topicToDelete.topicId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      const result = await response.json();

      if (result.success) {
        await fetchTopics();
        if (selectedTopicId === topicToDelete.topicId) {
          setSelectedTopic(null);
          setSelectedTopicId(null);
          setTheoryDetails([]);
        }
      } else {
        alert(result.message || 'Failed to delete topic');
      }
    } catch (error) {
      console.error('Error deleting topic:', error);
      alert('An error occurred while deleting the topic');
    } finally {
      setIsLoading(false);
      setIsTopicDeleteModalOpen(false);
      setTopicToDelete(null);
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleCloseTopicDeleteModal = () => {
    setIsTopicDeleteModalOpen(false);
    setTopicToDelete(null);
  };

  const handleFilter = () => {
    console.log('Filter');
  };
  const totalTopics = theoryTopics.length;
  const totalDetails = theoryDetails.length;
  const activeDetails = theoryDetails.filter(item => item.isActive).length;

  return (
    <div className="theory-page">
      <div className="theory-page-header">
        <div className="theory-page-header-content">
          <div className="theory-page-header-left">
            <div className="theory-page-header-icon">
              <BookOpen size={28} />
            </div>
            <div>
              <h1 className="theory-page-header-title">Theory Management</h1>
              <p className="theory-page-header-subtitle">Manage theory topics and details for the Bharatham app</p>
            </div>
          </div>
          <div className="theory-page-header-stats">
            <div className="theory-page-stat-card">
              <div className="theory-page-stat-icon theory-page-stat-icon-primary">
                <FileText size={20} />
              </div>
              <div className="theory-page-stat-content">
                <div className="theory-page-stat-value">{totalTopics}</div>
                <div className="theory-page-stat-label">Topics</div>
              </div>
            </div>
            <div className="theory-page-stat-card">
              <div className="theory-page-stat-icon theory-page-stat-icon-success">
                <TrendingUp size={20} />
              </div>
              <div className="theory-page-stat-content">
                <div className="theory-page-stat-value">{totalDetails}</div>
                <div className="theory-page-stat-label">Total Details</div>
              </div>
            </div>
            <div className="theory-page-stat-card">
              <div className="theory-page-stat-icon theory-page-stat-icon-info">
                <Users size={20} />
              </div>
              <div className="theory-page-stat-content">
                <div className="theory-page-stat-value">{activeDetails}</div>
                <div className="theory-page-stat-label">Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="theory-section">
        <div className="theory-section-header">
          <h2 className="theory-section-title">Theory Topics</h2>
          <button
            onClick={handleCreateTopic}
            className="theory-button theory-button-primary"
          >
            <Plus className="theory-button-icon" />
            Create New Topic
          </button>
        </div>
        <div className="theory-topics-container">
          <div
            className={`theory-topic-tag ${!selectedTopicId ? 'theory-topic-tag-active' : ''}`}
            onClick={() => {
              setSelectedTopic(null);
              setSelectedTopicId(null);
            }}
          >
            <span>All Topics</span>
          </div>
          {theoryTopics.filter(t => t.isActive).map((topic) => (
            <div
              key={topic.topicId}
              className={`theory-topic-tag ${selectedTopicId === topic.topicId ? 'theory-topic-tag-active' : ''}`}
              onClick={() => {
                setSelectedTopic(topic.topicName);
                setSelectedTopicId(topic.topicId);
              }}
            >
              <span>{topic.topicName}</span>
              <div className="theory-topic-tag-actions">
                <Edit2
                  className="theory-topic-edit-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEditTopic(topic);
                  }}
                />
                <Trash2
                  className="theory-topic-delete-icon"
                  onClick={(e) => handleDeleteTopic(e, topic)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="theory-section">
        <div className="theory-section-header">
          <h2 className="theory-section-title">
            All Theory Details
          </h2>
          <button
            onClick={handleAddTheoryDetail}
            className="theory-button theory-button-primary"
          >
            <Plus className="theory-button-icon" />
            Add Theory Detail
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
                placeholder="Search details..."
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
          />
        </div>
      </div>

      <TheoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTheory}
        theoryData={selectedTheoryData}
        topics={theoryTopics}
        isLoading={isLoading}
      />

      <TopicModal
        isOpen={isTopicModalOpen}
        onClose={handleCloseTopicModal}
        onSave={handleSaveTopic}
        topicData={selectedTopicData}
        existingTopics={theoryTopics}
        isLoading={isLoading}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete Theory Detail"
        message={`Are you sure you want to delete "${itemToDelete?.subTopicName || 'this theory detail'}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        icon={Trash2}
      />

      <ConfirmationModal
        isOpen={isTopicDeleteModalOpen}
        onClose={handleCloseTopicDeleteModal}
        onConfirm={handleConfirmDeleteTopic}
        title="Delete Theory Topic"
        message={`Are you sure you want to delete "${topicToDelete?.topicName}"? All theory details associated with this topic will also be affected. This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        icon={Trash2}
      />
    </div>
  );
}

