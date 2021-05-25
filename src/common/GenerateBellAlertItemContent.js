import React from "react"
import { LinkEffect } from "../common/LinkEffect"
import styled from "styled-components"
import { Colors } from "../common/Colors"

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

export const generateBellAlertItemContent = (alert, user, siteProps) => {
  let alertMessage = ""
  let textBeginningAlert = ""
  let alertColor = "default"
  let userName = null
  let userSurname = null

  console.log(alert)

  let isUserReserwation = false
  let isUserCommuniting = false
  let isUserService = false
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
  if (!!alert.communitingId) {
    if (!!alert.communitingId.userId) {
      if (!!alert.communitingId.userId._id) {
        isUserCommuniting = user.userId === alert.communitingId.userId._id
      }
    }
  }
  if (!!alert.serviceId) {
    if (!!alert.serviceId.userId) {
      if (!!alert.serviceId.userId._id) {
        isUserService = user.userId === alert.serviceId.userId._id
      }
    }
  }

  let reserwationDate = null
  let dateCommunitingService = null
  let dateService = null

  if (!!alert.communitingId) {
    dateCommunitingService = `${
      alert.communitingId.day < 10
        ? `0${alert.communitingId.day}`
        : alert.communitingId.day
    }-${
      alert.communitingId.month < 10
        ? `0${alert.communitingId.month}`
        : alert.communitingId.month
    }-${alert.communitingId.year}`
  }

  if (!!alert.serviceId) {
    dateService = `${
      alert.serviceId.day < 10 ? `0${alert.serviceId.day}` : alert.serviceId.day
    }-${
      alert.serviceId.month < 10
        ? `0${alert.serviceId.month}`
        : alert.serviceId.month
    }-${alert.serviceId.year}`
  }

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

  if (
    alert.type !== "rezerwation_worker" &&
    alert.type !== "new_rezerwation_worker" &&
    alert.type !== "opinion_client" &&
    alert.type !== "opinion_client_edit" &&
    alert.type !== "opinion_from_company" &&
    alert.type !== "alert_notifaction_sms" &&
    alert.type !== "alert_notifaction_premium" &&
    alert.type !== "commuting_created" &&
    alert.type !== "commuting_deleted" &&
    alert.type !== "commuting_changed" &&
    alert.type !== "commuting_canceled" &&
    alert.type !== "service_created" &&
    alert.type !== "service_deleted" &&
    alert.type !== "service_changed"
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

    if (!!alert.communitingId) {
      if (!!alert.communitingId.userId) {
        if (!!alert.communitingId.userId.name) {
          userName = Buffer.from(
            alert.communitingId.userId.name,
            "base64"
          ).toString("utf-8")
          userSurname = Buffer.from(
            alert.communitingId.userId.surname,
            "base64"
          ).toString("utf-8")
        }
      }
    }

    if (!!alert.serviceId) {
      if (!!alert.serviceId.userId) {
        if (!!alert.serviceId.userId.name) {
          userName = Buffer.from(
            alert.serviceId.userId.name,
            "base64"
          ).toString("utf-8")
          userSurname = Buffer.from(
            alert.serviceId.userId.surname,
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
              path={`company?${alert.reserwationId.company.linkPath}`}
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
        Zaktualizowano rezerwacje czasu:{" "}
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
    if (!!alert.reserwationId) {
      if (isUserReserwation) {
        alertMessage = (
          <>
            Dodano opinie w firmie:{" "}
            {!!alert.reserwationId.company ? (
              <LinkEffect
                path={`company?${alert.reserwationId.company.linkPath}`}
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
    } else if (!!alert.communitingId) {
      if (isUserCommuniting) {
        alertMessage = (
          <>
            Dodano opinie w firmie:{" "}
            {!!alert.communitingId.companyId ? (
              <LinkEffect
                path={`company?${alert.communitingId.companyId.linkPath}`}
                text={
                  <ButtonAlertCompany
                    siteProps={siteProps}
                    active={alert.active}
                    alertColor={alertColor}
                  >
                    {alert.communitingId.companyId.name.toUpperCase()}
                  </ButtonAlertCompany>
                }
              />
            ) : (
              "Firma usunięta "
            )}
            do dojazdu, który odbył się dnia:{" "}
            <DivInlineBlock>
              <span>{dateCommunitingService}</span>
            </DivInlineBlock>
            , o godzinie:{" "}
            <DivInlineBlock>
              <span>
                {alert.communitingId.timeStart}-{alert.communitingId.timeEnd}
              </span>
              ,
            </DivInlineBlock>
          </>
        )
      } else {
        alertMessage = (
          <>
            Klient dodał opinie do dojazdu, który odbył się dnia:{" "}
            <DivInlineBlock>
              <span>{dateCommunitingService}</span>
            </DivInlineBlock>
            , o godzinę:{" "}
            <DivInlineBlock>
              <span>
                {alert.reserwationId.timeStart}-{alert.reserwationId.timeEnd}
              </span>
              ,
            </DivInlineBlock>
          </>
        )
      }
    } else if (!!alert.serviceId) {
      if (isUserService) {
        alertMessage = (
          <>
            Dodano opinie w firmie:{" "}
            {!!alert.serviceId.companyId ? (
              <LinkEffect
                path={`company?${alert.serviceId.companyId.linkPath}`}
                text={
                  <ButtonAlertCompany
                    siteProps={siteProps}
                    active={alert.active}
                    alertColor={alertColor}
                  >
                    {alert.serviceId.companyId.name.toUpperCase()}
                  </ButtonAlertCompany>
                }
              />
            ) : (
              "Firma usunięta "
            )}
            do serwisu, który odbył się dnia:{" "}
            <DivInlineBlock>
              <span>{dateService}</span>
            </DivInlineBlock>
          </>
        )
      } else {
        alertMessage = (
          <>
            Klient dodał opinie do serwisu, który odbył się dnia:{" "}
            <DivInlineBlock>
              <span>{dateService}</span>
            </DivInlineBlock>
          </>
        )
      }
    }
  } else if (alert.type === "opinion_client_edit") {
    if (!!alert.reserwationId) {
      if (isUserReserwation) {
        alertMessage = (
          <>
            Edytowano opinie w firmie:{" "}
            {!!alert.reserwationId.company ? (
              <LinkEffect
                path={`company?${alert.reserwationId.company.linkPath}`}
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
    } else if (!!alert.communitingId) {
      if (isUserCommuniting) {
        alertMessage = (
          <>
            Edytowano opinie w firmie:{" "}
            {!!alert.communitingId.companyId ? (
              <LinkEffect
                path={`company?${alert.communitingId.companyId.linkPath}`}
                text={
                  <ButtonAlertCompany
                    siteProps={siteProps}
                    active={alert.active}
                    alertColor={alertColor}
                  >
                    {alert.communitingId.companyId.name.toUpperCase()}
                  </ButtonAlertCompany>
                }
              />
            ) : (
              "Firma usunięta "
            )}
            do dojazdu, który odbył się dnia:{" "}
            <DivInlineBlock>
              <span>{dateCommunitingService}</span>
            </DivInlineBlock>
            , o godzinie:{" "}
            <DivInlineBlock>
              <span>
                {alert.communitingId.timeStart}-{alert.communitingId.timeEnd}
              </span>
              ,
            </DivInlineBlock>
          </>
        )
      } else {
        alertMessage = (
          <>
            Klient edytował opinie do dojazdu, który odbył się:{" "}
            <DivInlineBlock>
              <span>{dateCommunitingService}</span>
            </DivInlineBlock>
            , o godzinę:{" "}
            <DivInlineBlock>
              <span>
                {alert.reserwationId.timeStart}-{alert.reserwationId.timeEnd}
              </span>
              ,
            </DivInlineBlock>
          </>
        )
      }
    } else if (!!alert.serviceId) {
      if (isUserService) {
        alertMessage = (
          <>
            Edytowano opinie w firmie:{" "}
            {!!alert.serviceId.companyId ? (
              <LinkEffect
                path={`company?${alert.serviceId.companyId.linkPath}`}
                text={
                  <ButtonAlertCompany
                    siteProps={siteProps}
                    active={alert.active}
                    alertColor={alertColor}
                  >
                    {alert.serviceId.companyId.name.toUpperCase()}
                  </ButtonAlertCompany>
                }
              />
            ) : (
              "Firma usunięta "
            )}
            do serwisu, który odbył się dnia:{" "}
            <DivInlineBlock>
              <span>{dateService}</span>
            </DivInlineBlock>
          </>
        )
      } else {
        alertMessage = (
          <>
            Klient edytował opinie do serwisu, który odbył się:{" "}
            <DivInlineBlock>
              <span>{dateService}</span>
            </DivInlineBlock>
          </>
        )
      }
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
    if (!!alert.reserwationId) {
      if (isUserReserwation) {
        alertMessage = (
          <>
            Firma:{" "}
            {!!alert.reserwationId.company ? (
              <LinkEffect
                path={`company?${alert.reserwationId.company.linkPath}`}
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
            <span>{alert.reserwationId.serviceName}</span>, która odbyła się
            dnia:{" "}
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
            Odpowiedziano na opinie do usługi: {alert.reserwationId.serviceName}
            , która odbyła się dnia:{" "}
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
    } else if (!!alert.communitingId) {
      if (isUserCommuniting) {
        alertMessage = (
          <>
            Frima:{" "}
            {!!alert.communitingId.companyId ? (
              <LinkEffect
                path={`company?${alert.communitingId.companyId.linkPath}`}
                text={
                  <ButtonAlertCompany
                    siteProps={siteProps}
                    active={alert.active}
                    alertColor={alertColor}
                  >
                    {alert.communitingId.companyId.name.toUpperCase()}
                  </ButtonAlertCompany>
                }
              />
            ) : (
              "Firma usunięta "
            )}
            odpowiedziała na opinie do dojazdu, który odbył się dnia:{" "}
            <DivInlineBlock>
              <span>{dateCommunitingService}</span>
            </DivInlineBlock>
            , o godzinie:{" "}
            <DivInlineBlock>
              <span>
                {alert.communitingId.timeStart}-{alert.communitingId.timeEnd}
              </span>
              ,
            </DivInlineBlock>
          </>
        )
      } else {
        alertMessage = (
          <>
            Odpowiedziano na opinie do dojazdu, który odbył się:{" "}
            <DivInlineBlock>
              <span>{dateCommunitingService}</span>
            </DivInlineBlock>
            , o godzinę:{" "}
            <DivInlineBlock>
              <span>
                {alert.communitingId.timeStart}-{alert.communitingId.timeEnd}
              </span>
              ,
            </DivInlineBlock>
          </>
        )
      }
    } else if (!!alert.serviceId) {
      if (isUserService) {
        alertMessage = (
          <>
            Frima:{" "}
            {!!alert.serviceId.companyId ? (
              <LinkEffect
                path={`company?${alert.serviceId.companyId.linkPath}`}
                text={
                  <ButtonAlertCompany
                    siteProps={siteProps}
                    active={alert.active}
                    alertColor={alertColor}
                  >
                    {alert.serviceId.companyId.name.toUpperCase()}
                  </ButtonAlertCompany>
                }
              />
            ) : (
              "Firma usunięta "
            )}
            odpowiedziała na opinie do serwisu, który odbył się dnia:{" "}
            <DivInlineBlock>
              <span>{dateService}</span>
            </DivInlineBlock>
          </>
        )
      } else {
        alertMessage = (
          <>
            Odpowiedziano na opinie do serwisu, który odbył się:{" "}
            <DivInlineBlock>
              <span>{dateService}</span>
            </DivInlineBlock>
          </>
        )
      }
    }
  } else if (alert.type === "commuting_created") {
    alertColor = "blue"
    if (isUserCommuniting) {
      alertMessage = (
        <>
          Dodano dojazd w firmie:{" "}
          {!!alert.communitingId.companyId ? (
            <LinkEffect
              path={`company?${alert.communitingId.companyId.linkPath}`}
              text={
                <ButtonAlertCompany
                  siteProps={siteProps}
                  active={alert.active}
                  alertColor={alertColor}
                >
                  {alert.communitingId.companyId.name.toUpperCase()}
                </ButtonAlertCompany>
              }
            />
          ) : (
            "Firma usunięta "
          )}
          dnia:{" "}
          <DivInlineBlock>
            <span>{dateCommunitingService}</span>
          </DivInlineBlock>
          , o godzinie:{" "}
          <DivInlineBlock>
            <span>
              {alert.communitingId.timeStart}-{alert.communitingId.timeEnd}
            </span>
            ,
          </DivInlineBlock>
        </>
      )
    } else {
      alertMessage = (
        <>
          Dodano dojazd dnia:{" "}
          <DivInlineBlock>
            <span>{dateCommunitingService}</span>
          </DivInlineBlock>
          , o godzinę:{" "}
          <DivInlineBlock>
            <span>
              {alert.communitingId.timeStart}-{alert.communitingId.timeEnd}
            </span>
            ,
          </DivInlineBlock>
        </>
      )
    }
  } else if (alert.type === "commuting_deleted") {
    alertColor = "red"
    if (isUserCommuniting) {
      alertMessage = (
        <>
          Usunieto dojazd w firmie:{" "}
          {!!alert.communitingId.companyId ? (
            <LinkEffect
              path={`company?${alert.communitingId.companyId.linkPath}`}
              text={
                <ButtonAlertCompany
                  siteProps={siteProps}
                  active={alert.active}
                  alertColor={alertColor}
                >
                  {alert.communitingId.companyId.name.toUpperCase()}
                </ButtonAlertCompany>
              }
            />
          ) : (
            "Firma usunięta "
          )}
          dnia:{" "}
          <DivInlineBlock>
            <span>{dateCommunitingService}</span>
          </DivInlineBlock>
          , o godzinie:{" "}
          <DivInlineBlock>
            <span>
              {alert.communitingId.timeStart}-{alert.communitingId.timeEnd}
            </span>
            ,
          </DivInlineBlock>
        </>
      )
    } else {
      alertMessage = (
        <>
          Usunięto dojazd dnia:{" "}
          <DivInlineBlock>
            <span>{dateCommunitingService}</span>
          </DivInlineBlock>
          , o godzinę:{" "}
          <DivInlineBlock>
            <span>
              {alert.communitingId.timeStart}-{alert.communitingId.timeEnd}
            </span>
            ,
          </DivInlineBlock>
        </>
      )
    }
  } else if (alert.type === "commuting_changed") {
    alertColor = "orange"
    if (isUserCommuniting) {
      alertMessage = (
        <>
          Zaktualizowano dojazd w firmie:{" "}
          {!!alert.communitingId.companyId ? (
            <LinkEffect
              path={`company?${alert.communitingId.companyId.linkPath}`}
              text={
                <ButtonAlertCompany
                  siteProps={siteProps}
                  active={alert.active}
                  alertColor={alertColor}
                >
                  {alert.communitingId.companyId.name.toUpperCase()}
                </ButtonAlertCompany>
              }
            />
          ) : (
            "Firma usunięta "
          )}
          dnia:{" "}
          <DivInlineBlock>
            <span>{dateCommunitingService}</span>
          </DivInlineBlock>
          , o godzinie:{" "}
          <DivInlineBlock>
            <span>
              {alert.communitingId.timeStart}-{alert.communitingId.timeEnd}
            </span>
            ,
          </DivInlineBlock>
        </>
      )
    } else {
      alertMessage = (
        <>
          Zaktualizowano dojazd dnia:{" "}
          <DivInlineBlock>
            <span>{dateCommunitingService}</span>
          </DivInlineBlock>
          , o godzinę:{" "}
          <DivInlineBlock>
            <span>
              {alert.communitingId.timeStart}-{alert.communitingId.timeEnd}
            </span>
            ,
          </DivInlineBlock>
        </>
      )
    }
  } else if (alert.type === "commuting_canceled") {
    alertColor = "red"
    if (isUserCommuniting) {
      alertMessage = (
        <>
          Odwołano dojazd w firmie:{" "}
          {!!alert.communitingId.companyId ? (
            <LinkEffect
              path={`company?${alert.communitingId.companyId.linkPath}`}
              text={
                <ButtonAlertCompany
                  siteProps={siteProps}
                  active={alert.active}
                  alertColor={alertColor}
                >
                  {alert.communitingId.companyId.name.toUpperCase()}
                </ButtonAlertCompany>
              }
            />
          ) : (
            "Firma usunięta "
          )}
          dnia:{" "}
          <DivInlineBlock>
            <span>{dateCommunitingService}</span>
          </DivInlineBlock>
          , o godzinie:{" "}
          <DivInlineBlock>
            <span>
              {alert.communitingId.timeStart}-{alert.communitingId.timeEnd}
            </span>
            ,
          </DivInlineBlock>
        </>
      )
    } else {
      alertMessage = (
        <>
          Dojazd został odwołany dnia:{" "}
          <DivInlineBlock>
            <span>{dateCommunitingService}</span>
          </DivInlineBlock>
          , o godzinę:{" "}
          <DivInlineBlock>
            <span>
              {alert.communitingId.timeStart}-{alert.communitingId.timeEnd}
            </span>
            ,
          </DivInlineBlock>
        </>
      )
    }
  } else if (alert.type === "service_created") {
    alertColor = "green"
    if (isUserService) {
      alertMessage = (
        <>
          Dodano serwis w firmie:{" "}
          {!!alert.serviceId.companyId ? (
            <LinkEffect
              path={`company?${alert.serviceId.companyId.linkPath}`}
              text={
                <ButtonAlertCompany
                  siteProps={siteProps}
                  active={alert.active}
                  alertColor={alertColor}
                >
                  {alert.serviceId.companyId.name.toUpperCase()}
                </ButtonAlertCompany>
              }
            />
          ) : (
            "Firma usunięta "
          )}
          dnia:{" "}
          <DivInlineBlock>
            <span>{dateService}</span>
          </DivInlineBlock>
        </>
      )
    } else {
      alertMessage = (
        <>
          Serwis został dodany dnia:{" "}
          <DivInlineBlock>
            <span>{dateService}</span>
          </DivInlineBlock>
        </>
      )
    }
  } else if (alert.type === "service_deleted") {
    alertColor = "red"
    if (isUserService) {
      alertMessage = (
        <>
          Usunięto serwis w firmie:{" "}
          {!!alert.serviceId.companyId ? (
            <LinkEffect
              path={`company?${alert.serviceId.companyId.linkPath}`}
              text={
                <ButtonAlertCompany
                  siteProps={siteProps}
                  active={alert.active}
                  alertColor={alertColor}
                >
                  {alert.serviceId.companyId.name.toUpperCase()}
                </ButtonAlertCompany>
              }
            />
          ) : (
            "Firma usunięta "
          )}
          dnia:{" "}
          <DivInlineBlock>
            <span>{dateService}</span>
          </DivInlineBlock>
        </>
      )
    } else {
      alertMessage = (
        <>
          Serwis został usunięty dnia:{" "}
          <DivInlineBlock>
            <span>{dateService}</span>
          </DivInlineBlock>
        </>
      )
    }
  } else if (alert.type === "service_changed") {
    alertColor = "orange"
    if (isUserService) {
      alertMessage = (
        <>
          Zaktualizowano serwis w firmie:{" "}
          {!!alert.serviceId.companyId ? (
            <LinkEffect
              path={`company?${alert.serviceId.companyId.linkPath}`}
              text={
                <ButtonAlertCompany
                  siteProps={siteProps}
                  active={alert.active}
                  alertColor={alertColor}
                >
                  {alert.serviceId.companyId.name.toUpperCase()}
                </ButtonAlertCompany>
              }
            />
          ) : (
            "Firma usunięta "
          )}
          dnia:{" "}
          <DivInlineBlock>
            <span>{dateService}</span>
          </DivInlineBlock>
        </>
      )
    } else {
      alertMessage = (
        <>
          Serwis został zaktualizowany dnia:{" "}
          <DivInlineBlock>
            <span>{dateService}</span>
          </DivInlineBlock>
        </>
      )
    }
  }
  return {
    alertMessage: alertMessage,
    alertColor: alertColor,
  }
}
