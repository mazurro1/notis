import React, {useState, useEffect, useRef} from 'react'
import {
  FaBell,
} from "react-icons/fa"
import styled from 'styled-components'
import {Colors} from '../common/Colors'
import { CSSTransition } from "react-transition-group"
import BellAlertsItem from "./BellAlertsItem"
import { useDispatch } from "react-redux"
import {
  fetchUpdateUserAlert,
  fetchGetMoreAlerts,
  resetUserAlerts,
} from "../state/actions"
import sal from "sal.js"

const BellAlertsStyle = styled.div`
  position: relative;
  background-color: ${props => Colors(props.siteProps).darkColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  border-radius: 5px;
  padding: 10px;
  font-size: 1.2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  overflow: hidden;
  cursor: pointer;
  user-select: none;

  &:hover {
    .bell-action {
      animation-name: bellActionAnimate;
      animation-duration: 1s;
      animation-timing-function: inline;
      animation-iteration-count: 1;
    }
  }
`

const IconStyle = styled.div`
  position: absolute;
  top: 6px;
  user-select: none;
`

const CountAlerts = styled.div`
  position: absolute;
  top: -12px;
  right: -12px;
  border-radius: 5px;
  padding: 2px 4px;
  font-size: 0.8rem;
  background-color: ${props => Colors(props.siteProps).dangerColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  cursor: pointer;
  user-select: none;
  width: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const PositionRelative = styled.div`
  position: relative;
  margin-left: 5px;
  margin-right: 10px;
`

const AllAlerts = styled.div`
  position: absolute;
  top: 120%;
  border-radius: 5px;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.2);
  right: 0;
  width: 400px;
  max-width: 70vw;
  background-color: ${props => Colors(props.siteProps).navBackground};
  padding: 5px;
`

const ContentAllAlerts = styled.div`
  background-color: ${props => Colors(props.siteProps).navBackground};
  overflow: hidden;
  overflow-y: auto;
  font-size: 0.9rem;
  max-height: 300px;
`

const AlertItemStyle = styled.div`
  position: relative;
  padding: 5px 10px;
  padding-top: ${props => (props.noTime ? "5px" : "15px")};
  margin: 5px;

  background-color: ${props =>
    props.active
      ? props.alertColor === "blue"
        ? Colors(props.siteProps).primaryColorLight
        : props.alertColor === "red"
        ? Colors(props.siteProps).dangerLightColor
        : props.alertColor === "green"
        ? Colors(props.siteProps).successColorLight
        : props.alertColor === "orange"
        ? Colors(props.siteProps).secondColorLight
        : Colors(props.siteProps).darkColorDark
      : Colors(props.siteProps).companyItemBackground};
  border-radius: 5px;
  overflow: hidden;
  color: ${props => Colors(props.siteProps).textNormalBlack};

  span {
    color: ${props =>
        props.alertColor === "blue"
          ? Colors(props.siteProps).primaryColorDark
          : props.alertColor === "red"
          ? Colors(props.siteProps).dangerColorDark
          : props.alertColor === "green"
          ? Colors(props.siteProps).successColorDark
          : props.alertColor === "orange"
          ? Colors(props.siteProps).secondDarkColor
          : Colors(props.siteProps).darkColorDark
        };
    font-weight: 700;
  }
`

 const BellAlerts = ({ siteProps, user }) => {
   const [allAlerts, setAllAlerts] = useState([])
   const [alertVisible, setAlertVisible] = useState(false)
   const [scrollPosition, setScrollPosition] = useState(0)
   const [pageUpdate, setPageUpdate] = useState(1)

   const dispatch = useDispatch()

     const refAllAllerts= useRef(null)
     useEffect(() => {
       if (!!refAllAllerts) {
         if (!!refAllAllerts.current) {
           const indexLastChildren = refAllAllerts.current.childNodes.length
           if ( indexLastChildren > 0) {
             const isLastPlaceVisible =
               refAllAllerts.current.childNodes[indexLastChildren - 1]
                 .className === "sal-animate"
             if (isLastPlaceVisible) {
               refAllAllerts.current.childNodes[
                 indexLastChildren - 1
               ].className = "sal-animate active-update"
                setPageUpdate(prevState => prevState + 1)
                dispatch(fetchGetMoreAlerts(user.token, pageUpdate))
             }
           }
         }
       }
     }, [refAllAllerts, user.alerts, scrollPosition])

     useEffect(() => {
       sal({
         threshold: 0.01,
         once: true,
       })
     }, [user, alertVisible])

  useEffect(() => {
    if (!!user.alerts) {
      setAllAlerts(user.alerts)
    }
  }, [user])
  
  const handleScrollContainer = () => {
    setScrollPosition(prevState => prevState + 1)
  }

   const handleClickAlertVisible = () => {
    setAlertVisible(prevState => !prevState)
    const isSomeActive = allAlerts.some(item => item.active)
    if (alertVisible === false && isSomeActive) {
      dispatch(fetchUpdateUserAlert(user.token))
    }else if (alertVisible === false){
      dispatch(resetUserAlerts())
    }
      if (alertVisible === true) {
        const mapAllerts = allAlerts.map(item => {
          item.active = false
          return item
        })
        setAllAlerts(mapAllerts)
      }
   }

   const mapAlerts = allAlerts.map((alert, index) => {
     if(!!alert.reserwationId){
       return (
         <BellAlertsItem
           key={index}
           alert={alert}
           siteProps={siteProps}
           AlertItemStyle={AlertItemStyle}
           user={user}
         />
       )
     }
   })
   
   return (
     <PositionRelative>
       <BellAlertsStyle siteProps={siteProps} onClick={handleClickAlertVisible}>
         <IconStyle className="bell-action">
           <FaBell />
         </IconStyle>
       </BellAlertsStyle>
       <CSSTransition
         in={user.alertActiveCount > 0}
         timeout={400}
         classNames="popup"
         unmountOnExit
       >
         <CountAlerts siteProps={siteProps} onClick={handleClickAlertVisible}>
           {user.alertActiveCount}
         </CountAlerts>
       </CSSTransition>
       <CSSTransition
         in={alertVisible}
         timeout={400}
         classNames="popup"
         unmountOnExit
       >
         <AllAlerts siteProps={siteProps}>
           <ContentAllAlerts
             siteProps={siteProps}
             onScroll={handleScrollContainer}
           >
             {mapAlerts.length > 0 ? (
               <div ref={refAllAllerts}>{mapAlerts}</div>
             ) : (
               <AlertItemStyle noTime>Brak alertów</AlertItemStyle>
             )}
           </ContentAllAlerts>
         </AllAlerts>
       </CSSTransition>
     </PositionRelative>
   )
 }

export default BellAlerts