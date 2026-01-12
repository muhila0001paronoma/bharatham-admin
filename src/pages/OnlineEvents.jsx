import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Calendar, FileText, TrendingUp, Users, Trash2, Eye } from 'lucide-react';
import DataTable from '../components/ui/DataTable';
import OnlineEventModal from '../components/onlineevent/OnlineEventModal';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import EventBookingsModal from '../components/onlineevent/EventBookingsModal';
import { onlineEventService } from '../services/onlineEventService';
import './OnlineEvents.css';

export default function OnlineEvents() {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEventData, setSelectedEventData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Bookings State
  const [isBookingsModalOpen, setIsBookingsModalOpen] = useState(false);
  const [currentBookings, setCurrentBookings] = useState([]);
  const [selectedEventForBookings, setSelectedEventForBookings] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await onlineEventService.getAllEvents();
      if (response && response.data) {
        setEvents(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch events", error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleViewBookings = async (event) => {
    setSelectedEventForBookings(event);
    try {
      const response = await onlineEventService.getBookingsByEventId(event.id);
      if (response && response.data) {
        setCurrentBookings(response.data);
      } else {
        setCurrentBookings([]);
      }
      setIsBookingsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
      // alert("Could not fetch bookings"); // Optional error handling
    }
  };

  const handleDeleteBooking = async (booking) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        await onlineEventService.deleteBooking(booking.id);
        // Refresh bookings list
        if (selectedEventForBookings) {
          const response = await onlineEventService.getBookingsByEventId(selectedEventForBookings.id);
          if (response && response.data) {
            setCurrentBookings(response.data);
          } else {
            setCurrentBookings([]);
          }
        }
      } catch (error) {
        console.error("Failed to delete booking", error);
      }
    }
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
      width: '180px',
      render: (value) => value ? new Date(value).toLocaleString() : '-'
    },
    {
      key: 'description',
      label: 'DESCRIPTION',
      sortable: false,
      width: '250px',
      render: (value) => (
        <div className="event-table-description" title={value}>
          {value && value.length > 50 ? `${value.substring(0, 50)}...` : value}
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
    },
    {
      key: 'bookings',
      label: 'BOOKINGS',
      width: '100px',
      align: 'center',
      render: (_, row) => (
        <button
          className="data-table-action-button"
          style={{ color: '#007bff' }}
          onClick={(e) => {
            e.stopPropagation();
            handleViewBookings(row);
          }}
          title="View Bookings"
        >
          <Eye size={18} />
        </button>
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

  const handleSaveEvent = async (formData) => {
    try {
      if (selectedEventData) {
        await onlineEventService.updateEvent(selectedEventData.id, formData);
      } else {
        await onlineEventService.createEvent(formData);
      }
      setIsModalOpen(false);
      setSelectedEventData(null);
      fetchEvents();
    } catch (error) {
      console.error("Failed to save event", error);
      alert("Failed to save event. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEventData(null);
  };

  const handleDelete = (row) => {
    setItemToDelete(row);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      try {
        await onlineEventService.deleteEvent(itemToDelete.id);
        fetchEvents();
        setItemToDelete(null);
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error("Failed to delete event", error);
        alert("Failed to delete event.");
      }
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleFilter = () => {
    console.log('Filter');
    // Future implementation: Open filter modal or toggle filter row
  };

  const totalEvents = events.length;
  const activeEvents = events.filter(item => item.isActive || item.active).length; // Handle both key naming conventions if API differs

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
          {isLoading ? (
            <div style={{ padding: '20px', textAlign: 'center' }}>Loading events...</div>
          ) : (
            <DataTable
              columns={columns}
              data={filteredData}
              onEdit={handleEdit}
              onDelete={handleDelete}
              selectable={true}
              pageSize={pageSize}
              onPageSizeChange={setPageSize}
            />
          )}
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

      <EventBookingsModal
        isOpen={isBookingsModalOpen}
        onClose={() => setIsBookingsModalOpen(false)}
        bookings={currentBookings}
        eventName={selectedEventForBookings?.eventName}
        onDeleteBooking={handleDeleteBooking}
      />
    </div>
  );
}
