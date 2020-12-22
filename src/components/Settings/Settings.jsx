import React, { useState } from "react";
import WAPPRequest from '../../utils';
import "./settings.css";

export default function Settings() {
  // settings component
  // basically a form
  //TODO: send data to api endpoint to create/update user data

  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(50);
  const [height, setHeight] = useState(165);
  const [startTime, setStartTime] = useState(9);
  const [endTime, setEndTime] = useState(22);
  const [reminderNumber, setReminderNumber] = useState(endTime - startTime);

  const renderDropdown = (num) => {
    const times = new Array(24).fill("");
    times[num] = true;
    return times.map((time, index) => (
      <option value={index} selected={time}>
        {`${index}:00`}
      </option>
    ));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (endTime > startTime) {
      const updatedSettings = { age, weight, height, startTime, endTime, reminderNumber }
      const updateSettings = async () => {
        const response = await WAPPRequest('/data', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ updatedSettings }),
        });

        // set both the access token and the jwt to local storage
        localStorage.setItem('WAPPTOKEN', response.accessToken);
        localStorage.setItem('WAPP_JWT', response.jwt);
      }
      console.log('Hello from handleSubmit');
      updateSettings();
    } else {
      alert('End time must be after start time')
    }
  }

  return (
    <div>
      <h1>SETTINGS GO HERE</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="age">Age</label>
          <input
            type="range"
            id="age"
            name="age"
            min="0"
            max="100"
            onChange={(e) => setAge(parseInt(e.target.value))}
          />
          <span>{age}</span>
        </div>
        <div className="form-group">
          <label for="weight">Weight</label>
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
          <span>{weight} kg</span>
        </div>
        <div className="form-group">
          <label for="height">Height</label>
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
          <span>{height} cm</span>
        </div>
        <div className="form-group">
          <label for="startTime">What time do you start your day:</label>
          <select
            name="startTime"
            id="startTime"
            onChange={(e) => setStartTime(parseInt(e.target.value))}
          >
            {renderDropdown(startTime)}
          </select>
        </div>
        <div className="form-group">
          <label for="endTime">What time do you end your day:</label>
          <select
            name="endTime"
            id="endTime"
            onChange={(e) => {
              if (e.target.value > startTime) {
                setEndTime(parseInt(e.target.value));
              } else {
                setEndTime("error: select later end time");
              }
            }}
          >
            {renderDropdown(endTime)}
          </select>
        </div>
        <div className="form-group">
          <label for="reminderNumber">
            How many reminders do you want a day?
          </label>
          <input
            type="range"
            id="reminderNumber"
            name="reminderNumber"
            min="1"
            max={`${endTime - startTime}`}
            onChange={(e) => setReminderNumber(parseInt(e.target.value))}
          />
          <span>#{reminderNumber}</span>
        </div>
        <button className="settings" type="submit" onClick={handleSubmit}>Update Settings</button>
      </form>
    </div>
  );
}

//https://www.hydrationforhealth.com/en/hydration-tools/hydration-calculator/
