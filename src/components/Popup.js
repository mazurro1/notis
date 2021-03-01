import React from "react"
import { CSSTransition } from "react-transition-group"
import styled from "styled-components"
import { MdClose } from "react-icons/md"
import { Colors } from "../common/Colors"
import { useSelector } from "react-redux"

const TitlePagePopup = styled.div`
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${props =>
    props.secondColors
      ? Colors(props.siteProps).secondColor
      : Colors(props.siteProps).primaryColorDark};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  font-size: ${props => (props.smallTitle ? "1rem" : "1.4rem")};
  padding: 5px 10px;
  padding-right: 35px;
  overflow: hidden;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2) inset;
`

const PopupWindow = styled.div`
  position: ${props => props.position};
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  z-index: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: ${props => (props.calendar ? "auto" : "")};
  border-radius: ${props => (props.borderRadius ? "5px" : "0px")};
  cursor: default;
  @media all and (max-width: 830px) {
    display: ${props => (props.calendar ? "inline-block" : "flex")};
  }
`

const PopupContent = styled.div`
  position: relative;
  background-color: white;
  max-width: ${props => props.maxWidth + "px"};
  width: 90%;
  height: ${props => (props.fullScreen ? "100vh" : "auto")};
  margin: 0 auto;
  border-radius: 5px;
  max-height: ${props => (props.maxHeight ? "80vh" : "auto")};
  background-color: ${props => Colors(props.siteProps).backgroundColorPage};
  overflow: ${props => (props.overflow ? "hidden" : "auto")};
`

const PaddingContnent = styled.div`
  padding: 10px 15px;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: ${props => (props.maxHeight ? "calc(100% - 41px)" : "auto")};
  max-height: ${props => (props.maxHeight ? "calc(80vh - 41px)" : "auto")};
`

const ClosePopup = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 7px;
  cursor: pointer;
  font-size: 1.5rem;
  color: ${props =>
    props.titleOn ? Colors(props.siteProps).textNormalWhite : "#757575"};
  transition-property: color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    color: ${props =>
      props.secondColors
        ? Colors(props.siteProps).secondDarkColor
        : Colors(props.siteProps).primaryColor};
  }
`

const ContentNoBorder = styled.div`
  border: none;
  outline: none;
  &:active,
  &:focus {
    border: none;
    outline: none;
  }
`

const Popup = ({
  popupEnable = false,
  handleClose = () => {},
  children,
  maxWidth = 900,
  noContent = false,
  fullScreen = false,
  calendar = false,
  title = null,
  opacity = false,
  secondColors = false,
  close = true,
  position = "fixed",
  closeTitle = true,
  borderRadius = false,
  smallTitle = false,
  overflow = true,
  maxHeight = true,
}) => {
  const siteProps = useSelector(state => state.siteProps)
  const handleOnClick = e => {
    handleClose()
  }

  const handleOnClickContent = e => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }
  const handleClickBackground = e => {
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
    if (close) {
      handleOnClick()
    }
  }

  const isTitleOn = !!title

  const contentComponent = noContent ? (
    <ContentNoBorder
      onClick={handleOnClickContent}
      onKeyDown={() => {}}
      role="button"
      tabIndex={0}
    >
      {children}
    </ContentNoBorder>
  ) : (
    <PopupContent
      maxWidth={maxWidth}
      onClick={handleOnClickContent}
      fullScreen={fullScreen}
      siteProps={siteProps}
      overflow={overflow}
      maxHeight={maxHeight}
    >
      {isTitleOn && (
        <TitlePagePopup
          siteProps={siteProps}
          secondColors={secondColors}
          smallTitle={smallTitle}
        >
          {title}
          {closeTitle && (
            <ClosePopup
              onClick={handleOnClick}
              siteProps={siteProps}
              titleOn={isTitleOn}
              secondColors={secondColors}
            >
              <MdClose />
            </ClosePopup>
          )}
        </TitlePagePopup>
      )}
      <PaddingContnent maxHeight={maxHeight}>{children}</PaddingContnent>
      {!isTitleOn && (
        <ClosePopup
          onClick={handleOnClick}
          siteProps={siteProps}
          title={isTitleOn}
        >
          <MdClose />
        </ClosePopup>
      )}
    </PopupContent>
  )

  return (
    <CSSTransition
      in={popupEnable}
      timeout={400}
      classNames={opacity ? "opacitySpinner" : "popup"}
      unmountOnExit
    >
      <PopupWindow
        onClick={handleClickBackground}
        calendar={calendar}
        position={position}
        borderRadius={borderRadius}
      >
        {contentComponent}
      </PopupWindow>
    </CSSTransition>
  )
}
export default Popup
