import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const adminDashboardService = {
    getTopCourses: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/dashboard/top-courses`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching top courses:', error);
            throw error;
        }
    },

    getStatistics: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/admin/dashboard/statistics`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching dashboard statistics:', error);
            throw error;
        }
    }
};
