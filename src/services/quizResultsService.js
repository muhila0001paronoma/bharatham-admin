import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const quizResultsService = {
    // Techniques Quiz Results
    getAllTechniquesResults: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/techniques-quiz-results`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching techniques quiz results:', error);
            throw error;
        }
    },

    getResultsByTechniquesDetailId: async (detailId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/techniques-quiz-results/techniques-detail/${detailId}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching techniques results for detail ${detailId}:`, error);
            throw error;
        }
    },

    getResultsByUserEmail: async (userEmail) => {
        try {
            const response = await fetch(`${API_BASE_URL}/techniques-quiz-results/user/${encodeURIComponent(userEmail)}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching results for user ${userEmail}:`, error);
            throw error;
        }
    },

    createTechniquesResult: async (resultData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/techniques-quiz-results`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader(),
                },
                body: JSON.stringify(resultData),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating techniques quiz result:', error);
            throw error;
        }
    },

    updateTechniquesResult: async (id, resultData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/techniques-quiz-results/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader(),
                },
                body: JSON.stringify(resultData),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error updating techniques result ${id}:`, error);
            throw error;
        }
    },

    deleteTechniquesResult: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/techniques-quiz-results/${id}`, {
                method: 'DELETE',
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error deleting techniques result ${id}:`, error);
            throw error;
        }
    },

    // Theory Quiz Results
    getAllTheoryResults: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/theory-quiz-results`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching theory quiz results:', error);
            throw error;
        }
    },

    getTheoryResultsByDetailId: async (detailId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/theory-quiz-results/theory-detail/${detailId}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error fetching theory results for detail ${detailId}:`, error);
            throw error;
        }
    },

    createTheoryResult: async (resultData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/theory-quiz-results`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader(),
                },
                body: JSON.stringify(resultData),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating theory quiz result:', error);
            throw error;
        }
    },

    updateTheoryResult: async (id, resultData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/theory-quiz-results/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader(),
                },
                body: JSON.stringify(resultData),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error updating theory result ${id}:`, error);
            throw error;
        }
    },

    deleteTheoryResult: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/theory-quiz-results/${id}`, {
                method: 'DELETE',
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(`Error deleting theory result ${id}:`, error);
            throw error;
        }
    },

    // Combined method to get all quiz results (both techniques and theory)
    getAllResults: async () => {
        try {
            const [techniquesResponse, theoryResponse] = await Promise.all([
                quizResultsService.getAllTechniquesResults(),
                quizResultsService.getAllTheoryResults()
            ]);

            const techniqueResults = techniquesResponse.success ? techniquesResponse.data : [];
            const theoryResults = theoryResponse.success ? theoryResponse.data : [];

            // Combine and mark with type
            const combinedResults = [
                ...techniqueResults.map(r => ({ ...r, type: 'Technique' })),
                ...theoryResults.map(r => ({ ...r, type: 'Theory' }))
            ];

            return {
                success: true,
                data: combinedResults
            };
        } catch (error) {
            console.error('Error fetching all quiz results:', error);
            throw error;
        }
    }
};
