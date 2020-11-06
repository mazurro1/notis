import React, { useState } from "react"
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

const TextCheckbox = styled.span`
  padding-left: 10px;
  font-weight: 600;
  user-select: none;
`

const CheckboxStyle = styled.div`
  margin-bottom: 30px;
  margin-top: 10px;
  .material-checkbox__input:checked + .material-checkbox__image {
    background-color: #c62828;
  }
`

const HeightComponent = styled.div`
  padding-bottom: ${props =>
    props.isCompanyEditProfil && props.editable ? "240px" : "auto"};
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
  background-color: ${Colors.navBackground};
  color: white;
  text-align: center;
  font-size: 1.5rem;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
`

const OpininPadding = styled.div`
  padding: 2px 15px;
`

const OpinionDown = styled.div`
  background-color: #424242;
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
    props.isCompanyEditProfil ? Colors.secondColor : Colors.buttonIconColor};
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
  background-color: white;
  padding: 10px;
  border-radius: 5px;
  max-height: 90%;
`

const ButtonSubmit = styled.button`
  border: none;
  padding: 0;
  margin: 0;
  background-color: white;
`

const IsCompanyPaused = styled.div`
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: ${props => props.color};
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
  handleChangeUpodateAdress,
  setCompanyPaused,
  pauseCompany = true,
  companyName = "",
}) => {
  const [companyNameInput, setCompanyNameInput] = useState(companyName)
  const [cityInput, setCityInput] = useState(city)
  const [discrictInput, setDiscrictInput] = useState(district)
  const [adressInput, setAdressInput] = useState(adress)
  const [phoneInput, setPhoneInput] = useState(phone)
  const [companyPausedItem, setCompanyPausedItem] = useState(pauseCompany)

  const disabledButtonSubmit =
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
      handleChangeUpodateAdress(
        updateNompanyNameInput,
        updateCityInput,
        updateDiscrictInput,
        updateAdressInput,
        updatePhoneInput
      )
      if (pauseCompany === companyPausedItem) {
        setCompanyPaused(null)
      } else {
        setCompanyPaused(!pauseCompany)
      }
      onClickEdit()
    }
  }

  const handleChangeInputs = (e, setChange) => {
    setChange(e.target.value)
  }

  const handleResetInputs = () => {
    onClickEdit()
    setCompanyNameInput(companyName)
    setCityInput(city)
    setDiscrictInput(district)
    setAdressInput(adress)
    setPhoneInput(phone)
    handleChangeUpodateAdress(null, null, null, null, null)
    setCompanyPausedItem(pauseCompany)
    setCompanyPaused(null)
  }

  const handleEdit = () => {
    onClickEdit()
  }

  const handleClickContentAddWorkers = e => {
    e.stopPropagation()
  }

  const handleChangeCheckbox = () => {
    setCompanyPausedItem(prevState => !prevState)
  }

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
          <IsCompanyPaused color="#f44336">
            Działalność wstrzymana
          </IsCompanyPaused>
        ) : (
          <IsCompanyPaused color="#43a047">Działalność aktywna</IsCompanyPaused>
        )
      ) : companyPausedItem ? (
        <IsCompanyPaused color="#f44336">
          Działalność wstrzymana
        </IsCompanyPaused>
      ) : null}
      <OpinionsAndAdress>
        <AdressContent>
          <TitleRightColumn isCompanyEditProfil={isCompanyEditProfil} adress>
            <DivInlineBlock> {`${cityInput},`}</DivInlineBlock>
            <DivInlineBlock>{`${discrictInput},`}</DivInlineBlock>
            <DivInlineBlock> {`${adressInput}`}</DivInlineBlock>
          </TitleRightColumn>
        </AdressContent>
        <OpinionsContent>
          <OpinionRight>
            <OpinionUp>
              <OpininPadding>{opinionsValue}</OpininPadding>
              <OpinionDown>Opinie: {opinionsCount}</OpinionDown>
            </OpinionUp>
          </OpinionRight>
        </OpinionsContent>
      </OpinionsAndAdress>
      <TelephoneDiv>
        <CirclePhone isCompanyEditProfil={isCompanyEditProfil}>
          <MdPhone />
        </CirclePhone>
        {phoneNumberRender}
      </TelephoneDiv>
      {isCompanyEditProfil && (
        <>
          <ButtonEditPosition>
            <ButtonIcon
              title="Edytuj"
              uppercase
              fontIconSize="25"
              fontSize="14"
              icon={<MdEdit />}
              secondColors
              onClick={handleEdit}
            />
          </ButtonEditPosition>

          <CSSTransition
            in={editable}
            timeout={400}
            classNames="popup"
            unmountOnExit
          >
            <BackgroundEdit>
              <BackgroundEditContent onClick={handleClickContentAddWorkers}>
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
                  <CheckboxStyle>
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
                          customColorButton="#c62828"
                          customColorIcon="#f44336"
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
                          customColorButton="#2e7d32"
                          customColorIcon="#43a047"
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
