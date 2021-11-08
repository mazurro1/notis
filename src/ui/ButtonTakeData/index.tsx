import React, { useState } from "react"
import { MdClose } from "react-icons/md"
import { useSelector } from "react-redux"
import * as styled from "./ButtonTakeDataStyle"

const ButtonTakeData = ({
  icon = null,
  text = "",
  onClick = () => {},
  setResetText = () => {},
  resetTextEnable = false,
}: {
  icon: null | object
  text: string
  onClick: Function
  setResetText: Function
  resetTextEnable: boolean
}) => {
  const [mouseClick, setMouseClick] = useState(false)
  const [numberScale, setNumberScale] = useState(1)
  const siteProps = useSelector((state: any) => state.siteProps)

  const handleOnClick = () => {
    setMouseClick(true)
    setNumberScale(0.95)
    onClick()
    setTimeout(() => {
      setMouseClick(false)
      setNumberScale(1)
    }, 500)
  }

  const handleResetText = (e: Event) => {
    e.stopPropagation()
    setResetText()
  }

  return (
    <styled.DivTakeData
      onClick={handleOnClick}
      mouseClick={mouseClick}
      numberScale={numberScale}
      resetTextEnable={resetTextEnable}
      siteProps={siteProps}
    >
      <styled.IconStyle siteProps={siteProps}>{icon}</styled.IconStyle>
      {text}
      {resetTextEnable && (
        <styled.IconResetDate onClick={handleResetText} siteProps={siteProps}>
          <MdClose />
        </styled.IconResetDate>
      )}
    </styled.DivTakeData>
  )
}

export default ButtonTakeData
