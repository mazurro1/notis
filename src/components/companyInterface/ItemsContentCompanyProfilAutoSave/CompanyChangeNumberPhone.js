import React, { useState } from "react"
import styled from "styled-components"
import { ButtonIcon, InputIcon, InputPhone } from "@ui"
import { FaLock } from "react-icons/fa"
import { MdSave, MdArrowBack, MdEmail } from "react-icons/md"
import {
  updateCompanyChangePhoneEmail,
  fetchUpdateCompanyPhone,
  fetchUpdateCompanyEmail,
} from "@state/actions"
import { useDispatch } from "react-redux"
import { Colors } from "@common/Colors"
import ReactTooltip from "react-tooltip"

const TextCodeToDelete = styled.div`
  color: ${props => Colors(props.siteProps).textNormalBlack};
`

const MarginButtons = styled.div`
  margin: 5px;
`

const MarginButtonsSubmit = styled.button`
  margin: 5px;
  outline: none;
  border: none;
`

const ButtonsImagePosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
`

export const CompanyChangeNumberPhone = ({
  siteProps,
  changeEmail = false,
  isCompanyDisabledChangePhone,
  isCompanyDisabledChangeEmail,
  dateCompanyDisabledChangePhone,
  dateCompanyDisabledChangeEmail,
  user,
}) => {
  const [password, setPassword] = useState("")
  const [newValue, setNewValue] = useState("")
  const dispatch = useDispatch()

  const handleChangeInput = (e, setChange) => {
    setChange(e.target.value)
  }

  const handleNewPhoneVisible = () => {
    dispatch(updateCompanyChangePhoneEmail(false, false))
    setPassword("")
    setNewValue("")
  }

  let isPolishNumber = false
  if (newValue.length === 9) {
    if (Number(newValue.slice(0, 2)) >= 45) {
      isPolishNumber = true
    }
  }

  const disabledNewPhone = changeEmail
    ? password.length >= 5 && !isCompanyDisabledChangeEmail
    : newValue.length === 9 &&
      password.length >= 5 &&
      isPolishNumber &&
      !isCompanyDisabledChangePhone

  const handleSaveNewPhone = e => {
    e.preventDefault()
    if (disabledNewPhone && !!user) {
      if (!!user.company) {
        if (changeEmail) {
          dispatch(
            fetchUpdateCompanyEmail(
              user.token,
              user.company._id,
              newValue,
              password
            )
          )
        } else {
          dispatch(
            fetchUpdateCompanyPhone(
              user.token,
              user.company._id,
              newValue,
              password
            )
          )
        }
      }
    }
  }

  return (
    <form onSubmit={handleSaveNewPhone}>
      {isCompanyDisabledChangeEmail && !!dateCompanyDisabledChangeEmail && (
        <ReactTooltip
          id="changeNewEmailCompany"
          effect="float"
          multiline={true}
        >
          <span>
            Adres e-mail można ponownie zmienić:{" "}
            {dateCompanyDisabledChangeEmail.getDate() < 10
              ? `0${dateCompanyDisabledChangeEmail.getDate()}`
              : dateCompanyDisabledChangeEmail.getDate()}
            .
            {dateCompanyDisabledChangeEmail.getMonth() + 1 < 10
              ? `0${dateCompanyDisabledChangeEmail.getMonth() + 1}`
              : dateCompanyDisabledChangeEmail.getMonth() + 1}
            .{dateCompanyDisabledChangeEmail.getFullYear()}
            {" o godzinie: "}
            {dateCompanyDisabledChangeEmail.getHours() < 10
              ? `0${dateCompanyDisabledChangeEmail.getHours()}`
              : dateCompanyDisabledChangeEmail.getHours()}
            :
            {dateCompanyDisabledChangeEmail.getMinutes() < 10
              ? `0${dateCompanyDisabledChangeEmail.getMinutes()}`
              : dateCompanyDisabledChangeEmail.getMinutes()}
          </span>
        </ReactTooltip>
      )}
      {isCompanyDisabledChangePhone && !!dateCompanyDisabledChangePhone && (
        <ReactTooltip
          id="changeNewPhoneCompany"
          effect="float"
          multiline={true}
        >
          <span>
            Numer telefonu można ponownie zmienić:{" "}
            {dateCompanyDisabledChangePhone.getDate() < 10
              ? `0${dateCompanyDisabledChangePhone.getDate()}`
              : dateCompanyDisabledChangePhone.getDate()}
            .
            {dateCompanyDisabledChangePhone.getMonth() + 1 < 10
              ? `0${dateCompanyDisabledChangePhone.getMonth() + 1}`
              : dateCompanyDisabledChangePhone.getMonth() + 1}
            .{dateCompanyDisabledChangePhone.getFullYear()}
            {" o godzinie: "}
            {dateCompanyDisabledChangePhone.getHours() < 10
              ? `0${dateCompanyDisabledChangePhone.getHours()}`
              : dateCompanyDisabledChangePhone.getHours()}
            :
            {dateCompanyDisabledChangePhone.getMinutes() < 10
              ? `0${dateCompanyDisabledChangePhone.getMinutes()}`
              : dateCompanyDisabledChangePhone.getMinutes()}
          </span>
        </ReactTooltip>
      )}
      <TextCodeToDelete siteProps={siteProps}>
        {changeEmail
          ? "Adres e-mail można zmieniać 1 raz na godzine."
          : "Numer telefonu można zmieniać 1 raz na godzine."}
      </TextCodeToDelete>
      <TextCodeToDelete siteProps={siteProps}>
        {changeEmail
          ? "Czas na aktywacje adresu e-mail: 1 godzina"
          : "Czas na aktywacje numeru telefonu: 1 godzina"}
      </TextCodeToDelete>
      {changeEmail ? (
        <InputIcon
          icon={<MdEmail />}
          required
          placeholder="Nowy adres e-mail"
          value={newValue}
          type="email"
          onChange={e => setNewValue(e.target.value)}
          validText="Jeden adres e-mail na konto firmowe, może być taki sam jak e-mail użytkownika"
        />
      ) : (
        <InputPhone
          required
          setPhoneNumber={setNewValue}
          defaultValues={newValue}
        />
      )}
      <InputIcon
        icon={<FaLock />}
        placeholder="Hasło administratora"
        value={password}
        type="password"
        onChange={e => handleChangeInput(e, setPassword)}
        validText="Minimum 5 znaków"
        showPassword
        required
      />
      <ButtonsImagePosition>
        <MarginButtons>
          <ButtonIcon
            title="Anuluj"
            uppercase
            fontIconSize="30"
            fontSize="14"
            icon={<MdArrowBack />}
            customColorButton={Colors(siteProps).dangerColorDark}
            customColorIcon={Colors(siteProps).dangerColor}
            onClick={handleNewPhoneVisible}
          />
        </MarginButtons>
        <MarginButtonsSubmit
          type="submit"
          data-tip
          data-for={
            changeEmail ? "changeNewEmailCompany" : "changeNewPhoneCompany"
          }
        >
          <ButtonIcon
            title="Zapisz"
            uppercase
            fontIconSize="30"
            fontSize="14"
            icon={<MdSave />}
            customColorButton={Colors(siteProps).successColorDark}
            customColorIcon={Colors(siteProps).successColor}
            disabled={!disabledNewPhone}
          />
        </MarginButtonsSubmit>
      </ButtonsImagePosition>
    </form>
  )
}
export default CompanyChangeNumberPhone
