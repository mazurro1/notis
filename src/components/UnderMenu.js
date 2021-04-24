import React, { useEffect, useState, useRef } from "react"
import { CSSTransition } from "react-transition-group"
import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { Translates } from "../common/Translates"
import ButtonTakeData from "../components/ButtonTakeData"
import { AllIndustries } from "../common/AllIndustries"
import { Site } from "../common/Site"
import UseWindowSize from "../common/UseWindowSize"
import {
  changeIndustries,
  setHeightMenuIndustries,
  setVisibleMenuIndustries,
  changePopupTakePlace,
  changeSelectedNameMenu,
} from "../state/actions"
import ButtonIcon from "../components/ButtonIcon"
import { FaSearch } from "react-icons/fa"
import { MdExpandMore } from "react-icons/md"
import { Colors } from "../common/Colors"

const WrapperNavigationUnder = styled.div`
  position: absolute;
  z-index: 90;
  top: 70px;
  left: 0;
  right: 0;
  background-color: ${props => Colors(props.siteProps).navDownBackground};
  padding-top: 20px;
  padding-bottom: ${props =>
    props.active ? `${props.heightPadding + 80}px` : "10px"};
  height: 137px;
  overflow: hidden;
  /* opacity: ${props => (props.isMainPage ? "1" : "0")}; */
  transition-property: background-color, color, padding, opacity;
  transition-timing-function: ease;
  transition-duration: 0.3s;
`

const NavigationDiv = styled.div`
  color: ${props => Colors(props.siteProps).navText};
  max-width: 1200px;
  margin: 0 auto;
`

const UnderMenuIndustries = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  padding: 5px;
  padding-top: 10px;
  padding-bottom: 5px;
  overflow: hidden;
  padding-right: 160px;

  @media all and (max-width: ${Site.mobileSize + "px"}) {
    padding-top: 50px;
    padding-right: 5px;
  }
`

const ButtonShowMore = styled.div`
  position: absolute;
  top: 10px;
  right: 5px;

  @media all and (max-width: ${Site.mobileSize + "px"}) {
    position: absolute;
    top: 0;
    right: 5px;
    left: 5px;
    z-index: 10;
  }
`

const PaddingRight = styled.div`
  padding-right: 10px;
  padding-bottom: 5px;
`
const ButtonIconStyles = styled.div`
  padding: 4px 10px;
  padding-left: 10px;
  border-radius: 5px;
  background-color: ${props =>
    props.active
      ? Colors(props.siteProps).primaryColor
      : Colors(props.siteProps).darkColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  font-size: 15px;
  user-select: none;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    background-color: ${props => Colors(props.siteProps).primaryColorDark};
  }
`

const AllInputs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px 5px;
`

const UnderMenu = ({ isMainPage }) => {
  const [topNavVisibleMenu, setTopNavVisibleMenu] = useState(false)
  const siteProps = useSelector(state => state.siteProps)
  const visibleMenuIndustries = useSelector(
    state => state.visibleMenuIndustries
  )
  const heightMenuIndustries = useSelector(state => state.heightMenuIndustries)
  const userId = useSelector(state => state.userId)
  const industries = useSelector(state => state.industries)
  const selectedNameMenu = useSelector(state => state.selectedNameMenu)
  const refUnderMenuIndustries = useRef(null)

  const dispatch = useDispatch()

  useEffect(() => {
    if (isMainPage) {
      setTopNavVisibleMenu(true)
    } else {
      setTopNavVisibleMenu(false)
    }
  }, [isMainPage])

  useEffect(() => {
    if (!!refUnderMenuIndustries) {
      if (!!refUnderMenuIndustries.current) {
        dispatch(
          setHeightMenuIndustries(refUnderMenuIndustries.current.offsetHeight)
        )
      }
    }
  }, [refUnderMenuIndustries, userId, visibleMenuIndustries])

  const handleChangeIndustries = item => {
    dispatch(changeIndustries(item))
  }

  const handleClickMenuIndustries = () => {
    dispatch(setVisibleMenuIndustries(!visibleMenuIndustries))
  }

  const handleClickTakePlace = () => {
    dispatch(changePopupTakePlace(true))
  }

  const mapIndustries = AllIndustries[siteProps.language].map((item, index) => {
    const isIndustriesActive = industries === item.value
    return (
      <PaddingRight key={index}>
        <ButtonIconStyles
          active={isIndustriesActive}
          siteProps={siteProps}
          onClick={() => handleChangeIndustries(item.value)}
        >
          {item.label}
        </ButtonIconStyles>
      </PaddingRight>
    )
  })
  const size = UseWindowSize()
  const isMobileSize = Site.mobileSize >= size.width

  return (
    <div>
      <CSSTransition
        in={isMainPage}
        timeout={400}
        classNames="opacitySpinner"
        unmountOnExit
      >
        <WrapperNavigationUnder
          siteProps={siteProps}
          active={visibleMenuIndustries}
          isMainPage={isMainPage}
          heightPadding={heightMenuIndustries}
          topNavVisibleMenu={topNavVisibleMenu}
        >
          <NavigationDiv>
            <AllInputs>
              <ButtonTakeData
                setResetText={() => {
                  dispatch(changeSelectedNameMenu(""))
                }}
                resetTextEnable={!!selectedNameMenu}
                icon={<FaSearch />}
                text={
                  !!selectedNameMenu
                    ? selectedNameMenu
                    : "Znajdz ulubione miejsce..."
                }
                onClick={handleClickTakePlace}
              />
            </AllInputs>
            <UnderMenuIndustries ref={refUnderMenuIndustries}>
              <PaddingRight>
                <ButtonIconStyles
                  active={industries === null}
                  siteProps={siteProps}
                  onClick={() => handleChangeIndustries(null)}
                >
                  {Translates[siteProps.language].buttons.all}
                </ButtonIconStyles>
              </PaddingRight>
              {mapIndustries}
              <ButtonShowMore>
                <ButtonIcon
                  title={
                    isMobileSize
                      ? "Wybierz specializacje"
                      : visibleMenuIndustries
                      ? "Pokaż mniej"
                      : "Pokaż więcej"
                  }
                  uppercase
                  fontIconSize="20"
                  fontSize="15"
                  icon={<MdExpandMore />}
                  onClick={handleClickMenuIndustries}
                />
              </ButtonShowMore>
            </UnderMenuIndustries>
          </NavigationDiv>
        </WrapperNavigationUnder>
      </CSSTransition>
    </div>
  )
}
export default UnderMenu
