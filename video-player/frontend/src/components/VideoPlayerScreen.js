import React, { useEffect, useRef } from 'react';
import './VideoPlayerScreen.css';

const VideoPlayerScreen = ({ selectedVideo }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (selectedVideo && videoRef.current) {
      videoRef.current.src = `${process.env.REACT_APP_API_URL}${selectedVideo}`;
      videoRef.current.load();
    }
  }, [selectedVideo]);

  const videoName = selectedVideo ? selectedVideo.split('/').pop() : '';

  return (
    <div className="video-player-screen">
      <div className="video-info">
        <h2>Currently Playing:</h2>
        <p>{videoName}</p>
      </div>
      <video ref={videoRef} controls>
        <source type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayerScreen;
