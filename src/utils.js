const API = process.env.REACT_APP_WAPP_API;

export default async function WAPPRequest(url, options) {
  // get the code from local storage via the key UWU_TOKEN
  const userToken = localStorage.getItem('WAPPTOKEN');

  // send the google_id as a custom header
  const headers = {
    ...options.headers,
    'Content-Type': 'application/json',
    'X-WAPP-User': userToken,
  };

  const response = await fetch(`${API}${url}`, { ...options, headers });

  if (response.status === 401){
    return "401"
  }
  const contentType = response.headers.get('Content-Type');

  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return response;
}
