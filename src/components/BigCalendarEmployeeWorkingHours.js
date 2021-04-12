import React, { useState, useEffect } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import "moment/locale/pl"
import {
  checkAndReturnMinAndMaxValueFromDaysHours,
  getMonthAndReturnEng,
  getMonthNamePl,
} from "../common/Functions"
import ButtonIcon from "./ButtonIcon"
import {
  FaCalendarDay,
  FaCalendarPlus,
  FaCalendarMinus,
  FaArrowLeft,
} from "react-icons/fa"
import SelectCreated from "./SelectCreated"
import { useSelector } from "react-redux"
import { AllMonths } from "../common/AllMonths"
import Popup from "./Popup"
import SelectDataCalendar from "./SelectDataCalendar"
import NewEventView from "./BigCalendarWorkerNoConstHoursTooltip"

const BackgroundContentCalendar = styled.div`
  position: relative;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  padding: 10px;
`

const BackgroundCalendarStyle = styled.div`
  background-color: white;
  max-height: 70vh;
  max-width: 90vw;
  width: 900px;
  overflow: hidden;
  overflow-y: auto;
  opacity: 0.95;
  margin-bottom: 10px;

  .rbc-event-label {
    display: none;
  }

  .rbc-event-content {
    font-size: 0.7rem;
    padding-top: 3px;
  }
  .rbc-day-slot .rbc-time-work-company-active {
    background-color: #e0f7fa !important;
    border-left: 1px solid #e0e0e0 !important;
  }

  .gray-event {
    background-color: #757575 !important;
    &:hover {
      background-color: #424242 !important;
    }
  }
  .red-event {
    background-color: #e53935 !important;
    &:hover {
      background-color: #c62828 !important;
    }
  }
  .yellow-event {
    background-color: #fdd835 !important;
    &:hover {
      background-color: #f9a825 !important;
    }
  }
  .orange-event {
    background-color: #fb8c00 !important;
    &:hover {
      background-color: #ef6c00 !important;
    }
  }
  .pink-event {
    background-color: #e040fb !important;
    &:hover {
      background-color: #d500f9 !important;
    }
  }
  .green-event {
    background-color: #43a047 !important;
    &:hover {
      background-color: #2e7d32 !important;
    }
  }
  .purple-event {
    background-color: #8e24aa !important;
    &:hover {
      background-color: #6a1b9a !important;
    }
  }
  .blue-event {
    background-color: ${props => Colors(props.siteProps).primaryColor};
    &:hover {
      background-color: ${props => Colors(props.siteProps).primaryColorDark};
    }
  }
  .rbc-time-view {
    border: none;
  }
  .rbc-event {
    background-color: ${props => Colors(props.siteProps).primaryColor};
    color: ${props => Colors(props.siteProps).textNormalWhite};
    border: none;
    border: 1px solid white;
    border-radius: 5px;
    padding: 0px;
    transition-property: background-color;
    transition-duration: 0.3s;
    transition-timing-function: ease;

    &:hover {
      background-color: ${props => Colors(props.siteProps).primaryColorDark};
    }
  }

  .rbc-allday-cell {
    display: none;
  }
  .rbc-time-view .rbc-header {
    border-bottom: none;
  }

  .rbc-timeslot-group {
    border-bottom: 1px solid #e0e0e0 !important;
  }
  .rbc-today .rbc-time-slot {
    /* border-top: 1px solid #bfebff; */
  }

  .rbc-time-content {
    border-top: 1px solid #e0e0e0 !important;
  }
  .rbc-time-content > * + * > * {
    border-left: none !important;
  }
  .rbc-day-slot .rbc-time-slot {
    border-top: none !important;
  }

  .rbc-day-slot .rbc-no-disabled-active-holiday {
    background-color: ${props => Colors(props.siteProps).dangerColor};
    border-left: 1px solid #e0e0e0 !important;
  }
  .rbc-day-slot .rbc-no-disabled-active {
    /* border-left: 1px solid red;
    border-right: 1px solid red; */
    border-left: 1px solid #e0e0e0 !important;
    /* border-right: 1px solid white !important; */
    background-color: white;
  }

  .rbc-day-slot .rbc-disabled-active {
    background-color: #e0e0e0;
    border-top: #e0e0e0 !important;
    border-left: 1px solid #e0e0e0 !important;
  }

  .rbc-time-gutter .rbc-time-slot {
    background-color: ${props => Colors(props.siteProps).navDownBackground};
    color: white;
  }
  .rbc-time-gutter .rbc-timeslot-group {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${props => Colors(props.siteProps).navDownBackground};
    text-align: center;
    border-bottom: 1px solid white;
  }

  .rbc-current-time-indicator {
    background-color: transparent;
  }
  .rbc-time-gutter .rbc-time-column:last-child {
    border-bottom: none;
  }

  .rbc-time-header-content {
    border-left: 1px solid #e0e0e0 !important;
  }
  .rbc-time-content {
    .rbc-today {
      background-color: #fff3e0;
    }
  }
  .rbc-time-header {
    color: white;
    background-color: ${props => Colors(props.siteProps).navDownBackground};
    .rbc-header + .rbc-header {
      border-left: 1px solid #e0e0e0 !important;
    }
    .rbc-header {
      font-family: "Poppins-Regular", sans-serif;
    }
    .rbc-today {
      background-color: #5ec2d7;
      /* border: none; */
    }
  }
`

const TitleMonthYear = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  @media all and (max-width: 767px) {
    display: block;
    width: 100%;

    .marginItems {
      margin: 5px;
    }
  }
`

const TitleMonthYearContent = styled.div`
  background-color: ${props => Colors(props.siteProps).secondColor};
  color: white;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 5px 20px;
  font-size: 1.6rem;
  text-align: center;
`

const ButtonsPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const ButtonItemStyle = styled.div`
  margin-left: 10px;
`
const WidthSelect = styled.div`
  width: 160px;
  margin: 5px;
  margin-right: 20px;
`

const ContentSelect = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
`

const BigCalendarEmployeeWorkingHours = ({
  item,
  handleClose,
  dateCalendar,
  setDateCalendar,
  disabledSwitch,
  setDisabledSwitch,
  isMobile = false,
}) => {
  const [datePicker, setDatePicker] = useState(new Date())
  const [datePickerActive, setDatePickerActive] = useState(false)
  const [allEvents, setAllEvents] = useState([])
  const siteProps = useSelector(state => state.siteProps)

  const allYears = [
    {
      value: new Date().getFullYear() - 2,
      label: new Date().getFullYear() - 2,
    },
    {
      value: new Date().getFullYear() - 1,
      label: new Date().getFullYear() - 1,
    },
    {
      value: new Date().getFullYear(),
      label: new Date().getFullYear(),
    },
    {
      value: new Date().getFullYear() + 1,
      label: new Date().getFullYear() + 1,
    },
  ]

  const [yearPicker, setYearPicker] = useState({
    value: new Date().getFullYear(),
    label: new Date().getFullYear(),
  })

  const [monthPicker, setMonthPicker] = useState({
    value: 1,
    label: "Styczeń",
  })

  useEffect(() => {
    const newDate = new Date(
      datePicker.getFullYear(),
      datePicker.getMonth(),
      datePicker.getDate()
    )
    setDateCalendar(newDate)
  }, [datePicker]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const actualMonth = dateCalendar.getMonth() + 1
    const findMonth = AllMonths.find(item => item.value === actualMonth)
    setMonthPicker(findMonth)
  }, [AllMonths, dateCalendar]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (dateCalendar.getFullYear() !== yearPicker.value) {
      const newYear = {
        value: yearPicker.value,
        label: yearPicker.value,
      }
      setYearPicker(newYear)
    }
  }, [dateCalendar]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!!item) {
      const arrayOpeningDays = [
        {
          id: 0,
          start: item.openingDays.sun.start,
          end: item.openingDays.sun.end,
          disabled: item.openingDays.sun.disabled,
        },
        {
          id: 1,
          start: item.openingDays.mon.start,
          end: item.openingDays.mon.end,
          disabled: item.openingDays.mon.disabled,
        },
        {
          id: 2,
          start: item.openingDays.tue.start,
          end: item.openingDays.tue.end,
          disabled: item.openingDays.tue.disabled,
        },
        {
          id: 3,
          start: item.openingDays.wed.start,
          end: item.openingDays.wed.end,
          disabled: item.openingDays.wed.disabled,
        },
        {
          id: 4,
          start: item.openingDays.thu.start,
          end: item.openingDays.thu.end,
          disabled: item.openingDays.thu.disabled,
        },
        {
          id: 5,
          start: item.openingDays.fri.start,
          end: item.openingDays.fri.end,
          disabled: item.openingDays.fri.disabled,
        },
        {
          id: 6,
          start: item.openingDays.sat.start,
          end: item.openingDays.sat.end,
          disabled: item.openingDays.sat.disabled,
        },
      ]

      const daysMonth = new Date(
        dateCalendar.getFullYear(),
        dateCalendar.getMonth() + 1,
        0
      ).getDate()

      const allDaysCalendar = []

      for (let i = 1; i <= daysMonth; i++) {
        const generateDayDate = new Date(
          dateCalendar.getFullYear(),
          dateCalendar.getMonth(),
          i
        )
        const generateFullDayDate = `${dateCalendar.getFullYear()}-${
          dateCalendar.getMonth() + 1
        }-${i}`
        const generateDayWeek = generateDayDate.getDay()
        const selectedDayNoConst = item.noConstWorkingHours.find(noConstDay => {
          const noConstDayTimeStart = new Date(noConstDay.start).getDate()
          return i === noConstDayTimeStart
        })
        let selectedDayOff = null
        let selectedConstWorkingHour = null
        if (!!!selectedDayNoConst) {
          selectedDayOff = item.daysOff.find(dayOff => {
            const dayOffDate = `${dayOff.year}-${dayOff.month}-${dayOff.day}`
            return generateFullDayDate === dayOffDate
          })
          if (!!!selectedDayOff) {
            selectedConstWorkingHour = item.constWorkingHours.find(
              constHour => {
                return constHour.dayOfTheWeek === generateDayWeek
              }
            )
          }
        }
        let dayToRender = null

        if (!!selectedDayNoConst) {
          dayToRender = {
            end: new Date(selectedDayNoConst.end),
            start: new Date(selectedDayNoConst.start),
            holidays: selectedDayNoConst.holidays,
            fullDate: generateFullDayDate,
            _id: i,
          }
        } else if (!!selectedDayOff) {
          const selectOpeningDays = arrayOpeningDays[generateDayWeek]
          if (!!selectOpeningDays) {
            if (!!!selectOpeningDays.disabled) {
              const splitDateStart = selectOpeningDays.start.split(":")
              const splitDateEnd = selectOpeningDays.end.split(":")
              const timeStartDayOff = new Date(
                dateCalendar.getFullYear(),
                dateCalendar.getMonth(),
                i,
                Number(splitDateStart[0]),
                Number(splitDateStart[1])
              )
              const timeEndDayOff = new Date(
                dateCalendar.getFullYear(),
                dateCalendar.getMonth(),
                i,
                Number(splitDateEnd[0]),
                Number(splitDateEnd[1])
              )
              dayToRender = {
                end: timeEndDayOff,
                start: timeStartDayOff,
                holidays: true,
                fullDate: generateFullDayDate,
                _id: i,
              }
            }
          }
        } else if (!!selectedConstWorkingHour) {
          if (!selectedConstWorkingHour.disabled) {
            const splitDateStartConst = selectedConstWorkingHour.startWorking.split(
              ":"
            )
            const splitDateEndConst = selectedConstWorkingHour.endWorking.split(
              ":"
            )
            const timeStartDayConst = new Date(
              dateCalendar.getFullYear(),
              dateCalendar.getMonth(),
              i,
              Number(splitDateStartConst[0]),
              Number(splitDateStartConst[1])
            )
            const timeEndDayConst = new Date(
              dateCalendar.getFullYear(),
              dateCalendar.getMonth(),
              i,
              Number(splitDateEndConst[0]),
              Number(splitDateEndConst[1])
            )
            dayToRender = {
              end: timeEndDayConst,
              start: timeStartDayConst,
              holidays: selectedConstWorkingHour.disabled,
              fullDate: generateFullDayDate,
              _id: i,
            }
          }
        }
        if (!!dayToRender) {
          allDaysCalendar.push(dayToRender)
        }
      }
      setAllEvents(allDaysCalendar)
    }
  }, [item]) // eslint-disable-line react-hooks/exhaustive-deps

  const localizer = momentLocalizer(moment)

  const handleChangeYear = value => {
    if (dateCalendar.getFullYear() !== value.value) {
      const newDateCalendar = new Date(
        value.value,
        dateCalendar.getMonth(),
        dateCalendar.getDate()
      )
      setDateCalendar(newDateCalendar)
    }

    setYearPicker(value)
    setDisabledSwitch(true)
    setTimeout(() => {
      setDisabledSwitch(false)
    }, 2000)
  }

  const handleChangeMonth = value => {
    if (dateCalendar.getMonth() !== value.value - 1) {
      const newDateCalendar = new Date(
        dateCalendar.getFullYear(),
        value.value - 1,
        1
      )
      setDateCalendar(newDateCalendar)
    }
    setMonthPicker(value)
    setDisabledSwitch(true)
    setTimeout(() => {
      setDisabledSwitch(false)
    }, 2000)
  }

  const handleOnSelecting = () => {
    return false
  }

  const handleSlotPropGetterOpenHoursCompany = date => {
    const takeDateStart = new Date(date)
    const getterDay = takeDateStart.getDate()
    const getterMonth = takeDateStart.getMonth() + 1
    const getterYear = takeDateStart.getFullYear()
    const getterFullDate = `${getterDay}-${getterMonth}-${getterYear}`
    const findInAllEvents = allEvents.find(
      item => item.fullDate === getterFullDate
    )

    const selectedDayToCompany = getMonthAndReturnEng(takeDateStart.getDay())
    const selectedHoursCompany = item.openingDays[selectedDayToCompany]
    const arrSerwerMaxHours = selectedHoursCompany.end.split(":")
    const arrSerwerMinHours = selectedHoursCompany.start.split(":")
    const calendarDate =
      takeDateStart.getHours() * 60 + takeDateStart.getMinutes()
    const numberMax =
      Number(arrSerwerMaxHours[0]) * 60 + Number(arrSerwerMaxHours[1])
    const numberMin =
      Number(arrSerwerMinHours[0]) * 60 + Number(arrSerwerMinHours[1])
    const isActualMonth =
      dateCalendar.getFullYear() === takeDateStart.getFullYear() &&
      dateCalendar.getMonth() === takeDateStart.getMonth()
    if (
      calendarDate >= numberMin &&
      calendarDate < numberMax &&
      !selectedHoursCompany.disabled
    ) {
      if (!!findInAllEvents) {
        if (isActualMonth) {
          return {
            className:
              "rbc-day-slot rbc-time-slot rbc-time-work-company-active",
          }
        } else {
          return {
            className: "rbc-day-slot rbc-time-slot rbc-disabled-active",
          }
        }
      } else {
        if (isActualMonth) {
          return {
            className:
              "rbc-day-slot rbc-time-slot rbc-time-work-company-active",
          }
        } else {
          return {
            className: "rbc-day-slot rbc-time-slot rbc-disabled-active",
          }
        }
      }
    } else {
      if (isActualMonth) {
        return {
          className: "rbc-day-slot rbc-time-slot rbc-no-disabled-active ",
        }
      } else {
        return {
          className: "rbc-day-slot rbc-time-slot rbc-disabled-active",
        }
      }
    }
  }
  const handleEventPropGetter = event => {
    if (!!event.holidays) {
      return {
        className: "gray-event",
      }
    } else {
      return {
        className: "blue-event",
      }
    }
  }

  const handleChangeDate = value => {
    let newDate = new Date()
    const plusDaysValid = isMobile ? 1 : 7
    const afterAddedDays = new Date(
      takeDateYear,
      takeDateDayToday,
      dateCalendar.getDate() + plusDaysValid
    )

    const prevDateCalendar = new Date(
      takeDateYear,
      takeDateDayToday,
      dateCalendar.getDate()
    )
    const maxDaysInPrevDate = new Date(
      takeDateYear,
      takeDateDayToday,
      0
    ).getDate()
    const countWeeksMonth = Math.floor(maxDaysInPrevDate / 7)
    const prevDateCountWeeksMonth = Math.floor(prevDateCalendar.getDate() / 7)
    if (value === "plus") {
      const isValidNextMonth = prevDateCountWeeksMonth + 1 === countWeeksMonth

      const disabledNextWeek =
        afterAddedDays.getMonth() === takeDateDayToday &&
        afterAddedDays.getFullYear() === takeDateYear

      if (disabledNextWeek && !isValidNextMonth) {
        newDate = new Date(
          dateCalendar.getFullYear(),
          dateCalendar.getMonth(),
          dateCalendar.getDate() + plusDaysValid
        )
      } else if (isValidNextMonth) {
        newDate = new Date(
          dateCalendar.getFullYear(),
          dateCalendar.getMonth() + 1,
          0
        )
      } else {
        newDate = new Date(
          dateCalendar.getFullYear(),
          dateCalendar.getMonth() + 1,
          1
        )
      }
      setDateCalendar(newDate)
    } else if (value === "today") {
      setDateCalendar(new Date())
    } else if (value === "minus") {
      const disabledPrevWeek =
        Math.ceil(dateCalendar.getDate() / plusDaysValid) === 1

      const validIsFirstWeek =
        dateCalendar.getDate() <
          (maxDaysInPrevDate % countWeeksMonth) + plusDaysValid &&
        dateCalendar.getDate() > maxDaysInPrevDate % countWeeksMonth

      if (!disabledPrevWeek && !validIsFirstWeek) {
        newDate = new Date(
          dateCalendar.getFullYear(),
          dateCalendar.getMonth(),
          dateCalendar.getDate() - plusDaysValid
        )
      } else if (validIsFirstWeek) {
        newDate = new Date(
          dateCalendar.getFullYear(),
          dateCalendar.getMonth(),
          1
        )
      } else {
        newDate = new Date(
          dateCalendar.getFullYear(),
          dateCalendar.getMonth(),
          0
        )
      }
      setDateCalendar(newDate)
    }
  }

  const handleCloseCalendar = () => {
    handleClose()
  }

  const handleCloseDatePicker = () => {
    setDatePickerActive(prevState => !prevState)
  }

  const slotsValue =
    item.reservationEveryTime === 5
      ? 10
      : item.reservationEveryTime === 10
      ? 5
      : item.reservationEveryTime === 15
      ? 4
      : 2

  const takeDateDayToday = dateCalendar.getMonth()
  const takeDateYear = dateCalendar.getFullYear()
  const selectMonthName = getMonthNamePl(takeDateDayToday)
  const finnalDate = `${selectMonthName} ${takeDateYear}`

  const selectedDayCalendar = `${
    dateCalendar.getDate() < 10
      ? `0${dateCalendar.getDate()}`
      : dateCalendar.getDate()
  }-${
    dateCalendar.getMonth() + 1 < 10
      ? `0${dateCalendar.getMonth() + 1}`
      : dateCalendar.getMonth() + 1
  }-${dateCalendar.getFullYear()}`

  return (
    <>
      <BackgroundContentCalendar>
        <ContentSelect>
          <WidthSelect>
            <SelectCreated
              options={allYears}
              value={yearPicker}
              handleChange={handleChangeYear}
              placeholder="Rok..."
              defaultMenuIsOpen={false}
              isClearable={false}
              widthAuto
              isDisabled={disabledSwitch}
              deleteItem={false}
            />
          </WidthSelect>
          <WidthSelect>
            <SelectCreated
              options={AllMonths}
              value={monthPicker}
              handleChange={handleChangeMonth}
              placeholder="Miesiąc..."
              defaultMenuIsOpen={false}
              isClearable={false}
              widthAuto
              isDisabled={disabledSwitch}
              deleteItem={false}
            />
          </WidthSelect>
          <ButtonIcon
            title={selectedDayCalendar}
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<FaCalendarDay />}
            onClick={handleCloseDatePicker}
          />
        </ContentSelect>
        <TitleMonthYear>
          <div className="marginItems">
            <ButtonIcon
              title={isMobile ? "Poprzedni dzień" : "Poprzedni tydzień"}
              uppercase
              fontIconSize="20"
              fontSize="16"
              icon={<FaCalendarMinus />}
              onClick={() => handleChangeDate("minus")}
            />
          </div>
          <TitleMonthYearContent siteProps={siteProps} className="marginItems">
            {finnalDate}
          </TitleMonthYearContent>
          <div className="marginItems">
            <ButtonIcon
              title="Dzisiaj"
              uppercase
              fontIconSize="20"
              fontSize="16"
              icon={<FaCalendarDay />}
              onClick={() => handleChangeDate("today")}
            />
          </div>
          <div className="marginItems">
            <ButtonIcon
              title={isMobile ? "Kolejny dzień" : "Kolejny tydzień"}
              uppercase
              fontIconSize="20"
              fontSize="16"
              icon={<FaCalendarPlus />}
              onClick={() => handleChangeDate("plus")}
            />
          </div>
        </TitleMonthYear>
        <BackgroundCalendarStyle siteProps={siteProps}>
          <Calendar
            tooltipAccessor={null}
            culture="pl"
            views={["week", "day"]}
            selectable
            localizer={localizer}
            events={allEvents}
            defaultView={isMobile ? "day" : "week"}
            onView={() => {}}
            date={dateCalendar}
            onNavigate={date => {
              setDateCalendar(date)
            }}
            view={isMobile ? "day" : "week"}
            startAccessor="start"
            endAccessor="end"
            timeslots={slotsValue}
            step={item.reservationEveryTime}
            toolbar={false}
            min={new Date(new Date().setHours(6, 0))}
            max={new Date(new Date().setHours(23, 30))}
            onSelecting={handleOnSelecting} // wyłaczanie i włączanie klikalności
            slotPropGetter={handleSlotPropGetterOpenHoursCompany} // nadanie koloru godzin otwartych firmy
            eventPropGetter={handleEventPropGetter}
            components={{ event: NewEventView }}
          />
        </BackgroundCalendarStyle>

        <ButtonsPosition>
          <ButtonItemStyle>
            <ButtonIcon
              title="Zamknij"
              uppercase
              fontIconSize="25"
              fontSize="16"
              icon={<FaArrowLeft />}
              customColorButton={Colors(siteProps).dangerColorDark}
              customColorIcon={Colors(siteProps).dangerColor}
              onClick={handleCloseCalendar}
            />
          </ButtonItemStyle>
        </ButtonsPosition>
      </BackgroundContentCalendar>
      <Popup
        popupEnable={datePickerActive}
        handleClose={handleCloseDatePicker}
        noContent
      >
        <SelectDataCalendar
          setActualCalendarDate={setDatePicker}
          setIsDataActive={setDatePickerActive}
          activeMonth={dateCalendar}
          minDateActive={false}
          activeData={dateCalendar}
        />
      </Popup>
    </>
  )
}
export default BigCalendarEmployeeWorkingHours
