import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const techniqueQuizService = {
    // Get all Techniques Details (Sub Topics)
    getAllTechniqueDetails: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/techniques/details`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching technique details:', error);
            throw error;
        }
    },

    // Get All Quizzes
    getAllQuizzes: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/techniques-quiz`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching all quizzes:', error);
            throw error;
        }
    },

    // Get Quizzes by Techniques Detail ID
    getQuizzesByDetailId: async (detailId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/techniques-quiz/techniques-detail/${detailId}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching quizzes for detail ${detailId}:`, error);
            throw error;
        }
    },

    // Create a new Quiz (Question)
    createQuiz: async (quizData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/techniques-quiz`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader(),
                },
                body: JSON.stringify(quizData),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating quiz:', error);
            throw error;
        }
    },

    // Update an existing Quiz
    updateQuiz: async (id, quizData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/techniques-quiz/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader(),
                },
                body: JSON.stringify(quizData),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error updating quiz ${id}:`, error);
            throw error;
        }
    },

    // Delete a Quiz
    deleteQuiz: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/techniques-quiz/${id}`, {
                method: 'DELETE',
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error deleting quiz ${id}:`, error);
            throw error;
        }
    }
};
