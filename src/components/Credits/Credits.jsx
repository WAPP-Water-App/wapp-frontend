import React from 'react';
import './credits.css';

export default function Credits() {
  return (
    <div className="credits-container">
      <div>
        <ul>
          <li>Made with:React App </li>
          <li>Assets: Flaticon.com</li>
        </ul>
      </div>
      <div>
        <a href="https://github.com/WAPP-Water-App">
          <img src="img/wapp.png" />
        </a>
      </div>
      <div>
      <a href="https://github.com/WAPP-Water-App">WAPP GITHUB REPO</a>
      </div>

      <div>
        <ul>
          <li>Jenny Feng</li>
          <li>Frank Collins</li>
        </ul>
      </div>
      <div>
        <ul>
          <li>Tu Anh Huynh</li>
          <li>Tu Hoa Huynh</li>
        </ul>
      </div>
    </div>
  );
}
