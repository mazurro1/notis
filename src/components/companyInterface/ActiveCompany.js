import React, { useRef, useState } from "react"
import styled from "styled-components"
import PinField from "react-pin-field"
import { ButtonIcon, Popup } from "@ui"
import { MdClose, MdCheck, MdEmail, MdDelete, MdPhone } from "react-icons/md"
import {
  fetchActiveCompanyAccount,
  fetchSentAgainCompanyActivedEmail,
  fetchConfirmDeleteCreatedCompany,
  fetchSentAgainCompanyActivedPhone,
  fetchActiveCompanyAccountPhone,
  fetchCancelUpdateCompanyPhone,
  fetchUpdateCompanyPhoneVeryfiedCode,
  fetchSentAgainCompanyActivedNewPhone,
  fetchCancelUpdateCompanyEmail,
  fetchSentAgainCompanyActivedNewEmail,
  fetchUpdateCompanyEmailVeryfiedCode,
} from "@state/actions"
import { useDispatch, useSelector } from "react-redux"
import ReactTooltip from "react-tooltip"
import { Colors } from "@common/Colors"

const BackgroundContent = styled.div`
  position: relative;
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }
`

const PanFieldStyle = styled(PinField)`
  width: 40px;
  height: 40px;
  border-radius: 5px;
  border: none;
  outline: none;
  text-align: center;
  margin: 5px;
  background-color: #eeeeee;
  font-size: 1.4rem;
  transition-property: color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:disabled {
    color: #bdbdbd;
  }
`

const ButtonsUnder = styled.div`
  width: 100%;
  padding: 10px;
  margin-top: 30px;
`

const MarginBottom = styled.div`
  margin-top: 5px;
`

const MarginButtons = styled.div`
  margin: 5px;
`

const TextToActivation = styled.div`
  font-family: "Poppins-Medium", sans-serif;
`

const SaveUserButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const ActiveCompany = ({
  smsToConfirm = false,
  isBlockUserSendVerifiedPhoneSms = false,
  dateBlockUserSendVerifiedPhoneSms = null,
  hasNewFieldToValid = true,
}) => {
  const [demoCompleted, setDemoCompleted] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
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
    if (hasNewFieldToValid) {
      if (smsToConfirm) {
        dispatch(
          fetchSentAgainCompanyActivedNewPhone(user.token, user.company._id)
        )
      } else {
        dispatch(
          fetchSentAgainCompanyActivedNewEmail(user.token, user.company._id)
        )
      }
    } else {
      if (smsToConfirm) {
        dispatch(
          fetchSentAgainCompanyActivedPhone(user.token, user.company._id)
        )
      } else {
        dispatch(
          fetchSentAgainCompanyActivedEmail(user.token, user.company._id)
        )
      }
    }
  }

  const handleActiveAccount = () => {
    if (hasNewFieldToValid) {
      if (smsToConfirm) {
        dispatch(
          fetchUpdateCompanyPhoneVeryfiedCode(
            user.token,
            user.company._id,
            activeCode
          )
        )
      } else {
        console.log("to do email")
        dispatch(
          fetchUpdateCompanyEmailVeryfiedCode(
            user.token,
            user.company._id,
            activeCode
          )
        )
      }
    } else {
      if (smsToConfirm) {
        dispatch(
          fetchActiveCompanyAccountPhone(
            activeCode,
            user.company._id,
            user.token,
            user.userId
          )
        )
      } else {
        dispatch(
          fetchActiveCompanyAccount(
            activeCode,
            user.company._id,
            user.token,
            user.userId
          )
        )
      }
    }
  }

  const handleToConfirmDelete = () => {
    setConfirmDelete(prevState => !prevState)
  }

  const handleConfirmDeleteCompany = () => {
    if (hasNewFieldToValid) {
      setConfirmDelete(false)
      if (smsToConfirm) {
        dispatch(fetchCancelUpdateCompanyPhone(user.token, user.company._id))
      } else {
        dispatch(fetchCancelUpdateCompanyEmail(user.token, user.company._id))
      }
    }
  }

  const handleConfirmDeleteCompanyDelete = () => {
    if (!hasNewFieldToValid) {
      dispatch(fetchConfirmDeleteCreatedCompany(user.token, user.company._id))
    }
  }

  const tooltipActive = activeCode.length === 0 && (
    <ReactTooltip id="alertActive" effect="float" multiline={true}>
      <span>
        {smsToConfirm
          ? "Uzupełnij kod aktywacyjny, który otrzymałeś na podany numer telefonu."
          : "Uzupełnij kod aktywacyjny, który otrzymałeś na podany adres email."}
      </span>
    </ReactTooltip>
  )
  console.log(dateBlockUserSendVerifiedPhoneSms)
  const tooltipSendAgainPhoneSms = isBlockUserSendVerifiedPhoneSms && (
    <ReactTooltip
      id="alertChangePhoneSendSmsCompany"
      effect="float"
      multiline={true}
    >
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
    <BackgroundContent>
      {tooltipActive}
      <TextToActivation>
        {smsToConfirm
          ? "Podaj kod do aktywacji, który został wysłany na podany numer telefonu:"
          : "Podaj kod do aktywacji, który został wysłany na podany adres e-mail:"}
      </TextToActivation>
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
      <ButtonsUnder>
        <ButtonIcon
          title="Reset pola"
          uppercase
          fontIconSize="20"
          fontSize="16"
          icon={<MdClose />}
          customColorButton={Colors(siteProps).dangerColorDark}
          customColorIcon={Colors(siteProps).dangerColor}
          onClick={handleReset}
          disabled={!activeCode.length > 0}
        />
        {tooltipSendAgainPhoneSms}
        <MarginBottom data-tip data-for="alertChangePhoneSendSmsCompany">
          <ButtonIcon
            title="Wyślij kod jeszcze raz"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={smsToConfirm ? <MdPhone /> : <MdEmail />}
            onClick={handleSentAgain}
            disabled={isBlockUserSendVerifiedPhoneSms}
            isFetchToBlock
          />
        </MarginBottom>
        <MarginBottom>
          <ButtonIcon
            title={
              hasNewFieldToValid
                ? "Anuluj zmianę numeru telefonu"
                : "Usuń działalność"
            }
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<MdDelete />}
            customColorButton={Colors(siteProps).dangerColorDark}
            customColorIcon={Colors(siteProps).dangerColor}
            onClick={handleToConfirmDelete}
            isFetchToBlock
          />
        </MarginBottom>
        <MarginBottom>
          <div data-tip data-for="alertActive">
            <ButtonIcon
              title="Aktywuj konto firmowe"
              uppercase
              fontIconSize="20"
              fontSize="16"
              icon={<MdCheck />}
              onClick={handleActiveAccount}
              disabled={activeCode.length === 0}
              customColorButton={Colors(siteProps).successColorDark}
              customColorIcon={Colors(siteProps).successColor}
              isFetchToBlock
            />
          </div>
        </MarginBottom>
      </ButtonsUnder>
      <Popup popupEnable={confirmDelete} noContent position="fixed">
        <SaveUserButtons>
          <MarginButtons>
            <ButtonIcon
              title={hasNewFieldToValid ? "Cofnij" : "Anuluj"}
              uppercase
              fontIconSize="20"
              fontSize="16"
              icon={<MdClose />}
              customColorButton={Colors(siteProps).dangerColorDark}
              customColorIcon={Colors(siteProps).dangerColor}
              onClick={handleToConfirmDelete}
            />
          </MarginButtons>
          <MarginButtons>
            <ButtonIcon
              title={
                hasNewFieldToValid
                  ? "Anuluj zmianę numeru telefonu"
                  : "Usuń działalność"
              }
              uppercase
              fontIconSize="20"
              fontSize="16"
              icon={<MdDelete />}
              customColorButton={Colors(siteProps).successColorDark}
              customColorIcon={Colors(siteProps).successColor}
              onClick={
                hasNewFieldToValid
                  ? handleConfirmDeleteCompany
                  : handleConfirmDeleteCompanyDelete
              }
              isFetchToBlock
            />
          </MarginButtons>
        </SaveUserButtons>
      </Popup>
    </BackgroundContent>
  )
}
export default ActiveCompany
