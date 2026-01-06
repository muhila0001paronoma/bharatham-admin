import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const theoryQuizService = {
    // Get all Theory Details (Sub Topics)
    getAllTheoryDetails: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/theory/details`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching theory details:', error);
            throw error;
        }
    },

    // Get Quizzes by Theory Detail ID
    getQuizzesByDetailId: async (detailId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/theory-quiz/theory-detail/${detailId}`, {
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
            const response = await fetch(`${API_BASE_URL}/theory-quiz`, {
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
            const response = await fetch(`${API_BASE_URL}/theory-quiz/${id}`, {
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
            const response = await fetch(`${API_BASE_URL}/theory-quiz/${id}`, {
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
