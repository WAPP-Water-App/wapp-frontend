import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Callback from './components/Callback';
import Credits from './components/Credits';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Logout from './components/Logout';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Spinner from './components/Spinner';
import WAPPRequest from './utils';

function App() {
  // PRIMARY APP CONTAINER
  // all it does is hold the primary components (navbar, main, panel)
  // only the main div element changes with different routes
  const history = useHistory();

  const [hydroData, setHydroData] = useState();
  const [hydroIntake, setHydroIntake] = useState();
  const [hydroSchedule, setHydroSchedule] = useState([]);
  const [hydroSettings, setHydroSettings] = useState();
  const [reload, setReload] = useState();
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

        setHydroSettings(response.settings);

        const date = new Date();

        setDate(
          `${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}`
        );

        setLoading(false);
      }
    };

    getData();
  }, []);

  const renderApp = () => {
    console.log(hydroData, hydroIntake, hydroSchedule);
    console.log(localStorage.getItem('WAPPTOKEN'))
    if (!localStorage.getItem('WAPPTOKEN')) {
      history.push('/login');
    }

    if (loading) {
      <Spinner />;
    }

    return (
      <>
        <div className="main">
          <Switch>
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
                hydroSchedule={hydroSchedule}
                date={date}
              />
            </Route>
          </Switch>
        </div>
      </>
    );
  };

  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>
      {renderApp()}
      <div className="credits">
        <Credits />
      </div>
    </div>
  );
}

export default App;

// setTimeout(() => {
//   window.location.reload();
// }, 1000);
