import React, { useEffect, useState, useRef } from "react"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import { CSSTransition } from "react-transition-group"

const CustomStyleTextarea = styled.textarea`
  max-width: 100%;
  min-width: 100%;
  min-height: 100px;
  max-height: 300px;
  border: ${props =>
    props.isErrorText ? "2px solid #f44336" : "2px solid #f5f4f5"};
  border-radius: 5px;
  padding: 10px;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
  transition-property: border;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  /* &:focus {
    border: 2px solid ${Colors.secondColor};
  } */
`

const ErrorText = styled.div`
  font-size: 0.75rem;
  font-weight: bold;
  color: #f44336;
  padding-left: 10px;
`

const TextareaCustom = ({
  placeholder = "Uzupełnij pole",
  maxLength = "",
  textareaActive = false,
  onChange = () => {},
  value = "",
  isErrorText = false,
}) => {
  const [areaActive, setAreaActive] = useState(false)
  const timerToClearSomewhere = useRef(null)

  useEffect(() => {
    if (textareaActive) {
      timerToClearSomewhere.current = setTimeout(() => {
        setAreaActive(true)
      }, 400)
    } else {
      clearTimeout(timerToClearSomewhere.current)
      setAreaActive(false)
    }
  }, [textareaActive])

  const handleOnChange = e => {
    onChange(e)
  }

  return (
    <div>
      <CustomStyleTextarea
        isErrorText={isErrorText}
        spellcheck
        placeholder={`${placeholder}...`}
        maxLength={maxLength}
        autocomplete="off"
        autocapitalize="sentences"
        onChange={e => handleOnChange(e)}
        value={value}
      />
      {isErrorText && (
        <ErrorText>
          {
            "W tekście nie może być następujących znaków: $, #, %, &, *, (, ), /, [, ], +, -, |"
          }
        </ErrorText>
      )}
    </div>
  )
}
export default TextareaCustom
