import React, { useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import './ReelMobilePreview.css';

export default function ReelMobilePreview({ formData }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && formData.videoUrl) {
      const video = videoRef.current;
      // Ensure video plays
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Auto-play was prevented, try to play anyway
          console.log('Auto-play prevented, attempting to play:', error);
        });
      }
    }
  }, [formData.videoUrl]);

  return (
    <div className="reel-mobile-preview-container">
      <div className="reel-mobile-frame">
        {/* Phone Status Bar */}
        <div className="reel-mobile-status-bar">
          <div className="reel-mobile-status-time">9:41</div>
          <div className="reel-mobile-status-icons">
            <div className="reel-mobile-status-icon"></div>
            <div className="reel-mobile-status-icon"></div>
            <div className="reel-mobile-status-icon"></div>
          </div>
        </div>

        {/* Phone Content */}
        <div className="reel-mobile-content">
          {/* Video Area */}
          <div className="reel-mobile-video-container">
            {formData.videoUrl ? (
              <video
                ref={videoRef}
                src={formData.videoUrl}
                className="reel-mobile-video"
                autoPlay
                loop
                muted
                playsInline
                controls={false}
                preload="auto"
              />
            ) : (
              <div className="reel-mobile-video-placeholder">
                <div className="reel-mobile-video-placeholder-text">Video Preview</div>
              </div>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="reel-mobile-actions">
            <div className="reel-mobile-action-item">
              <div className="reel-mobile-action-icon">
                <Heart size={28} fill="#FFFFFF" color="#FFFFFF" />
              </div>
              <div className="reel-mobile-action-count">{formData.likes || 0}</div>
            </div>
            <div className="reel-mobile-action-item">
              <div className="reel-mobile-action-icon">
                <MessageCircle size={28} color="#FFFFFF" />
              </div>
              <div className="reel-mobile-action-count">0</div>
            </div>
            <div className="reel-mobile-action-item">
              <div className="reel-mobile-action-icon">
                <Share2 size={28} color="#FFFFFF" />
              </div>
              <div className="reel-mobile-action-count">{formData.shares || 0}</div>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="reel-mobile-info">
            <div className="reel-mobile-title">{formData.title || 'Reel Title'}</div>
            {formData.uploadedBy && (
              <div className="reel-mobile-uploader">@{formData.uploadedBy.split('@')[0]}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

