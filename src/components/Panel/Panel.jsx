import React from 'react';
import Timer from '../Timer';
import './panel.css';

export default function Panel({ date, hydroIntake, hydroData, hydroSchedule }) {
  return (
    <div className="panel-container">
      {/* <div><Timer /></div> */}
      <div>hydration streak</div>
      <div>
        Date: {date}
        <div>
          H2O Goal:
          <div>
            {hydroIntake} fl oz / {(hydroIntake / 33.814).toFixed(2)} cups
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
