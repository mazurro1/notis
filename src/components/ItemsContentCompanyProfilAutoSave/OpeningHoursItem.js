/*eslint-disable eqeqeq*/
import React, { useState } from "react"
import styled from "styled-components"
import { Colors } from "../../common/Colors"
import { MdEdit, MdAccessTime, MdTimelapse } from "react-icons/md"
import ButtonIcon from "../ButtonIcon"
import TimePickerContent from "../TimePicker"
import { Checkbox } from "react-input-checkbox"
import { FaArrowLeft } from "react-icons/fa"
import { useSelector } from "react-redux"
import Popup from "../Popup"

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

const HeightComponent = styled.div`
  padding-bottom: ${props =>
    props.activeTimePickerOpen || props.activeTimePickerClose
      ? "200px"
      : "0px"};
  transition-property: padding-bottom;
  transition-duration: 0.3s;
  transition-timing-function: ease;
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
        ? Colors(props.siteProps).secondColor
        : Colors(props.siteProps).primaryColor
      : ""};
`

const DayDate = styled.div`
  text-align: right;
  color: ${props =>
    props.isActualDate
      ? props.isCompanyEditProfil
        ? Colors(props.siteProps).secondColor
        : Colors(props.siteProps).primaryColor
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
  font-size: 0.9rem;
  font-family: "Poppins-Medium", sans-serif;
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
  const siteProps = useSelector(state => state.siteProps)

  const handleClickItemEditable = () => {
    setItemEditable(prevState => !prevState)
  }

  const handleClickContent = e => {
    e.stopPropagation()
  }

  const handleResetButton = () => {
    setItemEditable(prevState => !prevState)
    setItemTimeStart(defaultValue.start)
    setItemTimeEnd(defaultValue.end)
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

  const disabledButtonSave = true
  // checkboxDisabledDay !== defaultValue.disabled ||
  // itemTimeEnd !== defaultValue.end || itemTimeStart !== defaultValue.start

  const handleSaveChangesTimeDay = () => {
    if (disabledButtonSave) {
      // const timeStartValue =
      //   itemTimeStart !== defaultValue.start ? itemTimeStart : null
      // const timeEndValue = itemTimeEnd !== defaultValue.end ? itemTimeEnd : null

      handleSaveTimeDay(checkboxDisabledDay, itemTimeStart, itemTimeEnd, index)
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
          isCompanyEditProfil={editable}
          siteProps={siteProps}
        >
          {item.dayName}:
        </DayMonth>
        <DayDate
          isActualDate={actualDay == item.dayValue}
          isCompanyEditProfil={editable}
          siteProps={siteProps}
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
      <Popup
        popupEnable={itemEditable}
        position="absolute"
        title={item.dayName}
        borderRadius
        closeTitle={false}
        smallTitle
        secondColors
      >
        <ButtonsTimePicker>
          <ButtonTimePickerStyle>
            Otwarcie:
            <ButtonIcon
              title={itemTimeStart}
              uppercase
              fontIconSize="25"
              fontSize="14"
              icon={<MdAccessTime />}
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
              icon={<MdTimelapse />}
              secondColors
              onClick={handleCloseTimePicker}
            />
          </ButtonTimePickerStyle>
        </ButtonsTimePicker>
        <CheckboxStyle siteProps={siteProps}>
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
              customColorButton={Colors(siteProps).dangerColorDark}
              customColorIcon={Colors(siteProps).dangerColor}
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
              customColorButton={Colors(siteProps).successColorDark}
              customColorIcon={Colors(siteProps).successColor}
              disabled={!disabledButtonSave}
              onClick={handleSaveChangesTimeDay}
            />
          </MarginButton>
        </ButtonEditPosition>
      </Popup>
      <Popup
        popupEnable={activeTimePickerOpen}
        position="absolute"
        borderRadius
        noContent
      >
        <TimePickerContent
          handleResetTakeData={handleResetOpenTimePicker}
          setSelectedTime={handleSetTimeOpen}
          timeTimePicker={itemTimeStart}
          secondColor
          maxTime={itemTimeEnd}
        />
      </Popup>
      <Popup
        popupEnable={activeTimePickerClose}
        position="absolute"
        borderRadius
        noContent
      >
        <TimePickerContent
          handleResetTakeData={handleResetCloseTimePicker}
          setSelectedTime={handleSetTimeClose}
          timeTimePicker={itemTimeEnd}
          secondColor
          minTime={itemTimeStart}
        />
      </Popup>
    </HeightComponent>
  )
}
export default OpeningHoursItem
