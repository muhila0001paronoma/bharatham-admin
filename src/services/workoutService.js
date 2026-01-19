import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const workoutService = {
    // ============ Workout Tabs ============

    // Get all workout tabs
    getAllTabs: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/workout-tabs`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error('Error fetching workout tabs:', error);
            return { success: false, message: error.message };
        }
    },

    // Create new workout tab
    createTab: async (tabData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/workout-tabs`, {
                method: 'POST',
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tabData),
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (error) {
            console.error('Error creating workout tab:', error);
            return { success: false, message: error.message };
        }
    },

    // Update workout tab
    updateTab: async (id, tabData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/workout-tabs/${id}`, {
                method: 'PUT',
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(tabData),
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (error) {
            console.error(`Error updating workout tab ${id}:`, error);
            return { success: false, message: error.message };
        }
    },

    // Delete workout tab
    deleteTab: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/workout-tabs/${id}`, {
                method: 'DELETE',
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (error) {
            console.error(`Error deleting workout tab ${id}:`, error);
            return { success: false, message: error.message };
        }
    },

    // ============ Workout Videos ============

    // Get all workout videos
    getAllVideos: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/workout-videos`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error('Error fetching workout videos:', error);
            return { success: false, message: error.message };
        }
    },

    // Get videos by tab ID
    getVideosByTabId: async (tabId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/workout-videos/tab/${tabId}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error(`Error fetching videos for tab ${tabId}:`, error);
            return { success: false, message: error.message };
        }
    },

    // Search videos
    searchVideos: async (searchQuery) => {
        try {
            const response = await fetch(`${API_BASE_URL}/workout-videos/search?query=${encodeURIComponent(searchQuery)}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return { success: true, data };
        } catch (error) {
            console.error('Error searching workout videos:', error);
            return { success: false, message: error.message };
        }
    },

    // Create workout video (with FormData for file upload)
    createVideo: async (videoData) => {
        try {
            const formData = new FormData();

            // Append all video data to FormData
            Object.keys(videoData).forEach(key => {
                if (videoData[key] !== null && videoData[key] !== undefined) {
                    if (key === 'imageFile' && videoData[key] instanceof File) {
                        formData.append('imageFile', videoData[key]);
                    } else if (key !== 'imageFile') {
                        formData.append(key, videoData[key]);
                    }
                }
            });

            const response = await fetch(`${API_BASE_URL}/workout-videos`, {
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
            console.error('Error creating workout video:', error);
            return { success: false, message: error.message };
        }
    },

    // Update workout video (with FormData for file upload)
    updateVideo: async (id, videoData) => {
        try {
            const formData = new FormData();

            // Append all video data to FormData
            Object.keys(videoData).forEach(key => {
                if (videoData[key] !== null && videoData[key] !== undefined) {
                    if (key === 'imageFile' && videoData[key] instanceof File) {
                        formData.append('imageFile', videoData[key]);
                    } else if (key !== 'imageFile') {
                        formData.append(key, videoData[key]);
                    }
                }
            });

            const response = await fetch(`${API_BASE_URL}/workout-videos/${id}`, {
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
            console.error(`Error updating workout video ${id}:`, error);
            return { success: false, message: error.message };
        }
    },

    // Delete workout video
    deleteVideo: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/workout-videos/${id}`, {
                method: 'DELETE',
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return { success: response.ok, data };
        } catch (error) {
            console.error(`Error deleting workout video ${id}:`, error);
            return { success: false, message: error.message };
        }
    },
};
