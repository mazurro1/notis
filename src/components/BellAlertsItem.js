import React from "react"
import styled from "styled-components"
import { LinkEffect } from "../common/LinkEffect"
import { Colors } from "../common/Colors"

const TimeStyle = styled.div`
  position: absolute;
  top: 2px;
  left: 10px;
  right: 10px;
  font-size: 0.7rem;
  user-select: none;
  opacity: 0.5;

  span {
    display: inline-block;
    color: ${props =>
      props.active
        ? `${Colors(props.siteProps).textNormalBlack} !important`
        : `${Colors(props.siteProps).textNormalBlack} !important`};
    margin-right: 5px;
    font-family: "Poppins-Regular", sans-serif !important;
  }
`
const TextBeforeCompany = styled.div`
  display: inline-block;
  margin-right: 5px;
`

const DivInlineBlock = styled.div`
  display: inline-block;
`

const ButtonAlertCompany = styled.button`
  margin-right: 5px;
  padding: 2px 5px;
  background-color: ${props =>
    props.alertColor === "blue"
      ? Colors(props.siteProps).primaryColorDark
      : props.alertColor === "red"
      ? Colors(props.siteProps).dangerColorDark
      : props.alertColor === "green"
      ? Colors(props.siteProps).successColorDark
      : props.alertColor === "orange"
      ? Colors(props.siteProps).secondDarkColor
      : Colors(props.siteProps).darkColorDark};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  cursor: pointer;
  border: none;
  border-radius: 5px;
  font-family: "Poppins-Medium", sans-serif;
  font-size: 0.8rem;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:hover {
    background-color: ${props =>
      props.alertColor === "blue"
        ? Colors(props.siteProps).primaryColor
        : props.alertColor === "red"
        ? Colors(props.siteProps).dangerColor
        : props.alertColor === "green"
        ? Colors(props.siteProps).successColor
        : props.alertColor === "orange"
        ? Colors(props.siteProps).secondColor
        : Colors(props.siteProps).primaryColor};
  }
`

const BellAlertsItem = ({ siteProps, alert, AlertItemStyle, user }) => {
  let isUserReserwation = false
  let isCompanyChangedReserwation = !!alert.companyChanged
    ? alert.companyChanged
    : false
  if (!!alert.reserwationId) {
    if (!!alert.reserwationId.fromUser) {
      if (!!alert.reserwationId.fromUser._id) {
        isUserReserwation = user.userId === alert.reserwationId.fromUser._id
      }
    }
  }

  let alertMessage = ""
  let textBeginningAlert = ""
  let alertColor = "default"
  let reserwationDate = null

  if (!!alert.reserwationId) {
    reserwationDate = `${
      alert.reserwationId.dateDay < 10
        ? `0${alert.reserwationId.dateDay}`
        : alert.reserwationId.dateDay
    }-${
      alert.reserwationId.dateMonth < 10
        ? `0${alert.reserwationId.dateMonth}`
        : alert.reserwationId.dateMonth
    }-${alert.reserwationId.dateYear}`
  }

  let userName = null
  let userSurname = null

  if (
    alert.type !== "rezerwation_worker" &&
    alert.type !== "new_rezerwation_worker" &&
    alert.type !== "opinion_client" &&
    alert.type !== "opinion_client_edit" &&
    alert.type !== "opinion_from_company" &&
    alert.type !== "alert_notifaction_sms" &&
    alert.type !== "alert_notifaction_premium"
  ) {
    if (!!alert.reserwationId) {
      if (!!alert.reserwationId.fromUser) {
        if (!!alert.reserwationId.fromUser.name) {
          userName = Buffer.from(
            alert.reserwationId.fromUser.name,
            "base64"
          ).toString("utf-8")
          userSurname = Buffer.from(
            alert.reserwationId.fromUser.surname,
            "base64"
          ).toString("utf-8")
        }
      }
    }

    if (alert.type === "rezerwation_created") {
      alertColor = "blue"
      if (!isCompanyChangedReserwation) {
        textBeginningAlert = isUserReserwation
          ? "Rezerwacja została utworzona w firmie"
          : "dokonał rezerwacji"
      } else {
        textBeginningAlert = isUserReserwation ? "" : ""
      }
    } else if (alert.type === "rezerwation_changed") {
      alertColor = "orange"
      if (!isCompanyChangedReserwation) {
        textBeginningAlert = isUserReserwation
          ? "Rezerwacja została zmieniona w firmie"
          : "zmienił rezerwację"
      } else {
        textBeginningAlert = isUserReserwation
          ? "Twoja rezerwacja została zmieniona przez firmę"
          : "Dokonano zmianę w rezerwacji"
      }
    } else if (alert.type === "rezerwation_canceled") {
      alertColor = "red"
      if (!isCompanyChangedReserwation) {
        textBeginningAlert = isUserReserwation
          ? "Rezerwacja została odwołana w firmie"
          : "odowłał rezerwację"
      } else {
        textBeginningAlert = isUserReserwation
          ? "Rezerwacja została odwołana przez firmę"
          : "Odwołano rezerwację"
      }
    } else if (alert.type === "reserwation_not_finished") {
      alertColor = "red"
      if (!isCompanyChangedReserwation) {
        textBeginningAlert = isUserReserwation
          ? "Rezerwacja nie została zakończona w firmie"
          : "nie odbył wizyty"
      } else {
        textBeginningAlert = isUserReserwation
          ? "Zmieniono status twojej rezerwacji na nie odbytą w firmie"
          : "Zmieniono status rezerwacji na nie odbytą"
      }
    } else if (alert.type === "reserwation_finished") {
      alertColor = "green"
      if (!isCompanyChangedReserwation) {
        textBeginningAlert = isUserReserwation
          ? "Rezerwacja została zakończona w firmie"
          : "odbył wizytę"
      } else {
        textBeginningAlert = isUserReserwation
          ? "Zmieniono status twojej rezerwacji na odbytą"
          : "Zmieniono status rezerwacji na odbytą"
      }
    } else if (alert.type === "rezerwation_notifaction") {
      alertColor = "green"
      if (isUserReserwation) {
        textBeginningAlert = "Przypomnienie o rezerwacji w firmie"
      }
    } else {
      alertColor = "default"
    }

    if (isUserReserwation) {
      alertMessage = (
        <>
          <TextBeforeCompany>{textBeginningAlert}:</TextBeforeCompany>
          {!!alert.reserwationId.company ? (
            <LinkEffect
              path={`company/${alert.reserwationId.company.linkPath}`}
              text={
                <ButtonAlertCompany
                  siteProps={siteProps}
                  active={alert.active}
                  alertColor={alertColor}
                >
                  {alert.reserwationId.company.name.toUpperCase()}
                </ButtonAlertCompany>
              }
            />
          ) : (
            "Firma usunięta "
          )}
          <DivInlineBlock>
            dnia: <span>{reserwationDate}</span>,
          </DivInlineBlock>{" "}
          na godzine:{" "}
          <DivInlineBlock>
            <span>
              {alert.reserwationId.dateStart}-{alert.reserwationId.dateEnd}
            </span>
          </DivInlineBlock>
          , usługa: <span>{alert.reserwationId.serviceName}</span>
        </>
      )
    } else {
      alertMessage = isCompanyChangedReserwation ? (
        <>
          {textBeginningAlert} użytkowniowi{" "}
          {!!userName && !!userSurname
            ? `${userName} ${userSurname}`
            : "Brak użytkownika"}{" "}
          <DivInlineBlock>
            dnia: <span>{reserwationDate}</span>,
          </DivInlineBlock>{" "}
          na godzine:{" "}
          <DivInlineBlock>
            <span>
              {alert.reserwationId.dateStart}-{alert.reserwationId.dateEnd}
            </span>
            ,
          </DivInlineBlock>{" "}
          usługa: <span>{alert.reserwationId.serviceName}</span>
        </>
      ) : (
        <>
          Użytkownik{" "}
          {!!userName && !!userSurname
            ? `${userName} ${userSurname}`
            : "Brak użytkownika"}{" "}
          {textBeginningAlert}
          <DivInlineBlock>
            dnia: <span>{reserwationDate}</span>,
          </DivInlineBlock>{" "}
          na godzine:{" "}
          <DivInlineBlock>
            <span>
              {alert.reserwationId.dateStart}-{alert.reserwationId.dateEnd}
            </span>
            ,{" "}
          </DivInlineBlock>{" "}
          usługa: <span>{alert.reserwationId.serviceName}</span>
        </>
      )
    }
  } else if (alert.type === "rezerwation_worker") {
    alertMessage = (
      <>
        Rezerwacja czasu została odwołana dnia:{" "}
        <DivInlineBlock>
          <span>{reserwationDate}</span>
        </DivInlineBlock>
        , o godzinie:{" "}
        <DivInlineBlock>
          <span>
            {alert.reserwationId.dateStart}-{alert.reserwationId.dateEnd}
          </span>
          ,
        </DivInlineBlock>
      </>
    )
  } else if (alert.type === "new_rezerwation_worker") {
    alertMessage = (
      <>
        Rezerwacja czasu została dodana dnia:{" "}
        <DivInlineBlock>
          <span>{reserwationDate}</span>
        </DivInlineBlock>
        , na godzinę:{" "}
        <DivInlineBlock>
          <span>
            {alert.reserwationId.dateStart}-{alert.reserwationId.dateEnd}
          </span>
          ,
        </DivInlineBlock>
      </>
    )
  } else if (alert.type === "opinion_client") {
    if (isUserReserwation) {
      alertMessage = (
        <>
          Dodano opinie w firmie:{" "}
          {!!alert.reserwationId.company ? (
            <LinkEffect
              path={`company/${alert.reserwationId.company.linkPath}`}
              text={
                <ButtonAlertCompany
                  siteProps={siteProps}
                  active={alert.active}
                  alertColor={alertColor}
                >
                  {alert.reserwationId.company.name.toUpperCase()}
                </ButtonAlertCompany>
              }
            />
          ) : (
            "Firma usunięta "
          )}
          do usługi: <span>{alert.reserwationId.serviceName}</span>, która
          odbyła się dnia:{" "}
          <DivInlineBlock>
            <span>{reserwationDate}</span>
          </DivInlineBlock>
          , o godzinę:{" "}
          <DivInlineBlock>
            <span>
              {alert.reserwationId.dateStart}-{alert.reserwationId.dateEnd}
            </span>
            ,
          </DivInlineBlock>
        </>
      )
    } else {
      alertMessage = (
        <>
          Klient dodał opinie do usługi: {alert.reserwationId.serviceName},
          która odbyła się dnia:{" "}
          <DivInlineBlock>
            <span>{reserwationDate}</span>
          </DivInlineBlock>
          , o godzinę:{" "}
          <DivInlineBlock>
            <span>
              {alert.reserwationId.dateStart}-{alert.reserwationId.dateEnd}
            </span>
            ,
          </DivInlineBlock>
        </>
      )
    }
  } else if (alert.type === "opinion_client_edit") {
    if (isUserReserwation) {
      alertMessage = (
        <>
          Edytowano opinie w firmie:{" "}
          {!!alert.reserwationId.company ? (
            <LinkEffect
              path={`company/${alert.reserwationId.company.linkPath}`}
              text={
                <ButtonAlertCompany
                  siteProps={siteProps}
                  active={alert.active}
                  alertColor={alertColor}
                >
                  {alert.reserwationId.company.name.toUpperCase()}
                </ButtonAlertCompany>
              }
            />
          ) : (
            "Firma usunięta "
          )}
          do usługi: <span>{alert.reserwationId.serviceName}</span>, która
          odbyła się dnia:{" "}
          <DivInlineBlock>
            <span>{reserwationDate}</span>
          </DivInlineBlock>
          , o godzinę:{" "}
          <DivInlineBlock>
            <span>
              {alert.reserwationId.dateStart}-{alert.reserwationId.dateEnd}
            </span>
            ,
          </DivInlineBlock>
        </>
      )
    } else {
      alertMessage = (
        <>
          Klient edytował opinie do usługi: {alert.reserwationId.serviceName},
          która odbyła się dnia:{" "}
          <DivInlineBlock>
            <span>{reserwationDate}</span>
          </DivInlineBlock>
          , o godzinę:{" "}
          <DivInlineBlock>
            <span>
              {alert.reserwationId.dateStart}-{alert.reserwationId.dateEnd}
            </span>
            ,
          </DivInlineBlock>
        </>
      )
    }
  } else if (alert.type === "alert_notifaction_sms") {
    alertMessage = (
      <>
        <span>Uwaga!</span> Ilość <span>SMS</span> w Twojej firmie{" "}
        <span>jest poniżej 50</span>
      </>
    )
    alertColor = "red"
  } else if (alert.type === "alert_notifaction_premium") {
    alertMessage = (
      <>
        <span>Uwaga!</span> za mniej niż{" "}
        <span>3 dni kończy się konto premium</span> w Twojej firmie
      </>
    )
    alertColor = "red"
  } else if (alert.type === "opinion_from_company") {
    if (isUserReserwation) {
      alertMessage = (
        <>
          Firma:{" "}
          {!!alert.reserwationId.company ? (
            <LinkEffect
              path={`company/${alert.reserwationId.company.linkPath}`}
              text={
                <ButtonAlertCompany
                  siteProps={siteProps}
                  active={alert.active}
                  alertColor={alertColor}
                >
                  {alert.reserwationId.company.name.toUpperCase()}
                </ButtonAlertCompany>
              }
            />
          ) : (
            "Firma usunięta "
          )}
          odpowiedziała na opinie do usługi:{" "}
          <span>{alert.reserwationId.serviceName}</span>, która odbyła się dnia:{" "}
          <DivInlineBlock>
            <span>{reserwationDate}</span>
          </DivInlineBlock>
          , o godzinę:{" "}
          <DivInlineBlock>
            <span>
              {alert.reserwationId.dateStart}-{alert.reserwationId.dateEnd}
            </span>
            ,
          </DivInlineBlock>
        </>
      )
    } else {
      alertMessage = (
        <>
          Odpowiedziano na opinie do usługi: {alert.reserwationId.serviceName},
          która odbyła się dnia:{" "}
          <DivInlineBlock>
            <span>{reserwationDate}</span>
          </DivInlineBlock>
          , o godzinę:{" "}
          <DivInlineBlock>
            <span>
              {alert.reserwationId.dateStart}-{alert.reserwationId.dateEnd}
            </span>
            ,
          </DivInlineBlock>
        </>
      )
    }
  }

  return (
    <div
      data-sal="zoom-in"
      data-sal-duration="300"
      data-sal-easing="ease-out-bounce"
    >
      <AlertItemStyle
        active={alert.active}
        alertColor={alertColor}
        siteProps={siteProps}
        noTime={!!!alert.creationTime}
      >
        {!!alert.creationTime && (
          <TimeStyle
            active={alert.active}
            alertColor={alertColor}
            siteProps={siteProps}
          >
            <span>{`${
              new Date(alert.creationTime).getHours() < 10
                ? `0${new Date(alert.creationTime).getHours()}`
                : new Date(alert.creationTime).getHours()
            }:${
              new Date(alert.creationTime).getMinutes() < 10
                ? `0${new Date(alert.creationTime).getMinutes()}`
                : new Date(alert.creationTime).getMinutes()
            }`}</span>
            {`
              ${
                new Date(alert.creationTime).getDate() < 10
                  ? `0${new Date(alert.creationTime).getDate()}`
                  : new Date(alert.creationTime).getDate()
              }-${
              new Date(alert.creationTime).getMonth() + 1 < 10
                ? `0${new Date(alert.creationTime).getMonth() + 1}`
                : new Date(alert.creationTime).getMonth() + 1
            }-${new Date(alert.creationTime).getFullYear()}`}
          </TimeStyle>
        )}
        {alertMessage}
      </AlertItemStyle>
    </div>
  )
}

export default BellAlertsItem
