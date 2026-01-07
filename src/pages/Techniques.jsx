import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Edit2, Lightbulb, FileText, TrendingUp, Users, Trash2 } from 'lucide-react';
import DataTable from '../components/ui/DataTable';
import TechniqueModal from '../components/technique/TechniqueModal';
import TechniqueTopicModal from '../components/technique/TechniqueTopicModal';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import { techniqueService } from '../services/techniqueService';
import './Techniques.css';

export default function Techniques() {
  const [selectedTopic, setSelectedTopic] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [techniqueTopics, setTechniqueTopics] = useState([]);
  const [techniqueDetails, setTechniqueDetails] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTechniqueData, setSelectedTechniqueData] = useState(null);
  const [isTopicModalOpen, setIsTopicModalOpen] = useState(false);
  const [selectedTopicData, setSelectedTopicData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Maps for ID <-> Name conversion
  const [topicsMap, setTopicsMap] = useState({}); // id -> name
  const [topicsReverseMap, setTopicsReverseMap] = useState({}); // name -> id

  const loadData = async () => {
    try {
      // Load Topics
      const topicsResponse = await techniqueService.getAllTopics();
      const topics = topicsResponse.data || [];
      const tMap = {};
      const tRevMap = {};
      const topicNames = [];
      topics.forEach(t => {
        tMap[t.id] = t.topicName;
        tRevMap[t.topicName] = t.id;
        topicNames.push(t.topicName);
      });
      setTopicsMap(tMap);
      setTopicsReverseMap(tRevMap);
      setTechniqueTopics(topicNames);

      if (topicNames.length > 0 && (!selectedTopic || !topicNames.includes(selectedTopic))) {
        setSelectedTopic(topicNames[0]);
      }

      // Load Details
      const detailsResponse = await techniqueService.getAllDetails();
      const details = detailsResponse.data || [];
      const mappedDetails = details.map(d => ({
        id: d.id,
        name: d.name,
        topic: tMap[d.topicId] || d.topicId,
        topicId: d.topicId,
        description: d.description,
        level: d.level ? d.level.charAt(0).toUpperCase() + d.level.slice(1).toLowerCase() : '',
        keyPoints: d.keyPoints,
        active: d.isActive,
        imgUrl1: d.imgUrl1,
        imgUrl2: d.imgUrl2,
        imgUrl3: d.imgUrl3
      }));
      setTechniqueDetails(mappedDetails);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredData = techniqueDetails.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      (item.topic && item.topic.toLowerCase().includes(query)) ||
      (item.description && item.description.toLowerCase().includes(query)) ||
      (item.keyPoints && item.keyPoints.toLowerCase().includes(query)) ||
      (item.level && item.level.toLowerCase().includes(query))
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
        <div className="technique-table-images">
          {row.imgUrl1 && (
            <img
              src={row.imgUrl1}
              alt="Technique"
              className="technique-table-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/40x40?text=Image';
              }}
            />
          )}
          {row.imgUrl2 && (
            <img
              src={row.imgUrl2}
              alt="Technique"
              className="technique-table-image"
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
      key: 'name',
      label: 'NAME',
      sortable: true,
      width: '150px'
    },
    {
      key: 'description',
      label: 'DESCRIPTION',
      sortable: true,
      width: '200px'
    },
    {
      key: 'level',
      label: 'LEVEL',
      sortable: true,
      width: '100px'
    },
    {
      key: 'keyPoints',
      label: 'KEY POINTS',
      sortable: false,
      width: '300px',
      render: (value) => (
        <div className="technique-table-keypoints" title={value}>
          {value && value.length > 100 ? `${value.substring(0, 100)}...` : value}
        </div>
      )
    },
    {
      key: 'active',
      label: 'ACTIVE',
      sortable: true,
      width: '100px',
      render: (value) => (
        <span className={`technique-status ${value ? 'technique-status-active' : 'technique-status-inactive'}`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    }
  ];

  const handleCreateTopic = () => {
    setSelectedTopicData(null);
    setIsTopicModalOpen(true);
  };

  const handleEditTopic = (topicName) => {
    setSelectedTopicData(topicName);
    setIsTopicModalOpen(true);
  };

  const handleSaveTopic = async (formData) => {
    try {
      if (selectedTopicData) {
        // Update
        const id = topicsReverseMap[selectedTopicData];
        if (id) {
          await techniqueService.updateTopic(id, { topicName: formData.topicName });
        }
      } else {
        // Create
        await techniqueService.createTopic({ topicName: formData.topicName });
      }
      loadData();
      setIsTopicModalOpen(false);
      setSelectedTopicData(null);
    } catch (error) {
      console.error("Error saving topic:", error);
      alert("Failed to save topic");
    }
  };

  const handleCloseTopicModal = () => {
    setIsTopicModalOpen(false);
    setSelectedTopicData(null);
  };

  const handleAddTechniqueDetail = () => {
    setSelectedTechniqueData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setSelectedTechniqueData(row);
    setIsModalOpen(true);
  };

  const handleSaveTechnique = async (formData) => {
    try {
      const topicId = topicsReverseMap[formData.topic];
      if (!topicId) {
        alert("Invalid Topic selected");
        return;
      }
      const payload = {
        ...formData,
        topicId: topicId
      };

      if (selectedTechniqueData) {
        await techniqueService.updateDetail(selectedTechniqueData.id, payload);
      } else {
        await techniqueService.createDetail(payload);
      }
      loadData();
      setIsModalOpen(false);
      setSelectedTechniqueData(null);
    } catch (error) {
      console.error("Error saving detail:", error);
      alert("Failed to save technique detail");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTechniqueData(null);
  };

  const handleDelete = (row) => {
    setItemToDelete(row);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      try {
        await techniqueService.deleteDetail(itemToDelete.id);
        loadData();
        setItemToDelete(null);
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error("Error deleting detail:", error);
        alert("Failed to delete");
      }
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleFilter = () => {
    console.log('Filter');
  };

  const totalTopics = techniqueTopics.length;
  const totalDetails = techniqueDetails.length;
  const activeDetails = techniqueDetails.filter(item => item.active).length;

  return (
    <div className="technique-page">
      <div className="technique-page-header">
        <div className="technique-page-header-content">
          <div className="technique-page-header-left">
            <div className="technique-page-header-icon">
              <Lightbulb size={28} />
            </div>
            <div>
              <h1 className="technique-page-header-title">Techniques Management</h1>
              <p className="technique-page-header-subtitle">Manage technique topics and details for the Bharatham app</p>
            </div>
          </div>
          <div className="technique-page-header-stats">
            <div className="technique-page-stat-card">
              <div className="technique-page-stat-icon technique-page-stat-icon-primary">
                <FileText size={20} />
              </div>
              <div className="technique-page-stat-content">
                <div className="technique-page-stat-value">{totalTopics}</div>
                <div className="technique-page-stat-label">Topics</div>
              </div>
            </div>
            <div className="technique-page-stat-card">
              <div className="technique-page-stat-icon technique-page-stat-icon-success">
                <TrendingUp size={20} />
              </div>
              <div className="technique-page-stat-content">
                <div className="technique-page-stat-value">{totalDetails}</div>
                <div className="technique-page-stat-label">Total Details</div>
              </div>
            </div>
            <div className="technique-page-stat-card">
              <div className="technique-page-stat-icon technique-page-stat-icon-info">
                <Users size={20} />
              </div>
              <div className="technique-page-stat-content">
                <div className="technique-page-stat-value">{activeDetails}</div>
                <div className="technique-page-stat-label">Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="technique-section">
        <div className="technique-section-header">
          <h2 className="technique-section-title">Technique Topics</h2>
          <button
            onClick={handleCreateTopic}
            className="technique-button technique-button-primary"
          >
            <Plus className="technique-button-icon" />
            Create New Topic
          </button>
        </div>
        <div className="technique-topics-container">
          {techniqueTopics.map((topic) => (
            <div
              key={topic}
              className={`technique-topic-tag ${selectedTopic === topic ? 'technique-topic-tag-active' : ''}`}
              onClick={() => {
                setSelectedTopic(topic);
              }}
            >
              <span>{topic}</span>
              <Edit2
                className="technique-topic-edit-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditTopic(topic);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="technique-section">
        <div className="technique-section-header">
          <h2 className="technique-section-title">Technique Details</h2>
          <button
            onClick={handleAddTechniqueDetail}
            className="technique-button technique-button-primary"
          >
            <Plus className="technique-button-icon" />
            Add Technique Detail
          </button>
        </div>
        <div className="technique-details-toolbar">
          <div className="technique-search-filter">
            <button
              onClick={handleFilter}
              className="technique-filter-button"
              title="Filter"
            >
              <Filter className="technique-filter-icon" />
            </button>
            <div className="technique-search-input-wrapper">
              <Search className="technique-search-icon" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="technique-search-input"
              />
            </div>
          </div>
        </div>
        <div className="technique-table-container">
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

      <TechniqueModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTechnique}
        techniqueData={selectedTechniqueData}
        topics={techniqueTopics}
      />

      <TechniqueTopicModal
        isOpen={isTopicModalOpen}
        onClose={handleCloseTopicModal}
        onSave={handleSaveTopic}
        topicData={selectedTopicData}
        existingTopics={techniqueTopics}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete Technique Detail"
        message={`Are you sure you want to delete "${itemToDelete?.name || 'this technique detail'}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        icon={Trash2}
      />
    </div>
  );
}
