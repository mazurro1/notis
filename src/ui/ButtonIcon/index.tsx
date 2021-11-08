import React, { useState, useRef, useEffect } from "react"
import * as styled from "./ButtonIconStyle"
import { disableFetchactions } from "@state/actions"
import { useDispatch, useSelector } from "react-redux"

const ButtonIcon = ({
  fontIconSize = 25,
  fontSize = "MEDIUM",
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
  isButton = false,
  type = "button",
}: {
  fontIconSize?: number
  fontSize?: "SMALL" | "MEDIUM" | "LARGE"
  uppercase?: boolean
  onClick: Function
  title: string | object
  icon?: object
  secondColors?: boolean
  buttonBgDark?: boolean
  disabled?: boolean
  customColorButton?: string | null
  customColorIcon?: string | null
  id?: string
  isFetchToBlock?: boolean
  isActive?: boolean
  isButton?: boolean
  type?: "button" | "submit" | "reset"
}) => {
  const [mouseOn, setMouseOn] = useState(false)
  const [mouseClick, setMouseClick] = useState(false)
  const [numberScale, setNumberScale] = useState(1)
  const refButton = useRef<any>(null)
  const timerToClearSomewhere: any = useRef(null)
  const siteProps = useSelector((state: any) => state.siteProps)
  const disableFetchActions = useSelector(
    (state: any) => state.disableFetchActions
  )

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

  const handleOnClick = (e: Event) => {
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

  const fontSizeCheck: number =
    fontSize === "SMALL" ? 14 : fontSize === "MEDIUM" ? 16 : 14
  // fontSize === "SMALL" ? 14 : fontSize === "MEDIUM" ? 16 : 18

  const CheckStyledElement: any = isButton
    ? styled.ButtonStyle
    : styled.DivStyle

  interface idElementButtonInterface {
    id: string
  }

  const idElementButton: idElementButtonInterface | {} = !!id ? { id: id } : {}

  interface typeElementInterface {
    type: string
  }

  const typeElement: typeElementInterface | {} = isButton ? { type: type } : {}

  return (
    <CheckStyledElement
      {...typeElement}
      {...idElementButton}
      fontSize={fontSizeCheck}
      uppercase={uppercase}
      onMouseEnter={handleOnMouseOn}
      onMouseLeave={handleOnMouseLeave}
      icon={!!icon}
      ref={refButton}
      mouseClick={mouseClick}
      mouseOn={mouseOn || isActive}
      secondColors={secondColors}
      buttonBgDark={buttonBgDark}
      disabled={disabled || (disableFetchActions && isFetchToBlock)}
      customColorButton={customColorButton}
      siteProps={siteProps}
      onClick={(e: any) => handleOnClick(e)}
    >
      {allIcon}
      <styled.TextStyle siteProps={siteProps}>{title}</styled.TextStyle>
    </CheckStyledElement>
  )
}

export default ButtonIcon
