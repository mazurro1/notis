import styled from "styled-components"
import { Colors } from "@common/Colors"
import { SitePropsInterface } from "@common/types"

export const InputStyled = styled.input<{
  icon: boolean
  paddingEye: boolean
  validText: boolean
  inputActive: boolean
  siteProps: SitePropsInterface
  secondColor: boolean
  value: string
  placeholder: string
  onChange: any
  onFocus: Function
  onBlur: Function
  type: string
  max: string
  required: boolean
  ref: any
}>`
  padding: 15px 15px;
  padding-bottom: 10px;
  padding-top: 20px;
  padding-left: ${props => (props.icon ? "50px" : "10px")};
  padding-right: ${props => (props.paddingEye ? "40px" : "15px")};
  margin-top: 5px;
  margin-bottom: ${props => (props.validText ? "0px" : "5px")};
  border: none;
  font-size: 16px;
  border-bottom: ${props =>
    props.inputActive
      ? props.secondColor
        ? `2px solid ${Colors(props.siteProps).secondColor}`
        : `2px solid ${Colors(props.siteProps).primaryColor}`
      : `2px solid ${Colors(props.siteProps).darkColorLight}`};
  width: 100%;
  color: ${props => Colors(props.siteProps).textNormalBlack};
  background-color: transparent;
  transition-property: border-bottom, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  ::placeholder {
    padding-right: 50px;
    padding-left: 5px;
  }

  &:active,
  &:focus {
    outline: none;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    box-shadow: 0 0 0 30px
      ${props => Colors(props.siteProps).companyItemBackground} inset !important;
    -webkit-text-fill-color: ${props =>
      Colors(props.siteProps).textNormalBlack} !important;
  }
`

export const AllInput = styled.div`
  display: inline-block;
  position: relative;
  overflow: hidden;
  border: none;
  border-radius: 5px;
  width: 100%;
  margin: 5px 0;
`

export const IconInput = styled.div<{
  inputActive: boolean
  secondColor: boolean
  siteProps: SitePropsInterface
}>`
  position: absolute;
  top: 6px;
  bottom: 0;
  left: 0;
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  color: ${props =>
    props.inputActive
      ? props.secondColor
        ? Colors(props.siteProps).secondColor
        : Colors(props.siteProps).primaryColor
      : Colors(props.siteProps).darkColorLight};
  transition-property: color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

export const ValidTextInput = styled.div<{
  inputActive: boolean
  secondColor: boolean
  siteProps: SitePropsInterface
}>`
  font-size: 0.8rem;
  text-align: right;
  color: ${props =>
    props.inputActive
      ? props.secondColor
        ? Colors(props.siteProps).secondColor
        : Colors(props.siteProps).primaryColor
      : Colors(props.siteProps).darkColorLight};
  font-family: "Poppins-Medium", sans-serif;
  transition-property: color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

export const PositionRelative = styled.div`
  position: relative;
`

export const TextValue = styled.div<{
  active: boolean
  inputActive: boolean
  secondColor: boolean
  siteProps: SitePropsInterface
}>`
  position: absolute;
  left: 0;
  top: 0;
  font-size: 0.8rem;
  font-family: "Poppins-Medium", sans-serif;
  opacity: ${props => (props.active ? 1 : 0)};
  color: ${props =>
    !props.inputActive
      ? Colors(props.siteProps).darkColorLight
      : props.secondColor
      ? Colors(props.siteProps).secondColor
      : Colors(props.siteProps).primaryColor};
  transition-property: color, opacity;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

export const ShowPassword = styled.div<{
  active: boolean
  secondColor: boolean
  siteProps: SitePropsInterface
}>`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 40px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  color: ${props =>
    props.active
      ? props.secondColor
        ? Colors(props.siteProps).secondDarkColor
        : Colors(props.siteProps).primaryColorDark
      : Colors(props.siteProps).darkColor};
  transition-property: color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

export const IconEyeClick = styled.div`
  cursor: pointer;
  transition-property: transform;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    transform: scale(1.2);
  }
`
