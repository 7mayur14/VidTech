import React from 'react';
import './About.css';

import linkedinIcon from '../images/linkedin.png';
import githubIcon from '../images/github.png';
import instagramIcon from '../images/instagram.png';

const About = () => {
  return (
    <div className="about">
      <h2>About</h2>
      <p>This is a simple video player application built with React and Node.js.</p>
      <p>This app gives users the options to upload videos and play videos already present in the application.</p>
      <div className="social-links">
        <div className="social-icon">
          <a href="https://www.linkedin.com/in/mayur-mane-019982175" target="_blank" rel="noopener noreferrer">
            <img src={linkedinIcon} alt="LinkedIn" />
          </a>
        </div>
        <div className="social-icon">
          <a href="https://github.com/7mayur14" target="_blank" rel="noopener noreferrer">
            <img src={githubIcon} alt="GitHub" />
          </a>
        </div>
        <div className="social-icon">
          <a href="https://www.instagram.com/mayur_mane.14/" target="_blank" rel="noopener noreferrer">
            <img src={instagramIcon} alt="Instagram" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
