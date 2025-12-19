import React, { useState, useEffect } from 'react';
import './QuizPage.css';
import { getTheoryQuizSubTopics, getTheoryQuizQuestions } from '../../data/data.js';
import QuizMobilePreview from '../../components/quiz/QuizMobilePreview';

const TheoryQuiz = () => {
  const [subTopics, setSubTopics] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedSubTopic, setSelectedSubTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [form, setForm] = useState({
    title: '',
    totalQuestions: 5,
    type: 'Theory',
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
      const subTopicsData = await getTheoryQuizSubTopics();
      const questionsData = await getTheoryQuizQuestions();
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
      type: defaults.type ?? 'Theory',
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

  return (
    <div className="quiz-page">
      <div className="quiz-top">
        <h2 className="quiz-title">Theory Quiz</h2>
        <div className="quiz-meta-actions">
          <div className="quiz-total">Total Questions - 05</div>
          <div className="quiz-actions">
            <button className="quiz-btn primary" onClick={() => openModal('add')}>Add New Quiz</button>
            <button
              className="quiz-btn secondary"
              onClick={() =>
                openModal('edit', {
                  title: 'Theory Quiz - Anjali',
                  totalQuestions: 5,
                  type: 'Theory',
                  notes: 'Edit quiz details and questions here.'
                })
              }
            >
              Edit Quiz
            </button>
          </div>
        </div>
      </div>

      <div className="quiz-content">
        <aside className="quiz-left">
          <div className="quiz-left-header">
            <h3>Sub Topics</h3>
            <button className="quiz-icon-btn" aria-label="refresh">⟲</button>
          </div>
          <div className="quiz-search">
            <span className="quiz-search-icon">🔍</span>
            <input 
              placeholder="Search Sub Topic..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
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

        <section className="quiz-right">

          {questions.map((q, qIdx) => (
            <div key={q.id} className="quiz-card">
              <div className="quiz-card-header">
                <div className="quiz-chip">{q.id}</div>
                <h4>{q.question}</h4>
                <button 
                  className="quiz-btn ghost" 
                  onClick={() => handleAddAnswer(q)}
                >
                  Add Answer
                </button>
              </div>

              <div className="quiz-answers">
                {q.answers.map((ans, ansIdx) => (
                  <div key={ansIdx} className="quiz-answer">
                    <span>{ans.text}</span>
                    <div className="quiz-answer-actions">
                      {ans.correct && <span className="quiz-pill">Correct Answer</span>}
                      <button 
                        className="quiz-icon-link" 
                        aria-label="edit"
                        onClick={() => handleEditAnswer(q, ans, ansIdx)}
                      >
                        ✎
                      </button>
                      <button 
                        className="quiz-icon-link danger" 
                        aria-label="delete"
                        onClick={() => handleDeleteAnswer(q, ansIdx)}
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="quiz-note">
                {q.note}
                <button className="quiz-icon-link" aria-label="edit note">✎</button>
              </div>
            </div>
          ))}
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
                      <option value="Theory">Theory</option>
                      <option value="Technique">Technique</option>
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

export default TheoryQuiz;

