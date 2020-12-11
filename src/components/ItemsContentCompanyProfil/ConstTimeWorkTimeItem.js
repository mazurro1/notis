import React, { useEffect, useState } from "react"
import styled from "styled-components"
import ButtonIcon from "../ButtonIcon"
import { MdEdit } from "react-icons/md"
import { CSSTransition } from "react-transition-group"
import { Colors } from "../../common/Colors"
import { FaArrowLeft, FaSave } from "react-icons/fa"
import { Checkbox } from "react-input-checkbox"
import TimePickerContent from "../TimePicker"

const PositionTitleAndButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`

const ContentDateButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 30px;
`

const DayOfTheWeekStyle = styled.div`
  font-size: 1rem;
`

const EditUserBackgroundContentCosntHour = styled.div`
  position: relative;
  width: 90%;
  background-color: ${props =>
    props.noBg
      ? "transparent"
      : Colors(props.colorBlind).companyItemBackground};
  z-index: 10;
  border-radius: 5px;
  padding: 5px;
  font-size: 0.9rem;
  transition-property: height;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const EditUserBackgroundConstHour = styled.div`
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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

const ConstTimeWorkTime = ({
  item,
  colorBlind,
  itemWorker,
  finallSelectedDayOfTheMonth,
  handleClickContent,
  ButtonContent,
  ButtonDeleteStyle,
  DayHoursStyle,
  handleSaveConstTimeWorkItem,
  handleCloseConstTimeWorkItem,
  selectedDaySelectEditedWorkersHours,
  handleResetDay,
}) => {
  const [resetDay, setResetDay] = useState(true)
  const [editDay, setEditDay] = useState(false)
  const [dayStart, setDayStart] = useState("0:00")
  const [dayEnd, setDayEnd] = useState("18:00")
  const [dayTimeStart, setDayTimeStart] = useState(false)
  const [dayTimeEnd, setDayTimeEnd] = useState(false)
  const [disabledDay, setDisabledDay] = useState(true)
  // console.log(selectedDaySelectEditedWorkersHours)
  useEffect(() => {
    if (!!selectedDaySelectEditedWorkersHours) {
      setDayStart(selectedDaySelectEditedWorkersHours.startWorking)
      setDayEnd(selectedDaySelectEditedWorkersHours.endWorking)
      setDisabledDay(selectedDaySelectEditedWorkersHours.disabled)
      setResetDay(false)
    } else {
      if (!!finallSelectedDayOfTheMonth && resetDay) {
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
    handleResetDay(itemWorker._id, item.dayOfTheWeek)
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
      <CSSTransition
        in={editDay}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <EditUserBackgroundConstHour>
          <EditUserBackgroundContentCosntHour
            onClick={handleClickContent}
            colorBlind={colorBlind}
          >
            <div>
              <DayHoursStyle>{item.title}:</DayHoursStyle>
              <ContentDateButtons>
                <div>
                  Początek pracy:
                  <ButtonIcon
                    title={dayStart.length > 0 ? dayStart : "0:00"}
                    uppercase
                    fontIconSize="16"
                    fontSize="14"
                    icon={<MdEdit />}
                    onClick={handleEditStartDay}
                    secondColors
                  />
                </div>
                <div>
                  Koniec pracy:
                  <ButtonIcon
                    title={dayEnd.length > 0 ? dayEnd : "0:00"}
                    uppercase
                    fontIconSize="16"
                    fontSize="14"
                    icon={<MdEdit />}
                    onClick={handleEditEndDay}
                    secondColors
                  />
                </div>
              </ContentDateButtons>
              <CheckboxStyle colorBlind={colorBlind}>
                <Checkbox
                  theme="material-checkbox"
                  value={disabledDay}
                  onChange={handleChangeCheckbox}
                >
                  <TextCheckbox>Dzień wolony</TextCheckbox>
                </Checkbox>
              </CheckboxStyle>
              <ButtonContent>
                <ButtonDeleteStyle>
                  <ButtonIcon
                    title="Anuluj"
                    uppercase
                    fontIconSize="16"
                    fontSize="14"
                    icon={<FaArrowLeft />}
                    onClick={handleCloseDay}
                    customColorButton={Colors(colorBlind).dangerColorDark}
                    customColorIcon={Colors(colorBlind).dangerColor}
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
                    customColorButton={Colors(colorBlind).successColorDark}
                    customColorIcon={Colors(colorBlind).successColor}
                    disabled={disabledButtonSave}
                  />
                </ButtonDeleteStyle>
              </ButtonContent>
            </div>
          </EditUserBackgroundContentCosntHour>
        </EditUserBackgroundConstHour>
      </CSSTransition>
      <CSSTransition
        in={dayTimeStart}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <EditUserBackgroundConstHour>
          <EditUserBackgroundContentCosntHour
            onClick={handleClickContent}
            active={dayTimeStart}
            colorBlind={colorBlind}
          >
            <TimePickerContent
              setSelectedTime={handleSetTimeStart}
              timeTimePicker={dayStart}
              secondColor
            />
          </EditUserBackgroundContentCosntHour>
        </EditUserBackgroundConstHour>
      </CSSTransition>
      <CSSTransition
        in={dayTimeEnd}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <EditUserBackgroundConstHour>
          <EditUserBackgroundContentCosntHour
            onClick={handleClickContent}
            active={dayTimeEnd}
            colorBlind={colorBlind}
          >
            <TimePickerContent
              setSelectedTime={handleSetTimeEnd}
              timeTimePicker={dayEnd}
              secondColor
            />
          </EditUserBackgroundContentCosntHour>
        </EditUserBackgroundConstHour>
      </CSSTransition>
    </>
  )
}
export default ConstTimeWorkTime
