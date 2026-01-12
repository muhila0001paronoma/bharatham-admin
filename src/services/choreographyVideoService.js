import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const choreographyVideoService = {
    // Get all choreography videos
    getAll: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/choreography/videos`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching choreography videos:', error);
            throw error;
        }
    },

    // Get video by ID
    getById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/choreography/videos/${id}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching video ${id}:`, error);
            throw error;
        }
    },

    // Create new choreography video
    create: async (videoData) => {
        try {
            const formData = new FormData();
            formData.append('teacherId', videoData.teacherId);
            formData.append('title', videoData.title);
            formData.append('description', videoData.description || '');
            formData.append('duration', videoData.duration || 0);
            formData.append('level', videoData.level || 'Beginner');
            formData.append('views', videoData.views || 0);
            formData.append('likes', videoData.likes || 0);
            formData.append('orderSequence', videoData.orderSequence || 0);
            formData.append('isPremium', videoData.isPremium !== undefined ? videoData.isPremium : false);
            formData.append('isActive', videoData.isActive !== undefined ? videoData.isActive : true);

            if (videoData.tags && Array.isArray(videoData.tags)) {
                videoData.tags.forEach(tag => formData.append('tags', tag));
            }

            if (videoData.metadata) {
                formData.append('metadata', videoData.metadata);
            }

            if (videoData.videoFile) {
                formData.append('video', videoData.videoFile);
            }

            if (videoData.thumbnailFile) {
                formData.append('thumbnail', videoData.thumbnailFile);
            }

            const response = await fetch(`${API_BASE_URL}/choreography/videos`, {
                method: 'POST',
                headers: {
                    ...getAuthHeader(),
                },
                body: formData,
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating choreography video:', error);
            throw error;
        }
    },

    // Update choreography video
    update: async (id, videoData) => {
        try {
            const formData = new FormData();
            formData.append('teacherId', videoData.teacherId);
            formData.append('title', videoData.title);
            formData.append('description', videoData.description || '');
            formData.append('duration', videoData.duration || 0);
            formData.append('level', videoData.level || 'Beginner');
            formData.append('views', videoData.views || 0);
            formData.append('likes', videoData.likes || 0);
            formData.append('orderSequence', videoData.orderSequence || 0);
            formData.append('isPremium', videoData.isPremium !== undefined ? videoData.isPremium : false);
            formData.append('isActive', videoData.isActive !== undefined ? videoData.isActive : true);

            if (videoData.tags && Array.isArray(videoData.tags)) {
                videoData.tags.forEach(tag => formData.append('tags', tag));
            }

            if (videoData.metadata) {
                formData.append('metadata', videoData.metadata);
            }

            if (videoData.videoFile) {
                formData.append('video', videoData.videoFile);
            }

            if (videoData.thumbnailFile) {
                formData.append('thumbnail', videoData.thumbnailFile);
            }

            const response = await fetch(`${API_BASE_URL}/choreography/videos/${id}`, {
                method: 'PUT',
                headers: {
                    ...getAuthHeader(),
                },
                body: formData,
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error updating video ${id}:`, error);
            throw error;
        }
    },

    // Delete choreography video
    delete: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/choreography/videos/${id}`, {
                method: 'DELETE',
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error deleting video ${id}:`, error);
            throw error;
        }
    },

    // Increment views
    incrementViews: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/choreography/videos/${id}/views`, {
                method: 'POST',
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error incrementing views for video ${id}:`, error);
            throw error;
        }
    }
};
