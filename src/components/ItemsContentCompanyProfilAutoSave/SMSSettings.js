import React, { useEffect, useState } from "react"
import styled from "styled-components"
import ButtonIcon from "../ButtonIcon"
import { MdEdit } from "react-icons/md"
import { FaArrowLeft, FaSave } from "react-icons/fa"
import { Colors } from "../../common/Colors"
import { useDispatch } from "react-redux"
import { Checkbox } from "react-input-checkbox"
import { fetchSaveCompanySMS } from "../../state/actions"

const MarginButton = styled.div`
  margin-left: 5px;
`

const TextInfoCheckbox = styled.div`
  color: ${props =>
    !props.edited
      ? props.active
        ? Colors(props.siteProps).successColorDark
        : Colors(props.siteProps).dangerColorDark
      : Colors(props.siteProps).textNormalBlack};
  margin-top: ${props => (props.noMargin ? "0px" : "20px")};

  font-family: ${props =>
    !props.edited ? "Poppins-Bold, sans-serif" : "Poppins-Regular, sans-serif"};
  transition-property: color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  span {
    font-family: "Poppins-Bold", sans-serif;
  }
`

const TextCheckbox = styled.span`
  padding-left: 10px;
  font-size: 0.9rem;
  user-select: none;
  font-family: "Poppins-Bold", sans-serif;
`

const CheckboxStyle = styled.div`
  margin-bottom: 20px;
  .material-checkbox__input:checked + .material-checkbox__image {
    background-color: ${props => Colors(props.siteProps).successColorDark};
  }
  span {
    color: ${props => Colors(props.siteProps).textNormalBlack};
    border-color: ${props => Colors(props.siteProps).textNormalBlack};
  }
`

const SMSSettings = ({
  TitleRightColumn,
  ButtonEditPosition,
  isCompanyEditProfil,
  company,
  editMode,
  siteProps,
  user,
  editSMSSettngs,
  setEditSMSSettngs,
  handleResetAllEditedComponents,
  disabledEditButtons,
  smsReserwationAvaible = false,
  smsNotifactionAvaible = false,
  smsCanceledAvaible = false,
}) => {
  const [
    companySMSReserwationAvaible,
    setCompanySMSReserwationAvaible,
  ] = useState(false)
  const [
    companySMSNotifactionAvaible,
    setCompanySMSNotifactionAvaible,
  ] = useState(false)

  const [companySMSCanceledAvaible, setCompanySMSCanceledAvaible] = useState(
    false
  )

  const dispatch = useDispatch()

  useEffect(() => {
    setEditSMSSettngs(false)
    setCompanySMSReserwationAvaible(smsReserwationAvaible)
    setCompanySMSNotifactionAvaible(smsNotifactionAvaible)
    setCompanySMSCanceledAvaible(smsCanceledAvaible)
  }, [editMode, company]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleClickEdit = () => {
    handleResetAllEditedComponents()
    setEditSMSSettngs(prevState => !prevState)
  }

  const handleResetValues = () => {
    setCompanySMSReserwationAvaible(smsReserwationAvaible)
    setCompanySMSNotifactionAvaible(smsNotifactionAvaible)
    setCompanySMSCanceledAvaible(smsCanceledAvaible)
    setEditSMSSettngs(false)
  }

  const handleChangeCheckbox = () => {
    setCompanySMSReserwationAvaible(prevState => !prevState)
  }

  const handleChangeCheckboxNotifaction = () => {
    setCompanySMSNotifactionAvaible(prevState => !prevState)
  }

  const handleChangeCheckboxCanceled = () => {
    setCompanySMSCanceledAvaible(prevState => !prevState)
  }

  const handleSaveCompanySMSSettings = () => {
    dispatch(
      fetchSaveCompanySMS(
        user.token,
        user.company._id,
        companySMSReserwationAvaible,
        companySMSNotifactionAvaible,
        companySMSCanceledAvaible
      )
    )
  }

  return (
    <>
      <>
        <TitleRightColumn
          isCompanyEditProfil={editSMSSettngs}
          siteProps={siteProps}
        >
          Ustawienia SMS
        </TitleRightColumn>
        <TextInfoCheckbox
          siteProps={siteProps}
          edited={editSMSSettngs}
          active={companySMSReserwationAvaible}
          noMargin
        >
          Wiadomość sms <span>zostanie wysłana</span> podczas, gdy{" "}
          <span>proces rezerwacji dokona się pozytywnie</span>.
          {editSMSSettngs && (
            <>
              Podczas próby wysłania konto zostanie obciążone o 1 SMS-a z konta
              firmowego, o ile saldo SMS-ów jest dodatnie.
            </>
          )}
        </TextInfoCheckbox>
        {editSMSSettngs && (
          <CheckboxStyle siteProps={siteProps}>
            <Checkbox
              theme="material-checkbox"
              value={companySMSReserwationAvaible}
              onChange={handleChangeCheckbox}
            >
              <TextCheckbox>
                {!companySMSReserwationAvaible
                  ? "Usługa wyłączona"
                  : "Usługa włączona"}
              </TextCheckbox>
            </Checkbox>
          </CheckboxStyle>
        )}
        <TextInfoCheckbox
          siteProps={siteProps}
          edited={editSMSSettngs}
          active={companySMSNotifactionAvaible}
        >
          Wiadomość sms{" "}
          <span>zostanie wysłana 1 dzień przed umówioną wizytą</span> około
          <span> godziny 12</span>.
          {editSMSSettngs && (
            <>
              {" "}
              Jeżeli wizyta jest w tym samym dniu to sms nie wyśle się. Podczas
              próby wysłania konto zostanie obciążone o 1 SMS-a z konta
              firmowego, o ile saldo SMS-ów jest dodatnie.
            </>
          )}
        </TextInfoCheckbox>
        {editSMSSettngs && (
          <CheckboxStyle siteProps={siteProps}>
            <Checkbox
              theme="material-checkbox"
              value={companySMSNotifactionAvaible}
              onChange={handleChangeCheckboxNotifaction}
            >
              <TextCheckbox>
                {!companySMSNotifactionAvaible
                  ? "Usługa wyłączona"
                  : "Usługa włączona"}
              </TextCheckbox>
            </Checkbox>
          </CheckboxStyle>
        )}

        <TextInfoCheckbox
          siteProps={siteProps}
          edited={editSMSSettngs}
          active={companySMSCanceledAvaible}
        >
          Wiadomość sms{" "}
          <span>
            zostanie wysłana podczas anulowania rezerwacji przez
            pracownika/pracodawce
          </span>
          {editSMSSettngs && (
            <>
              {" "}
              Jeżeli wizyta zostanie anulowana przez pracownika lub pracodawce
              firmy, to użytkownik otrzyma wiadomość SMS o anulowaniu
              rezerwacji.
            </>
          )}
        </TextInfoCheckbox>
        {editSMSSettngs && (
          <CheckboxStyle siteProps={siteProps}>
            <Checkbox
              theme="material-checkbox"
              value={companySMSCanceledAvaible}
              onChange={handleChangeCheckboxCanceled}
            >
              <TextCheckbox>
                {!companySMSCanceledAvaible
                  ? "Usługa wyłączona"
                  : "Usługa włączona"}
              </TextCheckbox>
            </Checkbox>
          </CheckboxStyle>
        )}

        {isCompanyEditProfil ? (
          editSMSSettngs ? (
            <>
              <ButtonEditPosition>
                <MarginButton>
                  <ButtonIcon
                    title="Cofnij"
                    uppercase
                    fontIconSize="16"
                    fontSize="14"
                    icon={<FaArrowLeft />}
                    customColorButton={Colors(siteProps).dangerColorDark}
                    customColorIcon={Colors(siteProps).dangerColor}
                    onClick={handleResetValues}
                  />
                </MarginButton>
                <MarginButton>
                  <ButtonIcon
                    title="Zapisz"
                    uppercase
                    fontIconSize="16"
                    fontSize="14"
                    icon={<FaSave />}
                    customColorButton={Colors(siteProps).successColorDark}
                    customColorIcon={Colors(siteProps).successColor}
                    onClick={handleSaveCompanySMSSettings}
                    disabled={
                      smsReserwationAvaible === companySMSReserwationAvaible &&
                      smsNotifactionAvaible === companySMSNotifactionAvaible &&
                      smsCanceledAvaible === companySMSCanceledAvaible
                    }
                  />
                </MarginButton>
              </ButtonEditPosition>
            </>
          ) : (
            <ButtonEditPosition>
              <div data-tip data-for="disabledButton">
                <ButtonIcon
                  title="Edytuj ustawienia sms"
                  uppercase
                  fontIconSize="25"
                  fontSize="14"
                  icon={<MdEdit />}
                  secondColors
                  onClick={handleClickEdit}
                  disabled={disabledEditButtons}
                />
              </div>
            </ButtonEditPosition>
          )
        ) : null}
      </>
    </>
  )
}
export default SMSSettings
