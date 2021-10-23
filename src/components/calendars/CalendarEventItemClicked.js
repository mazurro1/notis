import React, { useEffect, useState } from "react"
import { CSSTransition } from "react-transition-group"
import styled from "styled-components"
import { Colors } from "@common/Colors"
import { ButtonIcon } from "@ui"
import { FaSave } from "react-icons/fa"
import { MdClose, MdInfo, MdDeleteForever } from "react-icons/md"
import {
  getMonthNamePl,
  getMonthAndReturnFull,
  getMonthAndReturnEng,
} from "@common/Functions"
import { Checkbox } from "react-input-checkbox"

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
  width: 600px;
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
`

const ButtonItemStyle = styled.div`
  margin-left: 10px;
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

const CalendarEventItemClicked = ({
  siteProps,
  handleClosePopupEventItem,
  selectedEvent,
  allEvents,
  screenOpen,
  handleDeleteNoConstTimeworkToSave,
  handleCreateNoConstTimeworkToSave,
  itemCompanyHours,
}) => {
  const [dateStart, setDateStart] = useState(null)
  const [dateEnd, setDateEnd] = useState(null)
  const [isHolidays, setIsHolidays] = useState(false)

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
      setDateStart(dateStartName)
      setDateEnd(dateEndName)
      if (!!selectedEvent.holidays) {
        setIsHolidays(selectedEvent.holidays)
      } else {
        setIsHolidays(false)
      }
    }
  }, [dateStart, dateEnd, selectedEvent])

  const handleChangeCheckbox = setChange => {
    setIsHolidays(prevState => !prevState)
  }

  const handleClickSaveItem = () => {
    handleClosePopupEventItem()
    handleCreateNoConstTimeworkToSave(
      selectedEvent,
      selectedEventInAllEvent,
      isHolidays
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
  let switchButtonHolidays = null
  let isDayHoliday = null
  let companyOpenHours = null
  if (!!selectedEvent) {
    const selectedDayOpenCompany = getMonthAndReturnEng(
      selectedEvent.start.getDay()
    )
    companyOpenHours = itemCompanyHours[selectedDayOpenCompany]

    isDayHoliday = !!isHolidays && (
      <ItemTitle siteProps={siteProps}>
        Dzień wolny:
        <span>{!!isHolidays ? "Tak" : "Nie"}</span>
      </ItemTitle>
    )

    selectedEventInAllEvent = allEvents.find(
      item => item.start.getDate() === selectedEvent.start.getDate()
    )

    selectedDate = `${selectedEvent.start.getDate()}-${
      selectedEvent.start.getMonth() + 1
    }-${selectedEvent.start.getFullYear()}`

    const selectedMonth = selectedEvent.start.getMonth()
    selectMonthName = getMonthNamePl(selectedMonth)

    const selectedDayWeek = selectedEvent.start.getDay()
    selectedDayWeekName = getMonthAndReturnFull(selectedDayWeek)

    titleEvent = !!selectedEvent.action ? "Tworzenie czasu pracy" : "Czas pracy"

    selectedEventInAllEventWarning =
      !!selectedEventInAllEvent && !!selectedEvent.action
        ? "Podczas tworzenia dotychczasowy czas pracy zostanie zastąpiony"
        : null

    selectedEventInAllEventWarningExtraTime = companyOpenHours.disabled
      ? "Uwaga czas pracy jest tworzony w dzień w którym firma jest nieczynna"
      : null

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

    selectButtonsToEvents = !!selectedEvent.action ? (
      <ButtonItemStyle>
        <ButtonIcon
          title="Potwierdz"
          uppercase
          fontIconSize="20"
          fontSize="16"
          icon={<FaSave />}
          customColorButton={Colors(siteProps).successColorDark}
          customColorIcon={Colors(siteProps).successColor}
          onClick={handleClickSaveItem}
        />
      </ButtonItemStyle>
    ) : (
      <>
        <ButtonItemStyle>
          <ButtonIcon
            title="Usuń"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<MdDeleteForever />}
            customColorButton={Colors(siteProps).dangerColorDark}
            customColorIcon={Colors(siteProps).dangerColor}
            onClick={() => {
              handleClosePopupEventItem()
              handleDeleteNoConstTimeworkToSave(selectedEvent)
            }}
          />
        </ButtonItemStyle>
      </>
    )
  }

  const warningItem = !!selectedEventInAllEventWarning && (
    <WarningStyle siteProps={siteProps}>
      {selectedEventInAllEventWarning}
      <IconWarning siteProps={siteProps}>
        <MdInfo />
      </IconWarning>
    </WarningStyle>
  )

  const warningItemExtraTime = !!selectedEventInAllEventWarningExtraTime && (
    <WarningStyle siteProps={siteProps}>
      {selectedEventInAllEventWarningExtraTime}
      <IconWarning siteProps={siteProps}>
        <MdInfo />
      </IconWarning>
    </WarningStyle>
  )

  return (
    <CSSTransition
      in={screenOpen}
      timeout={400}
      classNames="popup"
      unmountOnExit
    >
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
            {!!!isHolidays ? (
              <>
                <ItemTitle siteProps={siteProps}>
                  Początek pracy:
                  <span>{dateStart}</span>
                </ItemTitle>
                <ItemTitle siteProps={siteProps}>
                  Koniec pracy:
                  <span>{dateEnd}</span>
                </ItemTitle>
              </>
            ) : (
              isDayHoliday
            )}
            {switchButtonHolidays}
            <ButtonsItemEvent>{selectButtonsToEvents}</ButtonsItemEvent>
          </EventItemPositionContentPadding>
        </EventItemPositionContent>
      </EventItemPosition>
    </CSSTransition>
  )
}
export default CalendarEventItemClicked
