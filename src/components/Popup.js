import React from "react"
import { CSSTransition } from "react-transition-group"
import styled from "styled-components"
import { MdClose } from "react-icons/md"
import { Colors } from "../common/Colors"

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
`

const PopupContent = styled.div`
  position: relative;
  background-color: white;
  max-width: ${props => props.maxWidth + "px"};
  width: 100%;
  margin: 0 auto;
  border-radius: 5px;
  padding: 10px 15px;
  overflow-y: auto;
  max-height: 90vh;
`

const ClosePopup = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  cursor: pointer;
  font-size: 1.5rem;
  color: #757575;
  transition-property: color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    color: ${Colors.buttonColor};
  }
`

const Popup = ({
  popupEnable = true,
  handleClose = () => {},
  children,
  maxWidth = 900,
}) => {
  const handleOnClick = e => {
    handleClose()
  }

  const handleOnClickContent = e => {
    e.stopPropagation()
  }
  return (
    <CSSTransition
      in={popupEnable}
      timeout={400}
      classNames="popup"
      unmountOnExit
    >
      <PopupWindow onClick={handleOnClick}>
        <PopupContent maxWidth={maxWidth} onClick={handleOnClickContent}>
          {children}
          <ClosePopup onClick={handleOnClick}>
            <MdClose />
          </ClosePopup>
        </PopupContent>
      </PopupWindow>
    </CSSTransition>
  )
}
export default Popup
