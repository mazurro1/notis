import React, { useState } from "react"
import styled from "styled-components"
import { FaCalendarDay, FaSave } from "react-icons/fa"
import { MdArrowBack } from "react-icons/md"
import ButtonIcon from "../ButtonIcon"
import { Colors } from "../../common/Colors"
import SelectDataCalendar from "../SelectDataCalendar"
import Popup from "../Popup"

const ButtonAddDayOff = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 20px;
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

const DaysOffContentAdd = ({
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
    setTakeDateActive(false)
  }

  const handleClickAddNewDate = () => {
    setTakeDateActive(true)
    setCreateDayOff(false)
  }

  const handleClose = () => {
    handleAddClose()
    setCalendarDayOffDate(null)
    setCreateDayOff(false)
  }

  return (
    <>
      <Popup
        popupEnable={createDayOff}
        position="absolute"
        title="Dodawanie wolnego dnia"
        borderRadius
        closeTitle={false}
        smallTitle
        secondColors
      >
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
              disabled={!!!calendarDayOffDate}
            />
          </ButtonMargin>
        </ButtonsDeletePosition>
      </Popup>
      <Popup
        popupEnable={takeDateActive}
        position="absolute"
        borderRadius
        noContent
      >
        <SelectDataCalendar
          setActualCalendarDate={setCalendarDayOffDate}
          setIsDataActive={setTakeDateActive}
          setIsTimeActive={setCreateDayOff}
          activeData={calendarDayOffDate}
        />
      </Popup>
    </>
  )
}
export default DaysOffContentAdd
