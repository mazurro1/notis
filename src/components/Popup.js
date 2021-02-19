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
  font-size: 1.4rem;
  padding: 5px 10px;
  padding-right: 35px;
  overflow: hidden;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2) inset;
`

const PopupWindow = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: ${props => (props.calendar ? "auto" : "")};
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
  max-height: 80vh;
  background-color: ${props => Colors(props.siteProps).backgroundColorPage};
  overflow: hidden;
`

const PaddingContnent = styled.div`
  padding: 10px 15px;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: calc(100% - 41px);
  max-height: calc(80vh - 41px);
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
}) => {
  const siteProps = useSelector(state => state.siteProps)
  const handleOnClick = e => {
    handleClose()
  }

  const handleOnClickContent = e => {
    e.stopPropagation()
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
    >
      {isTitleOn && (
        <TitlePagePopup siteProps={siteProps} secondColors={secondColors}>
          {title}
          <ClosePopup
            onClick={handleOnClick}
            siteProps={siteProps}
            titleOn={isTitleOn}
            secondColors={secondColors}
          >
            <MdClose />
          </ClosePopup>
        </TitlePagePopup>
      )}
      <PaddingContnent>{children}</PaddingContnent>
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
      <PopupWindow onClick={handleOnClick} calendar={calendar}>
        {contentComponent}
      </PopupWindow>
    </CSSTransition>
  )
}
export default Popup
