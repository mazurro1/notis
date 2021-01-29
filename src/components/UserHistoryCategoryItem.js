import React, { useState } from "react"
import styled from "styled-components"
import {
  MdDeleteForever,
  MdArrowBack,
  MdComment,
  MdSave,
  MdStar,
} from "react-icons/md"
import { Colors } from "../common/Colors"
import { CSSTransition } from "react-transition-group"
import ButtonIcon from "./ButtonIcon"
import InputIcon from './InputIcon'
import { useDispatch } from "react-redux"
import { fetchAddOpinion } from '../state/actions'

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
  background-color: transparent;
  padding: 10px;
  border-radius: 5px;
  max-height: 90%;
  color: black;
`

const BackgroundEditContentBg = styled.div`
  width: 90%;
  background-color: ${props => Colors(props.siteProps).companyItemBackground};
  border-radius: 5px;
  max-height: 90%;
  overflow: hidden;
`

const PaddingBackground = styled.div`
  padding: 10px;
`

const TitleAddOpnion = styled.div`
  position: relative;
  padding: 5px 10px;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  background-color: ${props => Colors(props.siteProps).primaryColorDark};
  margin-bottom: 10px;
  transition-property: background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

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
  font-weight: bold;
`

const PriceService = styled.span`
  position: relative;
  background-color: red;
  font-size: 0.8rem;
  padding: 2px 5px;
  font-weight: 500;
  color: white;
  margin-left: 10px;
  border-radius: 5px;
  background-color: ${props =>
    props.otherColor
      ? Colors(props.siteProps).darkColor
      : props.active ? Colors(props.siteProps).disabled : Colors(props.siteProps).primaryColorDark};

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
`

const StarItem = styled.div`
  font-size: 1.4rem;
  cursor: pointer;
  color: ${props =>
    props.active ? "#ffc107" : Colors(props.siteProps).disabled};
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
    setOpinionStars(5)
  }

  const handleChangeTextOpinion = e => {
    setOpinionText(e.target.value)
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
    dispatch(fetchAddOpinion(userToken, opinionData))
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
        <PriceService siteProps={siteProps} active={!!item.activePromotion}>
          {`${!!item.basicPrice ? item.basicPrice : item.costReserwation}zł ${
            item.extraCost ? "+" : ""
          }`}
          <CrossPricePosition active={!!item.activePromotion}>
            <CrossPrice />
          </CrossPricePosition>
        </PriceService>
        {!!item.activePromotion && (
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
        <b>{workerName}</b>
      </div>
      <div>
        Data usługi:
        <b>{` ${item.dateDay < 10 ? `0${item.dateDay}` : item.dateDay}-${
          item.dateMonth < 10 ? `0${item.dateMonth}` : item.dateMonth
        }-${item.dateYear}`}</b>
      </div>
      <div>
        Godzina usługi:<b>{` ${item.dateStart}-${item.dateEnd}`}</b>
      </div>
      {!!item.reserwationMessage && (
        <div>
          Wiadomość: <b>{item.reserwationMessage}</b>
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
          <CSSTransition
            in={confirmDelete}
            timeout={400}
            classNames="popup"
            unmountOnExit
          >
            <BackgroundEdit>
              <BackgroundEditContent>
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
              </BackgroundEditContent>
            </BackgroundEdit>
          </CSSTransition>
        </>
      ) : (
        !!!item.opinionId &&
        !!!item.visitCanceled && (
          <>
            <ArrowAddOpinionReserwation
              siteProps={siteProps}
              data-tip
              data-for="addOpinionReserwationTooltip"
              onClick={handleAddOpinion}
            >
              <MdComment />
            </ArrowAddOpinionReserwation>
            <CSSTransition
              in={addOpinion}
              timeout={400}
              classNames="popup"
              unmountOnExit
            >
              <BackgroundEdit>
                <BackgroundEditContentBg siteProps={siteProps}>
                  <TitleAddOpnion>Dodawanie opinii</TitleAddOpnion>
                  <PaddingBackground>
                    <StarsPositions>{renderStars}</StarsPositions>
                    <InputIcon
                      icon={<MdComment />}
                      placeholder="Opinia"
                      value={opinionText}
                      onChange={handleChangeTextOpinion}
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
                        />
                      </ButtonMargin>
                    </ButtonsAddPositionOpinion>
                  </PaddingBackground>
                </BackgroundEditContentBg>
              </BackgroundEdit>
            </CSSTransition>
          </>
        )
      )}
    </ServiceItem>
  )
}
export default UserHistoryCategoryItem
