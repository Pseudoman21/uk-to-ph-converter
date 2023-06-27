import React, { useState, useEffect } from 'react'

const TimeConverter = () => {
  const [ukDate, setUkDate] = useState()
  const [ukTime, setUkTime] = useState('')
  const [phDate, setPhDate] = useState('')
  const [phTime, setPhTime] = useState('')
  const [ukToPh, setUkToPh] = useState(true)

  useEffect(() => {
    const currentDate = new Date()
    const formattedDate = currentDate.toISOString().split('T')[0]
    setUkDate(formattedDate)
    setPhDate(formattedDate)
  }, [])

  const convertToUk = ukTimeParam => {
    const ukDateTime = new Date(`${ukDate}T${ukTimeParam}`)
    console.log(ukDate, ukTime)
    console.log(ukDateTime)
    console.log('here')
    const phOptions = {
      timeZone: 'Asia/Manila',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }
    const ukOptions = {
      timeZone: 'Europe/London',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }
    setPhDate(ukDateTime.toISOString().slice(0, 10)) // Format UK date as ISO string
    const ukTimeString = ukDateTime.toLocaleString('en-GB', ukOptions)
    const [datePart, timePart] = ukTimeString.split(' at ')

    // Extract the date components
    const [day, month, year] = datePart.split(' ')
    const [hours, minutes, seconds] = timePart.split(':')

    // Create a new Date object with the extracted components
    const newDate = new Date(
      `${month} ${day}, ${year} ${hours}:${minutes}:${seconds}`
    )

    console.log(newDate) // Output: Mon Jun 26 2023 22:34:00 GMT+0000 (Coordinated Universal Time)

    // Format the time for the input field
    const formattedTime = `${hours.padStart(2, '0')}:${minutes.padStart(
      2,
      '0'
    )}`

    setPhTime(formattedTime)
  }

  const convertToPh = ukTimeParam => {
    const ukDateTime = new Date()
    const [ukHours, ukMinutes] = ukTimeParam.split(':')

    ukDateTime.setUTCHours(ukHours, ukMinutes)

    const ukOffset = ukDateTime.getTimezoneOffset() * 60 * 1000 // Get the offset in milliseconds
    const phOffset = 8 * 60 * 60 * 1000 // 8 hours offset for Philippines (in milliseconds)
    const phDateTime = new Date(ukDateTime.getTime() + ukOffset + phOffset)

    const phOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      timeZone: 'Asia/Manila'
    }

    const phTimeString = phDateTime.toLocaleString('en-UK', phOptions)
    setUkDate(phDateTime.toISOString().slice(0, 10)) // Format UK date as ISO string

    const [datePart, timePart] = phTimeString.split(' at ')

    // Extract the date components
    const [day, month, year] = datePart.split(' ')
    let [hours, minutes, seconds] = timePart.split(':')

    hours = Number(hours) - 1
    hours = hours.toString()
    // Create a new Date object with the extracted components
    const newDate = new Date(
      `${month} ${day}, ${year} ${hours.toString()}:${minutes}:${seconds}`
    )

    console.log(newDate) // Output: Mon Jun 26 2023 15:28:00 GMT+0800 (Philippine Standard Time)

    // Format the time for the input field
    const formattedTime = `${hours.padStart(2, '0')}:${minutes.padStart(
      2,
      '0'
    )}`

    setUkTime(formattedTime) // Set the Philippine time in the state variable
    console.log(formattedTime)
  }

  const timeChangedHandler = e => {
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/ // Regular expression for valid time format (HH:mm)
    const inputTime = e.target.value

    if (timeRegex.test(inputTime)) {
      setUkTime(inputTime)
      convertToUk(inputTime)
    } else {
      // Handle invalid time value here (e.g., display an error message)
      // You can add appropriate error handling or feedback for the user
      console.log('Invalid time value')
    }
  }
  const timeChangedHandlerUK = e => {
    const inputTime = e.target.value
    const timeRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/ // Regular expression for valid time format (HH:mm)

    if (timeRegex.test(inputTime)) {
      setPhTime(inputTime)
      convertToPh(inputTime)
    } else {
      // Handle invalid time value here (e.g., display an error message)
      // You can add appropriate error handling or feedback for the user
      console.log('Invalid time value')
    }
  }
  return (
    <section className='pt-40'>
      <div className='bg-gray-800 p-10 rounded-xl'>
        {ukToPh ? (
          <>
            {/*<div className='py-2'>
              <input
              type='date'
              id='ukDate'
              value={ukDate}
              className='text-black rounded-lg px-5 py-2'
              onChange={e => setUkDate(e.target.value)}
              />
            </div>*/}
            <div className='py-2 flex gap-3'>
              <img src='/images/ph.svg' alt='Philippine Flag' />
              <input
                type='time'
                id='ukTime'
                value={ukTime}
                className='text-black rounded-lg px-5 py-2'
                onChange={e => timeChangedHandler(e)}
              />
            </div>
            <button
              className='transition ease-in-out duration-300 bg-gray-700 hover:bg-blue-900 p-3 mb-2 rounded-lg mt-3 flex mx-auto gap-x-3'
              onClick={() => setUkToPh(!ukToPh)}
            >
              <svg
                viewBox='0 0 16 16'
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
                transform='rotate(90)'
              >
                <rect width='16' height='16' id='icon-bound' fill='none' />
                <path
                  d='M0,11h11.2l-2.6,2.6L10,15l6-6H0V11z M4.8,5l2.6-2.6L6,1L0,7h16V5H4.8z'
                  fill='#ffffff' // Set fill color to white
                />
              </svg>
            </button>
            <div className='py-2 flex gap-3'>
              <img src='/images/uk.svg' alt='United Kingdom Flag' />
              <input
                type='time'
                id='ukTime'
                value={phTime}
                className='text-black rounded-lg px-5 py-2'
                onChange={e => timeChangedHandlerUK(e)}
              />
            </div>
          </>
        ) : (
          <>
            <div className='py-2 flex gap-3'>
              <img src='/images/uk.svg' alt='United Kingdom Flag' />
              <input
                type='time'
                id='ukTime'
                value={phTime}
                className='text-black rounded-lg px-5 py-2'
                onChange={e => timeChangedHandlerUK(e)}
              />
            </div>
            <button
              className='transition ease-in-out duration-300 bg-gray-700 hover:bg-blue-900 p-3 mb-2 rounded-lg mt-3 flex mx-auto gap-x-3'
              onClick={() => setUkToPh(!ukToPh)}
            >
              <svg
                viewBox='0 0 16 16'
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
                transform='rotate(90)'
              >
                <rect width='16' height='16' id='icon-bound' fill='none' />
                <path
                  d='M0,11h11.2l-2.6,2.6L10,15l6-6H0V11z M4.8,5l2.6-2.6L6,1L0,7h16V5H4.8z'
                  fill='#ffffff' // Set fill color to white
                />
              </svg>
            </button>
            <div className='py-2 flex gap-3'>
              <img src='/images/ph.svg' alt='United Kingdom Flag' />
              <input
                type='time'
                id='ukTime'
                value={ukTime}
                className='text-black rounded-lg px-5 py-2'
                onChange={e => timeChangedHandler(e)}
              />
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default TimeConverter
