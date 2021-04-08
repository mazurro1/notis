import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import { useSelector } from "react-redux"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import ReactTooltip from "react-tooltip"

const InputStyled = styled.input`
  padding: 15px 15px;
  padding-bottom: 10px;
  padding-top: 20px;
  padding-left: ${props => (props.icon ? "50px" : "10px")};
  padding-right: ${props => (props.paddingEye ? "40px" : "15px")};
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

const ShowPassword = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  color: ${props =>
    props.active
      ? props.secondColor
        ? Colors(props.siteProps).secondDarkColor
        : Colors(props.siteProps).primaryColorDark
      : Colors(props.siteProps).darkColor};
  transition-property: color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const IconEyeClick = styled.div`
  cursor: pointer;
  transition-property: transform;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    transform: scale(1.2);
  }
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
  showPassword = false,
  refInput = null,
}) => {
  const [inputActive, setInputActive] = useState(false)
  const [clickEye, setClickEye] = useState(false)
  const siteProps = useSelector(state => state.siteProps)

  useEffect(() => {
    setClickEye(false)
  }, [])

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [clickEye])

  const handleOnFocus = () => {
    setInputActive(true)
  }
  const handleOnBlur = () => {
    setInputActive(false)
  }
  const handleClickEye = () => {
    setClickEye(prevState => !prevState)
  }

  const randomNumber =
    Math.floor(Math.random() * (999999999 - 111111111 + 1)) + 111111111

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
          type={!clickEye ? type : "text"}
          maxLength={maxLength}
          max={max}
          secondColor={secondColor}
          required={required}
          siteProps={siteProps}
          validText={!!validText}
          paddingEye={showPassword && type === "password"}
          ref={refInput}
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
      {showPassword && type === "password" && (
        <>
          <ReactTooltip
            id={`showPassword${randomNumber}`}
            effect="float"
            multiline={true}
          >
            <span>{clickEye ? "Anuluj podgląd hasła" : "Podgląd hasła"}</span>
          </ReactTooltip>
          <ShowPassword
            active={clickEye}
            siteProps={siteProps}
            secondColor={secondColor}
          >
            <IconEyeClick
              onClick={handleClickEye}
              data-tip
              data-for={`showPassword${randomNumber}`}
            >
              {clickEye ? <FaEye /> : <FaEyeSlash />}
            </IconEyeClick>
          </ShowPassword>
        </>
      )}
    </AllInput>
  )
}
export default InputIcon
