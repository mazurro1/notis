import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import { CSSTransition } from "react-transition-group"
import InputIcon from "./InputIcon"

const CustomStyleInput = styled(InputIcon)`
  /* border: 2px solid #f5f4f5;
  border-radius: 5px;
  padding: 10px;
  transition-property: border;
  transition-duration: 0.3s;
  transition-timing-function: ease; */

  &:focus {
    border: 2px solid ${Colors.secondColor};
  }
`

const InputCustom = ({
  placeholder = "Uzupełnij pole",
  inputActive = false,
  onChange = () => {},
  value = "",
}) => {
  const [areaActive, setAreaActive] = useState(false)

  useEffect(() => {
    if (inputActive) {
      setTimeout(() => {
        setAreaActive(true)
      }, 300)
    } else {
      setAreaActive(false)
    }
  }, [inputActive])

  return (
    <CSSTransition
      in={areaActive}
      timeout={300}
      classNames="textAreaDelay"
      unmountOnExit
    >
      <CustomStyleInput
        placeholder={placeholder}
        value={value}
        secondColor
        onChange={onChange}
      />
    </CSSTransition>
  )
}
export default InputCustom
