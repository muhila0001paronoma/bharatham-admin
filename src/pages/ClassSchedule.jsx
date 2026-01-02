import React, { useState } from 'react';
import { Search, Filter, SquarePen, Trash2, Plus, Calendar } from 'lucide-react';
import DataTable from '../components/ui/DataTable';
import './ClassSchedule.css'; // We'll assume a CSS file might be needed or we use global styles

const ClassSchedule = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);

  const [rows, setRows] = useState([
    {
      id: 1,
      courseTitle: 'Beginner Bharatanatyam Basics',
      date: '2026-03-16',
      startTime: '18:00:00',
      endTime: '19:30:00',
      status: 'Upcoming',
      active: true
    },
    {
      id: 2,
      courseTitle: 'Beginner Bharatanatyam Basics',
      date: '2026-03-16',
      startTime: '18:00:00',
      endTime: '19:30:00',
      status: 'Upcoming',
      active: true
    },
    {
      id: 3,
      courseTitle: 'Beginner Bharatanatyam Basics',
      date: '2026-03-16',
      startTime: '18:00:00',
      endTime: '19:30:00',
      status: 'Upcoming',
      active: true
    },
    {
      id: 4,
      courseTitle: 'Beginner Bharatanatyam Basics',
      date: '2026-03-16',
      startTime: '18:00:00',
      endTime: '20:30:00',
      status: 'Upcoming',
      active: true
    },
    {
      id: 5,
      courseTitle: 'Beginner Bharatanatyam Basics',
      date: '2026-03-16',
      startTime: '18:00:00',
      endTime: '19:30:00',
      status: 'Upcoming',
      active: true
    }
  ]);

  const filteredData = rows.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.courseTitle.toLowerCase().includes(query) ||
      item.status.toLowerCase().includes(query)
    );
  });

  const columns = [
    {
      key: 'id',
      label: '#',
      sortable: true,
      width: '60px',
    },
    {
      key: 'courseTitle',
      label: 'COURSE TITLE',
      sortable: true,
      width: '250px',
      render: (value) => <div className="font-medium text-gray-900">{value}</div>
    },
    {
      key: 'date',
      label: 'DATE',
      sortable: true,
      width: '120px',
      render: (value) => <div className="text-gray-600">{value}</div>
    },
    {
      key: 'startTime',
      label: 'START TIME',
      sortable: true,
      width: '120px',
      render: (value) => <div className="text-gray-600">{value}</div>
    },
    {
      key: 'endTime',
      label: 'END TIME',
      sortable: true,
      width: '120px',
      render: (value) => <div className="text-gray-600">{value}</div>
    },
    {
      key: 'status',
      label: 'STATUS',
      sortable: true,
      width: '120px',
      render: (value) => (
        <span className="text-gray-600">
          {value}
        </span>
      )
    },
    {
      key: 'active',
      label: 'ACTIVE',
      sortable: true,
      width: '100px',
      render: (value) => (
        <span className={`theory - status ${value ? 'theory-status-active' : 'theory-status-inactive'} `}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      key: 'actions',
      label: '',
      width: '200px',
      render: (_, row) => (
        <div className="class-schedule-actions">
          <button className="view-attendance-btn" onClick={() => console.log('View Attendance', row.id)}>
            View<br />Attendance
          </button>
          <button className="action-btn-edit" onClick={() => console.log('Edit', row.id)}>
            <SquarePen size={20} />
          </button>
          <button className="action-btn-delete" onClick={() => console.log('Delete', row.id)}>
            <Trash2 size={20} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-normal text-[#1a237e]">Class Schedule</h1>
      </div>

      <div className="theory-section">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-normal text-[#1a237e] m-0">Schedule</h2>
          <button className="theory-button theory-button-primary">
            <Plus className="theory-button-icon" />
            Add New Schedule
          </button>
        </div>

        <div className="theory-details-toolbar mb-4">
          <div className="theory-search-filter w-full">
            <button className="theory-filter-button" title="Filter">
              <Filter className="theory-filter-icon" />
            </button>
            <div className="theory-search-input-wrapper flex-1">
              <Search className="theory-search-icon" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="theory-search-input w-full"
              />
            </div>
          </div>
        </div>

        <div className="theory-table-container">
          <DataTable
            columns={columns}
            data={filteredData}
            selectable={true}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
            onRowSelect={setSelectedRows}
          />
        </div>
      </div>
    </div>
  );
};

export default ClassSchedule;

