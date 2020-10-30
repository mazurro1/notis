import React, { useState } from "react"
import styled from "styled-components"
import { Colors } from "../../common/Colors"
import { MdEdit, MdArrowBack } from "react-icons/md"
import ButtonIcon from "../ButtonIcon"
import { CSSTransition } from "react-transition-group"
import TimePickerContent from "../TimePicker"
import { Checkbox } from "react-input-checkbox"
import { FaArrowLeft } from "react-icons/fa"

const TextCheckbox = styled.span`
  padding-left: 10px;
  font-weight: 600;
  user-select: none;
`

const CheckboxStyle = styled.div`
  margin-bottom: 30px;

  .material-checkbox__input:checked + .material-checkbox__image {
    background-color: ${Colors.secondColor};
  }
`

const HeightComponent = styled.div`
  padding-bottom: ${props =>
    props.activeTimePickerOpen || props.activeTimePickerClose
      ? "200px"
      : "0px"};
  transition-property: padding-bottom;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const BackgroundEdit = styled.div`
  position: absolute;
  z-index: 50;
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

const BackgroundEditContent = styled.div`
  position: relative;
  width: 90%;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  max-height: 90%;
  overflow-y: auto;
  padding-bottom: 45px;
`

const OpenDate = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`

const DayMonth = styled.div`
  font-size: 1.1rem;
  color: ${props =>
    props.isActualDate
      ? props.isCompanyEditProfil
        ? Colors.secondColor
        : Colors.buttonIconColor
      : ""};
`

const DayDate = styled.div`
  text-align: right;
  color: ${props =>
    props.isActualDate
      ? props.isCompanyEditProfil
        ? Colors.secondColor
        : Colors.buttonIconColor
      : ""};
`

const ButtonsTimePicker = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 30px;
`

const ButtonTimePickerStyle = styled.div`
  width: 100%;
  padding: 10px;
`

const OpeningHoursItem = ({
  item,
  actualDay,
  companyEditProfilProps,
  editable,
  ButtonEditPosition,
  MarginButton,
  handleSaveTimeDay,
  index,
  handleResetOneDay,
  defaultValue,
}) => {
  const [itemEditable, setItemEditable] = useState(false)
  const [itemTimeStart, setItemTimeStart] = useState(item.start)
  const [itemTimeEnd, setItemTimeEnd] = useState(item.end)
  const [activeTimePickerOpen, setActiveTimePickerOpen] = useState(false)
  const [activeTimePickerClose, setActiveTimePickerClose] = useState(false)
  const [checkboxDisabledDay, setCheckboxDisabledDay] = useState(item.disabled)

  const handleClickItemEditable = () => {
    setItemEditable(prevState => !prevState)
  }

  const handleClickContent = e => {
    e.stopPropagation()
  }

  const handleResetButton = () => {
    setItemEditable(prevState => !prevState)
    setItemTimeStart(item.start)
    setItemTimeEnd(item.end)
    handleResetOneDay(item, index)
  }

  const handleSetTimeOpen = time => {
    setItemTimeStart(time)
    setActiveTimePickerOpen(false)
    setItemEditable(true)
  }

  const handleSetTimeClose = time => {
    setItemTimeEnd(time)
    setActiveTimePickerClose(false)
    setItemEditable(true)
  }

  const handleOpenTimePicker = () => {
    setActiveTimePickerOpen(true)
    setItemEditable(false)
  }

  const handleCloseTimePicker = () => {
    setActiveTimePickerClose(true)
    setItemEditable(false)
  }

  const handleResetOpenTimePicker = () => {
    setItemTimeStart(item.start)
  }

  const handleResetCloseTimePicker = () => {
    setItemTimeEnd(item.end)
  }

  const handleChangeCheckbox = () => {
    setCheckboxDisabledDay(prevState => !prevState)
  }

  const disabledButtonSave =
    checkboxDisabledDay !== defaultValue.disabled ||
    checkboxDisabledDay === defaultValue.disabled ||
    itemTimeEnd !== defaultValue.end ||
    itemTimeStart !== defaultValue.start

  const handleSaveChangesTimeDay = () => {
    if (disabledButtonSave) {
      const timeStartValue =
        itemTimeStart !== defaultValue.start ? itemTimeStart : null
      const timeEndValue = itemTimeEnd !== defaultValue.end ? itemTimeEnd : null

      handleSaveTimeDay(
        checkboxDisabledDay,
        timeStartValue,
        timeEndValue,
        index
      )
      setItemEditable(false)
    }
  }

  return (
    <HeightComponent
      activeTimePickerOpen={activeTimePickerOpen}
      activeTimePickerClose={activeTimePickerClose}
    >
      <OpenDate>
        <DayMonth
          isActualDate={actualDay == item.dayValue}
          {...companyEditProfilProps}
        >
          {item.dayName}:
        </DayMonth>
        <DayDate
          isActualDate={actualDay == item.dayValue}
          {...companyEditProfilProps}
        >
          {editable ? (
            <ButtonIcon
              title={
                item.disabled ? "Nieczynne" : `${item.start} - ${item.end}`
              }
              uppercase
              fontIconSize="20"
              fontSize="12"
              icon={<MdEdit />}
              secondColors
              onClick={handleClickItemEditable}
            />
          ) : item.disabled ? (
            "Nieczynne"
          ) : (
            `${item.start} - ${item.end}`
          )}
        </DayDate>
      </OpenDate>
      <CSSTransition
        in={itemEditable}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <BackgroundEdit>
          <BackgroundEditContent onClick={handleClickContent}>
            <h3>{item.dayName}</h3>
            <ButtonsTimePicker>
              <ButtonTimePickerStyle>
                Otwarcie:
                <ButtonIcon
                  title={itemTimeStart}
                  uppercase
                  fontIconSize="25"
                  fontSize="14"
                  icon={<MdEdit />}
                  secondColors
                  onClick={handleOpenTimePicker}
                />
              </ButtonTimePickerStyle>
              <ButtonTimePickerStyle>
                Zamknięcie:
                <ButtonIcon
                  title={itemTimeEnd}
                  uppercase
                  fontIconSize="25"
                  fontSize="14"
                  icon={<MdEdit />}
                  secondColors
                  onClick={handleCloseTimePicker}
                />
              </ButtonTimePickerStyle>
            </ButtonsTimePicker>
            <CheckboxStyle>
              <Checkbox
                theme="material-checkbox"
                value={checkboxDisabledDay}
                onChange={handleChangeCheckbox}
              >
                <TextCheckbox>Nieczynne</TextCheckbox>
              </Checkbox>
            </CheckboxStyle>
            <ButtonEditPosition>
              <MarginButton>
                <ButtonIcon
                  title="Cofnij"
                  uppercase
                  fontIconSize="16"
                  fontSize="14"
                  icon={<FaArrowLeft />}
                  customColorButton="#c62828"
                  customColorIcon="#f44336"
                  onClick={handleResetButton}
                />
              </MarginButton>
              <MarginButton>
                <ButtonIcon
                  title="Potwierdz"
                  uppercase
                  fontIconSize="25"
                  fontSize="14"
                  icon={<MdEdit />}
                  customColorButton="#2e7d32"
                  customColorIcon="#43a047"
                  disabled={!disabledButtonSave}
                  onClick={handleSaveChangesTimeDay}
                />
              </MarginButton>
            </ButtonEditPosition>
          </BackgroundEditContent>
        </BackgroundEdit>
      </CSSTransition>
      <CSSTransition
        in={activeTimePickerOpen}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <BackgroundEdit>
          <BackgroundEditContent onClick={handleClickContent}>
            <TimePickerContent
              handleResetTakeData={handleResetOpenTimePicker}
              setSelectedTime={handleSetTimeOpen}
              timeTimePicker={itemTimeStart}
            />
          </BackgroundEditContent>
        </BackgroundEdit>
      </CSSTransition>
      <CSSTransition
        in={activeTimePickerClose}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <BackgroundEdit>
          <BackgroundEditContent onClick={handleClickContent}>
            <TimePickerContent
              handleResetTakeData={handleResetCloseTimePicker}
              setSelectedTime={handleSetTimeClose}
              timeTimePicker={itemTimeEnd}
            />
          </BackgroundEditContent>
        </BackgroundEdit>
      </CSSTransition>
    </HeightComponent>
  )
}
export default OpeningHoursItem