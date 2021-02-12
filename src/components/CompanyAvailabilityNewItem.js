import React, { useState, useEffect } from "react"
import ButtonIcon from "./ButtonIcon"
import {
  MdLibraryAdd,
  MdArrowBack,
  MdTextFields,
  MdWidgets,
} from "react-icons/md"
import { Colors } from "../common/Colors"
import { CSSTransition } from "react-transition-group"
import styled from "styled-components"
import InputIcon from "./InputIcon"
import { addCompanyAvailability } from "../state/actions"
import { useDispatch } from "react-redux"

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

const BackgroundEditContent = styled.div`
  width: 90%;
  background-color: ${props => Colors(props.siteProps).backgroundColorPage};
  border-radius: 5px;
  max-height: 90%;
  color: black;
`

const ButtonsAddPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const ButtonMargin = styled.div`
  margin: 5px;
`

const PaddingContent = styled.div`
  padding: 5px 10px;
`

const CompanyAvailabilityNewItem = ({
  siteProps,
  addItemVisible,
  handleAddItemVisible,
  user,
  resetUserCompanyAvailability,
}) => {
  const [itemName, setItemName] = useState("")
  const [itemCount, setItemCount] = useState("")

  const dispatch = useDispatch()

  useEffect(() => {
    setItemCount("")
    setItemName("")
  }, [resetUserCompanyAvailability])

  const handleChangeItemName = e => {
    setItemName(e.target.value)
  }

  const handleChangeCount = e => {
    if (e.target.value >= 0) {
      setItemCount(e.target.value)
    }
  }

  const handleReset = () => {
    setItemName("")
    setItemCount("")
    handleAddItemVisible()
  }

  const handleAddCompanyItem = () => {
    dispatch(
      addCompanyAvailability(user.token, user.company._id, itemName, itemCount)
    )
  }

  const disabledSaveButton = !!itemName && !!itemCount

  return (
    <CSSTransition
      in={addItemVisible}
      timeout={400}
      classNames="popup"
      unmountOnExit
    >
      <BackgroundEdit>
        <BackgroundEditContent>
          <PaddingContent>
            <InputIcon
              icon={<MdTextFields />}
              placeholder="Nazwa przedmiotu"
              value={itemName}
              type="text"
              onChange={handleChangeItemName}
            />
            <InputIcon
              icon={<MdWidgets />}
              placeholder="Ilość"
              value={itemCount}
              type="number"
              onChange={handleChangeCount}
            />
            <ButtonsAddPosition>
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
                  title="Dodaj"
                  uppercase
                  fontIconSize="20"
                  fontSize="15"
                  icon={<MdLibraryAdd />}
                  onClick={handleAddCompanyItem}
                  customColorButton={Colors(siteProps).successColorDark}
                  customColorIcon={Colors(siteProps).successColor}
                  disabled={!disabledSaveButton}
                />
              </ButtonMargin>
            </ButtonsAddPosition>
          </PaddingContent>
        </BackgroundEditContent>
      </BackgroundEdit>
    </CSSTransition>
  )
}
export default CompanyAvailabilityNewItem
