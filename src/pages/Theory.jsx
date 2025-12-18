import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Edit2, BookOpen, FileText, TrendingUp, Users, Trash2 } from 'lucide-react';
import DataTable from '../components/ui/DataTable';
import TheoryModal from '../components/theory/TheoryModal';
import TopicModal from '../components/theory/TopicModal';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import { theoryData } from '../data/data';
import './Theory.css';

export default function Theory() {
  const [selectedTopic, setSelectedTopic] = useState('Mudras');
  const [searchQuery, setSearchQuery] = useState('');
  const [theoryTopics, setTheoryTopics] = useState(theoryData.topics);
  const [theoryDetails, setTheoryDetails] = useState(theoryData.details);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTheoryData, setSelectedTheoryData] = useState(null);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [selectedTopicData, setSelectedTopicData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // TODO: Replace with API calls when integrating with backend
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const topics = await getTheoryTopics();
  //     const details = await getTheoryDetails();
  //     setTheoryTopics(topics);
  //     setTheoryDetails(details);
  //   };
  //   fetchData();
  // }, []);

  // Filter data based on search query
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

  // Table columns configuration
  const columns = [
    {
      key: 'id',
      label: '#',
      sortable: true,
      width: '60px',
      render: (value, row, index) => index + 1
    },
    {
      key: 'image',
      label: 'IMAGE',
      sortable: false,
      width: '100px',
      render: (value) => (
        <img
          src={value}
          alt="Theory"
          className="theory-table-image"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/60x60?text=Image';
          }}
        />
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

  const handleSaveTopic = (formData) => {
    if (selectedTopicData) {
      // Update existing topic
      setTheoryTopics(prev => 
        prev.map(topic => 
          topic === selectedTopicData 
            ? formData.topicName 
            : topic
        )
      );
    } else {
      // Add new topic at the beginning
      setTheoryTopics(prev => [formData.topicName, ...prev]);
    }
    setIsTopicModalOpen(false);
    setSelectedTopicData(null);
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
      // Update existing theory detail
      setTheoryDetails(prev => 
        prev.map(item => 
          item.id === selectedTheoryData.id 
            ? { ...item, ...formData }
            : item
        )
      );
    } else {
      // Add new theory detail
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
      // Perform delete operation
      setTheoryDetails(prev => prev.filter(item => item.id !== itemToDelete.id));
      setItemToDelete(null);
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleFilter = () => {
    // Handle filter
    console.log('Filter');
  };

  // Calculate stats
  const totalTopics = theoryTopics.length;
  const totalDetails = theoryDetails.length;
  const activeDetails = theoryDetails.filter(item => item.active).length;

  return (
    <div className="theory-page">
      {/* Page Header */}
      <div className="theory-page-header">
        <div className="theory-page-header-content">
          <div className="theory-page-header-left">
            <div className="theory-page-header-icon">
              <BookOpen size={28} />
            </div>
            <div>
              <h1 className="theory-page-header-title">Theory Management</h1>
              <p className="theory-page-header-subtitle">Manage theory topics and details for the Bharatham platform</p>
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

      {/* Theory Topics Section */}
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
          {theoryTopics.map((topic) => (
            <div
              key={topic}
              className={`theory-topic-tag ${selectedTopic === topic ? 'theory-topic-tag-active' : ''}`}
              onClick={() => {
                setSelectedTopic(topic);
                handleEditTopic(topic);
              }}
            >
              <span>{topic}</span>
              <Edit2 
                className="theory-topic-edit-icon" 
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditTopic(topic);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Theory Details Section */}
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

      {/* Theory Modal */}
      <TheoryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTheory}
        theoryData={selectedTheoryData}
        topics={theoryTopics}
      />

      {/* Topic Modal */}
      <TopicModal
        isOpen={isTopicModalOpen}
        onClose={handleCloseTopicModal}
        onSave={handleSaveTopic}
        topicData={selectedTopicData}
        existingTopics={theoryTopics}
      />

      {/* Delete Confirmation Modal */}
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
    </div>
  );
}
