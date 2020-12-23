import React, { useState, useEffect } from 'react';

export default function Timer() {
  const [timer, setTimer] = useState();

  useEffect(() => {
      // currentTime = new Date();


      // check the data for their reminder schedule, loop through that array
      // check which one is cloest
    const currentDate = new Date('Tue Dec 23 2020 9:00:00 GMT-0500');

    const inOneHour = new Date();
    inOneHour.setSeconds(currentDate.getSeconds() + 60 * 60);

    console.log(currentDate, inOneHour)

    // calculate the difference

    const difference = Math.ceil((inOneHour.getTime() - currentDate.getTime()) / 1000);
    setTimer(difference);

    // calculate the difference
  }, []);

  useEffect(() => {
    if (timer !== undefined) {
      setTimeout(() => {
        const newTimer = timer - 1;
        console.log(timer);
        setTimer(newTimer);
      }, 1000);
    }
  }, [timer]);

  return (
    <div>
      Timer
      <div>{timer}</div>
    </div>
  );
}
