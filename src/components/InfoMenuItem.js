import React, { useState } from "react"
import InfoMenuItemStep from "./InfoMenuItemStep"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import { Collapse } from "react-collapse"
import { MdExpandMore } from "react-icons/md"

const TitleCategory = styled.div`
  position: relative;
  font-size: 1.25rem;
  cursor: pointer;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  background-color: ${props => Colors(props.siteProps).primaryColor};
  padding: 10px;
  border-radius: 5px;
  padding-right: 50px;
  padding-bottom: 10px;
  margin-top: 10px;
  overflow: hidden;
`

const IconArrowPosition = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  padding: 7px;
  padding-bottom: 0;
  font-size: 2rem;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  svg {
    transform: ${props =>
      props.collapseActive ? "rotate(-180deg)" : "rotate(0deg)"};
    transition-property: transform;
    transition-duration: 0.5s;
    transition-timing-function: ease;
  }

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`

const InfoMenuItem = ({
  itemMenu,
  itemMenuIndex,
  handleClickInfo,
  pathname,
  siteProps,
  handleClickShowContentHelp,
}) => {
  const [collapseActive, setCollapseActive] = useState(false)

  const handleClickArrow = () => {
    setCollapseActive(prevState => !prevState)
  }

  const mapItemMenuSteps = itemMenu.steps.map((itemStep, itemStepIndex) => {
    const isRoutePathname = pathname === itemStep.path
    console.log(isRoutePathname, pathname, itemStep.path)
    return (
      <InfoMenuItemStep
        key={itemStepIndex}
        itemStepIndex={itemStepIndex}
        itemStep={itemStep}
        handleClickInfo={handleClickInfo}
        isRoutePathname={isRoutePathname}
        siteProps={siteProps}
        itemMenuIndex={itemMenuIndex}
        handleClickShowContentHelp={handleClickShowContentHelp}
      />
    )
  })
  return (
    <>
      <TitleCategory siteProps={siteProps} onClick={handleClickArrow}>
        {itemMenuIndex + 1}. {itemMenu.title}
        <IconArrowPosition collapseActive={collapseActive}>
          <MdExpandMore />
        </IconArrowPosition>
      </TitleCategory>
      <Collapse isOpened={collapseActive}>{mapItemMenuSteps}</Collapse>
    </>
  )
}
export default InfoMenuItem
