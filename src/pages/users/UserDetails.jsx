import React, { useState } from 'react';
import { Search, Filter, SquarePen, Trash2, Plus } from 'lucide-react';
import DataTable from '../../components/ui/DataTable';
import UserModal from '../../components/users/UserModal';
import ConfirmationModal from '../../components/ui/ConfirmationModal';
import UserPreferenceModal from '../../components/users/UserPreferenceModal';
import { userService } from '../../services/userService';
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
  const [isPrefModalOpen, setIsPrefModalOpen] = useState(false);
  const [prefUser, setPrefUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [rows, setRows] = useState([]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await userService.getAll();
      if (response.success) {
        // Map backend fields to frontend fields
        const mappedUsers = response.data.map((user, index) => ({
          ...user,
          id: index + 1, // Add sequential ID for table display
          role: user.userRole || 'user',
          active: user.isActive,
          isVerified: user.isEmailVerified ? 'True' : 'False'
        }));
        setRows(mappedUsers);
      } else {
        setError(response.message || 'Failed to fetch users');
      }
    } catch (err) {
      setError('An error occurred while fetching users');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchUsers();
  }, []);

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

  const handleViewPreference = (user) => {
    setPrefUser(user);
    setIsPrefModalOpen(true);
  };

  /**
   * Handle save user - integrates with AdminUserRequest model
   * For CREATE: Requires firstName, lastName, email, password, phoneNumber
   * For UPDATE: All fields optional (partial updates supported)
   */
  const handleSaveUser = async (formData) => {
    try {
      let response;
      if (selectedUser) {
        // UPDATE operation - AdminUserRequest with optional fields
        // Email is passed as path variable, not in request body
        const updateData = {
          firstName: formData.firstName || undefined,
          lastName: formData.lastName || undefined,
          phoneNumber: formData.phoneNumber || undefined,
          userRole: formData.role || undefined,
          isActive: formData.active !== undefined ? formData.active : undefined,
          isEmailVerified: formData.isVerified === 'True' ? true : formData.isVerified === 'False' ? false : undefined
        };
        // Remove undefined fields for cleaner request
        Object.keys(updateData).forEach(key => updateData[key] === undefined && delete updateData[key]);
        
        response = await userService.update(selectedUser.email, updateData);
      } else {
        // CREATE operation - AdminUserRequest with required fields
        // Auto-verified by admin (isEmailVerified = true by default)
        const createData = {
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password || 'Temporary@123', // Default password if not provided
          phoneNumber: formData.phoneNumber,
          userRole: formData.role || 'user',
          isEmailVerified: formData.isVerified === 'True' || true, // Auto-verified by admin
          isActive: formData.active !== undefined ? formData.active : true
        };
        response = await userService.create(createData);
      }

      if (response.success) {
        fetchUsers();
        setIsUserModalOpen(false);
        setSelectedUser(null);
      } else {
        alert(response.message || 'Failed to save user');
      }
    } catch (err) {
      console.error('Error saving user:', err);
      const errorMessage = err.response?.data?.message || err.message || 'An error occurred while saving the user';
      alert(errorMessage);
    }
  };

  const handleConfirmDelete = async () => {
    if (userToDelete) {
      try {
        const response = await userService.delete(userToDelete.email);
        if (response.success) {
          fetchUsers();
          setIsDeleteModalOpen(false);
          setUserToDelete(null);
        } else {
          alert(response.message || 'Failed to delete user');
        }
      } catch (err) {
        console.error('Error deleting user:', err);
        alert('An error occurred while deleting the user');
      }
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
          <span>{value ? value.split('T')[0] : 'Never'}</span>
          <span>{value ? value.split('T')[1]?.split('.')[0] : ''}</span>
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
          <button className="view-user-preference-btn" onClick={() => handleViewPreference(row)}>
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

      <UserPreferenceModal
        isOpen={isPrefModalOpen}
        onClose={() => setIsPrefModalOpen(false)}
        userEmail={prefUser?.email}
        userName={`${prefUser?.firstName} ${prefUser?.lastName}`}
      />
    </div>
  );
};

export default UserDetails;

