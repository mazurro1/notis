import React, { useState, useRef, useEffect } from "react"
import { useSelector } from "react-redux"
import PropTypes from "prop-types"
import * as styled from "./ButtonIconStyle"

const ButtonIcon = ({
  fontIconSize = "25",
  fontSize = "18",
  uppercase = false,
  onClick = () => {},
  title = "",
  icon,
  secondColors = false,
  buttonBgDark = false,
  disabled = false,
  customColorButton = null,
  customColorIcon = null,
  id = "",
}) => {
  const [mouseOn, setMouseOn] = useState(false)
  const [mouseClick, setMouseClick] = useState(false)
  const [numberScale, setNumberScale] = useState(1)
  const refButton = useRef(null)
  const timerToClearSomewhere = useRef(null)
  const siteProps = useSelector(state => state.siteProps)

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

  const handleOnClick = e => {
    if (!disabled) {
      setNumberScale(1)
      setMouseClick(true)
      onClick(e)
    }
  }

  const iconRender = icon && icon
  const allIcon = icon && (
    <>
      <styled.IconStyle
        mouseOn={mouseOn}
        numberScale={numberScale}
        mouseClick={mouseClick}
        secondColors={secondColors}
        buttonBgDark={buttonBgDark}
        disabled={disabled}
        customColorIcon={customColorIcon}
        siteProps={siteProps}
        id="IconStyle"
      />
      <styled.OnlyIcon fontIconSize={fontIconSize} siteProps={siteProps}>
        {iconRender}
      </styled.OnlyIcon>
    </>
  )

  return (
    <styled.ButtonStyle
      id={id}
      fontSize={Number(fontSize) <= 18 ? 14 : fontSize}
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
      siteProps={siteProps}
    >
      {allIcon}
      <styled.TextStyle siteProps={siteProps}>{title}</styled.TextStyle>
    </styled.ButtonStyle>
  )
}

ButtonIcon.propTypes = {
  fontIconSize: PropTypes.string,
  fontSize: PropTypes.string,
  uppercase: PropTypes.bool,
  onClick: PropTypes.func,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  icon: PropTypes.object,
  secondColors: PropTypes.bool,
  buttonBgDark: PropTypes.bool,
  disabled: PropTypes.bool,
  customColorButton: PropTypes.string,
  customColorIcon: PropTypes.string,
  id: PropTypes.string,
}

export default ButtonIcon
