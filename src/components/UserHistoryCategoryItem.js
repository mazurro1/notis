import React, { useState } from "react"
import styled from "styled-components"
import { MdDeleteForever, MdArrowBack } from "react-icons/md"
import { Colors } from "../common/Colors"
import { CSSTransition } from "react-transition-group"
import ButtonIcon from "./ButtonIcon"

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

const ServiceItem = styled.div`
  position: relative;
  background-color: ${props =>
    props.visitFinished
      ? Colors(props.colorBlind).successColorLight
      : !props.isReserwationEnd
      ? Colors(props.colorBlind).dangerLightColor
      : props.visitCanceled
      ? Colors(props.colorBlind).dangerLightColor
      : props.visitChanged
      ? Colors(props.colorBlind).secondColorLight
      : Colors(props.colorBlind).companyItemBackground};
  padding: 10px;
  padding-right: 50px;
  border-radius: 5px;
  border-top-left-radius: ${props => (props.index ? "0px" : "5px")};
  border-top-right-radius: ${props => (props.index ? "0px" : "5px")};
  margin: 5px 5px;
  margin-top: ${props => (props.index ? "0px" : "5px")};
  user-select: none;
  overflow: hidden;
  color: ${props => Colors(props.colorBlind).textNormalBlack};
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
  background-color: ${props => Colors(props.colorBlind).dangerColor};
  color: ${props => Colors(props.colorBlind).textNormalWhite};
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
    background-color: ${props => Colors(props.colorBlind).dangerColorDark};
  }
`

const TitleService = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
`

const PriceService = styled.span`
  background-color: red;
  font-size: 0.8rem;
  padding: 2px 5px;
  font-weight: 500;
  color: white;
  margin-left: 10px;
  border-radius: 5px;
  background-color: ${props =>
    props.otherColor
      ? Colors(props.colorBlind).darkColor
      : Colors(props.colorBlind).primaryColorDark};

  color: ${props => Colors(props.colorBlind).textNormalWhite};
  transition-property: color, background-color;
  transition-duration: 0.3s;
  transition-timing-function: inline;
`

const StatusReserwation = styled.span`
  border-radius: 5px;
  padding: 0px 5px;
  margin-top: 5px;
  color: ${props => Colors(props.colorBlind).textNormalWhite};
  background-color: ${props =>
    !!props.canceled
      ? Colors(props.colorBlind).dangerColor
      : !!props.changed
      ? Colors(props.colorBlind).secondColor
      : !!props.finished
      ? Colors(props.colorBlind).successColor
      : Colors(props.colorBlind).primaryColor};
`

const ButtonsAddPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const ButtonMargin = styled.div`
  margin: 5px;
`

const UserHistoryCategoryItem = ({
  colorBlind,
  item,
  index,
  handleDeleteReserwation,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false)
  const handleConfirmDeleteReserwation = () => {
    setConfirmDelete(prevState => !prevState)
  }
  const handleToDeleteReserwation = () => {
    setConfirmDelete(prevState => !prevState)
    handleDeleteReserwation(item._id)
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

  return (
    <ServiceItem
      key={index}
      index={index === 0}
      colorBlind={colorBlind}
      isReserwationEnd={isReserwationEnd}
      visitCanceled={item.visitCanceled}
      visitFinished={item.visitFinished}
      visitChanged={item.visitChanged}
    >
      <TitleService>
        {item.serviceName}
        <PriceService colorBlind={colorBlind}>
          {`${item.costReserwation}zł ${item.extraCost ? "+" : ""}`}
        </PriceService>
        <PriceService otherColor colorBlind={colorBlind}>
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
      <div>
        Status:{" "}
        {item.visitFinished ? (
          <StatusReserwation finished colorBlind={colorBlind}>
            Wizyta odbyta
          </StatusReserwation>
        ) : !isReserwationEnd ? (
          <StatusReserwation canceled colorBlind={colorBlind}>
            Wizyta nieodbyta
          </StatusReserwation>
        ) : item.visitCanceled ? (
          <StatusReserwation canceled colorBlind={colorBlind}>
            Wizyta odwołana
          </StatusReserwation>
        ) : item.visitChanged ? (
          <StatusReserwation changed colorBlind={colorBlind}>
            Wizyta zmieniona
          </StatusReserwation>
        ) : (
          <StatusReserwation colorBlind={colorBlind}>
            Wizyta oczekująca
          </StatusReserwation>
        )}
      </div>
      {!!isReserwationEnd && !!!item.visitFinished && !!!item.visitCanceled && (
        <>
          <ArrowDeleteReserwation
            colorBlind={colorBlind}
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
                      customColorButton={Colors(colorBlind).successColorDark}
                      customColorIcon={Colors(colorBlind).successColor}
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
                      customColorButton={Colors(colorBlind).dangerColorDark}
                      customColorIcon={Colors(colorBlind).dangerColor}
                    />
                  </ButtonMargin>
                </ButtonsAddPosition>
              </BackgroundEditContent>
            </BackgroundEdit>
          </CSSTransition>
        </>
      )}
    </ServiceItem>
  )
}
export default UserHistoryCategoryItem