import React, { useRef, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import * as styled from "./InputPhoneStyles"

const InputPhone = ({
  setPhoneNumber = () => {},
  defaultValues = null,
  width = 35,
  marginElements = 20,
  textPhone = "Numer telefonu:",
  whiteInputs = false,
  phoneLength = 9,
}: {
  setPhoneNumber: Function
  defaultValues: string | null
  width: number
  marginElements: number
  textPhone: string
  whiteInputs: boolean
  phoneLength: number
}) => {
  const [inputActive, setInputActive] = useState(false)
  const siteProps = useSelector((state: any) => state.siteProps)
  const fieldOneRef: any = useRef(null)

  useEffect(() => {
    if (!!fieldOneRef) {
      if (!!fieldOneRef.current) {
        console.log(fieldOneRef)
        fieldOneRef.current.forEach((item: any, index: number) => {
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
        <styled.NumberToCountry siteProps={siteProps}>
          +48
        </styled.NumberToCountry>
        <styled.PhoneInline>
          <styled.PanFieldStyle
            ref={fieldOneRef}
            onChange={(code: Event) => {
              setPhoneNumber(code)
            }}
            format={(k: string) => k.toUpperCase()}
            length={phoneLength}
            validate={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
          />
        </styled.PhoneInline>
      </SelectStyleInput>
    </styled.StyleInputs>
  )
}

export default InputPhone
