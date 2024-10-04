import React, { useState } from 'react';
import './App.css';

function ColorButton({ color }) {
  const [count, setCount] = useState(0);
  const [currentColor, setCurrentColor] = useState(color);

  const handleClick = () => {
    setCount(count + 1);
    setCurrentColor(generateRandomColor());
  };

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  };

  return (
    <button
      onClick={handleClick}
      style={{
        backgroundColor: currentColor,
        padding: '15px 30px',
        fontSize: '18px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      }}
    >
      Clicked {count} times
    </button>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Color Changing Button</h1>
        <p>Click the button to see the magic!</p>
        <ColorButton color="#3498db" />
      </header>
    </div>
  );
}

export default App;
