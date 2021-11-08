import React from "react"
// @ts-ignore
import SimpleReactCalendar from "simple-react-calendar"
import "./style/base_style.css"
import "./style/date_picker.css"
import { useSelector } from "react-redux"
import * as styled from "./SelectDataCalendarStyle"

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
}: {
  activeData: Date
  setActualCalendarDate: Function
  disabledDatas: Array<any>
  setIsDataActive: Function
  setIsTimeActive: Function
  activeMonth: Date
  maxDate: null | Date
  minDateActive: boolean
  minDateDefault: null | Date
}) => {
  const siteProps = useSelector((state: any) => state.siteProps)
  const data = !!minDateDefault ? new Date(minDateDefault) : new Date()
  const prevYeat = new Date(data.getFullYear(), data.getMonth(), data.getDate())
  const nextYear = new Date(
    data.getFullYear() + 1,
    data.getMonth(),
    data.getDate()
  )

  const handleSelectedDate = (date: Date) => {
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
        onSelect={(date: Date) => handleSelectedDate(date)}
      />
    </styled.StyleSimpleReactCalendar>
  )
}

export default SelectDataCalendar
