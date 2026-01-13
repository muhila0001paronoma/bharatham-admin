import React, { useState, useEffect } from 'react';
import { X, Heart, Trash2 } from 'lucide-react';
import { reelService } from '../../services/reelService';
import './CommentsModal.css';

export default function CommentsModal({ isOpen, onClose, reel }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen && reel) {
      fetchComments();
    }
  }, [isOpen, reel]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await reelService.getCommentsByReel(reel.id);
      if (response.success) {
        setComments(response.data || []);
      } else {
        setError(response.message || 'Failed to fetch comments');
      }
    } catch (err) {
      setError('An error occurred while fetching comments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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

  const handleDeleteComment = async (commentId) => {
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        const response = await reelService.deleteComment(commentId);
        if (response.success) {
          fetchComments();
        } else {
          alert(response.message || 'Failed to delete comment');
        }
      } catch (err) {
        console.error('Error deleting comment:', err);
        alert('An error occurred while deleting the comment');
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (e) {
      return dateString;
    }
  };

  if (!isOpen || !reel) return null;

  return (
    <div className="comments-modal-overlay" onClick={onClose}>
      <div className="comments-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="comments-modal-header">
          <div>
            <h2 className="comments-modal-title">Comments</h2>
            <p className="comments-modal-subtitle">{reel.reelTitle}</p>
          </div>
          <button className="comments-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="comments-modal-body">
          {loading ? (
            <div className="comments-loading">Loading comments...</div>
          ) : error ? (
            <div className="comments-error">{error}</div>
          ) : comments.length === 0 ? (
            <div className="comments-empty-state">
              <p>No comments yet</p>
            </div>
          ) : (
            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-avatar">
                    {(comment.commentedBy || 'U').charAt(0).toUpperCase()}
                  </div>
                  <div className="comment-content">
                    <div className="comment-header">
                      <div className="comment-user-info">
                        <span className="comment-user-email">{comment.commentedBy}</span>
                      </div>
                      <span className="comment-date">{formatDate(comment.commentedAt)}</span>
                    </div>
                    <div className="comment-text">{comment.comment}</div>
                    <div className="comment-footer">
                      <div className="comment-likes">
                        <Heart size={18} className="comment-heart-icon" />
                        <span>{comment.commentLikes || 0}</span>
                      </div>
                      <button
                        className="comment-delete-btn"
                        onClick={() => handleDeleteComment(comment.id)}
                        title="Delete Comment"
                      >
                        <Trash2 size={18} />
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

