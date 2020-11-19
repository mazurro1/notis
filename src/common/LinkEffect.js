import AniLink from "gatsby-plugin-transition-link/AniLink"
import React from "react"
import { Colors } from "./Colors"
import { useSelector } from "react-redux"

export const LinkEffect = ({ path = "/", text = "" }) => {
  const colorBlind = useSelector(state => state.colorBlind)
  return (
    <AniLink
      cover
      direction="bottom"
      to={path}
      bg={Colors(colorBlind).primaryColor}
      duration={0.7}
    >
      {text}
    </AniLink>
  )
}
