import React, { useState, useEffect } from 'react'

const CurrentDateTime = () => {
  const [currentDateTimeUK, setCurrentDateTimeUK] = useState('')
  const [currentDateTimePH, setCurrentDateTimePH] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      const ukDateTime = new Date()
      const ukOptions = {
        timeZone: 'Europe/London',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }
      const phOptions = {
        timeZone: 'Asia/Manila',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      }
      const ukTimeString = ukDateTime.toLocaleString('en-GB', ukOptions)
      const phTimeString = ukDateTime.toLocaleString('en-PH', phOptions)

      setCurrentDateTimeUK(ukTimeString)
      setCurrentDateTimePH(phTimeString)
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div className='font-bold'>
      <p>UK Time: {currentDateTimeUK}</p>
      <p>Ph Time: {currentDateTimePH}</p>
    </div>
  )
}

export default CurrentDateTime
