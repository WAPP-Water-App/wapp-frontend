import React from 'react';
import './reminder.css';

export default function Reminder({
  time,
  amt,
  percent,
  index,
  handleClick,
  disabled,
}) {
  // reminder component
  return (
    <>
      <li key={index}>
        <button
          disabled={disabled[index]}
          className="btn"
          onClick={() => handleClick(index)}
          style={{ backgroundColor: `#98ddfc${percent}` }}
        >
          <span>Time: {time}:00</span>
          <br />
          <span>Amount: {amt} fl oz</span>
        </button>
      </li>
    </>
  );
}

//TODO: enable buttons when time has passed
