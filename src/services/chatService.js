import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const chatService = {
    createChat: async (payload) => {
        try {
            const response = await fetch(`${API_BASE_URL}/chats`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader(),
                },
                body: JSON.stringify(payload),
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating chat:', error);
            throw error;
        }
    },

    updateChat: async (id, payload) => {
        try {
            const response = await fetch(`${API_BASE_URL}/chats/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader(),
                },
                body: JSON.stringify(payload),
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating chat:', error);
            throw error;
        }
    },

    getAllChats: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/chats`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching chats:', error);
            throw error;
        }
    },

    getChatById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/chats/${id}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching chat by id:', error);
            throw error;
        }
    },

    searchChatsByCreatedBy: async (createdBy) => {
        try {
            const response = await fetch(`${API_BASE_URL}/chats/search/by-created-by?createdBy=${encodeURIComponent(createdBy)}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error searching chats by createdBy:', error);
            throw error;
        }
    },

    getChatMembersByChat: async (chatId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/chat-members/by-chat/${chatId}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching chat members:', error);
            throw error;
        }
    },

    joinChat: async (payload) => {
        try {
            const response = await fetch(`${API_BASE_URL}/chat-members/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader(),
                },
                body: JSON.stringify(payload),
            });
            return await response.json();
        } catch (error) {
            console.error('Error joining chat:', error);
            throw error;
        }
    },

    createChatMember: async (payload) => {
        try {
            const response = await fetch(`${API_BASE_URL}/chat-members/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader(),
                },
                body: JSON.stringify(payload),
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating chat member:', error);
            throw error;
        }
    },

    searchChatsByType: async (type) => {
        try {
            const response = await fetch(`${API_BASE_URL}/chats/search/by-type?type=${encodeURIComponent(type)}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            return await response.json();
        } catch (error) {
            console.error('Error searching chats by type:', error);
            throw error;
        }
    },

    leaveChat: async (payload) => {
        try {
            const response = await fetch(`${API_BASE_URL}/chat-members/leave`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader(),
                },
                body: JSON.stringify(payload),
            });
            return await response.json();
        } catch (error) {
            console.error('Error leaving chat:', error);
            throw error;
        }
    }
};
