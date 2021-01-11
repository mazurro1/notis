import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux"
import {fetchworkerUsersInformations} from '../state/actions'
import WorkerUsersInformationItem from "./WorkerUsersInformationItem"
import ReactTooltip from "react-tooltip"
import sal from "sal.js"
import InputIcon from "./InputIcon"
import { FaUserFriends } from "react-icons/fa"

 const WorkerUsersInformation = ({ user, handleClose, siteProps }) => {
   const [filterUsers, setFilterUsers] = useState("")
   const [filterUsersInformations, setFilterUsersInformations] = useState([])
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
    const newFilterUsers = companyUsersInformations.filter(userCompany => {
      if (!!userCompany.userId) {
        const userName = Buffer.from(
          userCompany.userId.name,
          "base64"
        ).toString("ascii")
        const userSurname = Buffer.from(
          userCompany.userId.surname,
          "base64"
        ).toString("ascii")
        const isInThisName = `${userName.toLowerCase()} ${userSurname.toLowerCase()}`.includes(
          filterUsers.toLowerCase()
        )
        return isInThisName
      }
    })
    setFilterUsersInformations(newFilterUsers)
  }, [filterUsers, companyUsersInformations])

   useEffect(() => {
     ReactTooltip.rebuild()
   }, [companyUsersInformations])

   const handleChangeFilter = (e) => {
    setFilterUsers(e.target.value)
   }

   const mapedUsersInformations = filterUsersInformations.map((item, index) => {
     return (
       <WorkerUsersInformationItem
         userInfo={item}
         key={index}
         siteProps={siteProps}
         user={user}
       />
     )
   })

   return (
     <div>
       {companyUsersInformations.length > 0 ? (
         <>
           <InputIcon
             icon={<FaUserFriends />}
             placeholder="Wyszukaj użytkownika"
             value={filterUsers}
             type="text"
             onChange={handleChangeFilter}
           />
           {mapedUsersInformations.length > 0
             ? mapedUsersInformations
             : "Brak danego klienta"}
           <ReactTooltip id="addItemUserInfo" effect="float" multiline={true}>
             <span>Dodaj wiadomość o kliencie</span>
           </ReactTooltip>
           <ReactTooltip
             id="historyItemUserInfo"
             effect="float"
             multiline={true}
           >
             <span>Historia rezerwacji klienta</span>
           </ReactTooltip>
           <ReactTooltip id="phoneItemUserInfo" effect="float" multiline={true}>
             <span>Pokaż numer telefonu klienta</span>
           </ReactTooltip>
         </>
       ) : (
         "Brak klientów"
       )}
     </div>
   )
 }
export default WorkerUsersInformation