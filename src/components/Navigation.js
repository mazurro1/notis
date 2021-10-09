import React, { useState, useEffect, useRef } from "react"
import { Colors } from "../common/Colors"
import ButtonIcon from "../components/ButtonIcon"
import styled from "styled-components"
import {
  FaUserPlus,
  FaUser,
  FaShoppingBag,
  FaBars,
  FaChrome,
  FaCalendarAlt,
  FaBox,
  FaUsers,
  FaStamp,
  FaHeart,
  FaChartBar,
  FaTools,
  FaCar,
  FaBook,
} from "react-icons/fa"
import {
  MdWork,
  MdPowerSettingsNew,
  MdTimelapse,
  MdClose,
  MdVerifiedUser,
  MdAttachMoney,
  MdHistory,
  MdStoreMallDirectory,
  MdHelp,
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
  saveUserTokenToAutoLogin,
  saveUserTokenToLocal,
  fetchAllMapsMarks,
  changePopupTakePlace,
  fetchNotificationEndpoint,
  changeSelectedUserCompany,
  resetUserProfil,
  fetchResetUserMenu,
  fetchUpdateUserProps,
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
import { io } from "socket.io-client"
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
import CoinsOffers from "./CoinsOffers"
import TransactionHistory from "./TransactionHistory"
import ReactTooltip from "react-tooltip"
import SelectCreated from "./SelectCreated"
import CompanyServices from "./CompanyServices"
import CompanyCommuniting from "./CompanyCommuniting"
import UserHistoryServices from "./UserHistoryServices"
import UserHistoryCommuniting from "./UserHistoryCommuniting"
import InfoMenu from "./InfoMenu"

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

const LogoStyle = styled.div`
  position: absolute;
  left: 5%;
  a {
    font-size: 3.2rem;
    color: white;
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
  box-shadow: 0 0 40px 1px rgba(0, 0, 0, 0.1);
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

const StyledSelect = styled.div`
  padding-bottom: 20px;
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

const MinHeightComponent = styled.div`
  min-height: 200px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const MeetsyLogo = styled.div`
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

const SMSStyle = styled.div`
  color: ${props => Colors(props.siteProps).textNormalBlack};
  font-family: "Poppins-Medium", sans-serif;
  margin-bottom: 5px;
  span {
    display: inline-block;
    color: ${props => Colors(props.siteProps).primaryColorDark};
    font-family: "Poppins-Bold", sans-serif;
  }
`

const HelpIconStyle = styled.div`
  font-size: 1.6rem;
  line-height: 0;
  margin-left: 10px;
  cursor: pointer;
  color: ${props =>
    props.helpVisible ? Colors(props.siteProps).primaryColor : "white"};
`

const Navigation = props => {
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
  const selectedNameMenu = useSelector(state => state.selectedNameMenu)
  const [emplyeeWorkingHoursVisible, setEmplyeeWorkingHoursVisible] = useState(
    false
  )
  const [companyServicesVisible, setCompanyServicesVisible] = useState(false)
  const [companyCommutingVisible, setCompanyCommutingsVisible] = useState(false)
  const [stampsVisible, setStampsVisible] = useState(false)
  const [favouritesVisible, setFavouritesVisible] = useState(false)
  const [availabilityVisible, setAvailabilityVisible] = useState(false)
  const [companyStatistics, setCompanyStatistics] = useState(false)
  const [addSMSVisible, setAddSMSVisible] = useState(false)
  const [userServicesVisible, setUserServicesVisible] = useState(false)
  const [transactionHistoryVisible, setTransactionHistoryVisible] = useState(
    false
  )
  const [historyServices, setHistoryServices] = useState(false)
  const [historyCommunitings, setHistoryCommunitings] = useState(false)
  const [disabledSwitchUserProps, setDisabledSwitchUserProps] = useState(false)
  const [helpVisible, setHelpVisible] = useState(false)
  const [helpContentVisible, setHelpContentVisible] = useState(false)

  const userProfilReset = useSelector(state => state.userProfilReset)
  const popupTakePlace = useSelector(state => state.popupTakePlace)
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
  const district = useSelector(state => state.district)
  const industries = useSelector(state => state.industries)
  const page = useSelector(state => state.page)
  const user = useSelector(state => state.user)
  const userId = useSelector(state => state.userId)
  const reserwationEnable = useSelector(state => state.reserwationEnable)
  const reserwationData = useSelector(state => state.reserwationData)
  const userProfilVisible = useSelector(state => state.userProfilVisible)
  const activeAccountVisible = useSelector(state => state.activeAccountVisible)
  const mapActive = useSelector(state => state.mapActive)
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
  const resetUserMenu = useSelector(state => state.resetUserMenu)

  const refUnderMenuIndustries = useRef(null)

  const dispatch = useDispatch()

  const size = UseWindowSize()

  useEffect(() => {
    if (!!userId) {
      const socket = io(Site.serverUrl)
      socket.on(`user${userId}`, data => {
        if (data.action === "update-alerts") {
          dispatch(addNewUserAlert(data.alertData))
        }
      })
    }
  }, [userId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (resetUserMenu) {
      setUserServicesVisible(false)
      setHistoryCommunitings(false)
      setHistoryServices(false)
      setHistoryReserwations(false)
      dispatch(fetchResetUserMenu(false))
    }
  }, [resetUserMenu]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // setUserDoc(user)
    if (!!userProfilReset) {
      dispatch(resetUserProfil())
    }
  }, [userProfilReset]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!!refUnderMenuIndustries) {
      if (!!refUnderMenuIndustries.current) {
        dispatch(
          setHeightMenuIndustries(refUnderMenuIndustries.current.offsetHeight)
        )
      }
    }
  }, [refUnderMenuIndustries, userId, visibleMenuIndustries]) // eslint-disable-line react-hooks/exhaustive-deps

  function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
    const base64 = (base64String + padding)
      .replace(/-/g, "+")
      .replace(/_/g, "/")

    const rawData = window.atob(base64)
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
  }

  const handleClickHelp = () => {
    if (!helpVisible) {
      setHelpVisible(prevState => !prevState)
      setTimeout(() => {
        setHelpContentVisible(prevState => !prevState)
      }, 100)
    } else {
      setHelpContentVisible(prevState => !prevState)
    }
  }

  const handleEnableNotifaction = async userVapid => {
    let sw = await navigator.serviceWorker.ready
    const result = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(userVapid),
    })
    // sw.periodicSync
    //   .register({
    //     tag: "myFirstSync",
    //     minPeriod: 3000,
    //     powerState: "avoid-draining",
    //     networkState: "avoid-cellular",
    //   })
    //   .then(
    //     periodicSyncReg => {
    //       console.log("sucess")
    //     },
    //     () => {
    //       console.log("some error occured.")
    //     }
    //   )
    dispatch(fetchNotificationEndpoint(user.token, result))
  }

  useEffect(() => {
    if (!!user) {
      handleEnableNotifaction(user.vapidPublic)
    }
  }, [userId]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!!!user) {
      dispatch(fetchAutoLogin())
    }
    ReactTooltip.rebuild()
  }, [dispatch, user])

  useEffect(() => {
    if (!!sorts && !mapActive) {
      const sortsValue = !!sorts ? sorts.value : null
      if (!!industries || industries === 0) {
        dispatch(
          fetchAllCompanysOfType(
            page,
            industries,
            sortsValue,
            filters,
            localization,
            selectedNameMenu,
            !!district && !!localization
              ? !!localization.value
                ? district
                : null
              : null
          )
        )
      } else {
        dispatch(
          fetchAllCompanys(
            page,
            sortsValue,
            filters,
            localization,
            selectedNameMenu,
            !!district && !!localization
              ? !!localization.value
                ? district
                : null
              : null
          )
        )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedNameMenu,
    sorts,
    filters,
    localization,
    page,
    industries,
    district,
    mapActive,
  ]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!!sorts && mapActive) {
      const sortsValue = !!sorts ? sorts.value : null
      dispatch(
        fetchAllMapsMarks(
          !!industries ? industries : null,
          sortsValue,
          filters,
          localization,
          selectedNameMenu,
          !!district && !!localization
            ? !!localization.value
              ? district
              : null
            : null
        )
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedNameMenu,
    sorts,
    filters,
    localization,
    industries,
    mapActive,
    district,
  ]) // eslint-disable-line react-hooks/exhaustive-deps

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
    dispatch(changePopupTakePlace(false))
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
    if (!!!disabledSwitchUserProps) {
      if (!!userId && !!user) {
        const dataSiteProps = {
          blind: !siteProps.blind,
          dark: false,
          language: siteProps.language,
        }
        dispatch(
          fetchUpdateUserProps(
            user.token,
            dataSiteProps.language,
            dataSiteProps.dark,
            dataSiteProps.blind
          )
        )
      }
      dispatch(changeBlindStyle())
      setDisabledSwitchUserProps(true)
      setTimeout(() => {
        setDisabledSwitchUserProps(false)
      }, 2000)
    }
  }

  const handleDarkStyleClick = () => {
    if (!!!disabledSwitchUserProps) {
      dispatch(changeDarkStyle())
      if (!!userId && !!user) {
        const dataSiteProps = {
          blind: false,
          dark: !siteProps.dark,
          language: siteProps.language,
        }
        dispatch(
          fetchUpdateUserProps(
            user.token,
            dataSiteProps.language,
            dataSiteProps.dark,
            dataSiteProps.blind
          )
        )
      }
      setDisabledSwitchUserProps(true)
      setTimeout(() => {
        setDisabledSwitchUserProps(false)
      }, 2000)
    }
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
    if (!!!disabledSwitchUserProps) {
      const languageSelected = siteProps.language === "PL" ? "EN" : "PL"
      dispatch(changeLanguageStyle(languageSelected))
      if (!!userId && !!user) {
        const dataSiteProps = {
          blind: siteProps.blind,
          dark: siteProps.dark,
          language: languageSelected,
        }
        dispatch(
          fetchUpdateUserProps(
            user.token,
            dataSiteProps.language,
            dataSiteProps.dark,
            dataSiteProps.blind
          )
        )
      }
      setDisabledSwitchUserProps(true)
      setTimeout(() => {
        setDisabledSwitchUserProps(false)
      }, 2000)
    }
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

  const handleClickCompanyStatistics = () => {
    setCompanyStatistics(prevState => !prevState)
    setWorkPropsVisible(prevState => !prevState)
  }

  const handleClickCompanyServices = () => {
    setCompanyServicesVisible(prevState => !prevState)
    setWorkPropsVisible(prevState => !prevState)
  }

  const handleClickCompanyCommuting = () => {
    setCompanyCommutingsVisible(prevState => !prevState)
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

  const handleClickSMS = () => {
    setAddSMSVisible(prevState => !prevState)
    setWorkPropsVisible(prevState => !prevState)
  }

  const handleClickTransactionHistory = () => {
    setWorkPropsVisible(prevState => !prevState)
    setTransactionHistoryVisible(prevState => !prevState)
  }

  const handleChangeSelectedCompany = value => {
    dispatch(changeSelectedUserCompany(value.value))
  }

  const handleClickUserServicesVisible = () => {
    setUserServicesVisible(prevState => !prevState)
  }

  const handleHistoryReserwations = () => {
    setHistoryReserwations(prevState => !prevState)
    setUserServicesVisible(prevState => !prevState)
  }

  const handleUserHistoryServices = () => {
    setHistoryServices(prevState => !prevState)
    setUserServicesVisible(prevState => !prevState)
  }

  const handleUserHistoryCommunitings = () => {
    setHistoryCommunitings(prevState => !prevState)
    setUserServicesVisible(prevState => !prevState)
  }

  const isMobileSize = Site.mobileSize >= size.width

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

  const PopupEmployeeWorkingHours = !!user && (
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
        user={user}
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

  const PopupCreateCompany = !!user && (
    <Popup
      popupEnable={createCompanyVisible}
      handleClose={handleCreateCompany}
      title="Stwórz konto firmowe"
      close={false}
    >
      <CreateCompany user={user} siteProps={siteProps} />
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

  const PopupReserwation = !!user && (
    <Popup
      popupEnable={reserwationEnable}
      handleClose={handleCloseReserwation}
      title="Rezerwacja"
      fullScreen
    >
      <Reserwation
        reserwationData={reserwationData}
        reserwationEnable={reserwationEnable}
        handleCloseReserwation={handleCloseReserwation}
        user={user}
        siteProps={siteProps}
      />
    </Popup>
  )

  const PopupTakePlaceContent = (
    <Popup
      popupEnable={popupTakePlace}
      handleClose={handleClickTakePlace}
      maxWidth="500"
      title="Znajdz ulubione miejsce"
    >
      <FindPlaceContent
        handleClose={handleClickTakePlace}
        // setSelectedName={dispatch}
        selectedName={selectedNameMenu}
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
      <ActiveAccount user={user} siteProps={siteProps} />
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

  const PopupCompanyAddSMS = user && (
    <Popup
      popupEnable={addSMSVisible}
      handleClose={handleClickSMS}
      title="Doładuj konto"
    >
      <CoinsOffers
        siteProps={siteProps}
        user={user}
        handleClose={handleClickSMS}
      />
    </Popup>
  )

  const PopupCompanyTransactionHistory = user && (
    <Popup
      popupEnable={transactionHistoryVisible}
      handleClose={handleClickTransactionHistory}
      title="Historia tranzakcji"
      maxWidth="600"
      heightFull
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
  let workerHasAccessServices = false
  let workerHasAccessCommunitings = false
  let anyCompany = false
  let hasPermission = false
  let companyConfirmed = false
  let isAdmin = false
  let companySMS = 0
  let premiumActive = false
  let datePremium = null
  let disabledNoPremium = true

  if (!!user) {
    if (!!user.allCompanys) {
      if (user.allCompanys.length > 0) {
        anyCompany = true
      }
    }
    if (!!user.company) {
      if (
        !!user.company.accountPhoneVerified &&
        !!user.company.accountEmailVerified
      ) {
        companyConfirmed = true
      }
      if (!!user.company.premium) {
        const toDatePremium = new Date(user.company.premium)
        if (toDatePremium >= new Date()) {
          premiumActive = true
          disabledNoPremium = false
          datePremium = `${
            toDatePremium.getHours() < 10
              ? `0${toDatePremium.getHours()}`
              : toDatePremium.getHours()
          }:${
            toDatePremium.getMinutes() < 10
              ? `0${toDatePremium.getMinutes()}`
              : toDatePremium.getMinutes()
          }, ${
            toDatePremium.getDate() < 10
              ? `0${toDatePremium.getDate()}`
              : toDatePremium.getDate()
          }-${
            toDatePremium.getMonth() + 1 < 10
              ? `0${toDatePremium.getMonth() + 1}`
              : toDatePremium.getMonth() + 1
          }-${toDatePremium.getFullYear()}`
        }
      }
      const selectWorker = user.company.workers.find(
        worker => worker.user === user.userId
      )
      workerHasAccessClientsOpinions = user.company.owner === user.userId
      workerHasAccessAvailability = user.company.owner === user.userId
      workerHasAccessServices = user.company.owner === user.userId
      workerHasAccessCommunitings = user.company.owner === user.userId
      hasPermission = user.company.owner === user.userId
      isAdmin = user.company.owner === user.userId
      if (!!user.company.sms) {
        companySMS = user.company.sms
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

        if (!workerHasAccessServices) {
          const hasPermissionServices = selectWorker.permissions.some(
            perm => perm === 8
          )
          if (hasPermissionServices) {
            workerHasAccessServices = true
          }
        }

        if (!workerHasAccessCommunitings) {
          const hasPermissionCommunitings = selectWorker.permissions.some(
            perm => perm === 10
          )
          if (hasPermissionCommunitings) {
            workerHasAccessCommunitings = true
          }
        }
      }
    }
  }
  let selectCompanysValues = []
  let selectedCompany = null
  if (!!user) {
    if (!!user.allCompanys) {
      selectCompanysValues = user.allCompanys.map(itemCompany => {
        return {
          label: itemCompany.name,
          value: itemCompany._id,
        }
      })
    }
    if (!!user.company) {
      selectedCompany = {
        label: user.company.name,
        value: user.company._id,
      }
    }
  }

  const PopupCompanyServices = user && (
    <Popup
      popupEnable={companyServicesVisible}
      handleClose={handleClickCompanyServices}
      title="Serwisy"
      fullScreen
    >
      <CompanyServices
        siteProps={siteProps}
        user={user}
        handleClose={handleClickCompanyServices}
        workerHasAccessServices={workerHasAccessServices}
        workerHasAccessClientsOpinions={workerHasAccessClientsOpinions}
      />
    </Popup>
  )

  const PopupCompanyCommuniting = user && (
    <Popup
      popupEnable={companyCommutingVisible}
      handleClose={handleClickCompanyCommuting}
      title="Dojazdy"
      fullScreen
    >
      <CompanyCommuniting
        siteProps={siteProps}
        user={user}
        handleClose={handleClickCompanyCommuting}
        workerHasAccessCommunitings={workerHasAccessCommunitings}
        workerHasAccessClientsOpinions={workerHasAccessClientsOpinions}
      />
    </Popup>
  )

  const PopupUserProfil = !!user && (
    <Popup
      popupEnable={userProfilVisible}
      handleClose={handleUserProfil}
      title="Dane użytkownika"
    >
      <UserProfil
        userProfilVisible={userProfilVisible}
        user={user}
        siteProps={siteProps}
        selectCompanysValues={selectCompanysValues}
      />
    </Popup>
  )

  const PopupWorkerEditHours = !!user && (
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
        user={user}
        isAdmin={isAdmin}
      />
    </Popup>
  )

  const PopupWorkersReserwations = !!user && (
    <Popup
      popupEnable={workerReserwationsVisible}
      handleClose={handleCloseWorkerReserwations}
      noContent
      calendar
    >
      <WorkerReserwations
        handleClose={handleCloseWorkerReserwations}
        user={user}
        isAdmin={isAdmin}
        workerHasAccessClientsOpinions={workerHasAccessClientsOpinions}
      />
    </Popup>
  )

  const PopupUserHistoryServices = !!user && (
    <Popup
      popupEnable={historyServices}
      handleClose={handleUserHistoryServices}
      title="Serwisy"
      fullScreen
    >
      <UserHistoryServices user={user} siteProps={siteProps} />
    </Popup>
  )

  const PopupUserHistoryCommunitings = !!user && (
    <Popup
      popupEnable={historyCommunitings}
      handleClose={handleUserHistoryCommunitings}
      title="Dojazdy"
      fullScreen
    >
      <UserHistoryCommuniting user={user} siteProps={siteProps} />
    </Popup>
  )

  const PopupUserServices = !!user && (
    <Popup
      popupEnable={userServicesVisible}
      handleClose={handleClickUserServicesVisible}
      title="Twoje usługi"
      maxWidth="350"
    >
      <div>
        <MarginButtonSaveToken>
          <ButtonIcon
            title={Translates[siteProps.language].buttons.bookingHistory}
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<FaShoppingBag />}
            onClick={handleHistoryReserwations}
          />
        </MarginButtonSaveToken>
        <MarginButtonSaveToken>
          <ButtonIcon
            title="Serwisy"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<FaTools />}
            onClick={handleUserHistoryServices}
          />
        </MarginButtonSaveToken>
        <MarginButtonSaveToken>
          <ButtonIcon
            title="Dojazdy"
            uppercase
            fontIconSize="20"
            fontSize="16"
            icon={<FaCar />}
            onClick={handleUserHistoryCommunitings}
          />
        </MarginButtonSaveToken>
      </div>
    </Popup>
  )

  const PopupWorkerPropsVisible = !!user && (
    <Popup
      popupEnable={workPropsVisible}
      handleClose={handleClickWork}
      title={Translates[siteProps.language].buttons.work}
      maxWidth="350"
    >
      <MinHeightComponent>
        <div>
          <StyledSelect siteProps={siteProps}>
            <SMSStyle siteProps={siteProps}>Wybierz firmę</SMSStyle>
            <SelectCreated
              options={selectCompanysValues}
              value={selectedCompany}
              handleChange={handleChangeSelectedCompany}
              placeholder="Firma..."
              defaultMenuIsOpen={false}
              isClearable={false}
              width="auto"
              deleteItem={false}
              darkSelect
              isDisabled={selectCompanysValues.length <= 1}
            />
          </StyledSelect>
        </div>
        <div>
          {anyCompany && hasPermission && (
            <>
              {isAdmin && companyConfirmed && (
                <>
                  <SMSStyle siteProps={siteProps}>
                    Dostępne SMS-y: <span>{companySMS}</span>
                  </SMSStyle>
                  <SMSStyle siteProps={siteProps}>
                    {premiumActive ? (
                      <>
                        Konto premium aktywne do: <span>{datePremium}</span>
                      </>
                    ) : (
                      <>
                        Konto premium: <span>Nie aktywne</span>
                      </>
                    )}
                  </SMSStyle>
                </>
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
                  {disabledNoPremium && (
                    <ReactTooltip
                      id="disabledButtonPremium"
                      effect="float"
                      multiline={true}
                    >
                      <span>
                        Aktywuj konto premium, aby móc korzystać z wybranych
                        funkcji.
                      </span>
                    </ReactTooltip>
                  )}
                  <MarginButtonsWork>
                    <ButtonIcon
                      title="Doładuj konto"
                      uppercase
                      fontIconSize="22"
                      fontSize="16"
                      icon={<MdAttachMoney />}
                      customColorButton={Colors(siteProps).successColorDark}
                      customColorIcon={Colors(siteProps).successColor}
                      onClick={handleClickSMS}
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
            </>
          )}
          {companyConfirmed && (
            <MarginButtonsWork>
              <div data-tip data-for="disabledButtonPremium">
                <ButtonIcon
                  title="Grafik pracy"
                  uppercase
                  fontIconSize="25"
                  fontSize="16"
                  icon={<MdTimelapse />}
                  onClick={handleEmplyeeWorkingHoursVisible}
                  disabled={disabledNoPremium}
                />
              </div>
            </MarginButtonsWork>
          )}
          {companyConfirmed && (
            <MarginButtonsWork>
              <div data-tip data-for="disabledButtonPremium">
                <ButtonIcon
                  title="Rezerwacje"
                  uppercase
                  fontIconSize="20"
                  fontSize="16"
                  icon={<FaCalendarAlt />}
                  onClick={handleWorkerReserwations}
                  disabled={disabledNoPremium}
                />
              </div>
            </MarginButtonsWork>
          )}
          {companyConfirmed && (
            <MarginButtonsWork>
              <div data-tip data-for="disabledButtonPremium">
                <ButtonIcon
                  title="Dojazdy"
                  uppercase
                  fontIconSize="20"
                  fontSize="16"
                  icon={<FaCar />}
                  onClick={handleClickCompanyCommuting}
                  disabled={disabledNoPremium}
                />
              </div>
            </MarginButtonsWork>
          )}
          {companyConfirmed && (
            <MarginButtonsWork>
              <div data-tip data-for="disabledButtonPremium">
                <ButtonIcon
                  title="Serwisy"
                  uppercase
                  fontIconSize="20"
                  fontSize="16"
                  icon={<FaTools />}
                  onClick={handleClickCompanyServices}
                  disabled={disabledNoPremium}
                />
              </div>
            </MarginButtonsWork>
          )}
          {companyConfirmed && workerHasAccessClientsOpinions && (
            <MarginButtonsWork>
              <div data-tip data-for="disabledButtonPremium">
                <ButtonIcon
                  title="Klienci"
                  uppercase
                  fontIconSize="25"
                  fontSize="16"
                  icon={<FaUsers />}
                  onClick={handleWorkerUsersInformation}
                  disabled={disabledNoPremium}
                />
              </div>
            </MarginButtonsWork>
          )}
          {companyConfirmed && workerHasAccessAvailability && (
            <MarginButtonsWork>
              <div data-tip data-for="disabledButtonPremium">
                <ButtonIcon
                  title="Stan magazynowy"
                  uppercase
                  fontIconSize="20"
                  fontSize="16"
                  icon={<FaBox />}
                  onClick={handleClickAvailability}
                  disabled={disabledNoPremium}
                />
              </div>
            </MarginButtonsWork>
          )}
          {companyConfirmed && isAdmin && (
            <MarginButtonsWork>
              <div data-tip data-for="disabledButtonPremium">
                <ButtonIcon
                  title="Statystyki"
                  uppercase
                  fontIconSize="20"
                  fontSize="16"
                  icon={<FaChartBar />}
                  onClick={handleClickCompanyStatistics}
                  disabled={disabledNoPremium}
                />
              </div>
            </MarginButtonsWork>
          )}
        </div>
      </MinHeightComponent>
    </Popup>
  )

  const renderCompanyOrCreateCompany =
    !!user &&
    user.allCompanys.length > 0 &&
    !!user.company &&
    (user.company.owner === user.userId || workerHasAccessButton ? (
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
    ))

  const renderCreateCompany = !!user && (
    <ButtonNavStyle>
      <LinkEffect
        path="/your-company"
        text={
          <ButtonIcon
            title="dla firm"
            uppercase
            fontIconSize="25"
            fontSize="16"
            icon={<MdStoreMallDirectory />}
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
          title="Twoje usługi"
          uppercase
          fontIconSize="20"
          fontSize="16"
          icon={<FaBook />}
          onClick={handleClickUserServicesVisible}
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
    <div>
      {PopupUserServices}
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
      {PopupTakePlaceContent}
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
      {PopupCompanyAddSMS}
      {PopupCompanyTransactionHistory}
      {PopupCompanyServices}
      {PopupUserHistoryServices}
      {PopupUserHistoryCommunitings}
      {PopupCompanyCommuniting}
      <ReactTooltip
        id="helpIconInfo"
        effect="float"
        multiline={true}
        place="bottom"
      >
        {helpVisible ? <span>Ukryj pomoc</span> : <span>Pokaż pomoc</span>}
      </ReactTooltip>
      <InfoMenu
        helpVisible={helpVisible}
        setHelpVisible={setHelpVisible}
        siteProps={siteProps}
        helpContentVisible={helpContentVisible}
        setHelpContentVisible={setHelpContentVisible}
        {...props}
      />
      <MenuPosition active={menuOpen} siteProps={siteProps}>
        <LeftMenuStyle>
          <div onClick={handleMenuOpen} aria-hidden="true">
            {renderCreateCompany}
            {renderCompanyOrCreateCompany}
            {renderButtonsUp}
            <ButtonNavStyle>
              <ButtonIcon
                title="Pomoc"
                uppercase
                fontIconSize="20"
                fontSize="16"
                icon={<MdHelp />}
                onClick={handleClickHelp}
              />
            </ButtonNavStyle>
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
                disabled={disabledSwitchUserProps}
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
                disabled={disabledSwitchUserProps}
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
                disabled={disabledSwitchUserProps}
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
        clickedBackground
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
                        <MeetsyLogo siteProps={siteProps}>M</MeetsyLogo>
                      ) : (
                        "Meetsy"
                      )
                    }
                    path="/"
                  />
                </LogoStyle>
                <ButtonsNav isUser={!!user}>
                  {renderCreateCompany}
                  {renderCompanyOrCreateCompany}
                  {renderButtonsUp}
                </ButtonsNav>
                {!!user && (
                  <>
                    {!isMobileSize && (
                      <ReactTooltip
                        id="showFavourites"
                        effect="float"
                        multiline={true}
                      >
                        <span>Ulubione firmy</span>
                      </ReactTooltip>
                    )}
                    <BellAlertsStyle
                      siteProps={siteProps}
                      onClick={handleUserFavourites}
                      data-tip
                      data-for="showFavourites"
                      data-place="bottom"
                    >
                      <IconStyle className="bell-action">
                        <FaHeart />
                      </IconStyle>
                    </BellAlertsStyle>
                  </>
                )}
                {!!user && (
                  <>
                    {!isMobileSize && (
                      <ReactTooltip
                        id="showStamps"
                        effect="float"
                        multiline={true}
                      >
                        <span>Zebrane pieczątki</span>
                      </ReactTooltip>
                    )}
                    <BellAlertsStyle
                      siteProps={siteProps}
                      onClick={handleUserStamps}
                      data-tip
                      data-for="showStamps"
                      data-place="bottom"
                    >
                      <IconStyle className="bell-action">
                        <FaStamp />
                      </IconStyle>
                    </BellAlertsStyle>
                  </>
                )}
                {!!user && (
                  <BellAlerts
                    siteProps={siteProps}
                    user={user}
                    isMobileSize={isMobileSize}
                    texts={Translates[siteProps.language].alerts}
                  />
                )}
                <HelpIconStyle
                  data-tip
                  data-for="helpIconInfo"
                  onClick={handleClickHelp}
                  helpVisible={helpVisible}
                  siteProps={siteProps}
                >
                  <MdHelp />
                </HelpIconStyle>

                <BurgerButton onClick={handleMenuOpen}>
                  <FaBars />
                </BurgerButton>
              </NavigationItems>
            </NavigationDiv>
          </WrapperNavigation>
        </BackgroundColorPage>
      </ContentMenu>
    </div>
  )
}

export default Navigation
