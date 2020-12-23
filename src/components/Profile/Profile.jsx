import React, { useEffect, useState } from 'react';
import WAPPRequest from '../../utils';
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

    return (
      <>
        <img src={profile.picture}></img>
        <div> {profile.given_name}</div>
      </>
    );
  };

  return <div className="profile-container">{renderProfile()}</div>;
}
