import React, { useEffect, useState } from "react"
import { CSSTransition } from "react-transition-group"
import { Checkbox } from "react-input-checkbox"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import ButtonIcon from "./ButtonIcon"
import { FaSave } from "react-icons/fa"
import {
  MdClose,
  MdInfo,
  MdTimelapse,
  MdAccountBox,
  MdEmail,
} from "react-icons/md"
import {
  getMonthNamePl,
  getMonthAndReturnFull,
  getMonthAndReturnEng,
} from "../common/Functions"
import Popup from "./Popup"
import InputIcon from "./InputIcon"
import TimePickerContent from "./TimePicker"
import SelectCreated from "./SelectCreated"
import InputPhone from "./InputPhone"
import {
  addAlertItem,
  fetchResetWorkerNewClientReserwation,
} from "../state/actions"
import { useSelector, useDispatch } from "react-redux"

const EventItemPosition = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`

const EventItemPositionContent = styled.div`
  position: relative;
  background-color: ${props => Colors(props.siteProps).companyItemBackground};
  width: 800px;
  max-width: 90%;
  max-height: 90%;
  border-radius: 5px;
`

const EventItemPositionContentPadding = styled.form`
  padding: 10px;
  overflow-y: auto;
  max-height: 70vh;
`

const ButtonsItemEvent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
`

const WidthTimePicker = styled.div`
  background-color: transparent;
  min-width: 280px;
  max-width: 90%;
`

const ButtonItemStyleButton = styled.button`
  margin-left: 10px;
  margin-top: 10px;
  border: none;
  outline: none;
  background-color: transparent;
`

const TitleItemName = styled.div`
  width: 100%;
  background-color: ${props => Colors(props.siteProps).primaryColor};
  padding: 2px 8px;
  font-size: 1.2rem;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  padding-right: 30px;
`

const CloseEditCreateMode = styled.div`
  position: absolute;
  height: 30px;
  top: 0px;
  right: 0px;
  padding: 5px;
  font-size: 1.2rem;
  overflow: hidden;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  cursor: pointer;
  border-top-right-radius: 5px;
  background-color: rgba(0, 0, 0, 0.1);
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`

const WarningStyle = styled.div`
  position: relative;
  background-color: #757575;
  padding: 5px 10px;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  padding-left: 50px;
  font-size: 0.8rem;
  margin: 1px;
`

const IconWarning = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 50px;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
`

const MarginBottomInputs = styled.div`
  margin-bottom: 20px;
`

const MarginTopSelect = styled.div`
  margin-top: 5px;
`

const ItemTitle = styled.div`
  font-size: 1.1rem;
  color: ${props => Colors(props.siteProps).textNormalBlack};
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  span {
    padding-left: 5px;
    color: ${props => Colors(props.siteProps).primaryColor};
  }
`

const ButtonItemStyleTime = styled.div`
  margin-left: 10px;
  border: none;
`

const PositionRelative = styled.div`
  position: relative;
`

const CheckboxStyle = styled.div`
  margin-bottom: 10px;

  .material-checkbox {
    padding-left: 15px;
  }

  .material-checkbox__input:checked + .material-checkbox__image {
    background-color: ${props => Colors(props.siteProps).primaryColor};
  }

  span {
    color: ${props => Colors(props.siteProps).textNormalBlack};
    border-color: ${props => Colors(props.siteProps).textNormalBlack};
  }
`

const TextCheckbox = styled.span`
  padding-left: 10px;
  font-family: "Poppins-Bold", sans-serif;
  user-select: none;
`

const CalendarWorkerReserwatinNewReserwation = ({
  siteProps,
  handleClosePopupEventItem,
  selectedEvent,
  screenOpen,
  itemCompanyHours,
  handleAddWorkerReserwation,
  companyItems,
  isAdmin,
  chooseEventMenu,
  user,
  setChooseEventMenu,
  setNewReserwationOpen,
}) => {
  const [reserwationMessage, setReserwationMessage] = useState("")
  const [openDateStart, setOpenDateStart] = useState(false)
  const [openDateEnd, setOpenDateEnd] = useState(false)
  const [newTimeStart, setNewTimeStart] = useState(null)
  const [newTimeEnd, setNewTimeEnd] = useState(null)
  const [dateStart, setDateStart] = useState(null)
  const [dateEnd, setDateEnd] = useState(null)
  const [selectedWorker, setSelectedWorker] = useState(null)
  const [selectedService, setSelectedService] = useState(null)
  const [isActiveUser, setIsActiveUser] = useState(true)
  const [phoneInput, setPhoneInput] = useState("")
  const [nameInput, setNameInput] = useState("")
  const [surnameInput, setSurnameInput] = useState("")
  const [emailInput, setEmailInput] = useState("")
  const [activePromotion, setActivePromotion] = useState(false)
  const [activeHappyHour, setActiveHappyHour] = useState(false)
  const resetWorkerNewClientReserwation = useSelector(
    state => state.resetWorkerNewClientReserwation
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (resetWorkerNewClientReserwation) {
      setNewTimeStart(null)
      setNewTimeEnd(null)
      setReserwationMessage("")
      setPhoneInput("")
      setNameInput("")
      setSurnameInput("")
      setEmailInput("")
      setIsActiveUser(true)
      setChooseEventMenu(false)
      setNewReserwationOpen(false)
      dispatch(fetchResetWorkerNewClientReserwation())
    }
  }, [resetWorkerNewClientReserwation]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!!selectedEvent) {
      const dateStartName = `${
        selectedEvent.start.getHours() < 10
          ? `0${selectedEvent.start.getHours()}`
          : selectedEvent.start.getHours()
      }:${
        selectedEvent.start.getMinutes() < 10
          ? `0${selectedEvent.start.getMinutes()}`
          : selectedEvent.start.getMinutes()
      }`
      const dateEndName = `${
        selectedEvent.end.getHours() < 10
          ? `0${selectedEvent.end.getHours()}`
          : selectedEvent.end.getHours()
      }:${
        selectedEvent.end.getMinutes() < 10
          ? `0${selectedEvent.end.getMinutes()}`
          : selectedEvent.end.getMinutes()
      }`
      setDateStart(dateStartName)
      setDateEnd(dateEndName)
      setNewTimeEnd(null)
      setNewTimeStart(null)
    }
  }, [dateStart, dateEnd, selectedEvent, selectedWorker])

  useEffect(() => {
    let selectedWorkerValue = null
    if (!!user && !!companyItems) {
      const ownerName = Buffer.from(companyItems.owner.name, "base64").toString(
        "utf-8"
      )
      const ownerSurname = Buffer.from(
        companyItems.owner.surname,
        "base64"
      ).toString("utf-8")

      const ownerValue = {
        value: companyItems.owner._id,
        label: `${ownerName} ${ownerSurname}`,
      }

      const mapWorkers = companyItems.workers.map(itemWorker => {
        const workerName = Buffer.from(itemWorker.user.name, "base64").toString(
          "utf-8"
        )
        const workerSurname = Buffer.from(
          itemWorker.user.surname,
          "base64"
        ).toString("utf-8")

        return {
          value: itemWorker.user._id,
          label: `${workerName} ${workerSurname}`,
        }
      })

      const findWorker = [ownerValue, ...mapWorkers].find(
        itemWorker => itemWorker.value === user.userId
      )
      if (!!findWorker) {
        selectedWorkerValue = findWorker
      }
    }
    setSelectedService(null)
    setSelectedWorker(selectedWorkerValue)
  }, [chooseEventMenu, user, companyItems])

  const handleOpenDateStartTimePicker = () => {
    setOpenDateStart(prevState => !prevState)
  }

  const handleOpenDateEndTimePicker = () => {
    setOpenDateEnd(prevState => !prevState)
  }

  const handleUpdateTimeStart = time => {
    setOpenDateStart(false)
    setNewTimeStart(time)
    setActivePromotion(false)
    setActiveHappyHour(false)
  }

  const handleUpdateTimeEnd = time => {
    setOpenDateEnd(false)
    setNewTimeEnd(time)
  }

  const handleReserwationMessage = e => {
    setReserwationMessage(e.target.value)
  }

  const handleChangeActivePromotion = () => {
    setActivePromotion(prevState => !prevState)
  }

  const handleChangeActiveHappyHour = () => {
    setActiveHappyHour(prevState => !prevState)
  }

  const handleAddReserwationWorkerComponent = e => {
    e.preventDefault()
    const validDateStart = !!newTimeStart ? newTimeStart : dateStart
    const splitDateStart = validDateStart.split(":")
    const newDateStartValue = new Date(
      selectedEvent.start.getFullYear(),
      selectedEvent.start.getMonth(),
      selectedEvent.start.getDate(),
      Number(splitDateStart[0]),
      Number(splitDateStart[1])
    )

    const isActiveDate = newDateStartValue > new Date()

    const validUser = isActiveUser
      ? !!phoneInput
      : !!phoneInput && !!nameInput && !!surnameInput
    if (!!selectedService && !!selectedWorker && validUser && isActiveDate) {
      const selectedDateFull = `${selectedEvent.start.getDate()}-${
        selectedEvent.start.getMonth() + 1
      }-${selectedEvent.start.getFullYear()}`
      handleAddWorkerReserwation(
        !!newTimeStart ? newTimeStart : dateStart,
        !!newTimeEnd ? newTimeEnd : dateEnd,
        selectedDateFull,
        reserwationMessage,
        selectedWorker.value,
        selectedService.value,
        isActiveUser,
        phoneInput,
        nameInput,
        surnameInput,
        emailInput,
        activePromotion,
        activeHappyHour
      )
    } else {
      if (!validUser) {
        dispatch(addAlertItem("Niepoprawne dane użytkownika", "red"))
      } else if (!isActiveDate) {
        dispatch(addAlertItem("Niepoprawna data wizyty", "red"))
      } else if (!!!selectedWorker) {
        dispatch(addAlertItem("Nie wybrano pracownika", "red"))
      } else if (!!!selectedService) {
        dispatch(addAlertItem("Nie wybrano usługi", "red"))
      }
    }
  }

  const handleChangeSelectedWorker = value => {
    if (isAdmin) {
      setSelectedWorker(value)
      setSelectedService(null)
      setActivePromotion(false)
      setActiveHappyHour(false)
    }
  }

  const handleChangeSelectedService = value => {
    setSelectedService(value)
    setActivePromotion(false)
    setActiveHappyHour(false)
    if (!!companyItems) {
      if (!!companyItems.services) {
        const findService = companyItems.services.find(
          itemService => itemService._id === value.value
        )
        if (findService) {
          const validDateStart = !!newTimeStart ? newTimeStart : dateStart
          const splitDateStart = validDateStart.split(":")

          const newDateEndValue = new Date(
            selectedEvent.start.getFullYear(),
            selectedEvent.start.getMonth(),
            selectedEvent.start.getDate(),
            Number(splitDateStart[0]),
            Number(splitDateStart[1]) + Number(findService.time)
          )

          const dateEndName = `${
            newDateEndValue.getHours() < 10
              ? `0${newDateEndValue.getHours()}`
              : newDateEndValue.getHours()
          }:${
            newDateEndValue.getMinutes() < 10
              ? `0${newDateEndValue.getMinutes()}`
              : newDateEndValue.getMinutes()
          }`
          setNewTimeEnd(dateEndName)
        }
      }
    }
  }

  const handleChangeCheckbox = () => {
    setIsActiveUser(prevState => !prevState)
  }

  const handleChangeInputs = (e, setChange) => {
    setChange(e.target.value)
  }

  let selectedDate = ""
  let selectMonthName = ""
  let selectedDayWeekName = ""
  let selectButtonsToEvents = null
  let selectedEventInAllEventWarningExtraTime = null
  let companyOpenHours = null
  let renderDateStart = ""
  let renderDateEnd = ""
  let allServices = []
  let allWorkers = []
  let selectedWorkerServicesIds = []
  let allSelectedWorkerServices = []
  let selectedServiceItem = null
  if (!!selectedEvent) {
    selectedDate = `${
      selectedEvent.start.getDate() < 10
        ? `0${selectedEvent.start.getDate()}`
        : selectedEvent.start.getDate()
    }-${
      selectedEvent.start.getMonth() + 1 < 10
        ? `0${selectedEvent.start.getMonth() + 1}`
        : selectedEvent.start.getMonth() + 1
    }-${selectedEvent.start.getFullYear()}`

    if (!!companyItems) {
      if (!!companyItems.services) {
        allServices = companyItems.services.map(serviceItem => {
          return {
            value: serviceItem._id,
            label: serviceItem.serviceName,
          }
        })
        if (!!selectedService) {
          selectedServiceItem = companyItems.services.find(
            serviceItem => serviceItem._id === selectedService.value
          )
        }
      }

      if (!!selectedWorker) {
        if (selectedWorker.value === companyItems.owner._id) {
          selectedWorkerServicesIds = companyItems.ownerData.servicesCategory
        }
      } else {
        const findServicesInWorkers = companyItems.workers.find(
          itemWorker => itemWorker.user._id === selectedWorker.value
        )
        if (!!findServicesInWorkers) {
          selectedWorkerServicesIds = findServicesInWorkers.servicesCategory
        }
      }

      const allFindedServices = []
      selectedWorkerServicesIds.forEach(serviceId => {
        const findService = allServices.find(
          serviceItem => serviceItem.value === serviceId
        )
        if (!!findService) {
          allFindedServices.push(findService)
        }
      })
      allSelectedWorkerServices = allFindedServices

      const ownerName = Buffer.from(companyItems.owner.name, "base64").toString(
        "utf-8"
      )

      const ownerSurname = Buffer.from(
        companyItems.owner.surname,
        "base64"
      ).toString("utf-8")

      const ownerValue = {
        value: companyItems.owner._id,
        label: `${ownerName} ${ownerSurname}`,
      }

      const mapWorkers = companyItems.workers.map(itemWorker => {
        const workerName = Buffer.from(itemWorker.user.name, "base64").toString(
          "utf-8"
        )
        const workerSurname = Buffer.from(
          itemWorker.user.surname,
          "base64"
        ).toString("utf-8")

        return {
          value: itemWorker.user._id,
          label: `${workerName} ${workerSurname}`,
        }
      })

      allWorkers = [ownerValue, ...mapWorkers]
    }

    const selectedDayOpenCompany = getMonthAndReturnEng(
      selectedEvent.start.getDay()
    )
    companyOpenHours = itemCompanyHours[selectedDayOpenCompany]

    const selectedMonth = selectedEvent.start.getMonth()
    selectMonthName = getMonthNamePl(selectedMonth)

    const selectedDayWeek = selectedEvent.start.getDay()
    selectedDayWeekName = getMonthAndReturnFull(selectedDayWeek)

    selectedEventInAllEventWarningExtraTime = companyOpenHours.disabled
      ? "Uwaga rezerwacja jest dodawana w dzień w którym firma jest nieczynna"
      : null

    renderDateStart = (
      <ButtonItemStyleTime>
        <ButtonIcon
          title={!!newTimeStart ? newTimeStart : dateStart}
          uppercase
          fontIconSize="20"
          fontSize="12"
          icon={<MdTimelapse />}
          onClick={handleOpenDateStartTimePicker}
        />
      </ButtonItemStyleTime>
    )

    renderDateEnd = (
      <ButtonItemStyleTime>
        <ButtonIcon
          title={!!newTimeEnd ? newTimeEnd : dateEnd}
          uppercase
          fontIconSize="20"
          fontSize="12"
          icon={<MdTimelapse />}
          onClick={handleOpenDateEndTimePicker}
        />
      </ButtonItemStyleTime>
    )

    selectButtonsToEvents = !!selectedEvent.action && (
      <ButtonItemStyleButton type="submit">
        <ButtonIcon
          title="Potwierdz"
          uppercase
          fontIconSize="20"
          fontSize="16"
          icon={<FaSave />}
          customColorButton={Colors(siteProps).successColorDark}
          customColorIcon={Colors(siteProps).successColor}
          disabled={!!!selectedService || !!!selectedWorker}
        />
      </ButtonItemStyleButton>
    )
  }

  const warningItemExtraTime = !!selectedEventInAllEventWarningExtraTime && (
    <WarningStyle siteProps={siteProps}>
      {selectedEventInAllEventWarningExtraTime}
      <IconWarning siteProps={siteProps}>
        <MdInfo />
      </IconWarning>
    </WarningStyle>
  )

  const contentForm = !isActiveUser && (
    <>
      <InputIcon
        icon={<MdAccountBox />}
        placeholder="Imię"
        value={nameInput}
        onChange={e => handleChangeInputs(e, setNameInput)}
        required
        validText="Minimum 3 znaki"
      />
      <InputIcon
        icon={<MdAccountBox />}
        placeholder="Nazwisko"
        value={surnameInput}
        onChange={e => handleChangeInputs(e, setSurnameInput)}
        required
        validText="Minimum 3 znaki"
      />
      <InputIcon
        icon={<MdEmail />}
        placeholder="Email"
        value={emailInput}
        type="email"
        onChange={e => handleChangeInputs(e, setEmailInput)}
        validText="Nie wymagane. Dzięki niemu użytkownik dostanie powiadomienie o zmianie statusu"
      />
    </>
  )

  let selectedHappyHours = null
  let selectedPromotion = null
  if (!!selectedService) {
    if (!!companyItems) {
      const validDateStart = !!newTimeStart ? newTimeStart : dateStart
      const splitDateValidStart = validDateStart.split(":")
      const selectedDateStart = new Date(
        new Date(
          selectedEvent.start.setHours(Number(splitDateValidStart[0]))
        ).setMinutes(Number(splitDateValidStart[1]))
      )

      if (!!companyItems.happyHoursConst) {
        const filterItemsHappyHours = companyItems.happyHoursConst.find(
          itemHappyHour => {
            const isInService = itemHappyHour.servicesInPromotion.some(
              itemIdInPromotion => itemIdInPromotion === selectedService.value
            )
            const isDayInHappyHourItem = itemHappyHour.dayWeekIndex.some(
              dayIndex => dayIndex === selectedDateStart.getDay()
            )
            return isInService && isDayInHappyHourItem
          }
        )
        if (!!filterItemsHappyHours) {
          const splitDateStart = filterItemsHappyHours.start.split(":")
          const splitDateEnd = filterItemsHappyHours.end.split(":")
          const dateStartToValid = new Date(
            new Date(
              selectedEvent.start.setHours(Number(splitDateStart[0]))
            ).setMinutes(Number(splitDateStart[1]))
          )
          const dateEndToValid = new Date(
            new Date(
              selectedEvent.start.setHours(Number(splitDateEnd[0]))
            ).setMinutes(Number(splitDateEnd[1]))
          )

          const validHappyHourDate =
            dateStartToValid <= selectedDateStart &&
            selectedDateStart <= dateEndToValid
          if (validHappyHourDate) {
            selectedHappyHours = filterItemsHappyHours
          }
        }
      }

      if (!!companyItems.promotions) {
        const filterItemsPromotion = companyItems.promotions.find(
          itemPromotion => {
            const isInService = itemPromotion.servicesInPromotion.some(
              itemIdInPromotion => itemIdInPromotion === selectedService.value
            )
            if (isInService) {
              const dateStartPromotion = new Date(itemPromotion.start)
              const dateEndPromotion = new Date(itemPromotion.end)
              const isDayInPromotion =
                dateStartPromotion <= selectedDateStart &&
                dateEndPromotion >= selectedDateStart
              if (isDayInPromotion) {
                return true
              } else {
                return false
              }
            } else {
              return false
            }
          }
        )
        if (!!filterItemsPromotion) {
          selectedPromotion = filterItemsPromotion
        }
      }
    }
  }

  const resultPromotion =
    selectedPromotion !== null && activePromotion
      ? selectedPromotion.promotionPercent
      : selectedHappyHours !== null && activeHappyHour
      ? selectedHappyHours.promotionPercent
      : 0

  let resultPriceAfterPromotion = 0

  if (!!selectedServiceItem) {
    resultPriceAfterPromotion = Math.floor(
      (Number(selectedServiceItem.serviceCost) *
        (100 - Number(resultPromotion))) /
        100
    )
  }

  return (
    <>
      <CSSTransition
        in={screenOpen}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <>
          <EventItemPosition>
            <EventItemPositionContent siteProps={siteProps}>
              <TitleItemName siteProps={siteProps}>
                Nowa rezerwacja
              </TitleItemName>
              {warningItemExtraTime}
              <CloseEditCreateMode
                siteProps={siteProps}
                onClick={handleClosePopupEventItem}
              >
                <MdClose />
              </CloseEditCreateMode>
              <EventItemPositionContentPadding
                onSubmit={handleAddReserwationWorkerComponent}
              >
                <PositionRelative>
                  <CheckboxStyle siteProps={siteProps}>
                    <Checkbox
                      theme="material-checkbox"
                      value={isActiveUser}
                      onChange={handleChangeCheckbox}
                    >
                      <TextCheckbox>Aktywny użytkownik</TextCheckbox>
                    </Checkbox>
                  </CheckboxStyle>
                </PositionRelative>
                <MarginBottomInputs>
                  {contentForm}
                  <InputPhone
                    setPhoneNumber={setPhoneInput}
                    whiteInputs
                    textPhone={
                      isActiveUser
                        ? "Numer telefonu aktywnego użytkownika"
                        : "Numer telefonu"
                    }
                  />
                </MarginBottomInputs>
                <ItemTitle siteProps={siteProps}>
                  Miesiąc:
                  <span>{selectMonthName}</span>
                </ItemTitle>
                <ItemTitle siteProps={siteProps}>
                  Dzień tygodnia:
                  <span>{selectedDayWeekName}</span>
                </ItemTitle>
                <ItemTitle siteProps={siteProps}>
                  Data:
                  <span>{selectedDate}</span>
                </ItemTitle>
                <ItemTitle siteProps={siteProps}>
                  Początek rezerwacji:
                  {renderDateStart}
                </ItemTitle>
                <ItemTitle siteProps={siteProps}>
                  Koniec rezerwacji:
                  {renderDateEnd}
                </ItemTitle>
                {!!selectedServiceItem && (
                  <ItemTitle siteProps={siteProps}>
                    Cena: {selectedServiceItem.serviceCost}zł
                  </ItemTitle>
                )}
                {!!resultPriceAfterPromotion &&
                  (!!selectedHappyHours || !!selectedPromotion) && (
                    <ItemTitle siteProps={siteProps}>
                      Cena po promocji: {resultPriceAfterPromotion}zł
                    </ItemTitle>
                  )}
                {!!selectedPromotion && !activeHappyHour && (
                  <PositionRelative>
                    <CheckboxStyle siteProps={siteProps}>
                      <Checkbox
                        theme="material-checkbox"
                        value={activePromotion}
                        onChange={handleChangeActivePromotion}
                      >
                        <TextCheckbox>
                          Aktywuj promocję: {selectedPromotion.promotionPercent}
                          %
                        </TextCheckbox>
                      </Checkbox>
                    </CheckboxStyle>
                  </PositionRelative>
                )}
                {!!selectedHappyHours && !activePromotion && (
                  <PositionRelative>
                    <CheckboxStyle siteProps={siteProps}>
                      <Checkbox
                        theme="material-checkbox"
                        value={activeHappyHour}
                        onChange={handleChangeActiveHappyHour}
                      >
                        <TextCheckbox>
                          Aktywuj happy hour:{" "}
                          {selectedHappyHours.promotionPercent}%
                        </TextCheckbox>
                      </Checkbox>
                    </CheckboxStyle>
                  </PositionRelative>
                )}
                {isAdmin && (
                  <MarginTopSelect>
                    <SelectCreated
                      options={allWorkers}
                      value={selectedWorker}
                      handleChange={handleChangeSelectedWorker}
                      placeholder="Pracownik"
                      defaultMenuIsOpen={false}
                      isClearable={false}
                      widthAuto
                      deleteItem={false}
                      darkSelect
                      textUp
                      top
                    />
                  </MarginTopSelect>
                )}
                <MarginTopSelect>
                  <SelectCreated
                    options={allSelectedWorkerServices}
                    value={selectedService}
                    handleChange={handleChangeSelectedService}
                    placeholder="Usługa"
                    defaultMenuIsOpen={false}
                    isClearable={false}
                    widthAuto
                    deleteItem={false}
                    darkSelect
                    textUp
                    top
                    isDisabled={allSelectedWorkerServices.length === 0}
                  />
                </MarginTopSelect>
                <InputIcon
                  placeholder="Wiadomość do rezerwacji (domyślnie)"
                  inputActive={true}
                  value={reserwationMessage}
                  onChange={handleReserwationMessage}
                />
                <ButtonsItemEvent>{selectButtonsToEvents}</ButtonsItemEvent>
              </EventItemPositionContentPadding>
            </EventItemPositionContent>
          </EventItemPosition>
        </>
      </CSSTransition>

      {!!selectedEvent && (
        <>
          <Popup
            popupEnable={openDateStart}
            handleClose={handleOpenDateStartTimePicker}
            noContent
          >
            <WidthTimePicker>
              <TimePickerContent
                setSelectedTime={handleUpdateTimeStart}
                timeTimePicker={dateStart}
                maxTime={!!newTimeEnd ? newTimeEnd : dateEnd}
              />
            </WidthTimePicker>
          </Popup>
          <Popup
            popupEnable={openDateEnd}
            handleClose={handleOpenDateEndTimePicker}
            noContent
            // calendar
          >
            <WidthTimePicker>
              <TimePickerContent
                setSelectedTime={handleUpdateTimeEnd}
                timeTimePicker={!!newTimeEnd ? newTimeEnd : dateEnd}
                minTime={dateStart}
              />
            </WidthTimePicker>
          </Popup>
        </>
      )}
    </>
  )
}
export default CalendarWorkerReserwatinNewReserwation
