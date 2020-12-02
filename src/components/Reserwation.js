import React, { useState, useEffect } from "react"
import { Colors } from "../common/Colors"
import styled from "styled-components"
import SelectDataCalendar from "./SelectDataCalendar"
import { MdClose } from "react-icons/md"
import {
  fetchDoReserwation,
  fetchWorkerDisabledHours,
  avaibleDateToReserwation,
} from "../state/actions"
import { useDispatch, useSelector } from "react-redux"
import { FaUser } from "react-icons/fa"
import { CSSTransition } from "react-transition-group"
import ButtonIcon from "../components/ButtonIcon"
import { FaCalendarDay, FaCalendarCheck } from "react-icons/fa"
import { getMonthAndReturn } from "../common/Functions"
import { CgSpinner } from "react-icons/cg"
import HoursItemReserwation from "./HoursItemReserwation"

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
  border-radius: 5px;
  max-width: 90vw;
  width: 800px;
  padding-top: 60px;
  overflow: hidden;
`

const PaddingContent = styled.div`
  padding: 10px;
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
  color: ${props =>
    props.active
      ? Colors(props.colorBlind).textNormalWhite
      : Colors(props.colorBlind).textNormalBlack};
`

const WorkerNameStyle = styled.div`
  color: ${props =>
    props.active
      ? Colors(props.colorBlind).textNormalWhite
      : Colors(props.colorBlind).textNormalBlack};
`

const ButtonIconStyle = styled.div`
  display: inline-block;
`

const SpinnerToLoadAvaibleHours = styled.div`
  height: 34px;
  width: 32px;
  font-size: 2rem;
  color: ${props => Colors(props.colorBlind).primaryColor};
  animation-name: spinner;
  animation-duration: 0.9s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  margin-bottom: 10px;
`

const NoAvaibleHourStyle = styled.div`
  margin-bottom: 10px;
  color: ${props => Colors(props.colorBlind).textNormalBlack};
`

const AllAvaibleHours = styled.div`
  max-height: 300px;
  width: 100%;
  overflow-y: auto;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
`

const Reserwation = ({
  handleCloseReserwation,
  reserwationEnable,
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
  const [selectedHour, setSelectedHour] = useState(null)
  const [selectedWorkerUserId, setSelectedWorkerUserId] = useState(null)
  const [isDataActive, setIsDataActive] = useState(false)
  const [isOtherActive, setIsOtherActive] = useState(true)
  const [selectedDate, setSelectedDate] = useState(null)
  const user = useSelector(state => state.user)
  const avaibleHoursReserwation = useSelector(
    state => state.avaibleHoursReserwation
  )
  const avaibleHoursReserwationUpdate = useSelector(
    state => state.avaibleHoursReserwationUpdate
  )
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
          selectedYear,
          reserwationData.time
        )
      )
    }
  }, [selectedDate, selectedWorkerUserId])

  useEffect(() => {
    if (!!!reserwationEnable) {
      setTimeout(() => {
        setSelectedHour(null)
        setSelectedWorkerUserId(null)
        setIsDataActive(null)
        setIsOtherActive(null)
        setSelectedDate(null)
        dispatch(avaibleDateToReserwation([]))
      }, 400)
    }
  }, [reserwationEnable])

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
          selectedHour, //dateStart
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
        dispatch(avaibleDateToReserwation([]))
      } else {
        setSelectedWorkerUserId(workerUserId)
      }
    } else {
      setSelectedWorkerUserId(workerUserId)
    }
  }

  const handleClickDateToReserw = clickedHour => {
    if (!!selectedHour) {
      if (selectedHour === clickedHour) {
        setSelectedHour(null)
      } else {
        setSelectedHour(clickedHour)
      }
    } else {
      setSelectedHour(clickedHour)
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
        <WorkerNameStyle active={ownerIsSelected} colorBlind={colorBlind}>
          {reserwationData.ownerData.name} {reserwationData.ownerData.surname}
        </WorkerNameStyle>
        <WorkerSpecializationStyle
          colorBlind={colorBlind}
          active={ownerIsSelected}
        >
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
        <WorkerNameStyle colorBlind={colorBlind} active={workerIsSelected}>
          {worker.user.name} {worker.user.surname}
        </WorkerNameStyle>
        <WorkerSpecializationStyle
          colorBlind={colorBlind}
          active={workerIsSelected}
        >
          {worker.specialization}
        </WorkerSpecializationStyle>
      </WorkerItem>
    )
  })

  // const mapAvaibleHours = avaibleHoursReserwation.map((item, index) => {
  //   const isHourActive = selectedHour === item
  //   return (
  //     <DateReserwStyle
  //       colorBlind={colorBlind}
  //       onClick={() => handleClickDateToReserw(item)}
  //       active={isHourActive}
  //       key={index}
  //     >
  //       {item}
  //     </DateReserwStyle>
  //   )
  // })

  const renderAvaibleHours = avaibleHoursReserwationUpdate ? (
    <SpinnerToLoadAvaibleHours colorBlind={colorBlind}>
      <CgSpinner />
    </SpinnerToLoadAvaibleHours>
  ) : avaibleHoursReserwation.length > 0 ? (
    <AllAvaibleHours>
      <HoursItemReserwation
        colorBlind={colorBlind}
        maxHourToFilter={12}
        minHourToFilter={0}
        itemsHours={avaibleHoursReserwation}
        title="Rano:"
        handleClickDateToReserw={handleClickDateToReserw}
        selectedHour={selectedHour}
      />
      <HoursItemReserwation
        colorBlind={colorBlind}
        maxHourToFilter={18}
        minHourToFilter={12}
        itemsHours={avaibleHoursReserwation}
        title="Po południu:"
        handleClickDateToReserw={handleClickDateToReserw}
        selectedHour={selectedHour}
      />
      <HoursItemReserwation
        colorBlind={colorBlind}
        maxHourToFilter={24}
        minHourToFilter={18}
        itemsHours={avaibleHoursReserwation}
        title="Wieczorem:"
        handleClickDateToReserw={handleClickDateToReserw}
        selectedHour={selectedHour}
      />
    </AllAvaibleHours>
  ) : (
    <NoAvaibleHourStyle colorBlind={colorBlind}>
      {!!selectedWorkerUserId && !!selectedDate
        ? "Brak dostępnych godzin"
        : "Aby zobaczyć dostępne godziny, musisz wybrać pracownika oraz odpowiadający Tobie termin."}
    </NoAvaibleHourStyle>
  )

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

  const disabledReserwButton = !!selectedHour & !!selectedWorkerUserId

  return (
    <>
      <CSSTransition
        in={isOtherActive}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <ItemSummary colorBlind={colorBlind}>
          <PaddingContent>
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
                <ServiceParagraph>
                  {reserwationData.serviceText}
                </ServiceParagraph>
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
            {renderAvaibleHours}
            <ButtonIcon
              title="Rezerwuj"
              fontIconSize="20"
              fontSize="16"
              icon={<FaCalendarCheck />}
              onClick={handleDoReserwation}
              uppercase
              customColorButton={Colors(colorBlind).successColorDark}
              customColorIcon={Colors(colorBlind).successColor}
              disabled={!disabledReserwButton}
            />
            <ClosePopup
              onClick={handleCloseReserwation}
              colorBlind={colorBlind}
            >
              <MdClose />
            </ClosePopup>
          </PaddingContent>
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
