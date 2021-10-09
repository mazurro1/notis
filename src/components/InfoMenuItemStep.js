import React from "react"
import { LinkEffect } from "../common/LinkEffect"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import ButtonIcon from "../components/ButtonIcon"
import { MdWeb, MdSearch } from "react-icons/md"

const ServiceItem = styled.div`
  position: relative;
  background-color: ${props => Colors(props.siteProps).companyItemBackground};
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

const InfoMenuItemStep = ({
  itemStep,
  itemStepIndex,
  handleClickInfo,
  isRoutePathname,
  siteProps,
  itemMenuIndex,
  handleClickShowContentHelp,
}) => {
  let buttonElement = null
  if (isRoutePathname) {
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
          handleClickInfo(itemStep.elementId)
        }}
      />
    )
  } else {
    if (itemStep.enableRoute) {
      buttonElement = (
        <LinkEffect
          path={itemStep.path}
          text={
            <ButtonIcon
              title={itemStep.routeName}
              uppercase
              fontIconSize="22"
              fontSize="16"
              icon={<MdWeb />}
              customColorButton={Colors(siteProps).primaryColorDark}
              customColorIcon={Colors(siteProps).primaryColor}
              onClick={handleClickShowContentHelp}
            />
          }
        />
      )
    }
  }
  return (
    <ServiceItem index={itemStepIndex === 0} siteProps={siteProps}>
      <div>
        {itemMenuIndex + 1}.{itemStepIndex + 1}. {itemStep.title}
      </div>
      <PositionButton>{buttonElement}</PositionButton>
    </ServiceItem>
  )
}
export default InfoMenuItemStep
