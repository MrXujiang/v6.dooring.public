import React, { memo, useState, useEffect } from 'react'

import { TextConfig } from './schema'

const Text: React.FC<TextConfig> = memo(({
  width, height, fontSize, fontWeight,
  backgroundColor, timeColor, dateColor, flexDirection, justifyContent,
  alignItems, opacity, display,
}) => {
  const [showDate, setShowDate] = useState('')
  const [showTime, setShowTime] = useState('')

  const getTime = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : `0${date.getMonth() + 1}`
    const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`
    const hours = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`
    const minutes = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`
    const seconds = date.getSeconds() >= 10 ? date.getSeconds() : `0${date.getSeconds()}`
    const dateSet = {
      both: `${year}-${month}-${day}`,
      dateTime: `${year}-${month}-${day}`,
      date: `${year}-${month}-${day}`,
      bothTime: '',
      time: '',
    }
    const timeSet = {
      both: `${hours}:${minutes}:${seconds}`,
      dateTime: `${hours}:${minutes}`,
      date: '',
      bothTime: `${hours}:${minutes}:${seconds}`,
      time: `${hours}:${minutes}`,
    }

    setShowDate(dateSet[display])
    setShowTime(timeSet[display])
  }

  useEffect(() => {
    setInterval(getTime, 1000)
  }, [])

  return <div
    style={{
      fontSize,
      fontWeight,
      width,
      height,
      opacity,
      backgroundColor,
      display: 'flex',
      justifyContent,
      alignItems,
      flexDirection,
    }}
  >
    { showDate && <span style={{ color: dateColor }}>{showDate}</span>}
    { showTime && <span style={{ color: timeColor }}>{showTime}</span>}
  </div>
})
export default Text
