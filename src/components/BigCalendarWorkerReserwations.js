import React, { useState, useRef, useEffect } from "react"
import { Calendar, momentLocalizer } from "react-big-calendar"
import moment from "moment"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import "moment/locale/pl"
import { getMonthNamePl } from "../common/Functions"
import ButtonIcon from "./ButtonIcon"
import {
  FaCalendarDay,
  FaCalendarPlus,
  FaCalendarMinus,
  FaArrowLeft,
  FaCalendar,
} from "react-icons/fa"
import SelectCreated from "./SelectCreated"
import CalendarWorkerReserwatinEvent from "./CalendarWorkerReserwatinEvent"
import { useSelector, useDispatch } from "react-redux"
import { AllMonths } from "../common/AllMonths"
import Popup from "./Popup"
import SelectDataCalendar from "./SelectDataCalendar"
import {
  fetchUpdateWorkerReserwation,
  fetchDoReserwationWorker,
  fetchAddWorkerClientReserwation,
} from "../state/actions"
import CalendarWorkerReserwatinNewEvent from "./CalendarWorkerReserwatinNewEvent"
import CalendarWorkerReserwatinNewReserwation from "./CalendarWorkerReserwatinNewReserwation"
import { ServiceColorsReserwationsConvert } from "../common/ServiceColorsReserwationsConvert"
import NewEventView from "./BigCalendarWorkerReserwationsTooltip"

const BackgroundContentCalendar = styled.div`
  position: relative;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  padding: 10px;
  max-width: 95vw;
  width: 900px;
`

const BackgroundCalendarStyle = styled.div`
  background-color: white;
  max-height: 70vh;
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

const MarginButtons = styled.div`
  margin-bottom: 10px;
`

const IconMobileDays = styled.div`
  height: 35px;
  width: 35px;
  margin: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: ${props => Colors(props.siteProps).primaryColorDark};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  cursor: pointer;
  font-size: 0.9rem;
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
  text-align: center;
  @media all and (max-width: 767px) {
    font-size: 0.8rem;
    padding-bottom: 14px;
  }
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
  @media all and (max-width: 767px) {
    width: 135px;
    margin-right: 0px;
    margin: 2px;
  }
`

const ContentSelect = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
  @media all and (max-width: 767px) {
    justify-content: space-around;
    margin-bottom: 0px;
  }
`

const ContentWorkersAdmin = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
  max-width: 100%;
  width: 900px;
  overflow-y: auto;
  height: 50px;
  @media all and (max-width: 767px) {
    height: 40px;
  }
`

const WorkerItemStyle = styled.div`
  background-color: ${props =>
    props.active
      ? Colors(props.siteProps).primaryColor
      : Colors(props.siteProps).primaryColorDark};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  margin-right: 10px;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-top: 10px;
  font-size: 1rem;
  transition-property: transform, background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    transform: scale(1.1);
  }

  @media all and (max-width: 767px) {
    font-size: 0.8rem;
  }
`

const BigCalendarWorkerReserwations = ({
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
  workingHours,
  isMobile = false,
}) => {
  const [datePicker, setDatePicker] = useState(new Date())
  const [datePickerActive, setDatePickerActive] = useState(false)
  const [selectedEventOpen, setSelectedEventOpen] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [newEvent, setNewEvent] = useState(null)
  const [newEventOpen, setNewEventOpen] = useState(null)
  const [allEvents, setAllEvents] = useState([])
  const [allWorkingHours, setAllWorkingHours] = useState([])
  const siteProps = useSelector(state => state.siteProps)
  const [chooseEventMenu, setChooseEventMenu] = useState(false)
  const [newReserwationOpen, setNewReserwationOpen] = useState(false)
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

  const [monthPicker, setMonthPicker] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    const newDate = new Date(
      datePicker.getFullYear(),
      datePicker.getMonth(),
      datePicker.getDate()
    )
    setDateCalendar(newDate)
  }, [datePicker]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!!workingHours) {
      const arrayOpeningDays = [
        {
          id: 0,
          start: workingHours.openingDays.sun.start,
          end: workingHours.openingDays.sun.end,
          disabled: workingHours.openingDays.sun.disabled,
        },
        {
          id: 1,
          start: workingHours.openingDays.mon.start,
          end: workingHours.openingDays.mon.end,
          disabled: workingHours.openingDays.mon.disabled,
        },
        {
          id: 2,
          start: workingHours.openingDays.tue.start,
          end: workingHours.openingDays.tue.end,
          disabled: workingHours.openingDays.tue.disabled,
        },
        {
          id: 3,
          start: workingHours.openingDays.wed.start,
          end: workingHours.openingDays.wed.end,
          disabled: workingHours.openingDays.wed.disabled,
        },
        {
          id: 4,
          start: workingHours.openingDays.thu.start,
          end: workingHours.openingDays.thu.end,
          disabled: workingHours.openingDays.thu.disabled,
        },
        {
          id: 5,
          start: workingHours.openingDays.fri.start,
          end: workingHours.openingDays.fri.end,
          disabled: workingHours.openingDays.fri.disabled,
        },
        {
          id: 6,
          start: workingHours.openingDays.sat.start,
          end: workingHours.openingDays.sat.end,
          disabled: workingHours.openingDays.sat.disabled,
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
        const selectedDayNoConst = workingHours.noConstWorkingHours.find(
          noConstDay => {
            const noConstDayTimeStart = new Date(noConstDay.start).getDate()
            return i === noConstDayTimeStart
          }
        )
        let selectedDayOff = null
        let selectedConstWorkingHour = null
        if (!!!selectedDayNoConst) {
          selectedDayOff = workingHours.daysOff.find(dayOff => {
            const dayOffDate = `${dayOff.year}-${dayOff.month}-${dayOff.day}`
            return generateFullDayDate === dayOffDate
          })
          if (!!!selectedDayOff) {
            selectedConstWorkingHour = workingHours.constWorkingHours.find(
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
            }
          }
        }
        if (!!dayToRender) {
          allDaysCalendar.push(dayToRender)
        }
      }
      setAllWorkingHours(allDaysCalendar)
    }
  }, [workingHours]) // eslint-disable-line react-hooks/exhaustive-deps

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
      const mapItemReserwations = item.reserwations.map(itemMaped => {
        const selectedServices = !!itemMaped.company.services
          ? itemMaped.company.services
          : []
        const filterServiceFromCompany = selectedServices.find(
          service => service._id === itemMaped.serviceId
        )
        let selectedColorEvent = 1
        if (!!filterServiceFromCompany) {
          if (!!filterServiceFromCompany.serviceColor) {
            selectedColorEvent = filterServiceFromCompany.serviceColor
          }
        }
        const selectServiceColor = ServiceColorsReserwationsConvert.find(
          conv => conv.value === selectedColorEvent
        )
        let userName = "Brak użytkownika"
        if (!!itemMaped.fromUser) {
          if (!!itemMaped.fromUser.name) {
            userName = Buffer.from(itemMaped.fromUser.name, "base64").toString(
              "utf-8"
            )
          }
        }
        let userSurname = ""
        if (!!itemMaped.fromUser) {
          if (!!itemMaped.fromUser.surname) {
            userSurname = Buffer.from(
              itemMaped.fromUser.surname,
              "base64"
            ).toString("utf-8")
          }
        }
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
          title: `${userName} ${userSurname} - ${
            !!itemMaped.communitingId
              ? `Rezerwacja czasu - dojazd ${itemMaped.communitingId.city}, ${itemMaped.communitingId.street}, ${itemMaped.communitingId.description}`
              : !!itemMaped.workerReserwation
              ? "Rezerwacja czasu"
              : itemMaped.serviceName
          }`,
          fullDate: `${itemMaped.dateDay}-${itemMaped.dateMonth}-${itemMaped.dateYear}`,
          _id: itemMaped._id,
          colorItem: !!itemMaped.workerReserwation
            ? "gray"
            : selectServiceColor.label,
        }
        return itemMapedResult
      })
      setAllEvents(mapItemReserwations)
    }
  }, [item])

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
    const getterFullDateNewPosition = `${getterYear}-${getterMonth}-${getterDay}`
    const selectDayWorkingHours = allWorkingHours.find(
      hour => hour.fullDate === getterFullDateNewPosition
    )
    const isActualMonth =
      dateCalendar.getFullYear() === takeDateStart.getFullYear() &&
      dateCalendar.getMonth() === takeDateStart.getMonth()

    if (!!selectDayWorkingHours) {
      const calendarDate =
        takeDateStart.getHours() * 60 + takeDateStart.getMinutes()
      const numberMax =
        Number(selectDayWorkingHours.end.getHours()) * 60 +
        Number(selectDayWorkingHours.end.getMinutes())
      const numberMin =
        Number(selectDayWorkingHours.start.getHours()) * 60 +
        Number(selectDayWorkingHours.start.getMinutes())

      if (
        calendarDate >= numberMin &&
        calendarDate < numberMax &&
        !selectDayWorkingHours.holidays
      ) {
        if (!!selectDayWorkingHours) {
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
    if (event.colorItem === "gray") {
      return {
        className: "gray-event",
      }
    } else if (event.colorItem === "red") {
      return {
        className: "red-event",
      }
    } else if (event.colorItem === "blue") {
      return {
        className: "blue-event",
      }
    } else if (event.colorItem === "yellow") {
      return {
        className: "yellow-event",
      }
    } else if (event.colorItem === "orange") {
      return {
        className: "orange-event",
      }
    } else if (event.colorItem === "pink") {
      return {
        className: "pink-event",
      }
    } else if (event.colorItem === "green") {
      return {
        className: "green-event",
      }
    } else if (event.colorItem === "purple") {
      return {
        className: "purple-event",
      }
    }
  }

  const handleOnSelectSlot = eventItem => {
    if (eventItem.slots.length > 2) {
      clearInterval(timerToClearNew.current)
      setNewEvent(eventItem)
      setChooseEventMenu(true)
    }
  }

  const handleClickNewWorkerReserwation = () => {
    setNewEventOpen(true)
    setChooseEventMenu(false)
  }

  const handleCloseChooseEventMenu = () => {
    setChooseEventMenu(false)
    timerToClearNew.current = setTimeout(() => {
      setNewEvent(null)
    }, 400)
  }

  const handleClickNewReserwation = () => {
    setNewReserwationOpen(true)
    setChooseEventMenu(false)
  }

  const handleCloseNewEventItem = () => {
    setNewEventOpen(false)
    setChooseEventMenu(true)
  }

  const handleResetCloseNewEventItem = () => {
    setNewEventOpen(false)
    setChooseEventMenu(false)
  }

  const handleCloseNewEventReserwationItem = () => {
    setNewReserwationOpen(false)
    setChooseEventMenu(true)
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
      } else if (!isValidNextMonth) {
        newDate = new Date(
          dateCalendar.getFullYear(),
          dateCalendar.getMonth() + 1,
          1
        )
      } else {
        newDate = new Date(
          dateCalendar.getFullYear(),
          dateCalendar.getMonth() + 1,
          0
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

  const handleClickEvent = eventItem => {
    clearInterval(timerToClearEdited.current)
    const selectItemReserwation = item.reserwations.find(
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

  const handleCloseCalendar = () => {
    handleClose()
  }

  const handleChangeReserwationStatus = (
    selectedEventId,
    status,
    newDateStart = null,
    newDateEnd = null,
    workerSelected = null,
    dateReserwation = null
  ) => {
    if (status === "canceled") {
      dispatch(
        fetchUpdateWorkerReserwation(
          user.token,
          isAdmin ? userWorkerActive : user.userId,
          selectedEventId,
          true,
          null,
          null,
          dateCalendar.getFullYear(),
          dateCalendar.getMonth() + 1,
          user.company._id,
          null,
          null,
          null
        )
      )
    } else if (status === "finished") {
      dispatch(
        fetchUpdateWorkerReserwation(
          user.token,
          isAdmin ? userWorkerActive : user.userId,
          selectedEventId,
          null,
          null,
          false,
          dateCalendar.getFullYear(),
          dateCalendar.getMonth() + 1,
          user.company._id,
          null,
          null,
          null
        )
      )
    } else if (status === "noFinished") {
      dispatch(
        fetchUpdateWorkerReserwation(
          user.token,
          isAdmin ? userWorkerActive : user.userId,
          selectedEventId,
          null,
          null,
          true,
          dateCalendar.getFullYear(),
          dateCalendar.getMonth() + 1,
          user.company._id,
          null,
          null,
          null
        )
      )
    } else if (status === "update") {
      dispatch(
        fetchUpdateWorkerReserwation(
          user.token,
          isAdmin ? userWorkerActive : user.userId,
          selectedEventId,
          null,
          true,
          null,
          dateCalendar.getFullYear(),
          dateCalendar.getMonth() + 1,
          user.company._id,
          newDateStart,
          newDateEnd,
          workerSelected,
          dateReserwation
        )
      )
    }
  }

  const handleAddWorkerReserwation = (
    dateStart,
    dateEnd,
    dateFull,
    reserwationMessage
  ) => {
    dispatch(
      fetchDoReserwationWorker(
        user.token,
        isAdmin ? userWorkerActive : user.userId,
        user.company._id,
        dateStart,
        dateEnd,
        dateFull,
        reserwationMessage,
        dateCalendar.getFullYear(),
        dateCalendar.getMonth() + 1
      )
    )
  }

  const handleAddNewReserwation = (
    dateStart,
    dateEnd,
    dateFull,
    reserwationMessage = null,
    selectedWorkerUserId = null,
    selectedServiceId = null,
    isActiveUser,
    phone = null,
    name = null,
    surname = null,
    email = null,
    activePromotion = false,
    activeHappyHour = false
  ) => {
    dispatch(
      fetchAddWorkerClientReserwation(
        user.token,
        user.company._id,
        dateStart,
        dateEnd,
        dateFull,
        reserwationMessage,
        selectedWorkerUserId,
        selectedServiceId,
        isActiveUser,
        phone,
        name,
        surname,
        email,
        activePromotion,
        activeHappyHour
      )
    )
  }

  const handleCloseDatePicker = () => {
    setDatePickerActive(prevState => !prevState)
  }

  const handleChangeUserWorkerActive = userId => {
    setUserWorkerActive(userId)
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

  const mapWorkers =
    isAdmin &&
    item.company.workers.map((worker, indexWorker) => {
      const userName = Buffer.from(worker.user.name, "base64").toString("utf-8")
      const userSurname = Buffer.from(worker.user.surname, "base64").toString(
        "utf-8"
      )
      return (
        <WorkerItemStyle
          key={indexWorker}
          siteProps={siteProps}
          active={userWorkerActive === worker.user._id}
          onClick={() => handleChangeUserWorkerActive(worker.user._id)}
        >
          {`${userName} ${userSurname}`}
        </WorkerItemStyle>
      )
    })
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
        {isAdmin && (
          <ContentWorkersAdmin>
            <WorkerItemStyle
              siteProps={siteProps}
              active={userWorkerActive === user.userId}
              onClick={() => handleChangeUserWorkerActive(user.userId)}
            >{`${user.userName} ${user.userSurname}`}</WorkerItemStyle>
            {mapWorkers}
          </ContentWorkersAdmin>
        )}
        <TitleMonthYear>
          {!!!isMobile ? (
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
          ) : (
            <IconMobileDays
              siteProps={siteProps}
              onClick={() => handleChangeDate("minus")}
            >
              <FaCalendarMinus />
            </IconMobileDays>
          )}
          <TitleMonthYearContent siteProps={siteProps} className="marginItems">
            {finnalDate}
          </TitleMonthYearContent>
          {!!!isMobile ? (
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
          ) : (
            <IconMobileDays
              siteProps={siteProps}
              onClick={() => handleChangeDate("today")}
            >
              <FaCalendarDay />
            </IconMobileDays>
          )}
          {!!!isMobile ? (
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
          ) : (
            <IconMobileDays
              siteProps={siteProps}
              onClick={() => handleChangeDate("plus")}
            >
              <FaCalendarPlus />
            </IconMobileDays>
          )}
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
            view={isMobile ? "day" : "week"}
            date={dateCalendar}
            onNavigate={date => {
              setDateCalendar(date)
            }}
            startAccessor="start"
            endAccessor="end"
            timeslots={slotsValue}
            step={item.company.reservationEveryTime}
            toolbar={false}
            min={new Date(new Date().setHours(6, 0))}
            max={new Date(new Date().setHours(23, 30))}
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
        <CalendarWorkerReserwatinEvent
          siteProps={siteProps}
          handleClosePopupEventItem={handleClosePopupEventItem}
          selectedEvent={selectedEvent}
          screenOpen={selectedEventOpen}
          allEvents={allEvents}
          handleChangeReserwationStatus={handleChangeReserwationStatus}
          itemCompanyHours={item.company.openingDays}
          itemCompany={item.company}
          isAdmin={isAdmin}
        />
        <CalendarWorkerReserwatinNewEvent
          siteProps={siteProps}
          handleClosePopupEventItem={handleCloseNewEventItem}
          handleResetCloseNewEventItem={handleResetCloseNewEventItem}
          selectedEvent={newEvent}
          screenOpen={newEventOpen}
          allEvents={allEvents}
          itemCompanyHours={item.company.openingDays}
          handleAddWorkerReserwation={handleAddWorkerReserwation}
          user={user}
          isAdmin={isAdmin}
        />
        <CalendarWorkerReserwatinNewReserwation
          siteProps={siteProps}
          handleClosePopupEventItem={handleCloseNewEventReserwationItem}
          selectedEvent={newEvent}
          screenOpen={newReserwationOpen}
          itemCompanyHours={item.company.openingDays}
          handleAddWorkerReserwation={handleAddNewReserwation}
          user={user}
          isAdmin={isAdmin}
          companyItems={item.company}
          chooseEventMenu={chooseEventMenu}
          setChooseEventMenu={setChooseEventMenu}
          setNewReserwationOpen={setNewReserwationOpen}
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
          activeData={dateCalendar}
        />
      </Popup>
      <Popup
        popupEnable={chooseEventMenu}
        handleClose={handleCloseChooseEventMenu}
        title="Opcje"
        borderRadius
        maxWidth="400"
      >
        <>
          <MarginButtons>
            <ButtonIcon
              title="Nowa rezerwacja klienta"
              uppercase
              fontIconSize="20"
              fontSize="16"
              icon={<FaCalendarPlus />}
              customColorButton={Colors(siteProps).successColorDark}
              customColorIcon={Colors(siteProps).successColor}
              onClick={handleClickNewReserwation}
            />
          </MarginButtons>
          <ButtonIcon
            title="Nowa rezerwacja czasu"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<FaCalendar />}
            secondColors
            onClick={handleClickNewWorkerReserwation}
          />
        </>
      </Popup>
    </>
  )
}
export default BigCalendarWorkerReserwations
