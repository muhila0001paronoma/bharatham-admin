import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, Pencil, ExternalLink } from 'lucide-react';
import GameModal from '../components/game/GameModal';
import QuestionModal from '../components/game/QuestionModal';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import { gamesData } from '../data/data';
import { gameService } from '../services/gameService';
import './Games.css';

export default function Games() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [games, setGames] = useState([]);
  const [questions, setQuestions] = useState(gamesData.questions);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [selectedGameData, setSelectedGameData] = useState(null);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [selectedQuestionData, setSelectedQuestionData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSavingGame, setIsSavingGame] = useState(false);
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false);
  const [isSavingQuestion, setIsSavingQuestion] = useState(false);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    setIsLoading(true);
    try {
      const response = await gameService.getAllGames();
      if (response.success) {
        setGames(response.data);
        if (response.data.length > 0 && !selectedGame) {
          setSelectedGame(response.data[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        handleSearch();
      } else {
        fetchGames();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  useEffect(() => {
    if (selectedGame) {
      fetchQuestions(selectedGame.id);
    }
  }, [selectedGame]);

  const fetchQuestions = async (gameId) => {
    setIsLoadingQuestions(true);
    try {
      const response = await gameService.getGameDetailsByGameId(gameId);
      if (response.success) {
        setQuestions(response.data);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    } finally {
      setIsLoadingQuestions(false);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await gameService.searchGames(searchQuery);
      if (response.success) {
        setGames(response.data);
      }
    } catch (error) {
      console.error('Error searching games:', error);
    }
  };

  const gameQuestions = questions; // Now questions are already filtered by fetchQuestions(gameId)

  const handleCreateGame = () => {
    setSelectedGameData(null);
    setIsGameModalOpen(true);
  };

  const handleEditGame = (game) => {
    setSelectedGameData(game);
    setIsGameModalOpen(true);
  };

  const handleSaveGame = async (formData) => {
    setIsSavingGame(true);
    try {
      let response;
      if (selectedGameData) {
        response = await gameService.updateGame(selectedGameData.id, formData);
      } else {
        response = await gameService.createGame(formData);
      }

      if (response.success) {
        await fetchGames();
        setIsGameModalOpen(false);
        setSelectedGameData(null);
      }
    } catch (error) {
      console.error('Error saving game:', error);
    } finally {
      setIsSavingGame(false);
    }
  };

  const handleCloseGameModal = () => {
    setIsGameModalOpen(false);
    setSelectedGameData(null);
  };

  const handleAddQuestion = () => {
    if (!selectedGame) return;
    setSelectedQuestionData(null);
    setIsQuestionModalOpen(true);
  };

  const handleEditQuestion = (question) => {
    setSelectedQuestionData(question);
    setIsQuestionModalOpen(true);
  };

  const handleSaveQuestion = async (formData) => {
    setIsSavingQuestion(true);
    try {
      let response;
      const questionPayload = { ...formData, gameId: selectedGame.id };
      if (selectedQuestionData) {
        response = await gameService.updateGameDetail(selectedQuestionData.id, questionPayload);
      } else {
        response = await gameService.createGameDetail(questionPayload);
      }

      if (response.success) {
        fetchQuestions(selectedGame.id);
        setIsQuestionModalOpen(false);
        setSelectedQuestionData(null);
      }
    } catch (error) {
      console.error('Error saving question:', error);
    } finally {
      setIsSavingQuestion(false);
    }
  };

  const handleCloseQuestionModal = () => {
    setIsQuestionModalOpen(false);
    setSelectedQuestionData(null);
  };

  const handleDelete = (item, type) => {
    setItemToDelete(item);
    setDeleteType(type);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      try {
        if (deleteType === 'game') {
          const response = await gameService.deleteGame(itemToDelete.id);
          if (response.success) {
            setGames(prev => prev.filter(item => item.id !== itemToDelete.id));
            if (selectedGame?.id === itemToDelete.id) {
              const remainingGames = games.filter(g => g.id !== itemToDelete.id);
              setSelectedGame(remainingGames.length > 0 ? remainingGames[0] : null);
            }
          }
        } else {
          const response = await gameService.deleteGameDetail(itemToDelete.id);
          if (response.success) {
            setQuestions(prev => prev.filter(item => item.id !== itemToDelete.id));
          }
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
      setIsDeleteModalOpen(false);
      setItemToDelete(null);
      setDeleteType(null);
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
    setDeleteType(null);
  };

  return (
    <div className="games-page">
      <div className="games-content-container">
        <div className="games-left-panel">
          <div className="games-panel-header">
            <div className="games-panel-title-wrapper">
              <h2 className="games-panel-title">Games</h2>
              <div className="games-panel-external-icon">
                <ExternalLink size={14} />
              </div>
            </div>
          </div>
          <div className="games-panel-actions">
            <button
              onClick={handleCreateGame}
              className="games-button games-button-primary"
            >
              <Plus className="games-button-icon" />
              Add New Game
            </button>
          </div>
          <div className="games-search-container">
            <Search className="games-search-icon" size={18} />
            <input
              type="text"
              placeholder="Search Game..."
              className="games-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="games-list">
            {isLoading ? (
              <div className="games-list-loading">Loading...</div>
            ) : games.length > 0 ? (
              games.map((game) => (
                <div
                  key={game.id}
                  className={`games-list-item ${selectedGame?.id === game.id ? 'games-list-item-active' : ''}`}
                  onClick={() => {
                    setSelectedGame(game);
                  }}
                >
                  <span className="games-list-item-name">{game.gameName}</span>
                  <Edit2
                    className={`games-list-item-icon ${selectedGame?.id === game.id ? 'games-list-item-icon-active' : ''}`}
                    size={16}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditGame(game);
                    }}
                  />
                </div>
              ))
            ) : (
              <div className="games-list-empty">No games found</div>
            )}
          </div>
        </div>

        <div className="games-right-panel">
          <div className="games-questions-header">
            <div className="games-questions-summary">
              Total Questions - {gameQuestions.length.toString().padStart(2, '0')}
            </div>
            <button
              onClick={handleAddQuestion}
              className="games-button games-button-primary"
              disabled={!selectedGame}
            >
              <Plus className="games-button-icon" />
              Add New Question
            </button>
          </div>
          <div className="games-questions-list">
            {selectedGame ? (
              isLoadingQuestions ? (
                <div className="games-questions-loading">Loading Questions...</div>
              ) : gameQuestions.length > 0 ? (
                gameQuestions.map((question, index) => (
                  <div key={question.id} className="games-question-card">
                    <div className="games-question-header">
                      <span className="games-question-number">Q{index + 1}</span>
                      <div className="games-question-actions">
                        <button
                          className="games-question-action-btn games-question-action-edit"
                          onClick={() => handleEditQuestion(question)}
                          title="Edit"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          className="games-question-action-btn games-question-action-delete"
                          onClick={() => handleDelete(question, 'question')}
                          title="Delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="games-question-content">
                      <p className="games-question-text">{question.question}</p>
                      <div className="games-question-image-container">
                        <img
                          src={question.imgUrl || 'https://via.placeholder.com/200x200?text=Question+Image'}
                          alt="Question"
                          className="games-question-image"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/200x200?text=Question+Image';
                          }}
                        />
                        <button
                          className="games-question-image-edit"
                          onClick={() => handleEditQuestion(question)}
                        >
                          <Pencil size={14} />
                        </button>
                      </div>
                      <div className="games-question-answers">
                        {[
                          { key: 'answer1', label: question.answer1, num: '1' },
                          { key: 'answer2', label: question.answer2, num: '2' },
                          { key: 'answer3', label: question.answer3, num: '3' },
                          { key: 'answer4', label: question.answer4, num: '4' }
                        ].map((answer) => (
                          <div key={answer.key} className="games-answer-item">
                            <span className="games-answer-text">{answer.label}</span>
                            {question.correctAnswer === answer.num && (
                              <span className="games-answer-correct">Correct Answer</span>
                            )}
                            <div className="games-answer-actions">
                              <button
                                className="games-answer-action-btn games-answer-action-edit"
                                onClick={() => handleEditQuestion(question)}
                                title="Edit"
                              >
                                <Pencil size={12} />
                              </button>
                              <button
                                className="games-answer-action-btn games-answer-action-delete"
                                onClick={() => handleDelete(question, 'question')}
                                title="Delete"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        className="games-add-answer-btn"
                        onClick={() => handleEditQuestion(question)}
                      >
                        <Plus size={14} />
                        Add Answer
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="games-questions-empty">
                  No questions found. Add a new question to get started.
                </div>
              )
            ) : (
              <div className="games-questions-empty">
                Select a game to view questions
              </div>
            )}
          </div>
        </div>
      </div>

      <GameModal
        isOpen={isGameModalOpen}
        onClose={handleCloseGameModal}
        onSave={handleSaveGame}
        gameData={selectedGameData}
        questions={questions}
        isLoading={isSavingGame}
      />

      <QuestionModal
        isOpen={isQuestionModalOpen}
        onClose={handleCloseQuestionModal}
        onSave={handleSaveQuestion}
        questionData={selectedQuestionData}
        gameId={selectedGame?.id}
        isLoading={isSavingQuestion}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title={deleteType === 'game' ? 'Delete Game' : 'Delete Question'}
        message={deleteType === 'game'
          ? `Are you sure you want to delete "${itemToDelete?.gameName || 'this game'}"? This action cannot be undone.`
          : `Are you sure you want to delete this question? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        icon={Trash2}
      />
    </div>
  );
}
