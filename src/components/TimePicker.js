import React, { useState, useEffect } from "react"
import TimeKeeper from "react-timekeeper"
import styled from "styled-components"
import ButtonIcon from './ButtonIcon'
import { FaCheck } from "react-icons/fa"

const ButtonConfirmDate = styled.div`
  padding: 5px;
  background-color: #f4f4f4;
`

const TimePickerContent = ({ handleResetTakeData, setSelectedTime }) => {
  const [time, setTime] = useState(null)

  useEffect(() => {
    if(!!!time){
      const date = new Date()
      const actualTime = `${date.getHours()}:${date.getMinutes()}`
      setTime(actualTime)
    }
  }, [time])

  const handleTimeOnChange = data => {
    setTime(data.formatted24)
  }

  const handleClose = () => {
    handleResetTakeData()
    setSelectedTime(time)
  }

  return (
    <div>
      {!!time && <TimeKeeper
        hour24Mode
        switchToMinuteOnHourSelect
        time={time}
        closeOnMinuteSelect
        onChange={handleTimeOnChange}
        doneButton={newTime => (
          <ButtonConfirmDate>
            <ButtonIcon title="ZATWIERDŹ" uppercase fontIconSize="20" fontSize="20" icon={<FaCheck />} onClick={handleClose}/>
          </ButtonConfirmDate>
        )}
      />}
    </div>
  )
}
export default TimePickerContent
