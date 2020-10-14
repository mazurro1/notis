import React, { useState, useRef, useEffect } from "react"
import styled from "styled-components"
import { Colors } from "../common/Colors"

const ButtonStyle = styled.div`
  position: relative;
  padding: 4px 10px;
  padding-left: 45px;
  padding-left: ${props => (props.icon ? "45px" : "10px")};
  border-radius: 5px;
  background-color: ${props =>
    props.mouseOn && !props.icon
      ? props.secondColors
        ? Colors.buttonIconColorSecond
        : Colors.buttonIconColor
      : props.disabled
      ? "#e0e0e0"
      : props.buttonBgDark && props.icon
      ? Colors.navDownBackground
      : props.secondColors
      ? Colors.buttonColorSecond
      : props.buttonBgDark
      ? Colors.buttonColorDark
      : props.customColorButton
      ? props.customColorButton
      : Colors.buttonColor};
  color: black;
  overflow: hidden;
  color: white;
  font-size: ${props => props.fontSize + "px"};
  text-transform: ${props => (props.uppercase ? "uppercase" : "")};
  transform: ${props => (props.mouseClick ? `scale(0.95)` : "scale(1)")};
  user-select: none;
  cursor: ${props => (props.disabled ? "default" : "pointer")};
  transition-property: background-color, transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;

  &:active {
    background-color: "red";
  }
`

const IconStyle = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 35px;
  background-color: ${props =>
    props.mouseClick
      ? props.secondColors
        ? Colors.buttonColorSecond
        : props.customColorIcon
        ? props.customColorIcon
        : props.buttonBgDark
        ? Colors.buttonColorDark
        : Colors.buttonColor
      : props.disabled
      ? "#bdbdbd"
      : props.secondColors
      ? Colors.buttonIconColorSecond
      : props.buttonBgDark
      ? Colors.buttonColorDark
      : props.customColorIcon
      ? props.customColorIcon
      : Colors.buttonIconColor};
  transform: ${props =>
    props.mouseOn ? `scale(${props.numberScale})` : "scale(1)"};
  transition-property: transform, background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
`

const OnlyIcon = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: ${props => props.fontIconSize + "px"};
  padding: 5px;
`

const TextStyle = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
`

const ButtonIcon = ({
  fontIconSize = 25,
  fontSize = 18,
  uppercase = false,
  onClick = () => {},
  title = "",
  icon,
  secondColors = false,
  buttonBgDark = false,
  disabled = false,
  customColorButton = false,
  customColorIcon = false,
}) => {
  const [mouseOn, setMouseOn] = useState(false)
  const [mouseClick, setMouseClick] = useState(false)
  const [numberScale, setNumberScale] = useState(1)
  const refButton = useRef(null)
  const timerToClearSomewhere = useRef(null)

  useEffect(() => {
    if (mouseClick) {
      timerToClearSomewhere.current = setTimeout(() => {
        setMouseClick(false)
      }, 500)
    }
    return () => {
      clearInterval(timerToClearSomewhere.current)
    }
  }, [mouseClick])

  const handleOnMouseOn = () => {
    if (!disabled) {
      setMouseOn(true)
      const numberScale = Math.floor(refButton.current.clientWidth / 35) * 2 + 1
      setNumberScale(numberScale)
    }
  }

  const handleOnMouseLeave = () => {
    if (!disabled) {
      setMouseOn(false)
    }
  }

  const handleOnClick = () => {
    if (!disabled) {
      setNumberScale(1)
      setMouseClick(true)
      onClick()
    }
  }

  const iconRender = icon && icon
  const allIcon = icon && (
    <>
      <IconStyle
        mouseOn={mouseOn}
        numberScale={numberScale}
        mouseClick={mouseClick}
        secondColors={secondColors}
        buttonBgDark={buttonBgDark}
        disabled={disabled}
        customColorIcon={customColorIcon}
      />
      <OnlyIcon fontIconSize={fontIconSize}>{iconRender}</OnlyIcon>
    </>
  )

  return (
    <ButtonStyle
      fontSize={fontSize}
      uppercase={uppercase}
      onMouseEnter={handleOnMouseOn}
      onMouseLeave={handleOnMouseLeave}
      onClick={handleOnClick}
      icon={!!icon}
      ref={refButton}
      mouseClick={mouseClick}
      mouseOn={mouseOn}
      secondColors={secondColors}
      buttonBgDark={buttonBgDark}
      disabled={disabled}
      customColorButton={customColorButton}
    >
      {allIcon}
      <TextStyle>{title}</TextStyle>
    </ButtonStyle>
  )
}
export default ButtonIcon
