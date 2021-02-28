import React, { useRef, useState } from "react"
import styled from "styled-components"
import PinField from "react-pin-field"
import ButtonIcon from "./ButtonIcon"
import { MdDelete, MdEmail, MdCheck } from "react-icons/md"
import {
  fetchSentAgainActivedEmail,
  fetchActiveAccount,
} from "../state/actions"
import { useDispatch, useSelector } from "react-redux"
import ReactTooltip from "react-tooltip"
import { Colors } from "../common/Colors"

const BackgroundContent = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 5px;
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

const ButtonsUnder = styled.div`
  width: 100%;
  padding: 10px;
  margin-top: 30px;
`

const MarginBottom = styled.div`
  margin-top: 5px;
`

const ActiveAccount = () => {
  const [demoCompleted, setDemoCompleted] = useState(false)
  const [activeCode, setActiveCode] = useState("")
  const user = useSelector(state => state.user)
  const siteProps = useSelector(state => state.siteProps)
  const fieldOneRef = useRef(null)

  const dispatch = useDispatch()

  const handleReset = () => {
    fieldOneRef.current.forEach(input => (input.value = ""))
    setActiveCode("")
    setDemoCompleted(false)
  }

  const handleSentAgain = () => {
    dispatch(fetchSentAgainActivedEmail(user.token))
  }

  const handleActiveAccount = () => {
    dispatch(fetchActiveAccount(activeCode, user.token, user.userId))
  }

  const tooltipActive = activeCode.length === 0 && (
    <ReactTooltip id="alertActive" effect="float" multiline={true}>
      <span>Uzupełnij kod aktywacyjny, który otrzymałeś na adres email.</span>
    </ReactTooltip>
  )

  return (
    <BackgroundContent>
      {tooltipActive}
      <TextToActivation>
        Kod do aktywacji, który został wysłany na adres e-mail:
      </TextToActivation>
      <div>
        <PanFieldStyle
          ref={fieldOneRef}
          onComplete={code => {
            setActiveCode(code)
            setDemoCompleted(true)
          }}
          format={k => k.toUpperCase()}
          disabled={demoCompleted}
          validate={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
        />
      </div>
      <ButtonsUnder>
        <ButtonIcon
          title="Resetuj pola"
          uppercase
          fontIconSize="20"
          fontSize="16"
          icon={<MdDelete />}
          customColorButton={Colors(siteProps).dangerColorDark}
          customColorIcon={Colors(siteProps).dangerColor}
          onClick={handleReset}
          disabled={!activeCode.length > 0}
        />
        <MarginBottom>
          <ButtonIcon
            title="Wyślij kod jeszcze raz"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<MdEmail />}
            onClick={handleSentAgain}
          />
        </MarginBottom>
        <MarginBottom>
          <div data-tip data-for="alertActive">
            <ButtonIcon
              title="Aktywuj konto"
              uppercase
              fontIconSize="20"
              fontSize="16"
              icon={<MdCheck />}
              onClick={handleActiveAccount}
              disabled={activeCode.length === 0}
              customColorButton={Colors(siteProps).successColorDark}
              customColorIcon={Colors(siteProps).successColor}
            />
          </div>
        </MarginBottom>
      </ButtonsUnder>
    </BackgroundContent>
  )
}
export default ActiveAccount
