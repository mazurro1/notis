import React, { useEffect, useState } from "react"
import { CSSTransition } from "react-transition-group"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import ButtonIcon from "./ButtonIcon"
import { MdWork, MdClose, MdInfo, MdEdit } from "react-icons/md"
import { getMonthNamePl, getMonthAndReturnFull } from "../common/Functions"
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
  background-color: ${props => Colors(props.colorBlind).companyItemBackground};
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
  background-color: ${props => Colors(props.colorBlind).secondColor};
  padding: 2px 8px;
  font-size: 1.2rem;
  color: ${props => Colors(props.colorBlind).textNormalWhite};
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
  color: ${props => Colors(props.colorBlind).textNormalWhite};
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
  background-color: ${props => Colors(props.colorBlind).dangerColorDark};
  padding: 5px 10px;
  color: ${props => Colors(props.colorBlind).textNormalWhite};
  padding-left: 50px;
  font-size: 0.8rem;
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

const ItemTitle = styled.div`
  font-size: 1.1rem;
  color: ${props => Colors(props.colorBlind).textNormalBlack};
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  span {
    padding-left: 5px;
    color: ${props => Colors(props.colorBlind).secondColor};
  }
`

const TextCheckbox = styled.span`
  padding-left: 10px;
  font-weight: 600;
  user-select: none;
`

const CheckboxStyle = styled.div`
  margin-bottom: 30px;

  .material-checkbox__input:checked + .material-checkbox__image {
    background-color: ${props => Colors(props.colorBlind).secondColor};
  }

  span {
    color: ${props => Colors(props.colorBlind).textNormalBlack};
    border-color: ${props => Colors(props.colorBlind).textNormalBlack};
  }
`

const CalendarEventItemClicked = ({
  colorBlind,
  handleClosePopupEventItem,
  selectedEvent,
  allEvents,
  screenOpen,
  handleDeleteNoConstTimeworkToSave,
  handleCreateNoConstTimeworkToSave,
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

  let selectedDate = ""
  let selectMonthName = ""
  let selectedDayWeekName = ""
  let selectButtonsToEvents = null
  let selectedEventInAllEventWarning = null
  let selectedEventInAllEvent = null
  let titleEvent = ""
  let switchButtonHolidays = null
  if (!!selectedEvent) {
    selectedEventInAllEvent = allEvents.find(
      item => item.start.getDate() === selectedEvent.start.getDate()
    )

    selectedEventInAllEventWarning =
      !!selectedEventInAllEvent && !!selectedEvent.action
        ? "Podczas tworzenia dotychczasowy czas pracy zostanie zastąpiony"
        : null

    selectedDate = `${selectedEvent.start.getDate()}-${
      selectedEvent.start.getMonth() + 1
    }-${selectedEvent.start.getFullYear()}`

    const selectedMonth = selectedEvent.start.getMonth()
    selectMonthName = getMonthNamePl(selectedMonth)

    const selectedDayWeek = selectedEvent.start.getDay()
    selectedDayWeekName = getMonthAndReturnFull(selectedDayWeek)

    titleEvent = !!selectedEvent.action
      ? "Tworzenie czasu pracy pracownika"
      : "Czas pracy pracownika"

    switchButtonHolidays = !!selectedEvent.action && (
      <CheckboxStyle colorBlind={colorBlind}>
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
          icon={<MdWork />}
          customColorButton={Colors(colorBlind).successColorDark}
          customColorIcon={Colors(colorBlind).successColor}
          onClick={() => {
            handleClosePopupEventItem()
            handleCreateNoConstTimeworkToSave(
              selectedEvent,
              selectedEventInAllEvent,
              isHolidays
            )
          }}
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
            icon={<MdWork />}
            customColorButton={Colors(colorBlind).dangerColorDark}
            customColorIcon={Colors(colorBlind).dangerColor}
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
    <WarningStyle colorBlind={colorBlind}>
      {selectedEventInAllEventWarning}
      <IconWarning colorBlind={colorBlind}>
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
        <EventItemPositionContent colorBlind={colorBlind}>
          <TitleItemName colorBlind={colorBlind}>{titleEvent}</TitleItemName>
          {warningItem}
          <CloseEditCreateMode
            colorBlind={colorBlind}
            onClick={handleClosePopupEventItem}
          >
            <MdClose />
          </CloseEditCreateMode>
          <EventItemPositionContentPadding>
            <ItemTitle colorBlind={colorBlind}>
              Miesiąc:
              <span>{selectMonthName}</span>
            </ItemTitle>
            <ItemTitle colorBlind={colorBlind}>
              Dzień tygodnia:
              <span>{selectedDayWeekName}</span>
            </ItemTitle>
            <ItemTitle colorBlind={colorBlind}>
              Data:
              <span>{selectedDate}</span>
            </ItemTitle>
            {!!!isHolidays ? (
              <>
                <ItemTitle colorBlind={colorBlind}>
                  Początek pracy:
                  <span>{dateStart}</span>
                </ItemTitle>
                <ItemTitle colorBlind={colorBlind}>
                  Koniec pracy:
                  <span>{dateEnd}</span>
                </ItemTitle>
              </>
            ) : (
              <ItemTitle colorBlind={colorBlind}>
                Dzień wolny:
                <span>{!!isHolidays ? "tak" : "nie"}</span>
              </ItemTitle>
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
