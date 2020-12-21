import React from 'react';
import './display.css';

export default function Display({ progress }) {

  // the progress "bar" for completion progress
  return (
    <div>
      <div
        className="progress-bar"
        style={{
          background: `linear-gradient(0deg, rgba(114,211,254,1) 0%, rgba(255,255,255,0) ${progress}%)`,
        }}
      >
        <img src="/img/clear-water-drop.png" />
      </div>
    </div>
  );
}
