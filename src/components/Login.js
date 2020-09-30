import React, { useState } from "react"
import InputIcon from "./InputIcon"
import styled from "styled-components"
import { MdEmail, MdLock } from "react-icons/md"
import { FaFacebookF } from "react-icons/fa"
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

const ButtonFacebook = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  position: relative;
  width: 100%;
  border: none;
  border-radius: 5px;
  background-color: #48a6dd;
  color: white;
  padding: 10px 15px;
  font-size: 1.2rem;
  margin-top: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 700;
  padding-left: 35px;
  /* text-align: center; */
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #3060ab;
  }
`

const FacebookIcon = styled.div`
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  font-size: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const LoginContent = () => {
  const [emailInput, setEmailInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")

  const handleChange = (e, setValue) => {
    setValue(e.target.value)
  }

  const handleSubmit = () => {
    console.log("submit")
    const emailValid = emailInput.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
    console.log(emailValid)
  }

  const validButtonLogin = emailInput.length > 0 && passwordInput.length > 0

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
        icon={<MdLock />}
        placeholder="Hasło"
        value={passwordInput}
        type="password"
        onChange={e => handleChange(e, setPasswordInput)}
      />
      <ButtonLoginRegister disabled={!validButtonLogin} type="submit">
        LOGOWANIE
      </ButtonLoginRegister>
      <ButtonFacebook>
        ZALOGUJ SIĘ PRZEZ FACEBOOKA
        <FacebookIcon>
          <FaFacebookF />
        </FacebookIcon>
      </ButtonFacebook>
    </form>
  )
}
export default LoginContent
