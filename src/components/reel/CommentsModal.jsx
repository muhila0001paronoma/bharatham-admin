import React, { useState, useEffect } from 'react';
import { X, Heart } from 'lucide-react';
import { reelsData } from '../../data/data';
import './CommentsModal.css';

export default function CommentsModal({ isOpen, onClose, reel }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (isOpen && reel) {
      const reelComments = reelsData.comments[reel.id] || [];
      setComments(reelComments);
    }
  }, [isOpen, reel]);

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

  const formatDate = (dateString) => {
    if (!dateString) return '';
    // Handle 'YYYY-MM-DD HH:MM:SS' format
    const date = new Date(dateString.replace(' ', 'T'));
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen || !reel) return null;

  return (
    <div className="comments-modal-overlay" onClick={onClose}>
      <div className="comments-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="comments-modal-header">
          <div>
            <h2 className="comments-modal-title">Comments</h2>
            <p className="comments-modal-subtitle">{reel.title}</p>
          </div>
          <button className="comments-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="comments-modal-body">
          {comments.length === 0 ? (
            <div className="comments-empty-state">
              <p>No comments yet</p>
            </div>
          ) : (
            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-avatar">
                    {comment.userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="comment-content">
                    <div className="comment-header">
                      <div className="comment-user-info">
                        <span className="comment-user-name">{comment.userName}</span>
                        <span className="comment-user-email">{comment.userEmail}</span>
                      </div>
                      <span className="comment-date">{formatDate(comment.commentedAt)}</span>
                    </div>
                    <div className="comment-text">{comment.comment}</div>
                    <div className="comment-footer">
                      <button className="comment-like-btn">
                        <Heart size={14} />
                        <span>{comment.likes}</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

