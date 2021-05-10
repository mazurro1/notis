import React, { useEffect, useState } from "react"
import { CSSTransition } from "react-transition-group"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import ButtonIcon from "./ButtonIcon"
import { FaSave, FaCalendarDay } from "react-icons/fa"
import {
  MdClose,
  MdInfo,
  MdAssignmentTurnedIn,
  MdCancel,
  MdAssignmentLate,
  MdTimelapse,
  MdArrowBack,
} from "react-icons/md"
import {
  getMonthNamePl,
  getMonthAndReturnFull,
  getMonthAndReturnEng,
} from "../common/Functions"
import { Checkbox } from "react-input-checkbox"
import Popup from "./Popup"
import TimePickerContent from "./TimePicker"
import SelectCreated from "./SelectCreated"
import SelectDataCalendar from "./SelectDataCalendar"

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

const EventItemPositionContentDelete = styled.div`
  position: relative;
  background-color: ${props => Colors(props.siteProps).companyItemBackground};
  width: 600px;
  max-width: 90%;
  max-height: 90%;
  border-radius: 5px;
  overflow: hidden;
`

const EventItemPositionContentPadding = styled.div`
  padding: 10px;
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

const ButtonItemStyle = styled.div`
  margin-left: 10px;
  margin-top: 10px;
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
    color: ${props => Colors(props.siteProps).primaryColorDark};
  }
`

const TextCheckbox = styled.span`
  padding-left: 10px;
  font-family: "Poppins-Bold", sans-serif;
  user-select: none;
`

const CheckboxStyle = styled.div`
  margin-bottom: 30px;

  .material-checkbox__input:checked + .material-checkbox__image {
    background-color: ${props => Colors(props.siteProps).primaryColor};
  }

  span {
    color: ${props => Colors(props.siteProps).textNormalBlack};
    border-color: ${props => Colors(props.siteProps).textNormalBlack};
  }
`

const ButtonItemStyleTime = styled.div`
  margin-left: 10px;
`

const ButtonItemStyleCancelReserwation = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
`

const TitleDelete = styled.div`
  background-color: ${props => Colors(props.siteProps).primaryColorDark};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  font-size: 1.2rem;
  padding: 5px 10px;
`

const CalendarWorkerReserwatinEvent = ({
  siteProps,
  handleClosePopupEventItem,
  selectedEvent,
  allEvents,
  screenOpen,
  handleChangeReserwationStatus,
  itemCompanyHours,
  isAdmin,
  itemCompany,
}) => {
  const [confirmCancelReserwation, setConfirmCancelReserwation] = useState(
    false
  )
  const [openDateStart, setOpenDateStart] = useState(false)
  const [openDateEnd, setOpenDateEnd] = useState(false)
  const [newTimeStart, setNewTimeStart] = useState(null)
  const [newTimeEnd, setNewTimeEnd] = useState(null)
  const [dateStart, setDateStart] = useState(null)
  const [dateEnd, setDateEnd] = useState(null)
  const [isHolidays, setIsHolidays] = useState(false)
  const [selectedWorker, setSelectedWorker] = useState(null)
  const [isSelectDate, setIsSelectDate] = useState(false)
  const [selectedDateReserwation, setSelectedDateReserwation] = useState(null)
  const [
    selectedDateReserwationDate,
    setSelectedDateReserwationDate,
  ] = useState(null)

  useEffect(() => {
    setNewTimeEnd(null)
    setNewTimeStart(null)
    setSelectedDateReserwation(null)
    setSelectedDateReserwationDate(null)
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
      setSelectedDateReserwation(new Date(selectedEvent.start))
      const dateReserwationDate = `${
        selectedEvent.start.getDate() < 10
          ? `0${selectedEvent.start.getDate()}`
          : selectedEvent.start.getDate()
      }-${
        selectedEvent.start.getMonth() + 1 < 10
          ? `0${selectedEvent.start.getMonth() + 1}`
          : selectedEvent.start.getMonth() + 1
      }-${selectedEvent.start.getFullYear()}`

      setSelectedDateReserwationDate(dateReserwationDate)
      if (!!selectedEvent.holidays) {
        setIsHolidays(selectedEvent.holidays)
      } else {
        setIsHolidays(false)
      }
    }
  }, [dateStart, dateEnd, selectedEvent])

  useEffect(() => {
    setSelectedWorker(null)
    if (!!itemCompany && !!selectedEvent) {
      if (!!itemCompany.owner._id) {
        if (itemCompany.owner._id === selectedEvent.toWorkerUserId) {
          const userOwnerName = Buffer.from(
            itemCompany.owner.name,
            "base64"
          ).toString("utf-8")
          const userOwnerSurname = Buffer.from(
            itemCompany.owner.surname,
            "base64"
          ).toString("utf-8")
          setSelectedWorker({
            label: `${userOwnerName} ${userOwnerSurname}`,
            value: itemCompany.owner._id,
          })
        }
      }
      if (!!itemCompany.workers) {
        itemCompany.workers.forEach(workerCompany => {
          if (!!workerCompany.user._id) {
            if (workerCompany.user._id === selectedEvent.toWorkerUserId) {
              const userOwnerName = Buffer.from(
                workerCompany.user.name,
                "base64"
              ).toString("utf-8")
              const userOwnerSurname = Buffer.from(
                workerCompany.user.surname,
                "base64"
              ).toString("utf-8")
              setSelectedWorker({
                label: `${userOwnerName} ${userOwnerSurname}`,
                value: workerCompany.user._id,
              })
            }
          }
        })
      }
    }
  }, [selectedEvent])

  const handleChangeCheckbox = setChange => {
    setIsHolidays(prevState => !prevState)
  }

  const handleOpenDateStartTimePicker = () => {
    setOpenDateStart(prevState => !prevState)
  }

  const handleOpenDateEndTimePicker = () => {
    setOpenDateEnd(prevState => !prevState)
  }

  const handleUpdateTimeStart = time => {
    setOpenDateStart(false)
    setNewTimeStart(time)
  }

  const handleUpdateTimeEnd = time => {
    setOpenDateEnd(false)
    setNewTimeEnd(time)
  }

  const handleSelectDatePicker = () => {
    setIsSelectDate(prevState => !prevState)
  }

  const handleResetChanges = () => {
    handleClosePopupEventItem()
    setNewTimeStart(null)
    setNewTimeEnd(null)
    setSelectedWorker(null)
    setSelectedDateReserwation(new Date(selectedEvent.start))
    const dateReserwationDate = `${
      selectedEvent.start.getDate() < 10
        ? `0${selectedEvent.start.getDate()}`
        : selectedEvent.start.getDate()
    }-${
      selectedEvent.start.getMonth() + 1 < 10
        ? `0${selectedEvent.start.getMonth() + 1}`
        : selectedEvent.start.getMonth() + 1
    }-${selectedEvent.start.getFullYear()}`

    setSelectedDateReserwationDate(dateReserwationDate)
  }

  const handleConfirmCancelReserwation = () => {
    setConfirmCancelReserwation(prevState => !prevState)
  }

  const handleChangeWorkerSelect = value => {
    setSelectedWorker(value)
  }

  const handleChangeDateReserwation = date => {
    setSelectedDateReserwation(date)
    const dateReserwationDate = `${
      date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    }-${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }-${date.getFullYear()}`

    setSelectedDateReserwationDate(dateReserwationDate)
  }

  let statusReserwation = ""
  let timeReserwation = ""
  let costReserwation = "Brak ceny"
  let costPromotionReserwation = ""
  let serviceName = ""
  let selectedDate = ""
  let selectMonthName = ""
  let selectedDayWeekName = ""
  let selectButtonsToEvents = null
  let selectedEventInAllEventWarningExtraTime = null
  let titleEvent = ""
  let switchButtonHolidays = null
  let companyOpenHours = null
  let renderDateStart = ""
  let renderDateEnd = ""
  let renderDateReserwation = ""
  let diabledUpdateButtonStart = true
  let diabledUpdateButtonEnd = true
  let disabledChangeWorker = true
  let client = ""
  let reserwationMessage = " Brak"
  let isWorkerReserwation = false
  let activePromotion = false
  let promotionName = ""
  const workersToSelect = []
  let oldDateToSelectWorker = false

  if (!!selectedEvent) {
    if (!!itemCompany) {
      oldDateToSelectWorker = new Date() > selectedEvent.end
      const adminHasService = itemCompany.ownerData.servicesCategory.some(
        itemService => itemService === selectedEvent.serviceId
      )
      if (
        adminHasService &&
        !!itemCompany.owner.name &&
        !!itemCompany.owner.surname
      ) {
        const userOwnerName = Buffer.from(
          itemCompany.owner.name,
          "base64"
        ).toString("utf-8")
        const userOwnerSurname = Buffer.from(
          itemCompany.owner.surname,
          "base64"
        ).toString("utf-8")
        workersToSelect.push({
          label: `${userOwnerName} ${userOwnerSurname}`,
          value: itemCompany.owner._id,
        })
      }

      if (!!itemCompany.workers) {
        itemCompany.workers.forEach(workerDoc => {
          const workerHasService = workerDoc.servicesCategory.some(
            itemService => itemService === selectedEvent.serviceId
          )
          if (
            workerHasService &&
            !!workerDoc.user.name &&
            !!workerDoc.user.surname &&
            !!workerDoc.active
          ) {
            const userWorkerName = Buffer.from(
              workerDoc.user.name,
              "base64"
            ).toString("utf-8")
            const userWorkerSurname = Buffer.from(
              workerDoc.user.surname,
              "base64"
            ).toString("utf-8")
            workersToSelect.push({
              label: `${userWorkerName} ${userWorkerSurname}`,
              value: workerDoc.user._id,
            })
          }
        })
      }
    }

    if (
      !!selectedEvent.activePromotion ||
      !!selectedEvent.activeHappyHour ||
      !!selectedEvent.activeStamp
    ) {
      activePromotion = true
      promotionName = !!selectedEvent.activePromotion
        ? "Promocja"
        : !!selectedEvent.activeHappyHour
        ? "Happy hour"
        : !!selectedEvent.activeStamp
        ? "Komplet pieczątek"
        : ""
    }

    if (!!selectedEvent.workerReserwation) {
      isWorkerReserwation = selectedEvent.workerReserwation
    }

    if (Number(selectedEvent.timeReserwation) <= 60) {
      timeReserwation = `${selectedEvent.timeReserwation}min ${
        selectedEvent.extraTime ? "+" : ""
      }`
    } else {
      const numberTime = Number(selectedEvent.timeReserwation)
      const numberOfHours = Math.floor(numberTime / 60)
      if (Number(selectedEvent.timeReserwation) % 60 === 0) {
        timeReserwation = `${numberOfHours}h ${
          selectedEvent.extraTime ? "+" : ""
        }`
      } else {
        const numberOfMinutes = numberTime - numberOfHours * 60
        timeReserwation = `${
          numberOfHours > 0
            ? `${numberOfHours}h ${selectedEvent.extraTime ? "+" : ""}`
            : ""
        } ${numberOfMinutes}min ${selectedEvent.extraTime ? "+" : ""}`
      }
    }

    if (!!selectedEvent.fromUser) {
      const userName = Buffer.from(
        selectedEvent.fromUser.name,
        "base64"
      ).toString("utf-8")
      const userSurname = Buffer.from(
        selectedEvent.fromUser.surname,
        "base64"
      ).toString("utf-8")

      client = `${userName} ${userSurname}`
    } else {
      client = "Uzytkownik skasował konto"
    }

    if (!!selectedEvent.reserwationMessage) {
      reserwationMessage = ` ${selectedEvent.reserwationMessage}`
    }

    if (selectedEvent.basicPrice) {
      costReserwation = `${
        activePromotion
          ? selectedEvent.basicPrice
          : selectedEvent.costReserwation
      }zł ${selectedEvent.extraCost ? "+" : ""}`
    }

    costPromotionReserwation = `${selectedEvent.costReserwation}zł ${
      selectedEvent.extraCost ? "+" : ""
    }`

    serviceName = selectedEvent.serviceName

    const selectedDayOpenCompany = getMonthAndReturnEng(
      selectedEvent.start.getDay()
    )
    companyOpenHours = itemCompanyHours[selectedDayOpenCompany]

    selectedDate = `${
      selectedEvent.start.getDate() < 10
        ? `0${selectedEvent.start.getDate()}`
        : selectedEvent.start.getDate()
    }-${
      selectedEvent.start.getMonth() + 1 < 10
        ? `0${selectedEvent.start.getMonth() + 1}`
        : selectedEvent.start.getMonth() + 1
    }-${selectedEvent.start.getFullYear()}`

    const selectedMonth = selectedEvent.start.getMonth()
    selectMonthName = getMonthNamePl(selectedMonth)

    const selectedDayWeek = selectedEvent.start.getDay()
    selectedDayWeekName = getMonthAndReturnFull(selectedDayWeek)

    titleEvent = !!selectedEvent.action
      ? selectedEvent.workerReserwation
        ? "Tworzenie rezerwację czasu pracy"
        : "Tworzenie rezerwacji"
      : selectedEvent.workerReserwation
      ? "Edycja rezerwacji czasu pracy"
      : "Edycja rezerwacji"

    if (!!companyOpenHours.disabled) {
      selectedEventInAllEventWarningExtraTime = companyOpenHours.disabled
        ? "Uwaga rezerwacja jest edytowana w dzień w którym firma jest nieczynna"
        : null
    }

    if (!!!companyOpenHours.disabled) {
      switchButtonHolidays = !!selectedEvent.action &&
        !companyOpenHours.disabled && (
          <CheckboxStyle siteProps={siteProps}>
            <Checkbox
              theme="material-checkbox"
              value={isHolidays}
              onChange={handleChangeCheckbox}
            >
              <TextCheckbox>Dzień wolony</TextCheckbox>
            </Checkbox>
          </CheckboxStyle>
        )
    }

    const isOldDate = new Date() > selectedEvent.end

    diabledUpdateButtonStart = !!newTimeStart
      ? newTimeStart === dateStart
      : true
    diabledUpdateButtonEnd = !!newTimeEnd ? newTimeEnd === dateEnd : true

    if (!!selectedWorker) {
      disabledChangeWorker =
        selectedEvent.toWorkerUserId === selectedWorker.value
    }

    renderDateStart = isOldDate ? (
      <span>{dateStart}</span>
    ) : (
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

    renderDateEnd = isOldDate ? (
      <span>{dateEnd}</span>
    ) : (
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

    renderDateReserwation = isOldDate ? (
      <span>{selectedDateReserwationDate}</span>
    ) : (
      <ButtonItemStyleTime>
        <ButtonIcon
          onClick={handleSelectDatePicker}
          title={selectedDateReserwationDate}
          uppercase
          fontIconSize="20"
          fontSize="16"
          icon={<FaCalendarDay />}
        />
      </ButtonItemStyleTime>
    )

    statusReserwation =
      !!!selectedEvent.visitCanceled && !!!selectedEvent.visitNotFinished ? (
        !isOldDate ? (
          <span>Wizyta oczekująca</span>
        ) : (
          <span>Wizyta zakończona</span>
        )
      ) : (
        <span>Wizyta nie zakończona</span>
      )

    selectButtonsToEvents = !!selectedEvent.action ? (
      <ButtonItemStyle>
        <ButtonIcon
          title="Potwierdz"
          uppercase
          fontIconSize="20"
          fontSize="16"
          icon={<FaSave />}
          customColorButton={Colors(siteProps).successColorDark}
          customColorIcon={Colors(siteProps).successColor}
        />
      </ButtonItemStyle>
    ) : (
      <>
        {isOldDate ? (
          !!!selectedEvent.visitCanceled &&
          !!!selectedEvent.visitNotFinished ? (
            !isWorkerReserwation ? (
              <ButtonItemStyle>
                <ButtonIcon
                  title="Wizyta nie zakończona"
                  uppercase
                  fontIconSize="20"
                  fontSize="16"
                  icon={<MdAssignmentLate />}
                  customColorButton={Colors(siteProps).dangerColorDark}
                  customColorIcon={Colors(siteProps).dangerColor}
                  onClick={() => {
                    handleClosePopupEventItem()
                    handleChangeReserwationStatus(
                      selectedEvent._id,
                      "noFinished"
                    )
                  }}
                />
              </ButtonItemStyle>
            ) : (
              <ButtonItemStyle>
                <ButtonIcon
                  title={
                    isWorkerReserwation
                      ? "Odwołaj rezerwacje"
                      : "Odwołaj wizyte"
                  }
                  uppercase
                  fontIconSize="20"
                  fontSize="16"
                  icon={<MdCancel />}
                  customColorButton={Colors(siteProps).dangerColorDark}
                  customColorIcon={Colors(siteProps).dangerColor}
                  onClick={handleConfirmCancelReserwation}
                />
              </ButtonItemStyle>
            )
          ) : (
            <ButtonItemStyle>
              <ButtonIcon
                title="Wizyta zakończona"
                uppercase
                fontIconSize="20"
                fontSize="16"
                icon={<MdAssignmentTurnedIn />}
                customColorButton={Colors(siteProps).successColorDark}
                customColorIcon={Colors(siteProps).successColor}
                onClick={() => {
                  handleClosePopupEventItem()
                  handleChangeReserwationStatus(selectedEvent._id, "finished")
                }}
              />
            </ButtonItemStyle>
          )
        ) : (
          <ButtonItemStyle>
            <ButtonIcon
              title={
                isWorkerReserwation ? "Odwołaj rezerwacje" : "Odwołaj wizyte"
              }
              uppercase
              fontIconSize="20"
              fontSize="16"
              icon={<MdCancel />}
              customColorButton={Colors(siteProps).dangerColorDark}
              customColorIcon={Colors(siteProps).dangerColor}
              onClick={handleConfirmCancelReserwation}
            />
          </ButtonItemStyle>
        )}
        {!isOldDate && (
          <>
            <ButtonItemStyle>
              <ButtonIcon
                title="Cofnij zmiany"
                uppercase
                fontIconSize="20"
                fontSize="16"
                icon={<MdArrowBack />}
                onClick={handleResetChanges}
                disabled={
                  diabledUpdateButtonStart &&
                  diabledUpdateButtonEnd &&
                  disabledChangeWorker &&
                  selectedDate === selectedDateReserwationDate
                }
              />
            </ButtonItemStyle>
            <ButtonItemStyle>
              <ButtonIcon
                title="Aktualizuj"
                uppercase
                fontIconSize="20"
                fontSize="16"
                icon={<FaSave />}
                customColorButton={Colors(siteProps).successColorDark}
                customColorIcon={Colors(siteProps).successColor}
                disabled={
                  diabledUpdateButtonStart &&
                  diabledUpdateButtonEnd &&
                  disabledChangeWorker &&
                  selectedDate === selectedDateReserwationDate
                }
                onClick={() => {
                  handleClosePopupEventItem()
                  handleChangeReserwationStatus(
                    selectedEvent._id,
                    "update",
                    newTimeStart === dateStart ? null : newTimeStart,
                    newTimeEnd === dateEnd ? null : newTimeEnd,
                    !!selectedWorker ? selectedWorker.value : null,
                    selectedDate === selectedDateReserwationDate
                      ? null
                      : selectedDateReserwationDate
                  )
                  setNewTimeStart(null)
                  setNewTimeEnd(null)
                  setSelectedWorker(null)
                }}
              />
            </ButtonItemStyle>
          </>
        )}
      </>
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

  return (
    <>
      <CSSTransition
        in={screenOpen}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <EventItemPosition>
          <EventItemPositionContent siteProps={siteProps}>
            <TitleItemName siteProps={siteProps}>{titleEvent}</TitleItemName>
            {warningItemExtraTime}
            <CloseEditCreateMode
              siteProps={siteProps}
              onClick={handleClosePopupEventItem}
            >
              <MdClose />
            </CloseEditCreateMode>
            <EventItemPositionContentPadding>
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
                <span>{renderDateReserwation}</span>
              </ItemTitle>
              <ItemTitle siteProps={siteProps}>
                {isWorkerReserwation ? "Pracownik:" : "Klient:"}
                <span>{client}</span>
              </ItemTitle>
              <ItemTitle siteProps={siteProps}>
                Nazwa usługi:
                <span>
                  {isWorkerReserwation ? "Rezerwacja czasu" : serviceName}
                </span>
              </ItemTitle>
              {!isWorkerReserwation && (
                <>
                  <ItemTitle siteProps={siteProps}>
                    {activePromotion
                      ? "Koszt usługi przed promocją:"
                      : "Koszt usługi:"}
                    <span>{costReserwation}</span>
                  </ItemTitle>
                  {activePromotion && (
                    <>
                      <ItemTitle siteProps={siteProps}>
                        Koszt usługi po promocji:
                        <span>{costPromotionReserwation}</span>
                      </ItemTitle>
                      <ItemTitle>
                        Nazwa promocji:
                        <span>{promotionName}</span>
                      </ItemTitle>
                    </>
                  )}
                </>
              )}
              {!isWorkerReserwation && (
                <ItemTitle siteProps={siteProps}>
                  Czas trwania usługi:
                  <span>{timeReserwation}</span>
                </ItemTitle>
              )}
              <ItemTitle siteProps={siteProps}>
                Początek rezerwacji:
                {renderDateStart}
              </ItemTitle>
              <ItemTitle siteProps={siteProps}>
                Koniec rezerwacji:
                {renderDateEnd}
              </ItemTitle>
              <ItemTitle siteProps={siteProps}>
                Wiadomość:
                <span>{reserwationMessage}</span>
              </ItemTitle>
              {!isWorkerReserwation && (
                <ItemTitle siteProps={siteProps}>
                  Status:
                  {statusReserwation}
                </ItemTitle>
              )}
              {!!isAdmin && !isWorkerReserwation && (
                <>
                  <ItemTitle siteProps={siteProps}>
                    Pracownik wykonujący usługę:
                  </ItemTitle>
                  <SelectCreated
                    options={workersToSelect}
                    value={selectedWorker}
                    handleChange={handleChangeWorkerSelect}
                    placeholder="Pracownik..."
                    defaultMenuIsOpen={false}
                    isClearable={false}
                    widthAuto
                    deleteItem={false}
                    top
                    closeMenuOnSelect
                    isDisabled={oldDateToSelectWorker}
                  />
                </>
              )}
              {switchButtonHolidays}
              <ButtonsItemEvent>{selectButtonsToEvents}</ButtonsItemEvent>
            </EventItemPositionContentPadding>
            <CSSTransition
              in={confirmCancelReserwation}
              timeout={400}
              classNames="popup"
              unmountOnExit
            >
              <EventItemPosition>
                <EventItemPositionContentDelete siteProps={siteProps}>
                  <TitleDelete>Potwierdz usuwanie rezerwacji</TitleDelete>
                  <ButtonItemStyleCancelReserwation>
                    <ButtonItemStyle>
                      <ButtonIcon
                        title="Anuluj"
                        uppercase
                        fontIconSize="20"
                        fontSize="16"
                        icon={<MdCancel />}
                        customColorButton={Colors(siteProps).successColorDark}
                        customColorIcon={Colors(siteProps).successColor}
                        onClick={handleConfirmCancelReserwation}
                      />
                    </ButtonItemStyle>
                    <ButtonItemStyle>
                      <ButtonIcon
                        title="Potwierdz"
                        uppercase
                        fontIconSize="20"
                        fontSize="16"
                        icon={<MdCancel />}
                        customColorButton={Colors(siteProps).dangerColorDark}
                        customColorIcon={Colors(siteProps).dangerColor}
                        onClick={() => {
                          handleClosePopupEventItem()
                          handleChangeReserwationStatus(
                            selectedEvent._id,
                            "canceled"
                          )
                          setConfirmCancelReserwation(false)
                        }}
                      />
                    </ButtonItemStyle>
                  </ButtonItemStyleCancelReserwation>
                </EventItemPositionContentDelete>
              </EventItemPosition>
            </CSSTransition>
          </EventItemPositionContent>
        </EventItemPosition>
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
                maxTime={dateEnd}
              />
            </WidthTimePicker>
          </Popup>
          <Popup
            popupEnable={openDateEnd}
            handleClose={handleOpenDateEndTimePicker}
            noContent
          >
            <WidthTimePicker>
              <TimePickerContent
                setSelectedTime={handleUpdateTimeEnd}
                timeTimePicker={dateEnd}
                minTime={dateStart}
              />
            </WidthTimePicker>
          </Popup>
          <Popup
            popupEnable={isSelectDate}
            handleClose={handleSelectDatePicker}
            noContent
          >
            <WidthTimePicker>
              <SelectDataCalendar
                setActualCalendarDate={handleChangeDateReserwation}
                setIsDataActive={handleSelectDatePicker}
                activeMonth={selectedDateReserwation}
                minDateActive={new Date()}
                activeData={selectedDateReserwation}
              />
            </WidthTimePicker>
          </Popup>
        </>
      )}
    </>
  )
}
export default CalendarWorkerReserwatinEvent
