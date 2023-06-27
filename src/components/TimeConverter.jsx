import React, { useState } from 'react'

const TimeConverter = () => {
  const [ukDate, setUkDate] = useState('')
  const [ukTime, setUkTime] = useState('')
  const [phDate, setPhDate] = useState('')
  const [phTime, setPhTime] = useState('')
  const [ukToPh, setUkToPh] = useState(true)

  const handleConvertToPH = () => {
    const ukDateTime = new Date(`${ukDate}T${ukTime}`)
    const phOptions = {
      timeZone: 'Asia/Manila',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }
    const phTimeString = ukDateTime.toLocaleString('en-PH', phOptions)

    setPhTime(phTimeString)
  }

  const handleConvertToUK = () => {
    const phDateTime = new Date(`${phDate}T${phTime}`)
    const ukOptions = {
      timeZone: 'Europe/London',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }
    const ukTimeString = phDateTime.toLocaleString('en-GB', ukOptions)

    setUkDate(phDateTime.toISOString().slice(0, 10)) // Format UK date as ISO string
    setUkTime(ukTimeString.slice(11)) // Extract UK time from formatted string
  }

  return (
    <section className='pt-36'>
      <button
        className='bg-gray-600 p-3 mb-2 rounded-lg mt-3 flex mx-auto gap-x-3'
        onClick={() => setUkToPh(!ukToPh)}
      >
        {ukToPh ? 'Ph to UK Time' : 'Uk to PH Time'}
        <svg
          viewBox='0 0 16 16'
          version='1.1'
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect width='16' height='16' id='icon-bound' fill='none' />
          <path
            d='M0,11h11.2l-2.6,2.6L10,15l6-6H0V11z M4.8,5l2.6-2.6L6,1L0,7h16V5H4.8z'
            fill='#ffffff' // Set fill color to white
          />
        </svg>
      </button>
      {ukToPh ? (
        <>
          <div className='py-2'>
            <label htmlFor='ukDate'>UK Date: </label>
            <input
              type='date'
              id='ukDate'
              value={ukDate}
              className='text-black rounded-lg px-5 py-2'
              onChange={e => setUkDate(e.target.value)}
            />
          </div>
          <div className='py-2'>
            <label htmlFor='ukTime'>UK Time: </label>
            <input
              type='time'
              id='ukTime'
              value={ukTime}
              className='text-black rounded-lg px-5 py-2'
              onChange={e => setUkTime(e.target.value)}
            />
          </div>
          <button
            onClick={handleConvertToPH}
            className='bg-gray-700 p-3 text-sm rounded-lg mt-3'
          >
            Convert to Ph Time
          </button>
          <span></span>
          {phTime && (
            <p className='py-4 text-3xl font-bold'>Ph Time: {phTime}</p>
          )}
        </>
      ) : (
        <>
          <div className='py-2'>
            <label htmlFor='phDate'>Ph Date: </label>
            <input
              type='date'
              id='phDate'
              value={phDate}
              className='text-black rounded-lg px-5 py-2'
              onChange={e => setPhDate(e.target.value)}
            />
          </div>
          <div className='py-2'>
            <label htmlFor='phTime'>Ph Time: </label>
            <input
              type='time'
              id='phTime'
              value={phTime}
              className='text-black rounded-lg px-5 py-2'
              onChange={e => setPhTime(e.target.value)}
            />
          </div>
          <button
            onClick={handleConvertToUK}
            className='bg-gray-700 p-3 text-sm rounded-lg mt-3'
          >
            Convert to UK Time
          </button>
          {ukDate && ukTime && (
            <p className='py-4 text-3xl font-bold'>
              UK Time: {ukDate} {ukTime}
            </p>
          )}
        </>
      )}
    </section>
  )
}

export default TimeConverter
