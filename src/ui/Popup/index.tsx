import React from "react"
import { CSSTransition } from "react-transition-group"
import { MdClose } from "react-icons/md"
import { useSelector } from "react-redux"
import * as styled from "./PopupStyle"
import { ParagraphText } from "@ui"

const Popup = ({
  popupEnable = false,
  handleClose = () => {},
  children,
  maxWidth = 900,
  noContent = false,
  fullScreen = false,
  calendar = false,
  title = "",
  opacity = false,
  secondColors = false,
  position = "fixed",
  closeTitle = true,
  borderRadius = false,
  smallTitle = false,
  overflowComponent = true,
  maxHeight = true,
  clickedBackground = false,
  heightFull = false,
  top = "0",
  bottom = "0",
  lightBackground = false,
  unmountOnExit = true,
}: {
  popupEnable: boolean
  handleClose: Function
  children: ChildNode
  maxWidth: number
  noContent: boolean
  fullScreen: boolean
  calendar: boolean
  title: string
  opacity: boolean
  secondColors: boolean
  position: string
  closeTitle: boolean
  borderRadius: boolean
  smallTitle: boolean
  overflowComponent: boolean
  maxHeight: boolean
  clickedBackground: boolean
  heightFull: boolean
  top: string
  bottom: string
  lightBackground: boolean
  unmountOnExit: boolean
}) => {
  const siteProps = useSelector((state: any) => state.siteProps)
  const handleOnClick = () => {
    handleClose()
  }

  const handleOnClickContent = (e: any) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }
  const handleClickBackground = (e: any) => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    if (clickedBackground) {
      handleOnClick()
    }
  }

  const isTitleOn: boolean = !!title

  const contentComponent = noContent ? (
    <styled.ContentNoBorder
      onClick={handleOnClickContent}
      onKeyDown={() => {}}
      role="button"
      tabIndex={0}
    >
      {children}
    </styled.ContentNoBorder>
  ) : (
    <styled.PopupContent
      maxWidth={maxWidth}
      onClick={handleOnClickContent}
      fullScreen={fullScreen}
      siteProps={siteProps}
      overflowComponent={overflowComponent}
      maxHeight={maxHeight}
      heightFull={heightFull}
    >
      {isTitleOn && (
        <styled.TitlePagePopup
          siteProps={siteProps}
          secondColors={secondColors}
          smallTitle={smallTitle}
        >
          <ParagraphText
            text={title}
            fontSize={smallTitle ? "TITLE_SMALL" : "TITLE"}
            fontColor="WHITE"
          />
          {closeTitle && (
            <styled.ClosePopup
              onClick={handleOnClick}
              siteProps={siteProps}
              isTitleOn={isTitleOn}
              secondColors={secondColors}
              smallTitle={smallTitle}
            >
              <MdClose />
            </styled.ClosePopup>
          )}
        </styled.TitlePagePopup>
      )}
      <styled.PaddingContnent maxHeight={maxHeight}>
        {children}
      </styled.PaddingContnent>
      {!isTitleOn && (
        <styled.ClosePopup
          onClick={handleOnClick}
          siteProps={siteProps}
          isTitleOn={isTitleOn}
          smallTitle={smallTitle}
          secondColors={secondColors}
        >
          <MdClose />
        </styled.ClosePopup>
      )}
    </styled.PopupContent>
  )

  return (
    <CSSTransition
      in={popupEnable}
      timeout={400}
      classNames={opacity ? "opacitySpinner" : "popup"}
      unmountOnExit={unmountOnExit}
    >
      <styled.PopupWindow
        onClick={handleClickBackground}
        calendar={calendar}
        position={position}
        borderRadius={borderRadius}
        top={top}
        bottom={bottom}
        lightBackground={lightBackground}
      >
        {contentComponent}
      </styled.PopupWindow>
    </CSSTransition>
  )
}

export default Popup
