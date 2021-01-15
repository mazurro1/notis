import React, { useState, useRef, useEffect } from "react"
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
import SelectCustom from "./SelectCustom"
import CalendarWorkerReserwatinEvent from "./CalendarWorkerReserwatinEvent"
import { useSelector, useDispatch } from "react-redux"
import { AllMonths } from "../common/AllMonths"
import Popup from "./Popup"
import SelectDataCalendar from "./SelectDataCalendar"
import {
  fetchUpdateWorkerReserwation,
  fetchDoReserwationWorker,
} from "../state/actions"
import CalendarWorkerReserwatinNewEvent from "./CalendarWorkerReserwatinNewEvent"
import { ServiceColorsReserwationsConvert } from "../common/ServiceColorsReserwationsConvert"
import CalendarEventItemClicked from "./CalendarEventItemClicked"
import NewEventView from "./BigCalendarWorkerNoConstHoursTooltip"
import CalendarWorkerHoursNewEvent from "./CalendarWorkerHoursNewEvent"

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
  min-width: 800px;
  /* border-radius: 5px; */
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
  .blue-event {
    background-color: #039be5 !important;
    &:hover {
      background-color: #0277bd !important;
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
  .rbc-time-view {
    border: none;
  }
  .rbc-event {
    background-color: ${props => Colors(props.siteProps).secondColor};
    color: ${props => Colors(props.siteProps).textNormalWhite};
    border: none;
    border: 1px solid white;
    border-radius: 5px;
    padding: 0px;
    transition-property: background-color;
    transition-duration: 0.3s;
    transition-timing-function: ease;

    &:hover {
      background-color: ${props => Colors(props.siteProps).secondDarkColor};
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
      font-weight: 500;
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
`

const TitleMonthYearContent = styled.div`
  background-color: ${props => Colors(props.siteProps).secondColor};
  color: white;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 5px 20px;
  font-size: 1.6rem;
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
const WarningStyle = styled.div`
  position: relative;
  background-color: ${props => Colors(props.siteProps).dangerColorDark};
  padding: 5px 10px;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  padding-left: 50px;
  font-size: 0.8rem;
  margin-bottom: 10px;
  border-radius: 5px;
`

const WidthSelect = styled.div`
  width: 160px;
  margin-right: 20px;
`

const ContentSelect = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
`

const ContentWorkersAdmin = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
`
const WorkerItemStyle = styled.div`
  background-color: ${props =>
    props.active
      ? Colors(props.siteProps).secondColor
      : Colors(props.siteProps).secondDarkColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  margin-right: 10px;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-top: 10px;
  transition-property: transform, background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    transform: scale(1.1);
  }
`

const BigCalendarWorkerHoursAutoSave = ({
  item,
  handleClose,
  dateCalendar,
  setDateCalendar,
  disabledSwitch,
  setDisabledSwitch,
  user,
  isAdmin = false,
  userWorkerActive,
  setUserWorkerActive,
  editedWorkersHours,
}) => {
  const [datePicker, setDatePicker] = useState(new Date())
  const [datePickerActive, setDatePickerActive] = useState(false)
  const [selectedEventOpen, setSelectedEventOpen] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [newEvent, setNewEvent] = useState(null)
  const [newEventOpen, setNewEventOpen] = useState(null)
  const [allEvents, setAllEvents] = useState([])
  const siteProps = useSelector(state => state.siteProps)
  const timerToClearNew = useRef(null)
  const timerToClearEdited = useRef(null)

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

  const dispatch = useDispatch()

  useEffect(() => {
    const newDate = new Date(
      datePicker.getFullYear(),
      datePicker.getMonth(),
      datePicker.getDate()
    )
    setDateCalendar(newDate)
  }, [datePicker])

  useEffect(() => {
    const actualMonth = dateCalendar.getMonth() + 1
    const findMonth = AllMonths.find(item => item.value === actualMonth)
    setMonthPicker(findMonth)
  }, [AllMonths, dateCalendar])

  useEffect(() => {
    if (dateCalendar.getFullYear() !== yearPicker.value) {
      const newYear = {
        value: yearPicker.value,
        label: yearPicker.value,
      }
      setYearPicker(newYear)
    }
  }, [dateCalendar])

  useEffect(() => {
    if (!!item) {
      const mapItemNoConstantWorkingHoursDate = item.noConstantWorkingHours.map(
        itemMaped => {
          const itemMapedResult = {
            end: new Date(itemMaped.end),
            start: new Date(itemMaped.start),
            fullDate: itemMaped.fullDate,
            _id: itemMaped._id,
            holidays: itemMaped.holidays,
          }
          return itemMapedResult
        }
      )
        setAllEvents(mapItemNoConstantWorkingHoursDate)
    }
  }, [editedWorkersHours, item])

  const selectedDayString = checkAndReturnMinAndMaxValueFromDaysHours(
    item.company.openingDays
  )
  const localizer = momentLocalizer(moment)
  const arrMaxHours = selectedDayString.maxHours.split(":")
  const arrMinHours = selectedDayString.minHours.split(":")
  const minHoursInCalendar = new Date(
    2020,
    0,
    1,
    Number(arrMinHours[0]) - 1,
    Number(arrMinHours[1])
  )
  const maxHoursInCalendar = new Date(
    2020,
    0,
    1,
    Number(arrMaxHours[0]) + 1,
    Number(arrMaxHours[1])
  )

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

  const handleOnSelecting = slots => {
    const takeDateStart = new Date(slots.start)
    if (
      dateCalendar.getFullYear() === takeDateStart.getFullYear() &&
      dateCalendar.getMonth() === takeDateStart.getMonth()
    ) {
      return true
    } else {
      return false
    }
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
    const selectedHoursCompany = item.company.openingDays[selectedDayToCompany]
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
        className: "orange-event",
      }
    }
  }

  const handleOnSelectSlot = eventItem => {
    if (eventItem.slots.length > 2) {
      clearInterval(timerToClearNew.current)
      setNewEvent(eventItem)
      setNewEventOpen(true)
    }
  }

  const handleChangeDate = value => {
    let newDate = new Date()
    if (value === "plus") {
      const afterAddedDays = new Date(
        takeDateYear,
        takeDateDayToday,
        dateCalendar.getDate() + 7
      )

      const disabledNextWeek =
        afterAddedDays.getMonth() === takeDateDayToday &&
        afterAddedDays.getFullYear() === takeDateYear
      if (disabledNextWeek) {
        newDate = new Date(
          dateCalendar.getFullYear(),
          dateCalendar.getMonth(),
          dateCalendar.getDate() + 7
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
      const disabledPrevWeek = Math.ceil(dateCalendar.getDate() / 7) === 1
      if (!disabledPrevWeek) {
        newDate = new Date(
          dateCalendar.getFullYear(),
          dateCalendar.getMonth(),
          dateCalendar.getDate() - 7
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

  const handleClickEvent = eventItem => {
    clearInterval(timerToClearEdited.current)
    const selectItemReserwation = item.noConstantWorkingHours.find(
      itemRes => itemRes._id === eventItem._id
    )
    if (!!selectItemReserwation) {
      setSelectedEvent({ ...selectItemReserwation, ...eventItem })
    } else {
      setSelectedEvent(eventItem)
    }
    setSelectedEventOpen(true)
  }

  const handleClosePopupEventItem = () => {
    timerToClearEdited.current = setTimeout(() => {
      setSelectedEvent(null)
    }, 400)
    setSelectedEventOpen(false)
  }

  const handleCloseNewEventItem = () => {
    timerToClearNew.current = setTimeout(() => {
      setNewEvent(null)
    }, 400)
    setNewEventOpen(false)
  }

  const handleCloseCalendar = () => {
    handleClose()
  }

  const handleCloseDatePicker = () => {
    setDatePickerActive(prevState => !prevState)
  }

  const slotsValue =
    item.company.reservationEveryTime === 5
      ? 10
      : item.company.reservationEveryTime === 10
      ? 5
      : item.company.reservationEveryTime === 15
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
            <SelectCustom
              options={allYears}
              value={yearPicker}
              handleChange={handleChangeYear}
              placeholder="Rok..."
              defaultMenuIsOpen={false}
              isClearable={false}
              widthAuto
              isDisabled={disabledSwitch}
            />
          </WidthSelect>
          <WidthSelect>
            <SelectCustom
              options={AllMonths}
              value={monthPicker}
              handleChange={handleChangeMonth}
              placeholder="Miesiąc..."
              defaultMenuIsOpen={false}
              isClearable={false}
              widthAuto
              isDisabled={disabledSwitch}
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
          <div>
            <ButtonIcon
              title="Poprzedni tydzień"
              uppercase
              fontIconSize="20"
              fontSize="16"
              icon={<FaCalendarMinus />}
              onClick={() => handleChangeDate("minus")}
            />
          </div>
          <TitleMonthYearContent siteProps={siteProps}>
            {finnalDate}
          </TitleMonthYearContent>
          <div>
            <ButtonIcon
              title="Dzisiaj"
              uppercase
              fontIconSize="20"
              fontSize="16"
              icon={<FaCalendarDay />}
              onClick={() => handleChangeDate("today")}
            />
          </div>
          <div>
            <ButtonIcon
              title="Kolejny tydzień"
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
            views={["week"]}
            selectable
            localizer={localizer}
            events={allEvents}
            defaultView="week"
            date={dateCalendar}
            onNavigate={date => {
              setDateCalendar(date)
            }}
            startAccessor="start"
            endAccessor="end"
            timeslots={slotsValue}
            step={item.company.reservationEveryTime}
            toolbar={false}
            min={minHoursInCalendar} // 8.00 AM
            max={maxHoursInCalendar} // Max will be 6.00 PM!
            onSelectSlot={handleOnSelectSlot} // zdarzenie po zaznaczeniu okresu
            onSelecting={handleOnSelecting} // wyłaczanie i włączanie klikalności
            // slotPropGetter={handleSlotPropGetter} // nadanie szarego koloru
            slotPropGetter={handleSlotPropGetterOpenHoursCompany} // nadanie koloru godzin otwartych firmy
            eventPropGetter={handleEventPropGetter}
            onSelectEvent={handleClickEvent}
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
        <CalendarWorkerHoursNewEvent
          siteProps={siteProps}
          handleClosePopupEventItem={handleClosePopupEventItem}
          selectedEvent={selectedEvent}
          screenOpen={selectedEventOpen}
          allEvents={allEvents}
          itemCompanyHours={item.company.openingDays}
          user={user}
          workerId={item._id}
          item={item}
        />
        <CalendarWorkerHoursNewEvent
          siteProps={siteProps}
          handleClosePopupEventItem={handleCloseNewEventItem}
          selectedEvent={newEvent}
          screenOpen={newEventOpen}
          allEvents={allEvents}
          itemCompanyHours={item.company.openingDays}
          user={user}
          workerId={item._id}
          item={item}
        />
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
        />
      </Popup>
    </>
  )
}
export default BigCalendarWorkerHoursAutoSave