import React from "react"
import styled from "styled-components"
import BackgroundImage from "gatsby-background-image"
const BackgroundImageCustom = ({
  img,
  className,
  children,
  gradient = true,
}) => {
  return (
    <BackgroundImage className={className} fluid={img} gradient={gradient}>
      {children}
    </BackgroundImage>
  )
}

export default styled(BackgroundImageCustom)`
  min-height: 200px;
  background: ${props =>
    props.gradient
      ? "linear-gradient(rgba(63, 208, 212, 0.7), rgba(0, 0, 0, 0.7))"
      : "none"};
  background-position: center;
  background-size: cover;
  opacity: 1 !important;
  display: flex;
  justify-content: center;
  align-items: center;
`
