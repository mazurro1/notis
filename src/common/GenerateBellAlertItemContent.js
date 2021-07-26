import React from "react"
import { LinkEffect } from "../common/LinkEffect"
import styled from "styled-components"
import { Colors } from "../common/Colors"

const DivInlineBlock = styled.div`
  display: inline;
  margin-right: 5px;
`
const BoldDivContentCapitalize = styled.span`
  font-family: "Poppins-Medium", sans-serif;
  display: inline-block;
  text-transform: capitalize;
`

const BoldDivContent = styled.span`
  font-family: "Poppins-Medium", sans-serif;
  display: inline-block;
`

const ButtonAlertCompany = styled.button`
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

const generateAlertFromProps = ({
  title = null,
  day = null,
  hours = null,
  reserwation = null,
  service = null,
  communiting = null,
  defaultText = null,
  texts,
}) => {
  const dayText = texts.general.dayText
  const hoursText = texts.general.hoursText
  const reserwationText = texts.general.reserwationText
  const serviceText = texts.general.serviceText
  const communitingText = texts.general.communitingText
  return (
    <div>
      {!!title && <DivInlineBlock>{title}</DivInlineBlock>}
      {!!day && (
        <DivInlineBlock>
          {dayText}: <BoldDivContent>{day},</BoldDivContent>
        </DivInlineBlock>
      )}
      {!!hours && (
        <DivInlineBlock>
          {hoursText}: <BoldDivContent>{hours},</BoldDivContent>
        </DivInlineBlock>
      )}
      {!!reserwation && (
        <DivInlineBlock>
          {reserwationText}: <BoldDivContent>{reserwation}</BoldDivContent>
        </DivInlineBlock>
      )}
      {!!service && (
        <DivInlineBlock>
          {serviceText}: <BoldDivContent>{service}</BoldDivContent>
        </DivInlineBlock>
      )}
      {!!communiting && (
        <DivInlineBlock>
          {communitingText}:{" "}
          <BoldDivContentCapitalize>{communiting}</BoldDivContentCapitalize>
        </DivInlineBlock>
      )}
      {!!defaultText && <DivInlineBlock>{defaultText}</DivInlineBlock>}
    </div>
  )
}

export const generateBellAllertItemContentSwitch = (
  alert,
  user,
  siteProps,
  texts
) => {
  let alertMessage = ""
  let alertColor = "default"
  let userName = null
  let userSurname = null
  let isUserAlert = false
  let isCompanyChanged = !!alert.companyChanged ? alert.companyChanged : false
  let alertDate = "00-00-0000"

  let companyName = () => {
    return texts.general.companyNotFound
  }

  //reserwation
  if (!!alert.reserwationId) {
    if (!!alert.reserwationId.fromUser) {
      if (!!alert.reserwationId.fromUser._id) {
        isUserAlert = user.userId === alert.reserwationId.fromUser._id
      }
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
    } else {
      if (!!alert.reserwationId.name) {
        userName = Buffer.from(alert.reserwationId.name, "base64").toString(
          "utf-8"
        )
      }
      if (!!alert.reserwationId.surname) {
        userSurname = Buffer.from(
          alert.reserwationId.surname,
          "base64"
        ).toString("utf-8")
      }
    }
    if (!!alert.reserwationId.company) {
      if (
        !!alert.reserwationId.company.name &&
        !!alert.reserwationId.company.linkPath
      ) {
        companyName = color => (
          <LinkEffect
            path={`company?${alert.reserwationId.company.linkPath}`}
            text={
              <ButtonAlertCompany
                siteProps={siteProps}
                active={alert.active}
                alertColor={color}
              >
                {alert.reserwationId.company.name.toUpperCase()}
              </ButtonAlertCompany>
            }
          />
        )
      }
    }
    if (
      !!alert.reserwationId.dateDay &&
      !!alert.reserwationId.dateMonth &&
      !!alert.reserwationId.dateYear
    ) {
      alertDate = `${
        alert.reserwationId.dateDay < 10
          ? `0${alert.reserwationId.dateDay}`
          : alert.reserwationId.dateDay
      }-${
        alert.reserwationId.dateMonth < 10
          ? `0${alert.reserwationId.dateMonth}`
          : alert.reserwationId.dateMonth
      }-${alert.reserwationId.dateYear}`
    }
  } else if (!!alert.communitingId) {
    //communiting
    if (!!alert.communitingId.userId) {
      if (!!alert.communitingId.userId._id) {
        isUserAlert = user.userId === alert.communitingId.userId._id
      }
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
    if (!!alert.communitingId.companyId) {
      if (
        !!alert.communitingId.companyId.name &&
        !!alert.communitingId.companyId.linkPath
      ) {
        companyName = color => (
          <LinkEffect
            path={`company?${alert.communitingId.companyId.linkPath}`}
            text={
              <ButtonAlertCompany
                siteProps={siteProps}
                active={alert.active}
                alertColor={color}
              >
                {alert.communitingId.companyId.name.toUpperCase()}
              </ButtonAlertCompany>
            }
          />
        )
      }
    }
    if (
      !!alert.communitingId.day &&
      !!alert.communitingId.month &&
      !!alert.communitingId.year
    ) {
      alertDate = `${
        alert.communitingId.day < 10
          ? `0${alert.communitingId.day}`
          : alert.communitingId.day
      }-${
        alert.communitingId.month < 10
          ? `0${alert.communitingId.month}`
          : alert.communitingId.month
      }-${alert.communitingId.year}`
    }
  } else if (!!alert.serviceId) {
    //service
    if (!!alert.serviceId.userId) {
      if (!!alert.serviceId.userId._id) {
        isUserAlert = user.userId === alert.serviceId.userId._id
      }
      if (!!alert.serviceId.userId.name) {
        userName = Buffer.from(alert.serviceId.userId.name, "base64").toString(
          "utf-8"
        )
        userSurname = Buffer.from(
          alert.serviceId.userId.surname,
          "base64"
        ).toString("utf-8")
      }
    }
    if (!!alert.serviceId.companyId) {
      if (
        !!alert.serviceId.companyId.name &&
        !!alert.serviceId.companyId.linkPath
      ) {
        companyName = color => (
          <LinkEffect
            path={`company?${alert.serviceId.companyId.linkPath}`}
            text={
              <ButtonAlertCompany
                siteProps={siteProps}
                active={alert.active}
                alertColor={color}
              >
                {alert.serviceId.companyId.name.toUpperCase()}
              </ButtonAlertCompany>
            }
          />
        )
      }
    }
    if (
      !!alert.serviceId.day &&
      !!alert.serviceId.month &&
      !!alert.serviceId.year
    ) {
      alertDate = `${
        alert.serviceId.day < 10
          ? `0${alert.serviceId.day}`
          : alert.serviceId.day
      }-${
        alert.serviceId.month < 10
          ? `0${alert.serviceId.month}`
          : alert.serviceId.month
      }-${alert.serviceId.year}`
    }
  } else if (!!alert.alertDefaultCompanyId) {
    if (
      !!alert.alertDefaultCompanyId.name &&
      !!alert.alertDefaultCompanyId.linkPath
    ) {
      companyName = color => (
        <LinkEffect
          path={`company?${alert.alertDefaultCompanyId.linkPath}`}
          text={
            <ButtonAlertCompany
              siteProps={siteProps}
              active={alert.active}
              alertColor={color}
            >
              {alert.alertDefaultCompanyId.name.toUpperCase()}
            </ButtonAlertCompany>
          }
        />
      )
    }
  }
  switch (alert.type) {
    case "reserwation_created": {
      alertColor = "green"
      if (isCompanyChanged) {
        if (isUserAlert) {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedUser.title[0]}{" "}
                {companyName(alertColor)}{" "}
                {texts[alert.type].companyChangedUser.title[1]}
              </>
            ),
            day: alertDate,
            hours: `${alert.reserwationId.dateStart}-${alert.reserwationId.dateEnd}`,
            reserwation: alert.reserwationId.serviceName,
            texts: texts,
          })
        } else {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedNoUser.title[0]} {userName}{" "}
                {userSurname}
              </>
            ),
            day: alertDate,
            hours: `${alert.reserwationId.dateStart}-${alert.reserwationId.dateEnd}`,
            reserwation: alert.reserwationId.serviceName,
            texts: texts,
          })
        }
      } else {
        if (isUserAlert) {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].noCompanyChangedUser.title[0]}{" "}
                {companyName(alertColor)}
              </>
            ),
            day: alertDate,
            hours: `${alert.reserwationId.dateStart}-${alert.reserwationId.dateEnd}`,
            reserwation: alert.reserwationId.serviceName,
            texts: texts,
          })
        } else {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].noCompanyChangedNoUser.title[0]} {userName}{" "}
                {userSurname}{" "}
                {texts[alert.type].noCompanyChangedNoUser.title[1]}
              </>
            ),
            day: alertDate,
            hours: `${alert.reserwationId.dateStart}-${alert.reserwationId.dateEnd}`,
            reserwation: alert.reserwationId.serviceName,
            texts: texts,
          })
        }
      }
      break
    }
    case "reserwation_changed": {
      alertColor = "orange"
      if (isCompanyChanged) {
        if (isUserAlert) {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedUser.title[0]}{" "}
                {companyName(alertColor)}{" "}
                {texts[alert.type].companyChangedUser.title[1]}
              </>
            ),
            day: alertDate,
            hours: `${alert.reserwationId.dateStart}-${alert.reserwationId.dateEnd}`,
            reserwation: alert.reserwationId.serviceName,
            texts: texts,
          })
        } else {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedNoUser.title[0]} {userName}{" "}
                {userSurname}
              </>
            ),
            day: alertDate,
            hours: `${alert.reserwationId.dateStart}-${alert.reserwationId.dateEnd}`,
            reserwation: alert.reserwationId.serviceName,
            texts: texts,
          })
        }
      } else {
        if (isUserAlert) {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].noCompanyChangedUser.title[0]}{" "}
                {companyName(alertColor)}
              </>
            ),
            day: alertDate,
            hours: `${alert.reserwationId.dateStart}-${alert.reserwationId.dateEnd}`,
            reserwation: alert.reserwationId.serviceName,
            texts: texts,
          })
        } else {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].noCompanyChangedNoUser.title[0]} {userName}{" "}
                {userSurname}{" "}
                {texts[alert.type].noCompanyChangedNoUser.title[1]}
              </>
            ),
            day: alertDate,
            hours: `${alert.reserwationId.dateStart}-${alert.reserwationId.dateEnd}`,
            reserwation: alert.reserwationId.serviceName,
            texts: texts,
          })
        }
      }
      break
    }
    case "reserwation_canceled": {
      alertColor = "red"
      if (isCompanyChanged) {
        if (isUserAlert) {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedUser.title[0]}{" "}
                {companyName(alertColor)}{" "}
                {texts[alert.type].companyChangedUser.title[1]}
              </>
            ),
            day: alertDate,
            hours: `${alert.reserwationId.dateStart}-${alert.reserwationId.dateEnd}`,
            reserwation: alert.reserwationId.serviceName,
            texts: texts,
          })
        } else {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedNoUser.title[0]} {userName}{" "}
                {userSurname}
              </>
            ),
            day: alertDate,
            hours: `${alert.reserwationId.dateStart}-${alert.reserwationId.dateEnd}`,
            reserwation: alert.reserwationId.serviceName,
            texts: texts,
          })
        }
      } else {
        if (isUserAlert) {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].noCompanyChangedUser.title[0]}{" "}
                {companyName(alertColor)}
              </>
            ),
            day: alertDate,
            hours: `${alert.reserwationId.dateStart}-${alert.reserwationId.dateEnd}`,
            reserwation: alert.reserwationId.serviceName,
            texts: texts,
          })
        } else {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].noCompanyChangedNoUser.title[0]} {userName}{" "}
                {userSurname}{" "}
                {texts[alert.type].noCompanyChangedNoUser.title[1]}
              </>
            ),
            day: alertDate,
            hours: `${alert.reserwationId.dateStart}-${alert.reserwationId.dateEnd}`,
            reserwation: alert.reserwationId.serviceName,
            texts: texts,
          })
        }
      }
      break
    }
    case "reserwation_finished": {
      alertColor = "green"
      if (isCompanyChanged) {
        if (isUserAlert) {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedUser.title[0]}{" "}
                {companyName(alertColor)}{" "}
                {texts[alert.type].companyChangedUser.title[1]}
              </>
            ),
            day: alertDate,
            hours: `${alert.reserwationId.dateStart}-${alert.reserwationId.dateEnd}`,
            reserwation: alert.reserwationId.serviceName,
            texts: texts,
          })
        } else {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedNoUser.title[0]} {userName}{" "}
                {userSurname}
              </>
            ),
            day: alertDate,
            hours: `${alert.reserwationId.dateStart}-${alert.reserwationId.dateEnd}`,
            reserwation: alert.reserwationId.serviceName,
            texts: texts,
          })
        }
      }
      break
    }
    case "reserwation_not_finished": {
      alertColor = "red"
      if (isCompanyChanged) {
        if (isUserAlert) {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedUser.title[0]}{" "}
                {companyName(alertColor)}{" "}
                {texts[alert.type].companyChangedUser.title[1]}
              </>
            ),
            day: alertDate,
            hours: `${alert.reserwationId.dateStart}-${alert.reserwationId.dateEnd}`,
            reserwation: alert.reserwationId.serviceName,
            texts: texts,
          })
        } else {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedNoUser.title[0]} {userName}{" "}
                {userSurname}
              </>
            ),
            day: alertDate,
            hours: `${alert.reserwationId.dateStart}-${alert.reserwationId.dateEnd}`,
            reserwation: alert.reserwationId.serviceName,
            texts: texts,
          })
        }
      }

      break
    }
    case "reserwation_notifaction": {
      alertColor = "blue"
      if (isCompanyChanged) {
        if (isUserAlert) {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedUser.title[0]}{" "}
                {companyName(alertColor)}{" "}
                {texts[alert.type].companyChangedUser.title[1]}
              </>
            ),
            day: alertDate,
            hours: `${alert.reserwationId.dateStart}-${alert.reserwationId.dateEnd}`,
            reserwation: alert.reserwationId.serviceName,
            texts: texts,
          })
        }
      }
      break
    }
    case "reserwation_worker_created": {
      alertColor = "gray"
      if (isCompanyChanged) {
        if (isUserAlert) {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedUser.title[0]}{" "}
                {companyName(alertColor)}
              </>
            ),
            day: alertDate,
            hours: `${alert.reserwationId.dateStart}-${alert.reserwationId.dateEnd}`,
            texts: texts,
          })
        } else {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedNoUser.title[0]}{" "}
                {companyName(alertColor)}{" "}
                {texts[alert.type].companyChangedNoUser.title[1]}
              </>
            ),
            day: alertDate,
            hours: `${alert.reserwationId.dateStart}-${alert.reserwationId.dateEnd}`,
            texts: texts,
          })
        }
      }
      break
    }
    case "reserwation_worker_changed": {
      alertColor = "gray"
      if (isCompanyChanged) {
        if (isUserAlert) {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedUser.title[0]}{" "}
                {companyName(alertColor)}
              </>
            ),
            day: alertDate,
            hours: `${alert.reserwationId.dateStart}-${alert.reserwationId.dateEnd}`,
            texts: texts,
          })
        } else {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedNoUser.title[0]}{" "}
                {companyName(alertColor)}{" "}
                {texts[alert.type].companyChangedNoUser.title[1]}
              </>
            ),
            day: alertDate,
            hours: `${alert.reserwationId.dateStart}-${alert.reserwationId.dateEnd}`,
            texts: texts,
          })
        }
      }
      break
    }
    case "reserwation_worker_canceled": {
      alertColor = "gray"
      if (isCompanyChanged) {
        if (isUserAlert) {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedUser.title[0]}{" "}
                {companyName(alertColor)}
              </>
            ),
            day: alertDate,
            hours: `${alert.reserwationId.dateStart}-${alert.reserwationId.dateEnd}`,
            texts: texts,
          })
        } else {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedNoUser.title[0]}{" "}
                {companyName(alertColor)}{" "}
                {texts[alert.type].companyChangedNoUser.title[1]}
              </>
            ),
            day: alertDate,
            hours: `${alert.reserwationId.dateStart}-${alert.reserwationId.dateEnd}`,
            texts: texts,
          })
        }
      }
      break
    }
    case "opinion_client": {
      alertColor = "gray"
      if (!isCompanyChanged) {
        if (isUserAlert) {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].noCompanyChangedUser.title[0]}{" "}
                {companyName(alertColor)}
              </>
            ),
            reserwation: alert.reserwationId.serviceName,
            texts: texts,
          })
        } else {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].noCompanyChangedNoUser.title[0]} {userName}{" "}
                {userSurname}{" "}
                {texts[alert.type].noCompanyChangedNoUser.title[1]}
              </>
            ),
            reserwation: alert.reserwationId.serviceName,
            texts: texts,
          })
        }
      }
      break
    }
    case "opinion_client_edit": {
      alertColor = "gray"
      if (!isCompanyChanged) {
        if (isUserAlert) {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].noCompanyChangedUser.title[0]}{" "}
                {companyName(alertColor)}
              </>
            ),
            reserwation: alert.reserwationId.serviceName,
            texts: texts,
          })
        } else {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].noCompanyChangedNoUser.title[0]} {userName}{" "}
                {userSurname}{" "}
                {texts[alert.type].noCompanyChangedNoUser.title[1]}
              </>
            ),
            reserwation: alert.reserwationId.serviceName,
            texts: texts,
          })
        }
      }
      break
    }
    case "opinion_from_company": {
      alertColor = "gray"
      if (isCompanyChanged) {
        if (isUserAlert) {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedUser.title[0]}{" "}
                {companyName(alertColor)}{" "}
                {texts[alert.type].companyChangedUser.title[1]}
              </>
            ),
            reserwation: alert.reserwationId.serviceName,
            texts: texts,
          })
        } else {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedNoUser.title[0]} {userName}{" "}
                {userSurname}
              </>
            ),
            reserwation: alert.reserwationId.serviceName,
            texts: texts,
          })
        }
      }
      break
    }
    case "commuting_created": {
      alertColor = "green"
      if (isCompanyChanged) {
        if (isUserAlert) {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedUser.title[0]}{" "}
                {companyName(alertColor)}{" "}
                {texts[alert.type].companyChangedUser.title[1]}
              </>
            ),
            day: alertDate,
            hours: `${alert.communitingId.timeStart}-${alert.communitingId.timeEnd}`,
            communiting: alert.communitingId.city,
            texts: texts,
          })
        } else {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedNoUser.title[0]} {userName}{" "}
                {userSurname}
              </>
            ),
            day: alertDate,
            hours: `${alert.communitingId.timeStart}-${alert.communitingId.timeEnd}`,
            communiting: alert.communitingId.city,
            texts: texts,
          })
        }
      }
      break
    }
    case "commuting_changed": {
      alertColor = "orange"
      if (isCompanyChanged) {
        if (isUserAlert) {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedUser.title[0]}{" "}
                {companyName(alertColor)}{" "}
                {texts[alert.type].companyChangedUser.title[1]}
              </>
            ),
            day: alertDate,
            hours: `${alert.communitingId.timeStart}-${alert.communitingId.timeEnd}`,
            communiting: alert.communitingId.city,
            texts: texts,
          })
        } else {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedNoUser.title[0]} {userName}{" "}
                {userSurname}
              </>
            ),
            day: alertDate,
            hours: `${alert.communitingId.timeStart}-${alert.communitingId.timeEnd}`,
            communiting: alert.communitingId.city,
            texts: texts,
          })
        }
      }
      break
    }
    case "commuting_deleted": {
      alertColor = "red"
      if (isCompanyChanged) {
        if (isUserAlert) {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedUser.title[0]}{" "}
                {companyName(alertColor)}{" "}
                {texts[alert.type].companyChangedUser.title[1]}
              </>
            ),
            day: alertDate,
            hours: `${alert.communitingId.timeStart}-${alert.communitingId.timeEnd}`,
            communiting: alert.communitingId.city,
            texts: texts,
          })
        } else {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedNoUser.title[0]} {userName}{" "}
                {userSurname}
              </>
            ),
            day: alertDate,
            hours: `${alert.communitingId.timeStart}-${alert.communitingId.timeEnd}`,
            communiting: alert.communitingId.city,
            texts: texts,
          })
        }
      } else {
        if (isUserAlert) {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].noCompanyChangedUser.title[0]}{" "}
                {companyName(alertColor)}
              </>
            ),
            day: alertDate,
            hours: `${alert.communitingId.timeStart}-${alert.communitingId.timeEnd}`,
            communiting: alert.communitingId.city,
            texts: texts,
          })
        } else {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].noCompanyChangedNoUser.title[0]} {userName}{" "}
                {userSurname}{" "}
                {texts[alert.type].noCompanyChangedNoUser.title[1]}
              </>
            ),
            day: alertDate,
            hours: `${alert.communitingId.timeStart}-${alert.communitingId.timeEnd}`,
            communiting: alert.communitingId.city,
            texts: texts,
          })
        }
      }
      break
    }
    case "commuting_canceled": {
      alertColor = "red"
      if (isCompanyChanged) {
        if (isUserAlert) {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedUser.title[0]}{" "}
                {companyName(alertColor)}{" "}
                {texts[alert.type].companyChangedUser.title[1]}
              </>
            ),
            day: alertDate,
            hours: `${alert.communitingId.timeStart}-${alert.communitingId.timeEnd}`,
            communiting: alert.communitingId.city,
            texts: texts,
          })
        } else {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedNoUser.title[0]} {userName}{" "}
                {userSurname}
              </>
            ),
            day: alertDate,
            hours: `${alert.communitingId.timeStart}-${alert.communitingId.timeEnd}`,
            communiting: alert.communitingId.city,
            texts: texts,
          })
        }
      } else {
        if (isUserAlert) {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].noCompanyChangedUser.title[0]}{" "}
                {companyName(alertColor)}
              </>
            ),
            day: alertDate,
            hours: `${alert.communitingId.timeStart}-${alert.communitingId.timeEnd}`,
            communiting: alert.communitingId.city,
            texts: texts,
          })
        } else {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].noCompanyChangedNoUser.title[0]} {userName}{" "}
                {userSurname}{" "}
                {texts[alert.type].noCompanyChangedNoUser.title[1]}
              </>
            ),
            day: alertDate,
            hours: `${alert.communitingId.timeStart}-${alert.communitingId.timeEnd}`,
            communiting: alert.communitingId.city,
            texts: texts,
          })
        }
      }
      break
    }
    case "service_created": {
      alertColor = "green"
      if (isCompanyChanged) {
        if (isUserAlert) {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedUser.title[0]}{" "}
                {companyName(alertColor)}{" "}
                {texts[alert.type].companyChangedUser.title[1]}
              </>
            ),
            day: alertDate,
            service: alert.serviceId.objectName,
            texts: texts,
          })
        } else {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedNoUser.title[0]} {userName}{" "}
                {userSurname}
              </>
            ),
            day: alertDate,
            service: alert.serviceId.objectName,
            texts: texts,
          })
        }
      }
      break
    }
    case "service_changed": {
      alertColor = "orange"
      if (isCompanyChanged) {
        if (isUserAlert) {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedUser.title[0]}{" "}
                {companyName(alertColor)}{" "}
                {texts[alert.type].companyChangedUser.title[1]}
              </>
            ),
            day: alertDate,
            service: alert.serviceId.objectName,
            texts: texts,
          })
        } else {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedNoUser.title[0]} {userName}{" "}
                {userSurname}
              </>
            ),
            day: alertDate,
            service: alert.serviceId.objectName,
            texts: texts,
          })
        }
      }
      break
    }
    case "service_deleted": {
      alertColor = "red"
      if (isCompanyChanged) {
        if (isUserAlert) {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedUser.title[0]}{" "}
                {companyName(alertColor)}{" "}
                {texts[alert.type].companyChangedUser.title[1]}
              </>
            ),
            day: alertDate,
            service: alert.serviceId.objectName,
            texts: texts,
          })
        } else {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedNoUser.title[0]} {userName}{" "}
                {userSurname}
              </>
            ),
            day: alertDate,
            service: alert.serviceId.objectName,
            texts: texts,
          })
        }
      } else {
        if (isUserAlert) {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].noCompanyChangedUser.title[0]}{" "}
                {companyName(alertColor)}
              </>
            ),
            day: alertDate,
            service: alert.serviceId.objectName,
            texts: texts,
          })
        } else {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].noCompanyChangedNoUser.title[0]} {userName}{" "}
                {userSurname}{" "}
                {texts[alert.type].noCompanyChangedNoUser.title[1]}
              </>
            ),
            day: alertDate,
            service: alert.serviceId.objectName,
            texts: texts,
          })
        }
      }
      break
    }
    case "service_canceled": {
      alertColor = "red"
      if (isCompanyChanged) {
        if (isUserAlert) {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedUser.title[0]}{" "}
                {companyName(alertColor)}{" "}
                {texts[alert.type].companyChangedUser.title[1]}
              </>
            ),
            day: alertDate,
            service: alert.serviceId.objectName,
            texts: texts,
          })
        } else {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedNoUser.title[0]} {userName}{" "}
                {userSurname}
              </>
            ),
            day: alertDate,
            service: alert.serviceId.objectName,
            texts: texts,
          })
        }
      } else {
        if (isUserAlert) {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].noCompanyChangedUser.title[0]}{" "}
                {companyName(alertColor)}
              </>
            ),
            day: alertDate,
            service: alert.serviceId.objectName,
            texts: texts,
          })
        } else {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].noCompanyChangedNoUser.title[0]} {userName}{" "}
                {userSurname}{" "}
                {texts[alert.type].noCompanyChangedNoUser.title[1]}
              </>
            ),
            day: alertDate,
            service: alert.serviceId.objectName,
            texts: texts,
          })
        }
      }
      break
    }
    case "service_finished": {
      alertColor = "green"
      if (isCompanyChanged) {
        if (isUserAlert) {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedUser.title[0]}{" "}
                {companyName(alertColor)}{" "}
                {texts[alert.type].companyChangedUser.title[1]}
              </>
            ),
            day: alertDate,
            service: alert.serviceId.objectName,
            texts: texts,
          })
        } else {
          alertMessage = generateAlertFromProps({
            title: (
              <>
                {texts[alert.type].companyChangedNoUser.title[0]} {userName}{" "}
                {userSurname}
              </>
            ),
            day: alertDate,
            service: alert.serviceId.objectName,
            texts: texts,
          })
        }
      }
      break
    }
    case "alert_notifaction_sms": {
      alertColor = "red"
      if (isCompanyChanged) {
        alertMessage = generateAlertFromProps({
          title: (
            <>
              {texts[alert.type].companyChangedUser.title[0]}{" "}
              {companyName(alertColor)}{" "}
              {texts[alert.type].companyChangedUser.title[1]}
            </>
          ),
          texts: texts,
        })
      }
      break
    }
    case "alert_notifaction_premium": {
      alertColor = "red"
      if (isCompanyChanged) {
        alertMessage = generateAlertFromProps({
          title: (
            <>
              {texts[alert.type].companyChangedUser.title[0]}{" "}
              {companyName(alertColor)}{" "}
              {texts[alert.type].companyChangedUser.title[1]}
            </>
          ),
          texts: texts,
        })
      }
      break
    }

    default: {
      alertColor = "red"
      alertMessage = texts.general.alertNotFound
      break
    }
  }

  return {
    alertMessage: alertMessage,
    alertColor: alertColor,
  }
}
