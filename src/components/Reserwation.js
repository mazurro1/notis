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
import { FaUser, FaStamp } from "react-icons/fa"
import { CSSTransition } from "react-transition-group"
import ButtonIcon from "../components/ButtonIcon"
import { FaCalendarDay, FaCalendarCheck } from "react-icons/fa"
import { getMonthAndReturn } from "../common/Functions"
import { CgSpinner } from "react-icons/cg"
import HoursItemReserwation from "./HoursItemReserwation"
import InputIcon from "./InputIcon"
import { Site } from "../common/Site"
import ReactTooltip from "react-tooltip"
import { Checkbox } from "react-input-checkbox"

const TextCheckbox = styled.span`
  padding-left: 10px;
  font-weight: 600;
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
  position: relative;
  background-color: red;
  font-size: 0.8rem;
  padding: 2px 5px;
  font-weight: 500;
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

const ItemSummary = styled.div`
  background-color: ${props => Colors(props.siteProps).backgroundColorPage};
  position: relative;
  border-radius: 5px;
  max-width: 90vw;
  width: 800px;
  padding-top: 40px;
  overflow: hidden;
`

const PaddingContent = styled.div`
  padding: 10px;
`

const TextReserwation = styled.div`
  font-size: 1.2rem;
  margin-bottom: 5px;
  color: ${props => Colors(props.siteProps).textNormalBlack};
  span {
    color: ${props => Colors(props.siteProps).primaryColor};
  }
`

const SummaryReserwationText = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  font-size: 1.4rem;
  margin-bottom: 10px;
  background-color: ${props => Colors(props.siteProps).primaryColorDark};
  padding: 5px 10px;
  color: ${props => Colors(props.siteProps).textNormalWhite};
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
  color: ${props => Colors(props.siteProps).textNormalWhite};
  &:hover {
    color: ${props => Colors(props.siteProps).primaryColor};
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
  const [reserwationMessage, setReserwationMessage] = useState("")
  const [numberPhone, setNumberPhone] = useState("")
  const [selectedHour, setSelectedHour] = useState(null)
  const [selectedPromotion, setSelectedPromotion] = useState(null)
  const [selectedWorkerUserId, setSelectedWorkerUserId] = useState(null)
  const [selectedWorkerId, setSelectedWorkerId] = useState(null)
  const [isDataActive, setIsDataActive] = useState(false)
  const [isOtherActive, setIsOtherActive] = useState(true)
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
    if (!!selectedDate && !!selectedWorkerUserId) {
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
  }, [selectedDate, selectedWorkerUserId])

  useEffect(() => {
    if (!!!reserwationEnable) {
      setTimeout(() => {
        setSelectedHour(null)
        setSelectedPromotion(null)
        setSelectedWorkerUserId(null)
        setSelectedWorkerId(null)
        setIsDataActive(null)
        setIsOtherActive(true)
        setSelectedDate(null)
        dispatch(avaibleDateToReserwation([]))
        setIsStampActive(false)
        setIsStampActive(false)
        setSelectedHappyHourOrPromotion(false)
      }, 400)
    }
  }, [reserwationEnable])

  const handleSelectDay = () => {
    setIsStampActive(false)
    setIsOtherActive(false)
    setSelectedHour(null)
    setIsStampActive(false)
    setSelectedHappyHourOrPromotion(false)
    setSelectedPromotion(null)
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
      const validNumberUser = !!numberPhone ? numberPhone : null

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
          isStampActive
        )
      )
    }
  }

  const handleSelectWorker = (workerUserId, workerId) => {
    setIsStampActive(false)
    setSelectedPromotion(null)
    setSelectedHappyHourOrPromotion(false)
    if (!!selectedWorkerUserId) {
      if (selectedWorkerUserId === workerUserId) {
        setSelectedWorkerUserId(null)
        setSelectedWorkerId(null)
        setSelectedDate(null)
        setSelectedHour(null)
        dispatch(avaibleDateToReserwation([]))
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

  const handleChangeNumberPhone = e => {
    setNumberPhone(e.target.value)
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
            url={`${Site.awsUrl}/${reserwationData.ownerData.ownerImageUrl}`}
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
    return workerHasServiceCategory
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
            url={`${Site.awsUrl}/${worker.user.imageUrl}`}
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

  const disabledPhoneNumber = user.hasPhone
    ? false
    : numberPhone.length === 9
    ? false
    : true

  const disabledReserwButton =
    !!selectedHour & !!selectedWorkerUserId && !disabledPhoneNumber
  const priceInPromotion = selectedPromotion !== null
  const newPriceAfterPromotion = Math.floor(
    (Number(reserwationData.serviceCost) *
      (selectedPromotion !== null ? 100 - selectedPromotion : 100)) /
      100
  )

  const stampSelected = reserwationData.companyStamps.find(stamp => {
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
        return stampItem.companyId === reserwationData.companyId
      })

      if (!!selectedUserStamp) {
        selectedUserStamp.reserwations.forEach(stampReserwation => {
          const splitDateEnd = stampReserwation.dateEnd.split("")
          const reserwationStampDateEnd = new Date(
            stampReserwation.dateYear,
            stampReserwation.dateMonth,
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
      <CheckboxStyle siteProps={siteProps}>
        <Checkbox
          theme="material-checkbox"
          value={isStampActive}
          onChange={() => handleChangeCheckbox(companyStampPromotionPercent)}
        >
          <TextCheckbox>Aktywuj rabat z pieczątek</TextCheckbox>
        </Checkbox>
      </CheckboxStyle>
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
    numberPhone,
    selectedHour,
    selectedWorkerUserId,
    selectedDate,
    avaibleHoursReserwation,
    avaibleHoursReserwationUpdate,
    user,
    stampColorValid,
    stampValid,
  ])

  return (
    <>
      <CSSTransition
        in={isOtherActive}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <ItemSummary siteProps={siteProps}>
          <PaddingContent>
            <SummaryReserwationText siteProps={siteProps}>
              Rezerwacja
            </SummaryReserwationText>
            <IconStamp siteProps={siteProps} active={stampColorValid}>
              <div className="bgStamp" data-tip data-for="stampTooltip">
                <FaStamp />
              </div>
            </IconStamp>

            <ServiceItem siteProps={siteProps}>
              <LeftContent>
                <TitleService>
                  {reserwationData.serviceName}
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
                </TitleService>
                <ServiceParagraph>
                  {reserwationData.serviceText}
                </ServiceParagraph>
              </LeftContent>
            </ServiceItem>
            {!!!ownerHasServiceCategory && filterWorkers.length === 0 ? (
              <NoWorkersText>Brak dostępnych pracowników</NoWorkersText>
            ) : (
              <>
                <TextReserwation siteProps={siteProps}>
                  Wybierz pracownika:
                </TextReserwation>
                <ContentWorkers>
                  {ownerWorkerToSelect}
                  {mapWorkersToSelect}
                </ContentWorkers>
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
                    disabled={!!!selectedWorkerUserId}
                  />
                </ButtonIconStyle>
                <TextReserwation siteProps={siteProps}>
                  Wybierz godzinę:
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
                    <>
                      <InputIcon
                        placeholder="Numer telefonu"
                        inputActive={true}
                        type="number"
                        value={numberPhone}
                        onChange={handleChangeNumberPhone}
                      />
                    </>
                  )}
                {!!stempValidUserCanTakeStempRabat
                  ? !!renderStampCheckbox
                    ? renderStampCheckbox
                    : null
                  : null}
                <div data-tip data-for="reserwationAlert">
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
                </div>
              </>
            )}
            <ClosePopup onClick={handleCloseReserwation} siteProps={siteProps}>
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
            maxDate={reserwationData.maxDate}
          />
        </div>
      </CSSTransition>
      {!disabledReserwButton && (
        <ReactTooltip id="reserwationAlert" effect="float" multiline={true}>
          <span>
            {disabledPhoneNumber
              ? "Wybierz pracownika, zaznacz godzine oraz wpisz numer telefonu."
              : "Wybierz pracownika oraz zaznacz godzine"}
          </span>
        </ReactTooltip>
      )}
      <ReactTooltip id="stampTooltip" effect="float" multiline={true}>
        <span>
          {stampColorValid
            ? "Podczas rezerwacji zostanie dodana pieczatka"
            : "Pieczątka niedostępna w tej rezerwacji"}
        </span>
      </ReactTooltip>
    </>
  )
}
export default Reserwation
