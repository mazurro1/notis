import React from "react"
import styled from "styled-components"
import { HiEmojiSad } from "react-icons/hi"
import { Colors } from "@common/Colors"
import { useSelector } from "react-redux"

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
  opacity: ${props => (props.active ? "1" : "0")};
  transition-property: opacity;
  transition-timing-function: ease-out;
  transition-duration: 0.3s;

  span {
    color: ${props => Colors(props.siteProps).primaryColor};
    font-size: 6rem;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`

const CompanyPriv = ({ active }) => {
  const siteProps = useSelector(state => state.siteProps)
  const errorLoadingPage = useSelector(state => state.errorLoadingPage)
  return (
    <BodyDiv>
      <TextWarning siteProps={siteProps} active={errorLoadingPage || active}>
        Coś poszło nie tak
        <span>
          <HiEmojiSad />
        </span>
      </TextWarning>
    </BodyDiv>
  )
}
export default CompanyPriv
