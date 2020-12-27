import React, { useState, useEffect } from "react"
import TimeKeeper from "react-timekeeper"
import styled from "styled-components"
import ButtonIcon from "./ButtonIcon"
import { MdDoneAll } from "react-icons/md"
import { Colors } from "../common/Colors"
import { useSelector } from "react-redux"
import moment from "moment"

const ButtonConfirmDate = styled.div`
  padding: 5px;
  background-color: ${props =>
    Colors(props.siteProps).timePickerTopBackground};
`

const MaxWidth = styled.div`
  .react-timekeeper {
    width: 100% !important;
  }

  .react-timekeeper__top-bar {
    background-color: ${props =>
      Colors(props.siteProps).timePickerTopBackground};
  }

  .react-timekeeper__clock-wrapper {
    background-color: ${props =>
      Colors(props.siteProps).timePickerBottomBackground};
  }

  .react-timekeeper__clock {
    background-color: ${props =>
      Colors(props.siteProps).timePickerTopBackground};
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
        ? Colors(props.siteProps).secondColor
        : Colors(props.siteProps).primaryColor};
  }

  .react-timekeeper__tb-minute--active {
    color: ${props =>
      props.secondColor
        ? Colors(props.siteProps).secondColor
        : Colors(props.siteProps).primaryColor};
  }
`

const TimePickerContent = ({
  handleResetTakeData = () => {},
  setSelectedTime,
  timeTimePicker = null,
  secondColor = false,
}) => {
  const [time, setTime] = useState(timeTimePicker)
  const siteProps = useSelector(state => state.siteProps)
  moment().format(moment.HTML5_FMT.TIME)
  useEffect(() => {
    if (!!!time) {
      const date = new Date()
      const timeToPicker = moment(date).format(moment.HTML5_FMT.TIME)
      setTime(timeToPicker)
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
    <MaxWidth secondColor={secondColor} siteProps={siteProps}>
      {!!time && (
        <TimeKeeper
          hour24Mode
          switchToMinuteOnHourSelect
          time={time}
          closeOnMinuteSelect
          onChange={handleTimeOnChange}
          doneButton={newTime => (
            <ButtonConfirmDate siteProps={siteProps}>
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
