import React from "react"
import SimpleReactCalendar from "simple-react-calendar"
import "./style/base_style.css"
import "./style/date_picker.css"
import { useSelector } from "react-redux"
import * as styled from "./SelectDataCalendarStyle"
import PropTypes from "prop-types"

const SelectDataCalendar = ({
  activeData,
  setActualCalendarDate,
  disabledDatas = [],
  setIsDataActive,
  setIsTimeActive = () => {},
  activeMonth = new Date(),
  maxDate = null,
  minDateActive = true,
  minDateDefault = null,
}) => {
  const siteProps = useSelector(state => state.siteProps)
  const data = !!minDateDefault ? new Date(minDateDefault) : new Date()
  const prevYeat = new Date(data.getFullYear(), data.getMonth(), data.getDate())
  const nextYear = new Date(
    data.getFullYear() + 1,
    data.getMonth(),
    data.getDate()
  )

  const handleSelectedDate = date => {
    setActualCalendarDate(date)
    setIsDataActive(false)
    setTimeout(() => {
      setIsTimeActive(true)
    }, 500)
  }

  return (
    <styled.StyleSimpleReactCalendar siteProps={siteProps}>
      <SimpleReactCalendar
        activeMonth={activeMonth}
        blockClassName="date_picker"
        maxDate={!!maxDate ? maxDate : nextYear}
        minDate={minDateActive ? prevYeat : null}
        selected={activeData}
        disabledIntervals={disabledDatas}
        onSelect={date => handleSelectedDate(date)}
      />
    </styled.StyleSimpleReactCalendar>
  )
}

SelectDataCalendar.propTypes = {
  activeData: PropTypes.instanceOf(Date),
  setActualCalendarDate: PropTypes.func.isRequired,
  disabledDatas: PropTypes.array,
  setIsDataActive: PropTypes.func.isRequired,
  setIsTimeActive: PropTypes.func,
  activeMonth: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  minDateActive: PropTypes.bool,
  minDateDefault: PropTypes.instanceOf(Date),
}

export default SelectDataCalendar
