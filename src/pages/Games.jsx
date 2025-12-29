import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Pencil, ExternalLink } from 'lucide-react';
import GameModal from '../components/game/GameModal';
import QuestionModal from '../components/game/QuestionModal';
import ConfirmationModal from '../components/ui/ConfirmationModal';
import { gamesData } from '../data/data';
import './Games.css';

export default function Games() {
  const [selectedGame, setSelectedGame] = useState(gamesData.games && gamesData.games.length > 0 ? gamesData.games[0] : null);
  const [searchQuery, setSearchQuery] = useState('');
  const [games, setGames] = useState(gamesData.games);
  const [questions, setQuestions] = useState(gamesData.questions);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [selectedGameData, setSelectedGameData] = useState(null);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [selectedQuestionData, setSelectedQuestionData] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState(null);

  const filteredGames = games.filter(game => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return game.gameName.toLowerCase().includes(query);
  });

  const gameQuestions = questions.filter(q => q.gameId === selectedGame?.id);

  const handleCreateGame = () => {
    setSelectedGameData(null);
    setIsGameModalOpen(true);
  };

  const handleEditGame = (game) => {
    setSelectedGameData(game);
    setIsGameModalOpen(true);
  };

  const handleSaveGame = (formData) => {
    if (selectedGameData) {
      setGames(prev => 
        prev.map(item => 
          item.id === selectedGameData.id 
            ? { ...item, ...formData, active: true }
            : item
        )
      );
      if (selectedGameData.id === selectedGame?.id) {
        setSelectedGame({ ...selectedGameData, ...formData });
      }
    } else {
      const newGame = {
        id: games.length + 1,
        ...formData,
        active: true
      };
      setGames(prev => [newGame, ...prev]);
      if (!selectedGame) {
        setSelectedGame(newGame);
      }
    }
    setIsGameModalOpen(false);
    setSelectedGameData(null);
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

  const handleSaveQuestion = (formData) => {
    if (selectedQuestionData) {
      setQuestions(prev => 
        prev.map(item => 
          item.id === selectedQuestionData.id 
            ? { ...item, ...formData, gameId: selectedGame.id, active: true }
            : item
        )
      );
    } else {
      const newQuestion = {
        id: questions.length + 1,
        ...formData,
        gameId: selectedGame.id,
        active: true
      };
      setQuestions(prev => [...prev, newQuestion]);
    }
    setIsQuestionModalOpen(false);
    setSelectedQuestionData(null);
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

  const handleConfirmDelete = () => {
    if (itemToDelete) {
      if (deleteType === 'game') {
        setGames(prev => prev.filter(item => item.id !== itemToDelete.id));
        if (selectedGame?.id === itemToDelete.id) {
          setSelectedGame(games.find(g => g.id !== itemToDelete.id) || null);
        }
      } else {
        setQuestions(prev => prev.filter(item => item.id !== itemToDelete.id));
      }
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
            {filteredGames.length > 0 ? (
              filteredGames.map((game) => (
                <div
                  key={game.id}
                  className={`games-list-item ${selectedGame?.id === game.id ? 'games-list-item-active' : ''}`}
                  onClick={() => {
                    setSelectedGame(game);
                    handleEditGame(game);
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
              gameQuestions.length > 0 ? (
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
      />

      <QuestionModal
        isOpen={isQuestionModalOpen}
        onClose={handleCloseQuestionModal}
        onSave={handleSaveQuestion}
        questionData={selectedQuestionData}
        gameId={selectedGame?.id}
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
