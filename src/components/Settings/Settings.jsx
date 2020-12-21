import React, { useState } from 'react';
import './settings.css';

export default function Settings() {

  // settings component
  // basically a form
  //TODO: send data to api endpoint to create/update user data
  
  const [age, setAge] = useState();
  const [weight, setWeight] = useState();
  const [height, setHeight] = useState();
  const [gender, setGender] = useState();
  const [numReminders, setNumReminders] = useState();

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
        <button onClick={(e)=>setWeight(parseInt(weight)-1)}>+</button>
          <input
            type="number"
            id="weight"
W           name="weight"
W           min="0"
            max="500"
            onChange={(e) => setWeight(parseInt(e.target.value))}
          />
          <button onClick={(e)=>setWeight(parseInt(weight)+1)}>+</button>
          <span>{weight} kg</span>
        </div>
        <div className="form-group">
        <label for="height">Height</label>
        <button onClick={(e)=>setHeight(parseInt(height)-1)}>+</button>
          <input
            type="number"
            id="height"
W           name="height"
W           min="0"
            max="500"
            onChange={(e) => setHeight(parseInt(e.target.value))}
          />
          <button onClick={(e)=>setWeight(parseInt(height)+1)}>+</button>
          <span>{height} cm</span>
        </div>
        <div className="form-group">
        <label for="gender">Gender</label>
          <button onClick={(e)=>setGender('M')}>Male</button>
          <button onClick={(e)=>setGender('F')}>Female</button>
          <button onClick={(e)=>setGender('O')}>Other</button>
          <span>Selected Gender: {gender} </span>
        </div>
        <div className="form-group">
          <label for="startTime">What time do you start your day:</label>
          <input
            type="time"
            id="startTime"
            name="startTime"
            min="09:00"
            max="18:00"
            required
          />
        </div>
        <div className="form-group">
          <label for="endTime">What time do you end your day:</label>
          <input
            type="time"
            id="endTime"
            name="endTime"
            min="09:00"
            max="18:00"
            required
          />
        </div>
        <div className="form-group">
          <label for="numReminders">How many reminders do you want a day?</label>
          <input
            type="range"
            id="numReminders"
            name="numReminders"
            min="1"
            max="10"
            onChange={(e) => setNumReminders(parseInt(e.target.value))}
          />
          <span>#{numReminders}</span>
        </div>
      </form>
    </div>
  );
}

//https://www.hydrationforhealth.com/en/hydration-tools/hydration-calculator/
