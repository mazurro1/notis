import React from "react"
import { CSSTransition } from "react-transition-group"
import { MdClose } from "react-icons/md"
import { useSelector } from "react-redux"
import PropTypes from "prop-types"
import * as styled from "./PopupStyle"

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
    if (clickedBackground) {
      handleOnClick()
    }
  }

  const isTitleOn = !!title

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
          {title}
          {closeTitle && (
            <styled.ClosePopup
              onClick={handleOnClick}
              siteProps={siteProps}
              titleOn={isTitleOn}
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
          title={isTitleOn}
          smallTitle={smallTitle}
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

Popup.propTypes = {
  popupEnable: PropTypes.bool.isRequired,
  handleClose: PropTypes.func,
  children: PropTypes.node,
  maxWidth: PropTypes.number,
  noContent: PropTypes.bool,
  fullScreen: PropTypes.bool,
  calendar: PropTypes.bool,
  title: PropTypes.string,
  opacity: PropTypes.bool,
  secondColors: PropTypes.bool,
  position: PropTypes.string,
  closeTitle: PropTypes.bool,
  borderRadius: PropTypes.bool,
  smallTitle: PropTypes.bool,
  overflowComponent: PropTypes.bool,
  maxHeight: PropTypes.bool,
  clickedBackground: PropTypes.bool,
  heightFull: PropTypes.bool,
  top: PropTypes.string,
  bottom: PropTypes.string,
  lightBackground: PropTypes.bool,
  unmountOnExit: PropTypes.bool,
}

export default Popup
