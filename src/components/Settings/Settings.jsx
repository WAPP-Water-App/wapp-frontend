import React, { useState } from 'react';
import './settings.css';

export default function Settings() {

  // settings component
  // basically a form
  //TODO: send data to api endpoint to create/update user data

  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(50);
  const [height, setHeight] = useState(165);
  const [startTime, setStartTime] = useState(9);
  const [endTime, setEndTime] = useState(22);
  const [numReminders, setNumReminders] = useState(endTime-startTime);

  const renderDropdown = (num) => {
    const times = new Array(24).fill('');
    times[num] = true;
    return times.map((time, index) => (
      <option value={index} selected={time}>{index}</option>
    ))
  }

  return (
    <div>
      <h1>SETTINGS GO HERE</h1>

      <form>
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
            W name="weight"
            W min="0"
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
            W name="height"
            W min="0"
            max="500"
            value={height}
            onChange={(e) => setHeight(parseInt(e.target.value))}
          />
          <span>{height} cm</span>
        </div>
        <div className="form-group">
          <label for="startTime">What time do you start your day:</label>
          {/* <input
            type="time"
            id="startTime"
            name="startTime"
            min="09:00"
            max="18:00"
            required
          /> */}
          <select name="startTime" id="startTime" onChange={(e) => setStartTime(parseInt(e.target.value))}>
            {renderDropdown(startTime)}
          </select>
        </div>
        <div className="form-group">
          <label for="endTime">What time do you end your day:</label>
          {/* <input
            type="time"
            id="endTime"
            name="endTime"
            min="09:00"
            max="18:00"
            required
          /> */}
          <select name="endTime" id="endTime" onChange={(e) => {if(e.target.value > startTime){setEndTime(parseInt(e.target.value))} else {setEndTime("error: select later end time")}}}>
            {renderDropdown(endTime)}
          </select>
        </div>
        <div className="form-group">
          <label for="numReminders">How many reminders do you want a day?</label>
          <input
            type="range"
            id="numReminders"
            name="numReminders"
            min="1"
            max={`${endTime - startTime}`}
            onChange={(e) => setNumReminders(parseInt(e.target.value))}
          />
          <span>#{numReminders}</span>
        </div>
      </form>
    </div>
  );
}

//https://www.hydrationforhealth.com/en/hydration-tools/hydration-calculator/
