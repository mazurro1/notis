import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from "react-redux"
import {Colors} from '../common/Colors'
import { CSSTransition } from "react-transition-group"
import {removeAlertItem} from '../state/actions'
import { MdClose } from 'react-icons/md';


const PositionAlerts = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 3000;
    padding-top: 2.5px;
`

const OneAlert = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    transform: ${props => `translateY(${props.index * 47}px)`};
    transition-property: transform, padding-top;
    transition-duration: 0.3s;
    transition-timing-function: ease;
    padding: 2.5px 5px;
`
const ContentAlert = styled.div`
    position: relative;
    padding: 10px;
    background-color: ${props => props.color === "green" ? "#43a047" : props.color === "blue" ? Colors.buttonColor : "#f44336"};
    border-radius: 5px;
    opacity: 0.99;
    color: white;
    padding-right: 50px;
    padding-left: 20px;
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
    background-color: rgba(0,0,0,0.0);
    transition-property: background-color;
    transition-duration: 0.3s;
    transition-timing-function: ease;

    &:hover{
        background-color: rgba(0,0,0,0.1);
    }
`

 const Alerts = () => {
    const alerts = useSelector(state => state.alerts);

     const mapAlerts = alerts.map((item, index)=>{
         return(
            <Alert key={item.id} item={item} index={index}/>
         )
     })
    return (
        <PositionAlerts>
            {mapAlerts}
        </PositionAlerts>
    )
}
export default Alerts;


const Alert = ({item, index}) => {
    const [alertVisible, setAlertVisible] = useState(false);
    const [isNew, setIsNew] = useState(true);
    const timerToClearSomewhere = useRef(null)

    const dispatch = useDispatch();

    useEffect(() => {
        if(isNew){
        setTimeout(()=>{
            setAlertVisible(true)
            setIsNew(false)
        }, 10)
    
          timerToClearSomewhere.current = setTimeout(() => {
              setAlertVisible(false)
          }, 10000)
        }
        },
        [ isNew]
      )
    
    useEffect(()=>{
         if(!alertVisible && !isNew){
            setTimeout(()=>{
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
            <OneAlert index={index}>
                <ContentAlert color={item.color}>
                    {item.text}
                    <IconClose color={item.color} onClick={handleClose}>
                        <MdClose/>
                    </IconClose>
                </ContentAlert>
            </OneAlert>
        </CSSTransition>
    )
}