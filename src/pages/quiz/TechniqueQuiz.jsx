import React, { useState, useEffect } from 'react';
import './QuizPage.css';
import '../../components/game/GameModal.css';
import { techniqueQuizService } from '../../services/techniqueQuizService';
import QuizMobilePreview from '../../components/quiz/QuizMobilePreview';
import {
  Search,
  RotateCw,
  SquareArrowOutUpRight,
  Plus,
  Edit,
  Trash2,
  Check,
  ExternalLink,
  BookOpen,
  HelpCircle,
  FileText
} from 'lucide-react';
import './../../components/ui/DataTable.css';

const TechniqueQuiz = () => {
  const [subTopics, setSubTopics] = useState([]); // Array of technique details
  const [questions, setQuestions] = useState([]); // All quiz questions from backend
  const [selectedSubTopic, setSelectedSubTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [currentEditId, setCurrentEditId] = useState(null);
  const [form, setForm] = useState({
    question: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    correctAnswer: '1',
    explanation: '',
    techniquesDetailId: ''
  });



  // Helper function to transform backend quiz to frontend format
  const transformQuizToFrontend = (quiz) => {
    const answers = [
      { text: quiz.answer1, correct: quiz.correctAnswer === '1' },
      { text: quiz.answer2, correct: quiz.correctAnswer === '2' },
      { text: quiz.answer3, correct: quiz.correctAnswer === '3' },
      { text: quiz.answer4, correct: quiz.correctAnswer === '4' }
    ].filter(ans => ans.text); // Filter out empty answers

    return {
      id: quiz.id,
      question: quiz.question,
      answers: answers,
      note: quiz.explanation,
      techniquesDetailId: quiz.techniquesDetailId
    };
  };

  useEffect(() => {
    const loadQuizData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch technique details (sub-topics)
        const detailsResponse = await techniqueQuizService.getAllTechniqueDetails();
        if (detailsResponse.success && detailsResponse.data) {
          setSubTopics(detailsResponse.data);
          if (detailsResponse.data.length > 0) {
            setSelectedSubTopic(detailsResponse.data[0]);
          }
        }

        // Fetch all quizzes
        const quizzesResponse = await techniqueQuizService.getAllQuizzes();
        if (quizzesResponse.success && quizzesResponse.data) {
          const transformedQuestions = quizzesResponse.data.map(transformQuizToFrontend);
          setQuestions(transformedQuestions);
        }
      } catch (err) {
        console.error('Error loading quiz data:', err);
        setError('Failed to load quiz data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    loadQuizData();
  }, []);

  // Filter sub topics based on search
  const filteredSubTopics = subTopics.filter(topic =>
    topic.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter questions by selected sub-topic
  const filteredQuestions = selectedSubTopic
    ? questions.filter(q => q.techniquesDetailId === selectedSubTopic.id)
    : questions;

  const openModal = (mode = 'add', questionData = null) => {
    setModalMode(mode);
    if (mode === 'edit' && questionData) {
      setCurrentEditId(questionData.id);
      // Find the correct answer index
      const correctIndex = questionData.answers.findIndex(ans => ans.correct);
      setForm({
        question: questionData.question,
        answer1: questionData.answers[0]?.text || '',
        answer2: questionData.answers[1]?.text || '',
        answer3: questionData.answers[2]?.text || '',
        answer4: questionData.answers[3]?.text || '',
        correctAnswer: String(correctIndex + 1),
        explanation: questionData.note || '',
        techniquesDetailId: questionData.techniquesDetailId
      });
    } else {
      setCurrentEditId(null);
      setForm({
        question: '',
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        correctAnswer: '1',
        explanation: '',
        techniquesDetailId: selectedSubTopic?.id || ''
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentEditId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const quizData = {
        question: form.question,
        answer1: form.answer1,
        answer2: form.answer2,
        answer3: form.answer3,
        answer4: form.answer4,
        correctAnswer: form.correctAnswer,
        explanation: form.explanation,
        techniquesDetailId: form.techniquesDetailId || selectedSubTopic?.id,
        isActive: true
      };

      let response;
      if (modalMode === 'edit' && currentEditId) {
        response = await techniqueQuizService.updateQuiz(currentEditId, quizData);
      } else {
        response = await techniqueQuizService.createQuiz(quizData);
      }

      if (response.success) {
        // Reload quizzes
        const quizzesResponse = await techniqueQuizService.getAllQuizzes();
        if (quizzesResponse.success && quizzesResponse.data) {
          const transformedQuestions = quizzesResponse.data.map(transformQuizToFrontend);
          setQuestions(transformedQuestions);
        }
        closeModal();
      } else {
        setError(response.message || 'Failed to save quiz');
      }
    } catch (err) {
      console.error('Error saving quiz:', err);
      setError('Failed to save quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Sub Topic handlers
  const handleSubTopicClick = (topic) => {
    setSelectedSubTopic(topic);
  };

  // Question edit/delete handlers
  const handleEditQuestion = (question) => {
    openModal('edit', question);
  };

  const handleDeleteQuestion = async (questionId) => {
    if (!window.confirm('Are you sure you want to delete this question?')) {
      return;
    }
    try {
      setLoading(true);
      const response = await techniqueQuizService.deleteQuiz(questionId);
      if (response.success) {
        // Reload quizzes
        const quizzesResponse = await techniqueQuizService.getAllQuizzes();
        if (quizzesResponse.success && quizzesResponse.data) {
          const transformedQuestions = quizzesResponse.data.map(transformQuizToFrontend);
          setQuestions(transformedQuestions);
        }
      } else {
        setError(response.message || 'Failed to delete quiz');
      }
    } catch (err) {
      console.error('Error deleting quiz:', err);
      setError('Failed to delete quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  const totalQuizzes = filteredQuestions.length;
  const totalSubTopics = subTopics.length;


  return (
    <div className="quiz-page">
      <div className="theory-page-header">
        <div className="theory-page-header-content">
          <div className="theory-page-header-left">
            <div className="theory-page-header-icon">
              <HelpCircle size={28} />
            </div>
            <div>
              <h1 className="theory-page-header-title">Techniques Quiz</h1>
              <p className="theory-page-header-subtitle">Manage questions, answers, and sub-topics for dance technique quizzes</p>
            </div>
          </div>
          <div className="theory-page-header-stats">
            <div className="theory-page-stat-card">
              <div className="theory-page-stat-icon theory-page-stat-icon-primary">
                <BookOpen size={20} />
              </div>
              <div className="theory-page-stat-content">
                <div className="theory-page-stat-value">{totalSubTopics}</div>
                <div className="theory-page-stat-label">Sub Topics</div>
              </div>
            </div>
            <div className="theory-page-stat-card">
              <div className="theory-page-stat-icon theory-page-stat-icon-success">
                <FileText size={20} />
              </div>
              <div className="theory-page-stat-content">
                <div className="theory-page-stat-value">{totalQuizzes}</div>
                <div className="theory-page-stat-label">Total Questions</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="quiz-content">
        {/* Left Sidebar - Sub Topics */}
        <aside className="quiz-sidebar">
          <div className="quiz-sidebar-header">
            <div className="quiz-sidebar-title-row">
              <h3>Sub Topics</h3>
              <ExternalLink size={18} className="quiz-header-icon" />
            </div>
            <div className="quiz-search-wrapper">
              <Search size={16} className="quiz-search-icon" />
              <input
                placeholder="Search Sub Topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="quiz-subtopic-list">
            {filteredSubTopics.map((topic) => (
              <button
                key={topic.id}
                className={`quiz-subtopic ${selectedSubTopic?.id === topic.id ? 'active' : ''}`}
                onClick={() => handleSubTopicClick(topic)}
              >
                {topic.name}
              </button>
            ))}
          </div>
        </aside>

        {/* Right Content - Questions */}
        <section className="quiz-main-area">
          <div className="quiz-main-header">
            <span className="quiz-total-count">Total Questions - {filteredQuestions.length.toString().padStart(2, '0')}</span>
            <button className="quiz-btn primary" onClick={() => openModal('add')} disabled={!selectedSubTopic}>
              <Plus size={18} style={{ marginRight: '6px' }} />
              Add New Quiz
            </button>
          </div>

          {loading && <div className="quiz-loading">Loading...</div>}
          {error && <div className="quiz-error">{error}</div>}

          <div className="quiz-questions-list">
            {filteredQuestions.map((q, qIdx) => (
              <div key={q.id} className="quiz-card">
                <div className="quiz-card-header">
                  <div className="quiz-chip">Q{qIdx + 1}</div>
                  <h4 className="quiz-question-text">{q.question}</h4>
                </div>

                <div className="quiz-answers">
                  {q.answers.map((ans, ansIdx) => (
                    <div key={ansIdx} className="quiz-answer">
                      <span className="quiz-answer-text">{ans.text}</span>
                      {ans.correct && (
                        <span className="quiz-pill success">
                          Correct Answer
                        </span>
                      )}
                    </div>
                  ))}
                </div>

                <div className="quiz-card-actions">
                  <button
                    className="data-table-action-button data-table-action-edit"
                    aria-label="edit question"
                    onClick={() => handleEditQuestion(q)}
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    className="data-table-action-button data-table-action-delete"
                    aria-label="delete question"
                    onClick={() => handleDeleteQuestion(q.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {q.note && (
                  <div className="quiz-note-wrapper">
                    <p className="quiz-note-text">{q.note}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {showModal && (
        <div className="quiz-modal-overlay" role="dialog" aria-modal="true" onClick={closeModal}>
          <div className="quiz-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="quiz-modal-header">
              <h3 className="quiz-modal-title">
                {modalMode === 'edit' ? 'Edit Quiz' : 'Add New Quiz'}
              </h3>
              <button className="quiz-modal-close" aria-label="Close" onClick={closeModal}>✕</button>
            </div>
            <div className="quiz-modal-body">
              {/* Left Side - Form */}
              <div className="quiz-modal-form-section">
                <form className="quiz-modal-form" onSubmit={handleSubmit}>
                  <div className="quiz-modal-field">
                    <label htmlFor="question">Question</label>
                    <textarea
                      id="question"
                      name="question"
                      rows="2"
                      value={form.question}
                      onChange={handleChange}
                      placeholder="Enter question text"
                      required
                    />
                  </div>
                  <div className="quiz-modal-field">
                    <label htmlFor="answer1">Answer 1</label>
                    <input
                      id="answer1"
                      name="answer1"
                      value={form.answer1}
                      onChange={handleChange}
                      placeholder="Enter answer 1"
                      required
                    />
                  </div>
                  <div className="quiz-modal-field">
                    <label htmlFor="answer2">Answer 2</label>
                    <input
                      id="answer2"
                      name="answer2"
                      value={form.answer2}
                      onChange={handleChange}
                      placeholder="Enter answer 2"
                      required
                    />
                  </div>
                  <div className="quiz-modal-field">
                    <label htmlFor="answer3">Answer 3</label>
                    <input
                      id="answer3"
                      name="answer3"
                      value={form.answer3}
                      onChange={handleChange}
                      placeholder="Enter answer 3"
                    />
                  </div>
                  <div className="quiz-modal-field">
                    <label htmlFor="answer4">Answer 4</label>
                    <input
                      id="answer4"
                      name="answer4"
                      value={form.answer4}
                      onChange={handleChange}
                      placeholder="Enter answer 4"
                    />
                  </div>
                  <div className="quiz-modal-field">
                    <label htmlFor="correctAnswer">Correct Answer</label>
                    <select id="correctAnswer" name="correctAnswer" value={form.correctAnswer} onChange={handleChange} required>
                      <option value="1">Answer 1</option>
                      <option value="2">Answer 2</option>
                      <option value="3">Answer 3</option>
                      <option value="4">Answer 4</option>
                    </select>
                  </div>
                  <div className="quiz-modal-field">
                    <label htmlFor="explanation">Explanation (Optional)</label>
                    <textarea
                      id="explanation"
                      name="explanation"
                      rows="2"
                      value={form.explanation}
                      onChange={handleChange}
                      placeholder="Explain the correct answer..."
                    />
                  </div>
                  <div className="quiz-modal-actions">
                    <button type="button" className="quiz-btn secondary" onClick={closeModal}>Cancel</button>
                    <button type="submit" className="quiz-btn primary" disabled={loading}>
                      {loading ? 'Saving...' : (modalMode === 'edit' ? 'Update Quiz' : 'Save Quiz')}
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Side - Mobile Preview */}
              <div className="game-modal-preview-section">
                <div className="game-preview-header">
                  <h3 className="game-preview-title">Mobile Preview</h3>
                </div>
                <QuizMobilePreview formData={form} />
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default TechniqueQuiz;
