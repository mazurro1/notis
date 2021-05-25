import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchDeleteAccount,
  changeDeleteCompanyConfirm,
  fetchSentCodeConfirmDeleteAccount,
} from "../state/actions"
import ButtonIcon from "../components/ButtonIcon"
import { MdEmail, MdDelete, MdClose } from "react-icons/md"
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

const DeleteAccount = ({
  siteProps,
  user,
  hadndleClickShowDeleteComponent,
}) => {
  const [demoCompleted, setDemoCompleted] = useState(false)
  const [activeCode, setActiveCode] = useState("")
  const deleteCompanyConfirm = useSelector(state => state.deleteCompanyConfirm)
  const fieldOneRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSentCodeConfirmDeleteAccount(user.token))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(changeDeleteCompanyConfirm())
    navigate("/")
  }, [deleteCompanyConfirm]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSentAgain = () => {
    dispatch(fetchSentCodeConfirmDeleteAccount(user.token))
  }
  const handleGoBack = () => {
    hadndleClickShowDeleteComponent()
  }

  const handleReset = () => {
    fieldOneRef.current.forEach(input => (input.value = ""))
    setActiveCode("")
    setDemoCompleted(false)
  }

  const handleDeleteACcount = () => {
    dispatch(fetchDeleteAccount(user.token, activeCode))
  }

  return (
    <>
      <TextCodeToDelete siteProps={siteProps}>
        Wpisz kod do usunięcia konta, który został wysłany na adres e-mail.
      </TextCodeToDelete>
      <TextCodeToDelete siteProps={siteProps}>
        Kod jest ważny przez 30minut.
      </TextCodeToDelete>
      <TextCodeToDelete siteProps={siteProps}>
        Usunięcie konta spowoduje odwołanie wszystkich aktywnych wizyt oraz
        wszystkich Twoich danych.
      </TextCodeToDelete>
      <PanFieldStyle
        ref={fieldOneRef}
        onComplete={code => {
          setActiveCode(code)
          setDemoCompleted(true)
        }}
        format={k => k.toUpperCase()}
        disabled={demoCompleted}
        length={10}
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
            customColorButton={Colors(siteProps).successColorDark}
            customColorIcon={Colors(siteProps).successColor}
            onClick={handleGoBack}
          />
        </MarginButtons>
        <MarginButtons>
          <ButtonIcon
            title="Usuń konto"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<MdDelete />}
            customColorButton={Colors(siteProps).dangerColorDark}
            customColorIcon={Colors(siteProps).dangerColor}
            disabled={!demoCompleted}
            onClick={handleDeleteACcount}
          />
        </MarginButtons>
      </ButtonsPosition>
    </>
  )
}
export default DeleteAccount
