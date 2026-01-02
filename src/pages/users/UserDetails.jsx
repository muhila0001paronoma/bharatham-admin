import React, { useState } from 'react';
import { Search, Filter, SquarePen, Trash2, Plus } from 'lucide-react';
import DataTable from '../../components/ui/DataTable';
import UserModal from '../../components/users/UserModal';
import ConfirmationModal from '../../components/ui/ConfirmationModal';
import './UserDetails.css';

const UserDetails = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);

  // Modal states
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  const [rows, setRows] = useState([
    {
      id: 1,
      firstName: 'bavi',
      lastName: 'bavi',
      email: 'bavi003@gmail.com',
      phoneNumber: '+94771237894',
      isVerified: 'True',
      lastLoginAt: '2025-12-16 00:00:00',
      role: 'Admin',
      active: true
    },
    {
      id: 2,
      firstName: 'bavi',
      lastName: 'bavi',
      email: 'bavi003@gmail.com',
      phoneNumber: '+94771237894',
      isVerified: 'True',
      lastLoginAt: '2025-12-16 00:00:00',
      role: 'Admin',
      active: true
    },
    {
      id: 3,
      firstName: 'bavi',
      lastName: 'bavi',
      email: 'bavi003@gmail.com',
      phoneNumber: '+94771237894',
      isVerified: 'True',
      lastLoginAt: '2025-12-16 00:00:00',
      role: 'Admin',
      active: true
    },
    {
      id: 4,
      firstName: 'bavi',
      lastName: 'bavi',
      email: 'bavi003@gmail.com',
      phoneNumber: '+94771237894',
      isVerified: 'True',
      lastLoginAt: '2025-12-16 00:00:00',
      role: 'Admin',
      active: true
    },
    {
      id: 5,
      firstName: 'bavi',
      lastName: 'bavi',
      email: 'bavi003@gmail.com',
      phoneNumber: '+94771237894',
      isVerified: 'True',
      lastLoginAt: '2025-12-16 00:00:00',
      role: 'Admin',
      active: true
    }
  ]);

  const filteredData = rows.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.firstName.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query)
    );
  });

  const handleAddUser = () => {
    setSelectedUser(null);
    setIsUserModalOpen(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
  };

  const handleSaveUser = (formData) => {
    if (selectedUser) {
      setRows(prev => prev.map(row =>
        row.id === selectedUser.id ? { ...row, ...formData } : row
      ));
    } else {
      const newUser = {
        id: rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1,
        lastLoginAt: 'Never', // Default for new user
        ...formData
      };
      setRows(prev => [...prev, newUser]);
    }
    setIsUserModalOpen(false);
    setSelectedUser(null);
  };

  const handleConfirmDelete = () => {
    if (userToDelete) {
      setRows(prev => prev.filter(row => row.id !== userToDelete.id));
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    }
  };

  const columns = [
    {
      key: 'id',
      label: '#',
      sortable: true,
      width: '60px',
    },
    {
      key: 'firstName',
      label: 'FIRST NAME',
      sortable: true,
      width: '120px',
      render: (value) => <div className="text-gray-700 text-sm">{value}</div>
    },
    {
      key: 'lastName',
      label: 'LAST NAME',
      sortable: true,
      width: '120px',
      render: (value) => <div className="text-gray-700 text-sm">{value}</div>
    },
    {
      key: 'email',
      label: 'EMAIL',
      sortable: true,
      width: '180px',
      render: (value) => <div className="text-gray-500 text-xs">{value}</div>
    },
    {
      key: 'phoneNumber',
      label: 'PHONE NUMBER',
      sortable: true,
      width: '130px',
      render: (value) => <div className="text-gray-500 text-xs">{value}</div>
    },
    {
      key: 'isVerified',
      label: 'IS VERIFIED',
      sortable: true,
      width: '100px',
      render: (value) => <div className="text-gray-500 text-xs">{value}</div>
    },
    {
      key: 'lastLoginAt',
      label: 'LAST LOGIN AT',
      sortable: true,
      width: '140px',
      render: (value) => (
        <div className="text-gray-500 text-xs flex flex-col items-start justify-center">
          <span>{value.split(' ')[0]}</span>
          <span>{value.split(' ')[1]}</span>
        </div>
      )
    },
    {
      key: 'role',
      label: 'ROLE',
      sortable: true,
      width: '100px',
      render: (value) => <div className="text-gray-500 text-xs">{value}</div>
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
      label: '',
      width: '220px',
      render: (_, row) => (
        <div className="user-details-actions">
          <button className="view-user-preference-btn" onClick={() => console.log('View User Preference', row.id)}>
            View<br />User Preference
          </button>
          <button className="action-btn-edit" onClick={() => handleEditUser(row)}>
            <SquarePen size={20} />
          </button>
          <button className="action-btn-delete" onClick={() => handleDeleteUser(row)}>
            <Trash2 size={20} />
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-normal text-[#1a237e]">User</h1>
      </div>

      <div className="theory-section">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-normal text-[#1a237e] m-0">User Details</h2>
          <button
            className="theory-button theory-button-primary"
            onClick={handleAddUser}
          >
            <Plus className="theory-button-icon" />
            Add New User
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

      <UserModal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        onSave={handleSaveUser}
        userData={selectedUser}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        message={`Are you sure you want to delete user "${userToDelete?.firstName} ${userToDelete?.lastName}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        icon={Trash2}
      />
    </div>
  );
};

export default UserDetails;

