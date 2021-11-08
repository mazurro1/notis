import React, { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import ReactTooltip from "react-tooltip"
import * as styled from "./InputIconStyle"

const InputIcon = ({
  placeholder = "",
  icon = null,
  value = "",
  onChange = () => {},
  type = "text",
  max = "",
  secondColor = false,
  required = false,
  validText = "",
  showPassword = false,
  refInput = null,
}: {
  placeholder: string
  icon: null | object
  value: string
  onChange: Function
  type: string
  max: string
  secondColor: boolean
  required: boolean
  validText: string
  showPassword: boolean
  refInput: React.RefAttributes<HTMLInputElement> | null
}) => {
  const [inputActive, setInputActive] = useState(false)
  const [clickEye, setClickEye] = useState(false)
  const siteProps = useSelector((state: any) => state.siteProps)

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

  const randomNumber: number =
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

export default InputIcon
