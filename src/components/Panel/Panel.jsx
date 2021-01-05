import React from 'react';
import Streak from '../Streak';
import Timer from '../Timer';
import './panel.css';

export default function Panel({ date, hydroIntake, hydroSchedule }) {
  const handleNan = () => {
    if (!hydroIntake) {
      return 0
    }
    else {
      return hydroIntake
    }
  }

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
          {date}
        </div>
        <div>
          <img src="/img/target.png" />
          {handleNan()} fl oz / {(handleNan() / 8).toFixed(2)} cups
        </div>
      </div>
    </div>
  );
}
