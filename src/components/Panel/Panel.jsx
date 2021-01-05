import React from 'react';
import Streak from '../Streak';
import Timer from '../Timer';
import './panel.css';

export default function Panel({ date, hydroIntake, hydroSchedule }) {
  return (
    <div className="panel-container">
      <div className="panel-card">
        <img src="/img/clock.png" />
        <Timer hydroSchedule={hydroSchedule} />
      </div>
      <div className="panel-card">
        <Streak />
      </div>
      <div className="panel-card">
        <div>
          <img src="/img/calendar.png" />
         <span>{date}</span>
        </div>
        <div>
          <img src="/img/target.png" />
          <span>{hydroIntake} fl oz / {(hydroIntake / 8).toFixed(2)} cups</span>
        </div>
      </div>
    </div>
  );
}
