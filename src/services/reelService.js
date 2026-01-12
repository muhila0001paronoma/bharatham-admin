import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const reelService = {
    getAllReels: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/reels`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching reels:', error);
            throw error;
        }
    },

    createReel: async (reelData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/reels`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader(),
                },
                body: JSON.stringify(reelData),
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating reel:', error);
            throw error;
        }
    },

    updateReel: async (id, reelData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/reels/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader(),
                },
                body: JSON.stringify(reelData),
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating reel:', error);
            throw error;
        }
    },

    deleteReel: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/reels/${id}`, {
                method: 'DELETE',
                headers: {
                    ...getAuthHeader(),
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error deleting reel:', error);
            throw error;
        }
    },

    getReelsByUser: async (userEmail) => {
        try {
            const response = await fetch(`${API_BASE_URL}/reels/by-user?userEmail=${encodeURIComponent(userEmail)}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching reels by user:', error);
            throw error;
        }
    },

    getReelsByDateRange: async (startDate, endDate) => {
        try {
            const response = await fetch(`${API_BASE_URL}/reels/by-uploaded-date-range?startDate=${startDate}&endDate=${endDate}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching reels by date range:', error);
            throw error;
        }
    },

    checkUserLike: async (userEmail, reelId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/user-likes/check?userEmail=${encodeURIComponent(userEmail)}&reelId=${reelId}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error checking like status:', error);
            throw error;
        }
    },

    getReelLikes: async (reelId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/user-likes/reel/${reelId}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching reel likes:', error);
            throw error;
        }
    },

    getReelLikeCount: async (reelId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/user-likes/reel/${reelId}/count`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching reel like count:', error);
            throw error;
        }
    },

    getAllComments: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/reels/comments`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching reel comments:', error);
            throw error;
        }
    },

    getCommentsByReel: async (reelId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/reels/comments/by-reel/${reelId}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching comments by reel:', error);
            throw error;
        }
    },

    deleteComment: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/reels/comments/${id}`, {
                method: 'DELETE',
                headers: {
                    ...getAuthHeader(),
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error deleting comment:', error);
            throw error;
        }
    }
};
