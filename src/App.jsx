import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Callback from './components/Callback';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Logout from './components/Logout';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Panel from './components/Panel';
import Settings from './components/Settings';
import WAPPRequest from './utils';

function App() {
  // PRIMARY APP CONTAINER
  // all it does is hold the primary components (navbar, main, panel)
  // only the main div element changes with different routes
  const history = useHistory();

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
        setHydroIntake(
          response.settings
            ? Math.ceil(response.settings.weight * (2 / 3))
            : 100
        );
        setHydroSchedule(response.schedule);

        const date = new Date();

        setDate(
          `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
        );
      }
      setLoading(false);
    };

    getData();
  }, []);

  if (!localStorage.getItem('WAPPTOKEN')) {
    history.push('/login');
  }
  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Switch>
          <Route path="/callback">
            <Callback />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
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

export default App;

// TODO: chat bot
// style login page
// get rid of setting if logged out
// when logged in, check if data, dont render until data
