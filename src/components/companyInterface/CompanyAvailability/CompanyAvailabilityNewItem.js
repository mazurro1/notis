import React, { useState, useEffect } from "react"
import { ButtonIcon, Popup, InputIcon } from "@ui"
import {
  MdLibraryAdd,
  MdArrowBack,
  MdTextFields,
  MdWidgets,
} from "react-icons/md"
import { Colors } from "@common/Colors"
import styled from "styled-components"
import { addCompanyAvailability } from "@state/actions"
import { useDispatch } from "react-redux"

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
    <Popup
      popupEnable={addItemVisible}
      position="absolute"
      title="Nowy przedmiot"
      borderRadius
      closeTitle={false}
      smallTitle
    >
      <PaddingContent>
        <InputIcon
          icon={<MdTextFields />}
          placeholder="Nazwa przedmiotu"
          value={itemName}
          type="text"
          onChange={handleChangeItemName}
          validText="Wartość wymagana"
        />
        <InputIcon
          icon={<MdWidgets />}
          placeholder="Ilość"
          value={itemCount}
          type="number"
          onChange={handleChangeCount}
          validText="Wartość wymagana"
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
              isFetchToBlock
            />
          </ButtonMargin>
        </ButtonsAddPosition>
      </PaddingContent>
    </Popup>
  )
}
export default CompanyAvailabilityNewItem
