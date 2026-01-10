import React, { useState } from 'react';
import { Search, Filter, CreditCard, DollarSign, TrendingUp } from 'lucide-react';
import DataTable from '../../components/ui/DataTable';
import PaymentModal from '../../components/courses/PaymentModal';
import ConfirmationModal from '../../components/ui/ConfirmationModal';
import { paymentService } from '../../services/paymentService';
import { Trash2, Edit } from 'lucide-react';
import './UserPayments.css';

const UserPayments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(10);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentToDelete, setPaymentToDelete] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [rows, setRows] = useState([]);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await paymentService.getAll();
      if (response.success) {
        // Map backend fields to frontend fields
        const mappedPayments = response.data.map(payment => ({
          ...payment,
          active: payment.isActive
        }));
        setRows(mappedPayments);
      } else {
        setError(response.message || 'Failed to fetch payments');
      }
    } catch (err) {
      setError('An error occurred while fetching payments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPayments();
  }, []);

  const handleEdit = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (payment) => {
    setPaymentToDelete(payment);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (paymentToDelete) {
      try {
        const response = await paymentService.delete(paymentToDelete.id);
        if (response.success) {
          setRows(prev => prev.filter(p => p.id !== paymentToDelete.id));
          setIsDeleteModalOpen(false);
          setPaymentToDelete(null);
        } else {
          alert(response.message || 'Failed to delete payment');
        }
      } catch (err) {
        console.error('Error deleting payment:', err);
        alert('An error occurred while deleting the payment');
      }
    }
  };

  const handleSavePayment = async (formData) => {
    try {
      let response;
      if (selectedPayment) {
        response = await paymentService.update(selectedPayment.id, formData);
      } else {
        response = await paymentService.create(formData);
      }

      if (response.success) {
        fetchPayments();
        setIsModalOpen(false);
        setSelectedPayment(null);
      } else {
        alert(response.message || 'Failed to save payment');
      }
    } catch (err) {
      console.error('Error saving payment:', err);
      alert('An error occurred while saving the payment');
    }
  };



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
      width: '100px',
      render: (value) => (
        <span className={`theory-status ${value ? 'theory-status-active' : 'theory-status-inactive'}`}>
          {value ? 'Active' : 'Inactive'}
        </span>
      )
    },
    {
      key: 'actions',
      label: 'ACTIONS',
      width: '120px',
      render: (_, row) => (
        <div className="payment-action-buttons">
          <button className="payment-edit-btn" onClick={() => handleEdit(row)}>
            <Edit size={18} />
          </button>
          <button className="payment-delete-btn" onClick={() => handleDeleteClick(row)}>
            <Trash2 size={18} />
          </button>
        </div>
      )
    }
  ];

  const totalPaymentsCount = rows.length;
  const totalAmount = rows.reduce((acc, curr) => {
    const amt = curr.amount?.toString().replace(/,/g, '') || '0';
    return acc + parseFloat(amt);
  }, 0);

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

      <PaymentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePayment}
        paymentData={selectedPayment}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Payment Record"
        message={`Are you sure you want to delete this payment record for "${paymentToDelete?.userEmail}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        icon={Trash2}
      />
    </div>
  );
};

export default UserPayments;
