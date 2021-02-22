import React, { useState } from "react"
import InputIcon from "./InputIcon"
import styled from "styled-components"
import ButtonIcon from "./ButtonIcon"
import { Colors } from "../common/Colors"
import { MdSearch, MdClose } from "react-icons/md"
import { FaArrowLeft, FaSearch } from "react-icons/fa"

const ButtonsPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
`

const ButtonsMargin = styled.div`
  margin: 5px;
`

const FindPlaceContent = ({
  handleClose,
  setSelectedName,
  selectedName,
  siteProps,
}) => {
  const [nameInput, setNameInput] = useState(selectedName)

  const handleChange = e => {
    setNameInput(e.target.value)
  }

  const handleConfirm = () => {
    setSelectedName(nameInput)
    handleClose()
  }

  const handleReset = () => {
    setSelectedName("")
    handleClose()
  }

  return (
    <>
      <InputIcon
        icon={<FaSearch />}
        placeholder="Wpisz nazwę firmy"
        value={nameInput}
        type="text"
        onChange={handleChange}
      />
      <ButtonsPosition>
        <ButtonsMargin>
          <ButtonIcon
            title="Anuluj"
            uppercase
            fontIconSize="20"
            fontSize="14"
            icon={<FaArrowLeft />}
            customColorButton={Colors(siteProps).dangerColorDark}
            customColorIcon={Colors(siteProps).dangerColor}
            onClick={handleClose}
          />
        </ButtonsMargin>
        <ButtonsMargin>
          <ButtonIcon
            title="Resetuj"
            uppercase
            fontIconSize="25"
            fontSize="14"
            icon={<MdClose />}
            customColorButton={Colors(siteProps).dangerColorDark}
            customColorIcon={Colors(siteProps).dangerColor}
            onClick={handleReset}
          />
        </ButtonsMargin>
        <ButtonsMargin>
          <ButtonIcon
            title="Szukaj"
            uppercase
            fontIconSize="25"
            fontSize="14"
            icon={<MdSearch />}
            customColorButton={Colors(siteProps).successColorDark}
            customColorIcon={Colors(siteProps).successColor}
            onClick={handleConfirm}
          />
        </ButtonsMargin>
      </ButtonsPosition>
    </>
  )
}
export default FindPlaceContent
