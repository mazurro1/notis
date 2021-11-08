// @ts-ignore

import styled from "styled-components"
import { Colors } from "@common/Colors"
import { SitePropsInterface } from "@common/types"
import loadable from "@loadable/component"
// @ts-ignore
const PinField = loadable(() => import("react-pin-field"))

export const ColorsInput = styled.div<{
  siteProps: SitePropsInterface
  width: number
  marginElements: number
  whiteInputs: boolean
}>`
  input {
    background-color: ${props =>
      props.whiteInputs
        ? Colors(props.siteProps).textNormalWhite
        : Colors(props.siteProps).companyItemBackground};
    color: ${props => Colors(props.siteProps).textNormalBlack};
    width: ${props => props.width + "px"};
    height: ${props => props.width + "px"};

    &:nth-child(3n) {
      margin-right: ${props => props.marginElements + "px"};

      @media all and (max-width: 490px) {
        margin-right: 5px;
      }
    }
  }
`

export const ColorsInputShort = styled.div<{
  siteProps: SitePropsInterface
  width: number
  marginElements: number
  whiteInputs: boolean
}>`
  input {
    background-color: ${props =>
      props.whiteInputs
        ? Colors(props.siteProps).textNormalWhite
        : Colors(props.siteProps).companyItemBackground};
    color: ${props => Colors(props.siteProps).textNormalBlack};
    width: ${props => props.width + "px"};
    height: ${props => props.width + "px"};

    &:nth-child(3) {
      margin-right: ${props => props.marginElements + "px"};

      @media all and (max-width: 490px) {
        margin-right: 5px;
      }
    }
    &:nth-child(5) {
      margin-right: ${props => props.marginElements + "px"};

      @media all and (max-width: 490px) {
        margin-right: 5px;
      }
    }
  }
`

export const PanFieldStyle = styled(PinField)<{
  onChange: any
}>`
  border-radius: 2px;
  border: none;
  outline: none;
  text-align: center;
  margin: 1px;
  font-size: 1rem;
  font-family: "Poppins-Medium", sans-serif;
  transition-property: color;
  transition-duration: 0.3s;
  transition-timing-function: ease;

  &:disabled {
    color: #bdbdbd;
  }

  @media all and (max-width: 490px) {
    width: 25px;
    height: 25px;
    font-size: 1rem;
  }
`

export const TextValue = styled.div<{
  siteProps: SitePropsInterface
  active: boolean
}>`
  font-size: 0.8rem;
  font-family: "Poppins-Medium", sans-serif;
  color: ${props =>
    props.active
      ? Colors(props.siteProps).primaryColor
      : Colors(props.siteProps).darkColorLight};
  transition-property: color, opacity;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

export const NumberToCountry = styled.div<{
  siteProps: SitePropsInterface
}>`
  display: inline-block;
  color: ${props => Colors(props.siteProps).primaryColorDark};
  margin-right: 10px;
  font-family: "Poppins-Medium", sans-serif;
`

export const StyleInputs = styled.div`
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }
`

export const PhoneInline = styled.div`
  display: inline-block;
`
