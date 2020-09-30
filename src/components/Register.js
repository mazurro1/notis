import React, { useState } from "react"
import InputIcon from "./InputIcon"
import styled from "styled-components"
import { MdAccountBox, MdEmail, MdPhoneAndroid, MdLock } from "react-icons/md"
import { LinkEffect } from "../common/LinkEffect"
import { Colors } from "../common/Colors"

const ButtonLoginRegister = styled.button`
  width: 100%;
  border: none;
  border-radius: 5px;
  background-color: ${Colors.buttonColor};
  color: white;
  padding: 10px 15px;
  font-size: 1.2rem;
  margin-top: 30px;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:disabled {
    background-color: #bdbdbd;

    &:hover {
      background-color: #bdbdbd;
    }
  }

  &:hover {
    background-color: ${Colors.buttonIconColor};
  }
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

  const handleSubmit = () => {
    console.log("submit")
  }

  const validButtonRegistration =
    emailInput.length > 0 &&
    passwordInput.length > 0 &&
    nameInput.length > 0 &&
    phoneInput.length > 0 &&
    repeatPasswordInput === passwordInput

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
      <ButtonLoginRegister disabled={!validButtonRegistration} type="submit">
        ZAREJESTRUJ KONTO
      </ButtonLoginRegister>
    </form>
  )
}
export default RegisterContent
