import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const theoryService = {
    // ============ Theory Topics ============

    // Get all theory topics
    getAllTopics: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/theory-topics`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error('Error fetching theory topics:', error);
            return { success: false, message: error.message };
        }
    },

    // Create new theory topic
    createTopic: async (topicData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/theory-topics`, {
                method: 'POST',
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(topicData),
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (error) {
            console.error('Error creating theory topic:', error);
            return { success: false, message: error.message };
        }
    },

    // Update theory topic
    updateTopic: async (id, topicData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/theory-topics/${id}`, {
                method: 'PUT',
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(topicData),
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (error) {
            console.error(`Error updating theory topic ${id}:`, error);
            return { success: false, message: error.message };
        }
    },

    // Delete theory topic
    deleteTopic: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/theory-topics/${id}`, {
                method: 'DELETE',
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (error) {
            console.error(`Error deleting theory topic ${id}:`, error);
            return { success: false, message: error.message };
        }
    },

    // ============ Theory Details ============

    // Get all theory details
    getAllDetails: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/theory-details`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error('Error fetching theory details:', error);
            return { success: false, message: error.message };
        }
    },

    // Get details by topic ID
    getDetailsByTopicId: async (topicId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/theory-details/topic/${topicId}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error(`Error fetching details for topic ${topicId}:`, error);
            return { success: false, message: error.message };
        }
    },

    // Create theory detail (with FormData for image upload)
    createDetail: async (detailData) => {
        try {
            const formData = new FormData();

            // Append all detail data to FormData
            Object.keys(detailData).forEach(key => {
                if (detailData[key] !== null && detailData[key] !== undefined) {
                    if (key === 'imageFile' && detailData[key] instanceof File) {
                        formData.append('imageFile', detailData[key]);
                    } else if (key !== 'imageFile') {
                        formData.append(key, detailData[key]);
                    }
                }
            });

            const response = await fetch(`${API_BASE_URL}/theory-details`, {
                method: 'POST',
                headers: {
                    ...getAuthHeader(),
                    // Don't set Content-Type header, let browser set it with boundary for FormData
                },
                body: formData,
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (error) {
            console.error('Error creating theory detail:', error);
            return { success: false, message: error.message };
        }
    },

    // Update theory detail (with FormData for image upload)
    updateDetail: async (id, detailData) => {
        try {
            const formData = new FormData();

            // Append all detail data to FormData
            Object.keys(detailData).forEach(key => {
                if (detailData[key] !== null && detailData[key] !== undefined) {
                    if (key === 'imageFile' && detailData[key] instanceof File) {
                        formData.append('imageFile', detailData[key]);
                    } else if (key !== 'imageFile') {
                        formData.append(key, detailData[key]);
                    }
                }
            });

            const response = await fetch(`${API_BASE_URL}/theory-details/${id}`, {
                method: 'PUT',
                headers: {
                    ...getAuthHeader(),
                    // Don't set Content-Type header, let browser set it with boundary for FormData
                },
                body: formData,
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (error) {
            console.error(`Error updating theory detail ${id}:`, error);
            return { success: false, message: error.message };
        }
    },

    // Delete theory detail
    deleteDetail: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/theory-details/${id}`, {
                method: 'DELETE',
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (error) {
            console.error(`Error deleting theory detail ${id}:`, error);
            return { success: false, message: error.message };
        }
    },
};
