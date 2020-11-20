import React, { useState, useEffect } from "react"
import { Colors } from "../common/Colors"
import styled from "styled-components"
import SelectDataCalendar from "./SelectDataCalendar"
import { MdClose } from "react-icons/md"
import { fetchDoReserwation, fetchWorkerDisabledHours } from "../state/actions"
import { useDispatch, useSelector } from "react-redux"
import { FaUser } from "react-icons/fa"
import { CSSTransition } from "react-transition-group"
import ButtonIcon from "../components/ButtonIcon"
import { FaCalendarDay } from "react-icons/fa"
import { getMonthAndReturn } from "../common/Functions"

const ServiceItem = styled.div`
  position: relative;
  background-color: ${props => Colors(props.colorBlind).companyItemBackground};
  color: ${props => Colors(props.colorBlind).textNormalBlack};
  padding: 10px;
  border-radius: 5px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin: 5px 5px;
  margin-top: 0px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  user-select: none;
  overflow: hidden;
  transition-property: background-color, padding-bottom;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const TitleService = styled.div`
  font-weight: bold;
  font-size: 1.1rem;
`

const ServiceParagraph = styled.p`
  margin: 0;
  padding: 0;
  font-size: 0.9rem;
`

const LeftContent = styled.div`
  width: 80%;
`

const PriceService = styled.span`
  background-color: red;
  font-size: 0.8rem;
  padding: 2px 5px;
  font-weight: 500;
  margin-left: 10px;
  border-radius: 5px;
  color: ${props => Colors(props.colorBlind).textNormalWhite};
  background-color: ${props =>
    props.isCompanyEditProfil
      ? props.otherColor
        ? Colors(props.colorBlind).darkColor
        : Colors(props.colorBlind).secondDarkColor
      : props.otherColor
      ? Colors(props.colorBlind).darkColor
      : Colors(props.colorBlind).primaryColorDark};
`

const ItemSummary = styled.div`
  background-color: ${props => Colors(props.colorBlind).backgroundColorPage};
  position: relative;
  padding: 10px;
  border-radius: 5px;
  max-width: 90vw;
  width: 600px;
  padding-top: 60px;
  overflow: hidden;
`

const TextReserwation = styled.div`
  font-size: 1.2rem;
  margin-bottom: 5px;
  color: ${props => Colors(props.colorBlind).textNormalBlack};
  span {
    color: ${props => Colors(props.colorBlind).primaryColor};
  }
`

const SummaryReserwationText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  font-size: 1.4rem;
  margin-bottom: 10px;
  background-color: ${props => Colors(props.colorBlind).primaryColorDark};
  padding: 5px 10px;
  color: ${props => Colors(props.colorBlind).textNormalWhite};
  padding-right: 30px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2) inset;
`

const ClosePopup = styled.div`
  position: absolute;
  top: 7px;
  right: 5px;
  cursor: pointer;
  font-size: 1.5rem;
  transition-property: color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  color: ${props => Colors(props.colorBlind).textNormalWhite};
  &:hover {
    color: ${props => Colors(props.colorBlind).primaryColor};
  }
`

const ContentWorkers = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

const WorkerItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.active
      ? Colors(props.colorBlind).primaryColor
      : Colors(props.colorBlind).companyItemBackground};
  padding: 10px;
  border-radius: 5px;
  margin: 5px;
  margin-top: 0;
  cursor: pointer;
  color: ${props =>
    props.active ? "white" : Colors(props.colorBlind).textNormalBlack};

  transition-property: transform, background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  user-select: none;

  svg {
    font-size: 2rem;
    color: ${props =>
      props.active ? "white" : Colors(props.colorBlind).primaryColor};
    transition-property: color;
    transition-duration: 0.3s;
    transition-timing-function: ease;
  }

  &:hover {
    transform: scale(0.9);
  }
`

const WorkerSpecializationStyle = styled.div`
  font-size: 0.8rem;
`

const ButtonIconStyle = styled.div`
  display: inline-block;
`

const Reserwation = ({
  handleCloseReserwation,
  reserwationData = {
    extraCost: false,
    extraTime: false,
    serviceCategory: "Brak kategorii",
    serviceCost: "0",
    serviceName: "Brak nazwy",
    serviceText: "Brak tekstu",
    time: 0,
    companyId: "",
    workers: [],
  },
}) => {
  const [selectedWorkerUserId, setSelectedWorkerUserId] = useState(null)
  const [isDataActive, setIsDataActive] = useState(false)
  const [isOtherActive, setIsOtherActive] = useState(true)
  const [selectedDate, setSelectedDate] = useState(null)
  const user = useSelector(state => state.user)
  const colorBlind = useSelector(state => state.colorBlind)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!!selectedDate && !!selectedWorkerUserId) {
      const selectedDay = selectedDate.getDate()
      const selectedMonth = selectedDate.getMonth() + 1
      const selectedYear = selectedDate.getFullYear()
      dispatch(
        fetchWorkerDisabledHours(
          user.token,
          reserwationData.companyId,
          selectedWorkerUserId,
          selectedDay,
          selectedMonth,
          selectedYear
        )
      )
    }
  }, [selectedDate, selectedWorkerUserId])

  const handleSelectDay = () => {
    setIsOtherActive(false)
    setTimeout(() => {
      setIsDataActive(true)
    }, 500)
  }

  const handleDoReserwation = () => {
    if (!!selectedDate && !!selectedWorkerUserId) {
      const selectedDay = selectedDate.getDate()
      const selectedMonth = selectedDate.getMonth() + 1
      const selectedYear = selectedDate.getFullYear()
      const dateFullToSent = `${selectedDay}-${selectedMonth}-${selectedYear}`
      dispatch(
        fetchDoReserwation(
          user.token,
          reserwationData.companyId,
          selectedWorkerUserId, //workerUserId
          "13:00", //dateStart
          dateFullToSent, //dateFull
          reserwationData.serviceCost,
          reserwationData.time,
          reserwationData.serviceName,
          reserwationData.extraCost,
          reserwationData.extraTime
        )
      )
    }
  }

  const handleSelectWorker = workerUserId => {
    if (!!selectedWorkerUserId) {
      if (selectedWorkerUserId === workerUserId) {
        setSelectedWorkerUserId(null)
        setSelectedDate(null)
      } else {
        setSelectedWorkerUserId(workerUserId)
      }
    } else {
      setSelectedWorkerUserId(workerUserId)
    }
  }

  let timeService = ""
  if (Number(reserwationData.time) <= 60) {
    timeService = `${reserwationData.time}min`
  } else {
    const numberTime = Number(reserwationData.time)
    const numberOfHours = Math.floor(numberTime / 60)
    if (Number(reserwationData.time) % 60 === 0) {
      timeService = `${numberOfHours}h`
    } else {
      const numberOfMinutes = numberTime - numberOfHours * 60
      timeService = `${numberOfHours}h ${numberOfMinutes}min`
    }
  }

  const ownerHasServiceCategory = reserwationData.ownerData.ownerCategory.some(
    item => item === reserwationData.serviceCategory
  )

  const ownerIsSelected = !!selectedWorkerUserId
    ? selectedWorkerUserId === reserwationData.ownerData.ownerId
    : false

  const ownerWorkerToSelect = ownerHasServiceCategory &&
    !!reserwationData.ownerData && (
      <WorkerItem
        onClick={() => handleSelectWorker(reserwationData.ownerData.ownerId)}
        active={ownerIsSelected}
        colorBlind={colorBlind}
      >
        <div>
          <FaUser />
        </div>
        <div>
          {reserwationData.ownerData.name} {reserwationData.ownerData.surname}
        </div>
        <WorkerSpecializationStyle>
          {reserwationData.ownerData.specialization}
        </WorkerSpecializationStyle>
      </WorkerItem>
    )

  const filterWorkers = reserwationData.workers.filter(item => {
    const workerHasServiceCategory = item.servicesCategory.some(
      item => item === reserwationData.serviceCategory
    )
    return workerHasServiceCategory
  })

  const mapWorkersToSelect = filterWorkers.map((worker, index) => {
    const workerIsSelected = !!selectedWorkerUserId
      ? selectedWorkerUserId === worker.user._id
      : false

    console.log(worker)

    return (
      <WorkerItem
        key={index}
        onClick={() => handleSelectWorker(worker.user._id)}
        active={workerIsSelected}
        colorBlind={colorBlind}
      >
        <div>
          <FaUser />
        </div>
        <div>
          {worker.user.name} {worker.user.surname}
        </div>
        <WorkerSpecializationStyle>
          {worker.specialization}
        </WorkerSpecializationStyle>
      </WorkerItem>
    )
  })

  let selectedDateDay = ""
  let selectedDateYear = ""
  let selectedDateFullMonth = ""
  let selectedDateMonth = ""

  if (!!selectedDate) {
    selectedDateDay = selectedDate.getDate()
    selectedDateMonth = getMonthAndReturn(selectedDate.getDay())
    selectedDateYear = selectedDate.getFullYear()
    selectedDateFullMonth = selectedDate.getMonth() + 1
  }

  return (
    <>
      <CSSTransition
        in={isOtherActive}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <ItemSummary colorBlind={colorBlind}>
          <SummaryReserwationText colorBlind={colorBlind}>
            Rezerwacja
          </SummaryReserwationText>
          <ServiceItem colorBlind={colorBlind}>
            <LeftContent>
              <TitleService>
                {reserwationData.serviceName}
                <PriceService colorBlind={colorBlind}>
                  {`${reserwationData.serviceCost}zł ${
                    reserwationData.extraCost ? "+" : ""
                  }`}
                </PriceService>
                <PriceService otherColor colorBlind={colorBlind}>
                  {`${timeService} ${reserwationData.extraTime ? "+" : ""}`}
                </PriceService>
              </TitleService>
              <ServiceParagraph>{reserwationData.serviceText}</ServiceParagraph>
            </LeftContent>
          </ServiceItem>
          <TextReserwation colorBlind={colorBlind}>
            Wybierz pracownika:
          </TextReserwation>
          <ContentWorkers>
            {ownerWorkerToSelect}
            {mapWorkersToSelect}
          </ContentWorkers>
          <TextReserwation colorBlind={colorBlind}>
            Wybierz dzień:
          </TextReserwation>

          <ButtonIconStyle>
            <ButtonIcon
              title={
                selectedDate
                  ? `${selectedDateMonth} ${selectedDateDay}-${selectedDateFullMonth}-${selectedDateYear}`
                  : "Wybierz dzień"
              }
              fontIconSize="20"
              fontSize="16"
              icon={<FaCalendarDay />}
              onClick={handleSelectDay}
              uppercase
              disabled={!!!selectedWorkerUserId}
            />
          </ButtonIconStyle>

          <TextReserwation colorBlind={colorBlind}>
            Wybierz godzinę:
          </TextReserwation>
          <button onClick={handleDoReserwation}>Rezerwuj</button>
          <ClosePopup onClick={handleCloseReserwation} colorBlind={colorBlind}>
            <MdClose />
          </ClosePopup>
        </ItemSummary>
      </CSSTransition>
      <CSSTransition
        in={isDataActive}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <div>
          <SelectDataCalendar
            setActualCalendarDate={setSelectedDate}
            setIsDataActive={setIsDataActive}
            setIsTimeActive={setIsOtherActive}
          />
        </div>
      </CSSTransition>
    </>
  )
}
export default Reserwation
