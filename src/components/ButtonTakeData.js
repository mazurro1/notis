import React, { useState } from "react"
import styled from "styled-components"

const DivTakeData = styled.div`
  position: relative;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 5px;
  color: #757575;
  font-size: 16px;
  user-select: none;
  padding: 13px 20px;
  padding-left: 50px;
  background-color: #fff;
  cursor: pointer;
  margin-bottom: 5px;
  margin-right: 10px;
  transform: ${props =>
    props.mouseClick ? `scale(${props.numberScale})` : "scale(1)"};
  transition-property: background-color, transform;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    background-color: #e0e0e0;
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
  color: #757575;
`

const ButtonTakeData = ({ icon = "", text = "", onClick = () => {} }) => {
  const [mouseClick, setMouseClick] = useState(false)
  const [numberScale, setNumberScale] = useState(1)

  const handleOnClick = () => {
    setMouseClick(true)
    setNumberScale(0.95)
    onClick()
    setTimeout(() => {
      setMouseClick(false)
      setNumberScale(1)
    }, 500)
  }

  return (
    <DivTakeData
      onClick={handleOnClick}
      mouseClick={mouseClick}
      numberScale={numberScale}
    >
      <IconStyle>{icon}</IconStyle>
      {text}
    </DivTakeData>
  )
}

export default ButtonTakeData
