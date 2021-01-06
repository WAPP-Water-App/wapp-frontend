# WAPP - Water App API 💧

## Hydration Life Coach
Test it out at 👉 [https://wapp-water.herokuapp.com/](https://wapp-water.herokuapp.com/).
WAPP is a single page water hydration React app that tracks, calculates, schedules, and manages your water consumption based on your unique profile.

# SCREENSHOTS

##### Main Page
![Main](https://github.com/WAPP-Water-App/wapp-frontend/blob/main/public/ss/wapp-main.gif)

##### Settings
![Settings](https://github.com/WAPP-Water-App/wapp-frontend/blob/main/public/ss/wapp-sett.gif)

##### Dashboard
![Dashboard](https://github.com/WAPP-Water-App/wapp-frontend/blob/main/public/ss/wapp-dash.gif)

##### Session/Route Protection
![Route](https://github.com/WAPP-Water-App/wapp-frontend/blob/main/public/ss/wapp-session.gif)

##### Logout
![Logout](https://github.com/WAPP-Water-App/wapp-frontend/blob/main/public/ss/wapp-logout.gif)

## APIs
> - 🎨 [Google OAuth](https://console.developers.google.com/)

### What it includes

* Google OAuth API for authentication
* Tokens to keep user logged in between pages

### User Stories

* As a user, you will be able to log in using your Google account.
* As a user, you will able set your settings for age, weight, height, start of day, end of day, and notification intensity.
* As a user, you will able to keep track of your progress for the day based on notification intesity.
* As a user, you will able to track the last 7 days' progress.

### Technologies

* React
* Express
* NodeJS
* Javascipt
* HTML
* CSS

### Code Snippet

##### WAPPRequest Function
```js
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
```

##### Reminder Component
```js
export default function Reminder({
  time,
  amt,
  amtper,
  percent,
  index,
  handleClick,
  status,
  disabled,
}) {
  const [isShown, setIsShown] = useState(false);
  // reminder component
  return (
    <>
      <li key={index}>
        <button
          disabled={disabled[index]}
          className="btn"
          onClick={() => handleClick(index)}
          style={{
            backgroundColor: `#98ddfc${percent}`,
            width: `${percent}%`,
          }}
          onMouseEnter={() => setIsShown(true)}
          onMouseLeave={() => setIsShown(false)}
        >
          <span>
            <span>
              {status[index] === 'check' ? '✔DONE!⭐' : amtper.toFixed(2)} /{' '}
              {amt.toFixed(0)} fl oz
            </span>
          </span>
        </button>
        <div className="timeline-text">
          <span
            className="timeline-display"
            style={{ color: `${disabled[index] ? '#00000030' : '#000000'}` }}
          >
            {time <= 12 ? time : time - 12}:00 {time < 12 ? 'am' : 'pm'}
          </span>

          {isShown && <div className="timeline-hover"><img src="/img/water-drop.png" /></div>}
        </div>
      </li>
    </>
  );
}
```

## Steps To Use

#### 1. Go to repo on Github

Repo is found here: [wapp-frontend](https://github.com/WAPP-Water-App/wapp-frontend). Alternatively, you can go to this website: [wapp](https://wapp-water.herokuapp.com/)
* Go to the repo above
* `fork` and `clone` the repo
* Also checkout the backend repo found here: [wapp-backend](https://github.com/WAPP-Water-App/wapp-backend)


#### 2. Install node modules from the package.json

```
npm install
```

(Or just `npm i` for short)


#### 3. Add a `.env` file with the following fields:

* REACT_APP_WAPP_API: What you have the WApp Backend set as
* PORT: Usually 3000 or 8000 but make it a different port from your backend port.

#### 7. Run server; make sure it works

```
npm start
```


