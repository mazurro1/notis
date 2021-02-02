import React, { useState, useEffect } from "react"
import { Colors } from "../common/Colors"
import { AllIndustries } from "../common/AllIndustries"
import ButtonIcon from "../components/ButtonIcon"
import ButtonTakeData from "../components/ButtonTakeData"
import styled from "styled-components"
import {
  FaUserPlus,
  FaUser,
  FaSearch,
  FaCalendarDay,
  FaShoppingBag,
  FaBars,
  FaChrome,
  FaCalendarAlt,
  FaBox,
  FaUsers,
} from "react-icons/fa"
import { MdWork, MdPowerSettingsNew, MdTimelapse, MdClose } from "react-icons/md"
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
import "react-input-checkbox/lib/react-input-checkbox.min.css"
import {
  changeSortVisible,
  changeFilterVisible,
  changeLocaliaztionVisible,
  changeIndustries,
  changeLoginVisible,
  changeRegistrationVisible,
  fetchAutoLogin,
  logout,
  changeUserProfilVisible,
  changeRemindPasswordVisible,
  changeCreateCompanyVisible,
  changeReserwationValue,
  changeEditWorkerHours,
  changeEditEmployeeWorkingHours,
  changeBlindStyle,
  changeDarkStyle,
  fetchAllCompanys,
  fetchAllCompanysOfType,
  changeLanguageStyle,
  addNewUserAlert,
} from "../state/actions"
import Sort from "./Sort"
import Filter from "./Filter"
import Localization from "./Localization"
import Alerts from "./Alerts"
import ActiveAccount from "./ActiveAccount"
import UserProfil from "./UserProfil"
import RemindPassword from "./RemindPassword"
import CreateCompany from "./CreateCompany"
import Reserwation from "./Reserwation"
import WorkerReserwations from "./WorkerReserwations"
import Switch from "react-switch"
import UserHistory from "./UserHistory"
import Footer from './Footer'
import {Translates} from '../common/Translates'
import BellAlerts from "./BellAlerts"
import openSocket from "socket.io-client"
import {Site} from '../common/Site'
import WorkerHoursAutoSave from "./WorkerHoursAutoSave"
import EmployeeWorkingHours from "./EmployeeWorkingHours"
import WorkerUsersInformation from "./WorkerUsersInformation"
import AlertExtra from "./AlertExtra"

const MarginButtonsWork = styled.div`
  margin-top: 10px;
`

const SpanSwitch = styled.span`
  font-size: 0.8rem;
  position: absolute;
  top: 10px;
  left: 10px;
  right: 0;
  color: ${props => Colors(props.siteProps).textNormalBlack};
`

const LabelStyle = styled.div`
  text-align: center;
  padding-top: 20px;
`

const ButtonNavStyle = styled.div`
  position: relative;
  padding: 10px 5px;
  min-width: 140px;
  user-select: none;
`

const WidthTimePicker = styled.div`
  background-color: transparent;
  min-width: 280px;
  max-width: 90%;
`

const BackgroundColorPage = styled.div`
  background-color: ${props => Colors(props.siteProps).backgroundColorPage};
  transition-property: background-color, color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const WrapperNavigation = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  right: 0;
  background-color: ${props => Colors(props.siteProps).navBackground};
  padding-top: 10px;
  padding-bottom: 10px;
  height: 70px;
`

const WrapperNavigationUnder = styled.div`
  position: absolute;
  z-index: 90;
  top: 70px;
  left: 0;
  right: 0;
  background-color: ${props => Colors(props.siteProps).navDownBackground};
  padding-top: 20px;
  padding-bottom: 10px;
  height: 152px;
  overflow: hidden;
`

const NavigationDiv = styled.div`
  color: ${props => Colors(props.siteProps).navText};
  max-width: 1200px;
  margin: 0 auto;
`

const ButtonsNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  @media all and (max-width: ${props => props.isUser ? "1200px" : "800px"}) {
    display: none;
  }
`

const NavigationItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  padding-left: 200px;
`

const UnderMenuIndustries = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  padding-top: 10px;
  padding-bottom: 5px;
  overflow-y: auto;
  height: 58px;
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
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 1%;
  padding-right: 1%;
  padding-top: ${props => (props.topNavVisibleMenu ? "222px" : "70px")};
  transition-property: padding-top, margin-bottom;
  transition-duration: 0.3s;
  transition-timing-function: inline;
  transition-delay: ${props => (props.topNavVisibleMenu ? "0" : "0.195s")};
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

const MenuPosition = styled.div`
  position: fixed;
  z-index: 2000;
  top: 0;
  bottom: 0;
  left: 0px;
  width: 300px;
  max-width: 100vw;
  background-color: ${props => Colors(props.siteProps).menuColor};
  transform: ${props =>
    props.active ? "translateX(0px)" : "translateX(-100%)"};
  transition-property: transform;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const ContentMenu = styled.div`
  position: relative;
  /* transform: ${props =>
    props.active
      ? "translate(20%, -15%) scale(0.6) rotateY(-50deg) rotateX(-15deg) rotateZ(17deg);"
      : ""}; */
  box-shadow: 0 0 40px 1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition-property: transform, padding-left;
  transition-duration: 0.5s;
  transition-timing-function: ease;
`

const BurgerButton = styled.div`
  height: 50px;
  width: 50px;
  background-color: transparent;
  cursor: pointer;
  margin-left: 10px;
  margin-right: 10px;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  transition-property: background-color;
  transition-duration: 0.5s;
  transition-timing-function: ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`

const LeftMenuStyle = styled.div`
  padding: 10px;
  padding-top: 60px;
`

const IconCloseStyle = styled.div`
  cursor: pointer;
  font-size: 1.5rem;
  padding: 10px;
  padding-bottom: 0px;
  color: ${props => Colors(props.siteProps).textNormalBlack};
  transition-property: transform;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    transform: scale(1.4);
  }
`

const MinHeightContent = styled.div`
  min-height: ${props =>
    props.isMainPage
      ? "calc(100vh - 70px - 152px)"
      : "calc(100vh - 70px)"};
`

const CloseMenuLeft = styled.div`
  position: absolute;
  top: 10px;
  right: 15px;
`

const PositionPl = styled.div`
  text-align: right;
  padding-right: 7px;
  color: ${props => Colors(props.siteProps).textNormalWhite};
`

const PositionEn = styled.div`
  text-align: left;
  padding-left: 7px;
  color: ${props => Colors(props.siteProps).textNormalWhite};
`

const Navigation = ({ children, isMainPage }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [workerReserwationsVisible, setWorkerReserwationsVisible] = useState(false)
  const [workerUsersInformationVisible, setWorkerUsersInformationVisible] = useState(false)
  const [historyReserwations, setHistoryReserwations] = useState(false)
  const [workPropsVisible, setWorkPropsVisible] = useState(false)
  const [popupTakeData, setPopupTakeData] = useState(false)
  const [popupTakePlace, setPopupTakePlace] = useState(false)
  const [isDataActive, setIsDataActive] = useState(true)
  const [isTimeActive, setIsTimeActive] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [selectedDateAndTime, setSelectedDateAndTime] = useState("")
  const [selectedName, setSelectedName] = useState("")
  const [topNavVisible, setTopNavVisible] = useState(false)
  const [topNavVisibleMenu, setTopNavVisibleMenu] = useState(false)
  const [emplyeeWorkingHoursVisible, setEmplyeeWorkingHoursVisible] = useState(false)

  const siteProps = useSelector(state => state.siteProps)
  const editWorkerHours = useSelector(state => state.editWorkerHours)
  const editEmplyeeWorkingHours = useSelector(state => state.editEmplyeeWorkingHours)
  const editWorkerHoursData = useSelector(state => state.editWorkerHoursData)
  const createCompanyVisible = useSelector(state => state.createCompanyVisible)
  const registrationVisible = useSelector(state => state.registrationVisible)
  const loginVisible = useSelector(state => state.loginVisible)
  const spinnerEnable = useSelector(state => state.spinnerEnable)
  const sortVisible = useSelector(state => state.sortVisible)
  const filterVisible = useSelector(state => state.filterVisible)
  const localizationVisible = useSelector(state => state.localizationVisible)
  const sorts = useSelector(state => state.sorts)
  const filters = useSelector(state => state.filters)
  const localization = useSelector(state => state.localization)
  const industries = useSelector(state => state.industries)
  const page = useSelector(state => state.page)
  const user = useSelector(state => state.user)
  const userId = useSelector(state => state.userId)
  const reserwationEnable = useSelector(state => state.reserwationEnable)
  const reserwationData = useSelector(state => state.reserwationData)
  const userProfilVisible = useSelector(state => state.userProfilVisible)
  const remindPasswordVisible = useSelector(
    state => state.remindPasswordVisible
  )
  const dispatch = useDispatch()
  
  useEffect(() => {
    if (!!userId) {
      const socket = openSocket(Site.serverUrl)
      socket.on(`user${userId}`, data => {
        if (data.action === "update-alerts") {
          dispatch(addNewUserAlert(data.alertData))
        }
      })
    }
  }, [userId])

  useEffect(() => {
    if (!!!user) {
      dispatch(fetchAutoLogin())
    }
  }, [dispatch, user])

  useEffect(() => {
    if (isMainPage) {
      setTimeout(() => {
        setTopNavVisible(true)
        setTimeout(() => {
          setTopNavVisibleMenu(true)
        }, 100)
      }, 200)
    } else {
      setTimeout(() => {
        setTopNavVisible(false)
        setTimeout(() => {
          setTopNavVisibleMenu(false)
        }, 200)
      }, 200)
    }
  }, [isMainPage])

  useEffect(() => {
    if (!!industries || industries === 0) {
      dispatch(fetchAllCompanysOfType(page, industries))
    } else {
      dispatch(fetchAllCompanys(page))
    }
  }, [
    selectedDateAndTime,
    selectedName,
    sorts,
    filters,
    localization,
    page,
    industries,
  ])

  useEffect(() => {
    if (!!selectedDate && !!selectedTime && !!!popupTakeData) {
      const newDate = `${selectedTime} ${selectedDate.getDate()}.${
        selectedDate.getMonth() + 1
      }.${selectedDate.getFullYear()}`
      setSelectedDateAndTime(newDate)
    }
  }, [selectedDate, selectedTime, setSelectedDateAndTime, popupTakeData])

  const handleClickLogin = () => {
    dispatch(changeLoginVisible(!loginVisible))
  }

  const handleClickRegister = () => {
    dispatch(changeRegistrationVisible(!registrationVisible))
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

  const handleEmplyeeWorkingHoursVisible = () => {
    setEmplyeeWorkingHoursVisible(prevState => !prevState)
    setWorkPropsVisible(prevState => !prevState)
  }

  const handleClickTakePlace = () => {
    setPopupTakePlace(prevValue => !prevValue)
  }

  const handleChangeIndustries = item => {
    dispatch(changeIndustries(item))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const handleUserProfil = () => {
    dispatch(changeUserProfilVisible(!userProfilVisible))
  }

  const handleCloseRemindPassword = () => {
    dispatch(changeRemindPasswordVisible(!remindPasswordVisible))
    dispatch(changeLoginVisible(!loginVisible))
  }

  const handleCreateCompany = () => {
    dispatch(changeCreateCompanyVisible(!createCompanyVisible))
  }

  const handleCloseReserwation = () => {
    dispatch(changeReserwationValue(null))
  }

  const handleBlindStyleClick = () => {
    dispatch(changeBlindStyle())
  }

  const handleDarkStyleClick = () => {
    dispatch(changeDarkStyle())
  }

  const handleHistoryReserwations = () => {
    setHistoryReserwations(prevState => !prevState)
  }

  const handleClickWork = () => {
    setWorkPropsVisible(prevState => !prevState)
  }

   const handleMenuOpen = () => {
     setMenuOpen(prevState => !prevState)
   }

   const handleCloseMenu = () => {
     setMenuOpen(false)
   }

   const handleWorkerReserwations = () => {
    setWorkPropsVisible(false)
    setWorkerReserwationsVisible(true)
   }

   const handleWorkerUsersInformation = () => {
    setWorkPropsVisible(false)
    setWorkerUsersInformationVisible(true)
   }

   const handleCloseWorkerUsersInformation = () => {
     setWorkerUsersInformationVisible(false)
     setWorkPropsVisible(true)
   }

   const handleCloseWorkerReserwations = () => {
    setWorkerReserwationsVisible(false)
    setWorkPropsVisible(true)
   }

   const handleChangeLanguage = () => {
     const languageSelected = siteProps.language === "PL" ? "EN" : "PL"
     dispatch(changeLanguageStyle(languageSelected))
   }

   const handleClickAdminPanel = () => {
     setWorkPropsVisible(false)
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

  const renderExtraPropsInMainMenu = topNavVisible && (
    <CSSTransition
      in={topNavVisibleMenu}
      timeout={400}
      classNames="popup3"
      unmountOnExit
    >
      <WrapperNavigationUnder siteProps={siteProps}>
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
          <UnderMenuIndustries>
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
          </UnderMenuIndustries>
        </NavigationDiv>
      </WrapperNavigationUnder>
    </CSSTransition>
  )

    

      const PopupWorkersReserwations = (
        <Popup
          popupEnable={workerReserwationsVisible}
          handleClose={handleCloseWorkerReserwations}
          noContent
          calendar
        >
          <WorkerReserwations handleClose={handleCloseWorkerReserwations} />
        </Popup>
      )

      const PopupWorkersUsersInformations = (
        <Popup
          popupEnable={workerUsersInformationVisible}
          handleClose={handleCloseWorkerUsersInformation}
          title="Klienci"
          fullScreen
        >
          <WorkerUsersInformation
            handleClose={handleCloseWorkerUsersInformation}
            user={user}
            siteProps={siteProps}
          />
        </Popup>
      )


  const PopupWorkerEditHours = (
    <Popup
      popupEnable={editWorkerHours}
      handleClose={() => dispatch(changeEditWorkerHours(false, null))}
      noContent
      calendar
    >
      <WorkerHoursAutoSave
        item={editWorkerHoursData}
        editWorkerHours={editWorkerHours}
        handleClose={() => dispatch(changeEditWorkerHours(false, null))}
      />
    </Popup>
  )

  const PopupEmployeeWorkingHours = (
    <Popup
      popupEnable={emplyeeWorkingHoursVisible}
      handleClose={handleEmplyeeWorkingHoursVisible}
      noContent
      calendar
    >
      <EmployeeWorkingHours
        item={editWorkerHoursData}
        editWorkerHours={editWorkerHours}
        handleClose={handleEmplyeeWorkingHoursVisible}
      />
    </Popup>
  )

  const PopupSort = (
    <Popup
      popupEnable={sortVisible}
      handleClose={() => dispatch(changeSortVisible())}
      noContent
    >
      <Sort />
    </Popup>
  )

  const PopupFilter = (
    <Popup
      popupEnable={filterVisible}
      handleClose={() => dispatch(changeFilterVisible())}
      noContent
    >
      <Filter />
    </Popup>
  )

  const PopupLocalization = (
    <Popup
      popupEnable={localizationVisible}
      handleClose={() => dispatch(changeLocaliaztionVisible())}
      noContent
    >
      <Localization />
    </Popup>
  )

  const PopupLogin = (
    <Popup
      popupEnable={loginVisible}
      handleClose={handleClickLogin}
      maxWidth="400"
      title="Logowanie"
    >
      <LoginContent />
    </Popup>
  )

  const PopupRemindPassword = (
    <Popup
      popupEnable={remindPasswordVisible}
      handleClose={handleCloseRemindPassword}
      maxWidth="400"
      title="Przypomnij hasło"
    >
      <RemindPassword />
    </Popup>
  )

  const PopupRegister = (
    <Popup
      popupEnable={registrationVisible}
      handleClose={handleClickRegister}
      maxWidth="400"
      title="Rejestracja"
    >
      <RegisterContent />
    </Popup>
  )

  const PopupCreateCompany = (
    <Popup popupEnable={createCompanyVisible} handleClose={handleCreateCompany} title="Stwórz konto firmowe">
      <CreateCompany />
    </Popup>
  )

  const PopupHistoryReserwations = (
    <Popup
      popupEnable={historyReserwations}
      handleClose={handleHistoryReserwations}
      maxWidth="400"
      title={Translates[siteProps.language].buttons.bookingHistory}
      fullScreen
      maxWidth="800"
    >
      <UserHistory siteProps={siteProps} user={user} />
    </Popup>
  )

  const PopupReserwation = (
    <Popup
      popupEnable={reserwationEnable}
      handleClose={handleCloseReserwation}
      noContent
    >
      <Reserwation
        reserwationData={reserwationData}
        reserwationEnable={reserwationEnable}
        handleCloseReserwation={handleCloseReserwation}
      />
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
        <WidthTimePicker>
          <TimePickerContent
            handleResetTakeData={handleResetTakeData}
            setSelectedTime={setSelectedTime}
          />
        </WidthTimePicker>
      </CSSTransition>
    </Popup>
  )

  const PopupTakePlace = (
    <Popup
      popupEnable={popupTakePlace}
      handleClose={handleClickTakePlace}
      maxWidth="500"
      title="Znajdz ulubione miejsce"
    >
      <FindPlaceContent
        handleClose={handleClickTakePlace}
        setSelectedName={setSelectedName}
        selectedName={selectedName}
      />
    </Popup>
  )

  const PopupActiveAccount = (
    <Popup
      popupEnable={!!user ? !user.accountVerified : false}
      maxWidth="500"
      noContent
    >
      <ActiveAccount />
    </Popup>
  )

  const PopupUserProfil = (
    <Popup
      popupEnable={userProfilVisible}
      handleClose={handleUserProfil}
      title="Dane użytkownika"
    >
      <UserProfil />
    </Popup>
  )

  console.log(user)
  let workerHasAccessButton = false;
  let workerHasAccessClientsOpinions = false
  let workerHasAccessAvailability = false
  let hasCompany = false
  if(!!user){
    if(user.hasCompany){
      const selectWorker = user.company.workers.find(
        worker => worker.user === user.userId
      )
      workerHasAccessClientsOpinions = user.company.owner === user.userId;
      workerHasAccessAvailability = user.company.owner === user.userId
      hasCompany = true
      if (!!selectWorker) {
        const hasPermission = selectWorker.permissions.some(
          perm => perm === 2 || perm === 3 || perm === 4
        )
        if (hasPermission) {
          workerHasAccessButton = true
        }

        if(!workerHasAccessClientsOpinions){
          const hasPermissionClientsOpinion = selectWorker.permissions.some(
            perm => perm === 6
          )
          if (hasPermissionClientsOpinion) {
            workerHasAccessClientsOpinions = true
          }
        }

        if (!workerHasAccessAvailability) {
          const hasPermissionClientsOpinion = selectWorker.permissions.some(
            perm => perm === 1
          )
          if (hasPermissionClientsOpinion) {
            workerHasAccessAvailability = true
          }
        }
        }
      }
    }
  
  const PopupWorkerPropsVisible = (
    <Popup
      popupEnable={workPropsVisible}
      handleClose={handleClickWork}
      title={Translates[siteProps.language].buttons.work}
      maxWidth="300"
    >
      <div>
        {hasCompany && (
          <div onClick={handleClickAdminPanel}>
            <LinkEffect
              path="/company-profil"
              text={
                <ButtonIcon
                  title="Panel administracyjny"
                  uppercase
                  fontIconSize="20"
                  fontSize="16"
                  icon={<FaChrome />}
                  secondColors
                />
              }
            />
          </div>
          // </ButtonNavStyle>
        )}
        <MarginButtonsWork>
          <ButtonIcon
            title="Grafik pracy"
            uppercase
            fontIconSize="25"
            fontSize="16"
            icon={<MdTimelapse />}
            onClick={handleEmplyeeWorkingHoursVisible}
          />
        </MarginButtonsWork>
        {workerHasAccessClientsOpinions && (
          <MarginButtonsWork>
            <ButtonIcon
              title="Klienci"
              uppercase
              fontIconSize="25"
              fontSize="16"
              icon={<FaUsers />}
              onClick={handleWorkerUsersInformation}
            />
          </MarginButtonsWork>
        )}
        <MarginButtonsWork>
          <ButtonIcon
            title="Rezerwacje"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<FaCalendarAlt />}
            onClick={handleWorkerReserwations}
          />
        </MarginButtonsWork>
        {workerHasAccessAvailability && (
          <MarginButtonsWork>
            <ButtonIcon
              title="Stan magazynowy"
              uppercase
              fontIconSize="20"
              fontSize="16"
              icon={<FaBox />}
              // onClick={handleClickWork}
            />
          </MarginButtonsWork>
        )}
      </div>
    </Popup>
  )

    const renderCompanyOrCreateCompany =
      !!user && user.hasCompany ? (
        user.company.owner === user.userId || workerHasAccessButton ? (
          <>
            <ButtonNavStyle>
              <ButtonIcon
                title={Translates[siteProps.language].buttons.work}
                uppercase
                fontIconSize="25"
                fontSize="16"
                icon={<MdWork />}
                onClick={handleClickWork}
              />
            </ButtonNavStyle>
          </>
        ) : (
          <ButtonNavStyle>
            <ButtonIcon
              title={Translates[siteProps.language].buttons.work}
              uppercase
              fontIconSize="25"
              fontSize="16"
              icon={<MdWork />}
              onClick={handleClickWork}
            />
          </ButtonNavStyle>
        )
      ) : (
        <ButtonNavStyle>
          <LinkEffect
            path="/your-company"
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
      )

  const renderButtonsUp = !!user ? (
    <>
      <ButtonNavStyle>
        <ButtonIcon
          title={Translates[siteProps.language].buttons.bookingHistory}
          uppercase
          fontIconSize="20"
          fontSize="16"
          icon={<FaShoppingBag />}
          onClick={handleHistoryReserwations}
        />
      </ButtonNavStyle>
      <ButtonNavStyle>
        <ButtonIcon
          title={`${user.userName} ${user.userSurname}`}
          uppercase
          fontIconSize="20"
          fontSize="16"
          icon={<FaUser />}
          onClick={handleUserProfil}
        />
      </ButtonNavStyle>
      <ButtonNavStyle>
        <ButtonIcon
          title={Translates[siteProps.language].buttons.logOut}
          uppercase
          fontIconSize="26"
          fontSize="16"
          customColorButton={Colors(siteProps).dangerColorDark}
          customColorIcon={Colors(siteProps).dangerColor}
          icon={<MdPowerSettingsNew />}
          onClick={handleLogout}
        />
      </ButtonNavStyle>
    </>
  ) : (
    <>
      <ButtonNavStyle>
        <ButtonIcon
          title={Translates[siteProps.language].buttons.register}
          uppercase
          fontIconSize="35"
          fontSize="16"
          icon={<FaUserPlus />}
          onClick={handleClickRegister}
        />
      </ButtonNavStyle>
      <ButtonNavStyle>
        <ButtonIcon
          title={Translates[siteProps.language].buttons.logIn}
          uppercase
          fontIconSize="20"
          fontSize="16"
          icon={<FaUser />}
          onClick={handleClickLogin}
        />
      </ButtonNavStyle>
    </>
  )

  return (
    <>
      {PopupWorkersReserwations}
      {PopupWorkersUsersInformations}
      {PopupWorkerPropsVisible}
      {PopupWorkerEditHours}
      {PopupEmployeeWorkingHours}
      {PopupReserwation}
      {PopupActiveAccount}
      {PopupRemindPassword}
      {PopupLogin}
      {PopupCreateCompany}
      {PopupRegister}
      {PopupTakeData}
      {PopupTakePlace}
      {PopupSort}
      {PopupFilter}
      {PopupLocalization}
      {PopupUserProfil}
      {PopupHistoryReserwations}
      <MenuPosition active={menuOpen} siteProps={siteProps}>
        <LeftMenuStyle>
          <div onClick={handleMenuOpen}>
            {renderCompanyOrCreateCompany}
            {renderButtonsUp}
          </div>
          <ButtonNavStyle>
            <LabelStyle>
              <SpanSwitch siteProps={siteProps}>
                {Translates[siteProps.language].buttons.language}
              </SpanSwitch>
              <Switch
                onChange={handleChangeLanguage}
                checked={siteProps.language === "EN"}
                activeBoxShadow={`0 0 2px 3px ${
                  Colors(siteProps).primaryColor
                }`}
                onColor={Colors(siteProps).primaryColor}
                offColor={Colors(siteProps).primaryColor}
                onColor={Colors(siteProps).primaryColor}
                height={22}
                uncheckedIcon={
                  <PositionPl siteProps={siteProps}>PL</PositionPl>
                }
                checkedIcon={<PositionEn siteProps={siteProps}>EN</PositionEn>}
              />
            </LabelStyle>
          </ButtonNavStyle>
          <ButtonNavStyle>
            <LabelStyle>
              <SpanSwitch siteProps={siteProps}>
                {Translates[siteProps.language].buttons.darkMode}
              </SpanSwitch>
              <Switch
                onChange={handleDarkStyleClick}
                checked={siteProps.dark}
                activeBoxShadow={`0 0 2px 3px ${
                  Colors(siteProps).primaryColor
                }`}
                onColor={Colors(siteProps).primaryColor}
                height={22}
                uncheckedIcon
                checkedIcon
              />
            </LabelStyle>
          </ButtonNavStyle>
          <ButtonNavStyle>
            <LabelStyle>
              <SpanSwitch siteProps={siteProps}>
                {Translates[siteProps.language].buttons.colorBlindMode}
              </SpanSwitch>
              <Switch
                onChange={handleBlindStyleClick}
                checked={siteProps.blind}
                activeBoxShadow={`0 0 2px 3px ${
                  Colors(siteProps).primaryColor
                }`}
                onColor={Colors(siteProps).primaryColor}
                height={22}
                uncheckedIcon
                checkedIcon
              />
            </LabelStyle>
          </ButtonNavStyle>
        </LeftMenuStyle>
        <CloseMenuLeft>
          <IconCloseStyle onClick={handleMenuOpen} siteProps={siteProps}>
            <MdClose />
          </IconCloseStyle>
        </CloseMenuLeft>
      </MenuPosition>
      <Popup
        opacity
        popupEnable={menuOpen}
        handleClose={handleCloseMenu}
        noContent
      />
      <ContentMenu active={menuOpen}>
        <BackgroundColorPage className="heightElement" siteProps={siteProps}>
          <Spinner spinnerEnable={spinnerEnable} />
          <Alerts />
          <AlertExtra siteProps={siteProps} />
          <WrapperNavigation siteProps={siteProps} menuOpen={menuOpen}>
            <NavigationDiv siteProps={siteProps}>
              <NavigationItems>
                <LogoStyle>
                  <LinkEffect text="NOOTIS" path="/" />
                </LogoStyle>
                <ButtonsNav isUser={!!user}>
                  {renderCompanyOrCreateCompany}
                  {renderButtonsUp}
                </ButtonsNav>
                {!!user && <BellAlerts siteProps={siteProps} user={user} />}
                <BurgerButton onClick={handleMenuOpen}>
                  <FaBars />
                </BurgerButton>
              </NavigationItems>
            </NavigationDiv>
          </WrapperNavigation>
          {renderExtraPropsInMainMenu}
          <PaddingContent
            topNavVisibleMenu={isMainPage ? topNavVisibleMenu : false}
          >
            <MinHeightContent isMainPage={isMainPage}>
              {children}
            </MinHeightContent>
          </PaddingContent>
          <Footer />
        </BackgroundColorPage>
      </ContentMenu>
    </>
  )
}

export default Navigation
