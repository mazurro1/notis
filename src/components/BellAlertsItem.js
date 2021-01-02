import React from 'react'

 const BellAlertsItem = ({
   siteProps,
   alert,
   AlertItemStyle,
   user
 }) => {
   let isUserReserwation = false;
   if(!!alert.reserwationId){
     if(!!alert.reserwationId.fromUser){
       if(!!alert.reserwationId.fromUser._id){
        isUserReserwation = user.userId === alert.reserwationId.fromUser._id
       }
     }
   }

   let alertMessage = ""
   const reserwationDate = `${
     alert.reserwationId.dateDay < 10
       ? `0${alert.reserwationId.dateDay}`
       : alert.reserwationId.dateDay
   }-${
     alert.reserwationId.dateMonth < 10
       ? `0${alert.reserwationId.dateMonth}`
       : alert.reserwationId.dateMonth
   }-${alert.reserwationId.dateYear}`

   let userName = null;
   let userSurname = null;

   if (!!alert.reserwationId){
     if(!!alert.reserwationId.fromUser){
       if(!!alert.reserwationId.fromUser.name){
          userName = Buffer.from(
            alert.reserwationId.fromUser.name,
            "base64"
          ).toString("ascii")
          userSurname = Buffer.from(
            alert.reserwationId.fromUser.surname,
            "base64"
          ).toString("ascii")
       }
     }
   }


   if (isUserReserwation){
    alertMessage = `Dokonałeś rezerwacji w firmie: ${alert.reserwationId.company.name.toUpperCase()} dnia: ${reserwationDate}, o godzinie: ${alert.reserwationId.dateStart}`
   }else{
    alertMessage = `Użytkownik ${
      !!userName && !!userSurname ? `${userName} ${userSurname}` : "Brak użytkownika"
    } dokonał rezerwacji dnia: ${reserwationDate}, o godzinie: ${
      alert.reserwationId.dateStart
    }, usługa: ${alert.reserwationId.serviceName}`
   }

     return (
       <div
         data-sal="zoom-in"
         data-sal-duration="300"
         data-sal-easing="ease-out-bounce"
       >
         <AlertItemStyle active={alert.active}>{alertMessage}</AlertItemStyle>
       </div>
     )
 }

export default BellAlertsItem