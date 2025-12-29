import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Input } from '../ui/input';
import GameMobilePreview from './GameMobilePreview';
import './GameModal.css';

export default function GameModal({ isOpen, onClose, onSave, gameData = null, questions = [] }) {
  const [formData, setFormData] = useState({
    gameName: '',
    description: '',
    imgUrl: '',
    totalPoints: 100,
    timeDuration: 300,
    mode: 'practice'
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
    if (gameData) {
      setFormData({
        gameName: gameData.gameName || '',
        description: gameData.description || '',
        imgUrl: gameData.imgUrl || '',
        totalPoints: gameData.totalPoints || 100,
        timeDuration: gameData.timeDuration || 300,
        mode: gameData.mode || 'practice'
      });
    } else {
      setFormData({
        gameName: '',
        description: '',
        imgUrl: '',
        totalPoints: 100,
        timeDuration: 300,
        mode: 'practice'
      });
    }
  }, [gameData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'totalPoints' || name === 'timeDuration' ? parseInt(value) || 0 : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imgUrl: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({
      ...prev,
      imgUrl: ''
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="game-modal-overlay" onClick={onClose}>
      <div className="game-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="game-modal-header">
          <h2 className="game-modal-title">
            {gameData ? 'Update Game' : 'Add New Game'}
          </h2>
          <button className="game-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="game-modal-body">
          <div className="game-modal-form-section">
            <form onSubmit={handleSubmit} className="game-form">
          <div className="game-form-group">
            <label htmlFor="gameName" className="game-form-label">
              Game Name
            </label>
            <Input
              id="gameName"
              name="gameName"
              type="text"
              value={formData.gameName}
              onChange={handleChange}
              placeholder="Enter game name"
              required
            />
          </div>

          <div className="game-form-group">
            <label htmlFor="description" className="game-form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter game description"
              className="game-form-textarea"
              rows="3"
              required
            />
          </div>

          <div className="game-form-group">
            <label htmlFor="imgUrl" className="game-form-label">
              Game Image
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

          <div className="game-form-row">
            <div className="game-form-group">
              <label htmlFor="totalPoints" className="game-form-label">
                Total Points
              </label>
              <Input
                id="totalPoints"
                name="totalPoints"
                type="number"
                value={formData.totalPoints}
                onChange={handleChange}
                placeholder="100"
                min="1"
                required
              />
            </div>

            <div className="game-form-group">
              <label htmlFor="timeDuration" className="game-form-label">
                Time Duration (seconds)
              </label>
              <Input
                id="timeDuration"
                name="timeDuration"
                type="number"
                value={formData.timeDuration}
                onChange={handleChange}
                placeholder="300"
                min="1"
                required
              />
            </div>
          </div>

          <div className="game-form-group">
            <label htmlFor="mode" className="game-form-label">
              Mode
            </label>
            <select
              id="mode"
              name="mode"
              value={formData.mode}
              onChange={handleChange}
              className="game-form-select"
              required
            >
              <option value="practice">Practice</option>
              <option value="challenge">Challenge</option>
              <option value="timed">Timed</option>
            </select>
          </div>

              <div className="game-form-actions">
                <button type="button" className="game-form-cancel-btn" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="game-form-submit-btn">
                  {gameData ? 'Update' : 'Add'} Game
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

