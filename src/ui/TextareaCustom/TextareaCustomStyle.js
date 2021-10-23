import styled from "styled-components"
import { Colors } from "@common/Colors"

export const CustomStyleTextarea = styled.textarea`
  max-width: 100%;
  min-width: 100%;
  min-height: 100px;
  max-height: 300px;
  border: ${props =>
    props.isErrorText
      ? `1px solid ${Colors(props.siteProps).dangerColor}`
      : `1px solid ${Colors(props.siteProps).secondColor}`};
  background-color: ${props => Colors(props.siteProps).companyItemBackground};
  color: ${props => Colors(props.siteProps).textNormalBlack};
  border-radius: 5px;
  padding: 10px;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
  transition-property: border;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

export const ErrorText = styled.div`
  font-size: 0.75rem;
  font-family: "Poppins-Bold", sans-serif;
  color: ${props => Colors(props.siteProps).dangerColor};
  padding-left: 10px;
`
