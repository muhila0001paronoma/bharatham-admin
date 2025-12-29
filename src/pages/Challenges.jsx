import React, { useState } from 'react';
import { Search, Filter, Plus, Trophy, FileText, TrendingUp, Users, Trash2 } from 'lucide-react';
import DataTable from '../components/ui/DataTable';
import ChallengeModal from '../components/challenge/ChallengeModal';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import { challengesData } from '../data/data';
import './Challenges.css';

export default function Challenges() {
  const [searchQuery, setSearchQuery] = useState('');
  const [challenges, setChallenges] = useState(challengesData.challenges);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChallengeData, setSelectedChallengeData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const filteredData = challenges.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.challengeName.toLowerCase().includes(query) ||
      item.shortDescription.toLowerCase().includes(query) ||
      item.explanation.toLowerCase().includes(query)
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
      key: 'challengeName',
      label: 'NAME',
      sortable: true,
      width: '200px'
    },
    {
      key: 'shortDescription',
      label: 'SHORT DESCRIPTION',
      sortable: true,
      width: '200px'
    },
    {
      key: 'explanation',
      label: 'EXPLANATION',
      sortable: false,
      width: '300px',
      render: (value) => (
        <div className="challenge-table-explanation" title={value}>
          {value.length > 100 ? `${value.substring(0, 100)}...` : value}
        </div>
      )
    },
    {
      key: 'startDate',
      label: 'START DATE',
      sortable: true,
      width: '180px'
    },
    {
      key: 'endDate',
      label: 'END DATE',
      sortable: true,
      width: '180px'
    },
    {
      key: 'duration',
      label: 'DURATION',
      sortable: true,
      width: '120px'
    },
    {
      key: 'totalPoints',
      label: 'POINTS',
      sortable: true,
      width: '100px'
    },
    {
      key: 'active',
      label: 'ACTIVE',
      sortable: true,
      width: '100px',
      render: (value) => (
        <span className={`challenge-status ${value ? 'challenge-status-active' : 'challenge-status-inactive'}`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    }
  ];

  const handleAddChallenge = () => {
    setSelectedChallengeData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setSelectedChallengeData(row);
    setIsModalOpen(true);
  };

  const handleSaveChallenge = (formData) => {
    if (selectedChallengeData) {
      setChallenges(prev => 
        prev.map(item => 
          item.id === selectedChallengeData.id 
            ? { ...item, ...formData }
            : item
        )
      );
    } else {
      const newChallenge = {
        id: challenges.length + 1,
        ...formData
      };
      setChallenges(prev => [...prev, newChallenge]);
    }
    setIsModalOpen(false);
    setSelectedChallengeData(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedChallengeData(null);
  };

  const handleDelete = (row) => {
    setItemToDelete(row);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      setChallenges(prev => prev.filter(item => item.id !== itemToDelete.id));
      setItemToDelete(null);
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleFilter = () => {
    console.log('Filter');
  };

  const totalChallenges = challenges.length;
  const activeChallenges = challenges.filter(item => item.active).length;

  return (
    <div className="challenge-page">
      <div className="challenge-page-header">
        <div className="challenge-page-header-content">
          <div className="challenge-page-header-left">
            <div className="challenge-page-header-icon">
              <Trophy size={28} />
            </div>
            <div>
              <h1 className="challenge-page-header-title">Challenges</h1>
              <p className="challenge-page-header-subtitle">Challenge Details</p>
            </div>
          </div>
          <div className="challenge-page-header-stats">
            <div className="challenge-page-stat-card">
              <div className="challenge-page-stat-icon challenge-page-stat-icon-primary">
                <FileText size={20} />
              </div>
              <div className="challenge-page-stat-content">
                <div className="challenge-page-stat-value">{totalChallenges}</div>
                <div className="challenge-page-stat-label">Total Challenges</div>
              </div>
            </div>
            <div className="challenge-page-stat-card">
              <div className="challenge-page-stat-icon challenge-page-stat-icon-info">
                <Users size={20} />
              </div>
              <div className="challenge-page-stat-content">
                <div className="challenge-page-stat-value">{activeChallenges}</div>
                <div className="challenge-page-stat-label">Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="challenge-section">
        <div className="challenge-section-header">
          <h2 className="challenge-section-title">Challenge Details</h2>
          <button
            onClick={handleAddChallenge}
            className="challenge-button challenge-button-primary"
          >
            <Plus className="challenge-button-icon" />
            Add New Challenge
          </button>
        </div>
        <div className="challenge-details-toolbar">
          <div className="challenge-search-filter">
            <button
              onClick={handleFilter}
              className="challenge-filter-button"
              title="Filter"
            >
              <Filter className="challenge-filter-icon" />
            </button>
            <div className="challenge-search-input-wrapper">
              <Search className="challenge-search-icon" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="challenge-search-input"
              />
            </div>
          </div>
        </div>
        <div className="challenge-table-container">
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

      <ChallengeModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveChallenge}
        challengeData={selectedChallengeData}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete Challenge"
        message={`Are you sure you want to delete "${itemToDelete?.challengeName || 'this challenge'}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        icon={Trash2}
      />
    </div>
  );
}
