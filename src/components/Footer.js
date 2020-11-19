import React from "react"
import { Colors } from "../common/Colors"
import styled from "styled-components"
import { Routes } from "../common/Routes"
import { FaFacebookSquare } from "react-icons/fa"
import { LinkEffect } from "../common/LinkEffect"
import { useSelector } from "react-redux"

const WrapperFooter = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${props => Colors(props.colorBlind).navBackground};
`

const FooterDiv = styled.div`
  color: ${props => Colors(props.colorBlind).navText};
  background-color: ${props => Colors(props.colorBlind).navBackground};
  max-width: 900px;
  margin: 0 auto;
  padding-bottom: 30px;
  padding-top: 30px;
`

const ReservedRights = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  text-align: center;
  font-size: 0.9rem;
  user-select: none;
  color: #bdbdbd;
`

const LinkRoutes = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  font-size: 0.9rem;

  a {
    padding: 10px;
    color: #bdbdbd;
    transition-property: color;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;

    &:hover {
      color: ${props => Colors(props.colorBlind).primaryColor};
    }
  }
`

const FacebookIcon = styled.div`
  text-align: center;

  a {
    font-size: 4rem;
    transition-property: color;
    transition-duration: 0.3s;
    transition-timing-function: ease;
    color: white;

    &:hover {
      color: ${props => Colors(props.colorBlind).primaryColor};
    }
  }
`

const Footer = () => {
  const colorBlind = useSelector(state => state.colorBlind)
  const mapRoutes = Routes.map((item, index) => {
    return <LinkEffect path={item.path} key={index} text={item.name} />
  })

  return (
    <WrapperFooter colorBlind={colorBlind}>
      <FooterDiv colorBlind={colorBlind}>
        <LinkRoutes colorBlind={colorBlind}>{mapRoutes}</LinkRoutes>
        <FacebookIcon colorBlind={colorBlind}>
          <a href="https://www.facebook.com/" target="__blank">
            <FaFacebookSquare />
          </a>
        </FacebookIcon>
        <ReservedRights>
          © 2020 Notise Wszystkie prawa zastrzeżone
        </ReservedRights>
      </FooterDiv>
    </WrapperFooter>
  )
}

export default Footer
