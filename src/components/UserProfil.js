import React, { useState, useEffect } from "react"
import "../../style.css"
import styled from "styled-components"
import ButtonIcon from "../components/ButtonIcon"
import InputIcon from "../components/InputIcon"
import { FaLock, FaUserAlt } from "react-icons/fa"
import {
  MdEdit,
  MdSave,
  MdArrowBack,
  MdAddAPhoto,
  MdPhotoSizeSelectLarge,
  MdMoveToInbox,
  MdDelete,
  MdLocalPhone,
  MdInfo,
  MdWork,
} from "react-icons/md"
import {
  fetchUserPhone,
  addAlertItem,
  fetchUserUploadImage,
  fetchUserDeleteImage,
  resetUserProfil,
  fetchUserDeleteImageOther,
  verifiedPhoneComponent,
  resetUpdateUserPhone,
} from "../state/actions"
import { useDispatch, useSelector } from "react-redux"
import { Colors } from "../common/Colors"
import ReactTooltip from "react-tooltip"
import { fetchEditUser, fetchUpdateDefaultCompany } from "../state/actions"
import UserProfilImage from "./UserProfilImage"
import { Site } from "../common/Site"
import InputPhone from "./InputPhone"
import Popup from "./Popup"
import DeleteAccount from "./DeleteAccount"
import VeryfiedPhone from "./VeryfiedPhone"
import SelectCreated from "./SelectCreated"

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
  @media all and (max-width: ${Site.mobileSize + "px"}) {
    height: 150px;
    width: 150px;
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
    font-size: 1rem;
  }
  .styledSpans {
    span {
      color: ${props => Colors(props.siteProps).primaryColor};
      padding-left: 10px;
      font-family: "Poppins-Bold", sans-serif;
      user-select: none;
    }
  }
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

const PositionDeleteButton = styled.div`
  display: inline-block;
  margin-bottom: 20px;
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

const TextGallery = styled.div`
  margin-bottom: 20px;
  margin-left: 20px;
  .styledSpans {
    span {
      position: relative;
      top: 8px;
      font-size: 2rem;
      color: ${props => Colors(props.siteProps).primaryColorDark};
      padding-right: 10px;
    }
  }
`

const TextChangeActive = styled.div`
  color: ${props => Colors(props.siteProps).textNormalBlack};
  font-size: 1rem;
  margin-bottom: 10px;
`

const MarginButtons = styled.div`
  margin: 5px;
`

const MarginButtonsSubmit = styled.button`
  margin: 5px;
  border: none;
  background-color: transparent;
`

const MarginButtonPhone = styled.div`
  margin-bottom: 10px;
  display: inline-block;
`

const HeightComponent = styled.div`
  min-height: 450px;
`

const TextCodeToDelete = styled.div`
  color: ${props => Colors(props.siteProps).textNormalBlack};
`

const SelectStyleDefault = styled.div`
  margin-bottom: 80px;
`

const UserProfil = ({
  userProfilVisible,
  user,
  siteProps,
  selectCompanysValues,
}) => {
  const [selectedFirstCompany, setSelectedFirstCompany] = useState(null)
  const [newPhone, setNewPhone] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [password, setPassword] = useState("")
  const [editImage, setEditImage] = useState(false)
  const [deleteAccountToConfirm, setDeleteAccountToConfirm] = useState(false)
  const [showComponentDelete, setShowComponentDelete] = useState(false)
  const [newPhoneVisible, setNewPhoneVisible] = useState(false)
  const [newPasswordVisible, setNewPasswordVisible] = useState(false)
  const [veryfiedPhoneVisible, setVeryfiedPhoneVisible] = useState(false)
  const [addedImages, setAddedImages] = useState([])
  const [activeCompany, setActiveCompany] = useState(false)
  const userPhone = useSelector(state => state.userPhone)
  const resetUserPhone = useSelector(state => state.resetUserPhone)
  const verifiedPhoneComponentVisible = useSelector(
    state => state.verifiedPhoneComponentVisible
  )
  const userProfilReset = useSelector(state => state.userProfilReset)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!!user.defaultCompany) {
      const findCompanyInAllCompanys = user.allCompanys.find(
        itemCompany => itemCompany._id === user.defaultCompany
      )
      if (!!findCompanyInAllCompanys) {
        setSelectedFirstCompany({
          label: findCompanyInAllCompanys.name,
          value: findCompanyInAllCompanys._id,
        })
      }
    }
  }, [user])

  useEffect(() => {
    setVeryfiedPhoneVisible(verifiedPhoneComponentVisible)
  }, [verifiedPhoneComponentVisible])

  useEffect(() => {
    if (!!user && !userPhone && newPhoneVisible) {
      if (!!user.hasPhone) {
        dispatch(fetchUserPhone(user.token))
      }
    }
  }, [user, userPhone, dispatch, newPhoneVisible])

  useEffect(() => {
    ReactTooltip.rebuild()
  }, [user])

  useEffect(() => {
    if (!!user) {
      if (!!user.imageUrl) {
        setAddedImages([
          {
            src: user.imageUrl.includes("https://")
              ? user.imageUrl
              : `${Site.awsUrl}/${user.imageUrl}`,
            originalPath: user.imageUrl,
            isNew: false,
          },
        ])
        setEditImage(false)
      } else {
        setAddedImages([])
      }
    }
    if (!!userProfilReset) {
      setDeleteAccountToConfirm(false)
      setShowComponentDelete(false)
      setNewPhoneVisible(false)
      setNewPasswordVisible(false)
      setEditImage(false)
      setActiveCompany(false)
      setVeryfiedPhoneVisible(false)
      dispatch(resetUserProfil())
      if (!!user.defaultCompany) {
        const findCompanyInAllCompanys = user.allCompanys.find(
          itemCompany => itemCompany._id === user.defaultCompany
        )
        if (!!findCompanyInAllCompanys) {
          setSelectedFirstCompany({
            label: findCompanyInAllCompanys.name,
            value: findCompanyInAllCompanys._id,
          })
        }
      }
    }
  }, [userProfilVisible, userProfilReset]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!!userPhone) {
      if (!!resetUserPhone) {
        setNewPhone(userPhone)
        dispatch(resetUpdateUserPhone())
      }
    }
  }, [userPhone, resetUserPhone]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleEditImage = () => {
    setEditImage(prevState => !prevState)
    if (!!user.imageUrl) {
      setAddedImages([
        {
          src: user.imageUrl.includes("https://")
            ? user.imageUrl
            : `${Site.awsUrl}/${user.imageUrl}`,
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

  const handleAddImage = event => {
    if (!!event.target.files[0]) {
      if (
        event.target.files[0].size <= 5000000 &&
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
      } else if (event.target.files[0].size > 5000000) {
        dispatch(addAlertItem("Zdjęcie nie może mieć więcej niż 5mb", "blue"))
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
    if (addedImages[0].originalPath.includes("https://")) {
      dispatch(
        fetchUserDeleteImageOther(user.token, addedImages[0].originalPath)
      )
    } else {
      dispatch(fetchUserDeleteImage(user.token, addedImages[0].originalPath))
    }
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

  const handleDeleteAccount = () => {
    setDeleteAccountToConfirm(prevState => !prevState)
  }

  const handleShowComponentDelete = () => {
    setShowComponentDelete(true)
    setDeleteAccountToConfirm(false)
  }

  const hadndleClickShowDeleteComponent = () => {
    setShowComponentDelete(prevState => !prevState)
  }

  const handleNewPasswordVisible = () => {
    setNewPasswordVisible(prevState => !prevState)
    setPassword("")
    setNewPassword("")
  }

  const handleNewPhoneVisible = () => {
    setNewPhoneVisible(prevState => !prevState)
    setPassword("")
    setNewPhone(userPhone ? userPhone : "")
  }

  const hadndleClickShowVeryfiedPhone = () => {
    setVeryfiedPhoneVisible(prevState => !prevState)
    dispatch(verifiedPhoneComponent(false))
  }

  const handleChangeSelectedFirstCompany = value => {
    setSelectedFirstCompany(value)
  }

  const handleChangeActiveCompany = () => {
    setActiveCompany(prevState => !prevState)
    const findCompanyInAllCompanys = user.allCompanys.find(
      itemCompany => itemCompany._id === user.defaultCompany
    )
    if (!!findCompanyInAllCompanys) {
      setSelectedFirstCompany({
        label: findCompanyInAllCompanys.name,
        value: findCompanyInAllCompanys._id,
      })
    }
  }

  const handleSaveDefaultCompany = () => {
    dispatch(fetchUpdateDefaultCompany(user.token, selectedFirstCompany.value))
  }

  const disabledNewPassword =
    newPassword.length >= 5 && newPassword !== password && password.length >= 5

  let isPolishNumber = false
  if (newPhone.length === 9) {
    if (Number(newPhone.slice(0, 2)) >= 45) {
      isPolishNumber = true
    }
  }

  const disabledNewPhone =
    newPhone.length === 9 &&
    password.length >= 5 &&
    userPhone !== newPhone &&
    isPolishNumber

  const handleSaveNewPassword = e => {
    e.preventDefault()
    if (disabledNewPassword) {
      dispatch(fetchEditUser(null, newPassword, password, user.token))
    } else {
      if (newPassword.length < 5 || password.length < 5) {
        dispatch(addAlertItem("Hasła są za krótkie", "red"))
      } else if (newPassword === password) {
        dispatch(addAlertItem("Hasła są takie same", "red"))
      }
    }
  }

  const handleSaveNewPhone = () => {
    if (disabledNewPhone) {
      dispatch(fetchEditUser(newPhone, null, password, user.token, true))
    }
  }

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

  let isBlockUserSendVerifiedPhoneSms = false
  let dateBlockUserSendVerifiedPhoneSms = null
  let isUserBlockChangePhoneNumber = false
  let dateBlockChangePhone = null
  if (!!user) {
    if (!!user.blockUserChangePhoneNumber) {
      dateBlockChangePhone = new Date(user.blockUserChangePhoneNumber)
      if (new Date(user.blockUserChangePhoneNumber) >= new Date()) {
        isUserBlockChangePhoneNumber = true
      }
    }
    if (!!user.blockUserSendVerifiedPhoneSms) {
      dateBlockUserSendVerifiedPhoneSms = new Date(
        user.blockUserSendVerifiedPhoneSms
      )
      if (new Date(user.blockUserSendVerifiedPhoneSms) >= new Date()) {
        isBlockUserSendVerifiedPhoneSms = true
      }
    }
  }
  const tooltipChangePhone = isUserBlockChangePhoneNumber && (
    <ReactTooltip id="alertChangePhone" effect="float" multiline={true}>
      <div>
        Numer telefonu można ponownie zmienić:{" "}
        {dateBlockChangePhone.getDate() < 10
          ? `0${dateBlockChangePhone.getDate()}`
          : dateBlockChangePhone.getDate()}
        .
        {dateBlockChangePhone.getMonth() + 1 < 10
          ? `0${dateBlockChangePhone.getMonth() + 1}`
          : dateBlockChangePhone.getMonth() + 1}
        .{dateBlockChangePhone.getFullYear()}
        {" o godzinie: "}
        {dateBlockChangePhone.getHours() < 10
          ? `0${dateBlockChangePhone.getHours()}`
          : dateBlockChangePhone.getHours()}
        :
        {dateBlockChangePhone.getMinutes() < 10
          ? `0${dateBlockChangePhone.getMinutes()}`
          : dateBlockChangePhone.getMinutes()}
      </div>
    </ReactTooltip>
  )

  const disabledButtonDeleteAccount =
    !!user.company || !!user.allCompanys.length > 0
  const tooltipDisabledDeleteAccount = disabledButtonDeleteAccount && (
    <ReactTooltip id="alerDeleteAccount" effect="float" multiline={true}>
      <div>
        Nie możesz usunąć konta, jeżeli masz aktywną prace/firme. Aby usunąć
        konto pracodawca firmy musi najpierw usunąć firmę / pracownika, a
        następnie można dokonać usunięcia konta.
      </div>
    </ReactTooltip>
  )

  let disabledButtonSaveDefaultCompany = true
  if (!!selectedFirstCompany) {
    if (selectedFirstCompany.value !== user.defaultCompany) {
      disabledButtonSaveDefaultCompany = false
    }
  }

  return (
    <HeightComponent>
      <ProfilStyle siteProps={siteProps}>
        <TextToUser siteProps={siteProps}>
          <UserNameImage className="styledSpans">
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
          <div className="styledSpans">
            <h1>
              Twój adres email: <span>{!!user ? user.email : ""}</span>
            </h1>
          </div>
          {tooltipChangePhone}
          {!!user.allCompanys.length > 0 && (
            <div>
              <MarginButtonPhone>
                <ButtonIcon
                  title="Zmień domyślną działalność"
                  uppercase
                  fontIconSize="20"
                  fontSize="16"
                  icon={<MdWork />}
                  onClick={handleChangeActiveCompany}
                />
              </MarginButtonPhone>
            </div>
          )}
          <div>
            <MarginButtonPhone
              data-tip
              data-for="alertChangePhone"
              data-place="right"
            >
              <ButtonIcon
                title={
                  !!user.hasPhone
                    ? "Edytuj numer telefonu"
                    : "Dodaj numer telefonu"
                }
                uppercase
                fontIconSize="20"
                fontSize="16"
                icon={<MdLocalPhone />}
                onClick={handleNewPhoneVisible}
                disabled={isUserBlockChangePhoneNumber}
              />
            </MarginButtonPhone>
          </div>
          {!!user.hasPhone && !!!user.phoneVerified && (
            <div>
              <MarginButtonPhone>
                <ButtonIcon
                  title="Weryfikuj numer telefonu"
                  uppercase
                  fontIconSize="20"
                  fontSize="16"
                  icon={<MdInfo />}
                  secondColors
                  onClick={hadndleClickShowVeryfiedPhone}
                />
              </MarginButtonPhone>
            </div>
          )}
          <MarginButtonPhone>
            <ButtonIcon
              title="Edytuj hasło"
              uppercase
              fontIconSize="16"
              fontSize="16"
              icon={<FaLock />}
              onClick={handleNewPasswordVisible}
            />
          </MarginButtonPhone>
          <div>
            {tooltipDisabledDeleteAccount}
            <PositionDeleteButton
              data-tip
              data-for="alerDeleteAccount"
              data-place="right"
            >
              <ButtonIcon
                title="Usuń konto"
                uppercase
                fontIconSize="20"
                fontSize="16"
                icon={<MdDelete />}
                disabled={disabledButtonDeleteAccount}
                customColorButton={Colors(siteProps).dangerColorDark}
                customColorIcon={Colors(siteProps).dangerColor}
                onClick={handleDeleteAccount}
              />
            </PositionDeleteButton>
          </div>
        </TextToUser>
      </ProfilStyle>
      <Popup
        popupEnable={editImage}
        position="absolute"
        title="Edytuj zdjęcie profilowe"
        borderRadius
        closeTitle={false}
        smallTitle
      >
        <TextGallery siteProps={siteProps} className="styledSpans">
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
      </Popup>
      <Popup
        popupEnable={deleteAccountToConfirm}
        position="absolute"
        borderRadius
        noContent
      >
        <ButtonsImagePosition>
          <MarginButtons>
            <ButtonIcon
              title="Anuluj"
              uppercase
              fontIconSize="30"
              fontSize="14"
              icon={<MdArrowBack />}
              customColorButton={Colors(siteProps).successColorDark}
              customColorIcon={Colors(siteProps).successColor}
              onClick={handleDeleteAccount}
            />
          </MarginButtons>
          <MarginButtons>
            <ButtonIcon
              title="Usuń konto"
              uppercase
              fontIconSize="30"
              fontSize="14"
              icon={<MdDelete />}
              customColorButton={Colors(siteProps).dangerColorDark}
              customColorIcon={Colors(siteProps).dangerColor}
              onClick={handleShowComponentDelete}
            />
          </MarginButtons>
        </ButtonsImagePosition>
      </Popup>
      {!disabledButtonDeleteAccount && (
        <Popup
          popupEnable={showComponentDelete}
          position="absolute"
          borderRadius
          title="Usuwanie konta"
          handleClose={hadndleClickShowDeleteComponent}
          smallTitle
        >
          <DeleteAccount
            siteProps={siteProps}
            user={user}
            hadndleClickShowDeleteComponent={hadndleClickShowDeleteComponent}
          />
        </Popup>
      )}
      <Popup
        popupEnable={veryfiedPhoneVisible || verifiedPhoneComponentVisible}
        position="absolute"
        borderRadius
        title="Weryfikuj numeru telefonu"
        smallTitle
        closeTitle={false}
      >
        <VeryfiedPhone
          siteProps={siteProps}
          user={user}
          hadndleClickShowVeryfiedPhone={hadndleClickShowVeryfiedPhone}
          isBlockUserSendVerifiedPhoneSms={isBlockUserSendVerifiedPhoneSms}
          dateBlockUserSendVerifiedPhoneSms={dateBlockUserSendVerifiedPhoneSms}
        />
      </Popup>
      <Popup
        popupEnable={newPhoneVisible}
        position="absolute"
        title="Dodaj numeru telefonu"
        borderRadius
        smallTitle
        closeTitle={false}
      >
        <TextCodeToDelete siteProps={siteProps}>
          Numer telefonu można zmieniać 1 raz na godzine.
        </TextCodeToDelete>
        <TextCodeToDelete siteProps={siteProps}>
          Czas na aktywacje numeru telefonu: 1 godzina
        </TextCodeToDelete>
        <InputPhone setPhoneNumber={setNewPhone} defaultValues={newPhone} />
        <InputIcon
          icon={<FaLock />}
          placeholder="Aktualne hasło"
          value={password}
          type="password"
          onChange={e => handleChangeInput(e, setPassword)}
          validText="Minimum 5 znaków"
          showPassword
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
          <MarginButtons>
            <ButtonIcon
              title="Zapisz"
              uppercase
              fontIconSize="30"
              fontSize="14"
              icon={<MdSave />}
              customColorButton={Colors(siteProps).successColorDark}
              customColorIcon={Colors(siteProps).successColor}
              disabled={!disabledNewPhone}
              onClick={handleSaveNewPhone}
            />
          </MarginButtons>
        </ButtonsImagePosition>
      </Popup>
      <Popup
        popupEnable={newPasswordVisible}
        position="absolute"
        borderRadius
        title="Edytuj hasło"
        closeTitle={false}
        smallTitle
      >
        <form onSubmit={handleSaveNewPassword}>
          <InputIcon
            icon={<FaLock />}
            placeholder="Aktualne hasło"
            value={password}
            type="password"
            onChange={e => handleChangeInput(e, setPassword)}
            validText="Minimum 5 znaków"
            showPassword
          />
          <InputIcon
            icon={<FaLock />}
            placeholder="Nowe hasło"
            value={newPassword}
            type="password"
            onChange={e => handleChangeInput(e, setNewPassword)}
            validText="Minimum 5 znaków"
            showPassword
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
                onClick={handleNewPasswordVisible}
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
                disabled={!disabledNewPassword}
                // onClick={}
              />
            </MarginButtonsSubmit>
          </ButtonsImagePosition>
        </form>
      </Popup>
      <Popup
        popupEnable={activeCompany}
        position="absolute"
        borderRadius
        title="Zmień domyślną działalność"
        closeTitle={false}
        smallTitle
      >
        <SelectStyleDefault siteProps={siteProps}>
          <TextChangeActive siteProps={siteProps}>
            Wybierz domyślną działalność, która zostanie załadowana jako 1
            podczas logowania
          </TextChangeActive>
          <SelectCreated
            options={selectCompanysValues}
            value={selectedFirstCompany}
            handleChange={handleChangeSelectedFirstCompany}
            placeholder="Firma..."
            defaultMenuIsOpen={false}
            isClearable={false}
            deleteItem={false}
            darkSelect
            maxMenuHeight={80}
            isDisabled={selectCompanysValues.length <= 1}
          />
        </SelectStyleDefault>

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
              onClick={handleChangeActiveCompany}
            />
          </MarginButtons>
          <MarginButtonsSubmit>
            <ButtonIcon
              title="Zapisz"
              uppercase
              fontIconSize="30"
              fontSize="14"
              icon={<MdSave />}
              customColorButton={Colors(siteProps).successColorDark}
              customColorIcon={Colors(siteProps).successColor}
              disabled={disabledButtonSaveDefaultCompany}
              onClick={handleSaveDefaultCompany}
            />
          </MarginButtonsSubmit>
        </ButtonsImagePosition>
      </Popup>
    </HeightComponent>
  )
}
export default UserProfil
