import React, { useState, useEffect } from "react"
import ButtonIcon from "../ButtonIcon"
import { MdLoop, MdAccountBalance } from "react-icons/md"
import styled from "styled-components"
import InputIcon from "../InputIcon"
import { Colors } from "../../common/Colors"
import { FaArrowLeft, FaSave } from "react-icons/fa"
import {
  addAlertItem,
  fetchCompanyUpdateNip,
  fetchCompanyUpdateNipInfo,
} from "../../state/actions"
import { useDispatch } from "react-redux"
import Popup from "../Popup"

const ButtonPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`

const ButtonPositionUpdate = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 5px;
`

const ButtonMargin = styled.div`
  margin-left: 5px;
`
const DisabledTextToEdit = styled.div`
  border-radius: 5px;
  color: ${props => Colors(props.siteProps).textNormalBlack};
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

const ButtonSubmit = styled.button`
  border: none;
  padding: 0;
  margin: 0;
  background-color: transparent;
`

const HeightComponentLinks = styled.div`
  padding-bottom: ${props =>
    props.isCompanyEditProfil && props.editable ? "150px" : "auto"};
  transition-property: padding-bottom;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const TextInfo = styled.div`
  font-size: 0.9rem;
  font-family: "Poppins-Medium", sans-serif;
  color: ${props => Colors(props.siteProps).textNormalBlack};
`

const CompanyNipContent = ({
  TitleRightColumn,
  isCompanyEditProfil = false,
  editable = false,
  onClickEdit = () => {},
  siteProps,
  company,
  editMode,
  editCompanyNip,
  user,
  dataToInvoice,
}) => {
  const [nipInput, setNipInput] = useState(company.nip)

  const dispatch = useDispatch()

  useEffect(() => {
    setNipInput(company.nip)
  }, [company.nip]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setNipInput(company.nip)
  }, [editCompanyNip, editMode]) // eslint-disable-line react-hooks/exhaustive-deps

  const disabledButtonSave = nipInput !== company.nip && nipInput.length === 10

  const handleSaveButton = e => {
    e.preventDefault()
    if (!disabledButtonSave) {
      dispatch(
        addAlertItem("Numer nip nie uległ zmianie lub jest niepoprawny", "red")
      )
    } else {
      dispatch(fetchCompanyUpdateNip(user.token, user.company._id, nipInput))
    }
  }

  const handleUpdateCompanyInfo = () => {
    dispatch(fetchCompanyUpdateNipInfo(user.token, user.company._id))
  }

  const handleResetButton = () => {
    onClickEdit()
    setNipInput(company.nip)
  }

  const handleChangeInputs = (e, setChange) => {
    setChange(e.target.value)
  }

  let dataNameGUS = !!dataToInvoice ? (
    <>
      <div>{!!dataToInvoice.name ? dataToInvoice.name : "Brak"}</div>
    </>
  ) : null

  let dataGUS = !!dataToInvoice ? (
    <>
      <div>
        <div className="titleInline">Kod pocztowy:</div>{" "}
        {!!dataToInvoice.postalCode ? dataToInvoice.postalCode : "Brak"}
      </div>
      <div>
        <div className="titleInline">Miasto:</div>{" "}
        {!!dataToInvoice.city ? dataToInvoice.city : "Brak"}
      </div>
      <div>
        <div className="titleInline">Ulica:</div>{" "}
        {!!dataToInvoice.street ? dataToInvoice.street : "Brak"}
      </div>
    </>
  ) : null

  return (
    <HeightComponentLinks isCompanyEditProfil={editable} editable={editable}>
      <TitleRightColumn isCompanyEditProfil={editable} siteProps={siteProps}>
        DANE DO FAKTURY
      </TitleRightColumn>
      <DisabledTextToEdit siteProps={siteProps}>
        {dataNameGUS}
        <div>
          <div className="titleInline">Nip:</div>{" "}
          {!!company.nip ? `${company.nip}` : "Brak"}
        </div>
        {dataGUS}
      </DisabledTextToEdit>
      {isCompanyEditProfil && (
        <>
          <Popup
            popupEnable={editable}
            position="absolute"
            title="Edycja danych do faktury"
            borderRadius
            closeTitle={false}
            smallTitle
            secondColors
          >
            <form onSubmit={handleSaveButton}>
              <TextInfo siteProps={siteProps}>
                UWAGA: Można dokonać aktualizacji danych firmowych / nip 1 raz
                na dzień.
              </TextInfo>
              <InputIcon
                icon={<MdAccountBalance />}
                placeholder="NIP"
                type="text"
                secondColor={isCompanyEditProfil}
                onChange={e => handleChangeInputs(e, setNipInput)}
                value={nipInput}
                validText="10 znaków"
              />
              <ButtonPositionUpdate>
                <ButtonIcon
                  title="Pobierz dane firmowe poprzez NIP"
                  uppercase
                  fontIconSize="16"
                  fontSize="13"
                  icon={<MdLoop />}
                  customColorButton={Colors(siteProps).secondDarkColor}
                  customColorIcon={Colors(siteProps).secondColor}
                  onClick={handleUpdateCompanyInfo}
                />
              </ButtonPositionUpdate>
              <ButtonPosition>
                <>
                  <ButtonMargin>
                    <ButtonIcon
                      title="Cofnij"
                      uppercase
                      fontIconSize="16"
                      fontSize="13"
                      icon={<FaArrowLeft />}
                      customColorButton={Colors(siteProps).dangerColorDark}
                      customColorIcon={Colors(siteProps).dangerColor}
                      onClick={handleResetButton}
                    />
                  </ButtonMargin>
                </>
                <ButtonSubmit type="submit">
                  <ButtonMargin>
                    <ButtonIcon
                      title="Zapisz"
                      uppercase
                      fontIconSize="16"
                      fontSize="13"
                      icon={<FaSave />}
                      customColorButton={Colors(siteProps).successColorDark}
                      customColorIcon={Colors(siteProps).successColor}
                      disabled={!disabledButtonSave}
                    />
                  </ButtonMargin>
                </ButtonSubmit>
              </ButtonPosition>
            </form>
          </Popup>
        </>
      )}
    </HeightComponentLinks>
  )
}
export default CompanyNipContent
