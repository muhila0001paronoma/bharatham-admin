import { API_BASE_URL } from '../config';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const gameService = {
    getAllGames: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/games`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching games:', error);
            throw error;
        }
    },

    createGame: async (gameData) => {
        try {
            const formData = new FormData();
            formData.append('gameName', gameData.gameName);
            formData.append('description', gameData.description);
            formData.append('totalPoints', gameData.totalPoints);
            formData.append('timeDuration', gameData.timeDuration);
            formData.append('mode', gameData.mode);

            if (gameData.imageFile) {
                formData.append('image', gameData.imageFile);
            }

            const response = await fetch(`${API_BASE_URL}/games`, {
                method: 'POST',
                headers: {
                    ...getAuthHeader(),
                },
                body: formData,
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating game:', error);
            throw error;
        }
    },

    updateGame: async (id, gameData) => {
        try {
            const formData = new FormData();
            formData.append('gameName', gameData.gameName);
            formData.append('description', gameData.description);
            formData.append('totalPoints', gameData.totalPoints);
            formData.append('timeDuration', gameData.timeDuration);
            formData.append('mode', gameData.mode);

            if (gameData.imageFile) {
                formData.append('image', gameData.imageFile);
            }

            const response = await fetch(`${API_BASE_URL}/games/${id}`, {
                method: 'PUT',
                headers: {
                    ...getAuthHeader(),
                },
                body: formData,
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating game:', error);
            throw error;
        }
    },

    deleteGame: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/games/${id}`, {
                method: 'DELETE',
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error deleting game:', error);
            throw error;
        }
    },

    searchGames: async (gameName) => {
        try {
            const response = await fetch(`${API_BASE_URL}/games/search/by-name?gameName=${encodeURIComponent(gameName)}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error searching games:', error);
            throw error;
        }
    },

    // Game Details (Questions)
    getAllGameDetails: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/game-details`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching game details:', error);
            throw error;
        }
    },

    getGameDetailsByGameId: async (gameId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/game-details/search/by-game-id?gameId=${gameId}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching game details by game ID:', error);
            throw error;
        }
    },

    createGameDetail: async (detailData) => {
        try {
            const formData = new FormData();
            formData.append('gameId', detailData.gameId);
            formData.append('question', detailData.question);
            formData.append('answer1', detailData.answer1);
            formData.append('answer2', detailData.answer2);
            formData.append('answer3', detailData.answer3);
            formData.append('answer4', detailData.answer4);
            formData.append('correctAnswer', detailData.correctAnswer);

            if (detailData.imageFile) {
                formData.append('image', detailData.imageFile);
            }

            const response = await fetch(`${API_BASE_URL}/game-details`, {
                method: 'POST',
                headers: {
                    ...getAuthHeader(),
                },
                body: formData,
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating game detail:', error);
            throw error;
        }
    },

    updateGameDetail: async (id, detailData) => {
        try {
            const formData = new FormData();
            formData.append('gameId', detailData.gameId);
            formData.append('question', detailData.question);
            formData.append('answer1', detailData.answer1);
            formData.append('answer2', detailData.answer2);
            formData.append('answer3', detailData.answer3);
            formData.append('answer4', detailData.answer4);
            formData.append('correctAnswer', detailData.correctAnswer);

            if (detailData.imageFile) {
                formData.append('image', detailData.imageFile);
            }

            const response = await fetch(`${API_BASE_URL}/game-details/${id}`, {
                method: 'PUT',
                headers: {
                    ...getAuthHeader(),
                },
                body: formData,
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating game detail:', error);
            throw error;
        }
    },

    deleteGameDetail: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/game-details/${id}`, {
                method: 'DELETE',
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error deleting game detail:', error);
            throw error;
        }
    },

    // Game User Details (Results/Leaderboard)
    getGameUserDetailsByGameId: async (gameId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/game-user-details/game/${gameId}`, {
                headers: {
                    ...getAuthHeader(),
                },
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching game user details:', error);
            throw error;
        }
    }
};
