import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { ButtonIcon, InputIcon } from "@ui"
import { Colors } from "@common/Colors"
import { MdSearch, MdClose } from "react-icons/md"
import { FaArrowLeft, FaSearch } from "react-icons/fa"
import { changeSelectedNameMenu } from "@state/actions"
import { useDispatch } from "react-redux"

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

const FindPlaceContent = ({ handleClose, selectedName, siteProps }) => {
  const [nameInput, setNameInput] = useState(selectedName)
  const inputSearchCompany = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!!inputSearchCompany) {
      if (!!inputSearchCompany.current) {
        inputSearchCompany.current.focus()
      }
    }
  }, [inputSearchCompany])

  const handleChange = e => {
    setNameInput(e.target.value)
  }

  const handleConfirm = () => {
    dispatch(changeSelectedNameMenu(nameInput))
    handleClose()
  }

  const handleReset = () => {
    dispatch(changeSelectedNameMenu(""))
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
        refInput={inputSearchCompany}
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
