import React, { useRef, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import * as styled from "./InputPhoneStyles"
import PropTypes from "prop-types"

const InputPhone = ({
  setPhoneNumber = () => {},
  defaultValues = null,
  width = 35,
  marginElements = 20,
  textPhone = "Numer telefonu:",
  whiteInputs = false,
  phoneLength = 9,
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

  const SelectStyleInput =
    phoneLength === 7 ? styled.ColorsInputShort : styled.ColorsInput

  return (
    <styled.StyleInputs onFocus={handleOnFocus} onBlur={handleOnBlur}>
      <div>
        <styled.TextValue siteProps={siteProps} active={inputActive}>
          {textPhone}
        </styled.TextValue>
      </div>

      <SelectStyleInput
        siteProps={siteProps}
        width={width}
        marginElements={marginElements}
        whiteInputs={whiteInputs}
      >
        <styled.NumberToCountry>+48</styled.NumberToCountry>
        <styled.PhoneInline>
          <styled.PanFieldStyle
            ref={fieldOneRef}
            onChange={code => {
              setPhoneNumber(code)
            }}
            format={k => k.toUpperCase()}
            length={phoneLength}
            validate={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
          />
        </styled.PhoneInline>
      </SelectStyleInput>
    </styled.StyleInputs>
  )
}

InputPhone.propTypes = {
  setPhoneNumber: PropTypes.func.isRequired,
  defaultValues: PropTypes.string,
  width: PropTypes.number,
  marginElements: PropTypes.number,
  textPhone: PropTypes.string,
  whiteInputs: PropTypes.bool,
  phoneLength: PropTypes.number,
}

export default InputPhone
