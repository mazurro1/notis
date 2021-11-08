import React, { useState, useEffect } from "react"
import TimeKeeper from "react-timekeeper"
import { ButtonIcon } from "@ui"
import { MdDoneAll } from "react-icons/md"
import { FaArrowLeft } from "react-icons/fa"
import { Colors } from "@common/Colors"
import moment from "moment"
import { useDispatch, useSelector } from "react-redux"
import { addAlertItem } from "@state/actions"
import * as styled from "./TimePickerContentStyle"

const TimePickerContent = ({
  handleResetTakeData = () => {},
  setSelectedTime,
  timeTimePicker = "",
  secondColor = false,
  minTime,
  maxTime,
}: {
  handleResetTakeData?: Function
  setSelectedTime: Function
  timeTimePicker: string
  secondColor?: boolean
  minTime?: string
  maxTime?: string
}) => {
  const [time, setTime] = useState(timeTimePicker)
  const siteProps = useSelector((state: any) => state.siteProps)
  const dispatch = useDispatch()
  moment().format(moment.HTML5_FMT.TIME)
  useEffect(() => {
    if (!!!time) {
      const date = new Date()
      const timeToPicker = moment(date).format(moment.HTML5_FMT.TIME)
      setTime(timeToPicker)
    }
  }, [time])

  const handleTimeOnChange = (data: any) => {
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
    <styled.MaxWidth secondColor={secondColor} siteProps={siteProps}>
      {!!time && (
        <TimeKeeper
          hour24Mode
          switchToMinuteOnHourSelect
          time={time}
          closeOnMinuteSelect
          onChange={handleTimeOnChange}
          doneButton={() => (
            <styled.ButtonConfirmDate siteProps={siteProps}>
              <styled.MarginButtons>
                <ButtonIcon
                  title="Anuluj"
                  uppercase
                  fontIconSize={20}
                  fontSize="SMALL"
                  icon={<FaArrowLeft />}
                  onClick={handleReset}
                  customColorButton={Colors(siteProps).dangerColorDark}
                  customColorIcon={Colors(siteProps).dangerColor}
                />
              </styled.MarginButtons>
              <styled.MarginButtons>
                <ButtonIcon
                  title="ZATWIERDŹ"
                  uppercase
                  fontIconSize={20}
                  fontSize="SMALL"
                  icon={<MdDoneAll />}
                  onClick={handleClose}
                  customColorButton={Colors(siteProps).successColorDark}
                  customColorIcon={Colors(siteProps).successColor}
                />
              </styled.MarginButtons>
            </styled.ButtonConfirmDate>
          )}
        />
      )}
    </styled.MaxWidth>
  )
}

export default TimePickerContent
