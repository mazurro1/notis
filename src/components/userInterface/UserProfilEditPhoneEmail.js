import React from "react"
import { MdSave, MdArrowBack } from "react-icons/md"
import { FaLock } from "react-icons/fa"
import { ButtonIcon, InputIcon, InputPhone } from "@ui"
import { Colors } from "@common/Colors"
import { addAlertItem } from "@state/actions"
import { useDispatch } from "react-redux"

const UserProfilEditPhoneEmail = ({
  siteProps,
  setInput,
  velueInput = "",
  handleChangeInput,
  setPassword,
  password,
  handleCancelChange,
  disabledSave,
  handleSaveChanges,
  TextCodeToDelete,
  ButtonsImagePosition,
  MarginButtonsSubmit,
  MarginButtons,
  isNewEmail = false,
  oldEmail = "",
}) => {
  const dispatch = useDispatch()

  const handleSubmitForm = e => {
    e.preventDefault()
    if (!disabledSave && password.length >= 5) {
      handleSaveChanges()
    } else {
      if (isNewEmail) {
        if (!!!velueInput) {
          dispatch(addAlertItem("Brak nowego adresu e-mail", "red"))
        } else if (velueInput.toLowerCase() === oldEmail.toLowerCase()) {
          dispatch(
            addAlertItem("Adres e-mail jest taki sam jak poprzedni", "red")
          )
        }
        if (!!!password) {
          dispatch(addAlertItem("Brak hasła", "red"))
        } else if (password.length < 5) {
          dispatch(addAlertItem("Hasło jest za krótkie", "red"))
        }
      } else {
        if (!!!velueInput) {
          dispatch(addAlertItem("Brak nowego numeru telefonu", "red"))
        }
        if (!!!password) {
          dispatch(addAlertItem("Brak hasła", "red"))
        } else if (password.length < 5) {
          dispatch(addAlertItem("Hasło jest za krótkie", "red"))
        }
      }
    }
  }
  return (
    <form onSubmit={handleSubmitForm}>
      <TextCodeToDelete siteProps={siteProps}>
        {isNewEmail
          ? "Adres e-mail można zmieniać 1 raz na godzine."
          : "Numer telefonu można zmieniać 1 raz na godzine."}
      </TextCodeToDelete>
      <TextCodeToDelete siteProps={siteProps}>
        {isNewEmail
          ? "Czas na aktywacje adresu e-mail: 1 godzina."
          : "Czas na aktywacje numeru telefonu: 1 godzina."}
      </TextCodeToDelete>
      {isNewEmail ? (
        <InputIcon
          icon={<FaLock />}
          placeholder="Nowy adres e-mail"
          value={velueInput}
          type="email"
          onChange={e => setInput(e.target.value)}
          validText="Jeden adres e-mail na konto"
          required
        />
      ) : (
        <InputPhone
          setPhoneNumber={setInput}
          defaultValues={velueInput}
          required
        />
      )}
      <InputIcon
        icon={<FaLock />}
        placeholder="Aktualne hasło"
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
            onClick={handleCancelChange}
          />
        </MarginButtons>
        <MarginButtonsSubmit type="submit">
          <ButtonIcon
            title="Zapisz"
            uppercase
            fontIconSize="30"
            fontSize="14"
            icon={<MdSave />}
            customColorButton={Colors(siteProps).successColorDark}
            customColorIcon={Colors(siteProps).successColor}
            disabled={disabledSave || password.length < 5 || !!!velueInput}
            isFetchToBlock
          />
        </MarginButtonsSubmit>
      </ButtonsImagePosition>
    </form>
  )
}
export default UserProfilEditPhoneEmail
