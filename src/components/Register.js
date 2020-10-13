import React, { useState } from "react"
import InputIcon from "./InputIcon"
import styled from "styled-components"
import { MdAccountBox, MdEmail, MdPhoneAndroid, MdLock } from "react-icons/md"
import { LinkEffect } from "../common/LinkEffect"
import { Colors } from "../common/Colors"
import ReactTooltip from "react-tooltip"
import { FaUserPlus } from "react-icons/fa"
import ButtonIcon from './ButtonIcon'

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
    color: ${Colors.buttonIconColor};
    transition-property: color;
    transition-duration: 0.3s;
    transition-timing-function: ease;
    &:hover {
      color: ${Colors.buttonColor};
    }
  }
`

const RegisterContent = () => {
  const [emailInput, setEmailInput] = useState("")
  const [nameInput, setNameInput] = useState("")
  const [phoneInput, setPhoneInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [repeatPasswordInput, setRepeatPasswordInput] = useState("")

  const handleChange = (e, setValue) => {
    setValue(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log("submit")
  }

  const validButtonRegistration =
    emailInput.length > 0 &&
    passwordInput.length > 0 &&
    nameInput.length > 0 &&
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
      />
      <InputIcon
        icon={<MdAccountBox />}
        placeholder="Imię i Nazwisko"
        value={nameInput}
        onChange={e => handleChange(e, setNameInput)}
        maxlength="9"
      />
      <InputIcon
        icon={<MdPhoneAndroid />}
        placeholder="Numer telefonu"
        value={phoneInput}
        type="number"
        onChange={e => handleChange(e, setPhoneInput)}
      />
      <InputIcon
        icon={<MdLock />}
        placeholder="Hasło"
        value={passwordInput}
        type="password"
        onChange={e => handleChange(e, setPasswordInput)}
      />
      <InputIcon
        icon={<MdLock />}
        placeholder="Powtórz hasło"
        value={repeatPasswordInput}
        type="password"
        onChange={e => handleChange(e, setRepeatPasswordInput)}
      />
      <RegulationsText>
        Klikając w przycisk poniżej akceptujesz{" "}
        <LinkEffect text="Regulamin" path="/regulations" />
      </RegulationsText>
      {/* <ButtonLoginRegister disabled={!validButtonRegistration} type="submit">
        <PaddingText data-tip data-for="happyFace">
          ZAREJESTRUJ KONTO
        </PaddingText>
      </ButtonLoginRegister> */}
      <ButtonLoginRegister disabled={!validButtonRegistration} type="submit">
          <div data-tip data-for="alertRegistration">
            <ButtonIcon title="LOGOWANIE" uppercase fontIconSize="24" icon={<FaUserPlus />} disabled={!validButtonRegistration} fontSize="20"/>
          </div>
        </ButtonLoginRegister>
      {tooltipButtonRegister}
    </form>
  )
}
export default RegisterContent
