import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { Colors } from "@common/Colors"
import { CSSTransition } from "react-transition-group"
import { removeAlertItem } from "@state/actions"
import { MdClose, MdInfo } from "react-icons/md"

const PositionAlerts = styled.div`
  position: fixed;
  top: 72.5px;
  left: 0;
  right: 0;
  z-index: 3000;
`

const OneAlert = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  transform: ${props => `translateY(${props.alertHeight}px)`};
  transition-property: transform, padding-top;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  padding: 2.5px 5px;
`
const ContentAlert = styled.div`
  user-select: none;
  position: relative;
  padding: 10px;
  background-color: ${props =>
    props.color === "green"
      ? Colors(props.siteProps).successColor
      : props.color === "blue"
      ? Colors(props.siteProps).primaryColorDark
      : Colors(props.siteProps).dangerColor};
  border-radius: 5px;
  opacity: 0.99;
  color: white;
  padding-right: 50px;
  padding-left: 45px;
  overflow: hidden;
`

const IconClose = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  padding-right: 5px;
  padding-left: 5px;
  padding-top: 8px;
  padding-bottom: 3px;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const StyleIconInfo = styled.div`
  position: absolute;
  left: 10px;
  top: 7px;
  color: white;
  font-size: 1.5rem;
`

const Alerts = () => {
  const [heightPrevAlerts, setHeightPrevAlerts] = useState([])
  const alerts = useSelector(state => state.alerts)
  const refAlerts = useRef(null)

  useEffect(() => {
    if (!!refAlerts) {
      let countHeight = []
      refAlerts.current.childNodes.forEach((itemAlert, index) => {
        countHeight.push({
          index: index,
          height: itemAlert.clientHeight,
        })
      })
      setHeightPrevAlerts(countHeight)
    }
  }, [alerts])

  const mapAlerts = alerts.map((item, index) => {
    let alertHeight = 0
    heightPrevAlerts.forEach(itemAlert => {
      if (itemAlert.index < index) {
        alertHeight = alertHeight + itemAlert.height
      }
    })

    return (
      <Alert
        key={item.id}
        item={item}
        index={index}
        alertHeight={alertHeight}
      />
    )
  })
  return <PositionAlerts ref={refAlerts}>{mapAlerts}</PositionAlerts>
}
export default Alerts

const Alert = ({ item, index, alertHeight }) => {
  const [alertVisible, setAlertVisible] = useState(false)
  const [isNew, setIsNew] = useState(true)
  const timerToClearSomewhere = useRef(null)
  const siteProps = useSelector(state => state.siteProps)

  const dispatch = useDispatch()

  useEffect(() => {
    if (isNew) {
      setTimeout(() => {
        setAlertVisible(true)
        setIsNew(false)
      }, 10)

      timerToClearSomewhere.current = setTimeout(() => {
        setAlertVisible(false)
      }, 10000)
    }
  }, [isNew])

  useEffect(() => {
    if (!alertVisible && !isNew) {
      setTimeout(() => {
        dispatch(removeAlertItem(item.id))
      }, 400)
    }
  }, [alertVisible, isNew, item.id, dispatch])

  const handleClose = () => {
    clearTimeout(timerToClearSomewhere.current)
    setAlertVisible(false)
  }

  return (
    <CSSTransition
      in={alertVisible}
      timeout={500}
      classNames="alert"
      unmountOnExit
    >
      <OneAlert index={index} alertHeight={alertHeight}>
        <ContentAlert color={item.color} siteProps={siteProps}>
          {item.text}
          <IconClose color={item.color} onClick={handleClose}>
            <MdClose />
          </IconClose>
          <StyleIconInfo>
            <MdInfo />
          </StyleIconInfo>
        </ContentAlert>
      </OneAlert>
    </CSSTransition>
  )
}
