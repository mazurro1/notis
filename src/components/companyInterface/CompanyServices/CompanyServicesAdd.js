import React, { useState, useEffect } from "react"
import { ButtonIcon, InputIcon, SelectCreated, InputPhone } from "@ui"
import styled from "styled-components"
import { FaSave, FaArrowLeft, FaTools } from "react-icons/fa"
import {
  MdAccountBox,
  MdBorderColor,
  MdAttachMoney,
  MdEmail,
} from "react-icons/md"
import { Colors } from "@common/Colors"
import { Checkbox } from "react-input-checkbox"
import { AllStatusService } from "@common/AllStatusService"
import { addAlertItem, fetchAddService } from "@state/actions"
import { useDispatch } from "react-redux"

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

const CompanyServicesAdd = ({
  handleClose,
  siteProps,
  user,
  workerHasAccessServices,
  workersWithOwner,
  selectedWorkerId,
}) => {
  const [isActiveUser, setIsActiveUser] = useState(true)
  const [statusValue, setStatusValue] = useState(null)
  const [phoneInput, setPhoneInput] = useState("")
  const [nameInput, setNameInput] = useState("")
  const [surnameInput, setSurnameInput] = useState("")
  const [emailInput, setEmailInput] = useState("")
  const [descriptionInput, setDescriptionInput] = useState("")
  const [costInput, setCostInput] = useState("")
  const [objectInput, setObjectInput] = useState("")
  const [selectedWorker, setSelectedWorker] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    setStatusValue(AllStatusService[0])
    setIsActiveUser(true)
    setPhoneInput("")
    setNameInput("")
    setSurnameInput("")
    setDescriptionInput("")
    setCostInput("")
    setObjectInput("")

    let findWorker = workersWithOwner.find(
      itemWorker => itemWorker.value === selectedWorkerId
    )

    if (!!findWorker) {
      setSelectedWorker(findWorker)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleResetAddService = () => {
    handleClose()
  }

  const handleChangeCheckbox = () => {
    setIsActiveUser(prevState => !prevState)
  }

  const handleChangeSelectStatus = value => {
    setStatusValue(value)
  }

  const handleChangeInputs = (e, setChange) => {
    setChange(e.target.value)
  }

  const handleChangeSelectedWorker = value => {
    if (workerHasAccessServices) {
      setSelectedWorker(value)
    }
  }

  let isPolishNumber = false
  if (phoneInput.length === 9) {
    if (Number(phoneInput.slice(0, 2)) >= 45) {
      isPolishNumber = true
    }
  }

  const validSave = isActiveUser
    ? phoneInput.length === 9 &&
      descriptionInput.length >= 3 &&
      objectInput.length >= 3 &&
      isPolishNumber
    : phoneInput.length === 9 &&
      descriptionInput.length >= 3 &&
      objectInput.length >= 3 &&
      nameInput.length >= 3 &&
      surnameInput.length >= 3 &&
      isPolishNumber

  const handleSubmit = e => {
    e.preventDefault()
    if (validSave) {
      dispatch(
        fetchAddService(
          user.token,
          user.company._id,
          nameInput,
          surnameInput,
          isActiveUser,
          phoneInput,
          objectInput,
          descriptionInput,
          costInput,
          statusValue.value,
          emailInput,
          !!selectedWorker ? selectedWorker.value : user.userId
        )
      )
    } else {
      if (isActiveUser) {
        if (phoneInput.length !== 9 || !isPolishNumber) {
          dispatch(addAlertItem("Nieprawidłowy numer telefonu", "red"))
        } else if (descriptionInput.length < 3) {
          dispatch(addAlertItem("Uzupełnij opis przedmiotu", "red"))
        } else if (objectInput.length < 3) {
          dispatch(addAlertItem("Uzupełnij nazwe przedmiotu", "red"))
        }
      } else {
        if (phoneInput.length !== 9 || !isPolishNumber) {
          dispatch(addAlertItem("Nieprawidłowy numer telefonu", "red"))
        } else if (descriptionInput.length < 3) {
          dispatch(addAlertItem("Uzupełnij opis przedmiotu", "red"))
        } else if (objectInput.length < 3) {
          dispatch(addAlertItem("Uzupełnij nazwe przedmiotu", "red"))
        } else if (nameInput.length < 3) {
          dispatch(addAlertItem("Uzupełnij imię", "red"))
        } else if (surnameInput.length < 3) {
          dispatch(addAlertItem("Uzupełnij nazwisko", "red"))
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
          icon={<FaTools />}
          placeholder="Przedmiot"
          value={objectInput}
          onChange={e => handleChangeInputs(e, setObjectInput)}
          required
          validText="Minimum 3 znaki"
        />
        <InputIcon
          icon={<MdBorderColor />}
          placeholder="Opis serwisu"
          value={descriptionInput}
          onChange={e => handleChangeInputs(e, setDescriptionInput)}
          required
          validText="Minimum 3 znaki"
        />
        <InputIcon
          icon={<MdAttachMoney />}
          placeholder="Koszt serwisu w zł"
          type="number"
          value={costInput}
          onChange={e => handleChangeInputs(e, setCostInput)}
          validText="Nie wymagane"
        />
        {workerHasAccessServices && (
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
            options={AllStatusService}
            value={statusValue}
            handleChange={handleChangeSelectStatus}
            placeholder="Status serwisu"
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
              onClick={handleResetAddService}
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
              isFetchToBlock
            />
          </StyleButtonAddSubmit>
        </PositionSelectAll>
      </form>
    </div>
  )
}
export default CompanyServicesAdd
