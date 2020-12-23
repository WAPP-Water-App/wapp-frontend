import React, { useState, useEffect } from 'react';
import WAPPRequest from '../../utils';
import Display from '../Display';
import Reminder from '../Reminder';
import './main.css';

export default function Main({ hydroIntake, hydroData, hydroSchedule }) {
  // state variables
  const [progress, setProgress] = useState(0);
  const [disabled, setDisabled] = useState(
    new Array(hydroSchedule.length).fill(false)
  );
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  // get the current day's data from the database
  useEffect(() => {
    const getDailyData = async () => {
      const response = await WAPPRequest('/data/daily', {
        method: 'GET',
      }).catch(() => {
        setError(true);
        return null;
      });

      if (response) {
        // set the state progress to progress saved in the db
        setProgress(response.progress);

        // set status to status saved in the db
        setStatus(response.status);

        // calculate which buttons need to be disabled

        // if the time has passed, disable the button
        const newDisabled = hydroSchedule.map((time, index) => {
          const currentTime = new Date();
          const newTime = new Date();
          const scheduledTime = new Date(newTime.setHours(time));

          if (new Date().getTime() > scheduledTime.getTime()) {
            // if the current time is < scheduled time (the time has not passed)
            // return false
            return true;
          } else {
            // otherwise the time has not passed, return true
            return false;
          }
        });
//TODO: NOT UPDATING???

// TODO: filter status array, if not checked and time has passed, mark as "missed"
        setDisabled(newDisabled);

        //asdglkj
      }

      setLoading(false);
    };

    getDailyData();
  }, []);

  console.log(hydroSchedule);

  // handleclick
  const handleClick = async (index) => {
    // if a button is clicked, disable the button
    const newDisabled = [...disabled];
    newDisabled[index] = true;
    setDisabled(newDisabled);

    //update completion level for the day
    const newProgress = progress + 100 / hydroSchedule.length;
    setProgress(newProgress);

    const newStatus = [...status];
    newStatus[index] = 'check';
    setStatus(newStatus);

    // update the progress level in the databse
    const response = await WAPPRequest('/data/daily', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ progress: newProgress, status: newStatus }),
    });
  };

  // render the schedule
  const renderSchedule = () => {
    return hydroSchedule.map((time, index) => (
      <Reminder
        time={time}
        amt={(hydroIntake / hydroSchedule.length) * (index + 1)}
        percent={Math.floor(
          (((hydroIntake / hydroSchedule.length) * (index + 1)) / hydroIntake) *
            100 -
            1
        )}
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
