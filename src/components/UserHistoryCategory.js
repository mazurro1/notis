import React, { useState } from "react"
import styled from "styled-components"
import { MdExpandMore } from "react-icons/md"
import { Collapse } from "react-collapse"
import { Colors } from "../common/Colors"

const TitleCategory = styled.div`
  position: relative;
  font-size: 1.25rem;
  color: ${props => Colors(props.colorBlind).textNormalWhite};
  background-color: ${props => Colors(props.colorBlind).primaryColor};
  padding: 10px;
  border-radius: 5px;
  padding-right: 50px;
  overflow: hidden;
  user-select: none;
  text-transform: uppercase;
  cursor: pointer;
  transition-property: padding-bottom, background-color, color;
  transition-duration: 0.5s;
  transition-timing-function: ease;
`

const IconArrowPosition = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 7px;
  padding-bottom: 0;
  font-size: 2rem;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  svg {
    transform: ${props =>
      props.collapseActive ? "rotate(-180deg)" : "rotate(0deg)"};
    transition-property: transform;
    transition-duration: 0.5s;
    transition-timing-function: ease;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const CategoryItemStyle = styled.div`
  margin-top: 5px;
`

const ServiceItem = styled.div`
  position: relative;
  background-color: ${props =>
    !props.isReserwationEnd
      ? Colors(props.colorBlind).dangerLightColor
      : props.visitCanceled
      ? Colors(props.colorBlind).dangerLightColor
      : props.visitFinished
      ? Colors(props.colorBlind).successColorLight
      : props.visitChanged
      ? Colors(props.colorBlind).secondColorLight
      : Colors(props.colorBlind).companyItemBackground};
  padding: 10px;
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

const UserHistoryCategory = ({ colorBlind, title, reserwations }) => {
  const [collapseActive, setCollapseActive] = useState(false)
  const handleClickArrow = () => {
    setCollapseActive(prevState => !prevState)
  }

  const servicesMap = reserwations.map((item, index) => {
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

    let workerName = "Konto nieaktywne"
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
          {!isReserwationEnd ? (
            <StatusReserwation canceled colorBlind={colorBlind}>
              Wizyta nieodbyta
            </StatusReserwation>
          ) : item.visitCanceled ? (
            <StatusReserwation canceled colorBlind={colorBlind}>
              Wizyta odwołana
            </StatusReserwation>
          ) : item.visitFinished ? (
            <StatusReserwation finished colorBlind={colorBlind}>
              Wizyta odbyta
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
      </ServiceItem>
    )
  })

  return (
    <CategoryItemStyle>
      <TitleCategory colorBlind={colorBlind} onClick={handleClickArrow}>
        {title}
        <IconArrowPosition
          onClick={handleClickArrow}
          collapseActive={collapseActive}
        >
          <MdExpandMore />
        </IconArrowPosition>
      </TitleCategory>
      <Collapse isOpened={collapseActive}>
        <div>{servicesMap}</div>
      </Collapse>
    </CategoryItemStyle>
  )
}
export default UserHistoryCategory
