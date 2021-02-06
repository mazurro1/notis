import React, { useState, useEffect } from "react"
import "../../style.css"
import styled from "styled-components"
import ButtonIcon from "../components/ButtonIcon"
import InputIcon from "../components/InputIcon"
import { FaPhoneAlt, FaLock, FaUserAlt } from "react-icons/fa"
import {
  MdEdit,
  MdSave,
  MdArrowBack,
  MdAddAPhoto,
  MdPhotoSizeSelectLarge,
  MdMoveToInbox,
} from "react-icons/md"
import {
  fetchUserPhone,
  addAlertItem,
  fetchUserUploadImage,
  fetchUserDeleteImage,
  resetUserProfil,
} from "../state/actions"
import { useDispatch, useSelector } from "react-redux"
import { Colors } from "../common/Colors"
import { Checkbox } from "react-input-checkbox"
import { CSSTransition } from "react-transition-group"
import { MdDone } from "react-icons/md"
import ReactTooltip from "react-tooltip"
import { fetchEditUser } from "../state/actions"
import UserProfilImage from "./UserProfilImage"
import { Site } from "../common/Site"

const AddImage = styled.div`
  position: relative;
  height: 200px;
  width: 200px;
  margin: 35px;
  margin-top: 55px;
  [type="file"] {
    position: absolute;
    height: 0;
    overflow: hidden;
    width: 0;
  }
  [type="file"] + label {
    position: absolute;
    height: 100%;
    width: 100%;
    cursor: pointer;
    border: 2px dashed gray;
    color: gray;
    background-color: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    font-size: 3rem;
    border-radius: 50%;
    transition-property: background-color;
    transition-duration: 0.3s;
    transition-timing-function: ease;
    &:hover {
      background-color: #dadada;
    }
  }
`

const BackGroundImageAvatarCustomUrl = styled.div`
  position: relative;
  height: 100px;
  width: 100px;
  margin-right: 5px;
  background: url(${props => props.url}) 50% 0 no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1) inset;
`

const ProfilStyle = styled.div`
  position: relative;
  padding: 20px;
  color: ${props => Colors(props.siteProps).textNormalBlack};
  background-color: ${props => Colors(props.siteProps).backgroundColorPage};
  padding-bottom: 50px;
  font-size: 1rem;
`

const TextToUser = styled.div`
  h1 {
    font-size: 1.2rem;
  }
  span {
    color: ${props => Colors(props.siteProps).primaryColor};
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
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
`

const UserNameImage = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 20px;

  span {
    font-size: 1.4rem;
  }
`

const ButtonsImagePosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
`

const DefaultImage = styled.div`
  position: relative;
  background-color: ${props => Colors(props.siteProps).primaryColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  border-radius: 50%;
  height: 100px;
  width: 100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
`

const EditUserImage = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 30px;
  width: 30px;
  background-color: ${props => Colors(props.siteProps).secondColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  border-radius: 50%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  cursor: pointer;
  transition-property: background-color, color;
  transition-duration: 0.5s;
  transition-timing-function: ease;

  &:hover {
    background-color: ${props => Colors(props.siteProps).secondDarkColor};
  }
`

const BackgroundEdit = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const BackgroundEditContent = styled.div`
  width: 90%;
  background-color: ${props => Colors(props.siteProps).backgroundColorPage};
  border-radius: 5px;
  max-height: 90%;
  color: black;
  cursor: default;
  overflow: hidden;
`
const TextGallery = styled.div`
  margin-bottom: 20px;
  margin-left: 20px;
  span {
    position: relative;
    top: 8px;
    font-size: 2rem;
    color: ${props => Colors(props.siteProps).primaryColorDark};
    padding-right: 10px;
  }
`

const TitleAddOpnion = styled.div`
  position: relative;
  padding: 5px 10px;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  background-color: ${props => Colors(props.siteProps).primaryColorDark};
  margin-bottom: 10px;
  transition-property: background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const MarginButtons = styled.div`
  margin: 5px;
`

const UserProfil = ({ userProfilVisible }) => {
  const [newPhone, setNewPhone] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [password, setPassword] = useState("")
  const [checkboxPhone, setCheckboxPhone] = useState(false)
  const [checkboxPassword, setCheckboxPassword] = useState(false)
  const [editImage, setEditImage] = useState(false)
  const user = useSelector(state => state.user)
  const [addedImages, setAddedImages] = useState([])
  const userPhone = useSelector(state => state.userPhone)
  const siteProps = useSelector(state => state.siteProps)
  const userProfilReset = useSelector(state => state.userProfilReset)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!!user && !userPhone) {
      if (user.hasPhone) {
        dispatch(fetchUserPhone(user.token))
      }
    }
  }, [user, userPhone, dispatch])

  useEffect(() => {
    if (!!user.imageUrl) {
      setAddedImages([
        {
          src: `${Site.awsUrl}/${user.imageUrl}`,
          originalPath: user.imageUrl,
          isNew: false,
        },
      ])
      setEditImage(false)
    } else {
      setAddedImages([])
    }
    dispatch(resetUserProfil())
  }, [userProfilVisible, user, userProfilReset])

  useEffect(() => {
    if (!!userPhone) {
      setNewPhone(userPhone)
    }
  }, [userPhone])

  const handleEditImage = () => {
    setEditImage(prevState => !prevState)
    if (!!user.imageUrl) {
      setAddedImages([
        {
          src: `${Site.awsUrl}/${user.imageUrl}`,
          originalPath: user.imageUrl,
          isNew: false,
        },
      ])
    } else {
      setAddedImages([])
    }
  }

  const handleChangeInput = (e, setChange) => {
    setChange(e.target.value)
  }

  const handleChangeCheckbox = setChange => {
    setChange(prevState => !prevState)
  }

  const handleAddImage = event => {
    if (!!event.target.files[0]) {
      if (
        event.target.files[0].size <= 2000000 &&
        event.target.files.length &&
        (event.target.files[0].type === "image/jpeg" ||
          event.target.files[0].type === "image/png")
      ) {
        let reader = new FileReader()
        reader.onload = e => {
          const idNewItem = Math.floor(
            1000000 + Math.random() * 9000000
          ).toString()

          setAddedImages([
            {
              src: e.target.result,
              originalPath: idNewItem,
              isNew: true,
            },
          ])
        }
        reader.readAsDataURL(event.target.files[0])
      } else if (event.target.files[0].size > 2000000) {
        dispatch(addAlertItem("Zdjęcie nie może mieć więcej niż 2mpx", "blue"))
      } else {
        dispatch(
          dispatch(
            addAlertItem("Zdjęcie musi mieć roższeżenie .png lub .jpeg", "blue")
          )
        )
      }
    }
  }

  const handleClickDeleteImage = () => {
    dispatch(fetchUserDeleteImage(user.token, addedImages[0].originalPath))
  }

  let disabledButtonSaveImage = true
  if (addedImages.length > 0) {
    disabledButtonSaveImage = !addedImages[0].isNew
  }

  const handleUploadImage = () => {
    if (!disabledButtonSaveImage) {
      dispatch(fetchUserUploadImage(user.token, addedImages[0].src))
    }
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
      dispatch(
        fetchEditUser(newPhoneUser, newPasswordUser, password, user.token)
      )
    }
  }

  const tooltipButton =
    checkboxPassword ||
    (checkboxPhone && !disabledButtonSave && (
      <ReactTooltip id="alertButtonSave" effect="float" multiline={true}>
        <span>Uzupełnij wszystkie dane</span>
      </ReactTooltip>
    ))

  const mapUserImages = addedImages.map((item, index) => {
    return (
      <UserProfilImage
        item={item}
        key={index}
        index={index}
        siteProps={siteProps}
        handleClickDeleteImage={handleClickDeleteImage}
        handleUploadImage={handleUploadImage}
        userProfilReset={userProfilReset}
      />
    )
  })

  return (
    <>
      <ProfilStyle siteProps={siteProps}>
        {tooltipButton}
        <TextToUser siteProps={siteProps}>
          <UserNameImage>
            {addedImages.length === 0 ? (
              <DefaultImage siteProps={siteProps}>
                <FaUserAlt />
                <EditUserImage siteProps={siteProps} onClick={handleEditImage}>
                  <MdEdit />
                </EditUserImage>
              </DefaultImage>
            ) : (
              <BackGroundImageAvatarCustomUrl url={addedImages[0].src}>
                <EditUserImage siteProps={siteProps} onClick={handleEditImage}>
                  <MdEdit />
                </EditUserImage>
              </BackGroundImageAvatarCustomUrl>
            )}
            <div>
              <span>
                {!!user ? `${user.userName} ${user.userSurname}` : ""}
              </span>
            </div>
          </UserNameImage>
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
      </ProfilStyle>
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
      <CSSTransition
        in={editImage}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <BackgroundEdit>
          <BackgroundEditContent siteProps={siteProps}>
            <TitleAddOpnion>Edytuj zdjęcie profilowe</TitleAddOpnion>
            <TextGallery siteProps={siteProps}>
              <div>
                <span>
                  <MdPhotoSizeSelectLarge />
                </span>
                Optymalny rozmiar zdjęcia: 200x200px.
              </div>
              <div>
                <span>
                  <MdMoveToInbox />
                </span>
                Maksymalny rozmiar zdjęcia: 2mpx.
              </div>
            </TextGallery>
            {addedImages.length === 0 ? (
              <AddImage>
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={handleAddImage}
                />
                <label htmlFor="file">
                  <MdAddAPhoto />
                </label>
              </AddImage>
            ) : (
              mapUserImages
            )}
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
                  onClick={handleEditImage}
                />
              </MarginButtons>
              <MarginButtons>
                <ButtonIcon
                  title="Zapisz"
                  uppercase
                  fontIconSize="30"
                  fontSize="14"
                  icon={<MdSave />}
                  customColorButton={Colors(siteProps).successColorDark}
                  customColorIcon={Colors(siteProps).successColor}
                  onClick={handleUploadImage}
                  disabled={disabledButtonSaveImage}
                />
              </MarginButtons>
            </ButtonsImagePosition>
          </BackgroundEditContent>
        </BackgroundEdit>
      </CSSTransition>
    </>
  )
}
export default UserProfil
