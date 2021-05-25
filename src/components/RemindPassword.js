import React, { useState, useRef } from "react"
import InputIcon from "./InputIcon"
import styled from "styled-components"
import { MdEmail, MdLock, MdDelete, MdDone } from "react-icons/md"
import ReactTooltip from "react-tooltip"
import {
  fetchSentEmailResetPassword,
  fetchResetPassword,
  addAlertItem,
} from "../state/actions"
import { useDispatch, useSelector } from "react-redux"
import ButtonIcon from "../components/ButtonIcon"
import PinField from "react-pin-field"
import { validEmail } from "../common/Functions"
import { Colors } from "../common/Colors"

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
  margin-left: 0;
  background-color: #eeeeee;
  font-size: 1.4rem;
  transition-property: color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:disabled {
    color: #bdbdbd;
  }
`

const TextToActivation = styled.div`
  font-family: "Poppins-Medium", sans-serif;
`

const StyleInputCode = styled.div`
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }
`

const RemindPassword = () => {
  const [emailInput, setEmailInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [activeCode, setActiveCode] = useState("")
  const [demoCompleted, setDemoCompleted] = useState(false)
  const siteProps = useSelector(state => state.siteProps)
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
    const isValidEmail = validEmail(emailInput)
    if (isValidEmail) {
      dispatch(fetchSentEmailResetPassword(emailInput))
    } else {
      dispatch(addAlertItem("Nieprawidłowy adres e-mail", "red"))
    }
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
      <TextToActivation>
        Kod do resetu hasła, który został wysłany na adres e-mail:
      </TextToActivation>
      <StyleInputCode>
        <PanFieldStyle
          ref={fieldOneRef}
          onComplete={code => {
            setActiveCode(code)
            setDemoCompleted(true)
          }}
          format={k => k.toUpperCase()}
          disabled={demoCompleted}
          length={6}
        />
      </StyleInputCode>
      <TextToActivation>UWAGA: Kod jest ważny przez 30minut</TextToActivation>
      <InputIcon
        icon={<MdLock />}
        placeholder="Nowe hasło"
        value={passwordInput}
        type="password"
        onChange={e => handleChange(e, setPasswordInput)}
        validText="Minimum 5 znaków"
        showPassword
      />
      <ButtonResetCode>
        <ButtonIcon
          title="Resetuj kod"
          uppercase
          fontIconSize="20"
          fontSize="16"
          icon={<MdDelete />}
          customColorButton={Colors(siteProps).dangerColorDark}
          customColorIcon={Colors(siteProps).dangerColor}
          onClick={handleReset}
          disabled={!demoCompleted}
        />
      </ButtonResetCode>
      <ButtonIcon
        title="Wyślij ponownie emaila z resetującym kodem"
        uppercase
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
            fontSize="16"
            icon={<MdDone />}
            disabled={!(demoCompleted && passwordInput.length >= 5)}
            onClick={handleSentResetPassword}
            customColorButton={Colors(siteProps).successColorDark}
            customColorIcon={Colors(siteProps).successColor}
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
