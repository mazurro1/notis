import React, { useState } from "react"
import InputIcon from "./InputIcon"
import styled from "styled-components"
import { FaSearch } from "react-icons/fa"
import ButtonIcon from './ButtonIcon'

const ConfirmName = styled.div`
  margin-top: 30px;
`

const FindPlaceContent = ({ handleClose, setSelectedName, selectedName }) => {
  const [nameInput, setNameInput] = useState(selectedName)

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
  
      <ConfirmName>
        <ButtonIcon title="POTWIERDZ" uppercase fontIconSize="24" icon={<FaSearch />} disabled={!disabledNameButton} fontSize="20" onClick={handleConfirm}/>
      </ConfirmName>
    </>
  )
}
export default FindPlaceContent
