import React from 'react';
import './WorkoutMobilePreview.css';

const getYoutubeVideoId = (url) => {
  if (!url) return null;
  if (url.includes('watch?v=')) {
    return url.split('watch?v=')[1].split('&')[0];
  }
  if (url.includes('youtu.be/')) {
    return url.split('youtu.be/')[1].split('?')[0];
  }
  return null;
};

const getVideoThumbnailUrl = (videoUrl) => {
  const youtubeId = getYoutubeVideoId(videoUrl);
  if (youtubeId) {
    return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
  }
  return null;
};

export default function WorkoutMobilePreview({ formData }) {
  const thumbnailUrl = getVideoThumbnailUrl(formData.videoUrl);

  return (
    <div className="workout-mobile-preview-container">
      <div className="workout-mobile-frame">
        <div className="workout-mobile-status-bar">
          <div className="workout-mobile-status-time">10:48</div>
          <div className="workout-mobile-status-icons">
            <div className="workout-mobile-status-icon"></div>
            <div className="workout-mobile-status-icon"></div>
            <div className="workout-mobile-status-icon"></div>
          </div>
        </div>

        <div className="workout-mobile-content">
          <div className="workout-mobile-header">
            <div className="workout-mobile-title">Workouts</div>
          </div>

          {formData.videoUrl && (
            <div className="workout-mobile-card">
              <div className="workout-mobile-card-content">
                <div className="workout-mobile-thumbnail-container">
                  {thumbnailUrl ? (
                    <img 
                      src={thumbnailUrl} 
                      alt={formData.title || 'Workout'} 
                      className="workout-mobile-thumbnail"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="workout-mobile-thumbnail-placeholder"></div>
                  )}
                  <div className="workout-mobile-play-button">
                    <div className="workout-mobile-play-icon">▶</div>
                  </div>
                  <div className="workout-mobile-duration-badge">
                    <span>Watch</span>
                  </div>
                </div>
                <div className="workout-mobile-card-body">
                  <div className="workout-mobile-card-title">
                    {formData.title || 'Workout Video Title'}
                  </div>
                  <div className="workout-mobile-card-description">
                    {formData.description || 'Enter description to see preview here...'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {!formData.videoUrl && (
            <div className="workout-mobile-empty">
              <div className="workout-mobile-empty-text">
                Enter video URL to see preview
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

