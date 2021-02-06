import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Colors } from "../../common/Colors"
import ButtonIcon from "../ButtonIcon"
import { MdEdit, MdPhone } from "react-icons/md"
import InputIcon from "../InputIcon"
import {
  MdPhoneAndroid,
  MdLocationOn,
  MdLocationCity,
  MdWork,
} from "react-icons/md"
import { FaMapSigns } from "react-icons/fa"
import { CSSTransition } from "react-transition-group"
import { Checkbox } from "react-input-checkbox"
import { FaArrowLeft, FaSave } from "react-icons/fa"
import { ReserwationDelay } from "../../common/ReserwationDelay"
import { ReserwationDelayMonth } from "../../common/ReserwationDelayMonth"
import SelectCustom from "../SelectCustom"
import { AllIndustries } from "../../common/AllIndustries"
import { fetchSaveCompanySettings } from "../../state/actions"
import { useDispatch, useSelector } from "react-redux"

const TextCheckbox = styled.span`
  padding-left: 10px;
  font-weight: 600;
  user-select: none;
`

const CheckboxStyle = styled.div`
  margin-bottom: 30px;
  margin-top: 10px;
  .material-checkbox__input:checked + .material-checkbox__image {
    background-color: ${props => Colors(props.siteProps).dangerColorDark};
  }
  span {
    color: ${props => Colors(props.siteProps).textNormalBlack};
    border-color: ${props => Colors(props.siteProps).textNormalBlack};
  }
`

const HeightComponent = styled.div`
  padding-bottom: ${props =>
    props.isCompanyEditProfil && props.editable ? "700px" : "auto"};
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
  background-color: ${props => Colors(props.siteProps).companyItemBackground};
  padding: 10px;
  border-radius: 5px;
  max-height: 90%;
`

const ButtonSubmit = styled.button`
  border: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
`

const IsCompanyPaused = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: ${props => props.color};
  user-select: none;
`

const ReserwationItem = styled.div`
  height: 30px;
  width: 65px;
  display: flex;
  margin-bottom: 5px;
  margin-right: ${props => (props.index ? "0px" : "5px")};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.active
      ? Colors(props.siteProps).secondColor
      : Colors(props.siteProps).secondDarkColor};
  border-radius: 5px;
  color: white;
  cursor: pointer;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  transition-property: transform, background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  user-select: none;
  &:hover {
    transform: scale(1.2);
  }
`

const ReserwationMonth = styled.div`
  height: 30px;
  padding: 5px 10px;
  display: flex;
  margin-bottom: 5px;
  margin-right: ${props => (props.index ? "0px" : "12px")};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${props =>
    props.active
      ? Colors(props.siteProps).secondColor
      : Colors(props.siteProps).secondDarkColor};
  border-radius: 5px;
  color: white;
  cursor: pointer;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  transition-property: transform, background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  user-select: none;
  font-size: 0.9rem;
  &:hover {
    transform: scale(1.2);
  }
`

const AllReserwationTime = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
`

const OpinionAndAdressContent = ({
  city = "",
  district = "",
  adress = "",
  TitleRightColumn,
  opinionsCount = 0,
  opinionsValue = "0,0",
  phone = "000000000",
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
}) => {
  const [industriesComponent, setIndustriesComponent] = useState(null)
  const [newIndustriesComponent, setNewIndustriesComponent] = useState([])
  const [deletedIndustriesComponent, setDeletedIndustriesComponent] = useState(
    []
  )
  const [companyNameInput, setCompanyNameInput] = useState(companyName)
  const [cityInput, setCityInput] = useState(city)
  const [discrictInput, setDiscrictInput] = useState(district)
  const [adressInput, setAdressInput] = useState(adress)
  const [phoneInput, setPhoneInput] = useState(phone)
  const [companyPausedItem, setCompanyPausedItem] = useState(pauseCompany)
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
    setDiscrictInput(district)
    setAdressInput(adress)
    setPhoneInput(phone)
    setCompanyPausedItem(pauseCompany)
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
  }, [company])

  useEffect(() => {
    setNewIndustriesComponent([])
    setDeletedIndustriesComponent([])
    setCompanyNameInput(companyName)
    setCityInput(city)
    setDiscrictInput(district)
    setAdressInput(adress)
    setPhoneInput(phone)
    setCompanyPausedItem(pauseCompany)
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
  }, [editable, editMode])

  const disabledButtonSubmit =
    deletedIndustriesComponent.length > 0 ||
    newIndustriesComponent.length > 0 ||
    reserwationMonth !== reservationMonthServer ||
    reserwationEver !== reservationEveryTimeServer ||
    companyNameInput !== companyName ||
    cityInput !== city ||
    discrictInput !== district ||
    adressInput !== adress ||
    phoneInput !== phone ||
    companyPausedItem !== pauseCompany

  const handleOnSubmit = e => {
    e.preventDefault()
    if (disabledButtonSubmit) {
      const updateCityInput = cityInput !== city ? cityInput : null
      const updateDiscrictInput =
        discrictInput !== district ? discrictInput : null
      const updateAdressInput = adressInput !== adress ? adressInput : null
      const updatePhoneInput = phoneInput !== phone ? phoneInput : null
      const updateNompanyNameInput =
        companyNameInput !== companyName ? companyNameInput : null

      let newIndustriesComponentToServer = null
      if (newIndustriesComponent.length > 0) {
        newIndustriesComponentToServer = newIndustriesComponent
      }

      let deletedIndustriesToServer = null
      if (deletedIndustriesComponent.length > 0) {
        deletedIndustriesToServer = deletedIndustriesComponent
      }

      let pauseCompanyToServer = null
      if (pauseCompany !== companyPausedItem) {
        pauseCompanyToServer = !pauseCompany
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
        updateDiscrictInput: updateDiscrictInput,
        updateAdressInput: updateAdressInput,
        updatePhoneInput: updatePhoneInput,
        updateNompanyNameInput: updateNompanyNameInput,
        industriesComponent: mapCompanyIndustries,
        pauseCompanyToServer: pauseCompanyToServer,
        reserwationMonthToServer: reserwationMonthToServer,
        reserwationEverToServer: reserwationEverToServer,
      }
      dispatch(
        fetchSaveCompanySettings(user.token, user.company._id, dataSettings)
      )

      // onClickEdit()
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
    setDiscrictInput(district)
    setAdressInput(adress)
    setPhoneInput(phone)
    setCompanyPausedItem(pauseCompany)
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
  }

  const handleEdit = () => {
    handleResetAllEditedComponents()
    onClickEdit()
  }

  const handleClickContentAddWorkers = e => {
    e.stopPropagation()
  }

  const handleChangeCheckbox = () => {
    setCompanyPausedItem(prevState => !prevState)
  }

  const handleClickReserwationEver = item => {
    setReserwationEver(item)
  }

  const handleClickReserwationMonth = item => {
    setReserwationMonth(item)
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

  const mapReserwationDelay = ReserwationDelay.map((item, index) => {
    const isActive = reserwationEver === item
    return (
      <ReserwationItem
        key={index}
        active={isActive}
        onClick={() => handleClickReserwationEver(item)}
        siteProps={siteProps}
        index={index === 3}
      >
        <div>{item} min</div>
      </ReserwationItem>
    )
  })

  const mapReserwationDelayMonth = ReserwationDelayMonth.map((item, index) => {
    const isActive = reserwationMonth === item.id
    return (
      <ReserwationMonth
        key={index}
        active={isActive}
        onClick={() => handleClickReserwationMonth(item.id)}
        siteProps={siteProps}
        index={index === 11}
      >
        <div>{`${item.id} ${item.month}`}</div>
      </ReserwationMonth>
    )
  })

  const phoneNumberRender = `${phoneInput.charAt(0)}${phoneInput.charAt(
    1
  )}${phoneInput.charAt(2)}-${phoneInput.charAt(3)}${phoneInput.charAt(
    4
  )}${phoneInput.charAt(5)}-${phoneInput.charAt(6)}${phoneInput.charAt(
    7
  )}${phoneInput.charAt(8)}`

  return (
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
      <TelephoneDiv>
        <CirclePhone siteProps={siteProps}>
          <MdPhone />
        </CirclePhone>
        {phoneNumberRender}
      </TelephoneDiv>
      {isCompanyEditProfil && (
        <>
          <ButtonEditPosition>
            <div data-tip data-for="disabledButton">
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

          <CSSTransition
            in={editable}
            timeout={400}
            classNames="popup"
            unmountOnExit
          >
            <BackgroundEdit>
              <BackgroundEditContent
                onClick={handleClickContentAddWorkers}
                siteProps={siteProps}
              >
                <form onSubmit={handleOnSubmit}>
                  <InputIcon
                    icon={<MdWork />}
                    placeholder="Nazwa firmy"
                    type="text"
                    secondColor
                    onChange={e => handleChangeInputs(e, setCompanyNameInput)}
                    value={companyNameInput}
                    required
                  />
                  <InputIcon
                    icon={<MdLocationCity />}
                    placeholder="Miejscowość"
                    type="text"
                    secondColor
                    onChange={e => handleChangeInputs(e, setCityInput)}
                    value={cityInput}
                    required
                  />
                  <InputIcon
                    icon={<FaMapSigns />}
                    placeholder="Dzielnica"
                    type="text"
                    secondColor
                    onChange={e => handleChangeInputs(e, setDiscrictInput)}
                    value={discrictInput}
                    required
                  />
                  <InputIcon
                    icon={<MdLocationOn />}
                    placeholder="Adres firmy"
                    type="text"
                    secondColor
                    onChange={e => handleChangeInputs(e, setAdressInput)}
                    value={adressInput}
                    required
                  />
                  <InputIcon
                    icon={<MdPhoneAndroid />}
                    placeholder="Numer telefonu"
                    type="number"
                    secondColor
                    onChange={e => handleChangeInputs(e, setPhoneInput)}
                    value={phoneInput}
                    required
                  />
                  Rezerwacja co:
                  <AllReserwationTime>{mapReserwationDelay}</AllReserwationTime>
                  Rezerwacja do:
                  <AllReserwationTime>
                    {mapReserwationDelayMonth}
                  </AllReserwationTime>
                  Typ działalności:
                  <SelectCustom
                    options={AllIndustries[siteProps.language]}
                    value={industriesComponent}
                    handleChange={handleChangeIndystries}
                    placeholder="Działalność..."
                    defaultMenuIsOpen={false}
                    widthAuto
                    secondColor
                    isMulti
                    isClearable={false}
                  />
                  <CheckboxStyle siteProps={siteProps}>
                    <Checkbox
                      theme="material-checkbox"
                      value={companyPausedItem}
                      onChange={handleChangeCheckbox}
                    >
                      <TextCheckbox>Wstrzymaj działalność</TextCheckbox>
                    </Checkbox>
                  </CheckboxStyle>
                  <ButtonPosition>
                    <ButtonMargin>
                      <>
                        <ButtonIcon
                          title="Cofnij"
                          uppercase
                          fontIconSize="16"
                          fontSize="12"
                          icon={<FaArrowLeft />}
                          customColorButton={Colors(siteProps).dangerColorDark}
                          customColorIcon={Colors(siteProps).dangerColor}
                          onClick={handleResetInputs}
                        />
                      </>
                    </ButtonMargin>
                    <ButtonSubmit type="submit">
                      <ButtonMargin>
                        <ButtonIcon
                          title="Zapisz"
                          uppercase
                          fontIconSize="16"
                          fontSize="14"
                          icon={<FaSave />}
                          customColorButton={Colors(siteProps).successColorDark}
                          customColorIcon={Colors(siteProps).successColor}
                          disabled={!disabledButtonSubmit}
                        />
                      </ButtonMargin>
                    </ButtonSubmit>
                  </ButtonPosition>
                </form>
              </BackgroundEditContent>
            </BackgroundEdit>
          </CSSTransition>
        </>
      )}
    </HeightComponent>
  )
}
export default OpinionAndAdressContent
