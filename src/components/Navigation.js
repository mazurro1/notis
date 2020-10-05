import React, { useState, useRef, useEffect } from "react"
import { Colors } from "../common/Colors"
import { Industries } from "../common/Industries"
import ButtonIcon from "../components/ButtonIcon"
import ButtonTakeData from "../components/ButtonTakeData"
import styled from "styled-components"
import { FaUserPlus, FaUser, FaSearch, FaCalendarDay } from "react-icons/fa"
import { MdWork } from "react-icons/md"
import { useWindowSize } from "./UseWindowSize"
import { LinkEffect } from "../common/LinkEffect"
import { CSSTransition } from "react-transition-group"
import Popup from "./Popup"
import LoginContent from "./Login"
import RegisterContent from "./Register"
import Spinner from "./Spinner"
import SelectDataCalendar from "./SelectDataCalendar"
import TimePickerContent from "./TimePicker"
import FindPlaceContent from "./FindPlace"
import { useDispatch, useSelector } from "react-redux"

const WrapperNavigation = styled.div`
  position: sticky;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${Colors.navBackground};
  padding-top: 10px;
  padding-bottom: 10px;
`

const WrapperNavigationUnder = styled.div`
  position: relative;
  z-index: 90;
  /* top: ${props => props.topNavHeight + "px"}; */
  left: 0;
  right: 0;
  background-color: ${Colors.navDownBackground};
  padding-top: 20px;
  padding-bottom: 10px;
`

const NavigationDiv = styled.div`
  color: ${Colors.navText};
  max-width: 900px;
  margin: 0 auto;
`

const ButtonsNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
`

const NavigationItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  padding-left: 200px;
`

const ButtonNavStyle = styled.div`
  padding: 10px 0;
  padding-left: 10px;
`

const UnderMenuIndustries = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 10px;
  padding-bottom: 5px;
`

const LogoStyle = styled.div`
  position: absolute;
  left: 5%;
  a {
    font-size: 3.2rem;
    color: white;
  }
`

const AllInputs = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  padding: 10px 0px;
`
const PaddingRight = styled.div`
  padding-right: 10px;
  padding-bottom: 5px;
`

const PaddingContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding-left: 1%;
  padding-right: 1%;
  /* padding-top: ${props =>
    props.isMainPage ? props.bottomNavHeight + "px" : "0px"}; */

  margin-bottom: ${props =>
    props.isMainPage ? "-" + props.bottomNavHeight + "px" : "0px"};

  transition-property: padding-top, margin-bottom;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  transition-delay: 0.3s;
`

const Navigation = ({ children, isMainPage }) => {
  // const [topNavHeight, setTopNavHeight] = useState(0)
  // const [bottomNavHeight, setBottomNavHeight] = useState(0)
  const [popupLogin, setPopupLogin] = useState(false)
  const [popupRegister, setPopupRegister] = useState(false)
  const [popupTakeData, setPopupTakeData] = useState(false)
  const [popupTakePlace, setPopupTakePlace] = useState(false)
  const [isDataActive, setIsDataActive] = useState(true)
  const [isTimeActive, setIsTimeActive] = useState(false)
  const [selectedDate, setSelectedDate] = useState()
  const [selectedTime, setSelectedTime] = useState()
  const [selectedDateAndTime, setSelectedDateAndTime] = useState("")
  const [selectedName, setSelectedName] = useState("")

  const spinnerEnable = useSelector(state => state.spinnerEnable)

  // const topNavRef = useRef(null)
  // const bottomNavRef = useRef(null)
  // const size = useWindowSize()

  useEffect(() => {
    console.log("update")
  }, [selectedDateAndTime, selectedName])

  useEffect(() => {
    if (!!selectedDate && !!selectedTime && !!!popupTakeData) {
      const newDate = `${selectedTime} ${selectedDate.getDate()}.${
        selectedDate.getMonth() + 1
      }.${selectedDate.getFullYear()}`
      setSelectedDateAndTime(newDate)
    }
  }, [selectedDate, selectedTime, setSelectedDateAndTime, popupTakeData])

  // useEffect(() => {
  //   if (topNavRef.current) {
  //     setTopNavHeight(topNavRef.current.clientHeight)
  //   }
  // }, [topNavRef, size.width])

  // useEffect(() => {
  //   if (bottomNavRef.current) {
  //     setBottomNavHeight(bottomNavRef.current.clientHeight)
  //   }
  // }, [bottomNavRef, size.width])

  const handleClickLogin = () => {
    setPopupLogin(prevValue => !prevValue)
  }

  const handleClickRegister = () => {
    setPopupRegister(prevValue => !prevValue)
  }

  const handleClickTakeData = () => {
    setPopupTakeData(prevValue => !prevValue)
  }

  const handleResetTakeData = () => {
    setPopupTakeData(false)
    setIsTimeActive(false)
    setIsDataActive(false)
    setTimeout(() => {
      setIsDataActive(true)
    }, 400)
  }

  const handleClickTakePlace = () => {
    setPopupTakePlace(prevValue => !prevValue)
  }

  const mapIndustries = Industries.map((item, index) => {
    return (
      <PaddingRight key={index}>
        <ButtonIcon title={item} fontSize="16" buttonBgDark />
      </PaddingRight>
    )
  })

  const renderExtraPropsInMainMenu = (
    <CSSTransition
      in={isMainPage}
      timeout={400}
      classNames="menu"
      unmountOnExit
    >
      <WrapperNavigationUnder
      // topNavHeight={topNavHeight}
      // ref={bottomNavRef}
      >
        <NavigationDiv>
          <AllInputs>
            <ButtonTakeData
              setResetText={() => {
                setSelectedName("")
              }}
              resetTextEnable={!!selectedName}
              icon={<FaSearch />}
              text={
                !!selectedName ? selectedName : "Znajdz ulubione miejsce..."
              }
              onClick={handleClickTakePlace}
            />

            <ButtonTakeData
              icon={<FaCalendarDay />}
              setResetText={() => {
                setSelectedDateAndTime("")
              }}
              resetTextEnable={!!selectedDateAndTime}
              text={
                !!selectedDateAndTime
                  ? selectedDateAndTime
                  : "Wybierz dogodny termin..."
              }
              onClick={handleClickTakeData}
            />
          </AllInputs>
          <UnderMenuIndustries>{mapIndustries}</UnderMenuIndustries>
        </NavigationDiv>
      </WrapperNavigationUnder>
    </CSSTransition>
  )

  const PopupLogin = (
    <Popup
      popupEnable={popupLogin}
      handleClose={handleClickLogin}
      maxWidth="400"
    >
      <LoginContent />
    </Popup>
  )

  const PopupRegister = (
    <Popup
      popupEnable={popupRegister}
      handleClose={handleClickRegister}
      maxWidth="400"
    >
      <RegisterContent />
    </Popup>
  )

  const PopupTakeData = (
    <Popup
      popupEnable={popupTakeData}
      handleClose={handleResetTakeData}
      noContent
    >
      <CSSTransition
        in={isDataActive}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <SelectDataCalendar
          setActualCalendarDate={setSelectedDate}
          setIsDataActive={setIsDataActive}
          setIsTimeActive={setIsTimeActive}
        />
      </CSSTransition>
      <CSSTransition
        in={isTimeActive}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <TimePickerContent
          handleResetTakeData={handleResetTakeData}
          setSelectedTime={setSelectedTime}
        />
      </CSSTransition>
    </Popup>
  )

  const PopupTakePlace = (
    <Popup
      popupEnable={popupTakePlace}
      handleClose={handleClickTakePlace}
      maxWidth="600"
    >
      <FindPlaceContent
        handleClose={handleClickTakePlace}
        setSelectedName={setSelectedName}
      />
    </Popup>
  )

  return (
    <>
      <Spinner spinnerEnable={spinnerEnable} />
      {PopupLogin}
      {PopupRegister}
      {PopupTakeData}
      {PopupTakePlace}
      <WrapperNavigation
      // ref={topNavRef}
      >
        <NavigationDiv>
          <NavigationItems>
            <LogoStyle>
              <LinkEffect text="NOTISE" path="/" />
            </LogoStyle>
            <ButtonsNav>
              <ButtonNavStyle>
                <ButtonIcon
                  title="zarejestruj się"
                  uppercase
                  fontIconSize="35"
                  fontSize="16"
                  icon={<FaUserPlus />}
                  onClick={handleClickRegister}
                />
              </ButtonNavStyle>
              <ButtonNavStyle>
                <ButtonIcon
                  title="zaloguj się"
                  uppercase
                  fontIconSize="20"
                  fontSize="16"
                  icon={<FaUser />}
                  onClick={handleClickLogin}
                />
              </ButtonNavStyle>
              <ButtonNavStyle>
                <LinkEffect
                  path="/company"
                  text={
                    <ButtonIcon
                      title="dla firm"
                      uppercase
                      fontIconSize="25"
                      fontSize="16"
                      icon={<MdWork />}
                      secondColors
                    />
                  }
                />
              </ButtonNavStyle>
            </ButtonsNav>
          </NavigationItems>
        </NavigationDiv>
      </WrapperNavigation>
      {renderExtraPropsInMainMenu}
      <PaddingContent
        // bottomNavHeight={bottomNavHeight}
        isMainPage={isMainPage}
      >
        {children}
      </PaddingContent>
    </>
  )
}

export default Navigation
