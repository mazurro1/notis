import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Colors } from "@common/Colors"
import { MdDelete, MdArrowBack, MdDeleteForever } from "react-icons/md"
import { ButtonIcon, Popup } from "@ui"

const DayOffStyle = styled.div`
  position: relative;
  text-align: center;
  border-radius: 5px;
  background-color: ${props =>
    props.isCompanyEditProfil
      ? Colors(props.siteProps).primaryColor
      : Colors(props.siteProps).secondColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  margin: 5px;
  font-size: 0.8rem;
  overflow: hidden;
  width: 135px;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  overflow-wrap: break-word;
  word-break: break-word;

  @media all and (min-width: 991px) and (max-width: 1200px) {
    width: 105px;
  }
`

const DayOffPadding = styled.div`
  padding: 10px;
  font-size: 1.2rem;
`

const MonthNameStyle = styled.div`
  position: relative;
  padding: 5px;
  text-transform: uppercase;
  background-color: ${props =>
    props.isCompanyEditProfil
      ? Colors(props.siteProps).primaryColorDark
      : Colors(props.siteProps).secondDarkColor};
  padding-right: 30px;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const DayOffDelete = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  padding: 5px;
  padding-bottom: 0px;
  font-size: 1rem;
  cursor: pointer;
  background-color: transparent;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    background-color: ${props => Colors(props.siteProps).dangerColorDark};
  }
`

const ButtonsDeletePosition = styled.div`
  display: block;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ButtonMargin = styled.div`
  margin: 5px;
`

const DayOffItem = ({
  item,
  handleDeleteDay,
  monthName,
  siteProps,
  isCompanyEditProfil,
  editable,
}) => {
  const [checkDelete, setCheckDelete] = useState(false)

  useEffect(() => {
    if (!!!editable) {
      setCheckDelete(false)
    }
  }, [editable])

  const handleCheckDelete = () => {
    setCheckDelete(prevState => !prevState)
  }

  const handleConfirmDeleteDay = () => {
    setCheckDelete(false)
    handleDeleteDay(item)
  }

  return (
    <DayOffStyle
      siteProps={siteProps}
      onClick={handleCheckDelete}
      isCompanyEditProfil={!isCompanyEditProfil}
    >
      <MonthNameStyle
        siteProps={siteProps}
        isCompanyEditProfil={!isCompanyEditProfil}
      >
        {`${monthName} ${item.year}`}
        {isCompanyEditProfil && editable && (
          <DayOffDelete>
            <MdDelete />
          </DayOffDelete>
        )}
      </MonthNameStyle>
      <DayOffPadding>{item.day}</DayOffPadding>
      {isCompanyEditProfil && editable && (
        <Popup
          popupEnable={checkDelete}
          position="absolute"
          borderRadius
          noContent
        >
          <ButtonsDeletePosition>
            <ButtonMargin>
              <ButtonIcon
                title="Anuluj"
                uppercase
                fontIconSize="20"
                fontSize="14"
                icon={<MdArrowBack />}
                customColorButton={Colors(siteProps).successColorDark}
                customColorIcon={Colors(siteProps).successColor}
                onClick={handleCheckDelete}
              />
            </ButtonMargin>
            <ButtonMargin>
              <ButtonIcon
                title="Usuń"
                uppercase
                fontIconSize="20"
                fontSize="14"
                icon={<MdDeleteForever />}
                customColorButton={Colors(siteProps).dangerColorDark}
                customColorIcon={Colors(siteProps).dangerColor}
                onClick={handleConfirmDeleteDay}
                isFetchToBlock
              />
            </ButtonMargin>
          </ButtonsDeletePosition>
        </Popup>
      )}
    </DayOffStyle>
  )
}
export default DayOffItem
