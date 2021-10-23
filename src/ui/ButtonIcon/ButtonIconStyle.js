import styled from "styled-components"
import { Colors } from "@common/Colors"

export const ButtonStyle = styled.div`
  position: relative;
  padding: 4px 10px;
  padding-left: 45px;
  padding-left: ${props => (props.icon ? "45px" : "10px")};
  border-radius: 5px;
  background-color: ${props =>
    props.mouseOn && !props.icon
      ? props.secondColors
        ? Colors(props.siteProps).secondColor
        : Colors(props.siteProps).primaryColor
      : props.disabled
      ? Colors(props.siteProps).disabled
      : props.buttonBgDark && props.icon
      ? Colors(props.siteProps).darkColorDark
      : props.secondColors
      ? Colors(props.siteProps).secondDarkColor
      : props.buttonBgDark
      ? Colors(props.siteProps).darkColor
      : props.customColorButton
      ? props.customColorButton
      : Colors(props.siteProps).primaryColorDark};
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
`

export const IconStyle = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 35px;
  background-color: ${props =>
    props.mouseClick
      ? props.secondColors
        ? Colors(props.siteProps).secondDarkColor
        : props.customColorIcon
        ? props.customColorIcon
        : props.buttonBgDark
        ? Colors(props.siteProps).darkColor
        : Colors(props.siteProps).primaryColorDark
      : props.disabled
      ? "#bdbdbd"
      : props.secondColors
      ? Colors(props.siteProps).secondColor
      : props.buttonBgDark
      ? Colors(props.siteProps).darkColor
      : props.customColorIcon
      ? props.customColorIcon
      : Colors(props.siteProps).primaryColor};
  transform: ${props =>
    props.mouseOn ? `scale(${props.numberScale})` : "scale(1)"};
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  transition-property: transform, background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease-in-out;
`

export const OnlyIcon = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  font-size: ${props => props.fontIconSize + "px"};
  padding: 5px;
`

export const TextStyle = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
  color: ${props => Colors(props.siteProps).textNormalWhite};
`
