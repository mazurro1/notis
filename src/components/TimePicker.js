import React, { useState, useEffect } from "react"
import TimeKeeper from "react-timekeeper"
import { Colors } from "../common/Colors"
import styled from "styled-components"

const ButtonConfirmDate = styled.div`
  background-color: ${Colors.buttonColor};
  color: white;
  padding: 10px 0px;
  text-align: center;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  box-shadow: 0px 2px 4px 1px rgba(0, 0, 0, 0.5) inset;

  &:hover {
    background-color: ${Colors.buttonIconColor};
  }
`

const TimePickerContent = ({ handleResetTakeData, setSelectedTime }) => {
  const [time, setTime] = useState("0:00")

  useEffect(() => {
    const date = new Date()
    const actualTime = `${date.getHours()}:${date.getMinutes()}`
    setTime(actualTime)
  }, [])

  const handleTimeOnChange = data => {
    setTime(data.formatted24)
  }

  const handleClose = () => {
    handleResetTakeData()
    setSelectedTime(time)
  }

  return (
    <div>
      <TimeKeeper
        hour24Mode
        switchToMinuteOnHourSelect
        time={time}
        closeOnMinuteSelect
        onChange={handleTimeOnChange}
        doneButton={newTime => (
          <ButtonConfirmDate onClick={handleClose}>ZATWIERDŹ</ButtonConfirmDate>
        )}
      />
    </div>
  )
}
export default TimePickerContent
