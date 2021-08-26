import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Colors } from "../../common/Colors"
import ButtonIcon from "../ButtonIcon"
import { MdEdit, MdPhone } from "react-icons/md"
import InputIcon from "../InputIcon"
import {
  MdDelete,
  MdLocationOn,
  MdLocationCity,
  MdWork,
  MdSmartphone,
} from "react-icons/md"
import { FaMapSigns } from "react-icons/fa"
import { Checkbox } from "react-input-checkbox"
import { FaArrowLeft, FaSave } from "react-icons/fa"
import { ReserwationDelay } from "../../common/ReserwationDelay"
import { ReserwationDelayMonth } from "../../common/ReserwationDelayMonth"
import SelectCreated from "../SelectCreated"
import { AllIndustries } from "../../common/AllIndustries"
import {
  fetchSaveCompanySettings,
  addAlertItem,
  confirmDeleteCompany,
  updateCompanyChangePhoneEmail,
} from "../../state/actions"
import { useDispatch, useSelector } from "react-redux"
import Popup from "../Popup"
import InputPhone from "../InputPhone"
import ReactTooltip from "react-tooltip"
import { Element, scroller } from "react-scroll"

const TextCheckbox = styled.span`
  padding-left: 10px;
  font-family: "Poppins-Bold", sans-serif;
  user-select: none;
`

const TextCheckboxSecond = styled.span`
  padding-left: 10px;
  user-select: none;
`

const DeleteCompanyStyle = styled.div`
  margin-bottom: 30px;
`

const CheckboxStyle = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
  .material-checkbox__input:checked + .material-checkbox__image {
    background-color: ${props => Colors(props.siteProps).dangerColorDark};
  }
  span {
    color: ${props => Colors(props.siteProps).textNormalBlack};
    border-color: ${props => Colors(props.siteProps).textNormalBlack};
  }
`

const CheckboxStyleSecond = styled.div`
  margin-bottom: 10px;
  margin-top: 10px;
  .material-checkbox__input:checked + .material-checkbox__image {
    background-color: ${props => Colors(props.siteProps).primaryColorDark};
  }
  span {
    color: ${props => Colors(props.siteProps).textNormalBlack};
    border-color: ${props => Colors(props.siteProps).textNormalBlack};
  }
`

const HeightComponent = styled.div`
  padding-bottom: ${props =>
    props.isCompanyEditProfil && props.editable ? "950px" : "auto"};
  transition-property: padding-bottom;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const ButtonPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const OpinionRight = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`
const ButtonMargin = styled.div`
  margin-left: 5px;
`

const OpinionsAndAdress = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`
const AdressContent = styled.div`
  padding-right: 10px;
  width: 60%;
`

const OpinionsContent = styled.div`
  width: 40%;
  height: 20px;
  padding-left: 10px;
`

const OpinionUp = styled.div`
  background-color: ${props => Colors(props.siteProps).opinionColorUp};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  text-align: center;
  font-size: 1.5rem;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
`

const OpininPadding = styled.div`
  padding: 2px 15px;
`

const OpinionDown = styled.div`
  background-color: ${props => Colors(props.siteProps).opinionColorDown};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  font-size: 0.9rem;
  padding: 2px 15px;
  border-bottom-left-radius: 5px;
  white-space: nowrap;
`

const DivInlineBlock = styled.div`
  display: inline-block;
  padding-right: 5px;
`

const TelephoneDiv = styled.div`
  font-size: 1.5rem;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
`

const CirclePhone = styled.div`
  position: relative;
  top: 3px;
  border-radius: 50%;
  background-color: ${props =>
    props.isCompanyEditProfil
      ? Colors(props.siteProps).secondColor
      : Colors(props.siteProps).primaryColor};
  height: 40px;
  width: 40px;
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
  margin-right: 20px;
`

const ButtonSubmit = styled.button`
  border: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
`

const IsCompanyPaused = styled.div`
  font-family: "Poppins-Bold", sans-serif;
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: ${props => props.color};
  user-select: none;
`

const TextStyleInfo = styled.div`
  font-size: 1rem;
  font-family: "Poppins-Medium", sans-serif;
  color: ${props => Colors(props.siteProps).textNormalBlack};
  margin-top: 10px;
`

const DisabledTextToEdit = styled.div`
  border-radius: 5px;
  background-color: ${props => Colors(props.siteProps).disabled};
  color: ${props => Colors(props.siteProps).textNormalBlack};
  padding: 5px 10px;
  margin-bottom: 20px;
  span {
    display: block;
    font-size: 1rem;
    font-family: "Poppins-Bold", sans-serif;
    color: ${props => Colors(props.siteProps).textNormalBlack};
  }

  .titleInline {
    display: inline-block;
    font-size: 1rem;
    font-family: "Poppins-Bold", sans-serif;
    color: ${props => Colors(props.siteProps).textNormalBlack};
  }
`

const MarginBottomSelect = styled.div`
  margin-bottom: 20px;
`

const OpinionAndAdressContent = ({
  city = "",
  district = "",
  adress = "",
  TitleRightColumn,
  opinionsCount = 0,
  opinionsValue = "0,0",
  phone = "",
  landline = "",
  ButtonEditPosition,
  isCompanyEditProfil = false,
  editable = false,
  onClickEdit = () => {},
  pauseCompany = true,
  companyName = "",
  reservationEveryTimeServer,
  reservationMonthServer,
  companyIndustries = [],
  user,
  company,
  setEditOpinionAndAdress,
  handleResetAllEditedComponents,
  disabledEditButtons,
  editMode,
  code = "00-000",
  premiumActive,
  sharePhone = false,
  isCompanyDisabledChangePhone = false,
  isCompanyDisabledChangeEmail = false,
  dateCompanyDisabledChangePhone = null,
  dateCompanyDisabledChangeEmail = null,
}) => {
  const [industriesComponent, setIndustriesComponent] = useState(null)
  const [newIndustriesComponent, setNewIndustriesComponent] = useState([])
  const [deletedIndustriesComponent, setDeletedIndustriesComponent] = useState(
    []
  )
  const [deleteCompany, setDeleteCompany] = useState(false)
  const [companyNameInput, setCompanyNameInput] = useState(companyName)
  const [cityInput, setCityInput] = useState(city)
  const [codeInput, setCodeInput] = useState(city)
  const [discrictInput, setDiscrictInput] = useState(district)
  const [adressInput, setAdressInput] = useState(adress)
  const [phoneInput, setPhoneInput] = useState(phone)
  const [landlinePhone, setLandlinePhone] = useState(landline)
  const [companyPausedItem, setCompanyPausedItem] = useState(pauseCompany)
  const [companyPhoneShare, setCompanyPhoneShare] = useState(sharePhone)
  const [reserwationEver, setReserwationEver] = useState(
    reservationEveryTimeServer
  )
  const [reserwationMonth, setReserwationMonth] = useState(
    reservationMonthServer
  )
  const siteProps = useSelector(state => state.siteProps)

  const dispatch = useDispatch()

  useEffect(() => {
    setNewIndustriesComponent([])
    setDeletedIndustriesComponent([])
    setEditOpinionAndAdress(false)
    setCompanyNameInput(companyName)
    setCityInput(city)
    setCodeInput(!!code ? code : "00-000")
    setDiscrictInput(district)
    setAdressInput(adress)
    setPhoneInput(phone)
    setLandlinePhone(landline)
    setCompanyPausedItem(pauseCompany)
    setCompanyPhoneShare(sharePhone)
    setReserwationEver(reservationEveryTimeServer)
    setReserwationMonth(reservationMonthServer)

    if (!!companyIndustries) {
      const convertedCompanyIndustriesFromId = companyIndustries.map(itemId => {
        const selectedIndustriesComponent = AllIndustries[
          siteProps.language
        ].find(itemIndustries => itemIndustries.value === itemId)
        return selectedIndustriesComponent
      })
      setIndustriesComponent(convertedCompanyIndustriesFromId)
    }
  }, [company]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setNewIndustriesComponent([])
    setDeletedIndustriesComponent([])
    setCompanyNameInput(companyName)
    setCityInput(city)
    setCodeInput(!!code ? code : "00-000")
    setDiscrictInput(district)
    setAdressInput(adress)
    setPhoneInput(phone)
    setLandlinePhone(landline)
    setCompanyPausedItem(pauseCompany)
    setCompanyPhoneShare(sharePhone)
    setReserwationEver(reservationEveryTimeServer)
    setReserwationMonth(reservationMonthServer)

    if (!!companyIndustries) {
      const convertedCompanyIndustriesFromId = companyIndustries.map(itemId => {
        const selectedIndustriesComponent = AllIndustries[
          siteProps.language
        ].find(itemIndustries => itemIndustries.value === itemId)
        return selectedIndustriesComponent
      })
      setIndustriesComponent(convertedCompanyIndustriesFromId)
    }
  }, [editable, editMode]) // eslint-disable-line react-hooks/exhaustive-deps

  const validLandlinePhone =
    landlinePhone !== null
      ? landlinePhone.length === 7 || landlinePhone.length === 0
        ? true
        : null
      : true

  const validButtonRegisterCompany =
    companyNameInput.length >= 3 &&
    phoneInput.length === 9 &&
    cityInput.length >= 3 &&
    codeInput.length >= 5 &&
    discrictInput.length >= 3 &&
    adressInput.length >= 3 &&
    validLandlinePhone

  const disabledButtonSubmit =
    (deletedIndustriesComponent.length > 0 ||
      newIndustriesComponent.length > 0 ||
      reserwationMonth !== reservationMonthServer ||
      reserwationEver !== reservationEveryTimeServer ||
      companyNameInput !== companyName ||
      cityInput !== city ||
      codeInput !== code ||
      discrictInput !== district ||
      adressInput !== adress ||
      phoneInput !== phone ||
      landlinePhone !== landline ||
      companyPausedItem !== pauseCompany ||
      companyPhoneShare !== sharePhone) &&
    validButtonRegisterCompany

  const handleOnSubmit = e => {
    e.preventDefault()
    if (disabledButtonSubmit && premiumActive) {
      const updateCityInput = cityInput !== city ? cityInput : null
      const updateCodeInput = codeInput !== city ? codeInput : null
      const updateDiscrictInput =
        discrictInput !== district ? discrictInput : null
      const updateAdressInput = adressInput !== adress ? adressInput : null
      const updatePhoneInput = phoneInput !== phone ? phoneInput : null
      const updatedLandlinePhone =
        landlinePhone !== landline ? landlinePhone : null
      const updateNompanyNameInput =
        companyNameInput !== companyName ? companyNameInput : null

      let pauseCompanyToServer = null
      if (pauseCompany !== companyPausedItem) {
        pauseCompanyToServer = !pauseCompany
      }

      let updateCompanySharePhone = null
      if (sharePhone !== companyPhoneShare) {
        updateCompanySharePhone = !sharePhone
      }

      let reserwationMonthToServer = null
      if (reserwationMonth !== reservationMonthServer) {
        reserwationMonthToServer = reserwationMonth
      }

      let reserwationEverToServer = null
      if (reserwationEver !== reservationEveryTimeServer) {
        reserwationEverToServer = reserwationEver
      }

      const mapCompanyIndustries = industriesComponent.map(item => item.value)

      const dataSettings = {
        updateCityInput: updateCityInput,
        updateCodeInput: updateCodeInput,
        updateDiscrictInput: updateDiscrictInput,
        updateAdressInput: updateAdressInput,
        updatePhoneInput: updatePhoneInput,
        updateNompanyNameInput: updateNompanyNameInput,
        industriesComponent: mapCompanyIndustries,
        pauseCompanyToServer: pauseCompanyToServer,
        reserwationMonthToServer: reserwationMonthToServer,
        reserwationEverToServer: reserwationEverToServer,
        updatedLandlinePhone: updatedLandlinePhone,
        updateCompanySharePhone: updateCompanySharePhone,
      }

      scroller.scrollTo("opinionScrollElement", {
        duration: 100,
        smooth: true,
        offset: -100,
      })

      dispatch(
        fetchSaveCompanySettings(user.token, user.company._id, dataSettings)
      )
    } else {
      if (companyNameInput.length < 3) {
        dispatch(addAlertItem("Nazwa firmy jest za krótka", "red"))
      }
      if (landlinePhone !== null) {
        if (landlinePhone.length !== 7) {
          dispatch(addAlertItem("Nieprawidłowy numer stacjonarny", "red"))
        }
      }
      if (phoneInput.length !== 9) {
        dispatch(addAlertItem("Nieprawidłowy numer telefonu", "red"))
      }
      if (cityInput.length < 3) {
        dispatch(addAlertItem("Nieprawidłowa miejscowość", "red"))
      }
      if (codeInput.length < 5) {
        dispatch(addAlertItem("Nieprawidłowy kod miasta", "red"))
      }
      if (discrictInput.length < 3) {
        dispatch(addAlertItem("Nieprawidłowa dzielnica", "red"))
      }
      if (adressInput.length < 3) {
        dispatch(addAlertItem("Nieprawidłowy aders", "red"))
      }
    }
  }

  const handleChangeInputs = (e, setChange) => {
    setChange(e.target.value)
  }

  const handleResetInputs = () => {
    setNewIndustriesComponent([])
    setDeletedIndustriesComponent([])
    onClickEdit()
    setCompanyNameInput(companyName)
    setCityInput(city)
    setCodeInput(!!code ? code : "00-000")
    setCodeInput(city)
    setDiscrictInput(district)
    setAdressInput(adress)
    setPhoneInput(phone)
    setLandlinePhone(landline)
    setCompanyPausedItem(pauseCompany)
    setCompanyPhoneShare(sharePhone)
    setReserwationEver(reservationEveryTimeServer)
    setReserwationMonth(reservationMonthServer)
    setDeleteCompany(false)
    scroller.scrollTo("opinionScrollElement", {
      duration: 100,
      smooth: true,
      offset: -80,
    })
    if (!!companyIndustries) {
      const convertedCompanyIndustriesFromId = companyIndustries.map(itemId => {
        const selectedIndustriesComponent = AllIndustries[
          siteProps.language
        ].find(itemIndustries => itemIndustries.value === itemId)
        return selectedIndustriesComponent
      })
      setIndustriesComponent(convertedCompanyIndustriesFromId)
    }
  }

  const handleEdit = () => {
    scroller.scrollTo("opinionScrollElement", {
      duration: 100,
      smooth: true,
      offset: -100,
    })
    handleResetAllEditedComponents()
    onClickEdit()
  }

  const handleDeleteCompany = () => {
    setDeleteCompany(prevState => !prevState)
  }

  const handleChangeCheckbox = () => {
    setCompanyPausedItem(prevState => !prevState)
  }

  const handleChangeCheckboxPhone = () => {
    setCompanyPhoneShare(prevState => !prevState)
  }

  const handleConfirmDeleteCompany = () => {
    handleResetInputs()
    dispatch(confirmDeleteCompany(true))
  }

  const handleChangeReserwationEver = value => {
    setReserwationEver(value.value)
  }

  const handleChangeReserwationMonth = value => {
    setReserwationMonth(value.value)
  }

  const handleUpdateChangeCompanyPhoneEmail = (changePhone, changeEmail) => {
    dispatch(updateCompanyChangePhoneEmail(changePhone, changeEmail))
  }

  const handleChangeIndystries = value => {
    const allValues = value ? value : []
    let allNewIndustries = [...newIndustriesComponent]
    let allDeletedIndustries = [...deletedIndustriesComponent]

    //filter addded industries component when delete
    allNewIndustries = allNewIndustries.filter(itemNew => {
      const isInNewValue = allValues.some(item => item.value === itemNew)
      return isInNewValue
    })

    allValues.forEach(itemValue => {
      const isValueInNewCompanyIndustries = newIndustriesComponent.some(
        item => item === itemValue.value
      )

      const isValueInDeletedCompanyIndustries = allDeletedIndustries.some(
        item => item === itemValue.value
      )

      if (isValueInDeletedCompanyIndustries) {
        const filterDeletedItems = allDeletedIndustries.filter(
          itemDeleted => itemDeleted !== itemValue.value
        )
        allDeletedIndustries = filterDeletedItems
      }
      //added industries
      const isValueInCompanyIndustries = companyIndustries.some(
        item => item === itemValue.value
      )
      if (!isValueInCompanyIndustries && !isValueInNewCompanyIndustries) {
        allNewIndustries.push(itemValue.value)
      }
    })
    // industriesComponent
    //deleted industries
    companyIndustries.forEach(companyItem => {
      const isValueInNewValues = allValues.some(
        item => item.value === companyItem
      )
      const isValueInDeleted = allDeletedIndustries.some(
        item => item === companyItem
      )
      if (!isValueInNewValues && !isValueInDeleted) {
        allDeletedIndustries.push(companyItem)
      }
    })

    setNewIndustriesComponent(allNewIndustries)
    setDeletedIndustriesComponent(allDeletedIndustries)
    setIndustriesComponent(value)
  }

  const mapReserwationDelaySelect = ReserwationDelay.map(item => {
    return {
      value: item,
      label: item + " min",
    }
  })

  const mapReserwationMonthSelect = ReserwationDelayMonth.map(item => {
    return {
      value: item.id,
      label: `${item.id} ${item.month}`,
    }
  })

  const findMonthDelay = ReserwationDelayMonth.find(
    item => item.id === reserwationMonth
  )
  let nameMonthDelay = ""
  if (!!findMonthDelay) {
    nameMonthDelay = findMonthDelay.month
  }

  let phoneNumberRender = null
  if (phoneInput.length === 9) {
    phoneNumberRender = `${phoneInput.charAt(0)}${phoneInput.charAt(
      1
    )}${phoneInput.charAt(2)}-${phoneInput.charAt(3)}${phoneInput.charAt(
      4
    )}${phoneInput.charAt(5)}-${phoneInput.charAt(6)}${phoneInput.charAt(
      7
    )}${phoneInput.charAt(8)}`
  }

  let phoneLandlineNumberRender = null
  if (!!landlinePhone) {
    if (landlinePhone.length === 7) {
      phoneLandlineNumberRender = `+48 ${landlinePhone.charAt(
        0
      )}${landlinePhone.charAt(1)}${landlinePhone.charAt(
        2
      )}-${landlinePhone.charAt(3)}${landlinePhone.charAt(
        4
      )}-${landlinePhone.charAt(5)}${landlinePhone.charAt(6)}`
    }
  }

  return (
    <Element name="opinionScrollElement" className="element">
      <HeightComponent
        isCompanyEditProfil={isCompanyEditProfil}
        editable={editable}
      >
        {isCompanyEditProfil ? (
          companyPausedItem ? (
            <IsCompanyPaused color={Colors(siteProps).dangerColor}>
              Działalność wstrzymana
            </IsCompanyPaused>
          ) : (
            <IsCompanyPaused color={Colors(siteProps).successColor}>
              Działalność aktywna
            </IsCompanyPaused>
          )
        ) : companyPausedItem ? (
          <IsCompanyPaused color={Colors(siteProps).dangerColor}>
            Działalność wstrzymana
          </IsCompanyPaused>
        ) : null}
        <OpinionsAndAdress>
          <AdressContent>
            <TitleRightColumn adress siteProps={siteProps}>
              <DivInlineBlock> {`${codeInput},`}</DivInlineBlock>
              <DivInlineBlock> {`${cityInput},`}</DivInlineBlock>
              <DivInlineBlock>{`${discrictInput},`}</DivInlineBlock>
              <DivInlineBlock> {`${adressInput}`}</DivInlineBlock>
            </TitleRightColumn>
          </AdressContent>
          <OpinionsContent>
            <OpinionRight>
              <OpinionUp siteProps={siteProps}>
                <OpininPadding>
                  {opinionsValue > 0 && opinionsCount > 0
                    ? Math.round((opinionsValue / opinionsCount) * 10) / 10
                    : 0}
                </OpininPadding>
                <OpinionDown siteProps={siteProps}>
                  Opinie: {opinionsCount}
                </OpinionDown>
              </OpinionUp>
            </OpinionRight>
          </OpinionsContent>
        </OpinionsAndAdress>
        {!!phoneNumberRender && companyPhoneShare ? (
          <TelephoneDiv>
            <CirclePhone siteProps={siteProps}>
              <MdSmartphone />
            </CirclePhone>
            {phoneNumberRender}
          </TelephoneDiv>
        ) : (
          !!phoneNumberRender &&
          !!!phoneLandlineNumberRender && (
            <TelephoneDiv>
              <CirclePhone siteProps={siteProps}>
                <MdSmartphone />
              </CirclePhone>
              Brak numeru
            </TelephoneDiv>
          )
        )}
        {!!phoneLandlineNumberRender && (
          <TelephoneDiv>
            <CirclePhone siteProps={siteProps}>
              <MdPhone />
            </CirclePhone>
            {phoneLandlineNumberRender}
          </TelephoneDiv>
        )}
        {isCompanyEditProfil && (
          <>
            <ButtonEditPosition>
              <div data-tip data-for="disabledButtonOnly">
                <ButtonIcon
                  title="Edytuj ustawienia"
                  uppercase
                  fontIconSize="25"
                  fontSize="14"
                  icon={<MdEdit />}
                  secondColors
                  onClick={handleEdit}
                  disabled={disabledEditButtons}
                />
              </div>
            </ButtonEditPosition>
            <Popup
              popupEnable={editable}
              position="absolute"
              title="Edycja ustawień"
              borderRadius
              closeTitle={false}
              smallTitle
              maxHeight={false}
              secondColors
            >
              <form onSubmit={handleOnSubmit}>
                <TextStyleInfo siteProps={siteProps}>
                  Email firmowy:
                </TextStyleInfo>
                <DisabledTextToEdit siteProps={siteProps}>
                  {!!company.email
                    ? company.email
                    : "Błąd podczas pobierania adresu e-mail"}
                </DisabledTextToEdit>
                {isCompanyDisabledChangeEmail &&
                  !!dateCompanyDisabledChangeEmail && (
                    <ReactTooltip
                      id="changeEmailCompany"
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
                <DeleteCompanyStyle data-tip data-for="changeEmailCompany">
                  <ButtonIcon
                    title="Zmień adres e-mail"
                    uppercase
                    fontIconSize="20"
                    fontSize="13"
                    icon={<MdEdit />}
                    customColorButton={Colors(siteProps).primaryColorDark}
                    customColorIcon={Colors(siteProps).primaryColor}
                    disabled={isCompanyDisabledChangeEmail}
                    onClick={() => {
                      handleUpdateChangeCompanyPhoneEmail(false, true)
                    }}
                  />
                </DeleteCompanyStyle>
                <TextStyleInfo siteProps={siteProps}>
                  Telefon firmowy:
                </TextStyleInfo>
                <DisabledTextToEdit siteProps={siteProps}>
                  {!!phoneInput
                    ? phoneInput
                    : "Błąd podczas pobierania telefonu firmowego"}
                </DisabledTextToEdit>
                {isCompanyDisabledChangePhone &&
                  !!dateCompanyDisabledChangePhone && (
                    <ReactTooltip
                      id="changePhoneCompany"
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
                <DeleteCompanyStyle data-tip data-for="changePhoneCompany">
                  <ButtonIcon
                    title="Zmień numer telefonu"
                    uppercase
                    fontIconSize="20"
                    fontSize="13"
                    icon={<MdEdit />}
                    customColorButton={Colors(siteProps).primaryColorDark}
                    customColorIcon={Colors(siteProps).primaryColor}
                    disabled={isCompanyDisabledChangePhone}
                    onClick={() => {
                      handleUpdateChangeCompanyPhoneEmail(true, false)
                    }}
                  />
                </DeleteCompanyStyle>
                <CheckboxStyleSecond siteProps={siteProps}>
                  <Checkbox
                    theme="material-checkbox"
                    value={companyPhoneShare}
                    onChange={handleChangeCheckboxPhone}
                  >
                    <TextCheckboxSecond>
                      Udostępnij telefon firmowy
                    </TextCheckboxSecond>
                  </Checkbox>
                </CheckboxStyleSecond>
                <MarginBottomSelect>
                  <InputPhone
                    defaultValues={landlinePhone}
                    setPhoneNumber={setLandlinePhone}
                    width={26}
                    marginElements={5}
                    textPhone="Numer stacjonarny:"
                    phoneLength={7}
                  />
                </MarginBottomSelect>
                <InputIcon
                  icon={<MdWork />}
                  placeholder="Nazwa firmy"
                  type="text"
                  secondColor
                  onChange={e => handleChangeInputs(e, setCompanyNameInput)}
                  value={companyNameInput}
                  required
                  validText="Minimum 3 znaki, unikalna nazwa firmy"
                />
                <InputIcon
                  icon={<MdLocationCity />}
                  placeholder="Miejscowość"
                  type="text"
                  secondColor
                  onChange={e => handleChangeInputs(e, setCityInput)}
                  value={cityInput}
                  required
                  validText="Minimum 3 znaki"
                />
                <InputIcon
                  icon={<MdLocationCity />}
                  placeholder="Kod pocztowy"
                  type="text"
                  secondColor
                  onChange={e => handleChangeInputs(e, setCodeInput)}
                  value={codeInput}
                  required
                  validText="Minimum 5 znaków"
                />
                <InputIcon
                  icon={<FaMapSigns />}
                  placeholder="Dzielnica"
                  type="text"
                  secondColor
                  onChange={e => handleChangeInputs(e, setDiscrictInput)}
                  value={discrictInput}
                  required
                  validText="Minimum 3 znaki"
                />
                <InputIcon
                  icon={<MdLocationOn />}
                  placeholder="Adres firmy"
                  type="text"
                  secondColor
                  onChange={e => handleChangeInputs(e, setAdressInput)}
                  value={adressInput}
                  required
                  validText="Minimum 3 znaki"
                />

                <TextStyleInfo siteProps={siteProps}>
                  Rezerwacja co:
                </TextStyleInfo>
                <MarginBottomSelect>
                  <SelectCreated
                    options={mapReserwationDelaySelect}
                    value={{
                      value: reserwationEver,
                      label: reserwationEver + " min",
                    }}
                    handleChange={handleChangeReserwationEver}
                    placeholder="Rezerwacja co..."
                    defaultMenuIsOpen={false}
                    widthAuto
                    isClearable={false}
                    deleteItem={false}
                    darkSelect
                    maxMenuHeight={200}
                  />
                </MarginBottomSelect>
                <TextStyleInfo siteProps={siteProps}>
                  Rezerwacja do:
                </TextStyleInfo>
                <MarginBottomSelect>
                  <SelectCreated
                    options={mapReserwationMonthSelect}
                    value={{
                      value: reserwationMonth,
                      label: `${reserwationMonth} ${nameMonthDelay}`,
                    }}
                    handleChange={handleChangeReserwationMonth}
                    placeholder="Rezerwacja do..."
                    defaultMenuIsOpen={false}
                    widthAuto
                    isClearable={false}
                    deleteItem={false}
                    darkSelect
                    maxMenuHeight={200}
                    top
                  />
                </MarginBottomSelect>
                <TextStyleInfo siteProps={siteProps}>
                  Typ prowadzonej działalności
                </TextStyleInfo>
                <MarginBottomSelect>
                  <SelectCreated
                    options={AllIndustries[siteProps.language]}
                    value={industriesComponent}
                    handleChange={handleChangeIndystries}
                    placeholder="Typy działalności"
                    defaultMenuIsOpen={false}
                    widthAuto
                    isMulti
                    isClearable={false}
                    darkSelect
                    onlyText
                    maxMenuHeight={200}
                    closeMenuOnSelect={false}
                    top
                  />
                </MarginBottomSelect>
                <CheckboxStyle siteProps={siteProps}>
                  <Checkbox
                    theme="material-checkbox"
                    value={companyPausedItem}
                    onChange={handleChangeCheckbox}
                  >
                    <TextCheckbox>Wstrzymaj działalność</TextCheckbox>
                  </Checkbox>
                </CheckboxStyle>
                {editMode && (
                  <ReactTooltip
                    id="deleteCompany"
                    effect="float"
                    multiline={true}
                  >
                    <span>
                      Usunięcie działalności spowoduje odwołanie wszystkich
                      aktywnych wizyt, usunięcie wszystkich pracowników oraz
                      wszystkich danych na temat Twojej firmy.
                    </span>
                  </ReactTooltip>
                )}
                <DeleteCompanyStyle data-tip data-for="deleteCompany">
                  <ButtonIcon
                    title="Usuń działalność"
                    uppercase
                    fontIconSize="20"
                    fontSize="13"
                    icon={<MdDelete />}
                    customColorButton={Colors(siteProps).dangerColorDark}
                    customColorIcon={Colors(siteProps).dangerColor}
                    onClick={handleDeleteCompany}
                  />
                </DeleteCompanyStyle>
                <ButtonPosition>
                  <ButtonMargin>
                    <>
                      <ButtonIcon
                        title="Cofnij"
                        uppercase
                        fontIconSize="16"
                        fontSize="13"
                        icon={<FaArrowLeft />}
                        customColorButton={Colors(siteProps).dangerColorDark}
                        customColorIcon={Colors(siteProps).dangerColor}
                        onClick={handleResetInputs}
                      />
                    </>
                  </ButtonMargin>
                  <ButtonSubmit type="submit">
                    <ButtonMargin>
                      <div data-tip data-for="disabledButtonValidPremium">
                        <ButtonIcon
                          title="Zapisz"
                          uppercase
                          fontIconSize="16"
                          fontSize="13"
                          icon={<FaSave />}
                          customColorButton={Colors(siteProps).successColorDark}
                          customColorIcon={Colors(siteProps).successColor}
                          disabled={!disabledButtonSubmit || !premiumActive}
                        />
                      </div>
                    </ButtonMargin>
                  </ButtonSubmit>
                </ButtonPosition>
              </form>
              <Popup
                popupEnable={deleteCompany}
                position="absolute"
                borderRadius
                noContent
              >
                <ButtonPosition>
                  <ButtonMargin>
                    <ButtonIcon
                      title="Anuluj"
                      uppercase
                      fontIconSize="16"
                      fontSize="13"
                      icon={<FaArrowLeft />}
                      customColorButton={Colors(siteProps).successColorDark}
                      customColorIcon={Colors(siteProps).successColor}
                      onClick={handleDeleteCompany}
                    />
                  </ButtonMargin>
                  <ButtonMargin>
                    <ButtonIcon
                      title="Usuń"
                      uppercase
                      fontIconSize="20"
                      fontSize="13"
                      icon={<MdDelete />}
                      customColorButton={Colors(siteProps).dangerColorDark}
                      customColorIcon={Colors(siteProps).dangerColor}
                      onClick={handleConfirmDeleteCompany}
                    />
                  </ButtonMargin>
                </ButtonPosition>
              </Popup>
            </Popup>
          </>
        )}
      </HeightComponent>
    </Element>
  )
}
export default OpinionAndAdressContent
