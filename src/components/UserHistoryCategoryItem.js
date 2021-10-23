import React, { useState, useEffect } from "react"
import styled from "styled-components"
import {
  MdDeleteForever,
  MdArrowBack,
  MdComment,
  MdSave,
  MdStar,
  MdEdit,
} from "react-icons/md"
import { Colors } from "@common/Colors"
import { ButtonIcon, Popup, InputIcon } from "@ui"
import { useDispatch } from "react-redux"
import {
  fetchAddOpinion,
  fetchUpdateEditedOpinion,
  addAlertItem,
} from "@state/actions"
import Reserwation from "./Reserwation"
import { Site } from "@common/Site"

const ServiceItem = styled.div`
  position: relative;
  background-color: ${props =>
    props.inToDo
      ? Colors(props.siteProps).secondColorLight
      : props.visitNotFinished
      ? Colors(props.siteProps).dangerLightColor
      : !props.isReserwationEnd
      ? Colors(props.siteProps).successColorLight
      : props.visitCanceled
      ? Colors(props.siteProps).dangerLightColor
      : props.visitChanged
      ? Colors(props.siteProps).secondColorLight
      : Colors(props.siteProps).companyItemBackground};
  padding: 10px;
  padding-right: 85px;
  border-radius: 5px;
  padding-bottom: ${props => (props.active ? "200px" : "10px")};
  border-top-left-radius: ${props => (props.index ? "0px" : "5px")};
  border-top-right-radius: ${props => (props.index ? "0px" : "5px")};
  margin: 5px 5px;
  margin-top: ${props => (props.index ? "0px" : "5px")};
  user-select: none;
  overflow: hidden;
  color: ${props => Colors(props.siteProps).textNormalBlack};
  transition-property: background-color, padding-bottom, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  .bold {
    font-family: "Poppins-Medium", sans-serif;
  }
`

const ArrowDeleteReserwation = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  padding: 5px;
  font-size: 1.8rem;
  cursor: pointer;
  background-color: ${props => Colors(props.siteProps).dangerColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition-property: background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    background-color: ${props => Colors(props.siteProps).dangerColorDark};
  }
`

const ArrowAddOpinionReserwation = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
  padding: 5px;
  font-size: 1.7rem;
  cursor: pointer;
  background-color: ${props => Colors(props.siteProps).dangerColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition-property: background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    background-color: ${props => Colors(props.siteProps).dangerColorDark};
  }
`

const ArrowEditReserwation = styled.div`
  position: absolute;
  right: 42px;
  top: 0px;
  padding: 5px;
  font-size: 1.7rem;
  cursor: pointer;
  background-color: ${props =>
    props.disabled
      ? Colors(props.siteProps).secondColor
      : Colors(props.siteProps).disabled};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  transition-property: background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    background-color: ${props =>
      props.disabled
        ? Colors(props.siteProps).secondDarkColor
        : Colors(props.siteProps).disabled};
  }
`

const TitleService = styled.div`
  font-size: 1.1rem;
  font-family: "Poppins-Bold", sans-serif;
`

const PriceService = styled.span`
  position: relative;
  display: inline-block;
  background-color: red;
  font-size: 0.8rem;
  padding: 2px 5px;
  font-family: "Poppins-Regular", sans-serif;
  color: white;
  margin-right: 10px;
  border-radius: 5px;
  background-color: ${props =>
    props.otherColor
      ? Colors(props.siteProps).darkColor
      : props.active
      ? Colors(props.siteProps).disabled
      : Colors(props.siteProps).primaryColorDark};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  transition-property: color, background-color;
  transition-duration: 0.3s;
  transition-timing-function: inline;
`

const StatusReserwation = styled.span`
  display: inline-block;
  border-radius: 5px;
  padding: 0px 5px;
  margin-top: 5px;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  background-color: ${props =>
    !!props.inToDo
      ? Colors(props.siteProps).secondColor
      : !!props.canceled
      ? Colors(props.siteProps).dangerColor
      : !!props.changed
      ? Colors(props.siteProps).secondColor
      : !!props.finished
      ? Colors(props.siteProps).successColor
      : Colors(props.siteProps).primaryColor};
`

const ButtonsAddPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ButtonsAddPositionOpinion = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const PriceContentService = styled.div`
  display: inline-block;
  @media all and (max-width: ${Site.mobileSize + "px"}) {
    display: block;
  }
`

const ButtonMargin = styled.div`
  margin: 5px;
`

const CrossPricePosition = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: ${props => (props.active ? "1" : "0")};
  transition-property: opacity;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const CrossPrice = styled.div`
  width: 120%;
  height: 2px;
  background-color: ${props => Colors(props.siteProps).dangerColor};
  transform: rotate(-20deg);
`

const StarsPositions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

  span {
    margin-right: 10px;
  }
`

const StarItem = styled.div`
  font-size: 1.4rem;
  margin-top: 4px;
  cursor: pointer;
  color: ${props =>
    props.active ? "#ffc107" : Colors(props.siteProps).disabled};

  transition-property: transform, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    transform: scale(1.4);
  }
`

const OpinionText = styled.div`
  position: relative;
  background-color: ${props => Colors(props.siteProps).backgroundColorPage};
  color: ${props => Colors(props.siteProps).textNormalBlack};
  padding: 10px 20px;
  padding-bottom: 10px;
  width: 100%;
  border-radius: 5px;

  .replayCompany {
    position: relative;
    margin-top: 10px;
    margin-left: 10px;
    margin-bottom: 5px;
    background-color: ${props => Colors(props.siteProps).companyItemBackground};
    color: ${props => Colors(props.siteProps).textNormalBlack};
    padding: 5px 10px;
    border-radius: 5px;
    margin-top: 40px;
  }

  .replayCompanyName {
    position: absolute;
    font-size: 0.9rem;
    color: ${props => Colors(props.siteProps).primaryColorDark};
    top: -20px;
    text-transform: uppercase;
  }
`

const OpinionTextReserwation = styled.div`
  margin-top: 20px;
  font-family: "Poppins-Bold", sans-serif;
  padding-left: 5px;
`

const EditedMessage = styled.div`
  margin-bottom: 10px;

  .editedSmallText {
    font-size: 0.85rem;
    color: ${props => Colors(props.siteProps).primaryColorDark};
  }
`

const TextInDelete = styled.div`
  color: ${props => Colors(props.siteProps).textNormalWhite};
`

const NoEditedMessage = styled.div`
  .editedSmallText {
    font-size: 0.85rem;
    color: ${props => Colors(props.siteProps).primaryColorDark};
  }
`

const UserHistoryCategoryItem = ({
  siteProps,
  item,
  index,
  handleDeleteReserwation,
  userToken,
  company,
  resetChangeReserwationUser,
  user,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [changeReserwation, setChangeReserwation] = useState(false)
  const [addOpinion, setAddOpinion] = useState(false)
  const [opinionText, setOpinionText] = useState("")
  const [opinionStars, setOpinionStars] = useState(5)
  const [editedOpinionText, setEditedOpinionText] = useState("")
  const [editedOpinion, setEditedOpinion] = useState(false)
  const [reserwationDataToChange, setReserwationDataToChange] = useState(null)

  useEffect(() => {
    setConfirmDelete(false)
    setAddOpinion(false)
    setOpinionText("")
    setEditedOpinion(false)
    let numberStars = 5
    let resetEditedOpinionText = ""
    if (!!item.opinionId) {
      numberStars = item.opinionId.opinionStars
      resetEditedOpinionText = !!item.opinionId.opinionMessage
        ? item.opinionId.opinionMessage
        : ""
    }
    setEditedOpinionText(resetEditedOpinionText)
    setOpinionStars(numberStars)
  }, [item.opinionId])

  useEffect(() => {
    setChangeReserwation(false)
  }, [resetChangeReserwationUser])

  const dispatch = useDispatch()

  const handleConfirmDeleteReserwation = () => {
    setConfirmDelete(prevState => !prevState)
  }

  const handleToDeleteReserwation = () => {
    setConfirmDelete(prevState => !prevState)
    handleDeleteReserwation(item._id)
  }

  const handleAddOpinion = () => {
    setAddOpinion(prevState => !prevState)
  }

  const handleResetAddOpinion = () => {
    setAddOpinion(false)
    setOpinionText("")
    setEditedOpinion(false)
    let numberStars = 5
    let resetEditedOpinionText = ""
    if (!!item.opinionId) {
      numberStars = item.opinionId.opinionStars
      resetEditedOpinionText = !!item.opinionId.opinionMessage
        ? item.opinionId.opinionMessage
        : ""
    }
    setEditedOpinionText(resetEditedOpinionText)
    setOpinionStars(numberStars)
  }

  const handleChangeTextOpinion = e => {
    setOpinionText(e.target.value)
  }

  const handleChangeEditOpinion = () => {
    setEditedOpinion(prevState => !prevState)
  }

  const handleChangeTextEditedOpinion = e => {
    setEditedOpinionText(e.target.value)
  }

  const handleClickStar = indexStar => {
    setOpinionStars(indexStar)
  }

  const handleUpdateOpinion = () => {
    if (!!item.company) {
      const opinionData = {
        opinionStars: opinionStars,
        opinionMessage: opinionText,
        company: item.company._id,
        reserwationId: item._id,
      }
      dispatch(fetchAddOpinion(userToken, opinionData, company))
    }
  }

  const handleUpdateEditedOpinion = () => {
    const opinionData = {
      opinionId: item.opinionId,
      opinionEditedMessage: editedOpinionText,
      company: item.company._id,
      reserwationId: item._id,
    }
    dispatch(fetchUpdateEditedOpinion(userToken, opinionData, company))
  }

  const handleChangeReserwation = () => {
    if (!changeReserwation) {
      if (!!item.company) {
        if (
          !!item.company.services &&
          !!item.company.owner._id &&
          !!item.company.workers &&
          !!item.company._id
        ) {
          const selectService = item.company.services.find(
            itemService => itemService._id === item.serviceId
          )
          if (!!selectService) {
            const mapWorkers = []
            item.company.workers.forEach(worker => {
              if (!!worker.user._id) {
                const unhashedName = Buffer.from(
                  worker.user.name,
                  "base64"
                ).toString("utf-8")
                const unhashedSurname = Buffer.from(
                  worker.user.surname,
                  "base64"
                ).toString("utf-8")
                mapWorkers.push({
                  servicesCategory: worker.servicesCategory,
                  specialization: worker.specialization,
                  user: {
                    name: unhashedName,
                    surname: unhashedSurname,
                    _id: worker.user._id,
                  },
                  _id: worker._id,
                  active: worker.active,
                })
              }
            })

            const unhashedOwnerName = Buffer.from(
              item.company.owner.name,
              "base64"
            ).toString("utf-8")

            const unhashedOwnerSurname = Buffer.from(
              item.company.owner.surname,
              "base64"
            ).toString("utf-8")

            const validMonthAdd = !!item.company.reservationMonthTime
              ? item.company.reservationMonthTime
              : 1
            const newItemChangeReserwation = {
              companyId: !!item.company._id ? item.company._id : null,
              companyStamps: !!item.company.companyStamps
                ? item.company.companyStamps
                : [],
              extraCost: selectService.extraCost,
              extraTime: selectService.extraTime,
              maxDate: new Date(new Date().setMonth(validMonthAdd)),
              ownerData: {
                name: unhashedOwnerName,
                ownerCategory: item.company.ownerData.servicesCategory,
                ownerId: item.company.owner._id,
                ownerImageUrl: !!item.company.owner.imageUrl
                  ? item.company.owner.imageUrl
                  : !!item.company.owner.imageOther
                  ? item.company.owner.imageOther
                  : "",
                specialization: item.company.ownerData.specialization,
                surname: unhashedOwnerSurname,
              },
              serviceCategory: selectService.serviceCategory,
              serviceColor: selectService.serviceColor,
              serviceCost: selectService.serviceCost,
              serviceId: selectService._id,
              serviceName: selectService.serviceName,
              serviceText: selectService.serviceText,
              time: selectService.time,
              workers: mapWorkers,
              _id: selectService._id,
            }
            setReserwationDataToChange(newItemChangeReserwation)
            setChangeReserwation(true)
          } else {
            dispatch(addAlertItem("Nie można edytować tej usługi.", "red"))
          }
        }
      }
    }
  }

  const handleCloseChangeReserwation = () => {
    setChangeReserwation(false)
  }

  let timeService = ""
  if (Number(item.time) <= 60) {
    timeService = `${item.timeReserwation}min`
  } else {
    const numberTime = Number(item.timeReserwation)
    const numberOfHours = Math.floor(numberTime / 60)
    if (Number(item.timeReserwation) % 60 === 0) {
      timeService = `${numberOfHours}h`
    } else {
      const numberOfMinutes = numberTime - numberOfHours * 60
      timeService = `${
        numberOfHours > 0 ? `${numberOfHours}h` : ""
      } ${numberOfMinutes}min`
    }
  }

  const splitDateReserwation = item.dateStart.split(":")
  const splitDateReserwationEnd = item.dateEnd.split(":")
  const dateReserwation = new Date(
    item.dateYear,
    item.dateMonth - 1,
    item.dateDay,
    Number(splitDateReserwation[0]),
    Number(splitDateReserwation[1]),
    0
  )
  const dateReserwationEnd = new Date(
    item.dateYear,
    item.dateMonth - 1,
    item.dateDay,
    Number(splitDateReserwationEnd[0]),
    Number(splitDateReserwationEnd[1])
  )
  const actualDate = new Date()
  const isReserwationEnd = actualDate < dateReserwation
  let isDateInToDo = false
  if (!!item.item) {
    isDateInToDo =
      dateReserwation <= new Date() &&
      dateReserwationEnd >= new Date() &&
      !!!item.item.visitCanceled
  }

  let workerName = " Konto nieaktywne"
  if (!!item.toWorkerUserId) {
    const userName = Buffer.from(item.toWorkerUserId.name, "base64").toString(
      "utf-8"
    )
    const userSurname = Buffer.from(
      item.toWorkerUserId.surname,
      "base64"
    ).toString("utf-8")
    workerName = ` ${userName} ${userSurname}`
  }

  const renderStars = [...Array(5)].map((_, index) => {
    const starActive = opinionStars >= index + 1
    return (
      <StarItem
        key={index}
        active={starActive}
        onClick={() => handleClickStar(index + 1)}
        siteProps={siteProps}
      >
        <MdStar />
      </StarItem>
    )
  })

  const historyItemHasActiveSomePromotion =
    !!item.activePromotion || item.activeHappyHour || item.activeStamp

  let serviceNotInCompany = false

  if (!!item.company) {
    if (!!item.company.services) {
      serviceNotInCompany = item.company.services.some(
        itemService => itemService._id === item.serviceId
      )
    }
  }

  return (
    <ServiceItem
      key={index}
      index={index === 0}
      siteProps={siteProps}
      isReserwationEnd={isReserwationEnd}
      visitCanceled={item.visitCanceled}
      visitNotFinished={item.visitNotFinished}
      visitChanged={item.visitChanged}
      inToDo={isDateInToDo}
      active={addOpinion}
    >
      <TitleService>
        {item.serviceName + " "}
        <PriceContentService>
          <PriceService
            siteProps={siteProps}
            active={historyItemHasActiveSomePromotion}
          >
            {`${!!item.basicPrice ? item.basicPrice : item.costReserwation}zł ${
              item.extraCost ? "+" : ""
            }`}
            <CrossPricePosition active={historyItemHasActiveSomePromotion}>
              <CrossPrice />
            </CrossPricePosition>
          </PriceService>
          {historyItemHasActiveSomePromotion && (
            <PriceService siteProps={siteProps}>
              {`${item.costReserwation}zł ${item.extraCost ? "+" : ""}`}
            </PriceService>
          )}
          <PriceService otherColor siteProps={siteProps}>
            {`${timeService} ${item.extraTime ? "+" : ""}`}
          </PriceService>
        </PriceContentService>
      </TitleService>
      <div>
        Wykonawca usługi:
        <span className="bold">{workerName}</span>
      </div>
      <div>
        Data usługi:
        <span className="bold">{` ${
          item.dateDay < 10 ? `0${item.dateDay}` : item.dateDay
        }-${item.dateMonth < 10 ? `0${item.dateMonth}` : item.dateMonth}-${
          item.dateYear
        }`}</span>
      </div>
      <div>
        Godzina usługi:
        <span className="bold">{` ${item.dateStart}-${item.dateEnd}`}</span>
      </div>
      {!!item.reserwationMessage && (
        <div>
          Wiadomość: <span className="bold">{item.reserwationMessage}</span>
        </div>
      )}
      {!!historyItemHasActiveSomePromotion && (
        <div>
          Promocja:{" "}
          <span className="bold">
            {!!item.activePromotion
              ? "Promocja"
              : !!item.activeHappyHour
              ? "Happy hour"
              : !!item.activeStamp
              ? "Komplet pieczątek"
              : ""}
          </span>
        </div>
      )}
      <div>
        Status:{" "}
        {item.visitNotFinished ? (
          <StatusReserwation canceled siteProps={siteProps}>
            Wizyta nie zakończona
          </StatusReserwation>
        ) : isDateInToDo ? (
          <StatusReserwation inToDo siteProps={siteProps}>
            Wizyta w trakcie
          </StatusReserwation>
        ) : !isReserwationEnd ? (
          <StatusReserwation finished siteProps={siteProps}>
            Wizyta zakończona
          </StatusReserwation>
        ) : item.visitCanceled ? (
          <StatusReserwation canceled siteProps={siteProps}>
            Wizyta odwołana
          </StatusReserwation>
        ) : item.visitChanged ? (
          <StatusReserwation changed siteProps={siteProps}>
            Wizyta zmieniona
          </StatusReserwation>
        ) : (
          <StatusReserwation siteProps={siteProps}>
            Wizyta oczekująca
          </StatusReserwation>
        )}
      </div>
      {!!item.opinionId && (
        <>
          <OpinionTextReserwation>Wystawiona opinia:</OpinionTextReserwation>
          <OpinionText siteProps={siteProps}>
            <StarsPositions>
              <span>Ocena: </span>
              {renderStars}
            </StarsPositions>
            {!!item.opinionId.editedOpinionMessage && (
              <EditedMessage siteProps={siteProps}>
                <div className="editedSmallText">Edytowana opinia:</div>
                {item.opinionId.editedOpinionMessage}
              </EditedMessage>
            )}
            <NoEditedMessage siteProps={siteProps}>
              <div className="editedSmallText">Opinia:</div>
              {item.opinionId.opinionMessage}
            </NoEditedMessage>

            {!!item.opinionId.replayOpinionMessage && (
              <div className="replayCompany">
                <div className="replayCompanyName">
                  {!!company ? company.company.name : "Firma usunięta"}
                </div>
                {item.opinionId.replayOpinionMessage}
              </div>
            )}
          </OpinionText>
        </>
      )}
      {!!item.company &&
      !!isReserwationEnd &&
      !!!item.visitNotFinished &&
      !!!item.visitCanceled ? (
        <>
          <ArrowEditReserwation
            siteProps={siteProps}
            data-tip
            data-for="editReserwationTooltip"
            onClick={handleChangeReserwation}
            disabled={
              !!item.company.services &&
              !!item.company.owner._id &&
              !!item.company.workers &&
              !!item.company._id &&
              serviceNotInCompany
            }
          >
            <MdEdit />
          </ArrowEditReserwation>
          <Popup
            popupEnable={changeReserwation && !!reserwationDataToChange}
            position="fixed"
            handleClose={handleCloseChangeReserwation}
            title="Edytuj rezerwację"
            fullScreen
            lightBackground
          >
            <Reserwation
              reserwationData={reserwationDataToChange}
              reserwationEnable={changeReserwation}
              handleCloseReserwation={handleCloseChangeReserwation}
              isChangeReserwation={true}
              selectedReserwationId={item._id}
              user={user}
            />
          </Popup>
          <ArrowDeleteReserwation
            siteProps={siteProps}
            data-tip
            data-for="deleteReserwationTooltip"
            onClick={handleConfirmDeleteReserwation}
          >
            <MdDeleteForever />
          </ArrowDeleteReserwation>
          <Popup
            popupEnable={confirmDelete}
            position="absolute"
            borderRadius
            noContent
          >
            <>
              {!!item.activeStamp && (
                <TextInDelete siteProps={siteProps}>
                  Odwołanie tej rezerwacji z promocyjnych pieczątek nie zwroci
                  pieczątek na konto.
                </TextInDelete>
              )}
              <ButtonsAddPosition>
                <ButtonMargin>
                  <ButtonIcon
                    title="Anuluj"
                    uppercase
                    fontIconSize="20"
                    fontSize="15"
                    icon={<MdArrowBack />}
                    onClick={handleConfirmDeleteReserwation}
                    customColorButton={Colors(siteProps).successColorDark}
                    customColorIcon={Colors(siteProps).successColor}
                  />
                </ButtonMargin>
                <ButtonMargin>
                  <ButtonIcon
                    title="Odwołaj wizytę"
                    uppercase
                    fontIconSize="20"
                    fontSize="15"
                    icon={<MdDeleteForever />}
                    onClick={handleToDeleteReserwation}
                    customColorButton={Colors(siteProps).dangerColorDark}
                    customColorIcon={Colors(siteProps).dangerColor}
                  />
                </ButtonMargin>
              </ButtonsAddPosition>
            </>
          </Popup>
        </>
      ) : !!!item.opinionId && !!!item.visitCanceled && !!item.company ? (
        <>
          <ArrowAddOpinionReserwation
            siteProps={siteProps}
            data-tip
            data-for="addOpinionReserwationTooltip"
            onClick={handleAddOpinion}
          >
            <MdComment />
          </ArrowAddOpinionReserwation>
          <Popup
            popupEnable={addOpinion}
            position="absolute"
            title="Nowa opinia"
            borderRadius
            closeTitle={false}
            smallTitle
          >
            <StarsPositions>
              <span>Ocena: </span>
              {renderStars}
            </StarsPositions>
            <InputIcon
              icon={<MdComment />}
              placeholder="Opinia"
              value={opinionText}
              onChange={handleChangeTextOpinion}
              validText="Minimum 2 znaki"
            />
            <ButtonsAddPositionOpinion>
              <ButtonMargin>
                <ButtonIcon
                  title="Anuluj"
                  uppercase
                  fontIconSize="20"
                  fontSize="15"
                  icon={<MdArrowBack />}
                  onClick={handleResetAddOpinion}
                  customColorButton={Colors(siteProps).dangerColorDark}
                  customColorIcon={Colors(siteProps).dangerColor}
                />
              </ButtonMargin>
              <ButtonMargin>
                <ButtonIcon
                  title="Dodaj opinie"
                  uppercase
                  fontIconSize="20"
                  fontSize="15"
                  icon={<MdSave />}
                  onClick={handleUpdateOpinion}
                  customColorButton={Colors(siteProps).successColorDark}
                  customColorIcon={Colors(siteProps).successColor}
                  disabled={opinionText.length < 2}
                />
              </ButtonMargin>
            </ButtonsAddPositionOpinion>
          </Popup>
        </>
      ) : (
        !!item.opinionId &&
        !!!item.visitCanceled &&
        !!item.company &&
        !!!item.opinionId.editedOpinionMessage && (
          <>
            <ArrowAddOpinionReserwation
              siteProps={siteProps}
              data-tip
              data-for="editOpinionReserwationTooltip"
              onClick={handleChangeEditOpinion}
            >
              <MdEdit />
            </ArrowAddOpinionReserwation>
            <Popup
              popupEnable={editedOpinion && !!item.company._id}
              position="absolute"
              title="Edytuj opinie"
              borderRadius
              closeTitle={false}
              smallTitle
            >
              <InputIcon
                icon={<MdComment />}
                placeholder="Opinia"
                value={editedOpinionText}
                onChange={handleChangeTextEditedOpinion}
                validText="Minimum 2 znaki"
              />
              <ButtonsAddPositionOpinion>
                <ButtonMargin>
                  <ButtonIcon
                    title="Anuluj"
                    uppercase
                    fontIconSize="20"
                    fontSize="15"
                    icon={<MdArrowBack />}
                    onClick={handleResetAddOpinion}
                    customColorButton={Colors(siteProps).dangerColorDark}
                    customColorIcon={Colors(siteProps).dangerColor}
                  />
                </ButtonMargin>
                <ButtonMargin>
                  <ButtonIcon
                    title="Dodaj opinie"
                    uppercase
                    fontIconSize="20"
                    fontSize="15"
                    icon={<MdSave />}
                    onClick={handleUpdateEditedOpinion}
                    customColorButton={Colors(siteProps).successColorDark}
                    customColorIcon={Colors(siteProps).successColor}
                    disabled={
                      editedOpinionText.length < 2 ||
                      editedOpinionText === item.opinionId.opinionMessage
                    }
                  />
                </ButtonMargin>
              </ButtonsAddPositionOpinion>
            </Popup>
          </>
        )
      )}
    </ServiceItem>
  )
}
export default UserHistoryCategoryItem
