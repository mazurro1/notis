import React from "react"
import { LinkEffect } from "@common/LinkEffect"
import styled from "styled-components"
import { Colors } from "@common/Colors"
import { ButtonIcon } from "@ui"
import { MdWeb, MdSearch, MdWarning } from "react-icons/md"

const ServiceItem = styled.div`
  position: relative;
  background-color: ${props =>
    props.isAlert
      ? Colors(props.siteProps).dangerLightColor
      : Colors(props.siteProps).companyItemBackground};
  padding: 10px;
  border-radius: 5px;
  border-top-left-radius: ${props => (props.index ? "0px" : "5px")};
  border-top-right-radius: ${props => (props.index ? "0px" : "5px")};
  margin: 5px 5px;
  margin-top: ${props => (props.index ? "0px" : "5px")};
  overflow: hidden;
  color: ${props => Colors(props.siteProps).textNormalBlack};
`

const PositionButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
`

const PositionNumeric = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: flex-start;
`

const NumericContent = styled.div`
  width: 40px;
`

const NumericContentWarning = styled.div`
  width: 40px;
  font-size: 1.4rem;
  color: ${props => Colors(props.siteProps).dangerColorDark};
  line-height: 0px;
`

const TextContent = styled.div`
  width: calc(100% - 40px);
`

const InfoMenuItemStep = ({
  itemStep,
  itemStepIndex,
  handleClickInfo,
  siteProps,
  itemMenuIndex,
  handleClickShowContentHelp,
  setHelpContentVisible,
  isAlert = false,
  hasAlert = false,
}) => {
  let buttonElement = null
  if (itemStep.pathValid) {
    if (itemStep.elementValid) {
      buttonElement = (
        <ButtonIcon
          title={itemStep.elementName}
          uppercase
          fontIconSize="22"
          fontSize="16"
          icon={<MdSearch />}
          customColorButton={Colors(siteProps).primaryColorDark}
          customColorIcon={Colors(siteProps).primaryColor}
          onClick={() => {
            if (!!itemStep.elementHandler) {
              itemStep.elementHandler()
              setHelpContentVisible(false)
              setTimeout(() => {
                handleClickInfo(itemStep.elementId, itemStep.lightFromEffect)
              }, 400)
            } else {
              handleClickInfo(itemStep.elementId, itemStep.lightFromEffect)
            }
          }}
        />
      )
    }
  } else if (itemStep.pathRouteEnable) {
    buttonElement = (
      <LinkEffect
        path={itemStep.path}
        text={
          <ButtonIcon
            title={itemStep.pathRouteName}
            uppercase
            fontIconSize="22"
            fontSize="16"
            icon={<MdWeb />}
            customColorButton={Colors(siteProps).primaryColorDark}
            customColorIcon={Colors(siteProps).primaryColor}
            onClick={handleClickShowContentHelp}
            isFetchToBlock
          />
        }
      />
    )
  }

  return (
    <ServiceItem
      index={hasAlert ? itemStepIndex === null : itemStepIndex === 0}
      siteProps={siteProps}
      isAlert={isAlert}
    >
      <PositionNumeric>
        {isAlert ? (
          <NumericContentWarning>
            <MdWarning />
          </NumericContentWarning>
        ) : (
          <NumericContent>
            {itemMenuIndex + 1}.{itemStepIndex + 1}.
          </NumericContent>
        )}
        <TextContent>
          <div>{itemStep.title}</div>
          {!!buttonElement && <PositionButton>{buttonElement}</PositionButton>}
        </TextContent>
      </PositionNumeric>
    </ServiceItem>
  )
}
export default InfoMenuItemStep
