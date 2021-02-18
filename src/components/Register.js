import React, { useState } from "react"
import InputIcon from "./InputIcon"
import styled from "styled-components"
import { MdAccountBox, MdEmail, MdPhoneAndroid, MdLock } from "react-icons/md"
import { LinkEffect } from "../common/LinkEffect"
import { Colors } from "../common/Colors"
import ReactTooltip from "react-tooltip"
import { FaUserPlus } from "react-icons/fa"
import ButtonIcon from "./ButtonIcon"
import { fetchRegisterUser } from "../state/actions"
import { useDispatch, useSelector } from "react-redux"

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

  const handleSubmit = e => {
    e.preventDefault()
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

  const validButtonRegistration =
    emailInput.length > 0 &&
    passwordInput.length > 0 &&
    nameInput.length > 0 &&
    surnameInput.length > 0 &&
    phoneInput.length > 0 &&
    repeatPasswordInput === passwordInput

  const tooltipButtonRegister = !validButtonRegistration && (
    <ReactTooltip id="alertRegistration" effect="float" multiline={true}>
      <span>Uzupełnij wszystkie dane</span>
    </ReactTooltip>
  )

  return (
    <form onSubmit={handleSubmit}>
      <InputIcon
        icon={<MdEmail />}
        placeholder="Email"
        value={emailInput}
        type="email"
        onChange={e => handleChange(e, setEmailInput)}
        required
      />
      <InputIcon
        icon={<MdAccountBox />}
        placeholder="Imię"
        value={nameInput}
        onChange={e => handleChange(e, setNameInput)}
        required
      />
      <InputIcon
        icon={<MdAccountBox />}
        placeholder="Nazwisko"
        value={surnameInput}
        onChange={e => handleChange(e, setSurnameInput)}
        required
      />
      <InputIcon
        icon={<MdPhoneAndroid />}
        placeholder="Numer telefonu"
        value={phoneInput}
        type="number"
        onChange={e => handleChange(e, setPhoneInput)}
        required
      />
      {/* <InputIcon
        icon={<FaCalendarDay />}
        placeholder="Dzień urodzenia"
        value={dateBirth}
        type="number"
        onChange={e => handleChange(e, setDateBirth)}
        required
      />
      <InputIcon
        icon={<FaCalendar />}
        placeholder="Miesiąc urodzenia"
        value={monthBirth}
        type="number"
        onChange={e => handleChange(e, setMonthBirth)}
        required
      /> */}
      <InputIcon
        icon={<MdLock />}
        placeholder="Hasło"
        value={passwordInput}
        type="password"
        onChange={e => handleChange(e, setPasswordInput)}
        required
      />
      <InputIcon
        icon={<MdLock />}
        placeholder="Powtórz hasło"
        value={repeatPasswordInput}
        type="password"
        onChange={e => handleChange(e, setRepeatPasswordInput)}
        required
      />
      <RegulationsText siteProps={siteProps}>
        Klikając w przycisk poniżej akceptujesz{" "}
        <LinkEffect text="Regulamin" path="/regulations" />
      </RegulationsText>
      <ButtonLoginRegister disabled={!validButtonRegistration} type="submit">
        <div data-tip data-for="alertRegistration">
          <ButtonIcon
            title="ZAREJESTRUJ KONTO"
            uppercase
            fontIconSize="24"
            icon={<FaUserPlus />}
            disabled={!validButtonRegistration}
            fontSize="16"
          />
        </div>
      </ButtonLoginRegister>
      {tooltipButtonRegister}
    </form>
  )
}
export default RegisterContent
