import React from "react"
import { Link } from "gatsby"

export const LinkEffect = ({ path = "/", text = "" }) => {
  return <Link to={path}>{text}</Link>
}
