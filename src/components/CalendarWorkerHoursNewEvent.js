import React, { useEffect, useState } from "react"
import { CSSTransition } from "react-transition-group"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import ButtonIcon from "./ButtonIcon"
import { FaSave } from "react-icons/fa"
import { MdClose, MdInfo, MdTimelapse } from "react-icons/md"
import {
  getMonthNamePl,
  getMonthAndReturnFull,
  getMonthAndReturnEng,
} from "../common/Functions"
import Popup from "./Popup"
import InputIcon from "./InputIcon"
import TimePickerContent from "./TimePicker"
import { Checkbox } from "react-input-checkbox"
import { addNewNoConstHour, deleteNoConstHour } from "../state/actions"
import { useDispatch } from "react-redux"

const TextCheckbox = styled.span`
  padding-left: 10px;
  font-family: "Poppins-Bold", sans-serif;
  user-select: none;
`

const CheckboxStyle = styled.div`
  margin-bottom: 30px;

  .material-checkbox__input:checked + .material-checkbox__image {
    background-color: ${props => Colors(props.siteProps).secondColor};
  }

  span {
    color: ${props => Colors(props.siteProps).textNormalBlack};
    border-color: ${props => Colors(props.siteProps).textNormalBlack};
  }
`

const EventItemPosition = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`

const EventItemPositionContent = styled.div`
  position: relative;
  background-color: ${props => Colors(props.siteProps).companyItemBackground};
  width: 800px;
  max-width: 90%;
  max-height: 90%;
  border-radius: 5px;
`

const EventItemPositionContentPadding = styled.div`
  padding: 10px;
`

const ButtonsItemEvent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
`

const WidthTimePicker = styled.div`
  background-color: transparent;
  min-width: 280px;
  max-width: 90%;
`

const ButtonItemStyle = styled.div`
  margin-left: 10px;
  margin-top: 10px;
`

const TitleItemName = styled.div`
  width: 100%;
  background-color: ${props => Colors(props.siteProps).secondColor};
  padding: 2px 8px;
  font-size: 1.2rem;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  padding-right: 30px;
`

const CloseEditCreateMode = styled.div`
  position: absolute;
  height: 30px;
  top: 0px;
  right: 0px;
  padding: 5px;
  font-size: 1.2rem;
  overflow: hidden;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  cursor: pointer;
  border-top-right-radius: 5px;
  background-color: rgba(0, 0, 0, 0.1);
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`

const WarningStyle = styled.div`
  position: relative;
  background-color: #757575;
  padding: 5px 10px;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  padding-left: 50px;
  font-size: 0.8rem;
  margin: 1px;
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

const ItemTitle = styled.div`
  font-size: 1.1rem;
  color: ${props => Colors(props.siteProps).textNormalBlack};
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  span {
    padding-left: 5px;
    color: ${props => Colors(props.siteProps).secondColor};
  }
`

const ButtonItemStyleTime = styled.div`
  margin-left: 10px;
`

const CalendarWorkerReserwatinNewEvent = ({
  siteProps,
  handleClosePopupEventItem,
  selectedEvent,
  allEvents,
  screenOpen,
  itemCompanyHours,
  user,
  workerId,
  item,
}) => {
  const [openDateStart, setOpenDateStart] = useState(false)
  const [openDateEnd, setOpenDateEnd] = useState(false)
  const [newTimeStart, setNewTimeStart] = useState(null)
  const [newTimeEnd, setNewTimeEnd] = useState(null)
  const [dateStart, setDateStart] = useState(null)
  const [dateEnd, setDateEnd] = useState(null)
  const [isHolidays, setIsHolidays] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    setNewTimeStart(null)
    setNewTimeEnd(null)
    handleClosePopupEventItem()
  }, [item])

  useEffect(() => {
    if (!!selectedEvent) {
      const dateStartName = `${
        selectedEvent.start.getHours() < 10
          ? `0${selectedEvent.start.getHours()}`
          : selectedEvent.start.getHours()
      }:${
        selectedEvent.start.getMinutes() < 10
          ? `0${selectedEvent.start.getMinutes()}`
          : selectedEvent.start.getMinutes()
      }`
      const dateEndName = `${
        selectedEvent.end.getHours() < 10
          ? `0${selectedEvent.end.getHours()}`
          : selectedEvent.end.getHours()
      }:${
        selectedEvent.end.getMinutes() < 10
          ? `0${selectedEvent.end.getMinutes()}`
          : selectedEvent.end.getMinutes()
      }`
      if (!!selectedEvent.holidays) {
        setIsHolidays(selectedEvent.holidays)
      } else {
        setIsHolidays(false)
      }
      setDateStart(dateStartName)
      setDateEnd(dateEndName)
    }
  }, [dateStart, dateEnd, selectedEvent])

  const handleChangeCheckbox = setChange => {
    setIsHolidays(prevState => !prevState)
  }

  const handleOpenDateStartTimePicker = () => {
    setOpenDateStart(prevState => !prevState)
  }

  const handleOpenDateEndTimePicker = () => {
    setOpenDateEnd(prevState => !prevState)
  }

  const handleUpdateTimeStart = time => {
    setOpenDateStart(false)
    setNewTimeStart(time)
  }

  const handleUpdateTimeEnd = time => {
    setOpenDateEnd(false)
    setNewTimeEnd(time)
  }

  const handleReserPopupEvent = () => {
    setNewTimeStart(null)
    setNewTimeEnd(null)
    handleClosePopupEventItem()
  }

  const handleAddNewNoConstHour = () => {
    const dateStartToSent = !!newTimeStart ? newTimeStart : dateStart
    const splitDateStartToSent = dateStartToSent.split(":")
    const dateEndToSent = !!newTimeEnd ? newTimeEnd : dateEnd
    const splitDateEndToSent = dateEndToSent.split(":")
    const newDate = new Date(selectedEvent.start)

    const selectedDayToCompany = getMonthAndReturnEng(
      selectedEvent.start.getDay()
    )
    const selectedHoursCompany = item.company.openingDays[selectedDayToCompany]
    const companyDateStart = selectedHoursCompany.start.split(":")
    const companyDateEnd = selectedHoursCompany.end.split(":")

    const newNoConstHour = {
      fullDate: `${newDate.getDate()}-${
        newDate.getMonth() + 1
      }-${newDate.getFullYear()}`,
      holidays: isHolidays,
      start: new Date(
        new Date(newDate.setHours(Number(splitDateStartToSent[0]))).setMinutes(
          Number(splitDateStartToSent[1])
        )
      ),
      end: new Date(
        new Date(newDate.setHours(Number(splitDateEndToSent[0]))).setMinutes(
          Number(splitDateEndToSent[1])
        )
      ),
      year: newDate.getFullYear(),
      month: newDate.getMonth() + 1,
    }

    if (!!isHolidays) {
      newNoConstHour.start = selectedHoursCompany.disabled
        ? null
        : new Date(
            new Date(
              new Date(selectedEvent.start).setHours(companyDateStart[0])
            ).setMinutes(companyDateStart[1])
          )
      newNoConstHour.end = selectedHoursCompany.disabled
        ? null
        : new Date(
            new Date(
              new Date(selectedEvent.start).setHours(companyDateEnd[0])
            ).setMinutes(companyDateEnd[1])
          )
    }

    dispatch(
      addNewNoConstHour(
        user.token,
        user.company._id,
        item.user._id === user.userId ? "owner" : workerId,
        newNoConstHour
      )
    )
  }

  const handleDeleteNoConstHours = () => {
    dispatch(
      deleteNoConstHour(
        user.token,
        user.company._id,
        item.user._id === user.userId ? "owner" : workerId,
        selectedEvent._id
      )
    )
  }

  let selectedDate = ""
  let selectMonthName = ""
  let selectedDayWeekName = ""
  let selectButtonsToEvents = null
  let selectedEventInAllEventWarning = null
  let selectedEventInAllEventWarningExtraTime = null
  let selectedEventInAllEvent = null
  let titleEvent = ""
  let companyOpenHours = null
  let renderDateStart = ""
  let renderDateEnd = ""
  let switchButtonHolidays = null
  if (!!selectedEvent) {
    const selectedDayOpenCompany = getMonthAndReturnEng(
      selectedEvent.start.getDay()
    )
    companyOpenHours = itemCompanyHours[selectedDayOpenCompany]

    switchButtonHolidays = !!selectedEvent.action && !companyOpenHours.disabled && (
      <CheckboxStyle siteProps={siteProps}>
        <Checkbox
          theme="material-checkbox"
          value={isHolidays}
          onChange={handleChangeCheckbox}
        >
          <TextCheckbox>Dzień wolony</TextCheckbox>
        </Checkbox>
      </CheckboxStyle>
    )

    selectedEventInAllEvent = allEvents.find(
      item => item.start.getDate() === selectedEvent.start.getDate()
    )

    selectedDate = `${
      selectedEvent.start.getDate() < 10
        ? `0${selectedEvent.start.getDate()}`
        : selectedEvent.start.getDate()
    }-${
      selectedEvent.start.getMonth() + 1 < 10
        ? `0${selectedEvent.start.getMonth() + 1}`
        : selectedEvent.start.getMonth() + 1
    }-${selectedEvent.start.getFullYear()}`

    const selectedMonth = selectedEvent.start.getMonth()
    selectMonthName = getMonthNamePl(selectedMonth)

    const selectedDayWeek = selectedEvent.start.getDay()
    selectedDayWeekName = getMonthAndReturnFull(selectedDayWeek)

    titleEvent = !!selectedEvent.action
      ? "Tworzenie czasu pracy pracownika"
      : "Edycja czasu pracownika"

    selectedEventInAllEventWarningExtraTime = companyOpenHours.disabled
      ? "Uwaga rezerwacja jest edytowana w dzień w którym firma jest nieczynna"
      : null

    selectedEventInAllEventWarning =
      !!selectedEventInAllEvent && !!selectedEvent.action
        ? "Podczas tworzenia dotychczasowy czas pracy zostanie zastąpiony"
        : null

    const disabledEditButton =
      !!newTimeStart || !!newTimeEnd
        ? dateStart === newTimeStart || dateEnd === newTimeEnd
        : true

    renderDateStart = (
      <ButtonItemStyleTime>
        <ButtonIcon
          title={!!newTimeStart ? newTimeStart : dateStart}
          uppercase
          fontIconSize="20"
          fontSize="12"
          icon={<MdTimelapse />}
          onClick={handleOpenDateStartTimePicker}
          secondColors
        />
      </ButtonItemStyleTime>
    )

    renderDateEnd = (
      <ButtonItemStyleTime>
        <ButtonIcon
          title={!!newTimeEnd ? newTimeEnd : dateEnd}
          uppercase
          fontIconSize="20"
          fontSize="12"
          icon={<MdTimelapse />}
          onClick={handleOpenDateEndTimePicker}
          secondColors
        />
      </ButtonItemStyleTime>
    )

    selectButtonsToEvents = !!selectedEvent.action ? (
      <>
        <ButtonItemStyle>
          <ButtonIcon
            title="Anuluj"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<FaSave />}
            secondColors
            onClick={handleReserPopupEvent}
          />
        </ButtonItemStyle>
        <ButtonItemStyle>
          <ButtonIcon
            title="Zapisz"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<FaSave />}
            customColorButton={Colors(siteProps).successColorDark}
            customColorIcon={Colors(siteProps).successColor}
            onClick={handleAddNewNoConstHour}
          />
        </ButtonItemStyle>
      </>
    ) : (
      <>
        <ButtonItemStyle>
          <ButtonIcon
            title="Anuluj"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<FaSave />}
            secondColors
            onClick={handleReserPopupEvent}
          />
        </ButtonItemStyle>
        <ButtonItemStyle>
          <ButtonIcon
            title="Usuń"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<FaSave />}
            customColorButton={Colors(siteProps).dangerColorDark}
            customColorIcon={Colors(siteProps).dangerColor}
            onClick={handleDeleteNoConstHours}
          />
        </ButtonItemStyle>
        <ButtonItemStyle>
          <ButtonIcon
            title="Zapisz"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<FaSave />}
            customColorButton={Colors(siteProps).successColorDark}
            customColorIcon={Colors(siteProps).successColor}
            onClick={handleAddNewNoConstHour}
            disabled={disabledEditButton}
          />
        </ButtonItemStyle>
      </>
    )
  }

  const warningItemExtraTime = !!selectedEventInAllEventWarningExtraTime && (
    <WarningStyle siteProps={siteProps}>
      {selectedEventInAllEventWarningExtraTime}
      <IconWarning siteProps={siteProps}>
        <MdInfo />
      </IconWarning>
    </WarningStyle>
  )

  const warningItem = !!selectedEventInAllEventWarning && (
    <WarningStyle siteProps={siteProps}>
      {selectedEventInAllEventWarning}
      <IconWarning siteProps={siteProps}>
        <MdInfo />
      </IconWarning>
    </WarningStyle>
  )

  return (
    <>
      <CSSTransition
        in={screenOpen}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <>
          <EventItemPosition>
            <EventItemPositionContent siteProps={siteProps}>
              <TitleItemName siteProps={siteProps}>{titleEvent}</TitleItemName>
              {warningItem}
              {warningItemExtraTime}
              <CloseEditCreateMode
                siteProps={siteProps}
                onClick={handleClosePopupEventItem}
              >
                <MdClose />
              </CloseEditCreateMode>
              <EventItemPositionContentPadding>
                <ItemTitle siteProps={siteProps}>
                  Miesiąc:
                  <span>{selectMonthName}</span>
                </ItemTitle>
                <ItemTitle siteProps={siteProps}>
                  Dzień tygodnia:
                  <span>{selectedDayWeekName}</span>
                </ItemTitle>
                <ItemTitle siteProps={siteProps}>
                  Data:
                  <span>{selectedDate}</span>
                </ItemTitle>
                {!isHolidays && (
                  <>
                    <ItemTitle siteProps={siteProps}>
                      Początek pracy:
                      {renderDateStart}
                    </ItemTitle>
                    <ItemTitle siteProps={siteProps}>
                      Koniec pracy:
                      {renderDateEnd}
                    </ItemTitle>
                  </>
                )}
                {switchButtonHolidays}
                <ButtonsItemEvent>{selectButtonsToEvents}</ButtonsItemEvent>
              </EventItemPositionContentPadding>
            </EventItemPositionContent>
          </EventItemPosition>
        </>
      </CSSTransition>

      {!!selectedEvent && (
        <>
          <Popup
            popupEnable={openDateStart}
            handleClose={handleOpenDateStartTimePicker}
            noContent
            // calendar
          >
            <WidthTimePicker>
              <TimePickerContent
                setSelectedTime={handleUpdateTimeStart}
                timeTimePicker={dateStart}
              />
            </WidthTimePicker>
          </Popup>
          <Popup
            popupEnable={openDateEnd}
            handleClose={handleOpenDateEndTimePicker}
            noContent
            // calendar
          >
            <WidthTimePicker>
              <TimePickerContent
                setSelectedTime={handleUpdateTimeEnd}
                timeTimePicker={dateEnd}
              />
            </WidthTimePicker>
          </Popup>
        </>
      )}
    </>
  )
}
export default CalendarWorkerReserwatinNewEvent
