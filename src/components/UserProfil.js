import React, { useState, useEffect } from "react"
import "../../style.css"
import styled from "styled-components"
import ButtonIcon from "../components/ButtonIcon"
import InputIcon from "../components/InputIcon"
import { FaPhoneAlt, FaLock } from "react-icons/fa"
import { fetchUserPhone } from "../state/actions"
import { useDispatch, useSelector } from "react-redux"
import { Colors } from "../common/Colors"
import { Checkbox } from "react-input-checkbox"
import { CSSTransition } from "react-transition-group"
import "react-input-checkbox/lib/react-input-checkbox.min.css"
import { MdDone } from "react-icons/md"
import ReactTooltip from "react-tooltip"
import { fetchEditUser } from "../state/actions"

const ProfilStyle = styled.div`
  margin-top: 20px;
`

const TextToUser = styled.div`
  h1 {
    font-size: 1.4rem;
  }
  span {
    color: ${Colors.buttonIconColor};
    padding-left: 10px;
    font-weight: 600;
    user-select: none;
  }
`

const MarginComponents = styled.div`
  margin-bottom: 20px;
`

const InputWidht = styled.div`
  max-width: 100%;
  width: 400px;
`

const ButtonIconStyle = styled.div`
  margin-top: 50px;
`

const UserProfil = () => {
  const [newPhone, setNewPhone] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [password, setPassword] = useState("")
  const [checkboxPhone, setCheckboxPhone] = useState(false)
  const [checkboxPassword, setCheckboxPassword] = useState(false)
  const user = useSelector(state => state.user)
  const userPhone = useSelector(state => state.userPhone)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!!user && checkboxPhone && !userPhone) {
      dispatch(fetchUserPhone())
    }
  }, [user, checkboxPhone, userPhone])

  useEffect(() => {
    if (!!userPhone) {
      setNewPhone(userPhone)
    }
  }, [userPhone])

  const handleChangeInput = (e, setChange) => {
    setChange(e.target.value)
  }

  const handleChangeCheckbox = setChange => {
    setChange(prevState => !prevState)
  }

  const disabledButtonSave =
    ((checkboxPhone && newPhone !== userPhone) ||
      (checkboxPassword &&
        newPassword.length >= 6 &&
        newPassword !== password)) &&
    password.length >= 6

  const handleSaveUserProfile = () => {
    if (disabledButtonSave) {
      const newPhoneUser =
        checkboxPhone && newPhone.length > 0 ? newPhone : null
      const newPasswordUser =
        checkboxPassword && newPassword.length > 0 ? newPassword : null
      dispatch(fetchEditUser(newPhoneUser, newPasswordUser, password))
    }
  }

  const tooltipButton =
    checkboxPassword ||
    (checkboxPhone && !disabledButtonSave && (
      <ReactTooltip id="alertButtonSave" effect="float" multiline={true}>
        <span>Uzupełnij wszystkie dane</span>
      </ReactTooltip>
    ))

  return (
    <ProfilStyle>
      {tooltipButton}
      <TextToUser>
        <div>
          <h1>
            Twoje imię: <span>{!!user ? user.userName : ""}</span>
          </h1>
        </div>
        <div>
          <h1>
            Twój numer telefonu: <span>{userPhone}</span>
          </h1>
        </div>
        <div>
          <h1>
            Twój adres email: <span>{!!user ? user.email : ""}</span>
          </h1>
        </div>
        <MarginComponents>
          <Checkbox
            theme="material-checkbox"
            value={checkboxPhone}
            onChange={() => handleChangeCheckbox(setCheckboxPhone)}
          >
            Edytuj numer telefonu
          </Checkbox>
          <CSSTransition
            in={checkboxPhone}
            timeout={400}
            classNames="popup"
            unmountOnExit
          >
            <InputWidht>
              <InputIcon
                icon={<FaPhoneAlt />}
                placeholder="Numer telefonu"
                value={newPhone}
                type="number"
                onChange={e => handleChangeInput(e, setNewPhone)}
              />
            </InputWidht>
          </CSSTransition>
        </MarginComponents>
        <Checkbox
          theme="material-checkbox"
          value={checkboxPassword}
          onChange={() => handleChangeCheckbox(setCheckboxPassword)}
        >
          Edytuj hasło
        </Checkbox>
        <CSSTransition
          in={checkboxPassword}
          timeout={400}
          classNames="popup"
          unmountOnExit
        >
          <InputWidht>
            <InputIcon
              icon={<FaLock />}
              placeholder="Nowe hasło"
              value={newPassword}
              type="password"
              onChange={e => handleChangeInput(e, setNewPassword)}
            />
          </InputWidht>
        </CSSTransition>
        <CSSTransition
          in={checkboxPassword || checkboxPhone}
          timeout={400}
          classNames="popup"
          unmountOnExit
        >
          <>
            <InputWidht>
              <InputIcon
                icon={<FaLock />}
                placeholder="Aktualne hasło"
                value={password}
                type="password"
                onChange={e => handleChangeInput(e, setPassword)}
              />
            </InputWidht>
          </>
        </CSSTransition>
      </TextToUser>
      <CSSTransition
        in={checkboxPassword || checkboxPhone}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <ButtonIconStyle>
          <div data-tip data-for="alertButtonSave">
            <ButtonIcon
              title="Zapisz"
              uppercase
              fontIconSize="30"
              fontSize="20"
              icon={<MdDone />}
              onClick={handleSaveUserProfile}
              disabled={!disabledButtonSave}
            />
          </div>
        </ButtonIconStyle>
      </CSSTransition>
    </ProfilStyle>
  )
}
export default UserProfil
