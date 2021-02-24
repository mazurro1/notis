import React from "react"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import { MdKeyboardArrowUp } from "react-icons/md"

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
        ? `${props.heightPadding + 170}px`
        : "207px"
      : "70px"};
  transition-property: padding-top;
  transition-duration: 0.3s;
  transition-timing-function: linear;
  transition-delay: 0;
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
`

const ElementsPages = ({ isMainPage, children }) => {
  const siteProps = useSelector(state => state.siteProps)

  const handleClickScroll = () => {
    window.scrollTo(0, 0)
  }

  return (
    <BackgroundColorPage siteProps={siteProps}>
      <PaddingContent topNavVisibleMenu={false} heightPadding={0} active={true}>
        <MinHeightContent isMainPage={isMainPage}>{children}</MinHeightContent>
      </PaddingContent>
      <ScrollUp siteProps={siteProps} onClick={handleClickScroll}>
        <MdKeyboardArrowUp />
      </ScrollUp>
    </BackgroundColorPage>
  )
}
export default ElementsPages
