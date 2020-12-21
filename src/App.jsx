import { Route, Switch } from 'react-router-dom';
import './App.css';
import Callback from './components/Callback';
import Login from './components/Login';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Panel from './components/Panel';
import Settings from './components/Settings';

function App() {
  // PRIMARY APP CONTAINER
  // all it does is hold the primary components (navbar, main, panel)
  // only the main div element changes with different routes
  console.log(localStorage.getItem('WAPPTOKEN'));
  return (
    <div className="App">
      <div className="navbar"><Navbar /></div>
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
          <Route path="/"><Main /></Route>
        </Switch>
      </div>
      <div className = "panel"><Panel /></div>
    </div>
  );
}

export default App;
