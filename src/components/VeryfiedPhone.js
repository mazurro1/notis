import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchVerifiedPhone,
  changeDeleteCompanyConfirm,
  fetchSentCodeConfirmVerifiedPhone,
} from "../state/actions"
import ButtonIcon from "../components/ButtonIcon"
import { MdEmail, MdSave, MdClose } from "react-icons/md"
import { FaArrowLeft } from "react-icons/fa"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import PinField from "react-pin-field"
import { navigate } from "gatsby"

const ButtonsPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
`

const MarginButtons = styled.div`
  margin: 5px;
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

const TextCodeToDelete = styled.div`
  color: ${props => Colors(props.siteProps).textNormalBlack};
`

const VeryfiedPhone = ({ siteProps, user, hadndleClickShowVeryfiedPhone }) => {
  const [demoCompleted, setDemoCompleted] = useState(false)
  const [activeCode, setActiveCode] = useState("")
  const deleteCompanyConfirm = useSelector(state => state.deleteCompanyConfirm)
  const fieldOneRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSentCodeConfirmVerifiedPhone(user.token))
  }, [])

  useEffect(() => {
    dispatch(changeDeleteCompanyConfirm())
  }, [deleteCompanyConfirm])

  const handleSentAgain = () => {
    dispatch(fetchSentCodeConfirmVerifiedPhone(user.token))
  }
  const handleGoBack = () => {
    hadndleClickShowVeryfiedPhone()
  }

  const handleReset = () => {
    fieldOneRef.current.forEach(input => (input.value = ""))
    setActiveCode("")
    setDemoCompleted(false)
  }

  const handleVeryfiedPhone = () => {
    dispatch(fetchVerifiedPhone(user.token, activeCode))
  }

  return (
    <>
      <TextCodeToDelete siteProps={siteProps}>
        Wpisz kod do weryfikacji telefonu, który został wysłany na e-maila /
        numer telefonu.
      </TextCodeToDelete>
      <TextCodeToDelete siteProps={siteProps}>
        Kod jest ważny przez 10minut.
      </TextCodeToDelete>
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

      <ButtonsPosition>
        <MarginButtons>
          <ButtonIcon
            title="Resetuj kod"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<MdClose />}
            onClick={handleReset}
          />
        </MarginButtons>
        <MarginButtons>
          <ButtonIcon
            title="Wyślij kod jeszcze raz"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<MdEmail />}
            onClick={handleSentAgain}
          />
        </MarginButtons>
        <MarginButtons>
          <ButtonIcon
            title="Anuluj"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<FaArrowLeft />}
            customColorButton={Colors(siteProps).dangerColorDark}
            customColorIcon={Colors(siteProps).dangerColor}
            onClick={handleGoBack}
          />
        </MarginButtons>
        <MarginButtons>
          <ButtonIcon
            title="Weryfikuj numer telefonu"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<MdSave />}
            customColorButton={Colors(siteProps).successColorDark}
            customColorIcon={Colors(siteProps).successColor}
            disabled={!demoCompleted}
            onClick={handleVeryfiedPhone}
          />
        </MarginButtons>
      </ButtonsPosition>
    </>
  )
}
export default VeryfiedPhone
