import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from "react-redux"
import BigCalendarWorkerReserwations from "./BigCalendarWorkerReserwations"
import {fetchWorkerReserwationsAll} from '../state/actions'

 const WorkerReserwations = ({ handleClose }) => {
  const user = useSelector(state => state.user)
  const [userWorkerActive, setUserWorkerActive] = useState(user.userId)
  const [dateCalendar, setDateCalendar] = useState(new Date())
  const [disabledSwitch, setDisabledSwitch] = useState(false)
     
   const workerHistoryReserwations = useSelector(
     state => state.workerHistoryReserwations
   )
   const dispatch = useDispatch()
   
   const isAdmin = user.userId === user.company.owner

   useEffect(() => {
     dispatch(
       fetchWorkerReserwationsAll(
         user.token,
         isAdmin ? userWorkerActive : user.userId,
         dateCalendar.getFullYear(),
         dateCalendar.getMonth() + 1,
         user.company._id
       )
     )
   }, [
     dateCalendar.getMonth(),
     dateCalendar.getFullYear(),
     isAdmin,
     userWorkerActive,
   ])
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
           user={user}
           isAdmin={isAdmin}
           userWorkerActive={userWorkerActive}
           setUserWorkerActive={setUserWorkerActive}
         />
       ) : (
         "Brak uprawnien"
       )}
     </>
   )
 }
export default WorkerReserwations