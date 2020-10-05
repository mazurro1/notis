import React, { useState, useEffect } from "react"
import InputIcon from "./InputIcon"
import styled from "styled-components"
import { MdEmail, MdLock } from "react-icons/md"
import { FaFacebookF } from "react-icons/fa"
import { Colors } from "../common/Colors"
import ReactTooltip from "react-tooltip"

const PaddingText = styled.div`
  padding: 10px 15px;
`

const ButtonLoginRegister = styled.button`
  width: 100%;
  border: none;
  border-radius: 5px;
  background-color: ${Colors.buttonColor};
  color: white;
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

const ButtonFacebook = styled.button`
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

  &:disabled {
    background-color: #bdbdbd;

    &:hover {
      background-color: #bdbdbd;
    }
  }

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

  const handleSubmit = e => {
    e.preventDefault()
    console.log("submit")
  }

  const validButtonLogin = emailInput.length > 0 && passwordInput.length > 0

  const tooltipButtonLogin = !validButtonLogin && (
    <ReactTooltip id="happyFace" effect="float" multiline={true}>
      <span>Uzupełnij wszystkie dane</span>
    </ReactTooltip>
  )

  return (
    <>
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
          <PaddingText data-tip data-for="happyFace">
            LOGOWANIE
          </PaddingText>
        </ButtonLoginRegister>

        {tooltipButtonLogin}

        <ButtonFacebook disabled={validButtonLogin}>
          ZALOGUJ SIĘ PRZEZ FACEBOOKA
          <FacebookIcon>
            <FaFacebookF />
          </FacebookIcon>
        </ButtonFacebook>
      </form>
    </>
  )
}
export default LoginContent
