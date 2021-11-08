import styled from "styled-components"

export const ParagraphStyle = styled.p<{
  fontUppercase: boolean
  fontColor: string
  fontSize: string
  fontBold: boolean
  spanUppercase: boolean
  spanColor: string
  spanSize: number
  spanBold: boolean
  padding: string
  margin: string
}>`
  text-transform: ${props => (props.fontUppercase ? "uppercase" : "none")};
  color: ${props => props.fontColor};
  font-size: ${props => props.fontSize};
  font-family: ${props =>
    props.spanBold ? "Poppins-Medium" : "Poppins-Regular"};
  padding: ${props => props.padding};
  margin: ${props => props.margin};

  span {
    text-transform: ${props => (props.spanUppercase ? "uppercase" : "none")};
    color: ${props => props.spanColor};
    font-size: ${props => props.spanSize + "px"};
    font-family: ${props =>
      props.spanBold ? "Poppins-Bold" : "Poppins-Medium"};
  }
`
