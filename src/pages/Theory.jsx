import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Edit2, BookOpen, FileText, TrendingUp, Users, Trash2 } from 'lucide-react';
import DataTable from '../components/ui/DataTable';
import TheoryModal from '../components/theory/TheoryModal';
import TopicModal from '../components/theory/TopicModal';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import { theoryData } from '../data/data';
import './Theory.css';

export default function Theory() {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [theoryTopics, setTheoryTopics] = useState([]);
  const [theoryDetails, setTheoryDetails] = useState(theoryData.details);
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

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchTopics = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/theory/topics`, {
        headers: getAuthHeaders()
      });
      const result = await response.json();
      if (result.success) {
        setTheoryTopics(result.data);
        if (result.data.length > 0 && !selectedTopic) {
          setSelectedTopic(result.data[0].topicName);
        }
      }
    } catch (error) {
      console.error('Error fetching topics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredData = theoryDetails.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.topic.toLowerCase().includes(query) ||
      item.subTopic.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.notes.toLowerCase().includes(query)
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
      key: 'images',
      label: 'IMAGES',
      sortable: false,
      width: '120px',
      render: (value, row) => (
        <div className="theory-table-images">
          {row.imgUrl1 && (
            <img
              src={row.imgUrl1}
              alt="Theory"
              className="theory-table-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/40x40?text=Image';
              }}
            />
          )}
          {row.imgUrl2 && (
            <img
              src={row.imgUrl2}
              alt="Theory"
              className="theory-table-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/40x40?text=Image';
              }}
            />
          )}
          {row.imgUrl3 && (
            <img
              src={row.imgUrl3}
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
      key: 'topic',
      label: 'TOPIC',
      sortable: true,
      width: '120px'
    },
    {
      key: 'subTopic',
      label: 'SUB TOPIC',
      sortable: true,
      width: '120px'
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
        ? `${import.meta.env.VITE_API_URL}/theory/topics/${selectedTopicData.topicId}`
        : `${import.meta.env.VITE_API_URL}/theory/topics`;

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

  const handleSaveTheory = (formData) => {
    if (selectedTheoryData) {
      setTheoryDetails(prev =>
        prev.map(item =>
          item.id === selectedTheoryData.id
            ? { ...item, ...formData }
            : item
        )
      );
    } else {
      const newTheory = {
        id: theoryDetails.length + 1,
        index: theoryDetails.length + 1,
        ...formData
      };
      setTheoryDetails(prev => [...prev, newTheory]);
    }
    setIsModalOpen(false);
    setSelectedTheoryData(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTheoryData(null);
  };

  const handleDelete = (row) => {
    setItemToDelete(row);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      setTheoryDetails(prev => prev.filter(item => item.id !== itemToDelete.id));
      setItemToDelete(null);
    }
    setIsDeleteModalOpen(false);
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
      const response = await fetch(`${import.meta.env.VITE_API_URL}/theory/topics/${topicToDelete.topicId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      const result = await response.json();

      if (result.success) {
        await fetchTopics();
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
  const activeDetails = theoryDetails.filter(item => item.active).length;

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
          {theoryTopics.filter(t => t.isActive).map((topic) => (
            <div
              key={topic.topicId}
              className={`theory-topic-tag ${selectedTopic === topic.topicName ? 'theory-topic-tag-active' : ''}`}
              onClick={() => setSelectedTopic(topic.topicName)}
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
          <h2 className="theory-section-title">Theory Details</h2>
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
        message={`Are you sure you want to delete "${itemToDelete?.subTopic || 'this theory detail'}"? This action cannot be undone.`}
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
