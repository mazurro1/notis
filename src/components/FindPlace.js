import React, { useState, useEffect } from "react"
import InputIcon from "./InputIcon"
import styled from "styled-components"
import { FaSearch } from "react-icons/fa"
import { Colors } from "../common/Colors"

const ConfirmName = styled.button`
  width: 100%;
  border: none;
  border-radius: 5px;
  background-color: ${Colors.buttonColor};
  color: white;
  font-size: 1.2rem;
  margin-top: 30px;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  padding: 10px 15px;
  text-align: center;

  &:disabled {
    background-color: #bdbdbd;

    &:hover {
      background-color: #bdbdbd;
    }
  }

  &:hover {
    background-color: ${Colors.buttonIconColor};
  }
`

const FindPlaceContent = ({ handleClose, setSelectedName }) => {
  const [nameInput, setNameInput] = useState("")

  const handleChange = e => {
    setNameInput(e.target.value)
  }

  const handleConfirm = () => {
    setSelectedName(nameInput)
    handleClose()
  }

  const disabledNameButton = nameInput.length > 0

  return (
    <>
      <InputIcon
        icon={<FaSearch />}
        placeholder="Wpisz nazwę firmy"
        value={nameInput}
        type="text"
        onChange={handleChange}
      />
      <ConfirmName disabled={!disabledNameButton} onClick={handleConfirm}>
        POTWIERDZ
      </ConfirmName>
    </>
  )
}
export default FindPlaceContent
