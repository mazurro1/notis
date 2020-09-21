import React from "react"
import { Colors } from "../common/Colors"
import styled from "styled-components"

const WrapperNavigation = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${Colors.navBackground};
`

const NavigationDiv = styled.div`
  display: flex;
  color: ${Colors.navText};
  background-color: ${Colors.navBackground};
  height: 70px;
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

const Navigation = () => {
  return (
    <WrapperNavigation>
      <NavigationDiv>
        <div>NOTIS</div>
        <ButtonStyles>Navigation</ButtonStyles>
      </NavigationDiv>
    </WrapperNavigation>
  )
}

export default Navigation
