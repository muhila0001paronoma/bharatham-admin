import React, { useState, useEffect } from 'react';
import './QuizPage.css';
import { theoryQuizService } from '../../services/theoryQuizService';
import QuizMobilePreview from '../../components/quiz/QuizMobilePreview';
import {
  Search,
  Plus,
  Edit,
  Trash2,
  ExternalLink,
  BookOpen,
  FileText,
  HelpCircle,
  Loader
} from 'lucide-react';
import './../../components/ui/DataTable.css';

const TheoryQuiz = () => {
  const [subTopics, setSubTopics] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [selectedSubTopic, setSelectedSubTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'
  const [editingId, setEditingId] = useState(null);

  // Form State (for Question)
  const [form, setForm] = useState({
    question: '',
    answers: ['', '', '', ''],
    correctIndex: 0,
    explanation: ''
  });

  const [deleteConfirm, setDeleteConfirm] = useState({
    show: false,
    id: null
  });

  // Load Sub Topics (Theory Details)
  useEffect(() => {
    fetchSubTopics();
  }, []);

  const fetchSubTopics = async () => {
    try {
      const response = await theoryQuizService.getAllTheoryDetails();
      if (response && response.data) {
        setSubTopics(response.data);
        if (response.data.length > 0 && !selectedSubTopic) {
          setSelectedSubTopic(response.data[0]);
        }
      }
    } catch (error) {
      console.error('Failed to load sub topics', error);
    }
  };

  // Load Questions when Sub Topic changes
  useEffect(() => {
    if (selectedSubTopic?.detailId) {
      fetchQuestions(selectedSubTopic.detailId);
    } else {
      setQuestions([]);
    }
  }, [selectedSubTopic]);

  const fetchQuestions = async (detailId) => {
    setIsLoading(true);
    try {
      const response = await theoryQuizService.getQuizzesByDetailId(detailId);
      if (response && response.data) {
        setQuestions(response.data);
      } else {
        setQuestions([]);
      }
    } catch (error) {
      console.error('Failed to load questions', error);
      setQuestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter sub topics based on search
  const filteredSubTopics = subTopics.filter(topic =>
    topic.subTopicName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Form Handlers
  const handleOpenAdd = () => {
    setModalMode('add');
    setForm({
      question: '',
      answers: ['', '', '', ''],
      correctIndex: 0,
      explanation: ''
    });
    setEditingId(null);
    setShowModal(true);
  };

  const handleOpenEdit = (q) => {
    setModalMode('edit');
    setEditingId(q.id);

    // Determine correct index based on text match
    // Backend correct answer is the text string
    const answers = [q.answer1, q.answer2, q.answer3, q.answer4];
    let cIndex = answers.findIndex(a => a === q.correctAnswer);
    if (cIndex === -1) cIndex = 0; // Fallback

    setForm({
      question: q.question,
      answers: answers,
      correctIndex: cIndex,
      explanation: q.explanation || ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleFormChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...form.answers];
    newAnswers[index] = value;
    setForm(prev => ({ ...prev, answers: newAnswers }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedSubTopic) return;

    // Validation
    if (!form.question.trim()) return alert("Question is required");
    if (form.answers.some(a => !a.trim())) return alert("All 4 answers are required");

    const payload = {
      theoryDetailId: selectedSubTopic.detailId,
      question: form.question,
      answer1: form.answers[0],
      answer2: form.answers[1],
      answer3: form.answers[2],
      answer4: form.answers[3],
      correctAnswer: form.answers[form.correctIndex],
      explanation: form.explanation
    };

    try {
      if (modalMode === 'add') {
        await theoryQuizService.createQuiz(payload);
      } else {
        await theoryQuizService.updateQuiz(editingId, payload);
      }
      closeModal();
      fetchQuestions(selectedSubTopic.detailId);
    } catch (error) {
      console.error('Failed to save quiz', error);
      alert('Failed to save quiz. Please try again.');
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteConfirm({ show: true, id });
  };

  const confirmDelete = async () => {
    if (deleteConfirm.id) {
      try {
        await theoryQuizService.deleteQuiz(deleteConfirm.id);
        fetchQuestions(selectedSubTopic.detailId);
      } catch (error) {
        console.error('Failed to delete quiz', error);
      }
    }
    setDeleteConfirm({ show: false, id: null });
  };

  // Stats
  const totalSubTopics = subTopics.length;
  const totalQuestions = questions.length;

  return (
    <div className="quiz-page">
      <div className="theory-page-header">
        <div className="theory-page-header-content">
          <div className="theory-page-header-left">
            <div className="theory-page-header-icon">
              <HelpCircle size={28} />
            </div>
            <div>
              <h1 className="theory-page-header-title">Theory Quiz</h1>
              <p className="theory-page-header-subtitle">Manage questions for {selectedSubTopic ? selectedSubTopic.subTopicName : 'Theory Topics'}</p>
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
                <div className="theory-page-stat-value">{totalQuestions}</div>
                <div className="theory-page-stat-label">Questions</div>
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
                key={topic.detailId}
                className={`quiz-subtopic ${selectedSubTopic?.detailId === topic.detailId ? 'active' : ''}`}
                onClick={() => setSelectedSubTopic(topic)}
              >
                {topic.subTopicName}
              </button>
            ))}
            {filteredSubTopics.length === 0 && (
              <div className="quiz-empty-state">No sub topics found</div>
            )}
          </div>
        </aside>

        {/* Right Content - Questions */}
        <section className="quiz-main-area">
          <div className="quiz-main-header">
            <span className="quiz-total-count">
              {selectedSubTopic ? `Questions for ${selectedSubTopic.subTopicName}` : 'Select a Sub Topic'}
              {selectedSubTopic && ` - ${questions.length} Items`}
            </span>
            <button
              className="quiz-btn primary"
              onClick={handleOpenAdd}
              disabled={!selectedSubTopic}
            >
              <Plus size={18} style={{ marginRight: '6px' }} />
              Add Question
            </button>
          </div>

          {isLoading ? (
            <div className="quiz-loading">
              <Loader className="animate-spin" size={32} />
              <p>Loading questions...</p>
            </div>
          ) : (
            <div className="quiz-questions-list">
              {questions.length === 0 && selectedSubTopic && (
                <div className="quiz-empty-message">No questions found for this topic. Add one to get started.</div>
              )}
              {questions.map((q, qIdx) => (
                <div key={q.id} className="quiz-card">
                  <div className="quiz-card-header">
                    <div className="quiz-chip">Q{qIdx + 1}</div>
                    <h4 className="quiz-question-text">{q.question}</h4>
                    <div className="quiz-card-actions">
                      <button
                        className="data-table-action-button data-table-action-edit"
                        aria-label="edit"
                        onClick={() => handleOpenEdit(q)}
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        className="data-table-action-button data-table-action-delete"
                        aria-label="delete"
                        onClick={() => handleDeleteClick(q.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="quiz-answers">
                    {[q.answer1, q.answer2, q.answer3, q.answer4].map((ans, ansIdx) => {
                      const isCorrect = ans === q.correctAnswer;
                      return (
                        <div key={ansIdx} className={`quiz-answer ${isCorrect ? 'correct-answer-row' : ''}`}>
                          <span className="quiz-answer-text">{String.fromCharCode(65 + ansIdx)}. {ans}</span>
                          {isCorrect && (
                            <span className="quiz-pill success">Correct Answer</span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {q.explanation && (
                    <div className="quiz-note-wrapper">
                      <p className="quiz-note-text"><strong>Explanation:</strong> {q.explanation}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {showModal && (
        <div className="quiz-modal-overlay" role="dialog" aria-modal="true" onClick={closeModal}>
          <div className="quiz-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="quiz-modal-header">
              <h3 className="quiz-modal-title">
                {modalMode === 'edit' ? 'Edit Question' : 'Add New Question'}
              </h3>
              <button className="quiz-modal-close" aria-label="Close" onClick={closeModal}>✕</button>
            </div>
            <div className="quiz-modal-body">
              {/* Left Side - Form */}
              <div className="quiz-modal-form-section">
                <form className="quiz-modal-form" onSubmit={handleSave}>
                  <div className="quiz-modal-field">
                    <label htmlFor="question">Question Text</label>
                    <textarea
                      id="question"
                      value={form.question}
                      onChange={(e) => handleFormChange('question', e.target.value)}
                      placeholder="Enter question..."
                      rows="3"
                      required
                    />
                  </div>

                  <div className="quiz-answers-input-group">
                    <label>Answers (Select the radio button for the correct answer)</label>
                    {form.answers.map((ans, idx) => (
                      <div key={idx} className="quiz-answer-input-row">
                        <input
                          type="radio"
                          name="correctAnswer"
                          checked={form.correctIndex === idx}
                          onChange={() => handleFormChange('correctIndex', idx)}
                          className="quiz-correct-radio"
                          title="Mark as correct"
                        />
                        <div className="input-with-label-prefix">
                          <span className="input-prefix">{String.fromCharCode(65 + idx)}</span>
                          <input
                            value={ans}
                            onChange={(e) => handleAnswerChange(idx, e.target.value)}
                            placeholder={`Answer Option ${idx + 1}`}
                            required
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="quiz-modal-field">
                    <label htmlFor="explanation">Explanation / Notes (Optional)</label>
                    <textarea
                      id="explanation"
                      value={form.explanation}
                      onChange={(e) => handleFormChange('explanation', e.target.value)}
                      placeholder="Explain why the answer is correct..."
                      rows="2"
                    />
                  </div>

                  <div className="quiz-modal-actions">
                    <button type="button" className="quiz-btn secondary" onClick={closeModal}>Cancel</button>
                    <button type="submit" className="quiz-btn primary">Save Question</button>
                  </div>
                </form>
              </div>

              {/* Right Side - Mobile Preview */}
              <div className="quiz-modal-preview-section">
                <div className="quiz-preview-header">
                  <h3 className="quiz-preview-title">Mobile Preview</h3>
                </div>
                <QuizMobilePreview
                  formData={{
                    title: selectedSubTopic?.subTopicName || 'Quiz',
                    notes: form.explanation
                  }}
                  questionData={{
                    question: form.question || 'Your question here...',
                    options: form.answers.map(a => a || 'Option...')
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div className="quiz-modal-overlay" role="dialog" aria-modal="true" onClick={() => setDeleteConfirm({ show: false, id: null })}>
          <div className="quiz-modal-content quiz-modal-small" onClick={(e) => e.stopPropagation()}>
            <div className="quiz-modal-header">
              <h3 className="quiz-modal-title">Delete Question</h3>
              <button className="quiz-modal-close" aria-label="Close" onClick={() => setDeleteConfirm({ show: false, id: null })}>✕</button>
            </div>
            <div className="quiz-modal-body">
              <p>Are you sure you want to delete this question? This action cannot be undone.</p>
              <div className="quiz-modal-actions">
                <button type="button" className="quiz-btn secondary" onClick={() => setDeleteConfirm({ show: false, id: null })}>Cancel</button>
                <button type="button" className="quiz-btn danger" onClick={confirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheoryQuiz;
