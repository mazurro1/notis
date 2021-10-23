import React, { useEffect } from "react"
import "../../style.css"
import styled from "styled-components"
import { HiEmojiSad } from "react-icons/hi"
import { Colors } from "@common/Colors"
import { useSelector } from "react-redux"
import sal from "sal.js"

const BodyDiv = styled.div``

const TextWarning = styled.div`
  margin-top: 60px;
  font-size: 1.6rem;
  color: ${props => Colors(props.siteProps).textNormalBlack};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: "Poppins-Bold", sans-serif;

  span {
    color: ${props => Colors(props.siteProps).primaryColor};
    font-size: 6rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`

const ErrorPage = () => {
  const siteProps = useSelector(state => state.siteProps)
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
      <TextWarning siteProps={siteProps}>
        Coś poszło nie tak
        <span>
          <HiEmojiSad />
        </span>
      </TextWarning>
    </BodyDiv>
  )
}
export default ErrorPage
