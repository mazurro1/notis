import React, { useState } from "react"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import { useSelector } from "react-redux"

const InputStyled = styled.input`
  padding: 15px 15px;
  padding-left: ${props => (props.icon ? "50px" : "10px")};
  margin-top: 5px;
  margin-bottom: 5px;
  border: none;
  font-size: 16px;
  border-bottom: ${props =>
    props.inputActive
      ? props.secondColor
        ? `2px solid ${Colors(props.colorBlind).secondColor}`
        : `2px solid ${Colors(props.colorBlind).primaryColor}`
      : "2px solid #bdbdbd"};
  width: 100%;
  color: #212121;
  background-color: transparent;
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
  color: ${props =>
    props.inputActive
      ? props.secondColor
        ? Colors(props.colorBlind).secondColor
        : Colors(props.colorBlind).primaryColor
      : "#bdbdbd"};
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
  maxLength = "",
  max = "",
  secondColor = false,
  required = false,
}) => {
  const [inputActive, setInputActive] = useState(false)
  const colorBlind = useSelector(state => state.colorBlind)

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
        maxLength={maxLength}
        max={max}
        secondColor={secondColor}
        required={required}
        colorBlind={colorBlind}
      />
      {!!icon && (
        <IconInput
          inputActive={inputActive}
          secondColor={secondColor}
          colorBlind={colorBlind}
        >
          {icon}
        </IconInput>
      )}
    </AllInput>
  )
}
export default InputIcon
