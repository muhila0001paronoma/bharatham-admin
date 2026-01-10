import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const enquiryService = {
    // Get all enquiries
    getAll: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/course-user-enquire`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching enquiries:', error);
            throw error;
        }
    },

    // Get enquiry by ID
    getById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/course-user-enquire/${id}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching enquiry ${id}:`, error);
            throw error;
        }
    },

    // Create new enquiry
    create: async (enquiryData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/course-user-enquire`, {
                method: 'POST',
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courseId: enquiryData.courseId,
                    userEmail: enquiryData.userEmail,
                    subject: enquiryData.subject,
                    enquiredAt: enquiryData.enquiredAt || new Date().toISOString(),
                    isActive: enquiryData.isActive !== undefined ? enquiryData.isActive : true
                }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating enquiry:', error);
            throw error;
        }
    },

    // Update enquiry
    update: async (id, enquiryData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/course-user-enquire/${id}`, {
                method: 'PUT',
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    courseId: enquiryData.courseId,
                    userEmail: enquiryData.userEmail,
                    subject: enquiryData.subject,
                    enquiredAt: enquiryData.enquiredAt,
                    isActive: enquiryData.isActive !== undefined ? enquiryData.isActive : true
                }),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error updating enquiry ${id}:`, error);
            throw error;
        }
    },

    // Delete enquiry
    delete: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/course-user-enquire/${id}`, {
                method: 'DELETE',
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error deleting enquiry ${id}:`, error);
            throw error;
        }
    }
};
