import React, { useState, useEffect, useRef } from "react"
import styled from 'styled-components'
import ButtonIcon from '../ButtonIcon'
import {Colors} from '../../common/Colors'
import { FaArrowLeft } from "react-icons/fa"
import { MdEdit, MdAddBox } from "react-icons/md"
import HappyHoursNoConstContentNewItem from "./HappyHoursNoConstContentNewItem"
import HappyHoursNoConstContentItem from "./HappyHoursNoConstContentItem"
import {
  sortItemsInArray,
  sortItemsInArrayDateConvert,
} from "../../common/Functions"

const PositionRelative = styled.div`
  font-size: 1rem;
  padding-bottom: ${props =>
    props.active
      ? props.componentHeight > 500
        ? "0px"
        : `${500 - props.componentHeight}px`
      : "0px"};
  transition-property: padding-bottom;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const MarginButton = styled.div`
  margin-left: 5px;
`

const ItemsAddHappyHour = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex-wrap: wrap;
  align-items: center;
`

const ItemsNoConstHappyHours = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
`

const HappyHoursNoConstContent = ({
  isCompanyEditProfil = false,
  siteProps,
  TitleRightColumn,
  happyHoursNoConst = [],
  editNoConstHappyHours,
  setEditNoConstHappyHours,
  handleResetAllEditedComponents,
  disabledEditButtons,
  editMode,
  ButtonEditPosition,
  companyServices = [],
  user,
}) => {
  const [newNoConstHappyHour, setNewNoConstHappyHour] = useState(false)
  const [enableTimeEnd, setEnableTimeEnd] = useState(false)
  const [enableTimeStart, setEnableTimeStart] = useState(false)
  const [enableDatePicker, setEnableDatePicker] = useState(false)
  const [componentHeight, setComponentHeight] = useState(0)

  const refNoConstHappyHour = useRef(null)

    useEffect(() => {
      if (!!refNoConstHappyHour) {
        setComponentHeight(refNoConstHappyHour.current.clientHeight)
      }
    }, [refNoConstHappyHour, happyHoursNoConst, newNoConstHappyHour])

    useEffect(() => {
      setNewNoConstHappyHour(false)
      setEnableTimeStart(false)
      setEnableTimeEnd(false)
    }, [happyHoursNoConst, editMode])

  const handleClickEdit = () => {
    handleResetAllEditedComponents()
    setEditNoConstHappyHours(prevState => !prevState)
  }

  const handleReset = () => {
    setEditNoConstHappyHours(false)
  }

  const handleClickAddNewNoConsrHappyHour = () => {
    setNewNoConstHappyHour(prevState => !prevState)
  }
  const sortedNoConstHappyHoursConvert = sortItemsInArrayDateConvert([...happyHoursNoConst], "fullDate")
  const mapNoConstHappyHours = sortedNoConstHappyHoursConvert.map((item, index) => {
    return (
      <HappyHoursNoConstContentItem
        item={item}
        key={index}
        companyServices={companyServices}
        siteProps={siteProps}
        editNoConstHappyHours={editNoConstHappyHours}
        editMode={editMode}
      />
    )
  })
  
  return (
    <PositionRelative
      active={
        newNoConstHappyHour ||
        enableTimeEnd ||
        enableTimeStart ||
        enableDatePicker
      }
      componentHeight={componentHeight}
      ref={refNoConstHappyHour}
    >
      <TitleRightColumn
        isCompanyEditProfil={editNoConstHappyHours}
        siteProps={siteProps}
      >
        Zmienne Happy Hours
      </TitleRightColumn>
      <ItemsNoConstHappyHours>{mapNoConstHappyHours}</ItemsNoConstHappyHours>
      <ItemsAddHappyHour>
        {isCompanyEditProfil && editNoConstHappyHours && (
          <ButtonIcon
            title="Dodaj happy hour"
            uppercase
            fontIconSize="25"
            fontSize="14"
            icon={<MdAddBox />}
            secondColors
            onClick={handleClickAddNewNoConsrHappyHour}
          />
        )}
      </ItemsAddHappyHour>
      {isCompanyEditProfil && !editNoConstHappyHours ? (
        <ButtonEditPosition>
          <div data-tip data-for="disabledButton">
            <ButtonIcon
              title="Edytuj zmienne happy hours"
              uppercase
              fontIconSize="25"
              fontSize="14"
              icon={<MdEdit />}
              secondColors
              onClick={handleClickEdit}
              disabled={disabledEditButtons}
            />
          </div>
        </ButtonEditPosition>
      ) : (
        isCompanyEditProfil && (
          <ButtonEditPosition>
            <MarginButton>
              <ButtonIcon
                title="Zakończ edytowanie"
                uppercase
                fontIconSize="20"
                fontSize="14"
                icon={<FaArrowLeft />}
                customColorButton={Colors(siteProps).dangerColorDark}
                customColorIcon={Colors(siteProps).dangerColor}
                onClick={handleReset}
              />
            </MarginButton>
          </ButtonEditPosition>
        )
      )}
      {isCompanyEditProfil && (
        <HappyHoursNoConstContentNewItem
          TitleRightColumn={TitleRightColumn}
          newNoConstHappyHour={newNoConstHappyHour}
          siteProps={siteProps}
          setEditNoConstHappyHours={setEditNoConstHappyHours}
          setNewNoConstHappyHour={setNewNoConstHappyHour}
          companyServices={companyServices}
          enableTimeEnd={enableTimeEnd}
          setEnableTimeEnd={setEnableTimeEnd}
          enableTimeStart={enableTimeStart}
          setEnableTimeStart={setEnableTimeStart}
          enableDatePicker={enableDatePicker}
          setEnableDatePicker={setEnableDatePicker}
          user={user}
          happyHoursNoConst={happyHoursNoConst}
        />
      )}
    </PositionRelative>
  )
}
export default HappyHoursNoConstContent
