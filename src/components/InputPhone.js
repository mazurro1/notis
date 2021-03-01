import React, { useRef, useEffect, useState } from "react"
import PinField from "react-pin-field"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import { useSelector } from "react-redux"

const PanFieldStyle = styled(PinField)`
  width: 35px;
  height: 35px;
  border-radius: 2px;
  border: none;
  outline: none;
  text-align: center;
  margin: 1px;
  background-color: ${props => Colors(props.siteProps).companyItemBackground};
  color: ${props => Colors(props.siteProps).textNormalBlack};
  font-size: 1.1rem;
  transition-property: color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:nth-child(3n) {
    margin-right: 20px;

    @media all and (max-width: 490px) {
      margin-right: 5px;
    }
  }

  &:disabled {
    color: #bdbdbd;
  }

  @media all and (max-width: 490px) {
    width: 25px;
    height: 25px;
    font-size: 1rem;
  }
`

const TextValue = styled.div`
  font-size: 0.8rem;
  font-family: "Poppins-Medium", sans-serif;
  color: ${props =>
    props.active
      ? Colors(props.siteProps).primaryColor
      : Colors(props.siteProps).darkColorLight};
  transition-property: color, opacity;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const StyleInputs = styled.div`
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }
`

const InputPhone = ({ setPhoneNumber = () => {}, defaultValues = null }) => {
  const [inputActive, setInputActive] = useState(false)
  const siteProps = useSelector(state => state.siteProps)
  const fieldOneRef = useRef(null)

  useEffect(() => {
    if (!!fieldOneRef) {
      console.log(fieldOneRef)
      if (!!fieldOneRef.current) {
        fieldOneRef.current.forEach((item, index) => {
          if (!!defaultValues) {
            if (!!defaultValues[index]) {
              item.value = defaultValues[index]
            }
          }
          item.type = "number"
        })
      }
    }
  }, [fieldOneRef])

  const handleOnFocus = () => {
    setInputActive(true)
  }
  const handleOnBlur = () => {
    setInputActive(false)
  }
  return (
    <StyleInputs onFocus={handleOnFocus} onBlur={handleOnBlur}>
      <div>
        <TextValue siteProps={siteProps} active={inputActive}>
          Numer telefonu:
        </TextValue>
      </div>
      <div>
        <PanFieldStyle
          ref={fieldOneRef}
          onChange={code => {
            setPhoneNumber(code)
          }}
          format={k => k.toUpperCase()}
          length={9}
          validate={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
          siteProps={siteProps}
        />
      </div>
    </StyleInputs>
  )
}
export default InputPhone
