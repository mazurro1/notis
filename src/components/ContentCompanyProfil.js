/*eslint-disable eqeqeq*/
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import ButtonIcon from "./ButtonIcon"
import { FaSave } from "react-icons/fa"
import InputCustom from "./InputCustom"
import OpinionAndAdressContent from "./ItemsContentCompanyProfil/OpinionAndAdressContent"
import OurWorkersContent from "./ItemsContentCompanyProfil/OurWorkersContent"
import OurLinksContent from "./ItemsContentCompanyProfil/OurLinksContent"
import ColumnItemTextarea from "./ItemsContentCompanyProfil/ColumnItemTextarea"
import { CSSTransition } from "react-transition-group"
import OpeningHoursContent from "./ItemsContentCompanyProfil/OpeningHoursContent"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchUpdateCompanyProfil,
  resetEditCompany,
  changeReserwationValue,
  changeEditedWorkerHours,
} from "../state/actions"
import AllCategoryOfServices from "./ItemsContentCompanyProfil/AllCategoryOfServices"
import { compareEditedArrayToServerArrayAndReturnNotCompareItems } from "../common/Functions"
import { MdEdit } from "react-icons/md"
import ReactTooltip from "react-tooltip"

const TextH1 = styled.div`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  color: ${props => Colors(props.colorBlind).textNormalWhite};
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
      ? Colors(props.colorBlind).secondColor
      : Colors(props.colorBlind).primaryColor};
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
    props.noBg ? "" : Colors(props.colorBlind).companyItemBackground};
  color: ${props => Colors(props.colorBlind).textNormalBlack};
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
        ? Colors(props.colorBlind).secondColor
        : Colors(props.colorBlind).primaryColor};
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
  background-color: ${props => Colors(props.colorBlind).darkColor};
  padding: 8px;
  padding-bottom: 0px;
  border-radius: 50%;
  font-size: 1.6rem;
  cursor: pointer;
  transition-property: background-color;
  transition-duration: 0.3s;
  transition-timing-function: ease;
  &:hover {
    background-color: ${props => Colors(props.colorBlind).darkColorDark};
  }
`

const ContentCompanyProfil = ({
  company = null,
  isAdmin = false,
  isCompanyEditProfil = false,
}) => {
  const [editMode, setEditMode] = useState(false)
  const [allCategoriesWithItems, setAllCategoriesWithItems] = useState([])
  const [editOpinionAndAdress, setEditOpinionAndAdress] = useState(false)
  const [editAboutUs, setEditAboutUs] = useState(false)
  const [textAboutUs, setTextAboutUs] = useState("")
  const [editRezerwationText, setEditRezerwationText] = useState(false)
  const [textRezerwationText, setTextRezerwation] = useState("")
  const [editLinks, setEditLinks] = useState(false)
  const [companyPaused, setCompanyPaused] = useState(null)
  const [editedWorkers, setEditedWorkers] = useState([])
  const [editedAdress, setEditedAdress] = useState({
    companyName: null,
    city: null,
    discrict: null,
    adress: null,
    phone: null,
  })
  const [editedLinks, setEditedLinks] = useState({
    facebook: null,
    instagram: null,
    website: null,
  })
  const [reservationEveryTime, setReservationEveryTime] = useState(null)
  const [newOwnerSpecialization, setNewOwnerSpecialization] = useState(null)
  const [newOwnerServicesCategory, setNewOwnerServicesCategory] = useState(null)
  const [changesTimeOpen, setChangesTimeOpen] = useState(false)
  const [openingHoursToSent, setOpeningHoursToSent] = useState(false)

  const [deletedItemsServices, setDeletedItemsServices] = useState([])
  const [newItemsServices, setNewItemsServices] = useState([])
  const [editedItemsServices, setEditedItemsServices] = useState([])
  const editedWorkersHours = useSelector(state => state.editedWorkersHours)

  // console.log("deleted from server", deletedItemsServices)
  // console.log("new services", newItemsServices)
  // console.log("edited services from server", editedItemsServices)
  console.log("edited workers", editedWorkers)
  console.log("edited workers hours", editedWorkersHours)
  // console.log("newOwnerSpecialization", newOwnerSpecialization)

  const user = useSelector(state => state.user)
  const colorBlind = useSelector(state => state.colorBlind)
  const resetCompany = useSelector(state => state.resetCompany)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!!resetCompany) {
      setReservationEveryTime(null)
      setDeletedItemsServices([])
      setNewItemsServices([])
      setEditedItemsServices([])
      setTextAboutUs("")
      setTextRezerwation("")
      setEditedWorkers([])
      dispatch(changeEditedWorkerHours([]))
      setEditedAdress({
        companyName: null,
        city: null,
        discrict: null,
        adress: null,
        phone: null,
      })
      setEditedLinks({
        facebook: null,
        instagram: null,
        website: null,
      })
      setNewOwnerSpecialization(null)
      setNewOwnerServicesCategory(null)
      setOpeningHoursToSent(false)
      setChangesTimeOpen(false)
      dispatch(resetEditCompany(false))
    }
  }, [resetCompany])

  useEffect(() => {
    setCompanyPaused(company.pauseCompany)
  }, [company.pauseCompany])

  const handleEdit = setChange => {
    setChange(prevState => !prevState)
  }

  const companyEditProfilProps = {
    isCompanyEditProfil: isCompanyEditProfil && isAdmin && editMode,
  }

  const handleAddEditWorker = (
    action,
    indexWorker,
    specializationText,
    workerServicesCategory = []
  ) => {
    if (action === "save") {
      const oldWorkers = [...editedWorkers]
      const isIndexWorker = oldWorkers.findIndex(
        item => item.indexWorker === indexWorker
      )
      if (isIndexWorker >= 0) {
        oldWorkers[isIndexWorker].specializationText = specializationText
        oldWorkers[isIndexWorker].servicesCategory = workerServicesCategory
      } else {
        const newWorker = {
          indexWorker: indexWorker,
          specializationText: specializationText,
          servicesCategory: workerServicesCategory,
        }
        oldWorkers.push(newWorker)
      }
      const newOldWorkers = compareEditedArrayToServerArrayAndReturnNotCompareItems(
        oldWorkers,
        "indexWorker",
        [...company.workers]
      )
      setEditedWorkers(newOldWorkers)
    } else if (action === "delete") {
      const itemFromServer = [...company.workers].find(
        worker => worker.user._id === indexWorker
      )
      const workersIndex = [...editedWorkers].findIndex(
        item => item.indexWorker === indexWorker
      )

      let newEditWorkers = [...editedWorkers]

      if (workersIndex >= 0 && !!itemFromServer) {
        newEditWorkers[workersIndex].specializationText =
          itemFromServer.specialization
        if (workerServicesCategory.length > 0) {
          newEditWorkers[workersIndex].servicesCategory = workerServicesCategory
        }
      } else {
        newEditWorkers = newEditWorkers.filter(
          item => item.indexWorker !== indexWorker
        )
      }
      const newEditedItems = compareEditedArrayToServerArrayAndReturnNotCompareItems(
        newEditWorkers,
        "indexWorker",
        [...company.workers]
      )
      setEditedWorkers(newEditedItems)
    }
  }

  const handleClickEditMode = () => {
    setEditMode(prevState => !prevState)

    setEditOpinionAndAdress(false)
    setEditAboutUs(false)
    setEditRezerwationText(false)
    setEditLinks(false)
    setChangesTimeOpen(false)
  }

  const handleChangeUpodateAdress = (
    updateNompanyNameInput,
    updateCityInput,
    updateDiscrictInput,
    updateAdressInput,
    updatePhoneInput
  ) => {
    setEditedAdress({
      companyName: updateNompanyNameInput,
      city: updateCityInput,
      discrict: updateDiscrictInput,
      adress: updateAdressInput,
      phone: updatePhoneInput,
    })
  }

  const handleSaveLinks = (
    newFacebookLink,
    newInstagramLink,
    newWebsiteLink
  ) => {
    setEditedLinks({
      facebook: newFacebookLink,
      instagram: newInstagramLink,
      website: newWebsiteLink,
    })
  }

  const handleSaveOwnerSpecialization = (specialization, servicesCategory) => {
    const checkOwnerSpecialization =
      company.ownerData.specialization === specialization
        ? null
        : specialization

    const ownerCategoryCheck = !!company.ownerData.servicesCategory
      ? company.ownerData.servicesCategory
      : []

    const isTheSameOwnerCategory =
      JSON.stringify(servicesCategory) == JSON.stringify(ownerCategoryCheck)

    const resultOwnerCategory = isTheSameOwnerCategory ? null : servicesCategory

    setNewOwnerSpecialization(checkOwnerSpecialization)
    setNewOwnerServicesCategory(resultOwnerCategory)
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
    }
    dispatch(changeReserwationValue(valueWithCompanyId))
  }

  const isChangesInAdress =
    editedAdress.companyName !== null ||
    editedAdress.city !== null ||
    editedAdress.discrict !== null ||
    editedAdress.adress !== null ||
    editedAdress.phone !== null

  const isChangesInLinks =
    editedLinks.facebook !== null ||
    editedLinks.instagram !== null ||
    editedLinks.website !== null

  const isAnyChanges =
    newOwnerServicesCategory !== null ||
    editedWorkers.length > 0 ||
    !!reservationEveryTime ||
    !!textAboutUs ||
    !!textRezerwationText ||
    isChangesInAdress ||
    isChangesInLinks ||
    !!newOwnerSpecialization ||
    changesTimeOpen ||
    newItemsServices.length > 0 ||
    editedItemsServices.length > 0 ||
    editedWorkersHours.length > 0 ||
    deletedItemsServices.length > 0 ||
    (companyPaused !== company.pauseCompany && companyPaused !== null)

  const handleSaveChanges = () => {
    if (isAnyChanges) {
      const textAboutUsToSent = !!textAboutUs ? textAboutUs : null
      const textRezerwationTextToSent = !!textRezerwationText
        ? textRezerwationText
        : null
      const editedWorkersToSent =
        editedWorkers.length > 0 ? editedWorkers : null
      const editedAdressIsEmpty = !Object.values(editedAdress).some(
        x => x !== null && x !== ""
      )
      const editedAdressToSent = !editedAdressIsEmpty ? editedAdress : null
      const editedLinksIsEmpty = !Object.values(editedLinks).some(
        x => x !== null
      )
      const editedLinksToSent = !editedLinksIsEmpty ? editedLinks : null
      const ownerSpecializationToSent = !!newOwnerSpecialization
        ? newOwnerSpecialization
        : null
      const openingHoursToSentFinall = !!openingHoursToSent
        ? openingHoursToSent
        : null

      const companyPausedToSent =
        companyPaused !== company.pauseCompany ? companyPaused : null

      const services = {
        deleted: deletedItemsServices,
        edited: editedItemsServices,
        new: newItemsServices,
      }

      dispatch(
        fetchUpdateCompanyProfil(
          user.token,
          company._id,
          textAboutUsToSent,
          textRezerwationTextToSent,
          editedWorkersToSent,
          editedAdressToSent,
          editedLinksToSent,
          ownerSpecializationToSent,
          openingHoursToSentFinall,
          companyPausedToSent,
          services,
          reservationEveryTime,
          newOwnerServicesCategory,
          editedWorkersHours
        )
      )
      setCompanyPaused(null)
    }
  }

  const filteredAllCategoriesWithItems = allCategoriesWithItems.filter(item => {
    if (item.items.length > 0) {
      return true
    } else {
      return false
    }
  })

  return (
    <div>
      <TextH1 {...companyEditProfilProps} colorBlind={colorBlind}>
        {company.name}
        <EditModeToChange
          data-tip
          data-for="editMode"
          data-place="bottom"
          onClick={handleClickEditMode}
          colorBlind={colorBlind}
        >
          <MdEdit />
        </EditModeToChange>
      </TextH1>
      <ContentDiv>
        <LeftColumn>
          <BackGroundImageCustomUrl url="https://2.bp.blogspot.com/-HDIxQDdW_nY/UznBk9GuJtI/AAAAAAAAlg4/ubYdAfZFlNs/s1600/01-jolantabork.jpg" />
          <AllCategoryOfServices
            newItemsServices={newItemsServices}
            setNewItemsServices={setNewItemsServices}
            editedItemsServices={editedItemsServices}
            setEditedItemsServices={setEditedItemsServices}
            deletedItemsServices={deletedItemsServices}
            setDeletedItemsServices={setDeletedItemsServices}
            services={company.services}
            allCategoriesWithItems={allCategoriesWithItems}
            setAllCategoriesWithItems={setAllCategoriesWithItems}
            {...companyEditProfilProps}
            editedWorkers={editedWorkers}
            setEditedWorkers={setEditedWorkers}
            workersFromServer={[...company.workers]}
            handleClickReserwation={handleClickReserwation}
            companyId={company._id}
            newOwnerServicesCategory={newOwnerServicesCategory}
            setNewOwnerServicesCategory={setNewOwnerServicesCategory}
            ownerSerwiceCategory={company.ownerData.servicesCategory}
          />
        </LeftColumn>
        <RightColumn>
          <RightColumnItem
            noBg
            {...companyEditProfilProps}
            colorBlind={colorBlind}
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
              handleChangeUpodateAdress={handleChangeUpodateAdress}
              setCompanyPaused={setCompanyPaused}
              setReservationEveryTime={setReservationEveryTime}
              reservationEveryTimeServer={company.reservationEveryTime}
              colorBlind={colorBlind}
            />
          </RightColumnItem>
          <InputCustom />
          <RightColumnItem {...companyEditProfilProps} colorBlind={colorBlind}>
            <ColumnItemTextarea
              titleColumnItem="O NAS"
              TitleRightColumn={TitleRightColumn}
              ParagraphRightColumn={ParagraphRightColumn}
              {...companyEditProfilProps}
              ButtonEditPosition={ButtonEditPosition}
              title={company.title}
              editable={editAboutUs}
              onClickEdit={() => handleEdit(setEditAboutUs)}
              setTextEditedChange={setTextAboutUs}
              textEdited={textAboutUs}
              colorBlind={colorBlind}
            />
          </RightColumnItem>
          <RightColumnItem {...companyEditProfilProps} colorBlind={colorBlind}>
            <OpeningHoursContent
              TitleRightColumn={TitleRightColumn}
              ButtonEditPosition={ButtonEditPosition}
              {...companyEditProfilProps}
              companyEditProfilProps={companyEditProfilProps}
              company={company}
              setChangesTimeOpen={setChangesTimeOpen}
              setOpeningHoursToSent={setOpeningHoursToSent}
              editMode={editMode}
              colorBlind={colorBlind}
            />
          </RightColumnItem>
          <RightColumnItem {...companyEditProfilProps} colorBlind={colorBlind}>
            <OurWorkersContent
              TitleRightColumn={TitleRightColumn}
              companyEditProfilProps={companyEditProfilProps}
              {...companyEditProfilProps}
              ButtonEditPosition={ButtonEditPosition}
              workers={[...company.workers]}
              owner={company.owner}
              companyId={company._id}
              ownerSpecialization={company.ownerData.specialization}
              handleAddEditWorker={handleAddEditWorker}
              handleSaveOwnerSpecialization={handleSaveOwnerSpecialization}
              allCategoriesWithItems={filteredAllCategoriesWithItems}
              editedWorkers={editedWorkers}
              ownerSerwiceCategory={company.ownerData.servicesCategory}
              newOwnerServicesCategory={newOwnerServicesCategory}
              company={company}
              editMode={editMode}
              colorBlind={colorBlind}
              editedWorkersHours={editedWorkersHours}
              isAdmin={isAdmin}
              ownerData={company.ownerData}
            />
          </RightColumnItem>

          {(company.reserationText || isCompanyEditProfil) && (
            <RightColumnItem
              {...companyEditProfilProps}
              colorBlind={colorBlind}
            >
              <ColumnItemTextarea
                titleColumnItem="ZASADY REZERWACJI"
                TitleRightColumn={TitleRightColumn}
                ParagraphRightColumn={ParagraphRightColumn}
                {...companyEditProfilProps}
                ButtonEditPosition={ButtonEditPosition}
                title={company.reserationText}
                editable={editRezerwationText}
                onClickEdit={() => handleEdit(setEditRezerwationText)}
                setTextEditedChange={setTextRezerwation}
                textEdited={textRezerwationText}
                colorBlind={colorBlind}
              />
            </RightColumnItem>
          )}
          {(!!company.linkFacebook ||
            !!company.linkiWebsite ||
            !!company.linkInstagram ||
            isCompanyEditProfil) && (
            <RightColumnItem
              {...companyEditProfilProps}
              colorBlind={colorBlind}
            >
              <OurLinksContent
                TitleRightColumn={TitleRightColumn}
                companyEditProfilProps={companyEditProfilProps}
                {...companyEditProfilProps}
                ButtonEditPosition={ButtonEditPosition}
                editable={editLinks}
                colorBlind={colorBlind}
                onClickEdit={() => handleEdit(setEditLinks)}
                handleSaveLinks={handleSaveLinks}
                linkFacebook={
                  !!company.linkFacebook ? company.linkFacebook : ""
                }
                linkiWebsite={
                  !!company.linkiWebsite ? company.linkiWebsite : ""
                }
                linkInstagram={
                  !!company.linkInstagram ? company.linkInstagram : ""
                }
              />
            </RightColumnItem>
          )}
        </RightColumn>
      </ContentDiv>
      <CSSTransition
        in={isCompanyEditProfil && isAnyChanges}
        timeout={400}
        classNames="popup"
        unmountOnExit
      >
        <SaveChangesPosition>
          <ButtonIcon
            title="Zapisz zmiany"
            uppercase
            fontIconSize="40"
            fontSize="28"
            icon={<FaSave />}
            customColorButton={Colors(colorBlind).successColorDark}
            customColorIcon={Colors(colorBlind).successColor}
            onClick={handleSaveChanges}
          />
        </SaveChangesPosition>
      </CSSTransition>
      <ReactTooltip id="editMode" effect="float" multiline={true}>
        <span>Tryb edycji.</span>
      </ReactTooltip>
    </div>
  )
}
export default ContentCompanyProfil
