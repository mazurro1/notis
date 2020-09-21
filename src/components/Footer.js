import React from "react"
import { Colors } from "../common/Colors"
import styled from "styled-components"

const WrapperFooter = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${Colors.navBackground};
`

const FooterDiv = styled.div`
  display: flex;
  color: ${Colors.navText};
  background-color: ${Colors.navBackground};
  height: 50px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 900px;
  margin: 0 auto;
`

const ButtonStyles = styled.button`
  background-color: white;
  padding: 5px 10px;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
`

const Footer = () => {
  return (
    <WrapperFooter>
      <FooterDiv>
        <div>Footer</div>
        <ButtonStyles>Footer</ButtonStyles>
      </FooterDiv>
    </WrapperFooter>
  )
}

export default Footer
