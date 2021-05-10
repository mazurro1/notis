import React, { useRef, useEffect, useState } from "react"
import PinField from "react-pin-field"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import { useSelector } from "react-redux"

const ColorsInput = styled.div`
  input {
    background-color: ${props => Colors(props.siteProps).companyItemBackground};
    color: ${props => Colors(props.siteProps).textNormalBlack};
    width: ${props => props.width + "px"};
    height: ${props => props.width + "px"};

    &:nth-child(3n) {
      margin-right: ${props => props.marginElements + "px"};

      @media all and (max-width: 490px) {
        margin-right: 5px;
      }
    }
  }
`

const PanFieldStyle = styled(PinField)`
  border-radius: 2px;
  border: none;
  outline: none;
  text-align: center;
  margin: 1px;
  font-size: 1rem;
  font-family: "Poppins-Medium", sans-serif;
  transition-property: color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

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

const NumberToCountry = styled.div`
  display: inline-block;
  color: ${props => Colors(props.siteProps).primaryColorDark};
  margin-right: 10px;
  font-family: "Poppins-Medium", sans-serif;
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

const PhoneInline = styled.div`
  display: inline-block;
`

const InputPhone = ({
  setPhoneNumber = () => {},
  defaultValues = null,
  width = 35,
  marginElements = 20,
}) => {
  const [inputActive, setInputActive] = useState(false)
  const siteProps = useSelector(state => state.siteProps)
  const fieldOneRef = useRef(null)

  useEffect(() => {
    if (!!fieldOneRef) {
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
  }, [fieldOneRef, defaultValues])

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

      <ColorsInput
        siteProps={siteProps}
        width={width}
        marginElements={marginElements}
      >
        <NumberToCountry>+48</NumberToCountry>
        <PhoneInline>
          <PanFieldStyle
            ref={fieldOneRef}
            onChange={code => {
              setPhoneNumber(code)
            }}
            format={k => k.toUpperCase()}
            length={9}
            validate={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
          />
        </PhoneInline>
      </ColorsInput>
    </StyleInputs>
  )
}
export default InputPhone
