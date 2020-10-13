import AniLink from "gatsby-plugin-transition-link/AniLink"
import React from "react"
import { Colors } from "./Colors"

export const LinkEffect = ({ path = "/", text = "" }) => {
  return (
    <AniLink cover direction="bottom" to={path} bg={Colors.buttonIconColor} duration={0.7}>
      {text}
    </AniLink>
  )
}
