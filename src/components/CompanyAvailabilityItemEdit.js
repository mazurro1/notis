import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import { MdArrowBack, MdSave, MdTextFields, MdWidgets } from "react-icons/md"
import { CSSTransition } from "react-transition-group"
import ButtonIcon from "./ButtonIcon"
import InputIcon from "./InputIcon"
import { useDispatch } from "react-redux"
import { editCompanyAvailability } from "../state/actions"

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
  border-radius: 5px;
`

const BackgroundEditContentBg = styled.div`
  width: 90%;
  background-color: ${props => Colors(props.siteProps).backgroundColorPage};
  border-radius: 5px;
  max-height: 90%;
  color: black;
`

const ButtonsAdd = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const ButtonMargin = styled.div`
  margin: 5px;
`

const CompanyAvailabilityItemEdit = ({
  siteProps,
  editVisible,
  handleEditVisible,
  resetUserCompanyAvailability,
  itemCount,
  itemName,
  itemId,
  user,
}) => {
  const [editedItemCount, setEditedCount] = useState("")
  const [editedItemName, setEditedName] = useState("")

  const dispatch = useDispatch()

  useEffect(() => {
    if (!!itemCount) {
      setEditedCount(itemCount)
    }
    if (!!itemName) {
      setEditedName(itemName)
    }
  }, [resetUserCompanyAvailability])

  const handleChangeItemName = e => {
    setEditedName(e.target.value)
  }

  const handleChangeCount = e => {
    if (e.target.value >= 0) {
      setEditedCount(e.target.value)
    }
  }

  const handleReset = () => {
    if (!!itemCount) {
      setEditedCount(itemCount)
    } else {
      setEditedCount("")
    }
    if (!!itemName) {
      setEditedName(itemName)
    } else {
      setEditedName("")
    }
    handleEditVisible()
  }

  const handleSaveEditedItem = () => {
    dispatch(
      editCompanyAvailability(
        user.token,
        user.company._id,
        itemId,
        editedItemName,
        editedItemCount
      )
    )
  }

  const disabledButtonSave =
    (editedItemCount.toString() !== itemCount.toString() ||
      editedItemName !== itemName) &&
    !!editedItemName &&
    Number(editedItemCount) >= 0

  return (
    <CSSTransition
      in={editVisible}
      timeout={400}
      classNames="popup"
      unmountOnExit
    >
      <BackgroundEdit>
        <BackgroundEditContentBg>
          <InputIcon
            icon={<MdTextFields />}
            placeholder="Nazwa przedmiotu"
            value={editedItemName}
            type="text"
            onChange={handleChangeItemName}
          />
          <InputIcon
            icon={<MdWidgets />}
            placeholder="Ilość"
            value={editedItemCount}
            type="number"
            onChange={handleChangeCount}
          />
          <ButtonsAdd>
            <ButtonMargin>
              <ButtonIcon
                title="Anuluj"
                uppercase
                fontIconSize="20"
                fontSize="15"
                icon={<MdArrowBack />}
                onClick={handleReset}
                customColorButton={Colors(siteProps).dangerColorDark}
                customColorIcon={Colors(siteProps).dangerColor}
              />
            </ButtonMargin>
            <ButtonMargin>
              <ButtonIcon
                title="Zapisz"
                uppercase
                fontIconSize="20"
                fontSize="15"
                icon={<MdSave />}
                onClick={handleSaveEditedItem}
                customColorButton={Colors(siteProps).successColorDark}
                customColorIcon={Colors(siteProps).successColor}
                disabled={!disabledButtonSave}
              />
            </ButtonMargin>
          </ButtonsAdd>
        </BackgroundEditContentBg>
      </BackgroundEdit>
    </CSSTransition>
  )
}
export default CompanyAvailabilityItemEdit
