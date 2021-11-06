import React, { useEffect, useState, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchVerifiedPhone,
  changeDeleteCompanyConfirm,
  fetchSentCodeConfirmVerifiedPhone,
  fetchVerifiedEmail,
  fetchSentCodeConfirmVerifiedEmail,
  fetchDeleteVerifiedUserPhone,
  fetchDeleteVerifiedUserEmail,
} from "@state/actions"
import { ButtonIcon } from "@ui"
import { MdEmail, MdSave, MdClose, MdPhone, MdDelete } from "react-icons/md"
import { FaArrowLeft } from "react-icons/fa"
import styled from "styled-components"
import { Colors } from "@common/Colors"
import loadable from "@loadable/component"
const PinField = loadable(() => import("react-pin-field"))
import ReactTooltip from "react-tooltip"

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

const FlexResetCode = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
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

const VeryfiedPhone = ({
  siteProps,
  user,
  hadndleClickShowVeryfiedPhone,
  isBlockUserSendVerifiedPhoneSms,
  dateBlockUserSendVerifiedPhoneSms,
  isEmailVerified = false,
  isAccountVeryfied = false,
}) => {
  const [demoCompleted, setDemoCompleted] = useState(false)
  const [activeCode, setActiveCode] = useState("")
  const deleteCompanyConfirm = useSelector(state => state.deleteCompanyConfirm)
  const fieldOneRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(changeDeleteCompanyConfirm())
  }, [deleteCompanyConfirm]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDeleteVeryfiedAccount = () => {
    if (isAccountVeryfied) {
      if (isEmailVerified) {
        dispatch(fetchDeleteVerifiedUserEmail(user.token))
      } else {
        dispatch(fetchDeleteVerifiedUserPhone(user.token))
      }
    }
  }

  const handleSentAgain = () => {
    if (isEmailVerified) {
      dispatch(fetchSentCodeConfirmVerifiedEmail(user.token))
    } else {
      dispatch(fetchSentCodeConfirmVerifiedPhone(user.token))
    }
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
    if (isEmailVerified) {
      dispatch(fetchVerifiedEmail(user.token, activeCode))
    } else {
      dispatch(fetchVerifiedPhone(user.token, activeCode))
    }
  }

  const tooltipSendAgainPhoneSms = isBlockUserSendVerifiedPhoneSms && (
    <ReactTooltip id="alertChangePhoneSendSms" effect="float" multiline={true}>
      <div>
        Kod aktywacyjny można ponownie wysłać:{" "}
        {dateBlockUserSendVerifiedPhoneSms.getDate() < 10
          ? `0${dateBlockUserSendVerifiedPhoneSms.getDate()}`
          : dateBlockUserSendVerifiedPhoneSms.getDate()}
        .
        {dateBlockUserSendVerifiedPhoneSms.getMonth() + 1 < 10
          ? `0${dateBlockUserSendVerifiedPhoneSms.getMonth() + 1}`
          : dateBlockUserSendVerifiedPhoneSms.getMonth() + 1}
        .{dateBlockUserSendVerifiedPhoneSms.getFullYear()}
        {" o godzinie: "}
        {dateBlockUserSendVerifiedPhoneSms.getHours() < 10
          ? `0${dateBlockUserSendVerifiedPhoneSms.getHours()}`
          : dateBlockUserSendVerifiedPhoneSms.getHours()}
        :
        {dateBlockUserSendVerifiedPhoneSms.getMinutes() < 10
          ? `0${dateBlockUserSendVerifiedPhoneSms.getMinutes()}`
          : dateBlockUserSendVerifiedPhoneSms.getMinutes()}
      </div>
    </ReactTooltip>
  )

  return (
    <>
      <TextCodeToDelete siteProps={siteProps}>
        {isEmailVerified
          ? "Wpisz kod do weryfikacji adresu e-mail, który został wysłany na podany adres."
          : "Wpisz kod do weryfikacji telefonu, który został wysłany podany numer."}
      </TextCodeToDelete>
      <TextCodeToDelete siteProps={siteProps}>
        Kod jest ważny przez 1 godzine.
      </TextCodeToDelete>
      <FlexResetCode>
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
      </FlexResetCode>
      <ButtonsPosition>
        {tooltipSendAgainPhoneSms}
        {isAccountVeryfied && (
          <MarginButtons>
            <ButtonIcon
              title="Anuluj zmianę"
              uppercase
              fontIconSize="20"
              fontSize="16"
              icon={<MdDelete />}
              customColorButton={Colors(siteProps).dangerColorDark}
              customColorIcon={Colors(siteProps).dangerColor}
              onClick={handleDeleteVeryfiedAccount}
            />
          </MarginButtons>
        )}
        <MarginButtons data-tip data-for="alertChangePhoneSendSms">
          <ButtonIcon
            title="Wyślij kod jeszcze raz"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={isEmailVerified ? <MdEmail /> : <MdPhone />}
            onClick={handleSentAgain}
            disabled={isBlockUserSendVerifiedPhoneSms}
            isFetchToBlock
          />
        </MarginButtons>
        <MarginButtons>
          <ButtonIcon
            title="Cofnij"
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
            title={
              isEmailVerified
                ? "Weryfikuj adres e-mail"
                : "Weryfikuj numer telefonu"
            }
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<MdSave />}
            customColorButton={Colors(siteProps).successColorDark}
            customColorIcon={Colors(siteProps).successColor}
            disabled={!demoCompleted}
            onClick={handleVeryfiedPhone}
            isFetchToBlock
          />
        </MarginButtons>
      </ButtonsPosition>
    </>
  )
}
export default VeryfiedPhone
