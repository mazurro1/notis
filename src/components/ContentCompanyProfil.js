import React, { useState } from "react"
import styled from "styled-components"
import { Colors } from "../common/Colors"
import ButtonIcon from "./ButtonIcon"
import { MdEdit } from "react-icons/md"
import InputCustom from "./InputCustom"
import OpinionAndAdressContent from "./ItemsContentCompanyProfil/OpinionAndAdressContent"
import OurWorkersContent from "./ItemsContentCompanyProfil/OurWorkersContent"
import OurLinksContent from "./ItemsContentCompanyProfil/OurLinksContent"
import ColumnItemTextarea from "./ItemsContentCompanyProfil/ColumnItemTextarea"
import { CSSTransition } from "react-transition-group"
import OpeningHoursContent from "./ItemsContentCompanyProfil/OpeningHoursContent"

const TextH1 = styled.div`
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  display: inline-block;
  color: ${Colors.navDownBackground};
  padding: 5px 10px;
  padding-left: 25px;
  text-transform: uppercase;
  font-size: 2rem;
  letter-spacing: 0.5rem;
  text-align: center;
  color: white;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: ${props =>
    props.isCompanyEditProfil ? Colors.secondColor : Colors.buttonIconColor};
`

const ContentDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
`

const LeftColumn = styled.div`
  width: 100%;
  min-width: 668px;
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
  background-color: ${props => (props.noBg ? "" : "#f5f4f5")};
  border-radius: 5px;
  padding: ${props => (props.noBg ? "10px 0px" : "10px 15px")};
  margin-bottom: 20px;
  padding-bottom: ${props => (props.isCompanyEditProfil ? "50px" : "10px")};
  min-height: ${props => (props.isCompanyEditProfil ? "240px" : "auto")};
  overflow: hidden;
  height: auto;
`

const TitleRightColumn = styled.h2`
  font-size: ${props => (props.adress ? "0.85rem" : "1.25rem")};
  display: inline-block;
  font-weight: ${props => (props.adress ? "700" : "500")};
  word-wrap: break-word;
  border-bottom: 2px solid
    ${props =>
      props.isCompanyEditProfil ? Colors.secondColor : Colors.buttonIconColor};
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
`

const ContentCompanyProfil = ({
  company = null,
  isAdmin = false,
  isCompanyEditProfil = false,
}) => {
  const [editOpinionAndAdress, setEditOpinionAndAdress] = useState(false)
  const [editAboutUs, setEditAboutUs] = useState(false)
  const [textAboutUs, setTextAboutUs] = useState("")
  const [editRezerwationText, setEditRezerwationText] = useState(false)
  const [textRezerwationText, setTextRezerwation] = useState("")
  const [editLinks, setEditLinks] = useState(false)
  const [editedWorkers, setEditedWorkers] = useState([])
  const [editedAdress, setEditedAdress] = useState({
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

  const handleEdit = setChange => {
    setChange(prevState => !prevState)
  }

  const companyEditProfilProps = {
    isCompanyEditProfil: isCompanyEditProfil && isAdmin,
    // isCompanyEditProfil: false,
  }

  const handleAddEditWorker = (action, indexWorker, specializationText) => {
    if (action === "save") {
      const oldWorkers = [...editedWorkers]
      const isIndexWorker = oldWorkers.findIndex(
        item => item.indexWorker === indexWorker
      )
      if (isIndexWorker > 0) {
        oldWorkers[isIndexWorker].specializationText = specializationText
      } else {
        const newWorker = {
          indexWorker: indexWorker,
          specializationText: specializationText,
        }
        oldWorkers.push(newWorker)
      }
      setEditedWorkers(oldWorkers)
    } else if (action === "delete") {
      const allNewWorkers = [...editedWorkers].filter(
        item => item.indexWorker !== indexWorker
      )
      setEditedWorkers(allNewWorkers)
    }
  }

  const handleChangeUpodateAdress = (
    updateCityInput,
    updateDiscrictInput,
    updateAdressInput,
    updatePhoneInput
  ) => {
    setEditedAdress({
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

  const isChangesInAdress =
    editedAdress.city !== null ||
    editedAdress.discrict !== null ||
    editedAdress.adress !== null ||
    editedAdress.phone !== null

  const isChangesInLinks =
    editedLinks.facebook !== null ||
    editedLinks.instagram !== null ||
    editedLinks.website !== null

  const isAnyChanges =
    editedWorkers.length > 0 ||
    !!textAboutUs ||
    !!textRezerwationText ||
    isChangesInAdress ||
    isChangesInLinks

  return (
    <div>
      <TextH1 {...companyEditProfilProps}>{company.name}</TextH1>
      <ContentDiv>
        <LeftColumn>
          <BackGroundImageCustomUrl url="https://2.bp.blogspot.com/-HDIxQDdW_nY/UznBk9GuJtI/AAAAAAAAlg4/ubYdAfZFlNs/s1600/01-jolantabork.jpg" />
        </LeftColumn>
        <RightColumn>
          <RightColumnItem noBg {...companyEditProfilProps}>
            <OpinionAndAdressContent
              {...companyEditProfilProps}
              city={company.city}
              district={company.district}
              adress={company.adress}
              TitleRightColumn={TitleRightColumn}
              opinionsCount={company.opinionsCount}
              opinionsValue={company.opinionsValue}
              phone={company.phone}
              ButtonEditPosition={ButtonEditPosition}
              editable={editOpinionAndAdress}
              onClickEdit={() => handleEdit(setEditOpinionAndAdress)}
              handleChangeUpodateAdress={handleChangeUpodateAdress}
            />
          </RightColumnItem>
          <InputCustom />
          <RightColumnItem {...companyEditProfilProps}>
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
            />
          </RightColumnItem>
          <RightColumnItem {...companyEditProfilProps}>
            <OpeningHoursContent
              TitleRightColumn={TitleRightColumn}
              ButtonEditPosition={ButtonEditPosition}
              {...companyEditProfilProps}
              companyEditProfilProps={companyEditProfilProps}
              company={company}
            />
          </RightColumnItem>
          <RightColumnItem {...companyEditProfilProps}>
            <OurWorkersContent
              TitleRightColumn={TitleRightColumn}
              companyEditProfilProps={companyEditProfilProps}
              {...companyEditProfilProps}
              ButtonEditPosition={ButtonEditPosition}
              workers={company.workers}
              owner={company.owner}
              companyId={company._id}
              ownerSpecialization={company.ownerSpecialization}
              handleAddEditWorker={handleAddEditWorker}
            />
          </RightColumnItem>

          {(company.reserationText || isCompanyEditProfil) && (
            <RightColumnItem {...companyEditProfilProps}>
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
              />
            </RightColumnItem>
          )}
          {(!!company.linkFacebook ||
            !!company.linkiWebsite ||
            !!company.linkInstagram ||
            isCompanyEditProfil) && (
            <RightColumnItem {...companyEditProfilProps}>
              <OurLinksContent
                TitleRightColumn={TitleRightColumn}
                companyEditProfilProps={companyEditProfilProps}
                {...companyEditProfilProps}
                ButtonEditPosition={ButtonEditPosition}
                editable={editLinks}
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
            icon={<MdEdit />}
            customColorButton="#2e7d32"
            customColorIcon="#43a047"
          />
        </SaveChangesPosition>
      </CSSTransition>
    </div>
  )
}
export default ContentCompanyProfil
