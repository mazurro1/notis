import React, { useState, useEffect } from "react"
import TimeKeeper from "react-timekeeper"
import styled from "styled-components"
import ButtonIcon from "./ButtonIcon"
import { MdDoneAll } from "react-icons/md"
import { Colors } from "../common/Colors"
import { useSelector } from "react-redux"

const ButtonConfirmDate = styled.div`
  padding: 5px;
  background-color: ${props =>
    Colors(props.colorBlind).timePickerTopBackground};
`

const MaxWidth = styled.div`
  .react-timekeeper {
    width: 100% !important;
  }

  .react-timekeeper__top-bar {
    background-color: ${props =>
      Colors(props.colorBlind).timePickerTopBackground};
  }

  .react-timekeeper__clock-wrapper {
    background-color: ${props =>
      Colors(props.colorBlind).timePickerBottomBackground};
  }

  .react-timekeeper__clock {
    background-color: ${props =>
      Colors(props.colorBlind).timePickerTopBackground};
  }

  .react-timekeeper__tb-hour {
    transition-property: color;
    transition-duration: 0.3s;
    transition-timing-function: ease;
  }

  .react-timekeeper__tb-minute {
    transition-property: color;
    transition-duration: 0.3s;
    transition-timing-function: ease;
  }

  .react-timekeeper__tb-hour--active {
    color: ${props =>
      props.secondColor
        ? Colors(props.colorBlind).secondColor
        : Colors(props.colorBlind).primaryColor};
  }

  .react-timekeeper__tb-minute--active {
    color: ${props =>
      props.secondColor
        ? Colors(props.colorBlind).secondColor
        : Colors(props.colorBlind).primaryColor};
  }
`

const TimePickerContent = ({
  handleResetTakeData,
  setSelectedTime,
  timeTimePicker = null,
  secondColor = false,
}) => {
  const [time, setTime] = useState(timeTimePicker)
  const colorBlind = useSelector(state => state.colorBlind)

  useEffect(() => {
    if (!!!time) {
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
    <MaxWidth secondColor={secondColor} colorBlind={colorBlind}>
      {!!time && (
        <TimeKeeper
          hour24Mode
          switchToMinuteOnHourSelect
          time={time}
          closeOnMinuteSelect
          onChange={handleTimeOnChange}
          doneButton={newTime => (
            <ButtonConfirmDate colorBlind={colorBlind}>
              <ButtonIcon
                title="ZATWIERDŹ"
                uppercase
                fontIconSize="20"
                fontSize="20"
                icon={<MdDoneAll />}
                onClick={handleClose}
                secondColors={secondColor}
              />
            </ButtonConfirmDate>
          )}
        />
      )}
    </MaxWidth>
  )
}
export default TimePickerContent
