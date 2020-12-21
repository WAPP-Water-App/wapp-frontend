import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import WAPPRequest from '../../utils';

export default function Callback() {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    // after the user has authorized with google
    // get the code from the url query
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');

    // if a code is returned
    if (code) {
      // make a call to the api endpoint to exchange the code for the access token
      // using the WAPPrequest
      const login = async () => {
        const response = await WAPPRequest('/authorize/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });

        // set both the access token and the jwt to local storage
        localStorage.setItem('WAPPTOKEN', response.accessToken);
        localStorage.setItem('WAPP_JWT', response.jwt);
      };

      login();

      // then push them to the main page
      history.push('/');
    } else {

      // they did not authorize/we did not get a code back and they need to relogin
      history.push('/login');
    }
  }, []);

  return <div>Loading</div>;
}
