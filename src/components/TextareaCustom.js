import React from "react"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import { useSelector } from "react-redux"

const CustomStyleTextarea = styled.textarea`
  max-width: 100%;
  min-width: 100%;
  min-height: 100px;
  max-height: 300px;
  border: ${props =>
    props.isErrorText
      ? `1px solid ${Colors(props.colorBlind).dangerColor}`
      : `1px solid ${Colors(props.colorBlind).textNormalBlack}`};
  background-color: ${props => Colors(props.colorBlind).companyItemBackground};
  color: ${props => Colors(props.colorBlind).textNormalBlack};
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
  color: ${props => Colors(props.colorBlind).dangerColor};
  padding-left: 10px;
`

const TextareaCustom = ({
  placeholder = "Uzupełnij pole",
  maxLength = "",
  onChange = () => {},
  value = "",
  isErrorText = false,
}) => {
  const colorBlind = useSelector(state => state.colorBlind)
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
        colorBlind={colorBlind}
      />
      {isErrorText && (
        <ErrorText colorBlind={colorBlind}>
          {
            "W tekście nie może być następujących znaków: $, #, %, &, *, (, ), /, [, ], +, -, |"
          }
        </ErrorText>
      )}
    </div>
  )
}
export default TextareaCustom
