import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const messageService = {
    getAllMessages: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/messages`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching all messages:', error);
            throw error;
        }
    },

    getMessagesByChat: async (chatId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/messages/by-chat/${chatId}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching messages:', error);
            throw error;
        }
    },

    createMessage: async (payload) => {
        try {
            const formData = new FormData();

            // Append only non-null values to FormData
            Object.entries(payload).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    formData.append(key, value);
                }
            });

            const response = await fetch(`${API_BASE_URL}/messages`, {
                method: 'POST',
                headers: {
                    ...getAuthHeader(),
                    // Brownie tip: Do NOT set Content-Type header when sending FormData; 
                    // the browser will set it automatically with the correct boundary.
                },
                body: formData,
            });

            return await response.json();
        } catch (error) {
            console.error('Error creating message:', error);
            throw error;
        }
    },

    updateMessage: async (id, payload) => {
        try {
            const formData = new FormData();
            Object.entries(payload).forEach(([key, value]) => {
                if (value !== null && value !== undefined) {
                    formData.append(key, value);
                }
            });

            const response = await fetch(`${API_BASE_URL}/messages/${id}`, {
                method: 'PUT',
                headers: {
                    ...getAuthHeader(),
                },
                body: formData,
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating message:', error);
            throw error;
        }
    },

    createMessageRead: async (payload) => {
        try {
            const response = await fetch(`${API_BASE_URL}/message-reads`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader(),
                },
                body: JSON.stringify(payload),
            });
            return await response.json();
        } catch (error) {
            console.error('Error marking message as read:', error);
            throw error;
        }
    },

    getMessageReadsByMessage: async (messageId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/message-reads/by-message/${messageId}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching message reads:', error);
            throw error;
        }
    },

    searchMessages: async (searchTerm) => {
        try {
            const response = await fetch(`${API_BASE_URL}/messages/search?searchTerm=${encodeURIComponent(searchTerm)}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error searching messages:', error);
            throw error;
        }
    },

    // Message Reactions
    createMessageReaction: async (payload) => {
        try {
            const response = await fetch(`${API_BASE_URL}/message-reactions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader(),
                },
                body: JSON.stringify(payload),
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating reaction:', error);
            throw error;
        }
    },

    deleteMessageReaction: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/message-reactions/${id}`, {
                method: 'DELETE',
                headers: {
                    ...getAuthHeader(),
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error deleting reaction:', error);
            throw error;
        }
    },

    getMessageReactionsByMessage: async (messageId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/message-reactions/by-message/${messageId}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching reactions:', error);
            throw error;
        }
    },

    getReactionCount: async (messageId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/message-reactions/count/${messageId}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching reaction count:', error);
            throw error;
        }
    }
};
