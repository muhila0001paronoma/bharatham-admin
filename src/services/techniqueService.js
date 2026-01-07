import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const techniqueService = {
    // Topics endpoints
    getAllTopics: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/techniques/topics`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching topics:', error);
            throw error;
        }
    },

    createTopic: async (topicData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/techniques/topics`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader(),
                },
                body: JSON.stringify(topicData),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating topic:', error);
            throw error;
        }
    },

    updateTopic: async (id, topicData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/techniques/topics/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader(),
                },
                body: JSON.stringify(topicData),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating topic:', error);
            throw error;
        }
    },

    deleteTopic: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/techniques/topics/${id}`, {
                method: 'DELETE',
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error deleting topic:', error);
            throw error;
        }
    },

    // Details endpoints
    getAllDetails: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/techniques/details`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching details:', error);
            throw error;
        }
    },

    getDetailsByTopic: async (topicId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/techniques/topics/${topicId}/details`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching details by topic:', error);
            throw error;
        }
    },

    createDetail: async (detailData) => {
        try {
            const formData = new FormData();
            formData.append('name', detailData.name);
            formData.append('topicId', detailData.topicId);
            formData.append('level', detailData.level);
            formData.append('description', detailData.description);
            formData.append('keyPoints', detailData.keyPoints);

            if (detailData.imgUrl1File) formData.append('image1', detailData.imgUrl1File);
            if (detailData.imgUrl2File) formData.append('image2', detailData.imgUrl2File);
            if (detailData.imgUrl3File) formData.append('image3', detailData.imgUrl3File);

            const response = await fetch(`${API_BASE_URL}/techniques/details`, {
                method: 'POST',
                headers: {
                    ...getAuthHeader(),
                },
                body: formData,
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating detail:', error);
            throw error;
        }
    },

    updateDetail: async (id, detailData) => {
        try {
            const formData = new FormData();
            formData.append('name', detailData.name);
            formData.append('topicId', detailData.topicId);
            formData.append('level', detailData.level);
            formData.append('description', detailData.description);
            formData.append('keyPoints', detailData.keyPoints);

            if (detailData.imgUrl1File) formData.append('image1', detailData.imgUrl1File);
            if (detailData.imgUrl2File) formData.append('image2', detailData.imgUrl2File);
            if (detailData.imgUrl3File) formData.append('image3', detailData.imgUrl3File);

            const response = await fetch(`${API_BASE_URL}/techniques/details/${id}`, {
                method: 'PUT',
                headers: {
                    ...getAuthHeader(),
                },
                body: formData,
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating detail:', error);
            throw error;
        }
    },

    deleteDetail: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/techniques/details/${id}`, {
                method: 'DELETE',
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error deleting detail:', error);
            throw error;
        }
    }
};
