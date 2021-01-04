import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import WAPPRequest from '../../utils';
import Boop from '../Boop';
import './profile.css';

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const getProfile = async () => {
      const response = await WAPPRequest('/profile', {
        method: 'GET',
      }).catch(() => {
        setError(true);
        return null;
      });

      if (response) {
        setProfile(response);
      }

      setLoading(false);
    };

    getProfile();
  }, []);

  const renderProfile = () => {
    if (loading) {
      return null;
    }
    if (error) {
      return <div> Error</div>;
      //TODO:
      //return a funny image
    }

    return profile !== '401' ? (
      <div className="profile-image">
        <h1> {profile.given_name}</h1>
        <img src={profile.picture}></img>
      </div>
    ) : (
      <div> error</div>
    );
  };

  return (
    <div className="profile-container">
      <Boop rotation={10} timing={150}>
        <Link to="/">
          <img className="profile-link" src="img/home (1).png" />
        </Link>
      </Boop>
      <Boop rotation={10} timing={150}>
      <Link to="/dashboard">
          <img className="profile-link" src="img/statistics.png" />
        </Link>
        </Boop>
      <Boop rotation={10} timing={150}>
        <Link to="/settings">
          <img className="profile-link" src="img/settings.png" />
        </Link>
      </Boop>
      <Boop rotation={10} timing={150}>
        <Link to="/logout">
          <img className="profile-link" src="img/exit.png" />
        </Link>

      </Boop>

      {renderProfile()}
    </div>
  );
}

//TODO: login + logout pages
// TOOD: login logic
