import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import './Layout.css';

// Register the necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const Layout: React.FC = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [comment, setComment] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    // Fetch comment from Gemini API when the component mounts
    const fetchComment = async () => {
      try {
        const response = await axios.get('https://api.gemini.com/v1/comment'); // Replace with the actual Gemini API endpoint
        setComment(response.data.comment);
      } catch (error) {
        console.error('Error fetching comment from Gemini API:', error);
      }
    };

    fetchComment();
  }, []);

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  const pauseMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const pieData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        data: [300, 50, 100],
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return (
    <div className="container">
      <header className="header">
        <button onClick={toggleMenu}>Profile</button>
      </header>
      <main className="main">
        {/* Large Gen AI text */}
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Gen AI</h1>
        {/* Display the fetched comment */}
        <p>{comment}</p>
        {/* Comment about connecting to Gemini API */}
        {/* This is where we need to connect to the Gemini API to fetch usage of time */}
        <div className="pie-chart">
          <Pie data={pieData} />
        </div>
        <div className="leaderboard">
          <h2>Leaderboard</h2>
          <ul>
            <li>Player 1 - 100 points</li>
            <li>Player 2 - 90 points</li>
            <li>Player 3 - 80 points</li>
          </ul>
        </div>
      </main>
      <div
        ref={menuRef}
        className={`slide-in-menu ${isMenuOpen ? 'open' : ''}`}
      >
        <h2>Menu</h2>
        <ul>
          <li><button onClick={() => alert('Profile clicked')}>Profile</button></li>
          <li><button onClick={() => alert('Channel clicked')}>Channel</button></li>
          <li><button onClick={() => alert('Setting clicked')}>Setting</button></li>
        </ul>
      </div>
      <div className="music-controls">
        <button onClick={playMusic}>Play</button>
        <button onClick={pauseMusic}>Pause</button>
        <button onClick={stopMusic}>Stop</button>
      </div>
      <audio ref={audioRef} src="path/to/your/music/file.mp3" />
    </div>
  );
};

export default Layout;