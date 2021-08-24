import React, { useEffect, useState } from "react"
import styled from "styled-components"
import ButtonIcon from "../ButtonIcon"
import { MdEdit } from "react-icons/md"
import { FaArrowLeft, FaSave } from "react-icons/fa"
import { Colors } from "../../common/Colors"
import { useDispatch } from "react-redux"
import { Checkbox } from "react-input-checkbox"
import { fetchSaveCompanySMS } from "../../state/actions"
import { Element, scroller } from "react-scroll"

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
  smsReserwationChangedUserAvaible = false,
  smsNotifactionAvaible = false,
  smsCanceledAvaible = false,
  smsChangedAvaible = false,
  premiumActive,
  smsServiceCreatedAvaible = false,
  smsServiceChangedAvaible = false,
  smsServiceFinishedAvaible = false,
  smsServiceCanceledAvaible = false,
  smsCommunitingNotificationAvaible = false,
  smsCommunitingCreatedAvaible = false,
  smsCommunitingChangedAvaible = false,
  smsCommunitingCanceledAvaible = false,
}) => {
  const [
    companySMSReserwationAvaible,
    setCompanySMSReserwationAvaible,
  ] = useState(false)
  const [
    companySMSReserwationChangedUserAvaible,
    setCompanySMSReserwationChangedUserAvaible,
  ] = useState(false)
  const [
    companySMSNotifactionAvaible,
    setCompanySMSNotifactionAvaible,
  ] = useState(false)

  const [companySMSChangedAvaible, setCompanySMSChangedAvaible] = useState(
    false
  )
  const [companySMSCanceledAvaible, setCompanySMSCanceledAvaible] = useState(
    false
  )
  const [
    companySMSServiceCreatedAvaible,
    setCompanySMSServiceCreatedAvaible,
  ] = useState(false)
  const [
    companySMSServiceChangedAvaible,
    setCompanySMSServiceChangedAvaible,
  ] = useState(false)
  const [
    companySMSServiceFinishedAvaible,
    setCompanySMSServiceFinishedAvaible,
  ] = useState(false)
  const [
    companySMSServiceCanceledAvaible,
    setCompanySMSServiceCanceledAvaible,
  ] = useState(false)
  const [
    companySMSCommunitingNotificationAvaible,
    setCompanySMSCommunitingNotificationAvaible,
  ] = useState(false)
  const [
    companySMSCommunitingCreatedAvaible,
    setCompanySMSCommunitingCreatedAvaible,
  ] = useState(false)
  const [
    companySMSCommunitingChangedAvaible,
    setCompanySMSCommunitingChangedAvaible,
  ] = useState(false)
  const [
    companySMSCommunitingCanceledAvaible,
    setCompanySMSCommunitingCanceledAvaible,
  ] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    setEditSMSSettngs(false)
    setCompanySMSReserwationAvaible(smsReserwationAvaible)
    setCompanySMSReserwationChangedUserAvaible(smsReserwationChangedUserAvaible)
    setCompanySMSNotifactionAvaible(smsNotifactionAvaible)
    setCompanySMSCanceledAvaible(smsCanceledAvaible)
    setCompanySMSChangedAvaible(smsChangedAvaible)
    setCompanySMSServiceCreatedAvaible(smsServiceCreatedAvaible)
    setCompanySMSServiceChangedAvaible(smsServiceChangedAvaible)
    setCompanySMSServiceFinishedAvaible(smsServiceFinishedAvaible)
    setCompanySMSServiceCanceledAvaible(smsServiceCanceledAvaible)
    setCompanySMSCommunitingNotificationAvaible(
      smsCommunitingNotificationAvaible
    )
    setCompanySMSCommunitingCreatedAvaible(smsCommunitingCreatedAvaible)
    setCompanySMSCommunitingChangedAvaible(smsCommunitingChangedAvaible)
    setCompanySMSCommunitingCanceledAvaible(smsCommunitingCanceledAvaible)
  }, [editMode, company]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleClickEdit = () => {
    handleResetAllEditedComponents()
    setEditSMSSettngs(prevState => !prevState)

    scroller.scrollTo("smsScrollElement", {
      duration: 100,
      smooth: true,
      offset: -100,
    })
  }

  const handleResetValues = () => {
    setCompanySMSReserwationAvaible(smsReserwationAvaible)
    setCompanySMSReserwationChangedUserAvaible(smsReserwationChangedUserAvaible)
    setCompanySMSNotifactionAvaible(smsNotifactionAvaible)
    setCompanySMSCanceledAvaible(smsCanceledAvaible)
    setCompanySMSChangedAvaible(smsChangedAvaible)
    setCompanySMSServiceCreatedAvaible(smsServiceCreatedAvaible)
    setCompanySMSServiceChangedAvaible(smsServiceChangedAvaible)
    setCompanySMSServiceFinishedAvaible(smsServiceFinishedAvaible)
    setCompanySMSServiceCanceledAvaible(smsServiceCanceledAvaible)
    setCompanySMSCommunitingNotificationAvaible(
      smsCommunitingNotificationAvaible
    )
    setCompanySMSCommunitingCreatedAvaible(smsCommunitingCreatedAvaible)
    setCompanySMSCommunitingChangedAvaible(smsCommunitingChangedAvaible)
    setCompanySMSCommunitingCanceledAvaible(smsCommunitingCanceledAvaible)
    setEditSMSSettngs(false)

    scroller.scrollTo("smsScrollElement", {
      duration: 100,
      smooth: true,
      offset: -100,
    })
  }

  const handleChangeCheckboxes = setState => {
    setState(prevState => !prevState)
  }

  const handleSaveCompanySMSSettings = () => {
    scroller.scrollTo("smsScrollElement", {
      duration: 100,
      smooth: true,
      offset: -100,
    })
    dispatch(
      fetchSaveCompanySMS(
        user.token,
        user.company._id,
        companySMSReserwationAvaible,
        companySMSReserwationChangedUserAvaible,
        companySMSNotifactionAvaible,
        companySMSCanceledAvaible,
        companySMSChangedAvaible,
        companySMSServiceCreatedAvaible,
        companySMSServiceChangedAvaible,
        companySMSServiceFinishedAvaible,
        companySMSServiceCanceledAvaible,
        companySMSCommunitingNotificationAvaible,
        companySMSCommunitingCreatedAvaible,
        companySMSCommunitingChangedAvaible,
        companySMSCommunitingCanceledAvaible
      )
    )
  }

  return (
    <Element name="smsScrollElement" className="element">
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
            onChange={() => {
              handleChangeCheckboxes(setCompanySMSReserwationAvaible)
            }}
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
        active={companySMSReserwationChangedUserAvaible}
      >
        Wiadomość sms <span>zostanie wysłana</span> podczas, gdy{" "}
        <span>klient dokona zmiany w rezerwacji</span>.
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
            value={companySMSReserwationChangedUserAvaible}
            onChange={() => {
              handleChangeCheckboxes(setCompanySMSReserwationChangedUserAvaible)
            }}
          >
            <TextCheckbox>
              {!companySMSReserwationChangedUserAvaible
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
            próby wysłania konto zostanie obciążone o 1 SMS-a z konta firmowego,
            o ile saldo SMS-ów jest dodatnie.
          </>
        )}
      </TextInfoCheckbox>
      {editSMSSettngs && (
        <CheckboxStyle siteProps={siteProps}>
          <Checkbox
            theme="material-checkbox"
            value={companySMSNotifactionAvaible}
            onChange={() => {
              handleChangeCheckboxes(setCompanySMSNotifactionAvaible)
            }}
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
        active={companySMSChangedAvaible}
      >
        Wiadomość sms{" "}
        <span>
          zostanie wysłana podczas zmiany rezerwacji przez pracownika/pracodawce
        </span>
        {editSMSSettngs && (
          <>
            {" "}
            Jeżeli wizyta zostanie zmieniona przez pracownika lub pracodawce
            firmy, to użytkownik otrzyma wiadomość SMS o zmianie statusu
            rezerwacji.
          </>
        )}
      </TextInfoCheckbox>
      {editSMSSettngs && (
        <CheckboxStyle siteProps={siteProps}>
          <Checkbox
            theme="material-checkbox"
            value={companySMSChangedAvaible}
            onChange={() => {
              handleChangeCheckboxes(setCompanySMSChangedAvaible)
            }}
          >
            <TextCheckbox>
              {!companySMSChangedAvaible
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
            firmy, to użytkownik otrzyma wiadomość SMS o anulowaniu rezerwacji.
          </>
        )}
      </TextInfoCheckbox>
      {editSMSSettngs && (
        <CheckboxStyle siteProps={siteProps}>
          <Checkbox
            theme="material-checkbox"
            value={companySMSCanceledAvaible}
            onChange={() => {
              handleChangeCheckboxes(setCompanySMSCanceledAvaible)
            }}
          >
            <TextCheckbox>
              {!companySMSCanceledAvaible
                ? "Usługa wyłączona"
                : "Usługa włączona"}
            </TextCheckbox>
          </Checkbox>
        </CheckboxStyle>
      )}
      <TextInfoCheckbox
        siteProps={siteProps}
        edited={editSMSSettngs}
        active={companySMSServiceCreatedAvaible}
      >
        Wiadomość sms{" "}
        <span>
          zostanie wysłana podczas tworzenia serwisu przez pracownika/pracodawce
        </span>
        {editSMSSettngs && (
          <>
            {" "}
            Jeżeli wizyta zostanie stworzona przez pracownika lub pracodawce
            firmy, to użytkownik otrzyma wiadomość SMS o nowym serwisie.
          </>
        )}
      </TextInfoCheckbox>
      {editSMSSettngs && (
        <CheckboxStyle siteProps={siteProps}>
          <Checkbox
            theme="material-checkbox"
            value={companySMSServiceCreatedAvaible}
            onChange={() => {
              handleChangeCheckboxes(setCompanySMSServiceCreatedAvaible)
            }}
          >
            <TextCheckbox>
              {!companySMSServiceCreatedAvaible
                ? "Usługa wyłączona"
                : "Usługa włączona"}
            </TextCheckbox>
          </Checkbox>
        </CheckboxStyle>
      )}
      <TextInfoCheckbox
        siteProps={siteProps}
        edited={editSMSSettngs}
        active={companySMSServiceChangedAvaible}
      >
        Wiadomość sms{" "}
        <span>
          zostanie wysłana podczas edytowania serwisu przez
          pracownika/pracodawce
        </span>
        {editSMSSettngs && (
          <>
            {" "}
            Jeżeli wizyta zostanie zaktualizowana przez pracownika lub
            pracodawce firmy, to użytkownik otrzyma wiadomość SMS.
          </>
        )}
      </TextInfoCheckbox>
      {editSMSSettngs && (
        <CheckboxStyle siteProps={siteProps}>
          <Checkbox
            theme="material-checkbox"
            value={companySMSServiceChangedAvaible}
            onChange={() => {
              handleChangeCheckboxes(setCompanySMSServiceChangedAvaible)
            }}
          >
            <TextCheckbox>
              {!companySMSServiceChangedAvaible
                ? "Usługa wyłączona"
                : "Usługa włączona"}
            </TextCheckbox>
          </Checkbox>
        </CheckboxStyle>
      )}
      <TextInfoCheckbox
        siteProps={siteProps}
        edited={editSMSSettngs}
        active={companySMSServiceFinishedAvaible}
      >
        Wiadomość sms{" "}
        <span>
          zostanie wysłana podczas ukończenia serwisu przez
          pracownika/pracodawce
        </span>
        {editSMSSettngs && (
          <>
            {" "}
            Jeżeli wizyta zostanie ukończona przez pracownika lub pracodawce
            firmy, to użytkownik otrzyma wiadomość SMS.
          </>
        )}
      </TextInfoCheckbox>
      {editSMSSettngs && (
        <CheckboxStyle siteProps={siteProps}>
          <Checkbox
            theme="material-checkbox"
            value={companySMSServiceFinishedAvaible}
            onChange={() => {
              handleChangeCheckboxes(setCompanySMSServiceFinishedAvaible)
            }}
          >
            <TextCheckbox>
              {!companySMSServiceFinishedAvaible
                ? "Usługa wyłączona"
                : "Usługa włączona"}
            </TextCheckbox>
          </Checkbox>
        </CheckboxStyle>
      )}
      <TextInfoCheckbox
        siteProps={siteProps}
        edited={editSMSSettngs}
        active={companySMSServiceCanceledAvaible}
      >
        Wiadomość sms{" "}
        <span>
          zostanie wysłana podczas anulowania serwisu przez
          pracownika/pracodawce
        </span>
        {editSMSSettngs && (
          <>
            {" "}
            Jeżeli wizyta zostanie anulowana przez pracownika lub pracodawce
            firmy, to użytkownik otrzyma wiadomość SMS.
          </>
        )}
      </TextInfoCheckbox>
      {editSMSSettngs && (
        <CheckboxStyle siteProps={siteProps}>
          <Checkbox
            theme="material-checkbox"
            value={companySMSServiceCanceledAvaible}
            onChange={() => {
              handleChangeCheckboxes(setCompanySMSServiceCanceledAvaible)
            }}
          >
            <TextCheckbox>
              {!companySMSServiceCanceledAvaible
                ? "Usługa wyłączona"
                : "Usługa włączona"}
            </TextCheckbox>
          </Checkbox>
        </CheckboxStyle>
      )}
      <TextInfoCheckbox
        siteProps={siteProps}
        edited={editSMSSettngs}
        active={companySMSCommunitingNotificationAvaible}
      >
        Wiadomość sms <span>zostanie wysłana 1 dzień przed dojazdem</span>
        {editSMSSettngs && (
          <>
            {" "}
            Jeżeli dojazd jest w tym samym dniu to sms nie wyśle się. Podczas
            próby wysłania konto zostanie obciążone o 1 SMS-a z konta firmowego,
            o ile saldo SMS-ów jest dodatnie.
          </>
        )}
      </TextInfoCheckbox>
      {editSMSSettngs && (
        <CheckboxStyle siteProps={siteProps}>
          <Checkbox
            theme="material-checkbox"
            value={companySMSCommunitingNotificationAvaible}
            onChange={() => {
              handleChangeCheckboxes(
                setCompanySMSCommunitingNotificationAvaible
              )
            }}
          >
            <TextCheckbox>
              {!companySMSCommunitingNotificationAvaible
                ? "Usługa wyłączona"
                : "Usługa włączona"}
            </TextCheckbox>
          </Checkbox>
        </CheckboxStyle>
      )}
      <TextInfoCheckbox
        siteProps={siteProps}
        edited={editSMSSettngs}
        active={companySMSCommunitingCreatedAvaible}
      >
        Wiadomość sms{" "}
        <span>
          zostanie wysłana podczas tworzenia dojazdu przez pracownika/pracodawce
        </span>
        {editSMSSettngs && (
          <>
            {" "}
            Jeżeli dojazd zostanie utworzony przez pracownika lub pracodawce
            firmy, to użytkownik otrzyma wiadomość SMS.
          </>
        )}
      </TextInfoCheckbox>
      {editSMSSettngs && (
        <CheckboxStyle siteProps={siteProps}>
          <Checkbox
            theme="material-checkbox"
            value={companySMSCommunitingCreatedAvaible}
            onChange={() => {
              handleChangeCheckboxes(setCompanySMSCommunitingCreatedAvaible)
            }}
          >
            <TextCheckbox>
              {!companySMSCommunitingCreatedAvaible
                ? "Usługa wyłączona"
                : "Usługa włączona"}
            </TextCheckbox>
          </Checkbox>
        </CheckboxStyle>
      )}
      <TextInfoCheckbox
        siteProps={siteProps}
        edited={editSMSSettngs}
        active={companySMSCommunitingChangedAvaible}
      >
        Wiadomość sms{" "}
        <span>
          zostanie wysłana podczas edycji dojazdu przez pracownika/pracodawce
        </span>
        {editSMSSettngs && (
          <>
            {" "}
            Jeżeli dojazd zostanie edytowany przez pracownika lub pracodawce
            firmy, to użytkownik otrzyma wiadomość SMS.
          </>
        )}
      </TextInfoCheckbox>
      {editSMSSettngs && (
        <CheckboxStyle siteProps={siteProps}>
          <Checkbox
            theme="material-checkbox"
            value={companySMSCommunitingChangedAvaible}
            onChange={() => {
              handleChangeCheckboxes(setCompanySMSCommunitingChangedAvaible)
            }}
          >
            <TextCheckbox>
              {!companySMSCommunitingChangedAvaible
                ? "Usługa wyłączona"
                : "Usługa włączona"}
            </TextCheckbox>
          </Checkbox>
        </CheckboxStyle>
      )}
      <TextInfoCheckbox
        siteProps={siteProps}
        edited={editSMSSettngs}
        active={companySMSCommunitingCanceledAvaible}
      >
        Wiadomość sms{" "}
        <span>
          zostanie wysłana podczas anulowania dojazdu przez
          pracownika/pracodawce
        </span>
        {editSMSSettngs && (
          <>
            {" "}
            Jeżeli dojazd zostanie anulowany przez pracownika lub pracodawce
            firmy, to użytkownik otrzyma wiadomość SMS.
          </>
        )}
      </TextInfoCheckbox>
      {editSMSSettngs && (
        <CheckboxStyle siteProps={siteProps}>
          <Checkbox
            theme="material-checkbox"
            value={companySMSCommunitingCanceledAvaible}
            onChange={() => {
              handleChangeCheckboxes(setCompanySMSCommunitingCanceledAvaible)
            }}
          >
            <TextCheckbox>
              {!companySMSCommunitingCanceledAvaible
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
                    smsReserwationChangedUserAvaible ===
                      companySMSReserwationChangedUserAvaible &&
                    smsNotifactionAvaible === companySMSNotifactionAvaible &&
                    smsCanceledAvaible === companySMSCanceledAvaible &&
                    smsChangedAvaible === companySMSChangedAvaible &&
                    smsServiceCreatedAvaible ===
                      companySMSServiceCreatedAvaible &&
                    smsServiceChangedAvaible ===
                      companySMSServiceChangedAvaible &&
                    smsServiceFinishedAvaible ===
                      companySMSServiceFinishedAvaible &&
                    smsServiceCanceledAvaible ===
                      companySMSServiceCanceledAvaible &&
                    smsCommunitingNotificationAvaible ===
                      companySMSCommunitingNotificationAvaible &&
                    smsCommunitingCreatedAvaible ===
                      companySMSCommunitingCreatedAvaible &&
                    smsCommunitingChangedAvaible ===
                      companySMSCommunitingChangedAvaible &&
                    smsCommunitingCanceledAvaible ===
                      companySMSCommunitingCanceledAvaible
                  }
                />
              </MarginButton>
            </ButtonEditPosition>
          </>
        ) : (
          <ButtonEditPosition>
            <div data-tip data-for="disabledButtonOnly">
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
    </Element>
  )
}
export default SMSSettings
