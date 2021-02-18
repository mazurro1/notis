import React, { useState } from "react"
import styled from "styled-components"
import { CSSTransition } from "react-transition-group"
import { FaCalendarDay, FaSave } from "react-icons/fa"
import { MdArrowBack } from "react-icons/md"
import ButtonIcon from "../ButtonIcon"
import { Colors } from "../../common/Colors"
import SelectDataCalendar from "../SelectDataCalendar"

const ButtonAddDayOff = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
`

const BackgroundEdit = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const BackgroundEditCalendar = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const BackgroundEditContent = styled.div`
  width: 90%;
  background-color: ${props =>
    props.transparent
      ? "transparent"
      : Colors(props.siteProps).companyItemBackground};
  color: ${props => Colors(props.siteProps).textNormalBlack};
  padding: 10px;
  padding-bottom: 5px;
  border-radius: 5px;
  max-height: 90%;
`

const ButtonsDeletePosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const ButtonMargin = styled.div`
  margin: 5px;
`

const TextAddDayOff = styled.div`
  font-size: 1.05rem;
  display: inline-block;
  color: ${props => Colors(props.siteProps).textNormalBlack};
  border-bottom: 2px solid ${props => Colors(props.siteProps).secondColor};
`

const DaysOffContentAdd = ({
  handleClickContent,
  handleAddClose,
  siteProps,
  createDayOff,
  setCreateDayOff,
  takeDateActive,
  setTakeDateActive,
  handleAddNewDayOff,
}) => {
  const [calendarDayOffDate, setCalendarDayOffDate] = useState(null)

  let selectedDate = ""

  if (!!calendarDayOffDate) {
    selectedDate = `${
      calendarDayOffDate.getDate() < 10
        ? `0${calendarDayOffDate.getDate()}`
        : calendarDayOffDate.getDate()
    }-${
      calendarDayOffDate.getMonth() + 1 < 10
        ? `0${calendarDayOffDate.getMonth() + 1}`
        : calendarDayOffDate.getMonth() + 1
    }-${calendarDayOffDate.getFullYear()}`
  }

  const handleAddDayOff = () => {
    handleAddClose()
    setCalendarDayOffDate(null)
    handleAddNewDayOff(selectedDate)
  }

  const handleClickAddNewDate = () => {
    setTakeDateActive(true)
  }

  const handleClose = () => {
    handleAddClose()
    setCalendarDayOffDate(null)
    setCreateDayOff(false)
  }

  return (
    <>
      <CSSTransition
        in={createDayOff}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <BackgroundEdit>
          <BackgroundEditContent
            onClick={handleClickContent}
            siteProps={siteProps}
          >
            <TextAddDayOff siteProps={siteProps}>
              Dodawanie wolnego dnia
            </TextAddDayOff>
            <ButtonAddDayOff>
              <ButtonIcon
                title={!!calendarDayOffDate ? selectedDate : "Wybierz dzień"}
                uppercase
                fontIconSize="18"
                fontSize="14"
                icon={<FaCalendarDay />}
                secondColors
                onClick={handleClickAddNewDate}
              />
            </ButtonAddDayOff>
            <ButtonsDeletePosition>
              <ButtonMargin>
                <ButtonIcon
                  title="Anuluj"
                  uppercase
                  fontIconSize="20"
                  fontSize="14"
                  icon={<MdArrowBack />}
                  customColorButton={Colors(siteProps).dangerColorDark}
                  customColorIcon={Colors(siteProps).dangerColor}
                  onClick={handleClose}
                />
              </ButtonMargin>
              <ButtonMargin>
                <ButtonIcon
                  title="Zapisz"
                  uppercase
                  fontIconSize="18"
                  fontSize="14"
                  icon={<FaSave />}
                  customColorButton={Colors(siteProps).successColorDark}
                  customColorIcon={Colors(siteProps).successColor}
                  onClick={handleAddDayOff}
                />
              </ButtonMargin>
            </ButtonsDeletePosition>
          </BackgroundEditContent>
        </BackgroundEdit>
      </CSSTransition>
      <CSSTransition
        in={takeDateActive}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <BackgroundEditCalendar>
          <BackgroundEditContent
            onClick={handleClickContent}
            siteProps={siteProps}
            transparent
          >
            <SelectDataCalendar
              setActualCalendarDate={setCalendarDayOffDate}
              setIsDataActive={setTakeDateActive}
              setIsTimeActive={setCreateDayOff}
            />
          </BackgroundEditContent>
        </BackgroundEditCalendar>
      </CSSTransition>
    </>
  )
}
export default DaysOffContentAdd
