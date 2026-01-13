import React, { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { Input } from '../ui/input';
import GameMobilePreview from './GameMobilePreview';
import './GameModal.css';

export default function QuestionModal({ isOpen, onClose, onSave, questionData = null, gameId, isLoading = false }) {
  const [formData, setFormData] = useState({
    question: '',
    imgUrl: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    correctAnswer: '1'
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (questionData) {
      setFormData({
        question: questionData.question || '',
        imgUrl: questionData.imgUrl || '',
        answer1: questionData.answer1 || '',
        answer2: questionData.answer2 || '',
        answer3: questionData.answer3 || '',
        answer4: questionData.answer4 || '',
        correctAnswer: questionData.correctAnswer || '1'
      });
    } else {
      setFormData({
        question: '',
        imgUrl: '',
        answer1: '',
        answer2: '',
        answer3: '',
        answer4: '',
        correctAnswer: '1'
      });
    }
  }, [questionData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        imageFile: file,
        imgUrl: URL.createObjectURL(file)
      }));
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      imgUrl: '',
      imageFile: null
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.answer1 || !formData.answer2 || !formData.answer3 || !formData.answer4) {
      alert('Please fill all answer options');
      return;
    }
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="game-modal-overlay" onClick={onClose}>
      <div className="game-modal-content question-modal" onClick={(e) => e.stopPropagation()}>
        <div className="game-modal-header">
          <h2 className="game-modal-title">
            {questionData ? 'Update Question' : 'Add New Question'}
          </h2>
          <button className="game-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="game-modal-body">
          <div className="game-modal-form-section">
            <form onSubmit={handleSubmit} className="game-form">
              <div className="game-form-group">
                <label htmlFor="question" className="game-form-label">
                  Question
                </label>
                <textarea
                  id="question"
                  name="question"
                  value={formData.question}
                  onChange={handleChange}
                  placeholder="Enter question text"
                  className="game-form-textarea"
                  rows="3"
                  required
                />
              </div>

              <div className="game-form-group">
                <label htmlFor="imgUrl" className="game-form-label">
                  Question Image
                </label>
                <div className="game-form-image-upload">
                  <input
                    id="imgUrl"
                    name="imgUrl"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="game-form-file-input"
                  />
                  {formData.imgUrl && (
                    <div className="game-form-image-preview">
                      <img src={formData.imgUrl} alt="Preview" onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200x200?text=Invalid+Image';
                      }} />
                      <button
                        type="button"
                        className="game-form-image-remove"
                        onClick={handleRemoveImage}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="game-form-group">
                <label className="game-form-label">Answer Options</label>
                <div className="game-form-answers">
                  {[
                    { key: 'answer1', label: 'Answer 1', num: '1' },
                    { key: 'answer2', label: 'Answer 2', num: '2' },
                    { key: 'answer3', label: 'Answer 3', num: '3' },
                    { key: 'answer4', label: 'Answer 4', num: '4' }
                  ].map((answer) => (
                    <div key={answer.key} className="game-form-answer-item">
                      <Input
                        id={answer.key}
                        name={answer.key}
                        type="text"
                        value={formData[answer.key]}
                        onChange={handleChange}
                        placeholder={`Enter ${answer.label.toLowerCase()}`}
                        required
                      />
                      <label className="game-form-radio-label">
                        <input
                          type="radio"
                          name="correctAnswer"
                          value={answer.num}
                          checked={formData.correctAnswer === answer.num}
                          onChange={handleChange}
                          className="game-form-radio"
                        />
                        <span>Correct</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="game-form-actions">
                <button type="button" className="game-form-cancel-btn" onClick={onClose} disabled={isLoading}>
                  Cancel
                </button>
                <button type="submit" className="game-form-submit-btn" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 size={16} className="animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>{questionData ? 'Update' : 'Add'} Question</>
                  )}
                </button>
              </div>
            </form>
          </div>

          <div className="game-modal-preview-section">
            <div className="game-preview-header">
              <h3 className="game-preview-title">Mobile Preview</h3>
            </div>
            <GameMobilePreview
              formData={{ gameName: 'Preview Game' }}
              gameQuestions={formData.question ? [{
                id: 'preview',
                gameId: gameId || 1,
                question: formData.question,
                imgUrl: formData.imgUrl,
                answer1: formData.answer1,
                answer2: formData.answer2,
                answer3: formData.answer3,
                answer4: formData.answer4,
                correctAnswer: formData.correctAnswer,
                active: true
              }] : []}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

