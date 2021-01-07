import React, {useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import {fetchworkerUsersInformations} from '../state/actions'
import WorkerUsersInformationItem from "./WorkerUsersInformationItem"
import ReactTooltip from "react-tooltip"
import sal from "sal.js"

 const WorkerUsersInformation = ({ user, handleClose, siteProps }) => {
   const companyUsersInformations = useSelector(
     state => state.companyUsersInformations
   )
   const userId = useSelector(state => state.userId)
   const dispatch = useDispatch()

   useEffect(() => {
     if (!!userId) {
       dispatch(fetchworkerUsersInformations(user.token, user.company._id))
     }
   }, [user.alerts, userId])

  useEffect(() => {
    sal({
      threshold: 0.01,
      once: true,
    })
  }, [companyUsersInformations])

   useEffect(() => {
     ReactTooltip.rebuild()
   }, [companyUsersInformations])

   const mapedUsersInformations = companyUsersInformations.map(
     (item, index) => {
       return (
         <WorkerUsersInformationItem
           userInfo={item}
           key={index}
           siteProps={siteProps}
           user={user}
         />
       )
     }
   )

   return (
     <div>
       {mapedUsersInformations.length > 0 ? (
         <>
           {mapedUsersInformations}
           
             <>
               <ReactTooltip
                 id="addItemUserInfo"
                 effect="float"
                 multiline={true}
               >
                 <span>Dodaj wiadomość o kliencie</span>
               </ReactTooltip>
               <ReactTooltip
                 id="historyItemUserInfo"
                 effect="float"
                 multiline={true}
               >
                 <span>Historia rezerwacji klienta</span>
               </ReactTooltip>
               <ReactTooltip
                 id="phoneItemUserInfo"
                 effect="float"
                 multiline={true}
               >
                 <span>Pokaż numer telefonu klienta</span>
               </ReactTooltip>
               {/* <ReactTooltip
                 id="blocked"
                 effect="float"
                 multiline={true}
               >
                 <span>Blokuj użytkownika</span>
               </ReactTooltip>
               <ReactTooltip
                 id="noblocked"
                 effect="float"
                 multiline={true}
               >
                 <span>Odblokuj użytkownika</span>
               </ReactTooltip> */}
             </>
           
         </>
       ) : (
         "Brak klientów"
       )}
     </div>
   )
 }
export default WorkerUsersInformation