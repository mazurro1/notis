import React, { useState } from "react"
import InputIcon from "./InputIcon"
import styled from "styled-components"
import {
  MdAccountBox,
  MdEmail,
  MdLocationOn,
  MdWork,
  MdLocationCity,
} from "react-icons/md"
import { FaMapSigns } from "react-icons/fa"
import SelectCreated from "./SelectCreated"
import { LinkEffect } from "../common/LinkEffect"
import { Colors } from "../common/Colors"
import ReactTooltip from "react-tooltip"
import ButtonIcon from "./ButtonIcon"
import { fetchCompanyRegistration, addAlertItem } from "../state/actions"
import { useDispatch, useSelector } from "react-redux"
import { AllIndustries } from "../common/AllIndustries"
import InputPhone from "./InputPhone"
import { validEmail } from "../common/Functions"

const ButtonLoginRegister = styled.button`
  width: 100%;
  border: none;
  border-radius: 5px;
  background-color: white;
  margin-top: 30px;
`

const RegulationsText = styled.div`
  color: #bdbdbd;
  font-size: 0.85rem;
  text-align: center;
  margin-top: 20px;
  a {
    color: ${props => Colors(props.siteProps).primaryColor};
    transition-property: color;
    transition-duration: 0.3s;
    transition-timing-function: ease;
    &:hover {
      color: ${props => Colors(props.siteProps).primaryColorDark};
    }
  }
`

const SelectStyles = styled.div`
  margin-bottom: 10px;
`

const CreateCompany = ({ user, siteProps }) => {
  const [industries, setIndustries] = useState([])
  const [emailInput, setEmailInput] = useState("")
  const [nameInput, setNameInput] = useState("")
  const [nipInput, setNipInput] = useState("")
  const [phoneInput, setPhoneInput] = useState("")
  const [cityInput, setCityInput] = useState("")
  const [codeInput, setCodeInput] = useState("")
  const [discrictInput, setDiscrictInput] = useState("")
  const [adressInput, setAdressInput] = useState("")

  const dispatch = useDispatch()

  const handleChange = (e, setValue) => {
    setValue(e.target.value)
  }

  const validButtonRegisterCompany =
    emailInput.length > 0 &&
    nameInput.length >= 3 &&
    nipInput.length === 10 &&
    phoneInput.length >= 7 &&
    cityInput.length >= 3 &&
    codeInput.length >= 5 &&
    discrictInput.length >= 3 &&
    adressInput.length >= 3 &&
    industries.length > 0

  const handleSubmit = e => {
    e.preventDefault()
    const isEmailValid = validEmail(emailInput)
    if (validButtonRegisterCompany && isEmailValid) {
      const mapedIndustries = industries.map(item => item.value)
      dispatch(
        fetchCompanyRegistration(
          emailInput,
          nameInput,
          phoneInput,
          cityInput,
          discrictInput,
          adressInput,
          user.token,
          user.userId,
          mapedIndustries,
          nipInput,
          codeInput
        )
      )
    } else {
      if (!isEmailValid) {
        dispatch(addAlertItem("Nieprawidłowy adres e-mail", "red"))
      }
      if (nameInput.length < 3) {
        dispatch(addAlertItem("Nazwa firmy jest za krótka", "red"))
      }
      if (nipInput.length < 10) {
        dispatch(addAlertItem("Nieprawidłowy numer nip", "red"))
      }
      if (phoneInput.length < 7) {
        dispatch(addAlertItem("Nieprawidłowy numer telefonu", "red"))
      }
      if (cityInput.length < 3) {
        dispatch(addAlertItem("Nieprawidłowa miejscowość", "red"))
      }
      if (codeInput.length < 5) {
        dispatch(addAlertItem("Nieprawidłowy kod pocztowy", "red"))
      }
      if (discrictInput.length < 3) {
        dispatch(addAlertItem("Nieprawidłowa dzielnica", "red"))
      }
      if (adressInput.length < 3) {
        dispatch(addAlertItem("Nieprawidłowy aders", "red"))
      }
      if (industries.length === 0) {
        dispatch(addAlertItem("Nie zaznaczono typu działalności", "red"))
      }
    }
  }

  const handleChangeIndustries = value => {
    const allValues = value ? value : []
    setIndustries(allValues)
  }

  let userVeryfiedPhone = false
  if (!!user) {
    if (!!user.phoneVerified) {
      userVeryfiedPhone = user.phoneVerified
    }
  }

  const tooltipButtonRegister = !validButtonRegisterCompany && (
    <ReactTooltip id="alertRegistration" effect="float" multiline={true}>
      {!userVeryfiedPhone ? (
        <span>Zweryfikuj numer telefonu aby stworzyć konto firmowe</span>
      ) : (
        <span>Uzupełnij wszystkie dane</span>
      )}
    </ReactTooltip>
  )

  return (
    <form onSubmit={handleSubmit}>
      <SelectStyles>
        <SelectCreated
          options={AllIndustries[siteProps.language]}
          value={industries}
          handleChange={handleChangeIndustries}
          placeholder="Typ działalności"
          defaultMenuIsOpen={false}
          widthAuto
          isMulti
          isClearable={false}
          darkSelect
          onlyText
          width="350px"
        />
      </SelectStyles>
      <InputIcon
        icon={<MdEmail />}
        placeholder="Email firmowy"
        value={emailInput}
        type="email"
        onChange={e => handleChange(e, setEmailInput)}
        required
        validText="Jeden adres e-mail na konto firmowe, może być taki sam jak e-mail użytkownika"
      />
      <InputIcon
        icon={<MdAccountBox />}
        placeholder="Nazwa firmy"
        type="text"
        value={nameInput}
        onChange={e => handleChange(e, setNameInput)}
        required
        validText="Minimum 3 znaki"
      />
      <InputIcon
        icon={<MdAccountBox />}
        placeholder="Nip firmy"
        type="number"
        value={nipInput}
        onChange={e => handleChange(e, setNipInput)}
        required
        validText="10 znaków"
      />
      <InputIcon
        icon={<MdLocationCity />}
        placeholder="Miejscowość"
        value={cityInput}
        type="text"
        onChange={e => handleChange(e, setCityInput)}
        required
        validText="Minimum 3 znaki"
      />
      <InputIcon
        icon={<MdLocationCity />}
        placeholder="Kod pocztowy"
        value={codeInput}
        type="text"
        onChange={e => handleChange(e, setCodeInput)}
        required
        validText="Minimum 5 znaków"
      />
      <InputIcon
        icon={<FaMapSigns />}
        placeholder="Dzielnica"
        value={discrictInput}
        type="text"
        onChange={e => handleChange(e, setDiscrictInput)}
        required
        validText="Minimum 3 znaki"
      />
      <InputIcon
        icon={<MdLocationOn />}
        placeholder="Adres firmy"
        value={adressInput}
        type="text"
        onChange={e => handleChange(e, setAdressInput)}
        required
        validText="Minimum 3 znaki"
      />
      <InputPhone setPhoneNumber={setPhoneInput} />
      <RegulationsText siteProps={siteProps}>
        Klikając w przycisk poniżej akceptujesz{" "}
        <LinkEffect text="Regulamin" path="/regulations" />
      </RegulationsText>
      <ButtonLoginRegister type="submit">
        <div data-tip data-for="alertRegistration">
          <ButtonIcon
            title="ZAREJESTRUJ FIRMĘ"
            uppercase
            fontIconSize="20"
            icon={<MdWork />}
            disabled={!validButtonRegisterCompany || !userVeryfiedPhone}
            fontSize="16"
          />
        </div>
      </ButtonLoginRegister>
      {tooltipButtonRegister}
    </form>
  )
}
export default CreateCompany
