import React, { useState, useEffect } from "react"
import ButtonIcon from "./ButtonIcon"
import styled from "styled-components"
import { FaSave, FaArrowLeft, FaTools } from "react-icons/fa"
import {
  MdAccountBox,
  MdBorderColor,
  MdAttachMoney,
  MdEmail,
  MdTimelapse,
  MdLocationOn,
  MdLocationCity,
  MdDateRange,
} from "react-icons/md"
import { Colors } from "../common/Colors"
import InputIcon from "./InputIcon"
import InputPhone from "./InputPhone"
import { Checkbox } from "react-input-checkbox"
import SelectCreated from "./SelectCreated"
import { AllStatusCommuniting } from "../common/AllStatusCommuniting"
import { addAlertItem, fetchAddCommuniting } from "../state/actions"
import { useDispatch } from "react-redux"
import TimePickerContent from "./TimePicker"
import Popup from "./Popup"
import SelectDataCalendar from "./SelectDataCalendar"

const PositionSelectAll = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
`
const PositionRelative = styled.div`
  position: relative;
`

const StyleButtonAdd = styled.div`
  margin: 5px;
`

const StyledButtonsTime = styled.div`
  display: inline-block;
  margin-bottom: 10px;
`

const StyledButtonsTimeUnder = styled.div`
  display: inline-block;
  margin-bottom: 20px;
`

const StyleButtonAddSubmit = styled.button`
  margin: 5px;
  border: none;
  outline: none;
  background-color: transparent;
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

const MarginTopSelect = styled.div`
  margin-top: 10px;
`

const WidthTimePicker = styled.div`
  background-color: transparent;
  min-width: 280px;
  max-width: 90%;
`

const CompanyCommunitingAdd = ({
  handleClose,
  siteProps,
  user,
  workerHasAccessCommunitings,
  workersWithOwner,
  selectedWorkerId,
}) => {
  const [isActiveUser, setIsActiveUser] = useState(true)
  const [addWorkerTime, setAddWorkerTime] = useState(true)
  const [statusValue, setStatusValue] = useState(null)
  const [phoneInput, setPhoneInput] = useState("")
  const [nameInput, setNameInput] = useState("")
  const [surnameInput, setSurnameInput] = useState("")
  const [emailInput, setEmailInput] = useState("")
  const [descriptionInput, setDescriptionInput] = useState("")
  const [costInput, setCostInput] = useState("")
  const [cityInput, setCityInput] = useState("")
  const [streetInput, setStreetInput] = useState("")
  const [selectedWorker, setSelectedWorker] = useState(null)
  const [timeStartActive, setTimeStartActive] = useState(false)
  const [timeEndActive, setTimeEndActive] = useState(false)
  const [timeStart, setTimeStart] = useState(null)
  const [timeEnd, setTimeEnd] = useState(null)
  const [timeDateActive, setTimeDateActive] = useState(false)
  const [timeDate, setTimeDate] = useState(new Date())

  const dispatch = useDispatch()

  useEffect(() => {
    setStatusValue(AllStatusCommuniting[0])
    setIsActiveUser(true)
    setPhoneInput("")
    setNameInput("")
    setSurnameInput("")
    setDescriptionInput("")
    setCostInput("")
    setStreetInput("")
    setCityInput("")
    setTimeStartActive(false)
    setTimeEndActive(false)
    setTimeStart(null)
    setTimeEnd(null)
    setTimeDate(new Date())
    setTimeDateActive(false)

    let findWorker = workersWithOwner.find(
      itemWorker => itemWorker.value === selectedWorkerId
    )

    if (!!findWorker) {
      setSelectedWorker(findWorker)
    }
  }, [])

  const handleResetAddCommuniting = () => {
    handleClose()
  }

  const handleChangeCheckbox = () => {
    setIsActiveUser(prevState => !prevState)
  }

  const handleChangeCheckboxWorkerTime = () => {
    setAddWorkerTime(prevState => !prevState)
  }

  const handleChangeSelectStatus = value => {
    setStatusValue(value)
  }

  const handleChangeInputs = (e, setChange) => {
    setChange(e.target.value)
  }

  const handleChangeSelectedWorker = value => {
    if (workerHasAccessCommunitings) {
      setSelectedWorker(value)
    }
  }

  const handleAddTimeStart = () => {
    setTimeStartActive(prevState => !prevState)
  }

  const handleAddTimeEnd = () => {
    setTimeEndActive(prevState => !prevState)
  }

  const handleUpdateTimeEnd = time => {
    setTimeEndActive(false)
    setTimeEnd(time)
  }

  const handleUpdateTimeStart = time => {
    setTimeStartActive(false)
    setTimeStart(time)
  }

  const handleAddTimeDate = () => {
    setTimeDateActive(prevState => !prevState)
  }

  let isPolishNumber = false
  if (phoneInput.length === 9) {
    if (Number(phoneInput.slice(0, 2)) >= 45) {
      isPolishNumber = true
    }
  }

  let fullDate = ""
  if (!!timeDate) {
    fullDate = `${
      timeDate.getDate() < 10 ? `0${timeDate.getDate()}` : timeDate.getDate()
    }-${
      timeDate.getMonth() + 1 < 10
        ? `0${timeDate.getMonth() + 1}`
        : timeDate.getMonth() + 1
    }-${timeDate.getFullYear()}`
  }

  const validSave = isActiveUser
    ? phoneInput.length === 9 &&
      descriptionInput.length >= 3 &&
      cityInput.length >= 3 &&
      streetInput.length >= 3 &&
      !!timeStart &&
      !!timeEnd &&
      !!timeDate &&
      isPolishNumber
    : phoneInput.length === 9 &&
      descriptionInput.length >= 3 &&
      nameInput.length >= 3 &&
      surnameInput.length >= 3 &&
      cityInput.length >= 3 &&
      streetInput.length >= 3 &&
      !!timeStart &&
      !!timeEnd &&
      !!timeDate &&
      isPolishNumber

  const handleSubmit = e => {
    e.preventDefault()
    if (validSave) {
      dispatch(
        fetchAddCommuniting(
          user.token,
          user.company._id,
          nameInput,
          surnameInput,
          isActiveUser,
          phoneInput,
          descriptionInput,
          costInput,
          statusValue.value,
          emailInput,
          !!selectedWorker ? selectedWorker.value : user.userId,
          cityInput,
          streetInput,
          timeStart,
          timeEnd,
          addWorkerTime,
          fullDate
        )
      )
    } else {
      if (isActiveUser) {
        if (phoneInput.length !== 9 || !isPolishNumber) {
          dispatch(addAlertItem("Nieprawidłowy numer telefonu", "red"))
        } else if (descriptionInput.length < 3) {
          dispatch(addAlertItem("Uzupełnij opis przedmiotu", "red"))
        } else if (cityInput.length < 3) {
          dispatch(addAlertItem("Uzupełnij miasto", "red"))
        } else if (streetInput.length < 3) {
          dispatch(addAlertItem("Uzupełnij adres", "red"))
        } else if (!!!timeDate) {
          dispatch(addAlertItem("Uzupełnij dzień wizyty", "red"))
        } else if (!!!timeStart) {
          dispatch(addAlertItem("Uzupełnij godzine startu", "red"))
        } else if (!!!timeEnd) {
          dispatch(addAlertItem("Uzupełnij godzine startu", "red"))
        }
      } else {
        if (phoneInput.length !== 9 || !isPolishNumber) {
          dispatch(addAlertItem("Nieprawidłowy numer telefonu", "red"))
        } else if (descriptionInput.length < 3) {
          dispatch(addAlertItem("Uzupełnij opis przedmiotu", "red"))
        } else if (nameInput.length < 3) {
          dispatch(addAlertItem("Uzupełnij imię", "red"))
        } else if (surnameInput.length < 3) {
          dispatch(addAlertItem("Uzupełnij nazwisko", "red"))
        } else if (cityInput.length < 3) {
          dispatch(addAlertItem("Uzupełnij miasto", "red"))
        } else if (streetInput.length < 3) {
          dispatch(addAlertItem("Uzupełnij adres", "red"))
        } else if (!!!timeDate) {
          dispatch(addAlertItem("Uzupełnij dzień wizyty", "red"))
        } else if (!!!timeStart) {
          dispatch(addAlertItem("Uzupełnij godzine startu", "red"))
        } else if (!!!timeEnd) {
          dispatch(addAlertItem("Uzupełnij godzine startu", "red"))
        }
      }
    }
  }

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

  return (
    <div>
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
      <form onSubmit={handleSubmit}>
        {contentForm}
        <InputPhone
          setPhoneNumber={setPhoneInput}
          textPhone={
            isActiveUser
              ? "Numer telefonu aktywnego użytkownika"
              : "Numer telefonu"
          }
        />
        <InputIcon
          icon={<MdLocationCity />}
          placeholder="Miasto"
          value={cityInput}
          onChange={e => handleChangeInputs(e, setCityInput)}
          required
          validText="Minimum 3 znaki"
        />
        <InputIcon
          icon={<MdLocationOn />}
          placeholder="Ulica"
          value={streetInput}
          onChange={e => handleChangeInputs(e, setStreetInput)}
          required
          validText="Minimum 3 znaki"
        />
        <InputIcon
          icon={<MdBorderColor />}
          placeholder="Opis"
          value={descriptionInput}
          onChange={e => handleChangeInputs(e, setDescriptionInput)}
          validText="Minimum 3 znaki"
        />
        <InputIcon
          icon={<MdAttachMoney />}
          placeholder="Koszt w zł"
          type="number"
          value={costInput}
          onChange={e => handleChangeInputs(e, setCostInput)}
          validText="Nie wymagane"
        />
        <div>
          <StyledButtonsTime>
            <ButtonIcon
              title={
                !!timeDate
                  ? `Dzień rezerwacji: ${fullDate}`
                  : "Dzień rezerwacji"
              }
              uppercase
              fontIconSize="20"
              fontSize="16"
              icon={<MdDateRange />}
              onClick={handleAddTimeDate}
            />
          </StyledButtonsTime>
        </div>
        <div>
          <StyledButtonsTime>
            <ButtonIcon
              title={
                !!timeStart ? `Godzina startu: ${timeStart}` : "Godzina startu"
              }
              uppercase
              fontIconSize="20"
              fontSize="16"
              icon={<MdTimelapse />}
              onClick={handleAddTimeStart}
            />
          </StyledButtonsTime>
        </div>
        <div>
          <StyledButtonsTimeUnder>
            <ButtonIcon
              title={!!timeEnd ? `Godzina końca: ${timeEnd}` : "Godzina końca"}
              uppercase
              fontIconSize="20"
              fontSize="16"
              icon={<MdTimelapse />}
              onClick={handleAddTimeEnd}
            />
          </StyledButtonsTimeUnder>
        </div>
        <PositionRelative>
          <CheckboxStyle siteProps={siteProps}>
            <Checkbox
              theme="material-checkbox"
              value={addWorkerTime}
              onChange={handleChangeCheckboxWorkerTime}
            >
              <TextCheckbox>
                Dodaj rezerwację czasu w trakcie trwania wizyty.
              </TextCheckbox>
            </Checkbox>
          </CheckboxStyle>
        </PositionRelative>
        {workerHasAccessCommunitings && (
          <MarginTopSelect>
            <SelectCreated
              options={workersWithOwner}
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
            options={AllStatusCommuniting}
            value={statusValue}
            handleChange={handleChangeSelectStatus}
            placeholder="Status dojazdu"
            defaultMenuIsOpen={false}
            isClearable={false}
            widthAuto
            deleteItem={false}
            darkSelect
            textUp
            top
          />
        </MarginTopSelect>
        <PositionSelectAll>
          <StyleButtonAdd>
            <ButtonIcon
              title="Anuluj"
              uppercase
              fontIconSize="20"
              fontSize="16"
              icon={<FaArrowLeft />}
              customColorButton={Colors(siteProps).dangerColorDark}
              customColorIcon={Colors(siteProps).dangerColor}
              onClick={handleResetAddCommuniting}
            />
          </StyleButtonAdd>
          <StyleButtonAddSubmit type="submit">
            <ButtonIcon
              title="Dodaj"
              uppercase
              fontIconSize="20"
              fontSize="16"
              icon={<FaSave />}
              customColorButton={Colors(siteProps).successColorDark}
              customColorIcon={Colors(siteProps).successColor}
              disabled={!validSave}
            />
          </StyleButtonAddSubmit>
        </PositionSelectAll>
      </form>

      <Popup
        popupEnable={timeStartActive}
        handleClose={handleAddTimeStart}
        noContent
      >
        <WidthTimePicker>
          <TimePickerContent
            setSelectedTime={handleUpdateTimeStart}
            timeTimePicker={timeStart}
            maxTime={timeEnd}
          />
        </WidthTimePicker>
      </Popup>
      <Popup
        popupEnable={timeEndActive}
        handleClose={handleAddTimeEnd}
        noContent
      >
        <WidthTimePicker>
          <TimePickerContent
            setSelectedTime={handleUpdateTimeEnd}
            timeTimePicker={timeEnd}
            minTime={timeStart}
          />
        </WidthTimePicker>
      </Popup>
      <Popup
        popupEnable={timeDateActive}
        handleClose={handleAddTimeDate}
        noContent
      >
        <SelectDataCalendar
          setActualCalendarDate={setTimeDate}
          setIsDataActive={setTimeDateActive}
          activeMonth={new Date()}
          minDateActive={false}
          activeData={timeDate}
        />
      </Popup>
    </div>
  )
}
export default CompanyCommunitingAdd
