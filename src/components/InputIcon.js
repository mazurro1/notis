import React from "react"
import styled from "styled-components"

const InputStyled = styled.input`
  padding: 10px 15px;
  padding-left: 50px;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  color: #212121;
  ::placeholder {
    color: #757575;
  }

  &:active,
  &:focus {
    outline: none;
    border: none;
  }
`

const AllInput = styled.div`
  display: inline-block;
  position: relative;
  overflow: hidden;
  border: none;
  border-radius: 5px;
`

const IconInput = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  color: #757575;
`

const InputIcon = ({ placeholder = "", icon = "" }) => {
  return (
    <AllInput>
      <InputStyled value="" placeholder={placeholder} />
      <IconInput>{icon}</IconInput>
    </AllInput>
  )
}
export default InputIcon
