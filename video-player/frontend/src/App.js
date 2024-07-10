import React, { useState, useEffect } from 'react';
import axios from 'axios';
import About from './components/About';
import Contact from './components/Contact';
import VideoPlayerScreen from './components/VideoPlayerScreen';
import './App.css';
import logo from './images/logo.png'; // Ensure you update the path to your logo image

const App = () => {
  const [video, setVideo] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState('');
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/videos`);
        setVideos(response.data.videos);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const handleVideoUpload = (event) => {
    setVideo(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('video', video);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadedVideo(response.data.filePath);
      setVideos([...videos, response.data.filePath]); // Add new video to list
    } catch (error) {
      console.error('Error uploading video:', error);
    }
  };

  const handleRemoveVideo = (videoPath) => {
    setVideos(videos.filter((vid) => vid !== videoPath));
  };

  const handleSelectVideo = (videoPath) => {
    setSelectedVideo(videoPath);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} alt="Logo" className="App-logo" />
        <h1>VidTech</h1>
        <div className="upload-container">
          <form onSubmit={handleSubmit}>
            <input type="file" accept="video/*" onChange={handleVideoUpload} />
            <button type="submit">Upload Video</button>
          </form>
        </div>
        <VideoPlayerScreen selectedVideo={selectedVideo} />
        <div className="video-list">
          {videos.map((video, index) => {
            const videoName = video.split('/').pop();
            return (
              <div key={index} className="video-container">
                <div className="video-frame">
                  <video width="300" height="200" controls>
                    <source src={`${process.env.REACT_APP_API_URL}${video}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <p>{videoName}</p>
                <button onClick={() => handleSelectVideo(video)}>Play on Screen</button>
                <button onClick={() => handleRemoveVideo(video)}>Remove Video</button>
              </div>
            );
          })}
        </div>
        <Contact />
        <About />
      </header>
    </div>
  );
};

export default App;
