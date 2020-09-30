import React, { useState } from "react"
import styled from "styled-components"
import { Colors } from "../common/Colors"

const InputStyled = styled.input`
  padding: 15px 15px;
  padding-left: ${props => (props.icon ? "50px" : "15px")};
  margin: 5px;
  margin-right: 10px;
  border: none;
  font-size: 16px;
  border-bottom: ${props =>
    props.inputActive
      ? `1px solid ${Colors.buttonIconColor}`
      : "1px solid #bdbdbd"};
  width: 100%;
  color: #212121;
  transition-property: border-bottom;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  ::placeholder {
    color: #757575;
    padding-right: 50px;
    padding-left: 5px;
  }

  &:active,
  &:focus {
    outline: none;
    /* border: none; */
  }
`

const AllInput = styled.div`
  display: inline-block;
  position: relative;
  overflow: hidden;
  border: none;
  border-radius: 5px;
  width: 100%;
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
  color: ${props => (props.inputActive ? Colors.buttonIconColor : "#bdbdbd")};
  transition-property: color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const InputIcon = ({
  placeholder = "",
  icon = "",
  value = "",
  onChange = () => {},
  type = "text",
  maxlength = "2",
}) => {
  const [inputActive, setInputActive] = useState(false)

  const handleOnFocus = () => {
    setInputActive(true)
  }
  const handleOnBlur = () => {
    setInputActive(false)
  }
  return (
    <AllInput>
      <InputStyled
        value={value}
        placeholder={placeholder + "..."}
        onChange={onChange}
        icon={!!icon}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        inputActive={inputActive}
        type={type}
        maxlength="5"
      />
      {!!icon && <IconInput inputActive={inputActive}>{icon}</IconInput>}
    </AllInput>
  )
}
export default InputIcon
