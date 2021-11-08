import React from "react"
import { useSelector } from "react-redux"
import * as styled from "./TextareaCustomStyle"

const TextareaCustom = ({
  placeholder = "Uzupełnij pole",
  // @ts-ignore
  onChange = (e: Event) => {},
  value = "",
  isErrorText = false,
}: {
  placeholder: string
  onChange: Function
  value: string
  isErrorText: boolean
}) => {
  const siteProps = useSelector((state: any) => state.siteProps)
  const handleOnChange = (e: any) => {
    onChange(e)
  }

  return (
    <div>
      <styled.CustomStyleTextarea
        isErrorText={isErrorText}
        spellcheck
        placeholder={`${placeholder}...`}
        autocomplete="off"
        autocapitalize="sentences"
        onChange={(e: any) => handleOnChange(e)}
        value={value}
        siteProps={siteProps}
      />
      {isErrorText && (
        <styled.ErrorText siteProps={siteProps}>
          {
            "W tekście nie może być następujących znaków: $, #, %, &, *, (, ), /, [, ], +, -, |"
          }
        </styled.ErrorText>
      )}
    </div>
  )
}

export default TextareaCustom
