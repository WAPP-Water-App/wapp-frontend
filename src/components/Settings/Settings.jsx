import React, { useEffect, useState } from 'react';
import WAPPRequest from '../../utils';
import './settings.css';

export default function Settings() {
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [reminder, setReminder] = useState(0);

  // calls the user's settings from the database
  // if none are set, then the default values are displayed
  // else display their current settings

  useEffect(() => {
    const getUserSettings = async () => {
      const response = await WAPPRequest('/profile/settings', {
        method: 'GET',
      }).catch((error) => console.log(error));

      if (response) {
        setAge(Object.keys(response).length ? response.settings.age : 25);
        setWeight(Object.keys(response).length ? response.settings.weight : 150);
        setHeight(
          Object.keys(response).length ? response.settings.height : 65
        );
        setStartTime(
          Object.keys(response).length ? response.settings.startTime : 9
        );
        setEndTime(
          Object.keys(response).length ? response.settings.endTime : 22
        );
        setReminder(
          Object.keys(response).length ? response.settings.reminder : 1
        );
      }
    };

    getUserSettings();
  }, []);

  const renderDropdown = (num) => {
    const times = new Array(24).fill('');
    times[num] = true;
    return times.map((time, index) => (
      <option value={index} selected={time}>
        {`${index}:00`}
      </option>
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedSettings = {
      age,
      weight,
      height,
      startTime,
      endTime,
      reminder,
    };

    const response = await WAPPRequest('/profile/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedSettings),
    });
  };

  return (
    <div className="settings-container">
      <h1>SETTINGS</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="age">
            <div>Age</div>
          </label>
          <input
            type="range"
            id="age"
            name="age"
            min="0"
            max="100"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
          />
          <div>{age}</div>
        </div>
        <div className="form-group">
          <label for="weight">
            <div>Weight</div>
          </label>
          <input
            type="number"
            id="weight"
            W
            name="weight"
            W
            min="0"
            max="500"
            value={weight}
            onChange={(e) => setWeight(parseInt(e.target.value))}
          />
          <div>{weight} lbs</div>
        </div>
        <div className="form-group">
          <label for="height">
            <div>Height</div>
          </label>
          <input
            type="number"
            id="height"
            W
            name="height"
            W
            min="0"
            max="500"
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value))}
          />
          <div>{height} in</div>
        </div>
        <div className="form-group">
          <label for="startTime">
            <div>What time do you start your day:</div>
          </label>
          <select
            name="startTime"
            id="startTime"
            onChange={(e) => setStartTime(parseInt(e.target.value))}
          >
            {renderDropdown(startTime)}
          </select>
        </div>
        <div className="form-group">
          <label for="endTime">
            <div>What time do you end your day:</div>
          </label>
          <select
            name="endTime"
            id="endTime"
            onChange={(e) => {
              setEndTime(parseInt(e.target.value));
            }}
          >
            {renderDropdown(endTime)}
          </select>
        </div>
        <div className="form-group">
          <label for="reminder">
            <div> Notification Intensity</div>
          </label>
          <input
            type="range"
            id="reminder"
            name="reminder"
            min="1"
            max="5"
            value={reminder}
            onChange={(e) => setReminder(parseInt(e.target.value))}
          />
          <div>Every {reminder} Hours</div>
        </div>
      </form>
      <button className="settings" type="submit" onClick={handleSubmit}>
        Update Settings
      </button>
    </div>
  );
}

// TODO - refresh the page
