import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import WAPPRequest from '../../utils';
import Display from '../Display';
import Panel from '../Panel';
import Schedule from '../Schedule';
import Settings from '../Settings';
import './main.css';

export default function Main({ hydroIntake, hydroData, hydroSchedule, date }) {
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
          const scheduledTime = new Date();
          scheduledTime.setHours(parseInt(time) - 1);

          // if the current time is < scheduled time (the time has not passed)
          // return false
          return (
            new Date().getTime() > scheduledTime.getTime() ||
            response.status[index] === 'check'
          );
        });

        setDisabled(newDisabled);
      }

      setLoading(false);
    };

    if (hydroSchedule.length) {
      getDailyData();
    }
  }, [hydroSchedule]);

  // handleclick
  const handleClick = async (index) => {
    // if a button is clicked, disable the button
    const newDisabled = [...disabled];
    newDisabled[index] = true;
    setDisabled(newDisabled);

    const newStatus = [...status];
    newStatus[index] = 'check';
    setStatus(newStatus);

    //update completion level for the day
    // const newProgress = progress + 100 / hydroSchedule.length;

    const calculateProgress = newStatus.reduce((sum, counter, i) => {
      if (newStatus[i] === 'check') {
        return i++;
      }
    }, 0);

    setProgress(calculateProgress / newStatus.length);

    // update the progress level in the databse
    const response = await WAPPRequest('/data/daily', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        progress: calculateProgress / newStatus.length,
        status: newStatus,
      }),
    });
  };

  return (
    <div className="main-container">
      <div className="primary">
        <div className="display">
          <Display progress={progress} />
        </div>
        <div className="schedule">
          <Schedule
            hydroSchedule={hydroSchedule}
            hydroIntake={hydroIntake}
            handleClick={handleClick}
            status={status}
            disabled={disabled}
          />
        </div>
      </div>

      <div className="panel">
        <Switch>
          <Route path="/settings">
            <Settings hydroData={hydroData} />
          </Route>
          <Route path="/">
            <Panel
              date={date}
              hydroIntake={hydroIntake}
              hydroSchedule={hydroSchedule}
            />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
