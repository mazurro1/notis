import React, { useState } from "react"
import InputIcon from "./InputIcon"
import styled from "styled-components"
import { MdEmail, MdLock } from "react-icons/md"
import { FaFacebookF } from "react-icons/fa"
import ReactTooltip from "react-tooltip"
import { fetchLoginUser, changeRemindPasswordVisible } from "../state/actions"
import { useDispatch, useSelector } from "react-redux"
import ButtonIcon from "../components/ButtonIcon"
import { FaUser, FaQuestion } from "react-icons/fa"
import { Checkbox } from "react-input-checkbox"
import { Colors } from "../common/Colors"

const ButtonLoginRegister = styled.button`
  width: 100%;
  border: none;
  border-radius: 5px;
  background-color: white;
  margin-top: 5px;
`

const ButtonMargin = styled.div`
  margin-top: 30px;
`

const ButtonFacebook = styled.div`
  width: 100%;
  border: none;
  border-radius: 5px;
  background-color: white;
  margin-top: 5px;
`

const TextCheckbox = styled.span`
  color: ${Colors.buttonIconColor};
  padding-left: 10px;
  font-weight: 600;
  user-select: none;
`

const CheckboxStyle = styled.div`
  margin-top: 20px;
`

const LoginContent = () => {
  const [emailInput, setEmailInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [checkboxAutoLogin, setCheckboxAutoLogin] = useState(false)

  const remindPasswordVisible = useSelector(
    state => state.remindPasswordVisible
  )

  const dispatch = useDispatch()

  const handleChange = (e, setValue) => {
    setValue(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(fetchLoginUser(emailInput, passwordInput, checkboxAutoLogin))
  }

  const validButtonLogin = emailInput.length > 0 && passwordInput.length > 0

  const tooltipButtonLogin = !validButtonLogin && (
    <ReactTooltip id="alertLogin" effect="float" multiline={true}>
      <span>Uzupełnij wszystkie dane</span>
    </ReactTooltip>
  )

  const handleChangeCheckbox = () => {
    setCheckboxAutoLogin(prevState => !prevState)
  }

  const handleRemindPassword = () => {
    dispatch(changeRemindPasswordVisible(!remindPasswordVisible))
  }

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
        <CheckboxStyle>
          <Checkbox
            theme="material-checkbox"
            value={checkboxAutoLogin}
            onChange={handleChangeCheckbox}
          >
            <TextCheckbox>Zapamiętaj użytkownika</TextCheckbox>
          </Checkbox>
        </CheckboxStyle>
        <ButtonMargin>
          <ButtonIcon
            title="Przypomnij hasło"
            uppercase
            fontIconSize="20"
            fontSize="20"
            icon={<FaQuestion />}
            onClick={handleRemindPassword}
          />
        </ButtonMargin>
        <ButtonLoginRegister disabled={!validButtonLogin} type="submit">
          <div data-tip data-for="alertLogin">
            <ButtonIcon
              title="LOGOWANIE"
              uppercase
              fontIconSize="20"
              fontSize="20"
              icon={<FaUser />}
              disabled={!validButtonLogin}
            />
          </div>
        </ButtonLoginRegister>

        {tooltipButtonLogin}

        <ButtonFacebook>
          <ButtonIcon
            title="ZALOGUJ SIĘ PRZEZ FACEBOOKA"
            uppercase
            customColorButton="#0062e0"
            customColorIcon="#18acfe"
            fontIconSize="22"
            icon={<FaFacebookF />}
            disabled={validButtonLogin}
          />
        </ButtonFacebook>
      </form>
    </>
  )
}
export default LoginContent
