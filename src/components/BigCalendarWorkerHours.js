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
  FaSave,
} from "react-icons/fa"
import { MdInfo } from "react-icons/md"

import CalendarEventItemClicked from "./CalendarEventItemClicked"
import { useSelector, useDispatch } from "react-redux"
import { changeEditedWorkerHours } from "../state/actions"

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
    background-color: #fff3e0 !important;
    border-left: 1px solid #e0e0e0 !important;
  }
  .disabled-holiday-event {
    background-color: #757575 !important;
  }
  .rbc-time-view {
    border: none;
  }
  .rbc-event {
    background-color: ${props => Colors(props.colorBlind).secondColor};
    color: ${props => Colors(props.colorBlind).textNormalWhite};
    border: none;
    border-radius: 5px;
    transition-property: background-color;
    transition-duration: 0.3s;
    transition-timing-function: ease;

    &:hover {
      background-color: ${props => Colors(props.colorBlind).secondDarkColor};
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
    background-color: ${props => Colors(props.colorBlind).dangerColor};
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
    background-color: ${props => Colors(props.colorBlind).navDownBackground};
    color: white;
  }
  .rbc-time-gutter .rbc-timeslot-group {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: ${props => Colors(props.colorBlind).navDownBackground};
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
    background-color: ${props => Colors(props.colorBlind).navDownBackground};
    .rbc-header + .rbc-header {
      border-left: 1px solid #e0e0e0 !important;
    }
    .rbc-header {
      font-weight: 500;
    }
    .rbc-today {
      background-color: #f7a52c;
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
  background-color: ${props => Colors(props.colorBlind).secondColor};
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
  background-color: ${props => Colors(props.colorBlind).dangerColorDark};
  padding: 5px 10px;
  color: ${props => Colors(props.colorBlind).textNormalWhite};
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
  color: ${props => Colors(props.colorBlind).textNormalWhite};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
`

const BigCalendarWorkerHours = ({ item, handleClose }) => {
  const [date, setDate] = useState(new Date())
  const [selectedEventOpen, setSelectedEventOpen] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [newEvent, setNewEvent] = useState(null)
  const [newEventOpen, setNewEventOpen] = useState(null)
  const [newEvents, setNewEvents] = useState([])
  const [deletedEventsIds, setDeletedEventsIds] = useState([])
  const [allEvents, setAllEvents] = useState([])
  const editedWorkersHours = useSelector(state => state.editedWorkersHours)
  const colorBlind = useSelector(state => state.colorBlind)
  const timerToClearNew = useRef(null)
  const timerToClearEdited = useRef(null)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!!item && allEvents.length === 0) {
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
      const selectEditedWorker = editedWorkersHours.find(
        workerEdited => workerEdited.indexWorker === item.user._id
      )
      if (!!selectEditedWorker) {
        const filterItemNoConstantWorkingHours = mapItemNoConstantWorkingHoursDate.filter(
          itemHour => {
            const isIdInDeleted = selectEditedWorker.noConstantWorkingHours.deletedEventsIds.some(
              deletedEventsIds => {
                return deletedEventsIds === itemHour._id
              }
            )
            return !isIdInDeleted
          }
        )

        let userEditedNewEvents = []
        if (!!selectEditedWorker) {
          userEditedNewEvents =
            selectEditedWorker.noConstantWorkingHours.newEvents
        }

        const allItemsAndFilter = [
          ...filterItemNoConstantWorkingHours,
          ...userEditedNewEvents,
        ]
        setAllEvents(allItemsAndFilter)
      } else {
        setAllEvents(mapItemNoConstantWorkingHoursDate)
      }
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
    Number(arrMinHours[0]),
    Number(arrMinHours[1])
  )
  const maxHoursInCalendar = new Date(
    2020,
    0,
    1,
    Number(arrMaxHours[0]),
    Number(arrMaxHours[1])
  )

  const handleOnSelecting = slots => {
    const takeDateStart = new Date(slots.start)
    const takeDateEnd = new Date(slots.end)
    const selectedDayToCompany = getMonthAndReturnEng(takeDateStart.getDay())
    const selectedHoursCompany = item.company.openingDays[selectedDayToCompany]
    const arrSerwerMaxHours = selectedHoursCompany.end.split(":")
    const arrSerwerMinHours = selectedHoursCompany.start.split(":")
    const calendarDateStart =
      takeDateStart.getHours() * 60 + takeDateStart.getMinutes()
    const calendarDateEnd =
      takeDateEnd.getHours() * 60 + takeDateEnd.getMinutes()
    const numberMax =
      Number(arrSerwerMaxHours[0]) * 60 + Number(arrSerwerMaxHours[1])
    const numberMin =
      Number(arrSerwerMinHours[0]) * 60 + Number(arrSerwerMinHours[1])
    if (
      calendarDateStart >= numberMin &&
      calendarDateEnd <= numberMax &&
      !selectedHoursCompany.disabled
    ) {
      return true
    } else {
      return false
    }
  }

  const handleSlotPropGetter = date => {
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
    if (
      calendarDate >= numberMin &&
      calendarDate < numberMax &&
      !selectedHoursCompany.disabled
    ) {
      if (!!findInAllEvents) {
        // if (!!findInAllEvents.holidays) {
        // return {
        //   className:
        //     "rbc-day-slot rbc-time-slot rbc-no-disabled-active-holiday",
        // }
        // } else {
        return {
          className: "rbc-day-slot rbc-time-slot rbc-no-disabled-active",
        }
        // }
      } else {
        return {
          className: "rbc-day-slot rbc-time-slot rbc-no-disabled-active",
        }
      }
    } else {
      return {
        className: "rbc-day-slot rbc-time-slot rbc-disabled-active",
      }
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
    if (
      calendarDate >= numberMin &&
      calendarDate < numberMax &&
      !selectedHoursCompany.disabled
    ) {
      if (!!findInAllEvents) {
        return {
          className: "rbc-day-slot rbc-time-slot rbc-time-work-company-active",
        }
      } else {
        return {
          className: "rbc-day-slot rbc-time-slot rbc-time-work-company-active",
        }
      }
    } else {
      return {
        className: "rbc-day-slot rbc-time-slot rbc-no-disabled-active ",
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
    if (value === "plus") {
      const prevDate = date
      const newDate = new Date(
        date.getFullYear(),
        prevDate.getMonth(),
        prevDate.getDate() + 7
      )
      setDate(newDate)
    } else if (value === "today") {
      setDate(new Date())
    } else if (value === "minus") {
      const prevDate = date
      const newDate = new Date(
        date.getFullYear(),
        prevDate.getMonth(),
        prevDate.getDate() - 7
      )
      setDate(newDate)
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
    setDeletedEventsIds([])
    setAllEvents([])
  }

  const handleDeleteNoConstTimeworkToSave = selectedEvent => {
    const filterNewEvents = newEvents.filter(
      item => item._id !== selectedEvent._id
    )
    setNewEvents(filterNewEvents)
    const filterNewEventsFromServer = allEvents.filter(
      item => item._id !== selectedEvent._id
    )
    setAllEvents(filterNewEventsFromServer)
    if (!!!selectedEvent.isNew) {
      const deletedIds = [...deletedEventsIds, selectedEvent._id]
      setDeletedEventsIds(deletedIds)
    }
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
      const filterNewEvents = !!eventToDelete
        ? newEvents.filter(item => item._id !== eventToDelete._id)
        : newEvents
      const filterAllEvents = !!eventToDelete
        ? allEvents.filter(item => item._id !== eventToDelete._id)
        : allEvents

      const allNewEvents = [...filterNewEvents, newCreatedItem]
      setNewEvents(allNewEvents)
      const allNewEventsAndFromServer = [...filterAllEvents, newCreatedItem]
      setAllEvents(allNewEventsAndFromServer)

      if (!!eventToDelete) {
        if (!!!eventToDelete.isNew) {
          const deletedIds = [...deletedEventsIds, eventToDelete._id]
          setDeletedEventsIds(deletedIds)
        }
      }
    }
  }

  const handleSaveNoConstTimework = () => {
    const newEditedWorkersHours = [...editedWorkersHours]
    const indexWorkerHours = editedWorkersHours.findIndex(
      itemEditedWorkerHours =>
        itemEditedWorkerHours.indexWorker === item.user._id
    )
    if (indexWorkerHours >= 0) {
      const allDeletedIds = [
        ...newEditedWorkersHours[indexWorkerHours].noConstantWorkingHours
          .deletedEventsIds,
        ...deletedEventsIds,
      ]
      const allNewEvents = [
        ...newEditedWorkersHours[indexWorkerHours].noConstantWorkingHours
          .newEvents,
        ...newEvents,
      ]
      newEditedWorkersHours[
        indexWorkerHours
      ].noConstantWorkingHours.deletedEventsIds = allDeletedIds
      newEditedWorkersHours[
        indexWorkerHours
      ].noConstantWorkingHours.newEvents = allNewEvents
      dispatch(changeEditedWorkerHours(newEditedWorkersHours))
    } else {
      const newEditedWorker = {
        constantWorkingHours: [],
        indexWorker: item.user._id,
        noConstantWorkingHours: {
          deletedEventsIds: [...deletedEventsIds],
          newEvents: [...newEvents],
        },
      }
      const allNewEditedWorkerHours = [
        ...newEditedWorkersHours,
        newEditedWorker,
      ]
      dispatch(changeEditedWorkerHours(allNewEditedWorkerHours))
    }
    setNewEvents([])
    setDeletedEventsIds([])
    handleClose()
  }

  const slotsValue =
    item.company.reservationEveryTime === 5
      ? 10
      : item.company.reservationEveryTime === 10
      ? 5
      : item.company.reservationEveryTime === 15
      ? 4
      : 2

  const takeDateDayToday = date.getMonth()
  const takeDateYear = date.getFullYear()
  const selectMonthName = getMonthNamePl(takeDateDayToday)
  const finnalDate = `${selectMonthName} ${takeDateYear}`

  const disabledSaveCalendar =
    newEvents.length > 0 || deletedEventsIds.length > 0

  return (
    <BackgroundContentCalendar>
      <TitleMonthYear>
        <div>
          <ButtonIcon
            title="Poprzedni tydzień"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<FaCalendarMinus />}
            secondColors
            onClick={() => handleChangeDate("minus")}
          />
        </div>
        <TitleMonthYearContent colorBlind={colorBlind}>
          {finnalDate}
        </TitleMonthYearContent>
        <div>
          <ButtonIcon
            title="Dzisiaj"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<FaCalendarDay />}
            secondColors
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
            secondColors
            onClick={() => handleChangeDate("plus")}
          />
        </div>
      </TitleMonthYear>
      <BackgroundCalendarStyle colorBlind={colorBlind}>
        <Calendar
          culture="pl"
          views={["week"]}
          selectable
          localizer={localizer}
          events={allEvents}
          defaultView="week"
          date={date}
          onNavigate={date => {
            setDate(date)
          }}
          startAccessor="start"
          endAccessor="end"
          timeslots={slotsValue}
          step={item.company.reservationEveryTime}
          toolbar={false}
          min={minHoursInCalendar} // 8.00 AM
          max={maxHoursInCalendar} // Max will be 6.00 PM!
          onSelectSlot={handleOnSelectSlot} // zdarzenie po zaznaczeniu okresu
          // onSelecting={handleOnSelecting} // wyłaczanie i włączanie klikalności
          // slotPropGetter={handleSlotPropGetter} // nadanie szarego koloru
          slotPropGetter={handleSlotPropGetterOpenHoursCompany} // nadanie koloru godzin otwartych firmy
          onSelectEvent={handleClickEvent}
          eventPropGetter={handleEventPropGetter}
        />
      </BackgroundCalendarStyle>
      <WarningStyle colorBlind={colorBlind}>
        Uwaga tworząc tutaj dzień pracy, jest on automatycznie zastępywany
        względem stałych godzin pracy.
        <IconWarning colorBlind={colorBlind}>
          <MdInfo />
        </IconWarning>
      </WarningStyle>

      <ButtonsPosition>
        <ButtonItemStyle>
          <ButtonIcon
            title="Anuluj"
            uppercase
            fontIconSize="25"
            fontSize="16"
            icon={<FaArrowLeft />}
            customColorButton={Colors(colorBlind).dangerColorDark}
            customColorIcon={Colors(colorBlind).dangerColor}
            onClick={handleCloseCalendar}
          />
        </ButtonItemStyle>
        <ButtonItemStyle>
          <ButtonIcon
            title="Zapisz"
            uppercase
            fontIconSize="25"
            fontSize="16"
            icon={<FaSave />}
            secondColors
            onClick={handleSaveNoConstTimework}
            disabled={!disabledSaveCalendar}
          />
        </ButtonItemStyle>
      </ButtonsPosition>
      <CalendarEventItemClicked
        colorBlind={colorBlind}
        handleClosePopupEventItem={handleClosePopupEventItem}
        selectedEvent={selectedEvent}
        screenOpen={selectedEventOpen}
        allEvents={allEvents}
        handleDeleteNoConstTimeworkToSave={handleDeleteNoConstTimeworkToSave}
        handleCreateNoConstTimeworkToSave={handleCreateNoConstTimeworkToSave}
        itemCompanyHours={item.company.openingDays}
      />
      <CalendarEventItemClicked
        colorBlind={colorBlind}
        handleClosePopupEventItem={handleCloseNewEventItem}
        selectedEvent={newEvent}
        screenOpen={newEventOpen}
        allEvents={allEvents}
        handleDeleteNoConstTimeworkToSave={handleDeleteNoConstTimeworkToSave}
        handleCreateNoConstTimeworkToSave={handleCreateNoConstTimeworkToSave}
        itemCompanyHours={item.company.openingDays}
      />
    </BackgroundContentCalendar>
  )
}
export default BigCalendarWorkerHours
