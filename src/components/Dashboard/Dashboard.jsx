import React, { useState } from 'react';
import moment from 'moment-timezone';
import Calendar from 'react-calendar';
import './dashboard.css';
import 'react-calendar/dist/Calendar.css';
import { isSameDay } from 'date-fns';

export default function Dashboard() {
  const [value, onChange] = useState(new Date());

  const hydroDays = ['12-24-2020', '12-23-2020', '12-21-2020', '11-22-2020'];

  function tileClassName({ date, view }) {
    // Add class to tiles in month view only
    if (view === 'month') {
      // Check if a date React-Calendar wants to check is on the list of dates to add class to

      console.log(date);

      const formatDate = moment(date).tz('UTC').format('MM-DD-YYYY');
      if (hydroDays.find((dDate) => formatDate === dDate)) {
        return 'calendarHighlight';
      }
    }
  }

  return (
    <div className="dashboard-container">
      <Calendar
        tileClassName={tileClassName}
        // tileClassName={tileClassName}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
