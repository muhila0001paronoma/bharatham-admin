import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const userService = {
    // Get all users
    getAll: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/users`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    // Alias for getAll to support existing components
    getAllUsers: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/users`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    },

    // Get user by Email
    getByEmail: async (email) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/users/${email}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching user ${email}:`, error);
            throw error;
        }
    },

    // Create new user by admin (auto-verified, no OTP required)
    // Uses dedicated admin endpoint: /api/v1/admin/users
    create: async (userData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/users`, {
                method: 'POST',
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userData.email,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    password: userData.password || 'Temporary@123', // Default password if not provided
                    phoneNumber: userData.phoneNumber,
                    userRole: userData.role || 'user',
                    isEmailVerified: userData.isVerified === 'True' || userData.isVerified === true || true, // Auto-verified by admin
                    isActive: userData.active !== undefined ? userData.active : true
                }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    // Update user by admin
    // Uses dedicated admin endpoint: /api/v1/admin/users/{email}
    update: async (email, userData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/users/${email}`, {
                method: 'PUT',
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    phoneNumber: userData.phoneNumber,
                    userRole: userData.userRole,
                    isEmailVerified: userData.isEmailVerified,
                    isActive: userData.isActive,
                    password: userData.password // Optional password update
                }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error updating user ${email}:`, error);
            throw error;
        }
    },

    // Delete user by admin
    // Uses dedicated admin endpoint: /api/v1/admin/users/{email}
    delete: async (email) => {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/users/${email}`, {
                method: 'DELETE',
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error deleting user ${email}:`, error);
            throw error;
        }
    }
};
