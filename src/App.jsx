import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Callback from './components/Callback';
import Login from './components/Login';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Panel from './components/Panel';
import Settings from './components/Settings';
import WAPPRequest from './utils';

function App() {
  // PRIMARY APP CONTAINER
  // all it does is hold the primary components (navbar, main, panel)
  // only the main div element changes with different routes
  console.log(localStorage.getItem('WAPPTOKEN'));

  const [hydroData, setHydroData] = useState();
  const [hydroIntake, setHydroIntake] = useState();
  const [hydroSchedule, setHydroSchedule] = useState([]);
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const getData = async () => {
      const response = await WAPPRequest('/data', {
        method: 'GET',
      }).catch(() => {
        setError(true);
        return null;
      });

      if (response) {
        setHydroData(response);
        setHydroIntake(Math.ceil(response.settings.weight * (2 / 3)));
        setHydroSchedule(response.schedule);
        console.log(response.schedule.length)


        const date = new Date();
        setDate(`${date.getMonth()}-${date.getDay()}-${date.getFullYear()}`);

      }
      setLoading(false);
    };

    getData();
  }, []);



  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Switch>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/callback">
            <Callback />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Main
              hydroIntake={hydroIntake}
              hydroData={hydroData}
              hydroSchedule={hydroSchedule}
            />
          </Route>
        </Switch>
      </div>
      <div className="panel">
        <Panel
          date={date}
          hydroIntake={hydroIntake}
          hydroData={hydroData}
          hydroSchedule={hydroSchedule}
        />
      </div>
    </div>
  );
}

export default App;


// TODO: chat bot
// timer
// calendar
//