import React, { useState } from "react"
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
import { MdWork } from "react-icons/md"
import { FaCalendarDay, FaCalendarPlus, FaCalendarMinus } from "react-icons/fa"
import { useSelector } from "react-redux"

const BackgroundContentCalendar = styled.div`
  position: relative;
  background-color: rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  padding: 10px;
`

const BackgroundCalendarStyle = styled.div`
  background-color: white;
  max-height: 80vh;
  overflow: auto;
  max-width: 90vw;
  width: 900px;
  min-width: 800px;
  /* border-radius: 5px; */
  opacity: 0.95;
  margin-bottom: 10px;

  .rbc-time-view {
    border: none;
  }
  .rbc-event {
    background-color: #f7a52c;
    border: none;
    border-radius: 5px;
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
`

const TitleMonthYearContent = styled.div`
  background-color: ${props => Colors(props.colorBlind).secondColor};
  color: white;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 5px 20px;
  font-size: 1.6rem;
`

const BigCalendarWorkerHours = ({ item }) => {
  const [date, setDate] = useState(new Date())
  const colorBlind = useSelector(state => state.colorBlind)
  console.log(item)

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
      return {
        className: "rbc-day-slot rbc-time-slot rbc-no-disabled-active",
      }
    } else {
      return {
        className: "rbc-day-slot rbc-time-slot rbc-disabled-active",
      }
    }
  }

  const handleOnSelectSlot = x => {
    console.log(x)
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

  console.log(selectedDayString)
  const myEvents = [
    {
      id: 1,
      title: "Long Event",
      start: new Date(2015, 3, 7),
      end: new Date(2015, 3, 10),
    },

    {
      id: 2,
      title: "DTS STARTS",
      start: new Date(2016, 2, 13, 0, 0, 0),
      end: new Date(2016, 2, 20, 0, 0, 0),
    },

    {
      id: 3,
      title: "DTS ENDS",
      start: new Date(2016, 10, 6, 0, 0, 0),
      end: new Date(2016, 10, 13, 0, 0, 0),
    },

    {
      id: 4,
      title: "Some Event",
      start: new Date(2015, 3, 9, 0, 0, 0),
      end: new Date(2015, 3, 10, 0, 0, 0),
    },
    {
      id: 6,
      title: "Meeting",
      start: new Date(2015, 3, 12, 10, 30, 0, 0),
      end: new Date(2015, 3, 12, 12, 30, 0, 0),
      desc: "Pre-meeting meeting, to prepare for the meeting",
    },
    {
      id: 7,
      title: "Lunch",
      start: new Date(2015, 3, 12, 12, 0, 0, 0),
      end: new Date(2015, 3, 12, 13, 0, 0, 0),
      desc: "Power lunch",
    },
    {
      id: 8,
      title: "Meeting",
      start: new Date(2015, 3, 12, 14, 0, 0, 0),
      end: new Date(2015, 3, 12, 15, 0, 0, 0),
    },
    {
      id: 9,
      title: "Happy Hour",
      start: new Date(2015, 3, 12, 17, 0, 0, 0),
      end: new Date(2015, 3, 12, 17, 30, 0, 0),
      desc: "Most important meal of the day",
    },
    {
      id: 10,
      title: "Dinner",
      start: new Date(2015, 3, 12, 20, 0, 0, 0),
      end: new Date(2015, 3, 12, 21, 0, 0, 0),
    },
    {
      id: 11,
      title: "Birthday Party",
      start: new Date(2015, 3, 13, 7, 0, 0),
      end: new Date(2015, 3, 13, 10, 30, 0),
    },
    {
      id: 12,
      title: "Late Night Event",
      start: new Date(2015, 3, 17, 19, 30, 0),
      end: new Date(2015, 3, 18, 2, 0, 0),
    },
    {
      id: 12.5,
      title: "Late Same Night Event",
      start: new Date(2015, 3, 17, 19, 30, 0),
      end: new Date(2015, 3, 17, 23, 30, 0),
    },
    {
      id: 13,
      title: "Multi-day Event",
      start: new Date(2015, 3, 20, 19, 30, 0),
      end: new Date(2015, 3, 22, 2, 0, 0),
    },
    {
      id: 14,
      title: "Today",
      start: new Date(new Date().setHours(new Date().getHours() - 10)),
      end: new Date(new Date().setHours(new Date().getHours() - 7)),
    },
    {
      id: 16,
      title: "Video Record",
      start: new Date(2015, 3, 14, 15, 30, 0),
      end: new Date(2015, 3, 14, 19, 0, 0),
    },
    {
      id: 17,
      title: "Dutch Song Producing",
      start: new Date(2015, 3, 14, 16, 30, 0),
      end: new Date(2015, 3, 14, 20, 0, 0),
    },
    {
      id: 18,
      title: "Itaewon Halloween Meeting",
      start: new Date(2015, 3, 14, 16, 30, 0),
      end: new Date(2015, 3, 14, 17, 30, 0),
    },
    {
      id: 19,
      title: "Online Coding Test",
      start: new Date(2015, 3, 14, 17, 30, 0),
      end: new Date(2015, 3, 14, 20, 30, 0),
    },
    {
      id: 20,
      title: "An overlapped Event",
      start: new Date(2015, 3, 14, 17, 0, 0),
      end: new Date(2015, 3, 14, 18, 30, 0),
    },
    {
      id: 21,
      title: "Phone Interview",
      start: new Date(2015, 3, 14, 17, 0, 0),
      end: new Date(2015, 3, 14, 18, 30, 0),
    },
    {
      id: 22,
      title: "Cooking Class",
      start: new Date(2015, 3, 14, 17, 30, 0),
      end: new Date(2015, 3, 14, 19, 0, 0),
    },
    {
      id: 23,
      title: "Go to the gym",
      start: new Date(2015, 3, 14, 18, 30, 0),
      end: new Date(2015, 3, 14, 20, 0, 0),
    },
  ]

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
          //   date={new Date(2015, 11, 17)}
          culture="pl"
          views={["week"]}
          selectable
          localizer={localizer}
          events={myEvents}
          defaultView="week"
          date={date}
          onNavigate={date => {
            setDate(date)
          }}
          // scrollToTime={new Date(2020, 0, 1, 6)}
          // defaultDate={new Date()}
          startAccessor="start"
          endAccessor="end"
          timeslots={slotsValue}
          step={item.company.reservationEveryTime}
          toolbar={false}
          min={minHoursInCalendar} // 8.00 AM
          max={maxHoursInCalendar} // Max will be 6.00 PM!
          onSelectSlot={handleOnSelectSlot} // zdarzenie po zaznaczeniu okresu
          onSelecting={handleOnSelecting} // wyłaczanie i włączanie klikalności
          slotPropGetter={handleSlotPropGetter} // nadanie szarego koloru
        />
      </BackgroundCalendarStyle>
      <ButtonIcon
        title="Zapisz"
        uppercase
        fontIconSize="25"
        fontSize="16"
        icon={<MdWork />}
        secondColors
        // onClick={() => handleChangeDate("today")}
      />
    </BackgroundContentCalendar>
  )
}
export default BigCalendarWorkerHours
