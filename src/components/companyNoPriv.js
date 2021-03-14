import React from "react"
import "../../style.css"
import { HiEmojiSad } from "react-icons/hi"
import { Colors } from "../common/Colors"
import { useSelector } from "react-redux"
import styled from "styled-components"

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

const CompanyNoPriv = ({ active }) => {
  const siteProps = useSelector(state => state.siteProps)
  const errorLoadingPage = useSelector(state => state.errorLoadingPage)
  const user = useSelector(state => state.user)
  return (
    <BodyDiv>
      <TextWarning
        siteProps={siteProps}
        active={errorLoadingPage || !!!user || active}
      >
        Musisz się najpierw zalogować
        <span>
          <HiEmojiSad />
        </span>
      </TextWarning>
    </BodyDiv>
  )
}
export default CompanyNoPriv
