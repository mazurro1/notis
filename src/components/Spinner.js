import React from "react"
import { CSSTransition } from "react-transition-group"
import styled from "styled-components"
import { CgSpinner } from "react-icons/cg"
import { Colors } from "../common/Colors"
import { useSelector } from "react-redux"

const PopupWindow = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
`

const SpinnerDiv = styled.div`
  position: relative;
  top: -10px;
  animation-name: spinner;
  animation-duration: 0.9s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  color: ${props => Colors(props.colorBlind).primaryColor};
  font-size: 3rem;
  height: 52px;
  width: 48px;
`

const Spinner = ({ spinnerEnable = false }) => {
  const colorBlind = useSelector(state => state.colorBlind)
  return (
    <CSSTransition
      in={spinnerEnable}
      timeout={400}
      classNames="popup"
      unmountOnExit
    >
      <PopupWindow>
        <SpinnerDiv colorBlind={colorBlind}>
          <CgSpinner />
        </SpinnerDiv>
      </PopupWindow>
    </CSSTransition>
  )
}
export default Spinner
