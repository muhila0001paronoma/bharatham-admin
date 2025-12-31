import React, { useState, useEffect } from 'react';
import './QuizPage.css';
import { getTechniqueQuizSubTopics, getTechniqueQuizQuestions } from '../../data/data.js';
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
  const [subTopics, setSubTopics] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedSubTopic, setSelectedSubTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [form, setForm] = useState({
    title: '',
    totalQuestions: 5,
    type: 'Technique',
    notes: ''
  });

  // Answer edit/delete modals
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [answerModalMode, setAnswerModalMode] = useState('add'); // 'add' | 'edit'
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerForm, setAnswerForm] = useState({ text: '', correct: false });
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [answerToDelete, setAnswerToDelete] = useState(null);

  useEffect(() => {
    const loadQuizData = async () => {
      const subTopicsData = await getTechniqueQuizSubTopics();
      const questionsData = await getTechniqueQuizQuestions();
      setSubTopics(subTopicsData);
      setQuestions(questionsData);
      if (subTopicsData.length > 0) {
        setSelectedSubTopic(subTopicsData[0]);
      }
    };
    loadQuizData();
  }, []);

  // Filter sub topics based on search
  const filteredSubTopics = subTopics.filter(topic =>
    topic.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (mode = 'add', defaults = {}) => {
    setModalMode(mode);
    setForm({
      title: defaults.title ?? '',
      totalQuestions: defaults.totalQuestions ?? 5,
      type: defaults.type ?? 'Technique',
      notes: defaults.notes ?? ''
    });
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // placeholder: integrate API call for add/edit quiz
    closeModal();
  };

  // Sub Topic handlers
  const handleSubTopicClick = (topic) => {
    setSelectedSubTopic(topic);
  };

  // Answer handlers
  const handleAddAnswer = (question) => {
    setSelectedQuestion(question);
    setSelectedAnswer(null);
    setAnswerForm({ text: '', correct: false });
    setAnswerModalMode('add');
    setShowAnswerModal(true);
  };

  const handleEditAnswer = (question, answer, answerIndex) => {
    setSelectedQuestion(question);
    setSelectedAnswer({ ...answer, index: answerIndex });
    setAnswerForm({ text: answer.text, correct: answer.correct || false });
    setAnswerModalMode('edit');
    setShowAnswerModal(true);
  };

  const handleDeleteAnswer = (question, answerIndex) => {
    setSelectedQuestion(question);
    setAnswerToDelete({ question, answerIndex });
    setShowDeleteConfirm(true);
  };

  const confirmDeleteAnswer = () => {
    if (answerToDelete) {
      setQuestions(prev => prev.map(q => {
        if (q.id === answerToDelete.question.id) {
          return {
            ...q,
            answers: q.answers.filter((_, idx) => idx !== answerToDelete.answerIndex)
          };
        }
        return q;
      }));
      setShowDeleteConfirm(false);
      setAnswerToDelete(null);
    }
  };

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (!selectedQuestion) return;

    setQuestions(prev => prev.map(q => {
      if (q.id === selectedQuestion.id) {
        if (answerModalMode === 'edit' && selectedAnswer !== null) {
          // Update existing answer
          const newAnswers = [...q.answers];
          newAnswers[selectedAnswer.index] = {
            text: answerForm.text,
            correct: answerForm.correct
          };
          return { ...q, answers: newAnswers };
        } else {
          // Add new answer
          return {
            ...q,
            answers: [...q.answers, {
              text: answerForm.text,
              correct: answerForm.correct
            }]
          };
        }
      }
      return q;
    }));

    setShowAnswerModal(false);
    setSelectedQuestion(null);
    setSelectedAnswer(null);
    setAnswerForm({ text: '', correct: false });
  };

  const handleAnswerChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAnswerForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const totalQuizzes = questions.length;
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
            {filteredSubTopics.map((name) => (
              <button
                key={name}
                className={`quiz-subtopic ${selectedSubTopic === name ? 'active' : ''}`}
                onClick={() => handleSubTopicClick(name)}
              >
                {name}
              </button>
            ))}
          </div>
        </aside>

        {/* Right Content - Questions */}
        <section className="quiz-main-area">
          <div className="quiz-main-header">
            <span className="quiz-total-count">Total Questions - {questions.length.toString().padStart(2, '0')}</span>
            <button className="quiz-btn primary" onClick={() => openModal('add')}>
              <Plus size={18} style={{ marginRight: '6px' }} />
              Add New Quiz
            </button>
          </div>

          <div className="quiz-questions-list">
            {questions.map((q, qIdx) => (
              <div key={q.id} className="quiz-card">
                <div className="quiz-card-header">
                  <div className="quiz-chip">Q{qIdx + 1}</div>
                  <h4 className="quiz-question-text">{q.question}</h4>
                  <button
                    className="quiz-btn add-answer-btn"
                    onClick={() => handleAddAnswer(q)}
                  >
                    <Plus size={14} />
                    Add Answer
                  </button>
                </div>

                <div className="quiz-answers">
                  {q.answers.map((ans, ansIdx) => (
                    <div key={ansIdx} className="quiz-answer">
                      <span className="quiz-answer-text">{ans.text}</span>
                      <div className="quiz-answer-actions">
                        {ans.correct && (
                          <span className="quiz-pill success">
                            Correct Answer
                          </span>
                        )}
                        <button
                          className="data-table-action-button data-table-action-edit"
                          aria-label="edit"
                          onClick={() => handleEditAnswer(q, ans, ansIdx)}
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className="data-table-action-button data-table-action-delete"
                          aria-label="delete"
                          onClick={() => handleDeleteAnswer(q, ansIdx)}
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {q.note && (
                  <div className="quiz-note-wrapper">
                    <p className="quiz-note-text">{q.note}</p>
                    <button className="data-table-action-button data-table-action-edit note-edit" aria-label="edit note">
                      <Edit size={16} />
                    </button>
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
                    <label htmlFor="title">Quiz Title</label>
                    <input
                      id="title"
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      placeholder="Enter quiz title"
                      required
                    />
                  </div>
                  <div className="quiz-modal-field">
                    <label htmlFor="totalQuestions">Total Questions</label>
                    <input
                      id="totalQuestions"
                      name="totalQuestions"
                      type="number"
                      min="1"
                      value={form.totalQuestions}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="quiz-modal-field">
                    <label htmlFor="type">Quiz Type</label>
                    <select id="type" name="type" value={form.type} onChange={handleChange}>
                      <option value="Technique">Technique</option>
                      <option value="Theory">Theory</option>
                    </select>
                  </div>
                  <div className="quiz-modal-field">
                    <label htmlFor="notes">Notes</label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows="3"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Any additional details..."
                    />
                  </div>
                  <div className="quiz-modal-actions">
                    <button type="button" className="quiz-btn secondary" onClick={closeModal}>Cancel</button>
                    <button type="submit" className="quiz-btn primary">Save Quiz</button>
                  </div>
                </form>
              </div>

              {/* Right Side - Mobile Preview */}
              <div className="quiz-modal-preview-section">
                <div className="quiz-preview-header">
                  <h3 className="quiz-preview-title">Mobile Preview</h3>
                </div>
                <QuizMobilePreview formData={form} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Answer Modal */}
      {showAnswerModal && (
        <div className="quiz-modal-overlay" role="dialog" aria-modal="true" onClick={() => setShowAnswerModal(false)}>
          <div className="quiz-modal-content quiz-modal-small" onClick={(e) => e.stopPropagation()}>
            <div className="quiz-modal-header">
              <h3 className="quiz-modal-title">
                {answerModalMode === 'edit' ? 'Edit Answer' : 'Add Answer'}
              </h3>
              <button className="quiz-modal-close" aria-label="Close" onClick={() => setShowAnswerModal(false)}>✕</button>
            </div>
            <form className="quiz-modal-form" onSubmit={handleAnswerSubmit}>
              <div className="quiz-modal-field">
                <label htmlFor="answerText">Answer Text</label>
                <input
                  id="answerText"
                  name="text"
                  value={answerForm.text}
                  onChange={handleAnswerChange}
                  placeholder="Enter answer text"
                  required
                />
              </div>
              <div className="quiz-modal-field">
                <label className="quiz-checkbox-label">
                  <input
                    type="checkbox"
                    name="correct"
                    checked={answerForm.correct}
                    onChange={handleAnswerChange}
                  />
                  <span>Mark as Correct Answer</span>
                </label>
              </div>
              <div className="quiz-modal-actions">
                <button type="button" className="quiz-btn secondary" onClick={() => setShowAnswerModal(false)}>Cancel</button>
                <button type="submit" className="quiz-btn primary">
                  {answerModalMode === 'edit' ? 'Update' : 'Add'} Answer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="quiz-modal-overlay" role="dialog" aria-modal="true" onClick={() => setShowDeleteConfirm(false)}>
          <div className="quiz-modal-content quiz-modal-small" onClick={(e) => e.stopPropagation()}>
            <div className="quiz-modal-header">
              <h3 className="quiz-modal-title">Delete Answer</h3>
              <button className="quiz-modal-close" aria-label="Close" onClick={() => setShowDeleteConfirm(false)}>✕</button>
            </div>
            <div className="quiz-modal-body">
              <p>Are you sure you want to delete this answer? This action cannot be undone.</p>
              <div className="quiz-modal-actions">
                <button type="button" className="quiz-btn secondary" onClick={() => setShowDeleteConfirm(false)}>Cancel</button>
                <button type="button" className="quiz-btn danger" onClick={confirmDeleteAnswer}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TechniqueQuiz;
