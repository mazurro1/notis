/*eslint-disable eqeqeq*/
import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import OpinionAndAdressContent from "./ItemsContentCompanyProfilAutoSave/OpinionAndAdressContent"
import OurWorkersContent from "./ItemsContentCompanyProfilAutoSave/OurWorkersContent"
import OpeningHoursContent from "./ItemsContentCompanyProfilAutoSave/OpeningHoursContent"
import { useDispatch, useSelector } from "react-redux"
import { changeReserwationValue } from "../state/actions"
import AllCategoryOfServices from "./ItemsContentCompanyProfilAutoSave/AllCategoryOfServices"
import { MdEdit } from "react-icons/md"
import ReactTooltip from "react-tooltip"
import DaysOffContent from "./ItemsContentCompanyProfilAutoSave/DaysOffContent"
import HappyHoursConstContent from "./ItemsContentCompanyProfilAutoSave/HappyHoursConstContent"
import PromotionsContent from "./ItemsContentCompanyProfilAutoSave/PromotionsContent"
import AboutUsComponent from "./ItemsContentCompanyProfilAutoSave/AboutUsComponent"
import ReserwationTextComponent from "./ItemsContentCompanyProfilAutoSave/ReserwationTextComponent"
import LinksComponent from "./ItemsContentCompanyProfilAutoSave/LinksComponent"
import MapsComponent from "./MapsComponent"
// import MapsEditComponent from "./MapsEditComponent"
import OpinionsComponent from "./ItemsContentCompanyProfilAutoSave/OpinionsComponent"
import GalleryContent from "./ItemsContentCompanyProfilAutoSave/GalleryContent"
import StampsContent from "./ItemsContentCompanyProfilAutoSave/StampsContent"
import ShopStoreContent from "./ItemsContentCompanyProfilAutoSave/ShopStoreContent"
import SMSSettings from "./ItemsContentCompanyProfilAutoSave/SMSSettings"
import ReportCompany from "./ItemsContentCompanyProfilAutoSave/ReportCompany"
import { Site } from "../common/Site"
import UseWindowSize from "../common/UseWindowSize"
import CompanyLink from "./ItemsContentCompanyProfilAutoSave/CompanyLink"
import CompanyNip from "./ItemsContentCompanyProfilAutoSave/CompanyNip"

const TextH1 = styled.div`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  color: ${props => Colors(props.siteProps).textNormalWhite};
  padding: 5px 10px;
  padding-left: 25px;
  text-transform: uppercase;
  font-size: 2rem;
  letter-spacing: 0.1rem;
  text-align: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: ${props =>
    props.isCompanyEditProfil
      ? Colors(props.siteProps).secondColor
      : Colors(props.siteProps).primaryColor};

  margin-right: 100px;
  transition-property: color, background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  @media all and (max-width: 767px) {
    & {
      letter-spacing: 0.15rem;
      font-size: 1.4rem;
    }
  }
`

const ContentDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`

const LeftColumn = styled.div`
  width: 100%;
  padding: 10px;
  padding-top: 20px;
  @media all and (min-width: 991px) {
    width: 70%;
  }
`

const RightColumn = styled.div`
  width: 100%;
  min-width: 286px;
  padding: 10px;
  @media all and (min-width: 991px) {
    width: 30%;
  }
`

const RightColumnItem = styled.div`
  position: relative;
  width: 100%;
  max-width: 100%;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
  background-color: ${props =>
    props.noBg ? "" : Colors(props.siteProps).companyItemBackground};
  color: ${props => Colors(props.siteProps).textNormalBlack};
  border-radius: 5px;
  padding: ${props => (props.noBg ? "10px 0px" : "10px 15px")};
  margin-bottom: 20px;
  margin-top: ${props => (props.marginTop ? `${props.marginTop}px` : "0px")};
  padding-bottom: ${props => (props.isCompanyEditProfil ? "50px" : "10px")};
  border-width: 2px;
  border-style: solid;
  border-color: ${props =>
    props.active ? Colors(props.siteProps).secondColor : "transparent"};
  overflow: hidden;
  height: auto;
  opacity: ${props =>
    !props.active && props.disabledEditButtons && props.premiumActive
      ? "0.5"
      : "1"};
  transition-property: color, background-color, border-color, opacity;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const TitleRightColumn = styled.h2`
  font-size: ${props => (props.adress ? "0.85rem" : "1.25rem")};
  display: inline-block;
  font-family: ${props => (props.adress ? "Poppins-Bold" : "Poppins-Medium")};
  word-wrap: break-word;
  border-bottom: 2px solid
    ${props =>
      props.isCompanyEditProfil
        ? Colors(props.siteProps).secondColor
        : Colors(props.siteProps).primaryColor};
`

const ParagraphRightColumn = styled.p`
  display: block;
  font-size: 0.9rem;
`

const ButtonEditPosition = styled.div`
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 30px;
`

const ButtonTextPosition = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 40px;
`

const EditModeToChange = styled.div`
  position: absolute;
  right: -50px;
  top: 5px;
  background-color: ${props =>
    props.disabled ? "#e0e0e0" : Colors(props.siteProps).secondDarkColor};
  padding: 8px;
  padding-bottom: 0px;
  border-radius: 50%;
  font-size: 1.6rem;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    background-color: ${props =>
      props.disabled ? "#e0e0e0" : Colors(props.siteProps).secondColor};
  }
  @media all and (max-width: 767px) {
    & {
      font-size: 1.1rem;
    }
  }
`

const CompanyPremiumInformation = styled.div`
  padding: 5px 10px;
  font-family: "Poppins-Medium";
  font-size: 0.9rem;
  margin-bottom: 5px;
  color: ${props => Colors(props.siteProps).textNormalBlack};

  span {
    font-family: "Poppins-Bold";
    font-size: 1.1rem;
    display: inline-block;
    color: ${props => Colors(props.siteProps).secondDarkColor};
  }
`

const ContentCompanyProfilAutoSave = ({
  company = null,
  isAdmin = false,
  isCompanyEditProfil = false,
  userHasAccess = false,
  selectedWorker = null,
  isCompanyDisabledChangePhone = false,
  isCompanyDisabledChangeEmail = false,
  dateCompanyDisabledChangePhone = null,
  dateCompanyDisabledChangeEmail = null,
}) => {
  const [editMode, setEditMode] = useState(true)
  const [allCategoryEdit, setAllCategoryEdit] = useState(false)
  const [editOpinionAndAdress, setEditOpinionAndAdress] = useState(false)
  const [editSMSSettngs, setEditSMSSettngs] = useState(false)
  const [editAboutUs, setEditAboutUs] = useState(false)
  const [editableOpeningHours, setEditableOpeningHours] = useState(false)
  const [editableDaysOff, setEditableDaysOff] = useState(false)
  const [editedWorkers, setEditedWorkers] = useState(false)
  const [editedReserwation, setEditedReserwation] = useState(false)
  const [editLinks, setEditLinks] = useState(false)
  const [editCompanyLink, setEditCompanyLink] = useState(false)
  const [editCompanyNip, setEditCompanyNip] = useState(false)
  const [editConstHappyHours, setEditConstHappyHours] = useState(false)
  const [editPromotions, setEditPromotions] = useState(false)
  const [editMap, setEditMap] = useState(false)
  const [editGallery, setEditGallery] = useState(false)
  const [editStamps, setEditStamps] = useState(false)
  const [editShopStore, setEditShopStore] = useState(false)

  const user = useSelector(state => state.user)
  const siteProps = useSelector(state => state.siteProps)
  const dispatch = useDispatch()
  const size = UseWindowSize()

  const isMobileSize = Site.mobileSize >= size.width

  useEffect(() => {
    setEditShopStore(false)
  }, [company.shopStore])

  let premiumActive = false
  if (!!user) {
    if (!!company.premium) {
      const toDatePremium = new Date(company.premium)
      if (toDatePremium >= new Date()) {
        premiumActive = true
      }
    }
  }

  const disabledEditButtons =
    allCategoryEdit ||
    editOpinionAndAdress ||
    editSMSSettngs ||
    editAboutUs ||
    editableOpeningHours ||
    editableDaysOff ||
    editedWorkers ||
    editedReserwation ||
    editLinks ||
    editCompanyLink ||
    editCompanyNip ||
    editConstHappyHours ||
    editPromotions ||
    editMap ||
    editGallery ||
    editStamps ||
    editShopStore

  const handleResetAllEditedComponents = () => {
    setAllCategoryEdit(false)
    setEditOpinionAndAdress(false)
    setEditSMSSettngs(false)
    setEditAboutUs(false)
    setEditableOpeningHours(false)
    setEditableDaysOff(false)
    setEditedWorkers(false)
    setEditedReserwation(false)
    setEditLinks(false)
    setEditCompanyLink(false)
    setEditCompanyNip(false)
    setEditConstHappyHours(false)
    setEditPromotions(false)
    setEditMap(false)
    setEditGallery(false)
    setEditStamps(false)
    setEditShopStore(false)
  }

  const handleEdit = setChange => {
    setChange(prevState => !prevState)
  }

  const companyEditProfilProps = {
    isCompanyEditProfil:
      isCompanyEditProfil && (isAdmin || userHasAccess) && editMode,
  }

  const handleClickEditMode = () => {
    if (!disabledEditButtons || !premiumActive) {
      setEditMode(prevState => !prevState)
      setEditOpinionAndAdress(false)
    }
  }

  const handleClickReserwation = (itemServices, companyId) => {
    const ownerCategoryToSent = !!company.ownerData.servicesCategory
      ? company.ownerData.servicesCategory
      : []

    const ownerSpecializationToSent = !!company.ownerData.specialization
      ? company.ownerData.specialization
      : ""

    const ownerData = {
      ownerCategory: ownerCategoryToSent,
      specialization: ownerSpecializationToSent,
      name: company.owner.name,
      surname: company.owner.surname,
      ownerId: company.owner._id,
      ownerImageUrl: company.owner.imageUrl,
    }

    const valueWithCompanyId = {
      ...itemServices,
      serviceId: itemServices._id,
      companyId: companyId,
      workers: company.workers,
      ownerData: ownerData,
      companyStamps: company.companyStamps,
      maxDate: new Date(
        new Date().setMonth(
          new Date().getMonth() + company.reservationMonthTime
        )
      ),
    }
    dispatch(changeReserwationValue(valueWithCompanyId))
  }

  let userHasPermToServices = !isCompanyEditProfil || isAdmin
  if (!userHasPermToServices && selectedWorker) {
    userHasPermToServices = selectedWorker.permissions.some(perm => perm === 2)
  }
  let userHasPermToHappyHours = !isCompanyEditProfil || isAdmin
  if (!userHasPermToHappyHours && selectedWorker) {
    userHasPermToHappyHours = selectedWorker.permissions.some(
      perm => perm === 3
    )
  }
  let userHasPermToWorkers = !isCompanyEditProfil || isAdmin
  if (!userHasPermToWorkers && selectedWorker) {
    userHasPermToWorkers = selectedWorker.permissions.some(perm => perm === 4)
  }

  let userHasPermToOpinions = !isCompanyEditProfil || isAdmin
  if (!userHasPermToOpinions && selectedWorker) {
    userHasPermToOpinions = selectedWorker.permissions.some(perm => perm === 6)
  }

  let userHasPermToShopStore = !isCompanyEditProfil || isAdmin
  if (!userHasPermToShopStore && selectedWorker) {
    userHasPermToShopStore = selectedWorker.permissions.some(perm => perm === 7)
  }

  let userHasPermisionToOther = !isCompanyEditProfil || isAdmin
  let isEditAndAdmin = isCompanyEditProfil && isAdmin && editMode
  let userIsBlocked = false
  let userCannotMakeReservation = !!user
  let isWorkerBlocked = false
  let userAccountNotVeryfied = false
  let userPhoneVeryfied = false
  let premiumDate = null
  let companySMS = 0

  if (!!user) {
    isWorkerBlocked = company.owner._id === user.userId
    if (!!user.phoneVerified) {
      userPhoneVeryfied = true
    }
    if (!user.accountVerified) {
      userAccountNotVeryfied = true
    }
    if (!isWorkerBlocked) {
      const userIsInWorkers = company.workers.some(
        item => item.user._id === user.userId
      )
      if (userIsInWorkers) {
        isWorkerBlocked = true
      }
    }

    if (!!company.sms) {
      companySMS = company.sms
    }

    if (!!company.premium) {
      const toDatePremium = new Date(company.premium)
      premiumDate = `${
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
      if (toDatePremium >= new Date()) {
        premiumActive = true
      }
    }
  }

  if (!userCannotMakeReservation) {
    if (!!user) {
      userCannotMakeReservation = company.owner._id === user.userId
      if (!userCannotMakeReservation) {
        const userIsInWorkers = company.workers.some(
          item => item.user._id === user.userId
        )
        if (userIsInWorkers) {
          userCannotMakeReservation = false
          isWorkerBlocked = true
        }
      }
    }
  }

  if (!!company.usersInformation && !!user) {
    const isUserInAllUsers = company.usersInformation.find(
      itemInfo => itemInfo.userId === user.userId
    )
    if (!!isUserInAllUsers) {
      if (!!isUserInAllUsers.isBlocked) {
        userIsBlocked = true
      }
    }
  }

  return (
    <div>
      <TextH1 {...companyEditProfilProps} siteProps={siteProps}>
        {company.name}
        {(isAdmin || userHasAccess) && isCompanyEditProfil && (
          <EditModeToChange
            data-tip
            data-for="editMode"
            data-place="bottom"
            onClick={handleClickEditMode}
            siteProps={siteProps}
            disabled={disabledEditButtons && premiumActive}
          >
            <MdEdit />
          </EditModeToChange>
        )}
      </TextH1>
      <ContentDiv>
        <LeftColumn>
          <GalleryContent
            {...companyEditProfilProps}
            siteProps={siteProps}
            user={user}
            companyId={company._id}
            companyImages={company.imagesUrl}
            mainImage={company.mainImageUrl}
            editMode={editMode}
            editGallery={editGallery}
            setEditGallery={setEditGallery}
            handleResetAllEditedComponents={handleResetAllEditedComponents}
            isAdmin={isAdmin}
            disabledEditButtons={disabledEditButtons || !premiumActive}
            premiumActive={premiumActive}
          />
          {userHasPermToServices && (
            <AllCategoryOfServices
              services={company.services}
              {...companyEditProfilProps}
              handleClickReserwation={handleClickReserwation}
              companyId={company._id}
              userIsBlocked={userIsBlocked}
              userAccountNotVeryfied={userAccountNotVeryfied}
              userPhoneVeryfied={userPhoneVeryfied}
              isWorkerBlocked={isWorkerBlocked}
              premiumActive={premiumActive}
              userCannotMakeReservation={userCannotMakeReservation}
              user={user}
              allCategoryEdit={allCategoryEdit}
              setAllCategoryEdit={setAllCategoryEdit}
              handleResetAllEditedComponents={handleResetAllEditedComponents}
              disabledEditButtons={disabledEditButtons || !premiumActive}
              editMode={editMode}
            />
          )}
          {userHasPermToShopStore && (
            <ShopStoreContent
              ButtonEditPosition={ButtonEditPosition}
              handleResetAllEditedComponents={handleResetAllEditedComponents}
              disabledEditButtons={disabledEditButtons || !premiumActive}
              editShopStore={editShopStore}
              setEditShopStore={setEditShopStore}
              siteProps={siteProps}
              editMode={editMode}
              {...companyEditProfilProps}
              companyShopStore={[...company.shopStore]}
              user={user}
              premiumActive={premiumActive}
            />
          )}
        </LeftColumn>
        <RightColumn>
          {companyEditProfilProps.isCompanyEditProfil && (
            <>
              <CompanyPremiumInformation siteProps={siteProps}>
                <div>
                  Konto ważne do: <span>{premiumDate}</span>
                </div>
                <div>
                  Pozostała ilość SMS: <span>{companySMS}</span>
                </div>
              </CompanyPremiumInformation>
            </>
          )}
          {editMode && isCompanyEditProfil && isAdmin ? (
            <></>
          ) : (
            // <RightColumnItem
            //   {...companyEditProfilProps}
            //   siteProps={siteProps}
            //   active={editMap}
            //   disabledEditButtons={disabledEditButtons}
            //   marginTop={10}
            // >
            //   <MapsEditComponent
            //     editMap={editMap}
            //     setEditMap={setEditMap}
            //     disabledEditButtons={disabledEditButtons}
            //     handleResetAllEditedComponents={handleResetAllEditedComponents}
            //     user={user}
            //     companyLat={company.maps.lat}
            //     companyLong={company.maps.long}
            //     TitleRightColumn={TitleRightColumn}
            //     siteProps={siteProps}
            //     {...companyEditProfilProps}
            //     ButtonEditPosition={ButtonEditPosition}
            //   />
            // </RightColumnItem>
            (isAdmin || !isCompanyEditProfil) &&
            !!company.maps.lat &&
            !!company.maps.long && (
              <RightColumnItem noBg premiumActive={premiumActive}>
                <MapsComponent
                  company={company}
                  companyLat={company.maps.lat}
                  companyLong={company.maps.long}
                />
              </RightColumnItem>
            )
          )}
          {userHasPermisionToOther && (
            <RightColumnItem
              noBg
              {...companyEditProfilProps}
              siteProps={siteProps}
              active={editOpinionAndAdress}
              disabledEditButtons={disabledEditButtons}
              premiumActive={premiumActive}
            >
              <OpinionAndAdressContent
                {...companyEditProfilProps}
                city={company.city}
                code={company.code}
                companyName={company.name}
                district={company.district}
                adress={company.adress}
                TitleRightColumn={TitleRightColumn}
                opinionsCount={company.opinionsCount}
                opinionsValue={company.opinionsValue}
                phone={company.phone}
                sharePhone={company.sharePhone}
                isCompanyDisabledChangePhone={isCompanyDisabledChangePhone}
                isCompanyDisabledChangeEmail={isCompanyDisabledChangeEmail}
                dateCompanyDisabledChangePhone={dateCompanyDisabledChangePhone}
                dateCompanyDisabledChangeEmail={dateCompanyDisabledChangeEmail}
                landline={company.landlinePhone}
                pauseCompany={company.pauseCompany}
                ButtonEditPosition={ButtonEditPosition}
                editable={editOpinionAndAdress}
                onClickEdit={() => handleEdit(setEditOpinionAndAdress)}
                setEditOpinionAndAdress={setEditOpinionAndAdress}
                reservationEveryTimeServer={company.reservationEveryTime}
                reservationMonthServer={company.reservationMonthTime}
                siteProps={siteProps}
                companyIndustries={company.companyType}
                user={user}
                company={company}
                handleResetAllEditedComponents={handleResetAllEditedComponents}
                disabledEditButtons={disabledEditButtons}
                editMode={editMode}
                linkPath={company.linkPath}
                premiumActive={premiumActive}
              />
            </RightColumnItem>
          )}
          {userHasPermisionToOther && (
            <AboutUsComponent
              RightColumnItem={RightColumnItem}
              premiumActive={premiumActive}
              companyEditProfilProps={companyEditProfilProps}
              {...companyEditProfilProps}
              siteProps={siteProps}
              TitleRightColumn={TitleRightColumn}
              ParagraphRightColumn={ParagraphRightColumn}
              company={company}
              user={user}
              ButtonEditPosition={ButtonEditPosition}
              editAboutUs={editAboutUs}
              setEditAboutUs={setEditAboutUs}
              handleResetAllEditedComponents={handleResetAllEditedComponents}
              disabledEditButtons={disabledEditButtons || !premiumActive}
              editMode={editMode}
            />
          )}
          {userHasPermisionToOther && (
            <RightColumnItem
              {...companyEditProfilProps}
              siteProps={siteProps}
              active={editableOpeningHours}
              disabledEditButtons={disabledEditButtons || !premiumActive}
              premiumActive={premiumActive}
            >
              <OpeningHoursContent
                TitleRightColumn={TitleRightColumn}
                ButtonEditPosition={ButtonEditPosition}
                {...companyEditProfilProps}
                companyEditProfilProps={companyEditProfilProps}
                company={company}
                editMode={editMode}
                siteProps={siteProps}
                user={user}
                editableOpeningHours={editableOpeningHours}
                setEditableOpeningHours={setEditableOpeningHours}
                handleResetAllEditedComponents={handleResetAllEditedComponents}
                disabledEditButtons={disabledEditButtons || !premiumActive}
              />
            </RightColumnItem>
          )}
          {userHasPermisionToOther && (
            <RightColumnItem
              {...companyEditProfilProps}
              siteProps={siteProps}
              active={editableDaysOff}
              disabledEditButtons={disabledEditButtons || !premiumActive}
              premiumActive={premiumActive}
            >
              <DaysOffContent
                {...companyEditProfilProps}
                companyEditProfilProps={companyEditProfilProps}
                TitleRightColumn={TitleRightColumn}
                siteProps={siteProps}
                ButtonEditPosition={ButtonEditPosition}
                companyDaysOff={company.daysOff}
                user={user}
                editableDaysOff={editableDaysOff}
                setEditableDaysOff={setEditableDaysOff}
                handleResetAllEditedComponents={handleResetAllEditedComponents}
                disabledEditButtons={disabledEditButtons || !premiumActive}
                editMode={editMode}
              />
            </RightColumnItem>
          )}
          {isCompanyEditProfil && (
            <>
              {userHasPermToHappyHours && (
                <>
                  <RightColumnItem
                    {...companyEditProfilProps}
                    siteProps={siteProps}
                    active={editConstHappyHours}
                    disabledEditButtons={disabledEditButtons || !premiumActive}
                    premiumActive={premiumActive}
                  >
                    <HappyHoursConstContent
                      {...companyEditProfilProps}
                      companyEditProfilProps={companyEditProfilProps}
                      TitleRightColumn={TitleRightColumn}
                      siteProps={siteProps}
                      happyHoursConst={company.happyHoursConst}
                      editConstHappyHours={editConstHappyHours}
                      setEditConstHappyHours={setEditConstHappyHours}
                      handleResetAllEditedComponents={
                        handleResetAllEditedComponents
                      }
                      disabledEditButtons={
                        disabledEditButtons || !premiumActive
                      }
                      editMode={editMode}
                      ButtonEditPosition={ButtonEditPosition}
                      companyServices={company.services}
                      user={user}
                    />
                  </RightColumnItem>
                  <RightColumnItem
                    premiumActive={premiumActive}
                    {...companyEditProfilProps}
                    siteProps={siteProps}
                    active={editPromotions}
                    disabledEditButtons={disabledEditButtons || !premiumActive}
                  >
                    <PromotionsContent
                      {...companyEditProfilProps}
                      companyEditProfilProps={companyEditProfilProps}
                      TitleRightColumn={TitleRightColumn}
                      siteProps={siteProps}
                      promotions={company.promotions}
                      editPromotions={editPromotions}
                      setEditPromotions={setEditPromotions}
                      handleResetAllEditedComponents={
                        handleResetAllEditedComponents
                      }
                      disabledEditButtons={
                        disabledEditButtons || !premiumActive
                      }
                      editMode={editMode}
                      ButtonEditPosition={ButtonEditPosition}
                      companyServices={company.services}
                      user={user}
                    />
                  </RightColumnItem>
                  <RightColumnItem
                    premiumActive={premiumActive}
                    {...companyEditProfilProps}
                    siteProps={siteProps}
                    active={editStamps}
                    disabledEditButtons={disabledEditButtons || !premiumActive}
                  >
                    <StampsContent
                      {...companyEditProfilProps}
                      TitleRightColumn={TitleRightColumn}
                      siteProps={siteProps}
                      editStamps={editStamps}
                      setEditStamps={setEditStamps}
                      ButtonEditPosition={ButtonEditPosition}
                      handleResetAllEditedComponents={
                        handleResetAllEditedComponents
                      }
                      companyStamps={company.companyStamps}
                      services={company.services}
                      editMode={editMode}
                      disabledEditButtons={
                        disabledEditButtons || !premiumActive
                      }
                      user={user}
                    />
                  </RightColumnItem>
                </>
              )}
            </>
          )}
          {userHasPermToWorkers && (
            <OurWorkersContent
              TitleRightColumn={TitleRightColumn}
              companyEditProfilProps={companyEditProfilProps}
              {...companyEditProfilProps}
              ButtonEditPosition={ButtonEditPosition}
              workers={[...company.workers]}
              owner={company.owner}
              companyId={company._id}
              ownerSpecialization={company.ownerData.specialization}
              companyServices={company.services}
              company={company}
              editMode={editMode}
              siteProps={siteProps}
              isAdmin={isAdmin}
              ownerData={company.ownerData}
              RightColumnItem={RightColumnItem}
              premiumActive={premiumActive}
              ButtonTextPosition={ButtonTextPosition}
              editedWorkers={editedWorkers}
              setEditedWorkers={setEditedWorkers}
              handleResetAllEditedComponents={handleResetAllEditedComponents}
              disabledEditButtons={disabledEditButtons}
            />
          )}
          {(company.reserationText || isCompanyEditProfil) &&
            userHasPermisionToOther && (
              <ReserwationTextComponent
                RightColumnItem={RightColumnItem}
                premiumActive={premiumActive}
                companyEditProfilProps={companyEditProfilProps}
                {...companyEditProfilProps}
                siteProps={siteProps}
                TitleRightColumn={TitleRightColumn}
                ParagraphRightColumn={ParagraphRightColumn}
                company={company}
                user={user}
                ButtonEditPosition={ButtonEditPosition}
                editedReserwation={editedReserwation}
                setEditedReserwation={setEditedReserwation}
                handleResetAllEditedComponents={handleResetAllEditedComponents}
                disabledEditButtons={disabledEditButtons || !premiumActive}
                editMode={editMode}
              />
            )}
          {isEditAndAdmin && (
            <CompanyNip
              editCompanyNip={editCompanyNip}
              setEditCompanyNip={setEditCompanyNip}
              RightColumnItem={RightColumnItem}
              premiumActive={premiumActive}
              companyEditProfilProps={companyEditProfilProps}
              {...companyEditProfilProps}
              siteProps={siteProps}
              TitleRightColumn={TitleRightColumn}
              ParagraphRightColumn={ParagraphRightColumn}
              company={company}
              user={user}
              ButtonEditPosition={ButtonEditPosition}
              disabledEditButtons={disabledEditButtons || !premiumActive}
              editMode={editMode}
              handleResetAllEditedComponents={handleResetAllEditedComponents}
              dataToInvoice={company.dataToInvoice}
            />
          )}
          {isEditAndAdmin && (
            <CompanyLink
              editCompanyLink={editCompanyLink}
              setEditCompanyLink={setEditCompanyLink}
              RightColumnItem={RightColumnItem}
              premiumActive={premiumActive}
              companyEditProfilProps={companyEditProfilProps}
              {...companyEditProfilProps}
              siteProps={siteProps}
              TitleRightColumn={TitleRightColumn}
              ParagraphRightColumn={ParagraphRightColumn}
              company={company}
              user={user}
              ButtonEditPosition={ButtonEditPosition}
              disabledEditButtons={disabledEditButtons || !premiumActive}
              editMode={editMode}
              handleResetAllEditedComponents={handleResetAllEditedComponents}
            />
          )}
          {(!!company.linkFacebook ||
            !!company.linkiWebsite ||
            !!company.linkInstagram ||
            isCompanyEditProfil) &&
            userHasPermisionToOther && (
              <LinksComponent
                RightColumnItem={RightColumnItem}
                premiumActive={premiumActive}
                companyEditProfilProps={companyEditProfilProps}
                {...companyEditProfilProps}
                siteProps={siteProps}
                TitleRightColumn={TitleRightColumn}
                ParagraphRightColumn={ParagraphRightColumn}
                company={company}
                user={user}
                ButtonEditPosition={ButtonEditPosition}
                editLinks={editLinks}
                setEditLinks={setEditLinks}
                handleResetAllEditedComponents={handleResetAllEditedComponents}
                disabledEditButtons={disabledEditButtons || !premiumActive}
                editMode={editMode}
              />
            )}
          {companyEditProfilProps.isCompanyEditProfil && (
            <>
              {isEditAndAdmin && (
                <RightColumnItem
                  {...companyEditProfilProps}
                  siteProps={siteProps}
                  active={editSMSSettngs}
                  disabledEditButtons={disabledEditButtons}
                  premiumActive={premiumActive}
                >
                  <SMSSettings
                    premiumActive={premiumActive}
                    TitleRightColumn={TitleRightColumn}
                    ButtonEditPosition={ButtonEditPosition}
                    {...companyEditProfilProps}
                    company={company}
                    editMode={editMode}
                    siteProps={siteProps}
                    user={user}
                    editSMSSettngs={editSMSSettngs}
                    setEditSMSSettngs={setEditSMSSettngs}
                    handleResetAllEditedComponents={
                      handleResetAllEditedComponents
                    }
                    disabledEditButtons={disabledEditButtons}
                    smsReserwationAvaible={company.smsReserwationAvaible}
                    smsReserwationChangedUserAvaible={
                      company.smsReserwationChangedUserAvaible
                    }
                    smsNotifactionAvaible={company.smsNotifactionAvaible}
                    smsCanceledAvaible={company.smsCanceledAvaible}
                    smsChangedAvaible={company.smsChangedAvaible}
                    smsServiceCreatedAvaible={company.smsServiceCreatedAvaible}
                    smsServiceChangedAvaible={company.smsServiceChangedAvaible}
                    smsServiceFinishedAvaible={
                      company.smsServiceFinishedAvaible
                    }
                    smsServiceCanceledAvaible={
                      company.smsServiceCanceledAvaible
                    }
                    smsCommunitingNotificationAvaible={
                      company.smsCommunitingNotificationAvaible
                    }
                    smsCommunitingCreatedAvaible={
                      company.smsCommunitingCreatedAvaible
                    }
                    smsCommunitingChangedAvaible={
                      company.smsCommunitingChangedAvaible
                    }
                    smsCommunitingCanceledAvaible={
                      company.smsCommunitingCanceledAvaible
                    }
                  />
                </RightColumnItem>
              )}
            </>
          )}

          <ReportCompany
            siteProps={siteProps}
            user={user}
            company={company}
            disabledEditButtons={disabledEditButtons}
            premiumActive={premiumActive}
          />
        </RightColumn>
        {userHasPermToOpinions && (
          <OpinionsComponent
            companyOpinions={company.opinions}
            siteProps={siteProps}
            opinionsCount={company.opinionsCount}
            opinionsValue={company.opinionsValue}
            companyName={company.name}
            companyId={company._id}
            isCompanyEditProfil={isCompanyEditProfil}
            isAdmin={isAdmin}
            user={user}
          />
        )}
      </ContentDiv>
      {isCompanyEditProfil && premiumActive && !isMobileSize && (
        <ReactTooltip id="editMode" effect="float" multiline={true}>
          {editMode ? (
            disabledEditButtons ? (
              <span>
                Aby włączyć podgląd zakończ edycję wszystkich elementów.
              </span>
            ) : (
              <span>Włącz podgląd.</span>
            )
          ) : (
            <span>Włącz tryb edycji.</span>
          )}
        </ReactTooltip>
      )}

      {(disabledEditButtons || !premiumActive) && !isMobileSize && (
        <ReactTooltip id="disabledButton" effect="float" multiline={true}>
          <span>
            {disabledEditButtons && premiumActive
              ? "Aby móc edytować ten element zakończ edytowanie poprzedniego elementu."
              : !premiumActive
              ? "Aktywuj konto premium, aby móc korzystać z wybranych funkcji."
              : ""}
          </span>
        </ReactTooltip>
      )}
      {disabledEditButtons && !isMobileSize && (
        <ReactTooltip id="disabledButtonOnly" effect="float" multiline={true}>
          <span>
            Aby móc edytować ten element zakończ edytowanie poprzedniego
            elementu.
          </span>
        </ReactTooltip>
      )}
      {!premiumActive && !isMobileSize && (
        <ReactTooltip
          id="disabledButtonValidPremium"
          effect="float"
          multiline={true}
        >
          <span>
            Aktywuj konto premium, aby móc korzystać z wybranych funkcji.
          </span>
        </ReactTooltip>
      )}
    </div>
  )
}
export default ContentCompanyProfilAutoSave
