import React from 'react'
import styled from 'styled-components'
import { CgSpinner } from "react-icons/cg"
import {Colors} from '../common/Colors'
import { CSSTransition } from "react-transition-group"
import { useSelector } from "react-redux"

const PositionAlertExtra = styled.div`
  position: fixed;
  z-index: 500;
  top: 70px;
  right: 0px;
  background-color: rgba(0, 0, 0, 0.7);
  border-bottom-left-radius: 5px;
  padding: 10px;
  font-size: 0.8rem;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  max-width: 100px;
  text-align: center;
`

const SpinnerDiv = styled.div`
  position: relative;
  margin-top: 10px;
  animation-name: spinner;
  animation-duration: 0.9s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${props => Colors(props.siteProps).primaryColor};
  font-size: 3rem;
  height: 52px;
`

 const AlertExtra = ({ siteProps }) => {
   
  const alertExtra = useSelector(state => state.alertExtra)

   return (
     <CSSTransition
       in={alertExtra.active}
       timeout={400}
       classNames="opacitySpinner"
       unmountOnExit
     >
       <PositionAlertExtra>
         {alertExtra.name}
         <SpinnerDiv siteProps={siteProps}>
           <CgSpinner />
         </SpinnerDiv>
       </PositionAlertExtra>
     </CSSTransition>
   )
 }
export default AlertExtra