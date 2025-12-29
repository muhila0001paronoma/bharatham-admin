import React, { useState } from 'react';
import { Search, Filter, Plus, Calendar, FileText, TrendingUp, Users, Trash2 } from 'lucide-react';
import DataTable from '../components/ui/DataTable';
import OnlineEventModal from '../components/onlineevent/OnlineEventModal';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import { onlineEventsData } from '../data/data';
import './OnlineEvents.css';

export default function OnlineEvents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState(onlineEventsData.events);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventData, setSelectedEventData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const filteredData = events.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.eventName.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.mode.toLowerCase().includes(query)
    );
  });

  const formatAmount = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const columns = [
    {
      key: 'id',
      label: '#',
      sortable: true,
      width: '60px',
      render: (value, row, index) => index + 1
    },
    {
      key: 'imgUrl',
      label: 'IMAGE',
      sortable: false,
      width: '120px',
      render: (value, row) => (
        <div className="event-table-image-container">
          {row.imgUrl ? (
            <img
              src={row.imgUrl}
              alt={row.eventName}
              className="event-table-image"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/80x60?text=Image';
              }}
            />
          ) : (
            <div className="event-table-image-placeholder">No Image</div>
          )}
        </div>
      )
    },
    {
      key: 'eventName',
      label: 'NAME',
      sortable: true,
      width: '200px'
    },
    {
      key: 'eventDateTime',
      label: 'DATE TIME',
      sortable: true,
      width: '180px'
    },
    {
      key: 'description',
      label: 'DESCRIPTION',
      sortable: false,
      width: '250px',
      render: (value) => (
        <div className="event-table-description" title={value}>
          {value.length > 50 ? `${value.substring(0, 50)}...` : value}
        </div>
      )
    },
    {
      key: 'mode',
      label: 'MODE',
      sortable: true,
      width: '100px'
    },
    {
      key: 'totalAmount',
      label: 'TOTAL AMOUNT',
      sortable: true,
      width: '150px',
      render: (value) => formatAmount(value)
    },
    {
      key: 'active',
      label: 'ACTIVE',
      sortable: true,
      width: '100px',
      render: (value) => (
        <span className={`event-status ${value ? 'event-status-active' : 'event-status-inactive'}`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    }
  ];

  const handleAddEvent = () => {
    setSelectedEventData(null);
    setIsModalOpen(true);
  };

  const handleEdit = (row) => {
    setSelectedEventData(row);
    setIsModalOpen(true);
  };

  const handleSaveEvent = (formData) => {
    if (selectedEventData) {
      setEvents(prev => 
        prev.map(item => 
          item.id === selectedEventData.id 
            ? { ...item, ...formData }
            : item
        )
      );
    } else {
      const newEvent = {
        id: events.length + 1,
        ...formData
      };
      setEvents(prev => [...prev, newEvent]);
    }
    setIsModalOpen(false);
    setSelectedEventData(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEventData(null);
  };

  const handleDelete = (row) => {
    setItemToDelete(row);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      setEvents(prev => prev.filter(item => item.id !== itemToDelete.id));
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

  const totalEvents = events.length;
  const activeEvents = events.filter(item => item.active).length;

  return (
    <div className="event-page">
      <div className="event-page-header">
        <div className="event-page-header-content">
          <div className="event-page-header-left">
            <div className="event-page-header-icon">
              <Calendar size={28} />
            </div>
            <div>
              <h1 className="event-page-header-title">Online Events</h1>
              <p className="event-page-header-subtitle">Event Details</p>
            </div>
          </div>
          <div className="event-page-header-stats">
            <div className="event-page-stat-card">
              <div className="event-page-stat-icon event-page-stat-icon-primary">
                <FileText size={20} />
              </div>
              <div className="event-page-stat-content">
                <div className="event-page-stat-value">{totalEvents}</div>
                <div className="event-page-stat-label">Total Events</div>
              </div>
            </div>
            <div className="event-page-stat-card">
              <div className="event-page-stat-icon event-page-stat-icon-info">
                <Users size={20} />
              </div>
              <div className="event-page-stat-content">
                <div className="event-page-stat-value">{activeEvents}</div>
                <div className="event-page-stat-label">Active</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="event-section">
        <div className="event-section-header">
          <h2 className="event-section-title">Event Details</h2>
          <button
            onClick={handleAddEvent}
            className="event-button event-button-primary"
          >
            <Plus className="event-button-icon" />
            Add New Event
          </button>
        </div>
        <div className="event-details-toolbar">
          <div className="event-search-filter">
            <button
              onClick={handleFilter}
              className="event-filter-button"
              title="Filter"
            >
              <Filter className="event-filter-icon" />
            </button>
            <div className="event-search-input-wrapper">
              <Search className="event-search-icon" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="event-search-input"
              />
            </div>
          </div>
        </div>
        <div className="event-table-container">
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

      <OnlineEventModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveEvent}
        eventData={selectedEventData}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete Event"
        message={`Are you sure you want to delete "${itemToDelete?.eventName || 'this event'}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        icon={Trash2}
      />
    </div>
  );
}
