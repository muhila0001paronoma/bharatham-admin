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

    // Create new user (using register endpoint)
    create: async (userData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userData.email,
                    firstName: userData.firstName,
                    lastName: userData.lastName,
                    password: userData.password || 'Temporary@123', // Default password if not provided
                    phoneNumber: userData.phoneNumber
                }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    // Update user (Assuming endpoint will be added or exists)
    update: async (email, userData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/users/${email}`, {
                method: 'PUT',
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error updating user ${email}:`, error);
            throw error;
        }
    },

    // Delete user (Assuming endpoint will be added or exists)
    delete: async (email) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/users/${email}`, {
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
