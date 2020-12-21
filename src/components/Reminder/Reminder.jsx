import React from 'react';
import './reminder.css';

export default function Reminder({ data, index, handleClick, disabled }) {
  // reminder component
  return (
    <>
      <li key={index}>
        <button
          disabled={disabled[index]}
          className="btn"
          onClick={() => handleClick(index)}
          style={{ backgroundColor: `#98ddfc${data.percent}` }}
        >
          <span>Time: {data.time}:00</span>
          <br />
          <span>Amount: {data.amt} Liter</span>
        </button>
      </li>
    </>
  );
}


//TODO: enable buttons when time has passed