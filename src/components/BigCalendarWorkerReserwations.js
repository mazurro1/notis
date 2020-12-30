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
import CalendarEventItemClicked from "./CalendarEventItemClicked"
import { useSelector, useDispatch } from "react-redux"
import { AllMonths } from "../common/AllMonths"
import Popup from "./Popup"
import SelectDataCalendar from "./SelectDataCalendar"

const BackgroundContentCalendar = styled.div`
  position: relative;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  padding: 10px;
`

const BackgroundCalendarStyle = styled.div`
  background-color: white;
  max-height: 90vh;
  max-width: 90vw;
  width: 900px;
  min-width: 800px;
  /* border-radius: 5px; */
  opacity: 0.95;
  margin-bottom: 10px;

  .rbc-day-slot .rbc-time-work-company-active {
    background-color: #e0f7fa !important;
    border-left: 1px solid #e0e0e0 !important;
  }
  .disabled-holiday-event {
    background-color: #757575 !important;
  }
  .rbc-time-view {
    border: none;
  }
  .rbc-event {
    background-color: ${props => Colors(props.siteProps).primaryColor};
    color: ${props => Colors(props.siteProps).textNormalWhite};
    border: none;
    border-radius: 5px;
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
  background-color: ${props => Colors(props.siteProps).primaryColor};
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

const IconWarning = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 50px;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
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

const BigCalendarWorkerReserwations = ({
  item,
  handleClose,
  dateCalendar,
  setDateCalendar,
  disabledSwitch,
  setDisabledSwitch,
}) => {
  const [datePicker, setDatePicker] = useState(new Date())
  const [datePickerActive, setDatePickerActive] = useState(false)
  const [selectedEventOpen, setSelectedEventOpen] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [newEvent, setNewEvent] = useState(null)
  const [newEventOpen, setNewEventOpen] = useState(null)
  // const [newEvents, setNewEvents] = useState([])
  // const [deletedEventsIds, setDeletedEventsIds] = useState([])
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
      const newDate = new Date(datePicker.getFullYear(), datePicker.getMonth(), datePicker.getDate())
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
      const mapItemReserwations = item.reserwations.map(itemMaped => {
        // new Date(year, month, day, hours, minutes)
        const timeEndSplit = itemMaped.dateEnd.split(":")
        const timeStartSplit = itemMaped.dateStart.split(":")
        const itemMapedResult = {
          end: new Date(
            itemMaped.dateYear,
            itemMaped.dateMonth - 1,
            itemMaped.dateDay,
            timeEndSplit[0],
            timeEndSplit[1]
          ),
          start: new Date(
            itemMaped.dateYear,
            itemMaped.dateMonth - 1,
            itemMaped.dateDay,
            timeStartSplit[0],
            timeStartSplit[1]
          ),
          fullDate: `${itemMaped.dateDay}-${itemMaped.dateMonth}-${itemMaped.dateYear}`,
          _id: itemMaped._id,
          holidays: null,
        }
        return itemMapedResult
      })
      setAllEvents(mapItemReserwations)
    }
  }, [item])

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
        className: "disabled-holiday-event",
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
    setSelectedEvent(eventItem)
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
    // setDeletedEventsIds([])
    // setAllEvents([])
  }

  const handleDeleteNoConstTimeworkToSave = selectedEvent => {
    // const filterNewEvents = newEvents.filter(
    //   item => item._id !== selectedEvent._id
    // )
    // setNewEvents(filterNewEvents)
    // const filterNewEventsFromServer = allEvents.filter(
    //   item => item._id !== selectedEvent._id
    // )
    // setAllEvents(filterNewEventsFromServer)
    // if (!!!selectedEvent.isNew) {
    //   const deletedIds = [...deletedEventsIds, selectedEvent._id]
    //   setDeletedEventsIds(deletedIds)
    // }
  }

  const handleCreateNoConstTimeworkToSave = (
    selectedEvent,
    eventToDelete,
    isHolidays = false
  ) => {
    const itemDay = selectedEvent.start.getDate()
    const itemMonth = selectedEvent.start.getMonth() + 1
    const itemYear = selectedEvent.start.getFullYear()
    const itemFullDate = `${itemDay}-${itemMonth}-${itemYear}`

    const selectedDayToCompany = getMonthAndReturnEng(
      selectedEvent.start.getDay()
    )
    const selectedHoursCompany = item.company.openingDays[selectedDayToCompany]
    const companyDateStart = selectedHoursCompany.start.split(":")
    const companyDateEnd = selectedHoursCompany.end.split(":")
    let newCreatedItem = {
      _id: Math.floor(100000 + Math.random() * 900000),
      fullDate: itemFullDate,
      isNew: true,
      start: selectedEvent.start,
      end: selectedEvent.end,
      holidays: isHolidays,
    }
    if (!!isHolidays) {
      newCreatedItem.start = selectedHoursCompany.disabled
        ? null
        : new Date(
            new Date(
              new Date(selectedEvent.start).setHours(companyDateStart[0])
            ).setMinutes(companyDateStart[1])
          )
      newCreatedItem.end = selectedHoursCompany.disabled
        ? null
        : new Date(
            new Date(
              new Date(selectedEvent.start).setHours(companyDateEnd[0])
            ).setMinutes(companyDateEnd[1])
          )
    }

    if (!!newCreatedItem.start && !!newCreatedItem.end) {
      // const filterNewEvents = !!eventToDelete
      //   ? newEvents.filter(item => item._id !== eventToDelete._id)
      //   : newEvents
      // const filterAllEvents = !!eventToDelete
      //   ? allEvents.filter(item => item._id !== eventToDelete._id)
      //   : allEvents

      // const allNewEvents = [...filterNewEvents, newCreatedItem]
      // setNewEvents(allNewEvents)
      // const allNewEventsAndFromServer = [...filterAllEvents, newCreatedItem]
      // setAllEvents(allNewEventsAndFromServer)

      if (!!eventToDelete) {
        if (!!!eventToDelete.isNew) {
          // const deletedIds = [...deletedEventsIds, eventToDelete._id]
          // setDeletedEventsIds(deletedIds)
        }
      }
    }
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
              // disabled={disabledPrevWeek}
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
            onSelectEvent={handleClickEvent}
            eventPropGetter={handleEventPropGetter}
            // onNavigate={handleOnNavigate}
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
        <CalendarEventItemClicked
          siteProps={siteProps}
          handleClosePopupEventItem={handleClosePopupEventItem}
          selectedEvent={selectedEvent}
          screenOpen={selectedEventOpen}
          allEvents={allEvents}
          handleDeleteNoConstTimeworkToSave={handleDeleteNoConstTimeworkToSave}
          handleCreateNoConstTimeworkToSave={handleCreateNoConstTimeworkToSave}
          itemCompanyHours={item.company.openingDays}
        />
        <CalendarEventItemClicked
          siteProps={siteProps}
          handleClosePopupEventItem={handleCloseNewEventItem}
          selectedEvent={newEvent}
          screenOpen={newEventOpen}
          allEvents={allEvents}
          handleDeleteNoConstTimeworkToSave={handleDeleteNoConstTimeworkToSave}
          handleCreateNoConstTimeworkToSave={handleCreateNoConstTimeworkToSave}
          itemCompanyHours={item.company.openingDays}
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
export default BigCalendarWorkerReserwations
