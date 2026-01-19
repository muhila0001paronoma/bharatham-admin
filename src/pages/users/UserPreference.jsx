import React, { useState } from 'react';
import { Plus, SquarePen, Trash2 } from 'lucide-react';
import PreferenceModal from '../../components/users/PreferenceModal';
import ConfirmationModal from '../../components/ui/ConfirmationModal';
import { userPreferenceService } from '../../services/userPreferenceService';
import './UserPreference.css';

const UserPreference = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: null, // 'ADD_QUESTION', 'EDIT_QUESTION', 'ADD_ANSWER', 'EDIT_ANSWER'
    data: null, // qId for ADD_ANSWER, answer object for EDIT_ANSWER, question object for EDIT_QUESTION
    initialValue: null
  });

  const [deleteConfig, setDeleteConfig] = useState({
    isOpen: false,
    type: null, // 'ANSWER', 'QUESTION'
    data: null // { qId, answerId, text } or { qId, text }
  });

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const qResponse = await userPreferenceService.getAllQuestions();
      if (!qResponse.success) throw new Error(qResponse.message);

      const qs = qResponse.data;
      const questionsWithAnswers = await Promise.all(qs.map(async (q) => {
        const aResponse = await userPreferenceService.getAnswersByQuestionId(q.id);
        const answers = aResponse.success ? aResponse.data.map(a => ({ id: a.id, text: a.answer })) : [];
        return {
          id: q.id,
          question: q.question,
          answers: answers
        };
      }));

      setQuestions(questionsWithAnswers);
    } catch (err) {
      setError('Failed to fetch preference data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchAllData();
  }, []);

  // Modal Handlers
  const openAddQuestion = () => {
    setModalConfig({
      isOpen: true,
      type: 'ADD_QUESTION',
      data: null,
      initialValue: ''
    });
  };

  const openEditQuestion = (q) => {
    setModalConfig({
      isOpen: true,
      type: 'EDIT_QUESTION',
      data: q.id,
      initialValue: q.question
    });
  };

  const openAddAnswer = (qId) => {
    setModalConfig({
      isOpen: true,
      type: 'ADD_ANSWER',
      data: qId,
      initialValue: ''
    });
  };

  const openEditAnswer = (qId, answer) => {
    setModalConfig({
      isOpen: true,
      type: 'EDIT_ANSWER',
      data: { qId, answerId: answer.id },
      initialValue: answer.text
    });
  };

  const closeModal = () => {
    setModalConfig({ isOpen: false, type: null, data: null, initialValue: null });
  };

  const handleSave = async (text) => {
    if (!text.trim()) return;

    try {
      if (modalConfig.type === 'ADD_QUESTION') {
        const response = await userPreferenceService.createQuestion(text);
        if (response.success) {
          setQuestions([...questions, { id: response.data.id, question: text, answers: [] }]);
        }
      } else if (modalConfig.type === 'EDIT_QUESTION') {
        const qId = modalConfig.data;
        const response = await userPreferenceService.updateQuestion(qId, text);
        if (response.success) {
          setQuestions(questions.map(q => q.id === qId ? { ...q, question: text } : q));
        }
      } else if (modalConfig.type === 'ADD_ANSWER') {
        const qId = modalConfig.data;
        const response = await userPreferenceService.createAnswer(qId, text);
        if (response.success) {
          setQuestions(questions.map(q => {
            if (q.id === qId) {
              return {
                ...q,
                answers: [...q.answers, { id: response.data.id, text }]
              };
            }
            return q;
          }));
        }
      } else if (modalConfig.type === 'EDIT_ANSWER') {
        const { qId, answerId } = modalConfig.data;
        const response = await userPreferenceService.updateAnswer(answerId, qId, text);
        if (response.success) {
          setQuestions(questions.map(q => {
            if (q.id === qId) {
              return {
                ...q,
                answers: q.answers.map(a => a.id === answerId ? { ...a, text } : a)
              };
            }
            return q;
          }));
        }
      }
      closeModal();
    } catch (err) {
      console.error('Error saving:', err);
      alert('An error occurred while saving. Please try again.');
    }
  };

  // Delete Handlers
  const openDeleteAnswer = (qId, answer) => {
    setDeleteConfig({
      isOpen: true,
      type: 'ANSWER',
      data: { qId, answerId: answer.id, text: answer.text }
    });
  };

  const openDeleteQuestion = (q) => {
    setDeleteConfig({
      isOpen: true,
      type: 'QUESTION',
      data: { qId: q.id, text: q.question }
    });
  };

  const closeDeleteModal = () => {
    setDeleteConfig({ isOpen: false, type: null, data: null });
  };

  const handleConfirmDelete = async () => {
    try {
      if (deleteConfig.type === 'ANSWER') {
        const { qId, answerId } = deleteConfig.data;
        const response = await userPreferenceService.deleteAnswer(answerId);
        if (response.success) {
          setQuestions(questions.map(q => {
            if (q.id === qId) {
              return {
                ...q,
                answers: q.answers.filter(a => a.id !== answerId)
              };
            }
            return q;
          }));
        }
      } else if (deleteConfig.type === 'QUESTION') {
        const { qId } = deleteConfig.data;
        const response = await userPreferenceService.deleteQuestion(qId);
        if (response.success) {
          setQuestions(questions.filter(q => q.id !== qId));
        }
      }
      closeDeleteModal();
    } catch (err) {
      console.error('Error deleting:', err);
      alert('An error occurred while deleting. Please try again.');
    }
  };

  const getModalTitle = () => {
    switch (modalConfig.type) {
      case 'ADD_QUESTION': return 'Add New Question';
      case 'EDIT_QUESTION': return 'Edit Question';
      case 'ADD_ANSWER': return 'Add New Answer';
      case 'EDIT_ANSWER': return 'Edit Answer';
      default: return '';
    }
  };

  const getModalLabel = () => {
    switch (modalConfig.type) {
      case 'ADD_QUESTION': return 'Question Text';
      case 'EDIT_QUESTION': return 'Question Text';
      case 'ADD_ANSWER': return 'Answer Text';
      case 'EDIT_ANSWER': return 'Answer Text';
      default: return '';
    }
  };

  return (
    <div className="user-preference-page">
      <div className="mb-8">
        <h1 className="text-3xl font-normal text-[#1a237e]">User</h1>
      </div>

      <div className="preference-section">
        <div className="preference-header">
          <h2 className="preference-title">User Preferences</h2>
          <button className="add-question-btn" onClick={openAddQuestion}>
            <Plus size={18} />
            Add New Question
          </button>
        </div>

        <div className="preference-grid">
          {questions.map((q, index) => (
            <div key={q.id} className="question-card">
              <div className="question-header">
                <div className="question-info">
                  <div className="question-badge">Q{index + 1}</div>
                  <span className="question-text">{q.question}</span>
                  <div className="question-actions">
                    <button className="action-icon-btn edit-q" onClick={() => openEditQuestion(q)} title="Edit Question">
                      <SquarePen size={14} />
                    </button>
                    <button className="action-icon-btn delete-q" onClick={() => openDeleteQuestion(q)} title="Delete Question">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <button className="add-answer-btn" onClick={() => openAddAnswer(q.id)}>
                  <Plus size={14} />
                  Add Answer
                </button>
              </div>

              <div className="answers-list">
                {q.answers.map((answer) => (
                  <div key={answer.id} className="answer-item">
                    <span className="answer-text">{answer.text}</span>
                    <div className="answer-actions">
                      <button className="action-icon-btn edit" onClick={() => openEditAnswer(q.id, answer)}>
                        <SquarePen size={18} />
                      </button>
                      <button className="action-icon-btn delete" onClick={() => openDeleteAnswer(q.id, answer)}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <PreferenceModal
        isOpen={modalConfig.isOpen}
        onClose={closeModal}
        onSave={handleSave}
        initialData={modalConfig.initialValue}
        title={getModalTitle()}
        label={getModalLabel()}
        placeholder="Enter text here..."
      />

      <ConfirmationModal
        isOpen={deleteConfig.isOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title={deleteConfig.type === 'QUESTION' ? "Delete Question" : "Delete Answer"}
        message={`Are you sure you want to delete the ${deleteConfig.type === 'QUESTION' ? 'question' : 'answer'} "${deleteConfig.data?.text}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        icon={Trash2}
      />
    </div>
  );
};

export default UserPreference;

