import React, { useState } from 'react';
import { Search, Filter, CreditCard, DollarSign, TrendingUp } from 'lucide-react';
import DataTable from '../../components/ui/DataTable';
import './UserPayments.css';

const UserPayments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(10);

  const [rows, setRows] = useState([
    {
      id: 1,
      courseTitle: 'Beginner Bharatanatyam Basics',
      userEmail: 'bavi003@gmail.com',
      amount: '10,000',
      status: 'PAID',
      type: 'Advance',
      paidAt: '2026-03-16 00:00:00',
      active: true
    },
    {
      id: 2,
      courseTitle: 'Beginner Bharatanatyam Basics',
      userEmail: 'bavi003@gmail.com',
      amount: '10,000',
      status: 'PAID',
      type: 'Advance',
      paidAt: '2026-03-16 00:00:00',
      active: true
    },
    {
      id: 3,
      courseTitle: 'Beginner Bharatanatyam Basics',
      userEmail: 'bavi003@gmail.com',
      amount: '10,000',
      status: 'PAID',
      type: 'Advance',
      paidAt: '2026-03-16 00:00:00',
      active: true
    },
    {
      id: 4,
      courseTitle: 'Beginner Bharatanatyam Basics',
      userEmail: 'bavi003@gmail.com',
      amount: '10,000',
      status: 'PAID',
      type: 'Advance',
      paidAt: '2026-03-16 00:00:00',
      active: true
    },
    {
      id: 5,
      courseTitle: 'Beginner Bharatanatyam Basics',
      userEmail: 'bavi003@gmail.com',
      amount: '10,000',
      status: 'PAID',
      type: 'Advance',
      paidAt: '2026-03-16 00:00:00',
      active: true
    }
  ]);



  const filteredData = rows.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.courseTitle.toLowerCase().includes(query) ||
      item.userEmail.toLowerCase().includes(query) ||
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
      render: (value) => <div className="payment-title-cell">{value}</div>
    },
    {
      key: 'userEmail',
      label: 'USER EMAIL',
      sortable: true,
    },
    {
      key: 'amount',
      label: 'AMOUNT',
      sortable: true,
      render: (value) => `₹${value}`
    },
    {
      key: 'status',
      label: 'STATUS',
      sortable: true,
      render: (value) => (
        <span className={`theory-status ${value.toLowerCase() === 'paid' ? 'theory-status-active' : 'theory-status-inactive'}`}>
          {value}
        </span>
      )
    },
    {
      key: 'type',
      label: 'TYPE',
      sortable: true,
    },
    {
      key: 'paidAt',
      label: 'PAID AT',
      sortable: true,
    },
    {
      key: 'active',
      label: 'ACTIVE',
      sortable: true,
      render: (value) => (
        <span className={`theory-status ${value ? 'theory-status-active' : 'theory-status-inactive'}`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    },
  ];

  const totalPaymentsCount = rows.length;
  const totalAmount = rows.reduce((acc, curr) => acc + parseFloat(curr.amount.replace(',', '')), 0);

  return (
    <div className="payments-page">
      <div className="theory-page-header">
        <div className="theory-page-header-content">
          <div className="theory-page-header-left">
            <div className="theory-page-header-icon">
              <CreditCard size={28} />
            </div>
            <div>
              <h1 className="theory-page-header-title">Payment Management</h1>
              <p className="theory-page-header-subtitle">Monitor and manage course fee transactions</p>
            </div>
          </div>
          <div className="theory-page-header-stats">
            <div className="theory-page-stat-card">
              <div className="theory-page-stat-icon theory-page-stat-icon-primary">
                <DollarSign size={20} />
              </div>
              <div className="theory-page-stat-content">
                <div className="theory-page-stat-value">₹{totalAmount.toLocaleString()}</div>
                <div className="theory-page-stat-label">Total Revenue</div>
              </div>
            </div>
            <div className="theory-page-stat-card">
              <div className="theory-page-stat-icon theory-page-stat-icon-success">
                <TrendingUp size={20} />
              </div>
              <div className="theory-page-stat-content">
                <div className="theory-page-stat-value">{totalPaymentsCount}</div>
                <div className="theory-page-stat-label">Transactions</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="theory-section">
        <div className="theory-section-header">
          <h2 className="theory-section-title">User Payments</h2>
        </div>

        <div className="theory-details-toolbar">
          <div className="theory-search-filter">
            <button className="theory-filter-button" title="Filter">
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
            selectable={true}
            pageSize={pageSize}
            onPageSizeChange={setPageSize}
          />
        </div>
      </div>


    </div>
  );
};

export default UserPayments;
