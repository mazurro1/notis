import React from "react"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import {
  generateBellAlertItemContent,
  generateBellAllertItemContentSwitch,
} from "../common/GenerateBellAlertItemContent"

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

const BellAlertsItem = ({ siteProps, alert, AlertItemStyle, user, texts }) => {
  const {
    alertMessage = "",
    alertColor = "default",
  } = generateBellAllertItemContentSwitch(alert, user, siteProps, texts)

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
