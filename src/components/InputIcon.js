import React, { useState } from "react"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import { useSelector } from "react-redux"

const InputStyled = styled.input`
  padding: 15px 15px;
  padding-bottom: 10px;
  padding-top: 20px;
  padding-left: ${props => (props.icon ? "50px" : "10px")};
  margin-top: 5px;
  margin-bottom: ${props => (props.validText ? "0px" : "5px")};
  border: none;
  font-size: 16px;
  border-bottom: ${props =>
    props.inputActive
      ? props.secondColor
        ? `2px solid ${Colors(props.siteProps).secondColor}`
        : `2px solid ${Colors(props.siteProps).primaryColor}`
      : `2px solid ${Colors(props.siteProps).darkColorLight}`};
  width: 100%;
  color: ${props => Colors(props.siteProps).textNormalBlack};
  background-color: transparent;
  transition-property: border-bottom, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  ::placeholder {
    /* color: #757575; */
    padding-right: 50px;
    padding-left: 5px;
  }

  &:active,
  &:focus {
    outline: none;
    /* border: none; */
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    box-shadow: 0 0 0 30px
      ${props => Colors(props.siteProps).companyItemBackground} inset !important;
    -webkit-text-fill-color: ${props =>
      Colors(props.siteProps).textNormalBlack} !important;
  }
`

const AllInput = styled.div`
  display: inline-block;
  position: relative;
  overflow: hidden;
  border: none;
  border-radius: 5px;
  width: 100%;
  margin: 5px 0;
`

const IconInput = styled.div`
  position: absolute;
  top: 6px;
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
        ? Colors(props.siteProps).secondColor
        : Colors(props.siteProps).primaryColor
      : Colors(props.siteProps).darkColorLight};
  transition-property: color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const ValidTextInput = styled.div`
  font-size: 0.8rem;
  text-align: right;
  color: ${props =>
    props.inputActive
      ? props.secondColor
        ? Colors(props.siteProps).secondColor
        : Colors(props.siteProps).primaryColor
      : Colors(props.siteProps).darkColorLight};
  font-family: "Poppins-Medium", sans-serif;
  transition-property: color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const PositionRelative = styled.div`
  position: relative;
`

const TextValue = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  font-size: 0.8rem;
  font-family: "Poppins-Medium", sans-serif;
  opacity: ${props => (props.active ? 1 : 0)};
  color: ${props =>
    !props.inputActive
      ? Colors(props.siteProps).darkColorLight
      : props.secondColor
      ? Colors(props.siteProps).secondColor
      : Colors(props.siteProps).primaryColor};
  transition-property: color, opacity;
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
  validText = "",
}) => {
  const [inputActive, setInputActive] = useState(false)
  const siteProps = useSelector(state => state.siteProps)

  const handleOnFocus = () => {
    setInputActive(true)
  }
  const handleOnBlur = () => {
    setInputActive(false)
  }
  return (
    <AllInput>
      <PositionRelative>
        <TextValue
          active={!!value}
          siteProps={siteProps}
          secondColor={secondColor}
          inputActive={inputActive}
        >
          {placeholder}
        </TextValue>
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
          siteProps={siteProps}
          validText={!!validText}
        />
        {!!icon && (
          <IconInput
            inputActive={inputActive}
            secondColor={secondColor}
            siteProps={siteProps}
          >
            {icon}
          </IconInput>
        )}
      </PositionRelative>
      {!!validText && (
        <ValidTextInput
          siteProps={siteProps}
          inputActive={inputActive}
          secondColor={secondColor}
        >
          {validText}
        </ValidTextInput>
      )}
    </AllInput>
  )
}
export default InputIcon
