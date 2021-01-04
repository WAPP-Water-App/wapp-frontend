import React from 'react';
import Boop from '../Boop';
import './login.css'

export default function Login() {
  // main login page
  // directs them to the authorize api endpoint
  return (
    <div className = "login-container">
        <Boop rotation={10} timing={150}>
      <div className = "login-bg">
      <img src="/img/clear-water-drop.png" />
      <a href={`${process.env.REACT_APP_WAPP_WAPI}/authorize`}>login</a>
      </div>
      </Boop>
      <p>WATER APP.<br/>
      Bring a bottle or a cup, <br/>
      for this H2O.</p>
    </div>

  );
}
