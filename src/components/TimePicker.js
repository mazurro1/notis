import React, { useState, useEffect } from "react"
import TimeKeeper from "react-timekeeper"
import styled from "styled-components"
import ButtonIcon from "./ButtonIcon"
import { MdDoneAll } from "react-icons/md"
import { FaArrowLeft } from "react-icons/fa"
import { Colors } from "../common/Colors"
import moment from "moment"
import { useDispatch, useSelector } from "react-redux"
import { addAlertItem } from "../state/actions"

const ButtonConfirmDate = styled.div`
  padding: 5px;
  background-color: ${props => Colors(props.siteProps).timePickerTopBackground};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const MarginButtons = styled.div`
  margin: 5px;
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
  minTime,
  maxTime,
}) => {
  const [time, setTime] = useState(timeTimePicker)
  const siteProps = useSelector(state => state.siteProps)
  const dispatch = useDispatch()
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

  const handleReset = () => {
    handleResetTakeData()
    setSelectedTime(!!timeTimePicker ? timeTimePicker : null)
  }

  const handleClose = () => {
    handleResetTakeData()
    const splitTime = time.split(":")
    const convertTimeToNumber = Number(splitTime[0]) * 60 + Number(splitTime[1])
    if (!!minTime) {
      const splitMinTime = minTime.split(":")
      const convertMinTime =
        Number(splitMinTime[0]) * 60 + Number(splitMinTime[1])
      if (convertTimeToNumber > convertMinTime) {
        setSelectedTime(time)
      } else {
        dispatch(
          addAlertItem(
            `Godzina nie może być mniejsza, lub równa ${minTime}`,
            "red"
          )
        )
      }
    } else if (!!maxTime) {
      const splitMaxTime = maxTime.split(":")
      const convertMaxTime =
        Number(splitMaxTime[0]) * 60 + Number(splitMaxTime[1])
      if (convertTimeToNumber < convertMaxTime) {
        setSelectedTime(time)
      } else {
        dispatch(
          addAlertItem(
            `Godzina nie może być większa, lub równa ${maxTime}`,
            "red"
          )
        )
      }
    } else {
      setSelectedTime(time)
    }
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
              <MarginButtons>
                <ButtonIcon
                  title="Anuluj"
                  uppercase
                  fontIconSize="20"
                  fontSize="14"
                  icon={<FaArrowLeft />}
                  onClick={handleReset}
                  customColorButton={Colors(siteProps).dangerColorDark}
                  customColorIcon={Colors(siteProps).dangerColor}
                />
              </MarginButtons>
              <MarginButtons>
                <ButtonIcon
                  title="ZATWIERDŹ"
                  uppercase
                  fontIconSize="20"
                  fontSize="14"
                  icon={<MdDoneAll />}
                  onClick={handleClose}
                  customColorButton={Colors(siteProps).successColorDark}
                  customColorIcon={Colors(siteProps).successColor}
                />
              </MarginButtons>
            </ButtonConfirmDate>
          )}
        />
      )}
    </MaxWidth>
  )
}
export default TimePickerContent
