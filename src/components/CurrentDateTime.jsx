import React, { useState, useEffect } from 'react';

const CurrentDateTime = () => {
  const [currentDateTimeUK, setCurrentDateTimeUK] = useState('');
  const [currentDateTimePH, setCurrentDateTimePH] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const ukDateTime = new Date();
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
      };
      const ukOptions = {
        ...options,
        timeZone: 'Europe/London',
        day: '2-digit', // Set day format to 2-digit
        month: 'long', // Set month format to long
        year: 'numeric', // Set year format to numeric
        hour: '2-digit', // Set hour format to 2-digit
        minute: '2-digit', // Set minute format to 2-digit
        second: '2-digit', // Set second format to 2-digit
      };
      const phOptions = {
        ...options,
        timeZone: 'Asia/Manila',
        day: '2-digit', // Set day format to 2-digit
        month: 'long', // Set month format to long
        year: 'numeric', // Set year format to numeric
        hour: '2-digit', // Set hour format to 2-digit
        minute: '2-digit', // Set minute format to 2-digit
        second: '2-digit', // Set second format to 2-digit
      };
      const ukTimeString = ukDateTime.toLocaleString('en-GB', ukOptions);
      const phTimeString = ukDateTime.toLocaleString('en-PH', phOptions);

      setCurrentDateTimeUK(ukTimeString.toLocaleUpperCase());
      setCurrentDateTimePH(phTimeString.toLocaleUpperCase());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className='font-bold current-time'>
      <div className='container text-center mx-auto'>
        <p className='flex gap-4 justify-center'>
          <img src='/images/uk.svg' alt='Philippine Flag' />
          {currentDateTimeUK}
        </p>
        <p className='flex gap-4 mt-3 justify-center'>
          <img src='/images/ph.svg' alt='Philippine Flag' />
          {currentDateTimePH}
        </p>
      </div>
    </section>
  );
};

export default CurrentDateTime;
