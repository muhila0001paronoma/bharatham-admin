import React, { useState } from 'react';
import { Plus, SquarePen, Trash2 } from 'lucide-react';
import PreferenceModal from '../../components/users/PreferenceModal';
import ConfirmationModal from '../../components/ui/ConfirmationModal';
import './UserPreference.css';

const UserPreference = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "What is your learning level?",
      answers: [
        { id: 1, text: "Beginner" },
        { id: 2, text: "Intermediate" },
        { id: 3, text: "Advanced" }
      ]
    },
    {
      id: 2,
      question: "How long is your dance experience?",
      answers: [
        { id: 1, text: "No Experience" },
        { id: 2, text: "1 - 2 Years" },
        { id: 3, text: "2 - 5 Years" },
        { id: 4, text: "5+ Years" }
      ]
    },
    {
      id: 3,
      question: "Your Focus Areas?",
      answers: [
        { id: 1, text: "Nritta" },
        { id: 2, text: "Abhinayam" },
        { id: 3, text: "Mutras" },
        { id: 4, text: "Footwork & Rhythm" },
        { id: 5, text: "Varnam" }
      ]
    },
    {
      id: 4,
      question: "How many classes do you attend weekly?",
      answers: [
        { id: 1, text: "1" },
        { id: 2, text: "2" },
        { id: 3, text: "3" },
        { id: 4, text: "4" },
        { id: 5, text: "5" },
        { id: 6, text: "6" },
        { id: 7, text: "7" }
      ]
    }
  ]);

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    type: null, // 'ADD_QUESTION', 'ADD_ANSWER', 'EDIT_ANSWER'
    data: null, // qId for ADD_ANSWER, answer object for EDIT_ANSWER
    initialValue: null
  });

  const [deleteConfig, setDeleteConfig] = useState({
    isOpen: false,
    type: null, // 'ANSWER' (could extend to QUESTION later)
    data: null // { qId, answerId, text }
  });

  // Modal Handlers
  const openAddQuestion = () => {
    setModalConfig({
      isOpen: true,
      type: 'ADD_QUESTION',
      data: null,
      initialValue: ''
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

  const handleSave = (text) => {
    if (!text.trim()) return;

    if (modalConfig.type === 'ADD_QUESTION') {
      const newQuestion = {
        id: Date.now(),
        question: text,
        answers: []
      };
      setQuestions([...questions, newQuestion]);
    } else if (modalConfig.type === 'ADD_ANSWER') {
      const qId = modalConfig.data;
      setQuestions(questions.map(q => {
        if (q.id === qId) {
          return {
            ...q,
            answers: [...q.answers, { id: Date.now(), text }]
          };
        }
        return q;
      }));
    } else if (modalConfig.type === 'EDIT_ANSWER') {
      const { qId, answerId } = modalConfig.data;
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
    closeModal();
  };

  // Delete Handlers
  const openDeleteAnswer = (qId, answer) => {
    setDeleteConfig({
      isOpen: true,
      type: 'ANSWER',
      data: { qId, answerId: answer.id, text: answer.text }
    });
  };

  const closeDeleteModal = () => {
    setDeleteConfig({ isOpen: false, type: null, data: null });
  };

  const handleConfirmDelete = () => {
    if (deleteConfig.type === 'ANSWER') {
      const { qId, answerId } = deleteConfig.data;
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
    closeDeleteModal();
  };

  const getModalTitle = () => {
    switch (modalConfig.type) {
      case 'ADD_QUESTION': return 'Add New Question';
      case 'ADD_ANSWER': return 'Add New Answer';
      case 'EDIT_ANSWER': return 'Edit Answer';
      default: return '';
    }
  };

  const getModalLabel = () => {
    switch (modalConfig.type) {
      case 'ADD_QUESTION': return 'Question Text';
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
        title="Delete Answer"
        message={`Are you sure you want to delete the answer "${deleteConfig.data?.text}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
        icon={Trash2}
      />
    </div>
  );
};

export default UserPreference;

