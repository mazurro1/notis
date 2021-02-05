import React, { useState } from "react"
import InputIcon from "./InputIcon"
import styled from "styled-components"
import { MdEmail, MdLock } from "react-icons/md"
import { FaFacebookF } from "react-icons/fa"
import ReactTooltip from "react-tooltip"
import {
  fetchLoginUser,
  changeRemindPasswordVisible,
  fetchLoginFacebook,
} from "../state/actions"
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
  color: ${props => Colors(props.siteProps).primaryColor};
  padding-left: 10px;
  font-weight: 600;
  user-select: none;
`

const CheckboxStyle = styled.div`
  margin-top: 20px;

  .material-checkbox__input:checked + .material-checkbox__image {
    background-color: ${props => Colors(props.siteProps).primaryColor};
  }

  span {
    color: ${props => Colors(props.siteProps).textNormalBlack};
    border-color: ${props => Colors(props.siteProps).textNormalBlack};
  }
`

const LoginContent = () => {
  const [emailInput, setEmailInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [checkboxAutoLogin, setCheckboxAutoLogin] = useState(false)
  const siteProps = useSelector(state => state.siteProps)

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

  const handleLoginFacebook = () => {
    dispatch(fetchLoginFacebook())
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
        <CheckboxStyle siteProps={siteProps}>
          <Checkbox
            theme="material-checkbox"
            value={checkboxAutoLogin}
            onChange={handleChangeCheckbox}
          >
            <TextCheckbox siteProps={siteProps}>
              Zapamiętaj użytkownika
            </TextCheckbox>
          </Checkbox>
        </CheckboxStyle>
        <ButtonMargin>
          <ButtonIcon
            title="Przypomnij hasło"
            uppercase
            fontIconSize="20"
            fontSize="16"
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
              fontSize="16"
              icon={<FaUser />}
              disabled={!validButtonLogin}
            />
          </div>
        </ButtonLoginRegister>

        {tooltipButtonLogin}

        <ButtonFacebook>
          <a href="http://localhost:3000/auth/facebook">
            <ButtonIcon
              title="ZALOGUJ SIĘ PRZEZ FACEBOOKA"
              uppercase
              customColorButton="#0062e0"
              customColorIcon="#18acfe"
              fontIconSize="16"
              fontSize="16"
              icon={<FaFacebookF />}
              disabled={validButtonLogin}
              // onClick={handleLoginFacebook}
            />
          </a>
        </ButtonFacebook>
      </form>
    </>
  )
}
export default LoginContent
