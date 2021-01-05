import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Logout() {
  const history = useHistory();
  localStorage.removeItem('WAPPTOKEN');
  history.push('/login');

  console.log('local storage removed,', localStorage.getItem('WAPPTOKEN'))

  return <div>Loading</div>;
}
