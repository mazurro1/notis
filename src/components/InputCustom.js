import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import { CSSTransition } from "react-transition-group"
import InputIcon from "./InputIcon"
import { useSelector } from "react-redux"

const CustomStyleInput = styled(InputIcon)`
  /* border: 2px solid #f5f4f5;
  border-radius: 5px;
  padding: 10px;
  transition-property: border;
  transition-duration: 0.3s;
  transition-timing-function: ease; */

  &:focus {
    border: 2px solid ${props => Colors(props.colorBlind).secondColor};
  }
`

const InputCustom = ({
  placeholder = "Uzupełnij pole",
  inputActive = false,
  onChange = () => {},
  value = "",
}) => {
  const [areaActive, setAreaActive] = useState(false)
  const colorBlind = useSelector(state => state.colorBlind)

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
        colorBlind={colorBlind}
      />
    </CSSTransition>
  )
}
export default InputCustom
