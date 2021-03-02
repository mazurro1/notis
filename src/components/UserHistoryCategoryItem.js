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
import { Colors } from "../common/Colors"
import ButtonIcon from "./ButtonIcon"
import InputIcon from "./InputIcon"
import { useDispatch } from "react-redux"
import { fetchAddOpinion, fetchUpdateEditedOpinion } from "../state/actions"
import Popup from "./Popup"

const ServiceItem = styled.div`
  position: relative;
  background-color: ${props =>
    props.visitNotFinished
      ? Colors(props.siteProps).dangerLightColor
      : !props.isReserwationEnd
      ? Colors(props.siteProps).successColorLight
      : props.visitCanceled
      ? Colors(props.siteProps).dangerLightColor
      : props.visitChanged
      ? Colors(props.siteProps).secondColorLight
      : Colors(props.siteProps).companyItemBackground};
  padding: 10px;
  padding-right: 50px;
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
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
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
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
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

const TitleService = styled.div`
  font-size: 1.1rem;
  font-family: "Poppins-Bold", sans-serif;
`

const PriceService = styled.span`
  position: relative;
  background-color: red;
  font-size: 0.8rem;
  padding: 2px 5px;
  font-family: "Poppins-Regular", sans-serif;
  color: white;
  margin-left: 10px;
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
  border-radius: 5px;
  padding: 0px 5px;
  margin-top: 5px;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  background-color: ${props =>
    !!props.canceled
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
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [addOpinion, setAddOpinion] = useState(false)
  const [opinionText, setOpinionText] = useState("")
  const [opinionStars, setOpinionStars] = useState(5)
  const [editedOpinionText, setEditedOpinionText] = useState("")
  const [editedOpinion, setEditedOpinion] = useState(false)

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
    const opinionData = {
      opinionStars: opinionStars,
      opinionMessage: opinionText,
      company: item.company._id,
      reserwationId: item._id,
    }
    dispatch(fetchAddOpinion(userToken, opinionData, company))
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
  const dateReserwation = new Date(
    item.dateYear,
    item.dateMonth - 1,
    item.dateDay,
    Number(splitDateReserwation[0]),
    Number(splitDateReserwation[1]),
    0
  )
  const actualDate = new Date()
  const isReserwationEnd = actualDate < dateReserwation

  let workerName = " Konto nieaktywne"
  if (!!item.toWorkerUserId) {
    const userName = Buffer.from(item.toWorkerUserId.name, "base64").toString(
      "ascii"
    )
    const userSurname = Buffer.from(
      item.toWorkerUserId.surname,
      "base64"
    ).toString("ascii")
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

  return (
    <ServiceItem
      key={index}
      index={index === 0}
      siteProps={siteProps}
      isReserwationEnd={isReserwationEnd}
      visitCanceled={item.visitCanceled}
      visitNotFinished={item.visitNotFinished}
      visitChanged={item.visitChanged}
      active={addOpinion}
    >
      <TitleService>
        {item.serviceName}
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
            Wizyta nieodbyta
          </StatusReserwation>
        ) : !isReserwationEnd ? (
          <StatusReserwation finished siteProps={siteProps}>
            Wizyta odbyta
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
                <div className="replayCompanyName">{company.company.name}</div>
                {item.opinionId.replayOpinionMessage}
              </div>
            )}
          </OpinionText>
        </>
      )}
      {!!isReserwationEnd &&
      !!!item.visitNotFinished &&
      !!!item.visitCanceled ? (
        <>
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
          </Popup>
        </>
      ) : !!!item.opinionId && !!!item.visitCanceled ? (
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
              popupEnable={editedOpinion}
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
