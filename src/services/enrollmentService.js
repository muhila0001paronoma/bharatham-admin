import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const enrollmentService = {
    // Get all enrollments
    getAll: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/course-user-enroll`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching enrollments:', error);
            throw error;
        }
    },

    // Get enrollment by ID
    getById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/course-user-enroll/${id}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching enrollment ${id}:`, error);
            throw error;
        }
    },

    // Create new enrollment
    create: async (enrollmentData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/course-user-enroll`, {
                method: 'POST',
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courseId: enrollmentData.courseId,
                    userEmail: enrollmentData.userEmail,
                    enrolledAt: enrollmentData.enrolledAt || new Date().toISOString(),
                    isActive: enrollmentData.isActive !== undefined ? enrollmentData.isActive : true
                }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating enrollment:', error);
            throw error;
        }
    },

    // Update enrollment
    update: async (id, enrollmentData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/course-user-enroll/${id}`, {
                method: 'PUT',
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courseId: enrollmentData.courseId,
                    userEmail: enrollmentData.userEmail,
                    enrolledAt: enrollmentData.enrolledAt,
                    isActive: enrollmentData.isActive !== undefined ? enrollmentData.isActive : true
                }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error updating enrollment ${id}:`, error);
            throw error;
        }
    },

    // Delete enrollment
    delete: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/course-user-enroll/${id}`, {
                method: 'DELETE',
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error deleting enrollment ${id}:`, error);
            throw error;
        }
    }
};
