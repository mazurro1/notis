import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { ButtonIcon, Popup, TimePickerContent } from "@ui"
import { MdEdit, MdTimelapse, MdAccessTime } from "react-icons/md"
import { Colors } from "@common/Colors"
import { FaArrowLeft, FaSave } from "react-icons/fa"
import { Checkbox } from "react-input-checkbox"

const PositionTitleAndButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`

const ButtonsSave = styled.div`
  display: block;
`

const ContentDateButtons = styled.div`
  margin-bottom: 20px;
`

const DayOfTheWeekStyle = styled.div`
  font-size: 0.9rem;
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

const PaddingItemTime = styled.div`
  display: inline-block;
  width: 100%;
`

const ScaleItem = styled.div`
  transform: scale(0.9);
`

const ConstTimeWorkTime = ({
  item,
  siteProps,
  itemWorker,
  finallSelectedDayOfTheMonth,
  handleClickContent,
  ButtonContent,
  ButtonDeleteStyle,
  handleSaveConstTimeWorkItem,
  handleCloseConstTimeWorkItem,
  selectedDaySelectEditedWorkersHours,
  resetConstDays,
}) => {
  const [resetDay, setResetDay] = useState(true)
  const [editDay, setEditDay] = useState(false)
  const [dayStart, setDayStart] = useState("9:00")
  const [dayEnd, setDayEnd] = useState("18:00")
  const [dayTimeStart, setDayTimeStart] = useState(false)
  const [dayTimeEnd, setDayTimeEnd] = useState(false)
  const [disabledDay, setDisabledDay] = useState(true)
  useEffect(() => {
    if (!!finallSelectedDayOfTheMonth) {
      if ((!!finallSelectedDayOfTheMonth && resetDay) || !!resetConstDays) {
        setDayStart(finallSelectedDayOfTheMonth.startWorking)
        setDayEnd(finallSelectedDayOfTheMonth.endWorking)
        setDisabledDay(finallSelectedDayOfTheMonth.disabled)
        setResetDay(false)
      }
    }
  }, [
    finallSelectedDayOfTheMonth,
    resetDay,
    selectedDaySelectEditedWorkersHours,
    resetConstDays,
  ])

  const handleEditDay = () => {
    setEditDay(prevState => !prevState)
  }

  const handleSave = () => {
    setEditDay(prevState => !prevState)
    const itemToSave = {
      indexWorker: itemWorker._id,
      dayToSave: {
        dayOfTheWeek: item.dayOfTheWeek,
        startWorking: dayStart,
        endWorking: dayEnd,
        disabled: disabledDay,
      },
    }
    handleSaveConstTimeWorkItem(itemToSave)
  }

  const handleChangeCheckbox = () => {
    setDisabledDay(prevState => !prevState)
  }

  const handleSetTimeStart = time => {
    setDayStart(time)
    setDayTimeStart(false)
  }

  const handleSetTimeEnd = time => {
    setDayEnd(time)
    setDayTimeEnd(false)
  }

  const handleEditStartDay = () => {
    setDayTimeStart(true)
  }

  const handleEditEndDay = () => {
    setDayTimeEnd(true)
  }

  const handleCloseDay = () => {
    setEditDay(false)
    if (!!finallSelectedDayOfTheMonth) {
      setDayStart(finallSelectedDayOfTheMonth.startWorking)
      setDayEnd(finallSelectedDayOfTheMonth.endWorking)
      setDisabledDay(finallSelectedDayOfTheMonth.disabled)
    } else {
      setDayStart("0:00")
      setDayEnd("0:00")
      setDisabledDay(true)
    }
    handleCloseConstTimeWorkItem(itemWorker._id, item.dayOfTheWeek)
  }

  const disabledButtonSave = !!!dayStart || !!!dayEnd

  return (
    <>
      <PositionTitleAndButtons>
        <DayOfTheWeekStyle>{item.title}:</DayOfTheWeekStyle>
        <div>
          <ButtonIcon
            title={
              disabledDay
                ? "WOLNE"
                : `${dayStart ? dayStart : "0:00"} - ${
                    dayEnd ? dayEnd : "0:00"
                  }`
            }
            uppercase
            fontIconSize="20"
            fontSize="14"
            icon={<MdEdit />}
            onClick={handleEditDay}
            secondColors
          />
        </div>
      </PositionTitleAndButtons>
      <Popup
        popupEnable={editDay}
        position="absolute"
        title={item.title}
        borderRadius
        closeTitle={false}
        smallTitle
        secondColors
      >
        <ContentDateButtons>
          <PaddingItemTime>
            Początek pracy:
            <ButtonIcon
              title={dayStart.length > 0 ? dayStart : "0:00"}
              uppercase
              fontIconSize="20"
              fontSize="14"
              icon={<MdAccessTime />}
              onClick={handleEditStartDay}
              secondColors
            />
          </PaddingItemTime>
          <PaddingItemTime>
            Koniec pracy:
            <ButtonIcon
              title={dayEnd.length > 0 ? dayEnd : "0:00"}
              uppercase
              fontIconSize="20"
              fontSize="14"
              icon={<MdTimelapse />}
              onClick={handleEditEndDay}
              secondColors
            />
          </PaddingItemTime>
        </ContentDateButtons>
        <CheckboxStyle siteProps={siteProps}>
          <Checkbox
            theme="material-checkbox"
            value={disabledDay}
            onChange={handleChangeCheckbox}
          >
            <TextCheckbox>Dzień wolony</TextCheckbox>
          </Checkbox>
        </CheckboxStyle>
        <ButtonsSave>
          <ButtonDeleteStyle>
            <ButtonIcon
              title="Anuluj"
              uppercase
              fontIconSize="16"
              fontSize="14"
              icon={<FaArrowLeft />}
              onClick={handleCloseDay}
              customColorButton={Colors(siteProps).dangerColorDark}
              customColorIcon={Colors(siteProps).dangerColor}
            />
          </ButtonDeleteStyle>
          <ButtonDeleteStyle>
            <ButtonIcon
              title="Zapisz"
              uppercase
              fontIconSize="18"
              fontSize="14"
              icon={<FaSave />}
              onClick={handleSave}
              customColorButton={Colors(siteProps).successColorDark}
              customColorIcon={Colors(siteProps).successColor}
              disabled={disabledButtonSave}
            />
          </ButtonDeleteStyle>
        </ButtonsSave>
      </Popup>
      <Popup
        popupEnable={dayTimeStart}
        position="absolute"
        borderRadius
        noContent
      >
        <ScaleItem>
          <TimePickerContent
            setSelectedTime={handleSetTimeStart}
            timeTimePicker={dayStart}
            secondColor
            maxTime={dayEnd}
          />
        </ScaleItem>
      </Popup>
      <Popup
        popupEnable={dayTimeEnd}
        position="absolute"
        borderRadius
        noContent
      >
        <ScaleItem>
          <TimePickerContent
            setSelectedTime={handleSetTimeEnd}
            timeTimePicker={dayEnd}
            secondColor
            minTime={dayStart}
          />
        </ScaleItem>
      </Popup>
    </>
  )
}
export default ConstTimeWorkTime
