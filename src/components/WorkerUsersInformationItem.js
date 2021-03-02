import React, { useState, useEffect, useRef } from "react"
import styled from "styled-components"
import { Collapse } from "react-collapse"
import { Colors } from "../common/Colors"
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
import { FaLock, FaLockOpen } from "react-icons/fa"
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
  fetchUserInformations,
  fetchSelectedUserReserwations,
  addAlertItem,
} from "../state/actions"
import { useDispatch } from "react-redux"
import ReactTooltip from "react-tooltip"
import WorkerUsersInformationItemMessage from "./WorkerUsersInformationItemMessage"
import { Site } from "../common/Site"
import Popup from "./Popup"

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

  @media all and (max-width: 990px) {
    padding-top: 40px;
  }
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
  padding-bottom: ${props => (props.clickAdd ? "250px !important" : "20px")};
  overflow: hidden;
  user-select: none;
  transition-property: padding-bottom, background-color, color;
  transition-duration: 0.5s;
  transition-timing-function: ease;

  @media all and (max-width: ${Site.mobileSize + "px"}) {
    padding-bottom: 50px;
    padding-right: 60px;
  }
`

const IconPosition = styled.div`
  position: absolute;
  top: 0;
  right: ${props => props.right + "px"};
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

  @media all and (max-width: ${Site.mobileSize + "px"}) {
    top: auto;
    bottom: -5px;
    right: ${props => props.right - 58 + "px"};
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

const ButtonsAddPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
`

const ButtonMargin = styled.div`
  margin: 5px;
`

const ButtonMarginSubmit = styled.button`
  margin: 5px;
  border: none;
  background-color: transparent;
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

  @media all and (max-width: ${Site.mobileSize + "px"}) {
    position: relative;
    left: 0;
    bottom: 0;
  }
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
    font-family: "Poppins-Bold", sans-serif;
    color: ${props =>
      props.color === "green"
        ? Colors(props.siteProps).successColorDark
        : props.color === "red"
        ? Colors(props.siteProps).dangerColorDark
        : Colors(props.siteProps).primaryColorDark};
    margin-left: 10px;

    @media all and (max-width: 990px) {
      display: block;
      margin-left: 0px;
    }
  }
`

const PhoneNumberContent = styled.div`
  position: relative;
  padding: 10px;
  color: ${props => Colors(props.siteProps).textNormalBlack};
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

const WorkerUsersInformationItem = ({
  userInfo,
  siteProps,
  user,
  filterUsers,
}) => {
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
    setClickAdd(false)
    setClickBlock(false)
    setClickHistory(false)
    setClickPhone(false)
    setNewMessage("")
    setUserCollapseActive(false)
  }, [filterUsers])

  useEffect(() => {
    if (!!refAllHistory) {
      if (!!refAllHistory.current) {
        const indexLastChildren = refAllHistory.current.childNodes.length
        if (
          indexLastChildren > 0
          //  && indexLastChildren < userInfo.reserwationsCount
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
                userInfo.userId._id,
                pageHistory
              )
            )
          }
        }
      }
    }
  }, [refAllHistory, userInfo, scrollPosition]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!!refAllMessages) {
      if (!!refAllMessages.current) {
        const indexLastChildren = refAllMessages.current.childNodes.length
        if (indexLastChildren > 0) {
          const isLastPlaceVisible =
            refAllMessages.current.childNodes[indexLastChildren - 1]
              .className === "sal-animate"
          if (isLastPlaceVisible) {
            refAllMessages.current.childNodes[indexLastChildren - 1].className =
              "sal-animate active-update"
            setPageMessages(prevState => prevState + 1)
            dispatch(
              fetchworkerUsersMoreInformationsMessage(
                user.token,
                user.company._id,
                userInfo.userId._id,
                pageMessages
              )
            )
          }
        }
      }
    }
  }, [refAllMessages, userInfo, scrollPositionMessages]) // eslint-disable-line react-hooks/exhaustive-deps

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

    if (!userCollapseActive && !!!userInfo.firstUserInformationsFetch) {
      dispatch(
        fetchUserInformations(user.token, user.company._id, userInfo.userId._id)
      )
    }
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
    if (newMessage.length >= 2) {
      dispatch(
        fetchCompanyUsersInformationsMessage(
          user.token,
          user.company._id,
          userInfo.userId._id,
          newMessage
        )
      )
      setClickAdd(false)
      setNewMessage("")
    } else {
      dispatch(addAlertItem("Za krótka wiadomość o użytkowniku", "red"))
    }
  }

  const handleDeleteMessageFetch = messageId => {
    dispatch(
      fetchCompanyUsersInformationsDeleteMessage(
        user.token,
        user.company._id,
        userInfo.userId._id,
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
        userInfo.userId._id,
        !!!userInfo.isBlocked
      )
    )
  }

  const handleClickHistory = e => {
    e.stopPropagation()
    setClickHistory(prevState => !prevState)
    if (!clickHistory && !!!userInfo.reserwations) {
      dispatch(
        fetchSelectedUserReserwations(
          user.token,
          userInfo.userId._id,
          user.company._id
        )
      )
    }
  }

  const handleFetchPhoneNumber = () => {
    dispatch(
      fetchCustomUserPhone(user.token, userInfo.userId._id, user.company._id)
    )
  }
  let mapInformations = "Trwa ładowanie danych"
  if (!!userInfo.informations) {
    mapInformations = userInfo.informations.map((item, index) => {
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
  }
  let mapedUserReserwations = "Trwa ładowanie rezerwacji"
  if (!!userInfo.reserwations) {
    mapedUserReserwations = userInfo.reserwations.map((reserwation, index) => {
      const dateReserwation = (
        <>
          <span>{`${reserwation.dateStart}-${reserwation.dateEnd}`} </span>
          {`${
            reserwation.dateDay < 10
              ? `0${reserwation.dateDay}`
              : reserwation.dateDay
          }-${
            reserwation.dateMonth < 10
              ? `0${reserwation.dateMonth}`
              : reserwation.dateMonth
          }-${reserwation.dateYear}`}
        </>
      )

      const workerName = Buffer.from(
        reserwation.toWorkerUserId.name,
        "base64"
      ).toString("ascii")
      const workerSurname = Buffer.from(
        reserwation.toWorkerUserId.surname,
        "base64"
      ).toString("ascii")
      const splitReserwationDate = reserwation.dateStart.split(":")
      const isActualReserwation = new Date(
        reserwation.dateYear,
        reserwation.dateMonth - 1,
        reserwation.dateDay,
        Number(splitReserwationDate[0]),
        Number(splitReserwationDate[1])
      )
      const isFinishedDate = isActualReserwation <= new Date()
      const reserwationColor = reserwation.visitCanceled
        ? "red"
        : reserwation.visitNotFinished
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
                {reserwation.visitCanceled
                  ? "Wizyta odwołana"
                  : reserwation.visitNotFinished
                  ? "Wizyta nie odbyta"
                  : isFinishedDate
                  ? "Wizyta odbyta"
                  : "Wizyta oczekująca"}
              </div>
            </TimeReserwation>
            {reserwation.serviceName} - {`${workerName} ${workerSurname}`}
          </ServiceItemHistory>
        </div>
      )
    })
  }

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
        clickAdd={clickAdd || clickHistory || clickPhone}
        siteProps={siteProps}
        onClick={handleClickCollapse}
        isBlocked={!!userInfo.isBlocked}
      >
        {userName} {userSurname}
        <ReserwationsCountStyle>
          Liczba rezerwacji: {userInfo.reserwationsCount}
        </ReserwationsCountStyle>
        <IconCollapse collapseActive={userCollapseActive} right={0}>
          <MdExpandMore />
        </IconCollapse>
        <IconPosition
          right={58}
          data-tip
          data-for={
            !!userInfo.isBlocked
              ? `blocked${userInfo.userId._id}`
              : `noBlocked${userInfo.userId._id}`
          }
          onClick={handleClickBlock}
        >
          <MdBlock />
        </IconPosition>
        <IconPosition
          onClick={handleClickAdd}
          data-tip
          data-for="addItemUserInfo"
          right={116}
        >
          <MdLibraryAdd />
        </IconPosition>
        <IconPosition
          onClick={handleClickHistory}
          data-tip
          data-for="historyItemUserInfo"
          right={174}
        >
          <MdHistory />
        </IconPosition>
        <IconPosition
          data-tip
          data-for="phoneItemUserInfo"
          right={232}
          onClick={handleClickPhone}
        >
          <MdPhone />
        </IconPosition>
        <Popup
          popupEnable={clickAdd}
          position="absolute"
          title="Nowa wiadomość o kliencie"
          borderRadius
          closeTitle={false}
          smallTitle
        >
          <form onSubmit={handleAddMessage}>
            <InputIcon
              icon={<MdMessage />}
              placeholder="Wiadomość"
              value={newMessage}
              type="text"
              onChange={handleChangeMessage}
              required
              validText="Minimum 2 znaki"
            />
            <ButtonsAddPosition>
              <ButtonMargin>
                <ButtonIcon
                  title="Anuluj"
                  uppercase
                  fontIconSize="20"
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
                  fontSize="13"
                  icon={<MdAddBox />}
                  customColorButton={Colors(siteProps).successColorDark}
                  customColorIcon={Colors(siteProps).successColor}
                  disabled={newMessage.length < 2}
                />
              </ButtonMarginSubmit>
            </ButtonsAddPosition>
          </form>
        </Popup>
        <Popup
          popupEnable={clickBlock}
          position="absolute"
          borderRadius
          noContent
        >
          <ButtonsAddPosition>
            <ButtonMargin>
              <ButtonIcon
                title="Anuluj"
                uppercase
                fontIconSize="20"
                fontSize="13"
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
                fontIconSize="20"
                fontSize="13"
                icon={!!userInfo.isBlocked ? <FaLockOpen /> : <FaLock />}
                customColorButton={Colors(siteProps).dangerColorDark}
                customColorIcon={Colors(siteProps).dangerColor}
                onClick={handleConfirmBlockUser}
              />
            </ButtonMargin>
          </ButtonsAddPosition>
        </Popup>
        <Popup
          popupEnable={clickPhone}
          position="absolute"
          title="Numer klienta"
          borderRadius
          closeTitle={false}
          smallTitle
        >
          <PhoneNumberContent siteProps={siteProps}>
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
        </Popup>
        <Popup
          popupEnable={clickHistory}
          position="absolute"
          title="Historia rezerwacji"
          borderRadius
          closeTitle={false}
          smallTitle
        >
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
        </Popup>
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
              id={`deleteMessage${userInfo.userId._id}`}
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
          id={`blocked${userInfo.userId._id}`}
          effect="float"
          multiline={true}
        >
          <span>Odblokuj użytkownika</span>
        </ReactTooltip>
      ) : (
        <ReactTooltip
          id={`noBlocked${userInfo.userId._id}`}
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
