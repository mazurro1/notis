import React, { useState, useEffect } from "react"
import { ButtonIcon, InputIcon } from "@ui"
import { Colors } from "@common/Colors"
import { FaArrowLeft } from "react-icons/fa"
import { MdDelete, MdLock } from "react-icons/md"

const WorkerItemDelete = ({
  TextToDeleteWorker,
  siteProps,
  ButtonContent,
  ButtonDeleteStyle,
  handleUserConfirmDelete,
  handleDeleteUser,
}) => {
  const [passwordInput, setPasswordInput] = useState("")

  useEffect(() => {
    setPasswordInput("")
  }, [])

  const handleChange = (e, setValue) => {
    setValue(e.target.value)
  }

  return (
    <>
      <TextToDeleteWorker siteProps={siteProps}>
        Usunięcie pracownika spowoduje odwołanie wszystkich rezerwacji, ktore
        zostały do niego przypisane. Aby wizyty nie zostały odwołane należy
        zmienić osobę wykonującą daną usługę. Aby dokonać usunięcia pracownika z
        firmy należy podać hasło administratora do konta osobistego w celu
        weryfikacji.
      </TextToDeleteWorker>
      <InputIcon
        icon={<MdLock />}
        placeholder="Hasło administratora"
        value={passwordInput}
        type="password"
        onChange={e => handleChange(e, setPasswordInput)}
        required
        validText="Minimum 5 znaków"
        showPassword
        secondColor
      />
      <ButtonContent>
        <ButtonDeleteStyle>
          <ButtonIcon
            title="Anuluj"
            uppercase
            fontIconSize="16"
            fontSize="14"
            icon={<FaArrowLeft />}
            onClick={handleUserConfirmDelete}
            customColorButton={Colors(siteProps).successColorDark}
            customColorIcon={Colors(siteProps).successColor}
          />
        </ButtonDeleteStyle>
        <ButtonDeleteStyle>
          <ButtonIcon
            title="Usuń"
            uppercase
            fontIconSize="18"
            fontSize="14"
            icon={<MdDelete />}
            onClick={() => handleDeleteUser(passwordInput)}
            customColorButton={Colors(siteProps).dangerColorDark}
            customColorIcon={Colors(siteProps).dangerColor}
            disabled={passwordInput.length < 5}
            isFetchToBlock
          />
        </ButtonDeleteStyle>
      </ButtonContent>
    </>
  )
}
export default WorkerItemDelete
