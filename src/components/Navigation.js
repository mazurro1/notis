import React, { useState, useEffect, useRef } from "react"
import { Colors } from "../common/Colors"
import { AllIndustries } from "../common/AllIndustries"
import ButtonIcon from "../components/ButtonIcon"
import ButtonTakeData from "../components/ButtonTakeData"
import styled from "styled-components"
import {
  FaUserPlus,
  FaUser,
  FaSearch,
  FaShoppingBag,
  FaBars,
  FaChrome,
  FaCalendarAlt,
  FaBox,
  FaUsers,
  FaStamp,
  FaHeart,
  FaChartBar,
} from "react-icons/fa"
import {
  MdWork,
  MdPowerSettingsNew,
  MdTimelapse,
  MdClose,
  MdExpandMore,
  MdVerifiedUser,
  MdAttachMoney,
  MdHistory,
} from "react-icons/md"
import { LinkEffect } from "../common/LinkEffect"
import Popup from "./Popup"
import LoginContent from "./Login"
import RegisterContent from "./Register"
import Spinner from "./Spinner"
import FindPlaceContent from "./FindPlace"
import { useDispatch, useSelector } from "react-redux"
import "react-input-checkbox/lib/react-input-checkbox.min.css"
import {
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
  changeBlindStyle,
  changeDarkStyle,
  fetchAllCompanys,
  fetchAllCompanysOfType,
  changeLanguageStyle,
  addNewUserAlert,
  changeActiveAccount,
  confirmDeleteCompany,
  setHeightMenuIndustries,
  setVisibleMenuIndustries,
  saveUserTokenToAutoLogin,
  saveUserTokenToLocal,
} from "../state/actions"
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
import { Translates } from "../common/Translates"
import BellAlerts from "./BellAlerts"
import openSocket from "socket.io-client"
import { Site } from "../common/Site"
import WorkerHoursAutoSave from "./WorkerHoursAutoSave"
import EmployeeWorkingHours from "./EmployeeWorkingHours"
import WorkerUsersInformation from "./WorkerUsersInformation"
import AlertExtra from "./AlertExtra"
import UserStamps from "./UserStamps"
import UserFavourites from "./UserFavourites"
import CompanyAvailability from "./CompanyAvailability"
import UseWindowSize from "../common/UseWindowSize"
import CompanyStatistics from "./CompanyStatistics"
import DeleteCompanyContent from "./DeleteCompany"
import { CSSTransition } from "react-transition-group"
import CoinsOffers from "./CoinsOffers"
import TransactionHistory from "./TransactionHistory"

const MarginButtonsWork = styled.div`
  margin-top: 10px;
`

const SpanSwitch = styled.span`
  font-size: 0.8rem;
  position: absolute;
  top: 5px;
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
  padding: 3px 5px;
  min-width: 140px;
  user-select: none;
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

const ButtonsNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  @media all and (max-width: ${props => (props.isUser ? "1200px" : "800px")}) {
    display: none;
  }
`

const NavigationItems = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  padding-left: 200px;

  @media all and (max-width: ${Site.mobileSize + "px"}) {
    padding-left: 80px;
  }
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
  padding: 10px 5px;
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
  /* overflow: hidden; */
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

const BellAlertsStyle = styled.div`
  position: relative;
  background-color: ${props => Colors(props.siteProps).darkColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  border-radius: 5px;
  padding: 10px;
  font-size: 1.2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  overflow: hidden;
  cursor: pointer;
  user-select: none;
  margin-right: 5px;
  margin-left: 5px;

  &:hover {
    .bell-action {
      animation-name: bellActionAnimate;
      animation-duration: 1s;
      animation-timing-function: inline;
      animation-iteration-count: 1;
    }
  }
`

const IconStyle = styled.div`
  position: absolute;
  top: 6px;
  user-select: none;
`

const NootisLogo = styled.div`
  font-size: 1.8rem;
  background-color: ${props => Colors(props.siteProps).primaryColor};
  color: ${props => Colors(props.siteProps).textNormalWhite};
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
`

const SaveUserButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const MarginButtonSaveToken = styled.div`
  margin: 5px;
`

const MonetsStyle = styled.div`
  color: ${props => Colors(props.siteProps).textNormalBlack};
  font-family: "Poppins-Medium", sans-serif;
  margin-bottom: 5px;
  span {
    color: ${props => Colors(props.siteProps).primaryColorDark};
    font-family: "Poppins-Bold", sans-serif;
  }
`

const Navigation = ({ isMainPage }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [workerReserwationsVisible, setWorkerReserwationsVisible] = useState(
    false
  )
  const [
    workerUsersInformationVisible,
    setWorkerUsersInformationVisible,
  ] = useState(false)
  const [historyReserwations, setHistoryReserwations] = useState(false)
  const [workPropsVisible, setWorkPropsVisible] = useState(false)
  const [popupTakePlace, setPopupTakePlace] = useState(false)
  const [selectedName, setSelectedName] = useState("")
  const [topNavVisible, setTopNavVisible] = useState(false)
  const [topNavVisibleMenu, setTopNavVisibleMenu] = useState(false)
  const [emplyeeWorkingHoursVisible, setEmplyeeWorkingHoursVisible] = useState(
    false
  )
  const [stampsVisible, setStampsVisible] = useState(false)
  const [favouritesVisible, setFavouritesVisible] = useState(false)
  const [availabilityVisible, setAvailabilityVisible] = useState(false)
  const [companyStatistics, setCompanyStatistics] = useState(false)
  const [addMonetsVisible, setAddMonetsVisible] = useState(false)
  const [transactionHistoryVisible, setTransactionHistoryVisible] = useState(
    false
  )

  const siteProps = useSelector(state => state.siteProps)
  const editWorkerHours = useSelector(state => state.editWorkerHours)
  const editWorkerHoursData = useSelector(state => state.editWorkerHoursData)
  const createCompanyVisible = useSelector(state => state.createCompanyVisible)
  const registrationVisible = useSelector(state => state.registrationVisible)
  const loginVisible = useSelector(state => state.loginVisible)
  const spinnerEnable = useSelector(state => state.spinnerEnable)
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
  const activeAccountVisible = useSelector(state => state.activeAccountVisible)
  const heightMenuIndustries = useSelector(state => state.heightMenuIndustries)
  const visibleTokenToAutoLogin = useSelector(
    state => state.visibleTokenToAutoLogin
  )
  const visibleMenuIndustries = useSelector(
    state => state.visibleMenuIndustries
  )

  const confirmDeleteCompanyVisible = useSelector(
    state => state.confirmDeleteCompanyVisible
  )
  const remindPasswordVisible = useSelector(
    state => state.remindPasswordVisible
  )

  const refUnderMenuIndustries = useRef(null)

  const dispatch = useDispatch()

  const size = UseWindowSize()

  useEffect(() => {
    if (!!refUnderMenuIndustries) {
      if (!!refUnderMenuIndustries.current) {
        dispatch(
          setHeightMenuIndustries(refUnderMenuIndustries.current.offsetHeight)
        )
      }
    }
  }, [refUnderMenuIndustries, userId, visibleMenuIndustries])

  useEffect(() => {
    if (!!userId) {
      const socket = openSocket(Site.serverUrl)
      socket.on(`user${userId}`, data => {
        if (data.action === "update-alerts") {
          dispatch(addNewUserAlert(data.alertData))
        }
      })
    }
  }, [userId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!!!user) {
      dispatch(fetchAutoLogin())
    }
  }, [dispatch, user])

  useEffect(() => {
    if (isMainPage) {
      setTopNavVisible(true)
      setTopNavVisibleMenu(true)
    } else {
      setTopNavVisible(false)
      setTopNavVisibleMenu(false)
    }
  }, [isMainPage])

  useEffect(() => {
    const sortsValue = !!sorts ? sorts.value : null
    if (!!industries || industries === 0) {
      dispatch(
        fetchAllCompanysOfType(
          page,
          industries,
          sortsValue,
          filters,
          localization,
          selectedName
        )
      )
    } else {
      dispatch(
        fetchAllCompanys(page, sortsValue, filters, localization, selectedName)
      )
    }
  }, [selectedName, sorts, filters, localization, page, industries]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleCloseActiveAccount = () => {
    dispatch(changeActiveAccount(false))
  }

  const handleActiveAccount = () => {
    dispatch(changeActiveAccount(true))
  }

  const handleClickLogin = () => {
    dispatch(changeLoginVisible(!loginVisible))
  }

  const handleClickRegister = () => {
    dispatch(changeRegistrationVisible(!registrationVisible))
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

  const handleUserStamps = () => {
    setStampsVisible(prevState => !prevState)
  }

  const handleUserFavourites = () => {
    setFavouritesVisible(prevState => !prevState)
  }

  const handleClickAvailability = () => {
    setAvailabilityVisible(prevState => !prevState)
    setWorkPropsVisible(prevState => !prevState)
  }

  const handleClickMenuIndustries = () => {
    dispatch(setVisibleMenuIndustries(!visibleMenuIndustries))
  }

  const handleClickCompanyStatistics = () => {
    setCompanyStatistics(prevState => !prevState)
    setWorkPropsVisible(prevState => !prevState)
  }

  const handleCloseDeleteCompany = () => {
    dispatch(confirmDeleteCompany(false))
  }

  const handleSaveTokenAutoLogin = () => {
    dispatch(saveUserTokenToAutoLogin(false))
  }

  const handleSaveUserToken = () => {
    dispatch(saveUserTokenToLocal(user.userId, user.token))
    dispatch(saveUserTokenToAutoLogin(false))
  }

  const handleClickMonets = () => {
    setAddMonetsVisible(prevState => !prevState)
    setWorkPropsVisible(prevState => !prevState)
  }

  const handleClickTransactionHistory = () => {
    setWorkPropsVisible(prevState => !prevState)
    setTransactionHistoryVisible(prevState => !prevState)
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

  const isMobileSize = Site.mobileSize >= size.width

  const renderExtraPropsInMainMenu = (
    // <Popup popupEnable={topNavVisibleMenu} noContent position="absolute">
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
                setSelectedName("")
              }}
              resetTextEnable={!!selectedName}
              icon={<FaSearch />}
              text={
                !!selectedName ? selectedName : "Znajdz ulubione miejsce..."
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

  const PopupWorkersUsersInformations = !!user && (
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

  const PopupConfirmDeleteCompany = !!user && (
    <Popup
      popupEnable={confirmDeleteCompanyVisible}
      handleClose={handleCloseDeleteCompany}
      title="Usuwanie działalności"
      close={false}
      width="600"
    >
      <DeleteCompanyContent siteProps={siteProps} user={user} />
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

  const PopupFilter = (
    <Popup
      popupEnable={filterVisible}
      handleClose={() => dispatch(changeFilterVisible())}
      title="Filtruj"
      maxWidth={600}
    >
      <Filter
        handleClose={() => dispatch(changeFilterVisible())}
        siteProps={siteProps}
      />
    </Popup>
  )

  const PopupLocalization = (
    <Popup
      popupEnable={localizationVisible}
      handleClose={() => dispatch(changeLocaliaztionVisible())}
      title="Lokalizacja"
      maxWidth={600}
    >
      <Localization
        handleClose={() => dispatch(changeLocaliaztionVisible())}
        siteProps={siteProps}
      />
    </Popup>
  )

  const PopupLogin = (
    <Popup
      popupEnable={loginVisible}
      handleClose={handleClickLogin}
      maxWidth="400"
      title="Logowanie"
      close={false}
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
      close={false}
    >
      <RemindPassword />
    </Popup>
  )

  const PopupRegister = (
    <Popup
      popupEnable={registrationVisible}
      handleClose={handleClickRegister}
      maxWidth="500"
      title="Rejestracja"
      close={false}
    >
      <RegisterContent />
    </Popup>
  )

  const PopupCreateCompany = (
    <Popup
      popupEnable={createCompanyVisible}
      handleClose={handleCreateCompany}
      title="Stwórz konto firmowe"
      close={false}
    >
      <CreateCompany />
    </Popup>
  )

  const PopupHistoryReserwations = !!user && (
    <Popup
      popupEnable={historyReserwations}
      handleClose={handleHistoryReserwations}
      title={Translates[siteProps.language].buttons.bookingHistory}
      fullScreen
      maxWidth="800"
    >
      <UserHistory
        siteProps={siteProps}
        user={user}
        handleClose={handleHistoryReserwations}
      />
    </Popup>
  )

  const PopupReserwation = userId && (
    <Popup
      popupEnable={reserwationEnable}
      handleClose={handleCloseReserwation}
      title="Rezerwacja"
    >
      <Reserwation
        reserwationData={reserwationData}
        reserwationEnable={reserwationEnable}
        handleCloseReserwation={handleCloseReserwation}
      />
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
        siteProps={siteProps}
      />
    </Popup>
  )

  const PopupActiveAccount = !!user && (
    <Popup
      popupEnable={activeAccountVisible}
      maxWidth="400"
      handleClose={handleCloseActiveAccount}
      title="Aktywacja konta"
      close={false}
    >
      <ActiveAccount />
    </Popup>
  )

  const PopupUserProfil = !!user && (
    <Popup
      popupEnable={userProfilVisible}
      handleClose={handleUserProfil}
      title="Dane użytkownika"
    >
      <UserProfil userProfilVisible={userProfilVisible} />
    </Popup>
  )

  const PopupUserStamps = user && (
    <Popup
      popupEnable={stampsVisible}
      handleClose={handleUserStamps}
      title="Pieczątki"
      fullScreen
    >
      <UserStamps
        userStamps={user.stamps}
        siteProps={siteProps}
        handleClose={handleUserStamps}
      />
    </Popup>
  )

  const PopupUserFavourites = user && (
    <Popup
      popupEnable={favouritesVisible}
      handleClose={handleUserFavourites}
      title="Ulubione"
      fullScreen
    >
      <UserFavourites
        siteProps={siteProps}
        favouritesCompanys={user.favouritesCompanys}
        handleClose={handleUserFavourites}
        user={user}
      />
    </Popup>
  )

  const PopupCompanyAvailability = user && (
    <Popup
      popupEnable={availabilityVisible}
      handleClose={handleClickAvailability}
      title="Stan magazynowy"
      fullScreen
    >
      <CompanyAvailability siteProps={siteProps} user={user} />
    </Popup>
  )

  const PopupCompanyStatistics = user && (
    <Popup
      popupEnable={companyStatistics}
      handleClose={handleClickCompanyStatistics}
      title="Statystyki"
      fullScreen
    >
      <CompanyStatistics siteProps={siteProps} user={user} />
    </Popup>
  )

  const PopupCompanyAddMonets = user && (
    <Popup
      popupEnable={addMonetsVisible}
      handleClose={handleClickMonets}
      title="Doładuj monety"
    >
      <CoinsOffers
        siteProps={siteProps}
        user={user}
        handleClose={handleClickMonets}
      />
    </Popup>
  )

  const PopupCompanyTransactionHistory = user && (
    <Popup
      popupEnable={transactionHistoryVisible}
      handleClose={handleClickTransactionHistory}
      title="Historia tranzakcji"
      maxWidth="500"
    >
      <TransactionHistory
        siteProps={siteProps}
        user={user}
        handleClose={handleClickTransactionHistory}
      />
    </Popup>
  )

  const PopupSaveTokenAutoLogin = user && (
    <Popup
      popupEnable={visibleTokenToAutoLogin}
      handleClose={handleSaveTokenAutoLogin}
      title="Zapamiętaj użytkownika"
      maxWidth={400}
    >
      <SaveUserButtons>
        <MarginButtonSaveToken>
          <ButtonIcon
            title="Anuluj"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<MdClose />}
            customColorButton={Colors(siteProps).dangerColorDark}
            customColorIcon={Colors(siteProps).dangerColor}
            onClick={handleSaveTokenAutoLogin}
          />
        </MarginButtonSaveToken>
        <MarginButtonSaveToken>
          <ButtonIcon
            title="Zapamiętaj użytkownika"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<MdVerifiedUser />}
            customColorButton={Colors(siteProps).successColorDark}
            customColorIcon={Colors(siteProps).successColor}
            onClick={handleSaveUserToken}
          />
        </MarginButtonSaveToken>
      </SaveUserButtons>
    </Popup>
  )

  console.log(user)
  let workerHasAccessButton = false
  let workerHasAccessClientsOpinions = false
  let workerHasAccessAvailability = false
  let hasCompany = false
  let hasPermission = false
  let companyConfirmed = false
  let isAdmin = false
  let companyMonets = 0

  if (!!user) {
    if (user.hasCompany) {
      if (!!user.company.accountVerified) {
        companyConfirmed = true
      }
      const selectWorker = user.company.workers.find(
        worker => worker.user === user.userId
      )
      workerHasAccessClientsOpinions = user.company.owner === user.userId
      workerHasAccessAvailability = user.company.owner === user.userId
      hasCompany = true
      hasPermission = user.company.owner === user.userId
      isAdmin = user.company.owner === user.userId
      if (!!user.company.monets) {
        companyMonets = Buffer.from(user.company.monets, "base64").toString(
          "ascii"
        )
      }
      if (!!selectWorker) {
        if (!!!hasPermission) {
          hasPermission = selectWorker.permissions.some(
            perm =>
              perm === 2 || perm === 3 || perm === 4 || perm === 6 || perm === 7
          )
        }
        if (hasPermission) {
          workerHasAccessButton = true
        }

        if (!workerHasAccessClientsOpinions) {
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
        {hasCompany && hasPermission && (
          <>
            {isAdmin && companyConfirmed && (
              <MonetsStyle siteProps={siteProps}>
                Monety: <span>{companyMonets}</span>
              </MonetsStyle>
            )}
            <div onClick={handleClickAdminPanel} aria-hidden="true">
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
            {isAdmin && companyConfirmed && (
              <>
                <MarginButtonsWork>
                  <ButtonIcon
                    title="Doładuj monety"
                    uppercase
                    fontIconSize="22"
                    fontSize="16"
                    icon={<MdAttachMoney />}
                    customColorButton={Colors(siteProps).successColorDark}
                    customColorIcon={Colors(siteProps).successColor}
                    onClick={handleClickMonets}
                  />
                </MarginButtonsWork>
                <MarginButtonsWork>
                  <ButtonIcon
                    title="Historia tranzakcji"
                    uppercase
                    fontIconSize="22"
                    fontSize="16"
                    icon={<MdHistory />}
                    customColorButton={Colors(siteProps).successColorDark}
                    customColorIcon={Colors(siteProps).successColor}
                    onClick={handleClickTransactionHistory}
                  />
                </MarginButtonsWork>
              </>
            )}
            {companyConfirmed && (
              <MarginButtonsWork>
                <ButtonIcon
                  title="Statystyki"
                  uppercase
                  fontIconSize="20"
                  fontSize="16"
                  icon={<FaChartBar />}
                  onClick={handleClickCompanyStatistics}
                />
              </MarginButtonsWork>
            )}
          </>
        )}
        {companyConfirmed && (
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
        )}
        {companyConfirmed && workerHasAccessClientsOpinions && (
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
        {companyConfirmed && (
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
        )}
        {companyConfirmed && workerHasAccessAvailability && (
          <MarginButtonsWork>
            <ButtonIcon
              title="Stan magazynowy"
              uppercase
              fontIconSize="20"
              fontSize="16"
              icon={<FaBox />}
              onClick={handleClickAvailability}
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
        {!user.accountVerified ? (
          <ButtonIcon
            title={`Aktywuj konto`}
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<FaUser />}
            onClick={handleActiveAccount}
            secondColors
          />
        ) : (
          <ButtonIcon
            title={`${user.userName}`}
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<FaUser />}
            onClick={handleUserProfil}
          />
        )}
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
      {PopupRemindPassword}
      {PopupLogin}
      {PopupCreateCompany}
      {PopupRegister}
      {PopupTakePlace}
      {PopupFilter}
      {PopupLocalization}
      {PopupUserProfil}
      {PopupUserStamps}
      {PopupUserFavourites}
      {PopupCompanyAvailability}
      {PopupHistoryReserwations}
      {PopupCompanyStatistics}
      {PopupActiveAccount}
      {PopupConfirmDeleteCompany}
      {PopupSaveTokenAutoLogin}
      {PopupCompanyAddMonets}
      {PopupCompanyTransactionHistory}
      <MenuPosition active={menuOpen} siteProps={siteProps}>
        <LeftMenuStyle>
          <div onClick={handleMenuOpen} aria-hidden="true">
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
        <BackgroundColorPage siteProps={siteProps}>
          <Spinner spinnerEnable={spinnerEnable} />
          <Alerts />
          <AlertExtra siteProps={siteProps} />
          <WrapperNavigation siteProps={siteProps} menuOpen={menuOpen}>
            <NavigationDiv siteProps={siteProps}>
              <NavigationItems>
                <LogoStyle siteProps={siteProps}>
                  <LinkEffect
                    text={
                      isMobileSize ? (
                        <NootisLogo siteProps={siteProps}>N</NootisLogo>
                      ) : (
                        "NOOTIS"
                      )
                    }
                    path="/"
                  />
                </LogoStyle>
                <ButtonsNav isUser={!!user}>
                  {renderCompanyOrCreateCompany}
                  {renderButtonsUp}
                </ButtonsNav>
                {!!user && (
                  <BellAlertsStyle
                    siteProps={siteProps}
                    onClick={handleUserFavourites}
                  >
                    <IconStyle className="bell-action">
                      <FaHeart />
                    </IconStyle>
                  </BellAlertsStyle>
                )}
                {!!user && (
                  <BellAlertsStyle
                    siteProps={siteProps}
                    onClick={handleUserStamps}
                  >
                    <IconStyle className="bell-action">
                      <FaStamp />
                    </IconStyle>
                  </BellAlertsStyle>
                )}
                {!!user && <BellAlerts siteProps={siteProps} user={user} />}

                <BurgerButton onClick={handleMenuOpen}>
                  <FaBars />
                </BurgerButton>
              </NavigationItems>
            </NavigationDiv>
          </WrapperNavigation>
          {renderExtraPropsInMainMenu}
          {/* <PaddingContent
            topNavVisibleMenu={isMainPage ? topNavVisibleMenu : false}
            heightPadding={heightMenuIndustries}
            active={visibleMenuIndustries}
          >
            <MinHeightContent isMainPage={isMainPage}>
              {children}
            </MinHeightContent>
          </PaddingContent> */}
        </BackgroundColorPage>
      </ContentMenu>
    </>
  )
}

export default Navigation
