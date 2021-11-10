import React, { FunctionComponent } from "react"
import styled from "styled-components"
import { Colors } from "@common/Colors"
import { generateBellAllertItemContentSwitch } from "@common/GenerateBellAlertItemContent"
import {
  SitePropsInterface,
  BellAlert,
  LoginUserInterface,
} from "@common/types"
import { checkPropTypes } from "@ui"

const TimeStyle = styled.div<{
  siteProps: SitePropsInterface
  active: boolean
  alertColor: string
}>`
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

export interface IBellAlertsItem {
  siteProps: SitePropsInterface
  alert: BellAlert
  AlertItemStyle: any
  user: LoginUserInterface
  texts: number
}

const BellAlertsItem: FunctionComponent<IBellAlertsItem> = ({
  siteProps,
  alert,
  AlertItemStyle,
  user,
  texts,
}) => {
  const { alertMessage = "", alertColor = "default" } =
    generateBellAllertItemContentSwitch(alert, user, siteProps, texts)
  checkPropTypes(
    {
      name: "jaaaaaaa",
      surname: "xxxxxx",
    },
    {
      name: {
        type: "string",
        required: true,
      },
      surname: {
        type: "string",
        required: false,
      },
    }
  )
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
