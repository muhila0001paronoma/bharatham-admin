import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const challengeService = {
    getAllChallenges: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/challenges`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching challenges:', error);
            throw error;
        }
    },

    createChallenge: async (challengeData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/challenges`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader(),
                },
                body: JSON.stringify(challengeData),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating challenge:', error);
            throw error;
        }
    },

    updateChallenge: async (id, challengeData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/challenges/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader(),
                },
                body: JSON.stringify(challengeData),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating challenge:', error);
            throw error;
        }
    },

    deleteChallenge: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/challenges/${id}`, {
                method: 'DELETE',
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error deleting challenge:', error);
            throw error;
        }
    },

    searchChallenges: async (challengeName) => {
        try {
            const response = await fetch(`${API_BASE_URL}/challenges/search/by-name?challengeName=${encodeURIComponent(challengeName)}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error searching challenges:', error);
            throw error;
        }
    }
};
