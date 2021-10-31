import React, { useState } from "react"
import styled from "styled-components"
import { MdAccountBox, MdEmail, MdLock } from "react-icons/md"
import { LinkEffect } from "@common/LinkEffect"
import { Colors } from "@common/Colors"
import ReactTooltip from "react-tooltip"
import { FaUserPlus } from "react-icons/fa"
import { ButtonIcon, InputIcon, InputPhone } from "@ui"
import { fetchRegisterUser, addAlertItem } from "@state/actions"
import { useDispatch, useSelector } from "react-redux"
import { validEmail } from "@common/Functions"

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

const RegisterContent = () => {
  const [emailInput, setEmailInput] = useState("")
  const [nameInput, setNameInput] = useState("")
  const [surnameInput, setSurnameInput] = useState("")
  const [phoneInput, setPhoneInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [repeatPasswordInput, setRepeatPasswordInput] = useState("")
  const siteProps = useSelector(state => state.siteProps)

  const dispatch = useDispatch()

  const handleChange = (e, setValue) => {
    setValue(e.target.value)
  }

  const validButtonRegistration =
    emailInput.length > 0 &&
    passwordInput.length > 5 &&
    nameInput.length >= 3 &&
    surnameInput.length >= 3 &&
    phoneInput.length >= 9 &&
    repeatPasswordInput === passwordInput

  const handleSubmit = e => {
    e.preventDefault()
    const isEmailValid = validEmail(emailInput)
    const testName = /^[a-z]+$/i.test(nameInput)
    const testSurname = /^[a-z]+$/i.test(surnameInput)
    let isPolishNumber = false
    if (phoneInput.length === 9) {
      if (Number(phoneInput.slice(0, 2)) >= 45) {
        isPolishNumber = true
      }
    }

    if (!isEmailValid) {
      dispatch(addAlertItem("Nieprawidłowy adres e-mail", "red"))
    }

    if (!testName || nameInput.length < 3) {
      dispatch(addAlertItem("Nieprawidłowe imię", "red"))
    }

    if (!testSurname || surnameInput.length < 3) {
      dispatch(addAlertItem("Nieprawidłowe nazwisko", "red"))
    }

    if (passwordInput !== repeatPasswordInput) {
      dispatch(addAlertItem("Hasła nie są identyczne", "red"))
    }

    if (passwordInput.length < 5) {
      dispatch(addAlertItem("Hasła musi być mieć minimum 5 znaków", "red"))
    }

    if (phoneInput.length < 9 || !isPolishNumber) {
      dispatch(addAlertItem("Nieprawidłowy numer telefonu", "red"))
    }

    const validOtherParams =
      isEmailValid && testName && testSurname && isPolishNumber

    if (validButtonRegistration && validOtherParams) {
      dispatch(
        fetchRegisterUser(
          emailInput,
          nameInput,
          surnameInput,
          phoneInput,
          repeatPasswordInput
        )
      )
    }
  }

  const tooltipButtonRegister = !validButtonRegistration && (
    <ReactTooltip id="alertRegistration" effect="float" multiline={true}>
      <span>Uzupełnij wszystkie dane</span>
    </ReactTooltip>
  )

  return (
    <form onSubmit={handleSubmit} id="RegistrationContent">
      <InputIcon
        icon={<MdEmail />}
        placeholder="Email"
        value={emailInput}
        type="email"
        onChange={e => handleChange(e, setEmailInput)}
        required
        validText="Jeden adres e-mail na konto"
      />
      <InputIcon
        icon={<MdAccountBox />}
        placeholder="Imię"
        value={nameInput}
        onChange={e => handleChange(e, setNameInput)}
        required
        validText="Minimum 3 znaki"
      />
      <InputIcon
        icon={<MdAccountBox />}
        placeholder="Nazwisko"
        value={surnameInput}
        onChange={e => handleChange(e, setSurnameInput)}
        required
        validText="Minimum 3 znaki"
      />
      <InputPhone setPhoneNumber={setPhoneInput} />
      <InputIcon
        icon={<MdLock />}
        placeholder="Hasło"
        value={passwordInput}
        type="password"
        onChange={e => handleChange(e, setPasswordInput)}
        required
        validText="Minimum 5 znaków"
        showPassword
      />
      <InputIcon
        icon={<MdLock />}
        placeholder="Powtórz hasło"
        value={repeatPasswordInput}
        type="password"
        onChange={e => handleChange(e, setRepeatPasswordInput)}
        required
        showPassword
        validText="Takie samo jak hasło"
      />
      <RegulationsText siteProps={siteProps}>
        Klikając w przycisk poniżej akceptujesz{" "}
        <LinkEffect text="Regulamin" path="/regulations" />
      </RegulationsText>
      <ButtonLoginRegister type="submit">
        <div data-tip data-for="alertRegistration">
          <ButtonIcon
            title="ZAREJESTRUJ KONTO"
            uppercase
            fontIconSize="24"
            icon={<FaUserPlus />}
            disabled={!validButtonRegistration}
            fontSize="16"
            isFetchToBlock
          />
        </div>
      </ButtonLoginRegister>
      {tooltipButtonRegister}
    </form>
  )
}
export default RegisterContent
