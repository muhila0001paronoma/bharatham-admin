import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const userService = {
    getAllUsers: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/users`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching users:', error);
            throw error;
        }
    }
};
