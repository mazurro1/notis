import React from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import { MdKeyboardArrowUp, MdChevronLeft } from "react-icons/md"
import { navigate } from "gatsby"
import { Site } from "../common/Site"

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
  padding-top: ${props =>
    props.topNavVisibleMenu
      ? props.active
        ? `${props.heightMenuIndustries + 170}px`
        : "207px"
      : "70px"};
  transition-property: padding-top;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`
const MinHeightContent = styled.div`
  min-height: ${props =>
    props.isMainPage ? "calc(100vh - 70px - 137px)" : "calc(100vh - 70px)"};
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
  const heightMenuIndustries = useSelector(state => state.heightMenuIndustries)
  const visibleMenuIndustries = useSelector(
    state => state.visibleMenuIndustries
  )

  const handleClickScroll = () => {
    window.scrollTo(0, 0)
  }

  const handleHistoryGoBack = () => {
    navigate(-1)
  }

  return (
    <BackgroundColorPage siteProps={siteProps}>
      <PaddingContent
        topNavVisibleMenu={isMainPage}
        heightMenuIndustries={
          !!heightMenuIndustries
            ? heightMenuIndustries < 100
              ? 170
              : heightMenuIndustries
            : 170
        }
        active={visibleMenuIndustries}
      >
        <MinHeightContent isMainPage={isMainPage}>{children}</MinHeightContent>
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
