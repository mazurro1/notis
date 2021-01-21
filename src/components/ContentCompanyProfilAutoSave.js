/*eslint-disable eqeqeq*/
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import ButtonIcon from "./ButtonIcon"
import { FaSave } from "react-icons/fa"
import InputCustom from "./InputCustom"
import OpinionAndAdressContent from "./ItemsContentCompanyProfilAutoSave/OpinionAndAdressContent"
import OurWorkersContent from "./ItemsContentCompanyProfilAutoSave/OurWorkersContent"
import OurLinksContent from "./ItemsContentCompanyProfilAutoSave/OurLinksContent"
import ColumnItemTextarea from "./ItemsContentCompanyProfilAutoSave/ColumnItemTextarea"
import { CSSTransition } from "react-transition-group"
import OpeningHoursContent from "./ItemsContentCompanyProfilAutoSave/OpeningHoursContent"
import { useDispatch, useSelector } from "react-redux"
import {
  resetEditCompany,
  changeReserwationValue,
  changeEditedWorkerHours,
  fetchSaveTextsCompany,
} from "../state/actions"
import AllCategoryOfServices from "./ItemsContentCompanyProfilAutoSave/AllCategoryOfServices"
import { compareEditedArrayToServerArrayAndReturnNotCompareItems } from "../common/Functions"
import { MdEdit } from "react-icons/md"
import ReactTooltip from "react-tooltip"
import DaysOffContent from "./ItemsContentCompanyProfilAutoSave/DaysOffContent"
import HappyHoursConstContent from "./ItemsContentCompanyProfilAutoSave/HappyHoursConstContent"
import HappyHoursNoConstContent from "./ItemsContentCompanyProfilAutoSave/HappyHoursNoConstContent"
import AboutUsComponent from "./ItemsContentCompanyProfilAutoSave/AboutUsComponent"
import ReserwationTextComponent from "./ItemsContentCompanyProfilAutoSave/ReserwationTextComponent"
import LinksComponent from "./ItemsContentCompanyProfilAutoSave/LinksComponent"

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
  letter-spacing: 0.5rem;
  text-align: center;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: ${props =>
    props.isCompanyEditProfil
      ? Colors(props.siteProps).secondColor
      : Colors(props.siteProps).primaryColor};
`

const ContentDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`

const LeftColumn = styled.div`
  width: 100%;
  /* min-width: 668px; */
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
  padding-bottom: ${props => (props.isCompanyEditProfil ? "50px" : "10px")};
  /* min-height: ${props => (props.isCompanyEditProfil ? "240px" : "auto")}; */
  overflow: hidden;
  height: auto;
  transition-property: color, background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
`

const TitleRightColumn = styled.h2`
  font-size: ${props => (props.adress ? "0.85rem" : "1.25rem")};
  display: inline-block;
  font-weight: ${props => (props.adress ? "700" : "500")};
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

const BackGroundImageCustomUrl = styled.div`
  height: 500px;
  width: 100%;
  background: url(${props => props.url}) 50% 0 no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 5px;
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.1) inset;
`

const SaveChangesPosition = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
`

const EditModeToChange = styled.div`
  position: absolute;
  right: -50px;
  top: 5px;
  background-color: ${props => Colors(props.siteProps).darkColor};
  padding: 8px;
  padding-bottom: 0px;
  border-radius: 50%;
  font-size: 1.6rem;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    background-color: ${props => Colors(props.siteProps).darkColorDark};
  }
`

const ContentCompanyProfil = ({
  company = null,
  isAdmin = false,
  isCompanyEditProfil = false,
  userHasAccess = false,
  selectedWorker = null,
}) => {
  const [editMode, setEditMode] = useState(true)
  const [allCategoryEdit, setAllCategoryEdit] = useState(false)
  const [editOpinionAndAdress, setEditOpinionAndAdress] = useState(false)
  const [changesTimeOpen, setChangesTimeOpen] = useState(false)


  const user = useSelector(state => state.user)
  const siteProps = useSelector(state => state.siteProps)
  console.log(company)
  const dispatch = useDispatch()


  const handleEdit = setChange => {
    setChange(prevState => !prevState)
  }

  const companyEditProfilProps = {
    isCompanyEditProfil:
      isCompanyEditProfil && (isAdmin || userHasAccess) && editMode,
  }

  const handleClickEditMode = () => {
    setEditMode(prevState => !prevState)
    setEditOpinionAndAdress(false)
    setChangesTimeOpen(false)
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
      }
      const valueWithCompanyId = {
        ...itemServices,
        companyId: companyId,
        workers: company.workers,
        ownerData: ownerData,
        maxDate: new Date(
          new Date().setMonth(
            new Date().getMonth() + company.reservationMonthTime
          )
        ),
      }
      dispatch(changeReserwationValue(valueWithCompanyId))
    }

    
  
  let userHasPermToServices = !isCompanyEditProfil || isAdmin;
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
  
  let userHasPermisionToOther = !isCompanyEditProfil || isAdmin
  let userIsBlocked = false;
  if (!!company.usersInformation && !!user) {
    const isUserInAllUsers = company.usersInformation.find(
      itemInfo => itemInfo.userId === user.userId
    )
    if(!!isUserInAllUsers){
      if(!!isUserInAllUsers.isBlocked){
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
            >
              <MdEdit />
            </EditModeToChange>
          )}
        </TextH1>
        <ContentDiv>
          <LeftColumn>
            <BackGroundImageCustomUrl url="https://2.bp.blogspot.com/-HDIxQDdW_nY/UznBk9GuJtI/AAAAAAAAlg4/ubYdAfZFlNs/s1600/01-jolantabork.jpg" />
            {userHasPermToServices && (
              <AllCategoryOfServices
                services={company.services}
                {...companyEditProfilProps}
                handleClickReserwation={handleClickReserwation}
                companyId={company._id}
                userIsBlocked={userIsBlocked}
                user={user}
                allCategoryEdit={allCategoryEdit}
                setAllCategoryEdit={setAllCategoryEdit}
              />
            )}
          </LeftColumn>

          <RightColumn>
            {userHasPermisionToOther && (
              <RightColumnItem
                noBg
                {...companyEditProfilProps}
                siteProps={siteProps}
              >
                <OpinionAndAdressContent
                  {...companyEditProfilProps}
                  city={company.city}
                  companyName={company.name}
                  district={company.district}
                  adress={company.adress}
                  TitleRightColumn={TitleRightColumn}
                  opinionsCount={company.opinionsCount}
                  opinionsValue={company.opinionsValue}
                  phone={company.phone}
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
                />
              </RightColumnItem>
            )}
            {userHasPermisionToOther && (
              <AboutUsComponent
                RightColumnItem={RightColumnItem}
                companyEditProfilProps={companyEditProfilProps}
                {...companyEditProfilProps}
                siteProps={siteProps}
                TitleRightColumn={TitleRightColumn}
                ParagraphRightColumn={ParagraphRightColumn}
                company={company}
                user={user}
                ButtonTextPosition={ButtonTextPosition}
              />
            )}
            {/*
            {userHasPermisionToOther && (
              <RightColumnItem
                {...companyEditProfilProps}
                siteProps={siteProps}
              >
                <OpeningHoursContent
                  TitleRightColumn={TitleRightColumn}
                  ButtonEditPosition={ButtonEditPosition}
                  {...companyEditProfilProps}
                  companyEditProfilProps={companyEditProfilProps}
                  company={company}
                  setChangesTimeOpen={setChangesTimeOpen}
                  // setOpeningHoursToSent={setOpeningHoursToSent}
                  editMode={editMode}
                  siteProps={siteProps}
                />
              </RightColumnItem>
            )}
            {isCompanyEditProfil && (
              <>
                {isAdmin && (
                  <RightColumnItem
                    {...companyEditProfilProps}
                    siteProps={siteProps}
                  >
                    <DaysOffContent
                      {...companyEditProfilProps}
                      companyEditProfilProps={companyEditProfilProps}
                      TitleRightColumn={TitleRightColumn}
                      siteProps={siteProps}
                      ButtonEditPosition={ButtonEditPosition}
                      // setDeletedDayOffToSave={setDeletedDayOffToSave}
                      companyDaysOff={company.daysOff}
                      // setCreatedDayOffToSave={setCreatedDayOffToSave}
                      // deletedDayOffToSave={deletedDayOffToSave}
                      // createdDayOffToSave={createdDayOffToSave}
                    />
                  </RightColumnItem>
                )}
                {userHasPermToHappyHours && (
                  <>
                    <RightColumnItem
                      {...companyEditProfilProps}
                      siteProps={siteProps}
                    >
                      <HappyHoursConstContent
                        {...companyEditProfilProps}
                        companyEditProfilProps={companyEditProfilProps}
                        TitleRightColumn={TitleRightColumn}
                        siteProps={siteProps}
                        happyHoursConst={company.happyHoursConst}
                      />
                    </RightColumnItem>
                    <RightColumnItem
                      {...companyEditProfilProps}
                      siteProps={siteProps}
                    >
                      <HappyHoursNoConstContent
                        {...companyEditProfilProps}
                        companyEditProfilProps={companyEditProfilProps}
                        TitleRightColumn={TitleRightColumn}
                        siteProps={siteProps}
                        happyHoursNoConst={company.happyHoursNoConst}
                      />
                    </RightColumnItem>
                  </>
                )}
              </>
            )}
                */}
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
                // handleAddEditWorker={handleAddEditWorker}
                // handleSaveOwnerSpecialization={handleSaveOwnerSpecialization}
                companyServices={company.services}
                // editedWorkers={editedWorkers}
                // ownerSerwiceCategory={company.ownerData.servicesCategory}
                // newOwnerServicesCategory={newOwnerServicesCategory}
                company={company}
                editMode={editMode}
                siteProps={siteProps}
                isAdmin={isAdmin}
                ownerData={company.ownerData}
                company={company}
                RightColumnItem={RightColumnItem}
              />
            )}

            {(company.reserationText || isCompanyEditProfil) &&
              userHasPermisionToOther && (
                <ReserwationTextComponent
                  RightColumnItem={RightColumnItem}
                  companyEditProfilProps={companyEditProfilProps}
                  {...companyEditProfilProps}
                  siteProps={siteProps}
                  TitleRightColumn={TitleRightColumn}
                  ParagraphRightColumn={ParagraphRightColumn}
                  company={company}
                  user={user}
                  ButtonTextPosition={ButtonTextPosition}
                />
              )}
            {(!!company.linkFacebook ||
              !!company.linkiWebsite ||
              !!company.linkInstagram ||
              isCompanyEditProfil) &&
              userHasPermisionToOther && (
                <LinksComponent
                  RightColumnItem={RightColumnItem}
                  companyEditProfilProps={companyEditProfilProps}
                  {...companyEditProfilProps}
                  siteProps={siteProps}
                  TitleRightColumn={TitleRightColumn}
                  ParagraphRightColumn={ParagraphRightColumn}
                  company={company}
                  user={user}
                  ButtonTextPosition={ButtonTextPosition}
                />
              )}
          </RightColumn>
        </ContentDiv>
        {isCompanyEditProfil && (
          <ReactTooltip id="editMode" effect="float" multiline={true}>
            <span>Tryb edycji.</span>
          </ReactTooltip>
        )}
      </div>
    )
}
export default ContentCompanyProfil
