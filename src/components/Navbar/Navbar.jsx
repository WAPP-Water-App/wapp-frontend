import React, { useState, useEffect } from 'react';

import { animated, useSpring } from 'react-spring';
import Profile from '../Profile';

import './navbar.css';

export default function Navbar() {
  const Boop = ({ rotation, timing, children }) => {
    const [isBooped, setIsBooped] = useState(false);

    const style = useSpring({
      display: 'inline-block',
      backfaceVisibility: 'hidden',
      transform: isBooped ? `rotate(${rotation}deg)` : `rotate(0deg)`,
      config: {
        tension: 300,
        friction: 10,
      },
    });

    useEffect(() => {
      if (!isBooped) {
        return;
      }
      const timeoutId = window.setTimeout(() => {
        setIsBooped(false);
      }, timing);
      return () => {
        window.clearTimeout(timeoutId);
      };
    }, [isBooped, timing]);
    const trigger = () => {
      setIsBooped(true);
    };

    return (
      <animated.div onMouseEnter={trigger} style={style}>
        {children}
      </animated.div>
    );
  };

  return (
    <div className="navbar-container">
      <div className="logo">
        <Boop rotation={10} timing={150}>
          <img src="/img/wapp.png" />
        </Boop>
      </div>
      <Profile />
    </div>
  );
}
