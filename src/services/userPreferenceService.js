import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const userPreferenceService = {
    // Questions
    getAllQuestions: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/user-preference-questions`, {
                headers: getAuthHeader(),
            });
            return await response.json();
        } catch (error) {
            console.error('Error fetching preference questions:', error);
            throw error;
        }
    },

    createQuestion: async (questionText) => {
        try {
            const response = await fetch(`${API_BASE_URL}/user-preference-questions`, {
                method: 'POST',
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: questionText, isActive: true }),
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating preference question:', error);
            throw error;
        }
    },

    updateQuestion: async (id, questionText) => {
        try {
            const response = await fetch(`${API_BASE_URL}/user-preference-questions/${id}`, {
                method: 'PUT',
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: questionText, isActive: true }),
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating preference question:', error);
            throw error;
        }
    },

    deleteQuestion: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/user-preference-questions/${id}`, {
                method: 'DELETE',
                headers: getAuthHeader(),
            });
            return await response.json();
        } catch (error) {
            console.error('Error deleting preference question:', error);
            throw error;
        }
    },

    // Answers
    getAnswersByQuestionId: async (questionId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/user-preference-answers/question/${questionId}`, {
                headers: getAuthHeader(),
            });
            return await response.json();
        } catch (error) {
            console.error(`Error fetching answers for question ${questionId}:`, error);
            throw error;
        }
    },

    createAnswer: async (questionId, answerText) => {
        try {
            const response = await fetch(`${API_BASE_URL}/user-preference-answers`, {
                method: 'POST',
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    questionId,
                    answer: answerText,
                    isActive: true
                }),
            });
            return await response.json();
        } catch (error) {
            console.error('Error creating preference answer:', error);
            throw error;
        }
    },

    updateAnswer: async (id, questionId, answerText) => {
        try {
            const response = await fetch(`${API_BASE_URL}/user-preference-answers/${id}`, {
                method: 'PUT',
                headers: {
                    ...getAuthHeader(),
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    questionId,
                    answer: answerText,
                    isActive: true
                }),
            });
            return await response.json();
        } catch (error) {
            console.error('Error updating preference answer:', error);
            throw error;
        }
    },

    deleteAnswer: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/user-preference-answers/${id}`, {
                method: 'DELETE',
                headers: getAuthHeader(),
            });
            return await response.json();
        } catch (error) {
            console.error('Error deleting preference answer:', error);
            throw error;
        }
    },

    // User Selection (User Preferences)
    getUserPreferences: async (email) => {
        try {
            const response = await fetch(`${API_BASE_URL}/user-preferences/user/${email}/complete`, {
                headers: getAuthHeader()
            });
            return await response.json();
        } catch (error) {
            console.error(`Error fetching preferences for user ${email}:`, error);
            throw error;
        }
    }
};
