import React from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { Colors } from "@common/Colors"
import { MdKeyboardArrowUp, MdChevronLeft } from "react-icons/md"
import { navigate } from "gatsby"
import { Site } from "@common/Site"

const BackgroundColorPage = styled.div`
  position: relative;
  background-color: ${props => Colors(props.siteProps).backgroundColorPage};
  transition-property: background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const PaddingContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 1%;
  padding-right: 1%;
`
const MinHeightContent = styled.div`
  padding: 0;
  margin: 0;
  padding-top: ${props => (props.topNavVisibleMenu ? "0px" : "70px")};
  min-height: ${props =>
    props.isMainPage ? "calc(100vh - 70px - 137px)" : "calc(100vh - 70px)"};
  transition-property: padding;
  transition-duration: 0.1s;
  transition-timing-function: ease;
`

const ScrollUp = styled.div`
  position: fixed;
  z-index: 20;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props => Colors(props.siteProps).primaryColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 2.4rem;
  cursor: pointer;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
  transition-property: background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: linear;

  &:hover {
    background-color: ${props => Colors(props.siteProps).primaryColorDark};
  }

  @media all and (max-width: ${Site.mobileSize + "px"}) {
    bottom: 10px;
    width: 50px;
    height: 50px;
  }
`

const ScrollGoBack = styled.div`
  position: fixed;
  z-index: 20;
  bottom: 10px;
  left: 20px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: ${props => Colors(props.siteProps).primaryColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 2.4rem;
  cursor: pointer;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
  transition-property: background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: linear;

  &:hover {
    background-color: ${props => Colors(props.siteProps).primaryColorDark};
  }

  @media all and (min-width: ${Site.mobileSize + "px"}) {
    display: none;
  }

  @media all and (max-width: ${Site.mobileSize + "px"}) {
    bottom: 10px;
    width: 50px;
    height: 50px;
  }
`

const ElementsPages = ({ isMainPage, children }) => {
  const siteProps = useSelector(state => state.siteProps)

  const handleClickScroll = () => {
    window.scrollTo(0, 0)
  }

  const handleHistoryGoBack = () => {
    navigate(-1)
  }

  return (
    <BackgroundColorPage siteProps={siteProps}>
      <PaddingContent>
        <MinHeightContent
          topNavVisibleMenu={isMainPage}
          isMainPage={isMainPage}
        >
          {children}
        </MinHeightContent>
      </PaddingContent>
      <ScrollUp siteProps={siteProps} onClick={handleClickScroll}>
        <MdKeyboardArrowUp />
      </ScrollUp>
      <ScrollGoBack siteProps={siteProps} onClick={handleHistoryGoBack}>
        <MdChevronLeft />
      </ScrollGoBack>
    </BackgroundColorPage>
  )
}
export default ElementsPages
