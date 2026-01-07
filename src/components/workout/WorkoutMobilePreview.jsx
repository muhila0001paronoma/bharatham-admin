import React from 'react';
import './WorkoutMobilePreview.css';

export default function WorkoutMobilePreview({ formData }) {
  const videoSource = React.useMemo(() => {
    if (formData.video) {
      return URL.createObjectURL(formData.video);
    }
    return formData.videoUrl || null;
  }, [formData.video, formData.videoUrl]);

  // Clean up object URL to prevent memory leaks
  React.useEffect(() => {
    return () => {
      if (videoSource && videoSource.startsWith('blob:')) {
        URL.revokeObjectURL(videoSource);
      }
    };
  }, [videoSource]);

  const hasVideo = !!videoSource;

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

          {hasVideo && (
            <div className="workout-mobile-card">
              <div className="workout-mobile-card-content">
                <div className="workout-mobile-thumbnail-container">
                  <video
                    src={videoSource}
                    className="workout-mobile-video"
                    controls
                    playsInline
                  >
                    Your browser does not support the video tag.
                  </video>
                  <div className="workout-mobile-duration-badge">
                    <span>{formData.video ? 'Ready' : 'Watch'}</span>
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

          {!hasVideo && (
            <div className="workout-mobile-empty">
              <div className="workout-mobile-empty-text">
                Select a video to see preview
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


