import React, { useState, useRef } from "react"
import InputIcon from "./InputIcon"
import styled from "styled-components"
import { MdEmail, MdLock, MdClose, MdDone } from "react-icons/md"
import ReactTooltip from "react-tooltip"
import {
  fetchSentEmailResetPassword,
  fetchResetPassword,
} from "../state/actions"
import { useDispatch, useSelector } from "react-redux"
import ButtonIcon from "../components/ButtonIcon"
import PinField from "react-pin-field"

const ButtonLoginRegister = styled.button`
  width: 100%;
  border: none;
  border-radius: 5px;
  background-color: white;
  margin-top: 5px;
`

const ButtonResetCode = styled.div`
  margin-top: 30px;
  margin-bottom: 5px;
`

const ButtonMargin = styled.div`
  margin-top: 30px;
`

const PanFieldStyle = styled(PinField)`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  border: none;
  outline: none;
  text-align: center;
  margin: 10px;
  background-color: #eeeeee;
  font-size: 1.4rem;
  transition-property: color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:disabled {
    color: #bdbdbd;
  }
`

const RemindPassword = () => {
  const [emailInput, setEmailInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [activeCode, setActiveCode] = useState("")
  const [demoCompleted, setDemoCompleted] = useState(false)
  const fieldOneRef = useRef(null)

  const remindPasswordEmailSent = useSelector(
    state => state.remindPasswordEmailSent
  )

  const dispatch = useDispatch()

  const handleChange = (e, setValue) => {
    setValue(e.target.value)
  }

  const validButtonLogin = emailInput.length > 0 && passwordInput.length > 0

  const tooltipButtonLogin = !validButtonLogin && (
    <ReactTooltip id="alertLogin" effect="float" multiline={true}>
      <span>Uzupełnij wszystkie dane</span>
    </ReactTooltip>
  )

  const tooltipButtonSentEmail = !emailInput.length > 0 && (
    <ReactTooltip id="alertSentEmail" effect="float" multiline={true}>
      <span>Uzupełnij wszystkie dane</span>
    </ReactTooltip>
  )

  const handleSentEmailReset = () => {
    dispatch(fetchSentEmailResetPassword(emailInput))
  }

  const handleReset = () => {
    fieldOneRef.current.forEach(input => (input.value = ""))
    setActiveCode("")
    setDemoCompleted(false)
  }

  const handleSentResetPassword = () => {
    if (demoCompleted && passwordInput.length >= 6) {
      dispatch(fetchResetPassword(emailInput, passwordInput, activeCode))
    }
  }

  const renderContent = remindPasswordEmailSent ? (
    <>
      <PanFieldStyle
        ref={fieldOneRef}
        onComplete={code => {
          setActiveCode(code)
          setDemoCompleted(true)
        }}
        format={k => k.toUpperCase()}
        disabled={demoCompleted}
      />
      <InputIcon
        icon={<MdLock />}
        placeholder="Nowe hasło"
        value={passwordInput}
        type="password"
        onChange={e => handleChange(e, setPasswordInput)}
      />
      <ButtonResetCode>
        <ButtonIcon
          title="Resetuj kod"
          uppercase
          fontIconSize="20"
          fontSize="16"
          icon={<MdClose />}
          buttonBgDark
          onClick={handleReset}
          disabled={!demoCompleted}
        />
      </ButtonResetCode>
      <ButtonIcon
        title="Wyślij ponownie emaila z resetującym kodem"
        uppercase
        buttonBgDark
        fontIconSize="20"
        fontSize="16"
        icon={<MdEmail />}
        onClick={handleSentEmailReset}
      />
      <ButtonLoginRegister disabled={!validButtonLogin} type="submit">
        <div data-tip data-for="alertLogin">
          <ButtonIcon
            title="Zapisz zmiany"
            uppercase
            fontIconSize="20"
            fontSize="20"
            icon={<MdDone />}
            disabled={!(demoCompleted && passwordInput.length >= 6)}
            onClick={handleSentResetPassword}
          />
        </div>
      </ButtonLoginRegister>
      {tooltipButtonLogin}
    </>
  ) : (
    <>
      <InputIcon
        icon={<MdEmail />}
        placeholder="Email"
        value={emailInput}
        type="email"
        onChange={e => handleChange(e, setEmailInput)}
      />

      <ButtonMargin>
        <div data-tip data-for="alertSentEmail">
          <ButtonIcon
            title="Wyślij wiadomość email z kodem resetującym hasło"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<MdEmail />}
            disabled={!emailInput.length > 0}
            onClick={handleSentEmailReset}
          />
        </div>
      </ButtonMargin>
      {tooltipButtonSentEmail}
    </>
  )

  return <>{renderContent}</>
}
export default RemindPassword
