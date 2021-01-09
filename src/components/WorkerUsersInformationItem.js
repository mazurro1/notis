import React, {useState, useEffect, useRef} from 'react'
import styled from 'styled-components'
import { Collapse } from "react-collapse"
import {Colors} from '../common/Colors'
import {
  MdExpandMore,
  MdLibraryAdd,
  MdMessage,
  MdArrowBack,
  MdAddBox,
  MdHistory,
  MdBlock,
  MdPhone,
} from "react-icons/md"
import { CSSTransition } from "react-transition-group"
import InputIcon from "./InputIcon"
import ButtonIcon from "./ButtonIcon"
import sal from "sal.js"
import {
  fetchworkerUsersMoreInformationsHistory,
  fetchCompanyUsersInformationsBlock,
  fetchCustomUserPhone,
  fetchCompanyUsersInformationsMessage,
  fetchCompanyUsersInformationsDeleteMessage,
  fetchworkerUsersMoreInformationsMessage,
} from "../state/actions"
import { useDispatch } from "react-redux"
import ReactTooltip from "react-tooltip"
import WorkerUsersInformationItemMessage from "./WorkerUsersInformationItemMessage"



const ServiceItem = styled.div`
  position: relative;
  background-color: ${props =>
    props.clickDelete && !props.siteProps
      ? "#ffebee"
      : Colors(props.siteProps).companyItemBackground};
  padding: 10px;
  border-radius: 5px;
  border-top-left-radius: ${props => (props.index ? "0px" : "5px")};
  border-top-right-radius: ${props => (props.index ? "0px" : "5px")};
  margin: 5px 5px;
  margin-top: ${props => (props.index ? "0px" : "5px")};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  user-select: none;
  overflow: hidden;
  color: ${props => Colors(props.siteProps).textNormalBlack};
  transition-property: all;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const ServiceItemMessages = styled.div`
  position: relative;
  background-color: ${props =>
    props.clickDelete && !props.siteProps
      ? "#ffebee"
      : Colors(props.siteProps).companyItemBackground};
  padding: 10px;
  padding-top: 22px;
  padding-right: 50px;
  border-radius: 5px;
  border-top-left-radius: ${props => (props.index ? "0px" : "5px")};
  border-top-right-radius: ${props => (props.index ? "0px" : "5px")};
  margin: 5px 5px;
  margin-top: ${props => (props.index ? "0px" : "5px")};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  user-select: none;
  overflow: hidden;
  color: ${props => Colors(props.siteProps).textNormalBlack};
  transition-property: all;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const ServiceItemHistory = styled.div`
  position: relative;
  font-size: 1rem;
  background-color: ${props =>
    props.color === "green"
      ? Colors(props.siteProps).successColorLight
      : props.color === "red"
      ? Colors(props.siteProps).dangerLightColor
      : Colors(props.siteProps).companyItemBackground};
  padding: 10px;
  padding-top: 20px;
  border-radius: 5px;
  border-top-left-radius: ${props => (props.index ? "0px" : "5px")};
  border-top-right-radius: ${props => (props.index ? "0px" : "5px")};
  margin: 5px 5px;
  margin-top: ${props => (props.index ? "0px" : "5px")};
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  user-select: none;
  overflow: hidden;
  color: ${props => Colors(props.siteProps).textNormalBlack};
  transition-property: all;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const CategoryItemStyle = styled.div`
  margin-top: 20px;
`


const TitleCategory = styled.div`
  position: relative;
  font-size: 1.25rem;
  cursor: pointer;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  background-color: ${props =>
    props.isBlocked
      ? Colors(props.siteProps).dangerColor
      : Colors(props.siteProps).primaryColor};
  padding: 10px;
  border-radius: 5px;
  padding-right: 280px;
  padding-bottom: ${props => (props.clickAdd ? "250px" : "20px")};
  overflow: hidden;
  user-select: none;
  transition-property: padding-bottom, background-color, color;
  transition-duration: 0.5s;
  transition-timing-function: ease;
`

const IconPosition = styled.div`
  position: absolute;
  top: 0;
  right: ${props => props.right};
  font-size: 2rem;
  padding: 13px;
  padding-bottom: 0;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const IconCollapse = styled.div`
  position: absolute;
  top: 0;
  right: ${props => props.right};
  font-size: 2rem;
  padding: 13px;
  padding-bottom: 0;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  svg {
    transform: ${props =>
      !props.collapseActive ? "rotate(180deg)" : "rotate(0deg)"};

    transition-property: transform;
    transition-duration: 0.4s;
    transition-timing-function: ease;
  }
`

const BackgroundEdit = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const BackgroundEditContent = styled.div`
  width: 90%;
  background-color: ${props => Colors(props.siteProps).backgroundColorPage};
  border-radius: 5px;
  max-height: 90%;
  color: black;
  cursor: default;
  overflow: hidden;
`

const BackgroundEditContentPadding = styled.div`
  padding: 10px;
`

const ButtonsAddPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const ButtonMargin = styled.div`
  margin: 5px;
`

const ButtonMarginSubmit = styled.button`
  margin: 5px;
  border: none;
  background-color: transparent;
`

const TitleEditContent = styled.div`
  background-color: ${props => Colors(props.siteProps).primaryColorDark};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  padding: 5px 10px;
`

const HeightContentHistory = styled.div`
  max-height: 150px;
  overflow-y: auto;
`

const HeightContentMessages = styled.div`
  max-height: 350px;
  overflow-y: auto;
`

const HeightContentMessagesOther = styled.div`
  max-height: 350px;
  overflow-y: auto;
`

const ReserwationsCountStyle = styled.div`
  position: absolute;
  bottom: 5px;
  left: 10px;
  font-size: 0.8rem;
`

const TimeReserwation = styled.div`
  position: absolute;
  top: 5px;
  left: 10px;
  font-size: 0.8rem;
  opacity: 0.5;
  span {
    padding-right: 5px;
    color: ${props => Colors(props.siteProps).primaryColorDark};
  }

  .statusReserwation {
    display: inline-block;
    font-weight: 700;
    color: ${props =>
      props.color === "green"
        ? Colors(props.siteProps).successColorDark
        : props.color === "red"
        ? Colors(props.siteProps).dangerColorDark
        : Colors(props.siteProps).primaryColorDark};
    margin-left: 10px;
  }
`

const PhoneNumberContent = styled.div`
  position: relative;
  padding: 10px;
`

const ButtonStylePhone = styled.div`
  position: relative;
  top: 7px;
  display: inline-block;
  margin-left: 5px;
`

const PaddingTopPhone = styled.div`
  padding-top: 7px;
  display: inline-block;
  margin-right: 5px;
`

const DateMessageWorkerInformations = styled.div`
  position: absolute;
  top: 5px;
  left: 10px;
  font-size: 0.8rem;
  color: ${props => Colors(props.siteProps).primaryColorDark};
  opacity: 0.5;

  span {
    color: ${props => Colors(props.siteProps).textNormalBlack};
    padding-right: 5px;
  }
`

const IconDeleteMessage = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  border-radius: 5px;
  height: 30px;
  width: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  background-color: ${props => Colors(props.siteProps).dangerColor};
  font-size: 1.3rem;
  cursor: pointer;
  transition-property: background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    background-color: ${props => Colors(props.siteProps).dangerColorDark};
  }
`

 const WorkerUsersInformationItem = ({ userInfo, siteProps, user }) => {
   const [userCollapseActive, setUserCollapseActive] = useState(false)
   const [clickAdd, setClickAdd] = useState(false)
   const [clickBlock, setClickBlock] = useState(false)
   const [clickHistory, setClickHistory] = useState(false)
   const [clickPhone, setClickPhone] = useState(false)
   const [newMessage, setNewMessage] = useState("")
   const [scrollPosition, setScrollPosition] = useState(0)
   const [scrollPositionMessages, setScrollPositionMessages] = useState(0)
   const [pageHistory, setPageHistory] = useState(1)
   const [pageMessages, setPageMessages] = useState(1)
   const refAllHistory = useRef(null)
   const refAllMessages = useRef(null)

   const dispatch = useDispatch()

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [userInfo, clickBlock])

   useEffect(() => {
     if (!!refAllHistory) {
       if (!!refAllHistory.current) {
         const indexLastChildren = refAllHistory.current.childNodes.length
         if (
           indexLastChildren > 0 &&
           indexLastChildren < userInfo.reserwationsCount
         ) {
           const isLastPlaceVisible =
             refAllHistory.current.childNodes[indexLastChildren - 1]
               .className === "sal-animate"
           if (isLastPlaceVisible) {
             refAllHistory.current.childNodes[indexLastChildren - 1].className =
               "sal-animate active-update"
             setPageHistory(prevState => prevState + 1)
             dispatch(
               fetchworkerUsersMoreInformationsHistory(
                 user.token,
                 user.company._id,
                 userInfo._id,
                 pageHistory
               )
             )
           }
         }
       }
     }
   }, [refAllHistory, userInfo, scrollPosition])

      useEffect(() => {
        if (!!refAllMessages) {
          if (!!refAllMessages.current) {
            const indexLastChildren = refAllMessages.current.childNodes.length
            if (
              indexLastChildren > 0
            ) {
              const isLastPlaceVisible =
                refAllMessages.current.childNodes[indexLastChildren - 1]
                  .className === "sal-animate"
              if (isLastPlaceVisible) {
                refAllMessages.current.childNodes[
                  indexLastChildren - 1
                ].className = "sal-animate active-update"
                setPageMessages(prevState => prevState + 1)
                dispatch(
                  fetchworkerUsersMoreInformationsMessage(
                    user.token,
                    user.company._id,
                    userInfo._id,
                    pageMessages
                  )
                )
              }
            }
          }
        }
      }, [refAllMessages, userInfo, scrollPositionMessages])

   useEffect(() => {
     sal({
       threshold: 0.01,
       once: true,
     })
   }, [userInfo, clickHistory])

   const handleScrollContainer = () => {
     setScrollPosition(prevState => prevState + 1)
   }

  const handleScrollContainerMessages = () => {
    setScrollPositionMessages(prevState => prevState + 1)
  }

   const handleClickCollapse = e => {
     e.stopPropagation()
     setUserCollapseActive(prevState => !prevState)
   }

   const handleClickAdd = e => {
     e.stopPropagation()
     setClickAdd(prevState => !prevState)
   }

   const handleCancelAdd = e => {
     e.stopPropagation()
     setClickAdd(false)
     setNewMessage("")
   }

   const handleClickContent = e => {
     e.stopPropagation()
   }

   const handleChangeMessage = e => {
     setNewMessage(e.target.value)
   }

   const handleAddMessage = e => {
     e.preventDefault()
      dispatch(
        fetchCompanyUsersInformationsMessage(
          user.token,
          user.company._id,
          userInfo._id,
          newMessage
        )
      )
      setClickAdd(false)
      setNewMessage("")
   }

   const handleDeleteMessageFetch = (messageId) => {
     dispatch(
       fetchCompanyUsersInformationsDeleteMessage(
         user.token,
         user.company._id,
         userInfo._id,
         messageId
       )
     )
   }

   const handleClickBlock = e => {
     e.stopPropagation()
     setClickBlock(prevState => !prevState)
   }

   const handleClickPhone = e => {
     e.stopPropagation()
    setClickPhone(prevState => !prevState)
   }

   const handleConfirmBlockUser = () => {
     setClickBlock(false)
     dispatch(
       fetchCompanyUsersInformationsBlock(
         user.token,
         user.company._id,
         userInfo._id,
         !!!userInfo.isBlocked
       )
     )
   }

   const handleClickHistory = e => {
     e.stopPropagation()
     setClickHistory(prevState => !prevState)
     setPageHistory(1)
   }

   const handleFetchPhoneNumber = () => {
     dispatch(
       fetchCustomUserPhone(
         user.token,
         userInfo.userId._id,
         userInfo._id,
         user.company._id
       )
     )
   }

   const mapInformations = userInfo.informations.map((item, index) => {
      let workerName = "Użytkownik skasował konto"
      let workerSurname = ""
      if (!!item.workerWhoWritedUserId) {
        workerName = Buffer.from(
          item.workerWhoWritedUserId.name,
          "base64"
        ).toString("ascii")
        workerSurname = Buffer.from(
          item.workerWhoWritedUserId.surname,
          "base64"
        ).toString("ascii")
      }
      const dateMessage = new Date(item.dateMessage)
      const renderDate = `${
        dateMessage.getDate() < 10
          ? `0${dateMessage.getDate()}`
          : dateMessage.getDate()
      }-${
        dateMessage.getMonth() + 1 < 10
          ? `0${dateMessage.getMonth() + 1}`
          : dateMessage.getMonth()
      }-${dateMessage.getFullYear()} -`

     return (
       <WorkerUsersInformationItemMessage
         ServiceItemMessages={ServiceItemMessages}
         siteProps={siteProps}
         index={index}
         item={item}
         DateMessageWorkerInformations={DateMessageWorkerInformations}
         renderDate={renderDate}
         workerName={workerName}
         workerSurname={workerSurname}
         IconDeleteMessage={IconDeleteMessage}
         userInfo={userInfo}
         handleClickContent={handleClickContent}
         ButtonMargin={ButtonMargin}
         key={index}
         handleDeleteMessageFetch={handleDeleteMessageFetch}
       />
     )
   })

   const mapedUserReserwations = userInfo.allUserReserwations.map(
     (reserwation, index) => {
       const dateReserwation = (
         <>
           <span>
             {`${reserwation.reserwationId.dateStart}-${reserwation.reserwationId.dateEnd}`}{" "}
           </span>
           {`${
             reserwation.reserwationId.dateDay < 10
               ? `0${reserwation.reserwationId.dateDay}`
               : reserwation.reserwationId.dateDay
           }-${
             reserwation.reserwationId.dateMonth < 10
               ? `0${reserwation.reserwationId.dateMonth}`
               : reserwation.reserwationId.dateMonth
           }-${reserwation.reserwationId.dateYear}`}
         </>
       )

       const workerName = Buffer.from(
         reserwation.reserwationId.toWorkerUserId.name,
         "base64"
       ).toString("ascii")
       const workerSurname = Buffer.from(
         reserwation.reserwationId.toWorkerUserId.surname,
         "base64"
       ).toString("ascii")
       const splitReserwationDate = reserwation.reserwationId.dateStart.split(":")
       const isActualReserwation = new Date(
         reserwation.reserwationId.dateYear,
         reserwation.reserwationId.dateMonth - 1,
         reserwation.reserwationId.dateDay,
         Number(splitReserwationDate[0]),
         Number(splitReserwationDate[1])
       )
       const isFinishedDate = isActualReserwation <= new Date()
       const reserwationColor = reserwation.reserwationId.visitCanceled
         ? "red"
         : reserwation.reserwationId.visitNotFinished
         ? "red"
         : isFinishedDate
         ? "green"
         : "blue"
       return (
         <div
           data-sal="zoom-in"
           data-sal-duration="300"
           data-sal-easing="ease-out-bounce"
           key={index}
         >
           <ServiceItemHistory
             index={index === 0}
             siteProps={siteProps}
             color={reserwationColor}
           >
             <TimeReserwation siteProps={siteProps} color={reserwationColor}>
               {dateReserwation}
               <div className="statusReserwation">
                 {reserwation.reserwationId.visitCanceled
                   ? "Wizyta odwołana"
                   : reserwation.reserwationId.visitNotFinished
                   ? "Wizyta nie odbyta"
                   : isFinishedDate
                   ? "Wizyta odbyta"
                   : "Wizyta oczekująca"}
               </div>
             </TimeReserwation>
             {reserwation.reserwationId.serviceName} -{" "}
             {`${workerName} ${workerSurname}`}
           </ServiceItemHistory>
         </div>
       )
     }
   )

   let userName = "Brak użytkownika"
   let userSurname = ""
   if (!!userInfo.userId) {
     userName = Buffer.from(userInfo.userId.name, "base64").toString("ascii")
     userSurname = Buffer.from(userInfo.userId.surname, "base64").toString(
       "ascii"
     )
   }

   return (
     <CategoryItemStyle>
       <TitleCategory
         clickAdd={clickAdd || clickBlock || clickHistory || clickPhone}
         siteProps={siteProps}
         onClick={handleClickCollapse}
         isBlocked={!!userInfo.isBlocked}
       >
         {userName} {userSurname}
         <ReserwationsCountStyle>
           Liczba rezerwacji: {userInfo.reserwationsCount}
         </ReserwationsCountStyle>
         <IconCollapse collapseActive={userCollapseActive} right="0px">
           <MdExpandMore />
         </IconCollapse>
         <IconPosition
           right="58px"
           data-tip
           data-for={
             !!userInfo.isBlocked
               ? `blocked${userInfo._id}`
               : `noBlocked${userInfo._id}`
           }
           onClick={handleClickBlock}
         >
           <MdBlock />
         </IconPosition>
         <IconPosition
           onClick={handleClickAdd}
           data-tip
           data-for="addItemUserInfo"
           right="116px"
         >
           <MdLibraryAdd />
         </IconPosition>
         <IconPosition
           onClick={handleClickHistory}
           data-tip
           data-for="historyItemUserInfo"
           right="174px"
         >
           <MdHistory />
         </IconPosition>
         <IconPosition
           data-tip
           data-for="phoneItemUserInfo"
           right="232px"
           onClick={handleClickPhone}
         >
           <MdPhone />
         </IconPosition>
         <CSSTransition
           in={clickAdd}
           timeout={400}
           classNames="popup"
           unmountOnExit
         >
           <BackgroundEdit onClick={handleCancelAdd}>
             <BackgroundEditContent
               onClick={handleClickContent}
               siteProps={siteProps}
             >
               <TitleEditContent siteProps={siteProps}>
                 Nowa wiadomość o kliencie
               </TitleEditContent>
               <BackgroundEditContentPadding>
                 <form onSubmit={handleAddMessage}>
                   <InputIcon
                     icon={<MdMessage />}
                     placeholder="Wiadomość"
                     value={newMessage}
                     type="text"
                     onChange={handleChangeMessage}
                     required
                   />
                   <ButtonsAddPosition>
                     <ButtonMargin>
                       <ButtonIcon
                         title="Anuluj"
                         uppercase
                         fontIconSize="40"
                         fontSize="13"
                         icon={<MdArrowBack />}
                         onClick={handleCancelAdd}
                         customColorButton={Colors(siteProps).dangerColorDark}
                         customColorIcon={Colors(siteProps).dangerColor}
                       />
                     </ButtonMargin>
                     <ButtonMarginSubmit type="submit">
                       <ButtonIcon
                         title="Dodaj"
                         uppercase
                         fontIconSize="20"
                         fontSize="15"
                         icon={<MdAddBox />}
                         customColorButton={Colors(siteProps).successColorDark}
                         customColorIcon={Colors(siteProps).successColor}
                       />
                     </ButtonMarginSubmit>
                   </ButtonsAddPosition>
                 </form>
               </BackgroundEditContentPadding>
             </BackgroundEditContent>
           </BackgroundEdit>
         </CSSTransition>
         <CSSTransition
           in={clickBlock}
           timeout={400}
           classNames="popup"
           unmountOnExit
         >
           <BackgroundEdit onClick={handleClickBlock}>
             <BackgroundEditContent
               onClick={handleClickContent}
               siteProps={siteProps}
             >
               <TitleEditContent siteProps={siteProps}>
                 Blokuj użytkownika
               </TitleEditContent>
               <BackgroundEditContentPadding>
                 <ButtonsAddPosition>
                   <ButtonMargin>
                     <ButtonIcon
                       title="Anuluj"
                       uppercase
                       fontIconSize="40"
                       fontSize="15"
                       icon={<MdArrowBack />}
                       onClick={handleClickBlock}
                       customColorButton={Colors(siteProps).successColorDark}
                       customColorIcon={Colors(siteProps).successColor}
                     />
                   </ButtonMargin>
                   <ButtonMargin>
                     <ButtonIcon
                       title={!!userInfo.isBlocked ? "Odblokuj" : "Blokuj"}
                       uppercase
                       fontIconSize="40"
                       fontSize="15"
                       icon={<MdAddBox />}
                       customColorButton={Colors(siteProps).dangerColorDark}
                       customColorIcon={Colors(siteProps).dangerColor}
                       onClick={handleConfirmBlockUser}
                     />
                   </ButtonMargin>
                 </ButtonsAddPosition>
               </BackgroundEditContentPadding>
             </BackgroundEditContent>
           </BackgroundEdit>
         </CSSTransition>
         <CSSTransition
           in={clickPhone}
           timeout={400}
           classNames="popup"
           unmountOnExit
         >
           <BackgroundEdit onClick={handleClickPhone}>
             <BackgroundEditContent
               onClick={handleClickContent}
               siteProps={siteProps}
             >
               <TitleEditContent siteProps={siteProps}>
                 Numer klienta
               </TitleEditContent>
               <PhoneNumberContent>
                 <PaddingTopPhone>Numer telefonu: </PaddingTopPhone>
                 {userInfo.numberPhone ? (
                   userInfo.numberPhone
                 ) : (
                   <ButtonStylePhone>
                     <ButtonIcon
                       title="Zobacz numer"
                       uppercase
                       fontIconSize="40"
                       fontSize="15"
                       icon={<MdPhone />}
                       onClick={handleFetchPhoneNumber}
                       customColorButton={Colors(siteProps).successColorDark}
                       customColorIcon={Colors(siteProps).successColor}
                     />
                   </ButtonStylePhone>
                 )}
               </PhoneNumberContent>
               <BackgroundEditContentPadding>
                 <ButtonsAddPosition>
                   <ButtonMargin>
                     <ButtonIcon
                       title="Wróc"
                       uppercase
                       fontIconSize="40"
                       fontSize="15"
                       icon={<MdArrowBack />}
                       onClick={handleClickPhone}
                       customColorButton={Colors(siteProps).dangerColorDark}
                       customColorIcon={Colors(siteProps).dangerColor}
                     />
                   </ButtonMargin>
                 </ButtonsAddPosition>
               </BackgroundEditContentPadding>
             </BackgroundEditContent>
           </BackgroundEdit>
         </CSSTransition>
         <CSSTransition
           in={clickHistory}
           timeout={400}
           classNames="popup"
           unmountOnExit
         >
           <BackgroundEdit onClick={handleClickHistory}>
             <BackgroundEditContent
               onClick={handleClickContent}
               siteProps={siteProps}
             >
               <TitleEditContent siteProps={siteProps}>
                 Historia rezerwacji
               </TitleEditContent>
               <BackgroundEditContentPadding>
                 <HeightContentHistory
                   ref={refAllHistory}
                   onScroll={handleScrollContainer}
                 >
                   {mapedUserReserwations}
                 </HeightContentHistory>
                 <ButtonsAddPosition>
                   <ButtonMargin>
                     <ButtonIcon
                       title="Wróć"
                       uppercase
                       fontIconSize="40"
                       fontSize="15"
                       icon={<MdArrowBack />}
                       customColorButton={Colors(siteProps).dangerColorDark}
                       customColorIcon={Colors(siteProps).dangerColor}
                       onClick={handleClickHistory}
                     />
                   </ButtonMargin>
                 </ButtonsAddPosition>
               </BackgroundEditContentPadding>
             </BackgroundEditContent>
           </BackgroundEdit>
         </CSSTransition>
       </TitleCategory>
       <Collapse isOpened={userCollapseActive}>
         {mapInformations.length > 0 ? (
           <>
             <HeightContentMessages
               onScroll={handleScrollContainerMessages}
               ref={refAllMessages}
             >
               {mapInformations}
             </HeightContentMessages>
             <ReactTooltip
               id={`deleteMessage${userInfo._id}`}
               effect="float"
               multiline={true}
             >
               <span>Usuń wiadomość</span>
             </ReactTooltip>
           </>
         ) : (
           <HeightContentMessagesOther>
             <ServiceItem siteProps={siteProps} index={true}>
               Brak informacji
             </ServiceItem>
           </HeightContentMessagesOther>
         )}
       </Collapse>
       {!!userInfo.isBlocked ? (
         <ReactTooltip
           id={`blocked${userInfo._id}`}
           effect="float"
           multiline={true}
         >
           <span>Odblokuj użytkownika</span>
         </ReactTooltip>
       ) : (
         <ReactTooltip
           id={`noBlocked${userInfo._id}`}
           effect="float"
           multiline={true}
         >
           <span>Blokuj użytkownika</span>
         </ReactTooltip>
       )}
     </CategoryItemStyle>
   )
 }
export default WorkerUsersInformationItem