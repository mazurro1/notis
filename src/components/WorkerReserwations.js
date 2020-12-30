import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from "react-redux"
import BigCalendarWorkerReserwations from "./BigCalendarWorkerReserwations"
import {fetchWorkerReserwationsAll} from '../state/actions'

 const WorkerReserwations = ({ handleClose }) => {
  const [dateCalendar, setDateCalendar] = useState(new Date())
  const [disabledSwitch, setDisabledSwitch] = useState(false)
     
   const workerHistoryReserwations = useSelector(
     state => state.workerHistoryReserwations
   )
   const user = useSelector(state => state.user)
   const dispatch = useDispatch()

   useEffect(() => {
     dispatch(
       fetchWorkerReserwationsAll(
         user.token,
         dateCalendar.getFullYear(),
         dateCalendar.getMonth() + 1,
         user.company._id
       )
     )
   }, [dateCalendar.getMonth(), dateCalendar.getFullYear()])
   return (
     <>
       {!!workerHistoryReserwations ? (
         <BigCalendarWorkerReserwations
           item={workerHistoryReserwations}
           handleClose={handleClose}
           dateCalendar={dateCalendar}
           setDateCalendar={setDateCalendar}
           disabledSwitch={disabledSwitch}
           setDisabledSwitch={setDisabledSwitch}
         />
       ) : (
         "Brak uprawnien"
       )}
     </>
   )
 }
export default WorkerReserwations