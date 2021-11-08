import styled from "styled-components"
import { Colors } from "@common/Colors"
import { SitePropsInterface } from "@common/types"

export const DivTakeData = styled.div<{
  mouseClick: boolean
  numberScale: number
  resetTextEnable: boolean
  siteProps: SitePropsInterface
}>`
  position: relative;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 5px;
  color: ${props => Colors(props.siteProps).selectDateNavigationText};
  font-size: 16px;
  user-select: none;
  padding: 13px 0;
  padding-left: 50px;
  padding-right: ${props => (props.resetTextEnable ? "40px" : "20px")};
  background-color: ${props =>
    Colors(props.siteProps).selectDateNavigationBackground};
  cursor: pointer;
  margin-bottom: 5px;
  margin-right: 10px;
  min-width: 260px;
  transform: ${props =>
    props.mouseClick ? `scale(${props.numberScale})` : "scale(1)"};
  transition-property: background-color, transform;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    background-color: ${props =>
      Colors(props.siteProps).selectDateNavigationBackgroundHover};
  }
`

export const IconStyle = styled.div<{
  siteProps: SitePropsInterface
}>`
  position: absolute;
  top: -2px;
  bottom: 0;
  left: 0;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  color: ${props => Colors(props.siteProps).selectDateNavigationText};
`

export const IconResetDate = styled.div<{
  onClick: any
  siteProps: SitePropsInterface
}>`
  position: absolute;
  top: 10px;
  right: 5px;
  font-size: 1.5rem;
  color: #757575;
  transition-property: color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    color: ${props => Colors(props.siteProps).primaryColorDark};
  }
`
