import React, { useState, useEffect } from 'react';
import Display from '../Display';
import Reminder from '../Reminder';
import './main.css';

export default function Main() {
  //api call to get data here
  // useeffect
  //set state

  //TODO: get start, end times
  // divide by # of intervals
  // this is the # of reminders/divs needed
  // example data set
  const reminders = [
    { time: 5, amt: 1, percent: 10 },
    { time: 6, amt: 1, percent: 20 },
    { time: 7, amt: 1, percent: 30 },
    { time: 8, amt: 1, percent: 40 },
    { time: 9, amt: 1, percent: 50 },
    { time: 10, amt: 1, percent: 60 },
    { time: 11, amt: 1, percent: 70 },
    { time: 12, amt: 1, percent: 80 },
    { time: 13, amt: 1, percent: 90 },
    { time: 14, amt: 1, percent: 90 },
    { time: 15, amt: 1, percent: 90 },
  ];

  // usestate var for progress calculation
  // and disabling of buttons
  const [progress, setProgress] = useState(0)
  const [disabled, setDisabled] = useState(
    new Array(reminders.length).fill(false)
  );

  // handleclick
  const handleClick = (index) => {
    // disable the button
    const newDisabled = [...disabled];
    newDisabled[index] = true;
    setDisabled(newDisabled);

    //update completion level for the day
    //actually this needs to be saved in the db
    // TODO: save in db
    const newProgress = progress + 100/reminders.length;
    setProgress(newProgress)

  };

  // render the schedule
  const renderSchedule = () => {
    return reminders.map((reminder, index) => (
      <Reminder
        data={reminders[index]}
        index={index}
        handleClick={handleClick}
        disabled={disabled}
      />
    ));
  };

  return (
    <div className="main-container">
      <div className="buttons">
        <ul>{renderSchedule()}</ul>
      </div>
      <div className="display">
        <Display progress={progress} />
      </div>

      <div className="text"> Hello!</div>
    </div>
  );
}
