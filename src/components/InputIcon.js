import React from "react"
import styled from "styled-components"

const InputStyled = styled.input`
  padding: 15px 20px;
  padding-left: 50px;
  margin-right: 10px;
  margin-bottom: 5px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: #212121;
  ::placeholder {
    color: #757575;
    padding-right: 50px;
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
  top: -2px;
  bottom: 0;
  left: 0;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  color: #757575;
`

const InputIcon = ({
  placeholder = "",
  icon = "",
  value = "",
  onChange = () => {},
}) => {
  return (
    <AllInput>
      <InputStyled
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
      <IconInput>{icon}</IconInput>
    </AllInput>
  )
}
export default InputIcon
