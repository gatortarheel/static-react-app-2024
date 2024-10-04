import React, { useState, useEffect } from 'react';
import './ColorButton.css';

function ColorButton({ initialColor }) {
  const [count, setCount] = useState(0);
  const [currentColor, setCurrentColor] = useState(initialColor);
  const [isAnimating, setIsAnimating] = useState(false);
  const [trail, setTrail] = useState([]);

  const generateRandomColor = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFBE0B', '#FB5607', '#3A86FF', '#8338EC'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleClick = () => {
    setCount(count + 1);
    const newColor = generateRandomColor();
    setCurrentColor(newColor);
    setIsAnimating(true);
    setTrail([...trail, { color: currentColor, id: Date.now() }].slice(-5));
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  return (
    <div className="app-container">
      <div className="content">
        <h1 data-text="Color Magic Button">Color Magic Button</h1>
        <p>Click the button for a colorful surprise!</p>
        
        <div className="button-container">
          <div className="trail">
            {trail.map((t, i) => (
              <div
                key={t.id}
                className="trail-dot"
                style={{ 
                  backgroundColor: t.color,
                  transform: `scale(${1 - i * 0.15})`,
                  opacity: 1 - i * 0.2
                }}
              />
            ))}
          </div>
          
          <button
            onClick={handleClick}
            className={`color-button ${isAnimating ? 'animate' : ''}`}
            style={{ backgroundColor: currentColor }}
          >
            <span>🎨 Clicked {count} {count === 1 ? 'time' : 'times'}</span>
          </button>

          <div className="controls">
            <button onClick={() => setTrail([])} className="control-button">
              ⚡️ Clear Trail
            </button>
            <button 
              onClick={() => {
                setCount(0);
                setCurrentColor(initialColor);
                setTrail([]);
              }} 
              className="control-button"
            >
              🔄 Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return <ColorButton initialColor="#3A86FF" />;
}