import React from "react"
import { LinkEffect } from "../common/LinkEffect"
import styled from "styled-components"
import { Colors } from "../common/Colors"

const TextBeforeCompany = styled.div`
  display: inline-block;
  margin-right: 5px;
`

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
  console.log(alert)

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
                {texts[alert.type].companyChangedNoUser.title[0]}{" "}
                {companyName(alertColor)}{" "}
                {texts[alert.type].companyChangedNoUser.title[1]}
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
    // case "reserwation_changed": {
    //   alertColor = "green"
    //   alertMessage = "reser changed"
    //   break
    // }

    default: {
      alertColor = "red"
      alertMessage = "nic"
    }
  }

  return {
    alertMessage: alertMessage,
    alertColor: alertColor,
  }
}

export const generateBellAlertItemContent = (alert, user, siteProps) => {
  let alertMessage = ""
  let textBeginningAlert = ""
  let alertColor = "default"
  let userName = null
  let userSurname = null

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
    alert.type !== "new_reserwation_worker" &&
    alert.type !== "reserwation_worker" &&
    alert.type !== "opinion_client" &&
    alert.type !== "opinion_client_edit" &&
    alert.type !== "opinion_from_company" &&
    alert.type !== "commuting_created" &&
    true
    // alert.type !== "alert_notifaction_sms" &&
    // alert.type !== "alert_notifaction_premium" &&
    // alert.type !== "commuting_deleted" &&
    // alert.type !== "commuting_changed" &&
    // alert.type !== "commuting_canceled" &&
    // alert.type !== "service_created" &&
    // alert.type !== "service_deleted" &&
    // alert.type !== "service_changed" &&
    // alert.type !== "service_finished" &&
    // alert.type !== "service_canceled"
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

    if (alert.type === "reserwation_created") {
      alertColor = "blue"
      if (!isCompanyChangedReserwation) {
        textBeginningAlert = isUserReserwation
          ? "Rezerwacja została utworzona w firmie"
          : "dokonał rezerwacji"
      } else {
        textBeginningAlert = isUserReserwation ? "" : ""
      }
    } else if (alert.type === "reserwation_changed") {
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
    } else if (alert.type === "reserwation_canceled") {
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
    } else if (alert.type === "reserwation_notifaction") {
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
  } else if (alert.type === "reserwation_worker") {
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
  } else if (alert.type === "new_reserwation_worker") {
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
  } else if (alert.type === "service_canceled") {
    alertColor = "red"
    if (isUserService) {
      alertMessage = (
        <>
          Odwołano serwis w firmie:{" "}
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
          Serwis został odwołany dnia:{" "}
          <DivInlineBlock>
            <span>{dateService}</span>
          </DivInlineBlock>
        </>
      )
    }
  } else if (alert.type === "service_finished") {
    alertColor = "green"
    if (isUserService) {
      alertMessage = (
        <>
          Ukończono serwis w firmie:{" "}
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
          Serwis został ukończony dnia:{" "}
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
