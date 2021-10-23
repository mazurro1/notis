import React from "react"
import { useSelector } from "react-redux"
import PropTypes from "prop-types"
import * as styled from "./TextareaCustomStyle"

const TextareaCustom = ({
  placeholder = "Uzupełnij pole",
  onChange = () => {},
  value = "",
  isErrorText = false,
}) => {
  const siteProps = useSelector(state => state.siteProps)
  const handleOnChange = e => {
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
        onChange={e => handleOnChange(e)}
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

TextareaCustom.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  isErrorText: PropTypes.bool,
}

export default TextareaCustom
