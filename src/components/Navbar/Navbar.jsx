import React from 'react';
import Profile from '../Profile';

import './navbar.css';

export default function Navbar() {
  return (
    <div className="navbar-container">
      <div className="logo">
        <img src="/img/wapp.png" />
      </div>
      <Profile />
    </div>
  );
}
