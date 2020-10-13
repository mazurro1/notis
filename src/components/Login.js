import React, { useState } from "react"
import InputIcon from "./InputIcon"
import styled from "styled-components"
import { MdEmail, MdLock } from "react-icons/md"
import { FaFacebookF } from "react-icons/fa"
import ReactTooltip from "react-tooltip"
import {fetchLoginUser} from '../state/actions'
import { useDispatch } from "react-redux"
import ButtonIcon from "../components/ButtonIcon"
import { FaUser } from "react-icons/fa"

const ButtonLoginRegister = styled.button`
  width: 100%;
  border: none;
  border-radius: 5px;
  background-color: white;
  margin-top: 30px;
`

const ButtonFacebook = styled.div`
  width: 100%;
  border: none;
  border-radius: 5px;
  background-color: white;
  margin-top: 5px;
`



const LoginContent = () => {
  const [emailInput, setEmailInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")

  const dispatch = useDispatch();

  const handleChange = (e, setValue) => {
    setValue(e.target.value)
  }

   const handleSubmit = (e) =>  {
    e.preventDefault()
      dispatch(fetchLoginUser(emailInput, passwordInput))
  }

  const validButtonLogin = emailInput.length > 0 && passwordInput.length > 0

  const tooltipButtonLogin = !validButtonLogin && (
    <ReactTooltip id="alertLogin" effect="float" multiline={true}>
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
          <div data-tip data-for="alertLogin">
            <ButtonIcon title="LOGOWANIE" uppercase fontIconSize="20" fontSize="20" icon={<FaUser />} disabled={!validButtonLogin}/>
          </div>
        </ButtonLoginRegister>

        {tooltipButtonLogin}

        <ButtonFacebook>
            <ButtonIcon title="ZALOGUJ SIĘ PRZEZ FACEBOOKA" uppercase customColorButton="#0062e0" customColorIcon="#18acfe" fontIconSize="22" icon={<FaFacebookF />} disabled={validButtonLogin}/>
        </ButtonFacebook>
      </form>
    </>
  )
}
export default LoginContent
