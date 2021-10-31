import React, { useState, useRef, useEffect } from "react"
import PropTypes from "prop-types"
import * as styled from "./ButtonIconStyle"
import { disableFetchactions } from "@state/actions"
import { useDispatch, useSelector } from "react-redux"

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
  isFetchToBlock = false,
  isActive = false,
}) => {
  const [mouseOn, setMouseOn] = useState(false)
  const [mouseClick, setMouseClick] = useState(false)
  const [numberScale, setNumberScale] = useState(1)
  const refButton = useRef(null)
  const timerToClearSomewhere = useRef(null)
  const siteProps = useSelector(state => state.siteProps)
  const disableFetchActions = useSelector(state => state.disableFetchActions)

  const dispatch = useDispatch()

  useEffect(() => {
    if (mouseClick) {
      timerToClearSomewhere.current = setTimeout(() => {
        setMouseClick(false)
      }, 500)
    }
    return () => {
      clearInterval(timerToClearSomewhere.current)
    }
  }, [mouseClick, isActive])

  const handleOnMouseOn = () => {
    if (!disabled && !disableFetchActions && !isActive) {
      setMouseOn(true)
      const numberScale = Math.floor(refButton.current.clientWidth / 35) * 2 + 1
      setNumberScale(numberScale)
    }
  }

  const handleOnMouseLeave = () => {
    if (!disabled && !disableFetchActions && !isActive) {
      setMouseOn(false)
    }
  }

  const handleOnClick = e => {
    if (!disabled) {
      if (isFetchToBlock) {
        if (!disableFetchActions) {
          dispatch(disableFetchactions(true))
          setMouseOn(false)
          setNumberScale(1)
          setMouseClick(true)
          onClick(e)

          setTimeout(() => {
            dispatch(disableFetchactions(false))
          }, 2000)
        }
      } else {
        setMouseOn(false)
        setNumberScale(1)
        setMouseClick(true)
        onClick(e)
      }
    }
  }

  const iconRender = icon && icon
  const allIcon = icon && (
    <>
      <styled.IconStyle
        mouseOn={mouseOn || isActive}
        numberScale={numberScale}
        mouseClick={mouseClick}
        secondColors={secondColors}
        buttonBgDark={buttonBgDark}
        disabled={disabled || (disableFetchActions && isFetchToBlock)}
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
      mouseOn={mouseOn || isActive}
      secondColors={secondColors}
      buttonBgDark={buttonBgDark}
      disabled={disabled || (disableFetchActions && isFetchToBlock)}
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
  isFetchToBlock: PropTypes.bool,
  isActive: PropTypes.bool,
}

export default ButtonIcon
