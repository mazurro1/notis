import React, { useState } from "react"
import styled from "styled-components"
import { Colors } from "../../common/Colors"
import { MdEdit } from "react-icons/md"
import ButtonIcon from "../ButtonIcon"
import { CSSTransition } from "react-transition-group"

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
  width: 90%;
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  max-height: 90%;
  overflow-y: auto;
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

const OpeningHoursItem = ({
  item,
  actualDay,
  companyEditProfilProps,
  editable,
}) => {
  const [itemEditable, setItemEditable] = useState(false)

  const handleClickItemEditable = () => {
    setItemEditable(prevState => !prevState)
  }

  const handleClickContent = e => {
    e.stopPropagation()
  }

  const handleResetButton = () => {
    setItemEditable(prevState => !prevState)
  }

  return (
    <>
      <OpenDate>
        <DayMonth isActualDate={actualDay === 1} {...companyEditProfilProps}>
          {item.dayMonth}:
        </DayMonth>
        <DayDate isActualDate={actualDay === 1} {...companyEditProfilProps}>
          {editable ? (
            <ButtonIcon
              title="Edytuj"
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
        <BackgroundEdit onClick={handleResetButton}>
          <BackgroundEditContent onClick={handleClickContent}>
            <h3>{item.dayMonth}</h3>
          </BackgroundEditContent>
        </BackgroundEdit>
      </CSSTransition>
    </>
  )
}
export default OpeningHoursItem
