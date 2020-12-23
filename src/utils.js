const API = 'http://localhost:5000';

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
  const contentType = response.headers.get('Content-Type');

  // console.log(response.headers.get('Content-Type'));
  // for (const header of response.headers) {
  //   console.log(header);
  // }

  if (contentType && contentType.includes('application/json')) {
    return response.json();
  }
  return response;
}
