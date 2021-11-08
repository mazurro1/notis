import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const LinkStyle = styled(Link)<{
  fontSize: number
}>`
  font-size: ${props => props.fontSize + "rem"};
`

export const LinkEffect = ({
  path = "/",
  text = "",
  fontSize = 1,
}: {
  path: string
  text: string | object
  fontSize?: number
}) => {
  return (
    <LinkStyle to={path} fontSize={fontSize}>
      {text}
    </LinkStyle>
  )
}
