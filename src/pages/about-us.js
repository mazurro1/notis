import React, { useEffect } from "react"
import "../../style.css"
import styled from "styled-components"
import sal from "sal.js"

const BodyDiv = styled.div``

const AboutUsPage = () => {
  useEffect(() => {
    sal({
      threshold: 0.1,
      once: true,
    })
  }, [])
  return (
    <BodyDiv
      data-sal="fade"
      data-sal-duration="800"
      data-sal-easing="ease-out-bounce"
    >
      o nas
    </BodyDiv>
  )
}
export default AboutUsPage
