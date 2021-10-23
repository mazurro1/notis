import React, { useState } from "react"
import { MdClose } from "react-icons/md"
import { useSelector } from "react-redux"
import * as styled from "./ButtonTakeDataStyle"
import PropTypes from "prop-types"

const ButtonTakeData = ({
  icon = null,
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

ButtonTakeData.propTypes = {
  icon: PropTypes.object.isRequired,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  setResetText: PropTypes.func,
  resetTextEnable: PropTypes.bool,
}

export default ButtonTakeData
