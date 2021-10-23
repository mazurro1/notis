import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import ReactTooltip from "react-tooltip"
import * as styled from "./InputIconStyle"
import PropTypes from "prop-types"

const InputIcon = ({
  placeholder = "",
  icon = "",
  value = "",
  onChange = () => {},
  type = "text",
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
    <styled.AllInput>
      <styled.PositionRelative>
        <styled.TextValue
          active={!!value}
          siteProps={siteProps}
          secondColor={secondColor}
          inputActive={inputActive}
        >
          {placeholder}
        </styled.TextValue>
        <styled.InputStyled
          value={value}
          placeholder={placeholder + "..."}
          onChange={onChange}
          icon={!!icon}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          inputActive={inputActive}
          type={!clickEye ? type : "text"}
          max={max}
          secondColor={secondColor}
          required={required}
          siteProps={siteProps}
          validText={!!validText}
          paddingEye={showPassword && type === "password"}
          ref={refInput}
        />
        {!!icon && (
          <styled.IconInput
            inputActive={inputActive}
            secondColor={secondColor}
            siteProps={siteProps}
          >
            {icon}
          </styled.IconInput>
        )}
      </styled.PositionRelative>
      {!!validText && (
        <styled.ValidTextInput
          siteProps={siteProps}
          inputActive={inputActive}
          secondColor={secondColor}
        >
          {validText}
        </styled.ValidTextInput>
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
          <styled.ShowPassword
            active={clickEye}
            siteProps={siteProps}
            secondColor={secondColor}
          >
            <styled.IconEyeClick
              onClick={handleClickEye}
              data-tip
              data-for={`showPassword${randomNumber}`}
            >
              {clickEye ? <FaEye /> : <FaEyeSlash />}
            </styled.IconEyeClick>
          </styled.ShowPassword>
        </>
      )}
    </styled.AllInput>
  )
}

InputIcon.propTypes = {
  placeholder: PropTypes.string,
  icon: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  max: PropTypes.string,
  secondColor: PropTypes.bool,
  required: PropTypes.bool,
  validText: PropTypes.string,
  showPassword: PropTypes.bool,
  refInput: PropTypes.object,
}

export default InputIcon
