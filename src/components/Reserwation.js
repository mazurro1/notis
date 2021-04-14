import React, { useState, useEffect } from "react"
import { Colors } from "../common/Colors"
import styled from "styled-components"
import SelectDataCalendar from "./SelectDataCalendar"
import {
  fetchDoReserwation,
  fetchWorkerDisabledHours,
  avaibleDateToReserwation,
  fetchChangeReserwation,
} from "../state/actions"
import { useDispatch, useSelector } from "react-redux"
import { FaUser, FaStamp } from "react-icons/fa"
import ButtonIcon from "../components/ButtonIcon"
import { FaCalendarDay, FaCalendarCheck } from "react-icons/fa"
import { getMonthAndReturn } from "../common/Functions"
import { CgSpinner } from "react-icons/cg"
import HoursItemReserwation from "./HoursItemReserwation"
import InputIcon from "./InputIcon"
import { Site } from "../common/Site"
import ReactTooltip from "react-tooltip"
import { Checkbox } from "react-input-checkbox"
import Popup from "./Popup"

const TextCheckbox = styled.span`
  padding-left: 10px;
  font-family: "Poppins-Bold", sans-serif;
  user-select: none;
`

const CheckboxStyle = styled.div`
  margin-bottom: 30px;
  margin-top: 20px;

  .material-checkbox__input:checked + .material-checkbox__image {
    background-color: ${props => Colors(props.siteProps).primaryColor};
  }

  span {
    color: ${props => Colors(props.siteProps).textNormalBlack};
    border-color: ${props => Colors(props.siteProps).textNormalBlack};
  }
`

const ServiceItem = styled.div`
  position: relative;
  background-color: ${props => Colors(props.siteProps).companyItemBackground};
  color: ${props => Colors(props.siteProps).textNormalBlack};
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
  width: calc(100% - 55px);
`

const TitleService = styled.div`
  font-family: "Poppins-Bold", sans-serif;
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
  position: relative;
  background-color: red;
  display: inline-block;
  font-size: 0.8rem;
  padding: 2px 5px;
  font-family: "Poppins-Regular", sans-serif;
  margin-left: 10px;
  border-radius: 5px;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  overflow: hidden;
  background-color: ${props =>
    props.isCompanyEditProfil
      ? props.otherColor
        ? Colors(props.siteProps).darkColor
        : Colors(props.siteProps).secondDarkColor
      : props.otherColor
      ? Colors(props.siteProps).darkColor
      : props.active
      ? Colors(props.siteProps).disabled
      : Colors(props.siteProps).primaryColorDark};

  transition-property: background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const PositionPrice = styled.div`
  display: inline-block;

  @media all and (max-width: 990px) {
    display: block;
  }
`

const TextReserwation = styled.div`
  font-size: 1.2rem;
  margin-bottom: 5px;
  margin-top: 20px;
  color: ${props => Colors(props.siteProps).textNormalBlack};
  span {
    color: ${props => Colors(props.siteProps).primaryColor};
  }
`

const ContentWorkers = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`

const WorkerItem = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.active
      ? Colors(props.siteProps).primaryColor
      : Colors(props.siteProps).companyItemBackground};
  padding: 10px;
  border-radius: 5px;
  margin: 5px;
  margin-top: 0;
  cursor: pointer;
  color: ${props =>
    props.active ? "white" : Colors(props.siteProps).textNormalBlack};

  transition-property: transform, background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  user-select: none;

  svg {
    font-size: 2rem;
    color: ${props =>
      props.active ? "white" : Colors(props.siteProps).primaryColor};
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
      ? Colors(props.siteProps).textNormalWhite
      : Colors(props.siteProps).textNormalBlack};
`

const WorkerNameStyle = styled.div`
  color: ${props =>
    props.active
      ? Colors(props.siteProps).textNormalWhite
      : Colors(props.siteProps).textNormalBlack};
`

const ButtonIconStyle = styled.div`
  display: inline-block;
`

const SpinnerToLoadAvaibleHours = styled.div`
  height: 34px;
  width: 32px;
  font-size: 2rem;
  color: ${props => Colors(props.siteProps).primaryColor};
  animation-name: spinner;
  animation-duration: 0.9s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  margin-bottom: 10px;
`

const NoAvaibleHourStyle = styled.div`
  margin-bottom: 10px;
  color: ${props => Colors(props.siteProps).textNormalBlack};
  font-family: "Poppins-Bold";
`

const AllAvaibleHours = styled.div`
  max-height: 250px;
  width: 100%;
  overflow-y: auto;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
`

const NoWorkersText = styled.div`
  font-size: 1.1rem;
  margin-left: 10px;
  margin-top: 10px;
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

const BackGroundImageCustomUrl = styled.div`
  position: relative;
  height: 50px;
  width: 50px;
  border: 2px solid transparent;
  border-color: ${props => Colors(props.siteProps).primaryColor};
  background: url(${props => props.url}) 50% 0 no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1) inset;
  overflow: hidden;
`

const PositionStampsAndItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const IconStamp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;

  .bgStamp {
    color: ${props =>
      props.active
        ? Colors(props.siteProps).successColor
        : Colors(props.siteProps).dangerColor};
    padding: 10px;
    border: 2px dashed transparent;
    border-color: ${props =>
      props.active
        ? Colors(props.siteProps).successColor
        : Colors(props.siteProps).dangerColor};
    border-radius: 50%;
    font-size: 1.8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    transition-property: color, border-color;
    transition-duration: 0.3s;
    transition-timing-function: ease;
  }
`

const PositionWorkerDay = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
`

const MarginSelectWorker = styled.div`
  margin-right: 100px;

  @media all and (max-width: 767px) {
    margin-right: 10px;
  }
`

const MarginTextPhone = styled.div`
  margin: 10px 0;
`

const PositionRelative = styled.div`
  padding-bottom: 60px;
`

const PositionButtonRezerwation = styled.div`
  position: absolute;
  background-color: ${props => Colors(props.siteProps).backgroundColorPage};
  padding: 10px;
  bottom: 0;
  left: 0;
  right: 0;
  box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
`

const CheckBoxPositionRelative = styled.div`
  position: relative;
`

const Reserwation = ({
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
  isChangeReserwation = false,
  selectedReserwationId = null,
}) => {
  const [reserwationMessage, setReserwationMessage] = useState("")
  const [selectedHour, setSelectedHour] = useState(null)
  const [selectedPromotion, setSelectedPromotion] = useState(null)
  const [selectedWorkerUserId, setSelectedWorkerUserId] = useState(null)
  const [selectedWorkerId, setSelectedWorkerId] = useState(null)
  const [isDataActive, setIsDataActive] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [isStampActive, setIsStampActive] = useState(false)
  const [
    selectedHappyHourOrPromotion,
    setSelectedHappyHourOrPromotion,
  ] = useState(false)
  const user = useSelector(state => state.user)
  const avaibleHoursReserwation = useSelector(
    state => state.avaibleHoursReserwation
  )
  const avaibleHoursReserwationUpdate = useSelector(
    state => state.avaibleHoursReserwationUpdate
  )

  const siteProps = useSelector(state => state.siteProps)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!!selectedDate && !!selectedWorkerUserId && !!user.phoneVerified) {
      const selectedDay = selectedDate.getDate()
      const selectedMonth = selectedDate.getMonth() + 1
      const selectedYear = selectedDate.getFullYear()
      dispatch(
        fetchWorkerDisabledHours(
          user.token,
          reserwationData.companyId,
          selectedWorkerUserId,
          selectedWorkerId,
          selectedDay,
          selectedMonth,
          selectedYear,
          reserwationData.time,
          reserwationData._id
        )
      )
    }
  }, [selectedDate, selectedWorkerUserId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!!!reserwationEnable) {
      setTimeout(() => {
        setSelectedHour(null)
        setSelectedPromotion(null)
        setSelectedWorkerUserId(null)
        setSelectedWorkerId(null)
        setIsDataActive(null)
        setSelectedDate(null)
        dispatch(avaibleDateToReserwation([]))
        setIsStampActive(false)
        setIsStampActive(false)
        setSelectedHappyHourOrPromotion(false)
      }, 400)
    }
  }, [reserwationEnable]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelectDay = () => {
    setIsStampActive(false)
    setSelectedHour(null)
    setIsStampActive(false)
    setSelectedHappyHourOrPromotion(false)
    setSelectedPromotion(null)
    setIsDataActive(true)
  }

  const handleSelectWorker = (workerUserId, workerId) => {
    setIsStampActive(false)
    setSelectedPromotion(null)
    setSelectedHappyHourOrPromotion(false)
    dispatch(avaibleDateToReserwation([]))
    // setSelectedDate(null)
    setSelectedHour(null)
    if (!!selectedWorkerUserId) {
      if (selectedWorkerUserId === workerUserId) {
        setSelectedWorkerUserId(null)
        setSelectedWorkerId(null)
      } else {
        setSelectedWorkerUserId(workerUserId)
        setSelectedWorkerId(workerId)
      }
    } else {
      setSelectedWorkerUserId(workerUserId)
      setSelectedWorkerId(workerId)
    }
  }

  const handleClickDateToReserw = (clickedHour, clickedPromotion) => {
    setIsStampActive(false)
    if (clickedPromotion !== null) {
      setSelectedHappyHourOrPromotion(true)
    } else {
      setSelectedHappyHourOrPromotion(false)
    }
    if (!!selectedHour) {
      if (selectedHour === clickedHour) {
        setSelectedHour(null)
        setSelectedPromotion(null)
        setIsStampActive(false)
      } else {
        setSelectedHour(clickedHour)
        setSelectedPromotion(clickedPromotion)
        if (clickedPromotion !== null) {
          setIsStampActive(false)
          setSelectedHappyHourOrPromotion(true)
        }
      }
    } else {
      setSelectedHour(clickedHour)
      setSelectedPromotion(clickedPromotion)
    }
  }

  const handleReserwationMessage = e => {
    setReserwationMessage(e.target.value)
  }

  const handleChangeCheckbox = companyStampPromotionPercent => {
    if (!isStampActive) {
      setSelectedPromotion(companyStampPromotionPercent)
    } else {
      setSelectedPromotion(null)
    }
    setIsStampActive(prevState => !prevState)
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
    item => item === reserwationData._id
  )

  const ownerIsSelected = !!selectedWorkerUserId
    ? selectedWorkerUserId === reserwationData.ownerData.ownerId
    : false

  const ownerWorkerToSelect = ownerHasServiceCategory &&
    !!reserwationData.ownerData && (
      <WorkerItem
        onClick={() =>
          handleSelectWorker(
            reserwationData.ownerData.ownerId,
            reserwationData.ownerData.ownerId
          )
        }
        active={ownerIsSelected}
        siteProps={siteProps}
      >
        {!!reserwationData.ownerData.ownerImageUrl ? (
          <BackGroundImageCustomUrl
            url={
              reserwationData.ownerData.ownerImageUrl.includes("https://")
                ? reserwationData.ownerData.ownerImageUrl
                : `${Site.awsUrl}/${reserwationData.ownerData.ownerImageUrl}`
            }
          />
        ) : (
          <div>
            <FaUser />
          </div>
        )}
        <WorkerNameStyle active={ownerIsSelected} siteProps={siteProps}>
          {reserwationData.ownerData.name} {reserwationData.ownerData.surname}
        </WorkerNameStyle>
        <WorkerSpecializationStyle
          siteProps={siteProps}
          active={ownerIsSelected}
        >
          {reserwationData.ownerData.specialization}
        </WorkerSpecializationStyle>
      </WorkerItem>
    )

  const filterWorkers = reserwationData.workers.filter(item => {
    const workerHasServiceCategory = item.servicesCategory.some(
      item => item === reserwationData._id
    )
    return workerHasServiceCategory && !!item.active
  })

  const mapWorkersToSelect = filterWorkers.map((worker, index) => {
    const workerIsSelected = !!selectedWorkerUserId
      ? selectedWorkerId === worker._id
      : false
    return (
      <WorkerItem
        key={index}
        onClick={() => handleSelectWorker(worker.user._id, worker._id)}
        active={workerIsSelected}
        siteProps={siteProps}
      >
        {!!worker.user.imageUrl ? (
          <BackGroundImageCustomUrl
            url={
              worker.user.imageUrl.includes("https://")
                ? worker.user.imageUrl
                : `${Site.awsUrl}/${worker.user.imageUrl}`
            }
          />
        ) : (
          <div>
            <FaUser />
          </div>
        )}
        <WorkerNameStyle siteProps={siteProps} active={workerIsSelected}>
          {worker.user.name} {worker.user.surname}
        </WorkerNameStyle>
        <WorkerSpecializationStyle
          siteProps={siteProps}
          active={workerIsSelected}
        >
          {worker.specialization}
        </WorkerSpecializationStyle>
      </WorkerItem>
    )
  })

  const renderAvaibleHours = avaibleHoursReserwationUpdate ? (
    <SpinnerToLoadAvaibleHours siteProps={siteProps}>
      <CgSpinner />
    </SpinnerToLoadAvaibleHours>
  ) : avaibleHoursReserwation.length > 0 ? (
    <AllAvaibleHours>
      <HoursItemReserwation
        siteProps={siteProps}
        maxHourToFilter={12}
        minHourToFilter={0}
        itemsHours={avaibleHoursReserwation}
        title="Rano:"
        handleClickDateToReserw={handleClickDateToReserw}
        selectedHour={selectedHour}
      />
      <HoursItemReserwation
        siteProps={siteProps}
        maxHourToFilter={18}
        minHourToFilter={12}
        itemsHours={avaibleHoursReserwation}
        title="Po południu:"
        handleClickDateToReserw={handleClickDateToReserw}
        selectedHour={selectedHour}
      />
      <HoursItemReserwation
        siteProps={siteProps}
        maxHourToFilter={24}
        minHourToFilter={18}
        itemsHours={avaibleHoursReserwation}
        title="Wieczorem:"
        handleClickDateToReserw={handleClickDateToReserw}
        selectedHour={selectedHour}
      />
    </AllAvaibleHours>
  ) : (
    <NoAvaibleHourStyle siteProps={siteProps}>
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

  const disabledPhoneNumber = !!user.hasPhone ? false : true

  const accountNotVeryfied = !user.accountVerified

  const disabledReserwButton =
    !!selectedHour & !!selectedWorkerUserId &&
    !disabledPhoneNumber &&
    !accountNotVeryfied
  const priceInPromotion = selectedPromotion !== null
  const newPriceAfterPromotion = Math.floor(
    (Number(reserwationData.serviceCost) *
      (selectedPromotion !== null ? 100 - selectedPromotion : 100)) /
      100
  )

  const filterDisabledCompanyStamps = reserwationData.companyStamps.filter(
    itemStamp => itemStamp.disabled === false
  )

  filterDisabledCompanyStamps.sort((a, b) => {
    const firstItemToSort = a.countStampsToActive
    const secondItemToSort = b.countStampsToActive
    if (firstItemToSort < secondItemToSort) return -1
    if (firstItemToSort > secondItemToSort) return 1
    return 0
  })

  const stampSelected = filterDisabledCompanyStamps.find(stamp => {
    const isServiceInStamp = stamp.servicesId.some(
      serviceStamp => serviceStamp === reserwationData._id
    )
    return isServiceInStamp
  })

  let stampValid = false
  let numberOfActiveUserStamps = 0
  let countStampsToActive = 0
  let companyStampPromotionPercent = 0

  if (!!stampSelected) {
    if (!!!stampSelected.disabled) {
      stampValid = true
      companyStampPromotionPercent = stampSelected.promotionPercent
      countStampsToActive = stampSelected.countStampsToActive
      const selectedUserStamp = user.stamps.find(stampItem => {
        return stampItem.companyId._id === reserwationData.companyId
      })

      if (!!selectedUserStamp) {
        selectedUserStamp.reserwations.forEach(stampReserwation => {
          const splitDateEnd = stampReserwation.dateEnd.split(":")
          const reserwationStampDateEnd = new Date(
            stampReserwation.dateYear,
            stampReserwation.dateMonth - 1,
            stampReserwation.dateDay,
            Number(splitDateEnd[0]),
            Number(splitDateEnd[1])
          )
          if (
            !!!stampReserwation.visitCanceled &&
            reserwationStampDateEnd < new Date()
          ) {
            numberOfActiveUserStamps = numberOfActiveUserStamps + 1
          }
        })
      }
    }
  }

  const renderStampCheckbox = !!stampValid &&
    !selectedHappyHourOrPromotion &&
    disabledReserwButton && (
      <>
        <CheckBoxPositionRelative>
          <CheckboxStyle siteProps={siteProps}>
            <Checkbox
              theme="material-checkbox"
              value={isStampActive}
              onChange={() =>
                handleChangeCheckbox(companyStampPromotionPercent)
              }
            >
              <TextCheckbox>
                Aktywuj rabat z pieczątek {companyStampPromotionPercent}%
              </TextCheckbox>
            </Checkbox>
          </CheckboxStyle>
        </CheckBoxPositionRelative>
        {isStampActive && (
          <NoAvaibleHourStyle siteProps={siteProps}>
            Prosimy o rozważną rezerwacje, ponieważ odwołanie / zmiana
            rezerwacji z promocyjnych pieczątek nie zwroci pieczątek na konto.
          </NoAvaibleHourStyle>
        )}
      </>
    )

  const stampColorValid = stampValid && !!!selectedPromotion && !isStampActive
  const stempValidUserCanTakeStempRabat =
    stampValid &&
    countStampsToActive <= numberOfActiveUserStamps &&
    !!selectedDate &&
    avaibleHoursReserwation.length > 0

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [
    selectedHour,
    selectedWorkerUserId,
    selectedDate,
    avaibleHoursReserwation,
    avaibleHoursReserwationUpdate,
    user,
    stampColorValid,
    stampValid,
    reserwationEnable,
    reserwationData,
  ])

  const handleDoReserwation = () => {
    if (!!selectedDate && !!selectedWorkerUserId && !!user.phoneVerified) {
      const selectedDay = selectedDate.getDate()
      const selectedMonth = selectedDate.getMonth() + 1
      const selectedYear = selectedDate.getFullYear()
      const dateFullToSent = `${selectedDay}-${selectedMonth}-${selectedYear}`
      const validNumberUser = null

      if (!isChangeReserwation) {
        dispatch(
          fetchDoReserwation(
            user.token,
            reserwationData.companyId,
            selectedWorkerUserId, //workerUserId
            selectedWorkerId, //workerUserId
            selectedHour, //dateStart
            dateFullToSent, //dateFull
            reserwationMessage,
            reserwationData._id,
            validNumberUser,
            isStampActive,
            countStampsToActive
          )
        )
      } else if (!!selectedReserwationId) {
        dispatch(
          fetchChangeReserwation(
            user.token,
            reserwationData.companyId,
            selectedWorkerUserId, //workerUserId
            selectedWorkerId, //workerUserId
            selectedHour, //dateStart
            dateFullToSent, //dateFull
            reserwationMessage,
            reserwationData._id,
            validNumberUser,
            isStampActive,
            countStampsToActive,
            selectedReserwationId
          )
        )
      }
    }
  }
  return (
    <PositionRelative>
      <ReactTooltip id="stampTooltip" effect="float" multiline={true}>
        <span>
          {stampColorValid
            ? "Podczas tej rezerwacji zostanie dodana pieczatka"
            : "Pieczątka niedostępna w tej rezerwacji"}
        </span>
      </ReactTooltip>
      <PositionStampsAndItem>
        <ServiceItem siteProps={siteProps}>
          <LeftContent>
            <TitleService>
              {reserwationData.serviceName}
              <PositionPrice>
                <PriceService siteProps={siteProps} active={priceInPromotion}>
                  {`${reserwationData.serviceCost}zł ${
                    reserwationData.extraCost ? "+" : ""
                  }`}
                  <CrossPricePosition active={priceInPromotion}>
                    <CrossPrice />
                  </CrossPricePosition>
                </PriceService>
                {priceInPromotion && (
                  <PriceService siteProps={siteProps}>
                    {`${newPriceAfterPromotion}zł ${
                      reserwationData.extraCost ? "+" : ""
                    }`}
                  </PriceService>
                )}
                <PriceService otherColor siteProps={siteProps}>
                  {`${timeService} ${reserwationData.extraTime ? "+" : ""}`}
                </PriceService>
              </PositionPrice>
            </TitleService>
            <ServiceParagraph>{reserwationData.serviceText}</ServiceParagraph>
          </LeftContent>
        </ServiceItem>
        <IconStamp siteProps={siteProps} active={stampColorValid}>
          <div className="bgStamp" data-tip data-for="stampTooltip">
            <FaStamp />
          </div>
        </IconStamp>
      </PositionStampsAndItem>
      {!!!ownerHasServiceCategory && filterWorkers.length === 0 ? (
        <NoWorkersText>Brak dostępnych pracowników</NoWorkersText>
      ) : (
        <>
          <PositionWorkerDay>
            <MarginSelectWorker>
              <TextReserwation siteProps={siteProps}>
                Wybierz pracownika:
              </TextReserwation>
              <ContentWorkers>
                {ownerWorkerToSelect}
                {mapWorkersToSelect}
              </ContentWorkers>
            </MarginSelectWorker>
            <div>
              <TextReserwation siteProps={siteProps}>
                Wybierz dzień:
              </TextReserwation>
              <ButtonIconStyle>
                <ButtonIcon
                  title={
                    selectedDate
                      ? `${selectedDateMonth} ${
                          selectedDateDay < 10
                            ? `0${selectedDateDay}`
                            : selectedDateDay
                        }-${
                          selectedDateFullMonth < 10
                            ? `0${selectedDateFullMonth}`
                            : selectedDateFullMonth
                        }-${selectedDateYear}`
                      : "Wybierz dzień"
                  }
                  fontIconSize="20"
                  fontSize="16"
                  icon={<FaCalendarDay />}
                  onClick={handleSelectDay}
                  uppercase
                />
              </ButtonIconStyle>
            </div>
          </PositionWorkerDay>
          <TextReserwation siteProps={siteProps}>
            {!!!selectedHour
              ? "Wybierz godzinę:"
              : `Wybrano godzine: ${selectedHour}`}
          </TextReserwation>
          {renderAvaibleHours}
          {!!selectedDate && avaibleHoursReserwation.length > 0 && (
            <>
              <InputIcon
                placeholder="Wiadomość do rezerwacji (domyślnie)"
                inputActive={true}
                value={reserwationMessage}
                onChange={handleReserwationMessage}
              />
            </>
          )}
          {!!selectedDate &&
            avaibleHoursReserwation.length > 0 &&
            !user.hasPhone && (
              <MarginTextPhone>
                Uzupełnij numer telefonu aby dokonać rezerwacji
              </MarginTextPhone>
            )}
          {!!stempValidUserCanTakeStempRabat
            ? !!renderStampCheckbox
              ? renderStampCheckbox
              : null
            : null}
          <PositionButtonRezerwation
            siteProps={siteProps}
            data-tip
            data-for="reserwationAlert"
          >
            <ButtonIcon
              title="Rezerwuj"
              fontIconSize="20"
              fontSize="25"
              icon={<FaCalendarCheck />}
              onClick={handleDoReserwation}
              uppercase
              customColorButton={Colors(siteProps).successColorDark}
              customColorIcon={Colors(siteProps).successColor}
              disabled={!disabledReserwButton}
            />
          </PositionButtonRezerwation>
        </>
      )}
      <Popup popupEnable={isDataActive} noContent>
        <SelectDataCalendar
          setActualCalendarDate={setSelectedDate}
          setIsDataActive={setIsDataActive}
          maxDate={reserwationData.maxDate}
          activeData={selectedDate}
        />
      </Popup>
      {!disabledReserwButton && (
        <ReactTooltip id="reserwationAlert" effect="float" multiline={true}>
          <span>
            {disabledPhoneNumber
              ? "Wybierz pracownika oraz zaznacz godzine."
              : "Wybierz pracownika oraz zaznacz godzine."}
          </span>
        </ReactTooltip>
      )}
    </PositionRelative>
  )
}
export default Reserwation
