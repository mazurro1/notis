import React, { useState } from "react"
import styled from "styled-components"
import { MdClose } from "react-icons/md"
import { Colors } from "../common/Colors"
import { useSelector } from "react-redux"

const DivTakeData = styled.div`
  position: relative;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 5px;
  color: ${props => Colors(props.siteProps).selectDateNavigationText};
  font-size: 16px;
  user-select: none;
  padding: 13px 0;
  padding-left: 50px;
  padding-right: ${props => (props.resetTextEnable ? "40px" : "20px")};
  background-color: ${props =>
    Colors(props.siteProps).selectDateNavigationBackground};
  cursor: pointer;
  margin-bottom: 5px;
  margin-right: 10px;
  min-width: 260px;
  transform: ${props =>
    props.mouseClick ? `scale(${props.numberScale})` : "scale(1)"};
  transition-property: background-color, transform;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    background-color: ${props =>
      Colors(props.siteProps).selectDateNavigationBackgroundHover};
  }
`

const IconStyle = styled.div`
  position: absolute;
  top: -2px;
  bottom: 0;
  left: 0;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  color: ${props => Colors(props.siteProps).selectDateNavigationText};
`

const IconResetDate = styled.div`
  position: absolute;
  top: 10px;
  right: 5px;
  font-size: 1.5rem;
  color: #757575;
  transition-property: color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    color: ${props => Colors(props.siteProps).primaryColorDark};
  }
`

const ButtonTakeData = ({
  icon = "",
  text = "",
  onClick = () => {},
  setResetText = () => {},
  resetTextEnable = false,
}) => {
  const [mouseClick, setMouseClick] = useState(false)
  const [numberScale, setNumberScale] = useState(1)
  const siteProps = useSelector(state => state.siteProps)

  const handleOnClick = () => {
    setMouseClick(true)
    setNumberScale(0.95)
    onClick()
    setTimeout(() => {
      setMouseClick(false)
      setNumberScale(1)
    }, 500)
  }

  const handleResetText = e => {
    e.stopPropagation()
    setResetText()
  }

  return (
    <DivTakeData
      onClick={handleOnClick}
      mouseClick={mouseClick}
      numberScale={numberScale}
      resetTextEnable={resetTextEnable}
      siteProps={siteProps}
    >
      <IconStyle siteProps={siteProps}>{icon}</IconStyle>
      {text}
      {resetTextEnable && (
        <IconResetDate onClick={handleResetText} siteProps={siteProps}>
          <MdClose />
        </IconResetDate>
      )}
    </DivTakeData>
  )
}

export default ButtonTakeData
